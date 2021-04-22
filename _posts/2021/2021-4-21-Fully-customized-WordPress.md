---
layout: post
title: 完全定制WordPress
tag: ['php','WordPress']
categories: ['运维']
a_id: 55
---

接触WP的时候很早，但是我从来没有用它来开发一套完整的系统。用其他的框架开发一些小型网站，总感觉缺少些什么。
当我重写思考用WP开发一些简单的网站，突然感觉心情是如此的愉快。

# 总结
- 重写路径

```

/* 重制原有的post数据 */
function nb_pre_handle_404() {
    global $wp_query;
    $wp_query->post = [];
    return true;
}

add_action('pre_handle_404', 'nb_pre_handle_404');

/* 重写路径 */
function nb_rules() {
    flush_rewrite_rules();
    add_rewrite_rule('^demo\/(.+)\.html$', 'index.php??pagename=video&page=$matches[1]', 'top');

}
add_action('init', 'nb_rules');
```

- 模板载入规则
```
//模板载入规则
add_action("template_redirect", 'nb_rule_template_redirect');
function nb_rule_template_redirect() {
    global $wp;
    global $wp_query;
    global $wpdb;

    if (isset($wp_query->query['pagename'])) {
        $pagename = $wp_query->query['pagename'];
        $app      = NB_ROOT . $pagename . '.php';
        if (file_exists($app)) {
            include $app;
        } else {
            include NB_ROOT . '404.php';
        }
        die();
    }
}
```


