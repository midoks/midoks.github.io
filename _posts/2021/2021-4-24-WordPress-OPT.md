---
layout: post
title: WordPress深度优化记录[10ms]
tag: ['php','WordPress']
categories: ['运维']
a_id: 56
---

配置我的插件，效果更佳。

- https://github.com/midoks/wp-cache-db

- php7.2
- opcache

# -- wp-settings.php | load_default_textdomain

- 多语言加载,前台可以不加载
```
if (is_admin()) {
    load_default_textdomain();
    $locale      = get_locale();
    $locale_file = WP_LANG_DIR . "/$locale.php";
    if ((0 === validate_file($locale)) && is_readable($locale_file)) {
        require $locale_file;
    }
    unset($locale_file);
}
```

# -- l10n.php | translate

```
function translate($text, $domain = 'default') {
    if (!is_admin()) {
        return $text;
    }

...
}
```

# -- l10n.php | translate_with_gettext_context
```
function translate_with_gettext_context($text, $context, $domain = 'default') {
    if (!is_admin()) {return $text;}
    ...
}
```

# -- option.php | get_option
```
function get_option($option, $default = false) {
    // var_dump($option);
    global $cache_option;
    if (isset($cache_option[$option])) {
        return $cache_option[$option];
    }
    ...
    $v                     = apply_filters("option_{$option}", maybe_unserialize($value), $option);
    $cache_option[$option] = $v;
    return $v;
}
```

# -- scripts-loader.php | wp_default_scripts
```
function wp_default_scripts($scripts) {
    if (!is_admin()) {return;}
    ...
}
```

# -- blocks.php | register_block_type_from_metadata
```
function register_block_type_from_metadata($file_or_folder, $args = array()) {
    if (!is_admin()) {return;}
    ...
}
```