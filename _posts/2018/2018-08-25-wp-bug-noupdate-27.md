---
layout: post
title: wordpress禁止后台显示更新
tag: [php']
categories: ['脚本语言']
a_id: 27
---

最经wordpress更新的力度有点大,更新了又提示更新,我不喜欢这样,就到找了解决方案。复制一下代码,可以禁止更新显示在后台上。

```
//禁止更新提示
add_filter('pre_site_transient_update_core',    create_function('$a', "return null;")); // 关闭核心提示
add_filter('pre_site_transient_update_plugins', create_function('$a', "return null;")); // 关闭插件提示
add_filter('pre_site_transient_update_themes',  create_function('$a', "return null;")); // 关闭主题提示
remove_action('admin_init', '_maybe_update_core');    // 禁止 WordPress 检查更新
remove_action('admin_init', '_maybe_update_plugins'); // 禁止 WordPress 更新插件
remove_action('admin_init', '_maybe_update_themes');  // 禁止 WordPress 更新主题
```