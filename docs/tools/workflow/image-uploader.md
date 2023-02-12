---
sidebarDepth: 3
---
# 快速上传图片到云图床

## 目标

1. 复制图片到剪切板后，配合 Alfred 使用快捷键上传至又拍云（支持大部分图床，可自行配置）
2. 添加右键上传

## 效果

图片复制到剪切板后，按快捷键上传，成功后会将 md 格式图片复制到剪切板，并输出到光标处。

用 QQ 制作的简单 gif 图片，正常右上角是有上传中、上传成功提示的
![QQ20230212-124410-HD.gif](https://cdn.superwen.cn/auto-upload/2023/0ead4051eeabad8bb478bb748453a440.gif)

## 环境

-   Apple M1 macOS Ventura 13.1
-   php7.4
-   Alfred 4.6.2
-   pngpaste 0.2.3

## 相关工具说明

### PicUploader

本文的主要实现是依赖该开源工具，[地址](https://github.com/xiebruce/PicUploader)，是目前比较不错的实现。
也可忽略本文直接参照该库去自行实现，本文是记录实现步骤和遇到的问题。

### Alfred

Alfred 是 Mac 上的一个效率工具，它最经典的就是类似 Mac 自带的“聚焦搜索”的功能，它的大概功能可自行搜索关键字：效率神器 Alfred。
Alfred 体积非常小，不到 8M，占用内存也非常小。Alfred 本身免费，但它的“Powerpack”(可理解为“增强功能包”)是收费的(39 英镑 ≈341 元终身授权)，当然你也可以用 PJ 版(可以去找)，但 PJ 版一般跟不上系统版本，如果你喜欢用最新系统，可能有时候用不了。

### pngpaste

快捷键上传，其实就是通过按快捷键调用命令，获取到系统剪贴板中的图片并把它保存成图片文件，然后上传该图片文件。目前最方便的就是通过 pngpaste 来获取，所以我们需要安装 pngpaste。
使用 brew 安装 pngpaste：

```sh
brew install pngpaste
```

## 快捷键上传实现步骤

### 1. 下载 [PicUploader](https://github.com/xiebruce/PicUploader)

将仓库克隆到本地

### 2. 配置

找到 `config` 文件下的 `config.php`，另复制为 `config-local.php`，然后在`config-local.php`中填写配置。

我使用的是又拍云，已经申请过云储存服务，所以这里的工作是找到接入又拍云需要的参数：
`serviceName、operator、password、domain`

#### serviceName、domain

![image.jpg](https://cdn.superwen.cn/auto-upload/2023/3161bebdb399c48618c2e5758624cd11.jpg)

#### operator、password

进入上图所示的服务内，存储管理 - 操作员授权 - 点击授权 - 新建授权操作员
![image.jpg](https://cdn.superwen.cn/auto-upload/2023/b7c0ffdfc25c0703d7a6fa915a6953e5.jpg)

### 3. 安装 Alfred workflow

[下载地址](https://cdn.superwen.cn/wiki/PicUploaderHelper.alfredworkflow)

双击文件，安装 alfredworkflow

导入后可看到三个图标:

![image.jpg](https://cdn.superwen.cn/auto-upload/2023/06cdf99d8f56c5ee076e2be84b68d9db.jpg)

双击第一个 HotKey 图标可设置快捷键；
双击第二个 Run Script 图标设置快捷键要运行的命令，Language 选择 `/bin/bash→with input argv→Sequentially`，script 填写(**注意路径要换成你自己的**)：

```
/usr/local/bin/php /path/to/personal/PicUploader/index.php --type=alfred
```

双击第三个 clipboard 图标，type 选择 Plain Text，框里填 `{query}`，并勾选`Automatically paste to front most app`。
使用： 把鼠标光标置于任意编辑器界面上，截图 → 复制到剪贴板 → 按快捷键 → 右上角提示上传中 → 右上角提示上传完成(此时返回的链接已经自动粘贴到编辑器中)！

## 添加右键上传

打开`自动操作(Automator)`，打开它，创建一个服务，输入 `shell` 搜索 → 搜索出 `运行 Shell 脚本` → 把它拖到右侧：

工作流程收到当前：文件或文件夹 位于 `访达.app`

-   输入为：灰色不可选，也不需要选
-   图像：默认就行
-   颜色：默认就行

运行 Shell 脚本：

-   Shell: `/bin/bash`
-   传递输入: 作为自变量
-   命令(注意把这里的路径改成你电脑上的路径)：

```sh
export LC_CTYPE="zh_CN.UTF-8"
/usr/bin/php /path/to/PicUploader/index.php "$@" | pbcopy
```

最后 `cmd+s` 保存 → 命名成 `Upload with PicUploader` 就完成了，可以关掉 `自动操作` APP 了，然去 `Finder` 随便右击一个文件，是不是有个菜单叫 `Upload with PicUploader`? 点击它就可以上传该文件了。
