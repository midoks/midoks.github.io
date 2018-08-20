---
layout: post
title: zip通用压缩文件格式说明
tag: ['php']
category: ['算法']
a_id: 3
---

ZIP文件由三部分构成:压缩文件的内容数据、压缩的目录源数据、目录结束表示结构。

### 压缩的文件内容源数据

记录着压缩的所有文件的内容信息,其数据组织结构是对于每个文件都由file header、file data、data descriptor三部分组成:
- 1.file header:用于标示该文件的开始,结构说明如下:

|offset(偏移位移)|bytes(字节)|description(描述)|含义|
|---------------|----------|-----------------|---|
|0|4|Local file header signature = 0x04034b50 (read as a little-endian number)|文件头标识,固定值(0x04034b50)|
|4|2|Version needed to extract (minimum)|解压缩文件所需pkware最低版本|
|6|2|General purpose bit flag|通用位标记|
|8|2|Compression method|压缩方法|
|10|2|File last modification time|文件最后修改时间|
|12|2|File last modification date|文件最后修改日期|
|14|4|CRC-32|说明采用的算法|
|18|4|Compressed size|压缩后的大小|
|22|4|Uncompressed size|未压缩的大小|
|26|2|File name length (n)|文件名长度|
|28|2|Extra field length (m)|扩展区长度|
|30|n|File name|文件名|
|30+n|m|Extra field|扩展区|

- 2.file data:相应压缩文件的源数据。
- 3.data descriptor:用于标识该文件压缩结束,该结构只有在相应的header中通用标记字段的第3位设为1时才会出现,紧接在压缩文件源数据后,这个数据描述符只用在不能对输出的zip文件进行检索时使用。例如:在一个不能检索的驱动器(如:磁带机上)的ZIP文件中。如果是磁盘上的zip文件一般没有这个数据描述符。结构说明如下

|offset(偏移位移)|bytes(字节)|description(描述)|含义|
|---------------|----------|-----------------|---|
|0|4|Local file header signature = 0x08074b50|本地header标记|
|4|4|CRC-32|CRC-32|
|8|4|Compressed size|压缩后大小|
|12|4|Uncompressed size|未压缩大小|

### 压缩的目录源数据

对于压缩的目录而言,每一个子目录对应一个压缩目录源数据,记录该目录的描述信息。
压缩包中所有目录源数据连续存储在整个归档包的最后,这样便于向包中追加新的文件。结构说明如下

|offset(偏移位移)|bytes(字节)|description(描述)|含义|
|---------------|----------|-----------------|---|
|0|4|Central directory file header signature = 0x02014b50|核心目录文件header标识(0x02014b50)|
|4|2|Version made by|压缩所用的pkware版本|
|6|2|Version needed to extract (minimum)|解压所需要pkware的最低版本|
|8|2|General purpose bit flag|通用位标记|
|10|2|Compression method|压缩方法|
|12|2|File last modification time|文件最后修改时间|
|14|2|File last modification date|文件最后修改日期|
|16|4|CRC-32|CRC-32算法|
|20|4|Compressed size|压缩后大小|
|24|4|Uncompressed size|未压缩的大小|
|28|2|File name length (n)|文件名长度|
|30|2|Extra field length (m)|扩展域长度|
|32|2|File comment length (k)|文件注释长度|
|34|2|Disk number where file starts|文件开始位置的磁盘编号|
|36|2|Internal file attributes|内部文件属性|
|38|4|External file attributes|外部文件属性|
|42|4|Relative offset of local file header. This is the number of bytes between the start of the first disk on which the file occurs, and the start of the local file header. This allows software reading the central directory to locate the position of the file inside the ZIP file.|本地文件header的相对位移。|
|46|n|File name|目录文件名|
|46+n|m|Extra field|扩展域|
|46+n+m|k|File comment|文件注释内容|

### 目录结束标识结构
目录结束标识存在于整个归档包的结尾,用于标记压缩的目录数据的结束。结构说明如下

|offset(偏移位移)|bytes(字节)|description(描述)|含义|
|---------------|----------|-----------------|---|
|0|4|End of central directory signature = 0x06054b50|核心目录结束标记（0x06054b50）|
|4|2|Number of this disk|当前磁盘编号|
|6|2|Disk where central directory starts|核心目录开始位置的磁盘编号|
|8|2|Number of central directory records on this disk|该磁盘上所记录的核心目录数量|
|10|2|Total number of central directory records|核心目录结构总数|
|12|4|Size of central directory (bytes)|核心目录的大小|
|16|4|Offset of start of central directory, relative to start of archive|核心目录开始位置相对于archive开始的位移|
|20|2|Comment length (n)|注释长度|
|22|n|Comment|注释内容|

### 压缩方法的选取

- 0 - The file is stored (no compression)
- 1 - The file is Shrunk
- 2 - The file is Reduced with compression factor 1
- 3 - The file is Reduced with compression factor 2
- 4 - The file is Reduced with compression factor 3
- 5 - The file is Reduced with compression factor 4
- 6 - The file is Imploded
- 7 - Reserved for Tokenizing compression algorithm
- 8 - The file is Deflated
- 9 - Enhanced Deflating using Deflate64(tm)
- 10 - PKWARE Data Compression Library Imploding
- 11 - Reserved by PKWARE
- 12 - File is compressed using BZIP2 algorithm

### 相关链接
[zip](https://github.com/midoks/midoks/blob/master/Algorithm/zip.class.php)
