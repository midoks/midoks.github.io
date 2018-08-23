---
layout: post
title: wordpress禁止后台显示更新
tag: [php']
categories: ['脚本语言']
a_id: 28
---

 因为要写一些技术文章，我自然而然的像到用WP,最近几天也在一直研究它。由于它本身机制，有自动草稿(没点击写文章,它就产生ID)、自动保存(修改文章时,每隔几分钟就保存一个版本)，这是对搞技术的我，感觉极度的不满意。所以在网上找到解决方法，不负所望，找到与同卿共享。

- 1.打开wp-config.php文件,添加:

```
//自动保存时间
define('AUTOSAVE_INTERVAL', false);
//取消自动修订版
define('WP_POST_REVISIONS',false);
```

- 2.找到并打开 wp-admin/post-new.php 和 wp-admin/post.php 这两个文件，将其 "wp_enqueue_script('autosave');" 注释或删除掉。

```
//wp_enqueue_script('autosave');
```

- 3.打开 wp-admin/includes/post.php 文件，找到 'if ( $create_in_db ) {' ，查找大约 444 行左右:

```
if ( $create_in_db ) {
	$post_id = wp_insert_post( array( 'post_title' => __( 'Auto Draft' ), 'post_type' => $post_type, 'post_status' => 'auto-draft' ) );
	$post = get_post( $post_id );
	if ( current_theme_supports( 'post-formats' ) && post_type_supports( $post->post_type, 'post-formats' ) && get_option( 'default_post_format' ) )
	set_post_format( $post, get_option( 'default_post_format' ) );
} else {
```
替换为:
```
if ( $create_in_db ) {
    global $current_user;//获取当前登录管理用户
    $post = $wpdb->get_row( "SELECT * FROM $wpdb->posts WHERE post_status = 'auto-draft' AND post_type = '$post_type' AND post_author = $current_user->ID ORDER BY ID ASC LIMIT 1" );//获取最早一条自动草稿 
    if ( !$post ) {
        $post_id = wp_insert_post( array( 'post_title' => __( 'Auto Draft' ), 'post_type' => $post_type, 'post_status' => 'auto-draft' ) );
        $post = get_post( $post_id );
        }
        if ( current_theme_supports( 'post-formats' ) && post_type_supports( $post->post_type, 'post-formats' ) && get_option( 'default_post_format' ) )
            set_post_format( $post, get_option( 'default_post_format' ) );
        } else {
```



