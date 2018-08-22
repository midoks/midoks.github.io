---
layout: post
title: 高速加载js代码
tag: [ 'javascript']
category: ['脚本语言']
a_id: 17
---

分享一段代码,以前在网上找到的。先通过php把js压缩成图片

文件名为hello.js:
```
alert('hello world');//使用简单实例
```

通如果下面php代码运行压缩hello.js文件:
```
<?php
/**
 *  @func 把JS文件压缩成图片
 *  这样可以下载速度
 *  @need:GD2支持
 */
ini_set('memory_limit', -1);
set_time_limit(0);
    
$fileName = 'hello.js';//压缩的文件名
//把js文件压缩成图片
function ImgEncode($fn){
    //检测文件是否存在
    if(!file_exists($fn)){
        exit($fn.'文件不存在');
    }
    //文件大小
    $fsize = filesize($fn);
    //计算生成图片的宽度
    $iWidth = ceil(sqrt($fsize/1));
    //生成图片的高度
    $iHeight = $iWidth;
    //生成图片的资源
    $im = imagecreatetruecolor($iWidth, $iHeight);
    $fs = fopen($fn, 'r');//只读打开读取文件内容
    $data = fread($fs, $fsize);//文件内容
    fclose($fs);
    $i = 0;
    for($y = 0; $y < $iHeight; ++$y){
        for($x = 0; $x < $iWidth; ++$x){
            //echo ord($data[$i]);
            $ord = ord($data[$i]);  
            //创建像素点的颜色
            $color = imagecolorallocate($im, $ord, 0, 0);//图像的颜色
            //在图片上以像素点保存数据
            imagesetpixel($im, $x, $y, $color);
            ++$i;
        }
    }
    return $im;
}
   
//解压被压缩的js文件
function ImgDecode($png){
    //检测文件是否存在
    if(!file_exists($png)){
        exit($png.'文件不存在');
    }
    $im = imagecreatefrompng($png);//获取图片的资源
    //图片的宽和高
    list($iWidth, $iHeight) = getimagesize($png);
    //$width = imagesx($im);
    //$height = imagesy($im);//这种方法不是很好
    $temp = '';
    $i = 0;
    for($y = 0; $y < $iHeight; ++$y){
        for($x = 0; $x < $iWidth; ++$x){
            $rgb = imagecolorat($im, $x, $y);
            $r = ($rgb >> 16) & 0xFF;
            //$g = ($rgb >> 8) & 0xFF;
            //$b = $rgb & 0xFF;//只取一个值
            $data = chr($r);
            $temp .= $data;
            ++$i;
        }
    }
    //print_r($temp);
    return $temp;
}
   
   
//@func 测试
$im = ImgEncode($fileName);//执行
imagepng($im,'test.png');
?>
```
在html加载被压缩的图片,在通过js解压得到数据并运行:
```
/**
 *  @func JS解压缩
 *  @need 支持canvas
 */
   
/**
 *  @func 方法
 *  @param fn 文件
 *  @param callback 回调方法
 */
function LoadData(fn, callback){
    //创建对象
    var bCanvas = false;//是否可使用
    var oCanvas = document.createElement('canvas');
    if(oCanvas.getContext){//是否getContext这个功能
        var oCtx = oCanvas.getContext('2d');
        if(oCtx.getImageData){
            bCanvas = true;
        }
    }
       
    if(bCanvas){
        //添加数据图片
        var DataImg = new Image();
        DataImg.style.position = 'absolute';
        DataImg.style.left = '-10000px';
        //图片添加到body中
        document.body.appendChild(DataImg);
        DataImg.onload = function(){
            var iWidth = this.offsetWidth;//图片的宽度
            var iHeight = this.offsetHeight;//图片的高度
            oCanvas.width = iWidth;
            oCanvas.height = iHeight;
            oCanvas.style.width = iWidth + 'px';
            oCanvas.style.height = iHeight + 'px';
            //
            var  oText = document.getElementById('output');
            oCtx.drawImage(this, 0, 0);
            var oData = oCtx.getImageData(0, 0, iWidth, iHeight).data;
            var a = [];
            var len = oData.length;
            var p = -1;
            for(var i=0; i<len;i+=4){
                if(oData[i]>0){
                    a[++p] = String.fromCharCode(oData[i]);
                }
            }
            var strData = a.join('');
            if(callback){
                callback(strData);
            }
            //删除标签
            //document.body.removeChild(DataImg);
        }   
        //加载的图片
        DataImg.src = fn;
    }
    //console.log(oCanvas.getContext('2d'));
}
   
LoadData('./test.png',function(data){
    //查询解压后的代码
    console.log(data);
    //执行代码
    //eval(data);
});
```
我已经测试成功,好牛B的代码。
