---
layout: post
title: zip通用压缩文件格式说明
tag: ['php', '算法']
category: ['算法']
a_id: 3
---

ZIP文件由三部分构成:压缩文件的内容数据、压缩的目录源数据、目录结束表示结构。

### 压缩的文件内容源数据

记录着压缩的所有文件的内容信息,其数据组织结构是对于每个文件都由file header、file data、data descriptor三部分组成:
1.file header:用于标示该文件的开始,结构说明如下:

<table class="table table-bordered">
<tr><td>offset(偏移位移)</td><td>bytes(字节)</td><td>description(描述)</td><td>含义</td></tr>
<tr><td>0</td><td>4</td><td>Local file header signature = 0x04034b50 (read as a little-endian number)</td><td>文件头标识,固定值(0x04034b50)</td></tr>
<tr><td>4</td><td>2</td><td>Version needed to extract (minimum)</td><td>解压缩文件所需pkware最低版本</td></tr>
<tr><td>6</td><td>2</td><td>General purpose bit flag</td><td>通用位标记</td></tr>
<tr><td>8</td><td>2</td><td>Compression method</td><td>压缩方法</td></tr>
<tr><td>10</td><td>2</td><td>File last modification time</td><td>文件最后修改时间</td></tr>
<tr><td>12</td><td>2</td><td>File last modification date</td><td>文件最后修改日期</td></tr>
<tr><td>14</td><td>4</td><td>CRC-32</td><td>说明采用的算法</td></tr>
<tr><td>18</td><td>4</td><td>Compressed size</td><td>压缩后的大小</td></tr>
<tr><td>22</td><td>4</td><td>Uncompressed size</td><td>未压缩的大小</td></tr>
<tr><td>26</td><td>2</td><td>File name length (n)</td><td>文件名长度</td></tr>
<tr><td>28</td><td>2</td><td>Extra field length (m)</td><td>扩展区长度</td></tr>
<tr><td>30</td><td>n</td><td>File name</td><td>文件名</td></tr>
<tr><td>30+n</td><td>m</td><td>Extra field</td><td>扩展区</td></tr>
</table>

2.file data:相应压缩文件的源数据。
3.data descriptor:用于标识该文件压缩结束,该结构只有在相应的header中通用标记字段的第3位设为1时才会出现,紧接在压缩文件源数据后,这个数据描述符只用在不能对输出的zip文件进行检索时使用。例如:在一个不能检索的驱动器(如:磁带机上)的ZIP文件中。如果是磁盘上的zip文件一般没有这个数据描述符。结构说明如下

<table class="table table-bordered">
<tr><td>offset(偏移位移)</td><td>bytes(字节)</td><td>description(描述)</td><td>含义</td></tr>
<tr><td>0</td><td>4</td><td>Local file header signature = 0x08074b50</td><td>本地header标记</td></tr>
<tr><td>4</td><td>4</td><td>CRC-32</td><td>CRC-32</td></tr>
<tr><td>8</td><td>4</td><td>Compressed size</td><td>压缩后大小</td></tr>
<tr><td>12</td><td>4</td><td>Uncompressed size</td><td>未压缩大小</td></tr>
</table>

### 压缩的目录源数据

对于压缩的目录而言,每一个子目录对应一个压缩目录源数据,记录该目录的描述信息。压缩包中所有目录源数据连续存储在整个归档包的最后,这样便于向包中追加新的文件。结构说明如下

