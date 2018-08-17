---
layout: post
title: 在windows使用php扩展redis应用
tag: ['PHP']
category: ['脚本语言']
a_id: 16
---

- 1.redis:http://code.google.com/p/servicestack/wiki/RedisWindowsDownload
- 2.php_redis(phpredis扩展):https://github.com/nicolasff/phpredis/downloads
- 3.(自己欣赏)redis的源码地址:https://github.com/ServiceStack/ServiceStack.Redis
- http://code.google.com/p/redis/downloads/list
- 前提条件:PHP的环境已搭建好!

### 简单使用
```
<?php
/**
 *  @func redis 缓存
 *  @author midoks
 *  @link midoks.cachecha.com
 */
class RedisCache{
             
    public $cfg = array(
        'host'=>'127.0.0.1',
        'port'=> 6379,
        //'database'=> 'local',
    );
             
    private $link;//连接的资源
             
    public function __construct(){
        $this->link = new Redis();
        $this->connect();
    }
             
    public function connect(){
        $this->link->connect($this->cfg['host'], $this->cfg['port']);
    }
             
    /**
     *  @func 向redis服务器中,写入值
     *  @param $key key值
     *  @param $value value值
     *  @return 返回
     */
    public function write($key, $value){
        if(!$this->link->exists($key)){
            $this->link->setex($key, $this->cfg['timeout'], serialize($value));
        }
                     
    }
             
    /**
     *  @func 向redis服务获取值
     *  @param $key key值
     */
    public function read($key){
        $data = unserialize($this->link->get($key));
        if(!is_array($data)){
            return false;
        }
        return $data;
    }
             
    /**
     *  @func 在redis服务器中删除一个元素
     */
    public function delete($key){
        $this->link->delete($key);
    }
             
    /**
     *  @func 清空redis中的所有数据
     */
    public function flush(){
        $this->link->flushdb();
    }
             
    //清空过期数据
    public function flush_expire(){
        //会自动销毁
    }
}
?>
```