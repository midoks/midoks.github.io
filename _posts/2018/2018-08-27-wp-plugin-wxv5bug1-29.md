---
layout: post
title: WP微信机器人无法响应原因之一(BOM)
tag: [php']
categories: ['脚本语言']
a_id: 29
---

我今天同一位网友,解决"你的服务器没有正确响应Token验证,请阅读消息接口使用指南"的问题。经过我的调试,我用肉眼观看,那是相当的正确,可就是不成功。无奈啊,我就试着打印接口。如果你也这个问题。你可以试着用下面的程序。

```
<?php
$url = "http://yourname/?imidoks&signature=12db30c88b933a71aa8f313f0c4df752948a4df1&echostr=5973827613480405785&timestamp=1391151897&nonce=1390890130";
$res = file_get_contents($url);//有错的
var_dump($res);
$url = "http://midoks.cachecha.com/?midoks&signature=12db30c88b933a71aa8f313f0c4df752948a4df1&echostr=5973827613480405785&timestamp=1391151897&nonce=1390890130";
$res = file_get_contents($url);//正确的
var_dump($res);
?>
```

你会发现打印的结果不一样(应该是一样的),错误的比正确的多3个字符。我就不知道为什么多了这3个字符,到底哪里来的?搜了一下百度,我才如梦初醒。这个网友里面的文件包含额BOM文件,然后用下面的程序(网上找的),除去他文件中的BOM:

```
<?php
set_time_limit(0);
//把该文件放到WEB根目录下，运行一次可以清除当前目录及所有子目录中所有文件的BOM Header。
//经测试，安全。
if (isset($_GET['dir'])){ //设置文件目录
    $basedir=$_GET['dir'];
}else{
    $basedir = '.';
}
$auto = 1;
checkdir($basedir);
function checkdir($basedir){
    if ($dh = opendir($basedir)) {
        while (($file = readdir($dh)) !== false) {
            if ($file != '.' && $file != '..'){
                if (!is_dir($basedir."/".$file)) {
                    echo "filename: $basedir/$file ".checkBOM("$basedir/$file")." <br>";
                }else{
                    $dirname = $basedir."/".$file;
                    checkdir($dirname);
                }
            }
        }
    closedir($dh);
    }
}
 
function checkBOM ($filename) {
    global $auto;
    $contents = file_get_contents($filename);
    $charset[1] = substr($contents, 0, 1);
    $charset[2] = substr($contents, 1, 1);
    $charset[3] = substr($contents, 2, 1);
    if (ord($charset[1]) == 239 && ord($charset[2]) == 187 && ord($charset[3]) == 191) {
        if ($auto == 1) {
            $rest = substr($contents, 3);
            rewrite ($filename, $rest);
            return ("<font color=red>BOM found, automatically removed.</font>");
        } else {
            return ("<font color=red>BOM found.</font>");
        }
    }else return ("BOM Not Found.");
}
 
function rewrite ($filename, $data) {
    $filenum = fopen($filename, "w");
    flock($filenum, LOCK_EX);
    fwrite($filenum, $data);
    fclose($filenum);
}
?>
```

然后我,同为微信公众平台,提交地址。就成功了。

--- 

- PS:我一般不会遇到上面的问题,我用编辑器,已经帮我除去BOM了,但是不少网友,并没有编程经验,可直接使用上面程序,在你的根目录运行,就能解决问题了。
- 感谢这位网友愿意让我用他的服务器测试代码,并帮助更多的人使用WP微信机器人更顺利。