<table class="table table-bordered">
<tr><td>offset(偏移位移)</td><td>bytes(字节)</td><td>description(描述)</td><td>含义</td></tr>
<tr><td>0</td><td>4</td><td>Central directory file header signature = 0x02014b50</td><td>核心目录文件header标识(0x02014b50)</td></tr>
<tr><td>4</td><td>2</td><td>Version made by</td><td>压缩所用的pkware版本</td></tr>
<tr><td>6</td><td>2</td><td>Version needed to extract (minimum)</td><td>解压所需要pkware的最低版本</td></tr>
<tr><td>8</td><td>2</td><td>General purpose bit flag</td><td>通用位标记</td></tr>
<tr><td>10</td><td>2</td><td>Compression method</td><td>压缩方法</td></tr>
<tr><td>12</td><td>2</td><td>File last modification time</td><td>文件最后修改时间</td></tr>
<tr><td>14</td><td>2</td><td>File last modification date</td><td>文件最后修改日期</td></tr>
<tr><td>16</td><td>4</td><td>CRC-32</td><td>CRC-32算法</td></tr>
<tr><td>20</td><td>4</td><td>Compressed size</td><td>压缩后大小</td></tr>
<tr><td>24</td><td>4</td><td>Uncompressed size</td><td>未压缩的大小</td></tr>
<tr><td>28</td><td>2</td><td>File name length (n)</td><td>文件名长度</td></tr>
<tr><td>30</td><td>2</td><td>Extra field length (m)</td><td>扩展域长度</td></tr>
<tr><td>32</td><td>2</td><td>File comment length (k)</td><td>文件注释长度</td></tr>
<tr><td>34</td><td>2</td><td>Disk number where file starts</td><td>文件开始位置的磁盘编号</td></tr>
<tr><td>36</td><td>2</td><td>Internal file attributes</td><td>内部文件属性</td></tr>
<tr><td>38</td><td>4</td><td>External file attributes</td><td>外部文件属性</td></tr>
<tr><td>42</td><td>4</td><td>Relative offset of local file header. This is the number of bytes between the start of the first disk on which the file occurs, and the start of the local file header. This allows software reading the central directory to locate the position of the file inside the ZIP file.</td><td>本地文件header的相对位移。</td></tr>
<tr><td>46</td><td>n</td><td>File name</td><td>目录文件名</td></tr>
<tr><td>46+n</td><td>m</td><td>Extra field</td><td>扩展域</td></tr>
<tr><td>46+n+m</td><td>k</td><td>File comment</td><td>文件注释内容</td></tr>
</table>

### 目录结束标识结构
目录结束标识存在于整个归档包的结尾,用于标记压缩的目录数据的结束。结构说明如下

<table class="table table-bordered">
<tr><td>offset(偏移位移)</td><td>bytes(字节)</td><td>description(描述)</td><td>含义</td></tr>
<tr><td>0</td><td>4</td><td>End of central directory signature = 0x06054b50</td><td>核心目录结束标记（0x06054b50）</td></tr>
<tr><td>4</td><td>2</td><td>Number of this disk</td><td>当前磁盘编号</td></tr>
<tr><td>6</td><td>2</td><td>Disk where central directory starts</td><td>核心目录开始位置的磁盘编号</td></tr>
<tr><td>8</td><td>2</td><td>Number of central directory records on this disk</td><td>该磁盘上所记录的核心目录数量</td></tr>
<tr><td>10</td><td>2</td><td>Total number of central directory records</td><td>核心目录结构总数</td></tr>
<tr><td>12</td><td>4</td><td>Size of central directory (bytes)</td><td>核心目录的大小</td></tr>
<tr><td>16</td><td>4</td><td>Offset of start of central directory, relative to start of archive</td><td>核心目录开始位置相对于archive开始的位移</td></tr>
<tr><td>20</td><td>2</td><td>Comment length (n)</td><td>注释长度</td></tr>
<tr><td>22</td><td>n</td><td>Comment</td><td>注释内容</td></tr>
</table>

### 压缩方法的选取

0 - The file is stored (no compression)
1 - The file is Shrunk
2 - The file is Reduced with compression factor 1
3 - The file is Reduced with compression factor 2
4 - The file is Reduced with compression factor 3
5 - The file is Reduced with compression factor 4
6 - The file is Imploded
7 - Reserved for Tokenizing compression algorithm
8 - The file is Deflated
9 - Enhanced Deflating using Deflate64(tm)
10 - PKWARE Data Compression Library Imploding
11 - Reserved by PKWARE
12 - File is compressed using BZIP2 algorithm

### 相关链接
[zip](https://github.com/midoks/midoks/blob/master/Algorithm/zip.class.php)
