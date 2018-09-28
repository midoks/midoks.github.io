---
layout: post
title: chrome扩展webtool
tag: ['javascript']
categories: ['脚本语言']
a_id: 26
---

学习chrome扩展开发,写了一个关于PR和SR值的查询功能。添加扩展后,在页面上右键,会有个站长工具的选项。点击后,有两个功能,PR查询和SR查询。

### 相关
- [二进制下载](https://raw.githubusercontent.com/midoks/chrome-extensions/master/webtool/webtool.crx)
- [代码地址](https://github.com/midoks/chrome-extensions/tree/master/webtool)


### 关键代码

在编写代码时,我遇到的比较麻烦的事情是pr的算法功能,从php上移植到javascript上,我想讲一下思考的过程。

```
/**
 * @param $ 在64位服务器下不变化 $
 * @param $int $ 整数值 $
 */
//在64位机上,保持原来算法结构,就保留后32位的结果值,前32位清空。
public function GooglePr_64($url){              
    $SEED = "Mining PageRank is AGAINST GOOGLE'S TERMS OF SERVICE. Yes, I'm talking to you, scammer.";
    $Result = 0x01020345;
    for( $i=0; $i<strlen( $url ); ++$i){
        $Result ^= ord( $SEED{ $i%87 } ) ^ ord( $url{ $i } );            
        $Result = $Result & 0xFFFFFFFF;
        $Result = ((($Result >> 23) & 0x1FF)&0xFFFFFFFF) | (($Result << 9)&0xFFFFFFFF);
    }   
    return sprintf( "8%x" , $Result);
}
           
           
/**
 *  google pr 专用的
 *  @param $url $ 对URL地址加密 $
 *  @return $ 返回加密结果 $
 */
public function GooglePr($url){
    $SEED = "Mining PageRank is AGAINST GOOGLE'S TERMS OF SERVICE. Yes, I'm talking to you, scammer.";
    $Result = 0x01020345;
    for( $i=0; $i<strlen( $url ); ++$i){
        $Result ^= ord( $SEED{ $i%87 } ) ^ ord( $url{ $i } );   
        $Result = (($Result >> 23) & 0x1FF) | $Result << 9; 
    }   
    return sprintf( "8%x" , $Result);
}
```

```
当我把这方式,移植到javascript上,我发现短域名有效,长域名就失效了。这真是用一个奇葩的问题。后来我发现,在js中,(+，-，*,/)的运算能力在2的64次方,而在(|,&,^,~)的运算能力在2的32次方。哎,操蛋的人生(也就是说上面第二种就对了)。
现在,我假设用php,查询midoks.cachecha.com域名,算出来结果是"8ce0f5a3d"
```

```
function GoogleUrlBase(domain){
        var SEED = "Mining PageRank is AGAINST GOOGLE'S TERMS OF SERVICE. Yes, I'm talking to you, scammer.";
        var Result = 0x01020345;
        for(var i=0; i<domain.length; ++i){
            Result ^= ((SEED[i%87]).charCodeAt(0)) ^ ((domain[i]).charCodeAt(0));
            Result = ((Result >> 23) & 0x1FF) | (Result << 9);
        }
        return "8" + dec2hex(Result);
}
```

```
现在用js,查询www.baidu.com域名,算出来的结果是"8-31f0a5c3";
我分别打印了PHP和js中Result的值,发现都是一样,可见js在转换成16进制的时候,和php产生了不一致。
如果你仔细的话,你会发现ce0f5a3d是31f0a5c3的补码。
恩,如你所见,问题解决了。贴上正确的代码。
```

```
function google_pr(domain){
    var code = GoogleUrlBase(domain);
    var url = 'http://toolbarqueries.google.com.hk/tbr?client=navclient-auto&features=Rank&q=info:'+ domain +'&ch=' + code;
    return url;
    function GoogleUrlBase(domain){
        var SEED = "Mining PageRank is AGAINST GOOGLE'S TERMS OF SERVICE. Yes, I'm talking to you, scammer.";
        var Result = 0x01020345;
        for(var i=0; i<domain.length; ++i){
            Result ^= ((SEED[i%87]).charCodeAt(0)) ^ ((domain[i]).charCodeAt(0));//right_byte_move(Result, 9);
            Result = ((Result >> 23) & 0x1FF) | (Result << 9);
        }    
        if('-' == Result.toString().substr(0, 1)){
            //取反
            Result += 0xFFFFFFFF + 1;
        }
        return "8" + dec2hex(Result);
    }
    //10进制转16进制
    function dec2hex( num ){
        if( typeof num !== 'undefined' ){
            return num.toString(16);
        }
    }
}
```
