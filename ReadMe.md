### ImageCache
# Image Cache

## 说明

自动将image缓存到 **'_doc/uniapp_save/images/'** (默认，可更改) 目录下，下一次使用时会先查找缓存是否存在，存在则自动使用缓存，否则重复上述过程

## 使用
1. 下载组件包解压至components目录下
2. 在需要使用的地方添加代码:
```js
import ImageCache from "@/components/ImageCache";
export default{
    components:{
        ImageCache
    }
}
```
3.使用
```js
<ImageCache loadingImage="static/loading.png" errorImage="static/loading_fail.png" :src="content.coverImg"></ImageCache>
```
## props
imageStyle  |  src  |  saveDirectory  |  errorImage  |  loadingImage
------------|-------|-----------------|--------------|--------------
img的style  | 地址   |保存的目录       | 加载错误显示的图片|加载时显示的图片
String      |String |String          |String         |String
require:false|require:true|require:false|require:false|require:false