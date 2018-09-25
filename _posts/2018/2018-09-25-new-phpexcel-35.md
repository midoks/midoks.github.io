---
layout: post
title: 新PHPExcel版使用
tag: ['php']
categories: ['脚本语言']
a_id: 35
---

PHP操作Excel最好的方法是使用PHPExcel类, 可以到官网下载PHPExcel类库。新版PHPExcel(1.8使用)

### 官网下载
- https://github.com/PHPOffice/PHPExcel

### 读
```
<?php
require_once "PHPExcel-1.8/Classes/PHPExcel.php";

$filename = 'dd.xls';
$objReader = PHPExcel_IOFactory::createReaderForFile($filename);
$objPHPExcel = $objReader->load($filename);
$sheet = $objPHPExcel->setActiveSheetIndex(0);

$hightRow = $sheet->getHighestRow();
$hightCol = $sheet->getHighestColumn();
for ($row = 1; $row <= $hightRow; $row++) {
    for ($column = 'A'; $column <= $hightCol; $column++) {
        $dataset[] = $sheet->getCell($column . $row)->getValue();
        echo $column . $row . ":" . $sheet->getCell($column . $row)->getValue() . "\n";
    }
}
?>
```