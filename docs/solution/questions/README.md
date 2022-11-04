## 项目/技术

## 一、跨域

### 1、同源策略

浏览器同源策略限制请求

同源是指"`协议+域名+端口`"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。

限制以下行为

1.  `Cookie`、`LocalStorage` 和 `IndexDB` 无法读取

2.  `DOM` 和 Js对象无法获得

3.  `AJAX` 请求不能发送


**有三个标签是允许跨域加载资源**：

+   `<img src=XXX>`
+   `<link href=XXX>`
+   `<script src=XXX>`

### 2、解决方案

#### 1）通过`jsonp`跨域

`script`标签不受策略影响，可以动态生成script去请求数据，但是仅限Get请求

**原生实现**

```html
<script>
  var script = document.createElement('script');
  script.type = 'text/javascript';
  // 传参并指定回调执行函数为onBack
  script.src = 'http://www.domain2.com:8080/login?user=admin&callback=onBack';
  document.head.appendChild(script);
  // 回调执行函数
  function onBack(res) {
    alert(JSON.stringify(res));
  }
</script>
```

**vue实现**

```js
this.$http.jsonp(
  'http://www.domain2.com:8080/login',
   {
     params: {},
    jsonp: 'onBack'
   }
  ).then(res => { console.log(res); }
)
```

#### 2）`document.domain + iframe`跨域

仅限主域相同，子域不同的跨域应用场景

**实现原理**：两个页面都通过js强制设置`document.domain`为基础主域，就实现了同域

```html
<!-- 父窗口：http://www.domain.com/a.html -->
<iframe id="iframe" src="http://child.domain.com/b.html">
</iframe>

<script>
  document.domain = 'domain.com';
  var user = 'admin';
</script>

<!-- 子窗口：http://child.domain.com/b.html -->
<script>
  document.domain = 'domain.com';
  // 获取父窗口中变量
  alert('get js data from parent ---> '+ window.parent.user);
</script>
```

#### 3）`location.hash + iframe`

**实现原理**： a欲与b跨域相互通信，通过中间页c来实现。 三个页面，不同域之间利用`iframe`的`location.hash`传值，相同域之间直接js访问来通信。

具体实现： A域：a.html -> B域：b.html -> A域：c.html，

a与b不同域只能通过hash值单向通信，b与c也不同域也只能单向通信，但c与a同域，所以c可通过`parent.parent`访问a页面所有对象。

#### 4）`window.name + iframe`跨域

`window.name`属性的独特之处：name值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值（2MB）。

通过`iframe`的src属性由外域转向本地域，跨域数据即由`iframe`的`window.name`从外域传递到本地域。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作。

#### 5） `postMessage`跨域

`postMessage`一般用于解决以下问题

a.） 页面和其打开的新窗口的数据传递

b.） 多窗口之间消息传递

c.） 页面与嵌套的iframe消息传递

d.） 上面三个场景的跨域数据传递

```html
<!-- a页面：http://www.domain1.com/a.html -->
<iframe id="iframe"
        src="http://www.domain2.com/b.html"
        style="display:none;">
</iframe>
<script>
  var iframe = document.getElementById('iframe');
  iframe.onload = function() {
    var data = {
      name: 'aym'
    };
    // 向domain2传送跨域数据
    iframe.contentWindow.postMessage
    (JSON.stringify(data),
     'http://www.domain2.com');
  };
  // 接受domain2返回数据
  window.addEventListener
  ('message', function(e) {
    alert('data from domain2 ---> ' + e.data);
  },
   false);
</script>

<!-- b页面：http://www.domain2.com/b.html -->
<script>
  // 接收domain1的数据
  window.addEventListener
  ('message', function(e) {
    alert('data from domain1 ---> ' + e.data);
    var data = JSON.parse(e.data);
    if (data) {
      data.number = 16;
      // 处理后再发回domain1
      window.parent.postMessage(JSON.stringify(data),
                                'http://www.domain1.com');
    }
  }, false);
</script>
```

#### 6）跨域资源共享（CORS）：主流的跨域解决方案

服务端设置`Access-Control-Allow-Origin`即可

**若要带cookie请求：前后端都需要设置。**

**前端：** : 检查前端设置是否带`cookie`：`xhr.withCredentials = true;`

通过这种方式解决跨域问题的话，会在发送请求时出现两种情况，分别为**简单请求**和**复杂请求**。

**简单请求：**

使用下列方法之一：

+   GET
+   HEAD
+   POST

`Content-Type` 的值仅限于下列三者之一：

+   `text/plain`
+   `multipart/form-data`
+   `application/x-www-form-urlencoded`

不符合以上条件的请求就肯定是复杂请求了。 复杂请求的CORS请求，**会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求,** 该请求是 **option** 方法的，通过该请求来知道服务端是否允许跨域请求。

**OPTIONS预检请求**

请求头：

+   `Origin`：当前请求源，和响应头里的Access-Control-Allow-Origin 对标， 是否允许当前源访问，Origin是不可修改的
+   `Access-Control-Request-Headers`：本次真实请求的额外请求头，和响应头里的Access-Control-Allow-Headers对标，是否允许真实请求的请求头
+   `Access-Control-Request-Method`：本次真实请求的额外方法，和响应头里的Access-Control-Allow-Methods对标，是否允许真实请求使用的请求方法

响应头

+   `Access-Control-Allow-Credentials`：

    这里的`Credentials`（凭证）其意包括：`Cookie` ，授权标头或 TLS 客户端证书，默认CORS请求是不带`Cookies`的，这与JSONP不同，JSONP每次请求都携带Cookies的，当然跨域允许带Cookies会导致CSRF漏洞。如果非要跨域传递Cookies，web端需要给ajax设置`withCredentials`为true，同时，服务器也必须使用`Access-Control-Allow-Credentials`头响应。此响应头true意味着服务器允许cookies（或其他用户凭据）包含在跨域请求中。另外，简单的GET请求是不预检的，即使请求的时候设置`widthCrenditials`为true，如果响应头不带`Access-Control-Allow-Credentials`，则会导致整个响应资源被浏览器忽略。

+   `Access-Control-Allow-Headers`

+   `Access-Control-Allow-Methods`

+   `Access-Control-Allow-Origin`

+   `Access-Control-Expose-Headers`：

    在CORS中，默认的，只允许客户端读取下面六个响应头（在axios响应对象的headers里能看到）：

    +   `Cache-Control`
    +   `Content-Language`
    +   `Content-Type`
    +   `Expires`
    +   `Last-Modified`
    +   `Pragma`

如果这六个以外的响应头要是想让客户端读取到，就需要设置`Access-Control-Expose-Headers`这个为响应头名了，比如A`ccess-Control-Expose-Headers: Token`

+   `Access-Control-Max-Age`：设置预检请求的有效时长，就是服务器允许的请求方法和请求头做个缓存。

* * *

#### 7）`nginx`代理跨域

**nginx配置解决iconfont跨域**

浏览器跨域访问js、css、img等常规静态资源被同源策略许可，但iconfont字体文件(eot|otf|ttf|woff|svg)例外，此时可在nginx的静态资源服务器中加入以下配置。

```JSON
location / {
  add_header
  Access-Control-Allow-Origin *;
}
```

**反向代理**

跨域原理： 同源策略是浏览器的安全策略，不是HTTP协议的一部分。服务器端调用HTTP接口只是使用HTTP协议，不会执行JS脚本，不需要同源策略，也就不存在跨越问题。

通过nginx配置一个代理服务器（域名与domain1相同，端口不同）做跳板机，反向代理访问domain2接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域登录。

```JSON
#proxy服务器
server {
  listen
  81;
  server_name  www.domain1.com;
  location / {
    proxy_pass
      http://www.domain2.com:8080;
    #反向代理
    proxy_cookie_domain
    www.domain2.com www.domain1.com;
    # 修改cookie里域名
    index  index.html index.htm;
    # 用webpack-dev-server等中间件代理接口访问nignx时，
    # 此时无浏览器参与，故没有同源限制，面的跨域配置可不启用
    add_header Access-Control-Allow-Origin
    http://www.domain1.com;
    # 当前端只跨域不带cookie时，可为*
    add_header Access-Control-Allow-Credentials true;
  }
}
```

#### 8）`nodejs`中间件代理跨域

node中间件实现跨域代理，原理大致与nginx相同，都是通过启一个代理服务器，实现数据的转发，也可以通过设置cookieDomainRewrite参数修改响应头中cookie中域名，实现当前域的cookie写入，方便接口登录认证。

#### 9）`WebSocket`协议跨域

WebSocket protocol是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是server push技术的一种很好的实现。

原生WebSocket API使用起来不太方便，我们使用Socket.io，它很好地封装了webSocket接口，提供了更简单、灵活的接口，也对不支持webSocket的浏览器提供了向下兼容。

```html
<div>user input：
  <input type="text">
</div>

<script src="./socket.io.js"></script>
<script>var socket = io('
                        http://www.domain2.com:8080');
                        // 连接成功处理
                        socket.on('connect', function() {
    // 监听服务端消息
    socket.on('message', function(msg) {
      console.log('data from server: ---> ' + msg);
    });
    // 监听服务端关闭
    socket.on('disconnect', function() {
      console.log('Server socket has closed.');
    });
  });
  document.getElementsByTagName('input')
  [0].onblur = function() {
    socket.send(this.value);
  };
 </script>
```

## 二、 轮播图实现

#### 1、借助组件或者框架：Swiper、BootStrap

实现原理：参考代码

#### 2、css3动画实现的轮播图

实现原理：

1.  设置大的div   

    a) 设置绝对定位，定位位置，

    b) 设置图片展示出来的高度和宽度（height和width）；

    c) 设置`overflow:hidden`;设置超出部分隐藏；使得图片只能在这个框中显示；

2.  设置小的div,将所有图片都包起来；宽度是所有图片的宽度；设置`position:relative` / `position:absolute`  来让它可以实现轮播的功能；必不可少。（自己的理解，设置大div和小div 的position,来让div浮起来，脱离文档流，就像云一样，可以飘了~）

3.  给里面的图片设置float:left;向左浮动，可以让所有图片都在同一行；如果没有float:left；会导致图片轮播的时候出现空白；

4.  加入动画；每次都向左偏移一个图片的宽度，即可实现图片轮播；

5.  将第一张图片与最后一张图片设置成一样的，是为了实现视觉上的无缝连接；


#### 3、JS方法

轮播图原理就是图片的移动。所有轮播图片横向排列，在一个窗口中显示一张图片，窗口外的图片隐藏，每一次一排图片就是移动一张图片的距离，切换到下一张图片，即可实现图片轮播。

图片的移动有两种方式：

+   `translate` 实现的图片移动
+   `position`定位实现图片的偏移

图片的自动播放，使用间隔定时器 `setInterval`

通过定位的方式，改变`lef`t或`top`的值，形成轮播图的效果

**1、自动轮播：**

用`setInterval(func，time)`；

被调用的函数不断地自加，也就是不断地往后循环，当图片到最后一张时，让其跳转到第一张。

先将所有图片，下方指示点的样式设置为一样的，再对当前索引对应的图片，设置特别的样式。

**2\. 鼠标移入，移出事件**

> 注意：
>
> 1）如果你想要通过点击事件来改变图片的移动时，就必须让鼠标移动到上面时设置清除计时器；因为如果不设置的话，当你通过点击事件改变它时，它自身也会自己改变，会出现混乱。
>
> 2）当清除完后，鼠标移出后需要重新启动计时器，这时候不能再给它设置var jishi;因为如果再加上var 的话，相当于重新又定义了一个变量，会有好几个计时器同时进行，会越来越快。

**3\. 手动轮播 底下指示点的按钮控制**

判断点击的是哪个点，然后将它的索引值赋值给index，再通过调用change功能，实现它的改变。

**4\. 左右按钮的控制**

让它实现自增或自减，然后调用change功能来改变样式。 其实这里的知识点和自动轮播里的知识点差不多。（从最后一张图片跳转到第一张图片 ，从第一张跳转到最后一张。）

无论是自动轮播，还是点击控制，都要加入change功能以及index 来实现对样式的控制，从而实现轮播的效果。

## 三、图片懒加载

#### 原理

优先加载可视区域的内容，其他部分等进入了可视区域再加载，从而提高性能

**原理：**

一张图片就是一个`<img>`标签，浏览器是否发起请求图片是根据`<img>`的`src`属性，所以实现懒加载的关键就是，在图片没有进入可视区域时，先不给`<img>`的src赋值，这样浏览器就不会发送请求了，等到图片进入可视区域再给`src`赋值。

**实现思路：**

1.  加载`loading`图片

2.  判断哪些图片要加载【重点】

    当图片距离顶部的距离top-height等于可视区域h和滚动区域高度s之和时说明图片马上就要进入可视区了

3.  隐形加载图片

    创建一个临时图片，new Image() ，不会加载到页面上去，实现隐形加载

4.  替换真图片

    替换src属性


页面布局位置基础知识

> +   网页可见区域宽： `document.body.clientWidth`;
> +   网页可见区域高： `document.body.clientHeight;`
> +   网页可见区域宽： `document.body.offsetWidth` (包括边线的宽);
> +   网页可见区域高： `document.body.offsetHeight` (包括边线的高);

> +   网页正文全文宽： `document.body.scrollWidth;`
> +   网页正文全文高： `document.body.scrollHeight;`
> +   网页被卷去的高： `document.body.scrollTop;`
> +   网页被卷去的左： `document.body.scrollLeft;`

> +   网页正文部分上： `window.screenTop;`
> +   网页正文部分左： `window.screenLeft;`
> +   屏幕分辨率的高： `window.screen.height;`
> +   屏幕分辨率的宽： `window.screen.width;`
> +   屏幕可用工作区高度： `window.screen.availHeight;`

+   对块级元素来说，`offsetTop`、`offsetLeft`、`offsetWidth` 及 `offsetHeight` 描述了元素相对于 `offsetParent` 的边界框

+   `HTMLElement.offsetParent` 是一个只读属性，返回一个指向最近的（指包含层级上的最近）包含该元素的定位元素或者最近的 `table,td,th,body`元素。当元素的 `style.display` 设置为 "none" 时，`offsetParent` 返回 `null`。`offsetParent` 很有用，因为 `offsetTop` 和 `offsetLeft` 都是相对于其内边距边界的。

+   `HTMLElement.offsetTop` 为只读属性，它返回当前元素相对于其 offsetParent 元素的顶部的距离。

+   `window.innerHeight：`浏览器窗口的视口（viewport）高度（以像素为单位）；如果有水平滚动条，也包括滚动条高度。


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30a2a605e5a94021945ef87191f041fd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1956:0:0:0.image)

#### 代码实现

可以给`img`标签统一自定义属性`data-src='default.png'`，当检测到图片出现在窗口之后再补充src属性，此时才会进行图片资源加载。

```js
function lazyload() {
  const imgs = document.getElementsByTagName('img');
  const len = imgs.length;
  // 视口的高度
  const viewHeight = document.documentElement.clientHeight;
  // 滚动条高度
  const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
  for (let i = 0; i < len; i++) {
    const offsetHeight = imgs[i].offsetTop;
    if (offsetHeight < viewHeight + scrollHeight) {
      const src = imgs[i].dataset.src;
      imgs[i].src = src;
    }
  }
}

// 可以使用节流优化一下
window.addEventListener('scroll', lazyload);
```

## 四、单点登录（SSO）实现

### 1\. 说明

单点登录（Single Sign On），简称为 SSO，是目前比较流行的企业业务整合的解决方案之一

SSO的定义是在多个应用系统中，用户只需要登录一次就可以访问所有相互信任的应用系统

SSO 一般都需要一个独立的认证中心（passport），子系统的登录均得通过passport，子系统本身将不参与登录操作

当一个系统成功登录以后，passport将会颁发一个令牌给各个子系统，子系统可以拿着令牌会获取各自的受保护资源，为了减少频繁认证，各个子系统在被passport授权以后，会建立一个局部会话，在一定时间内可以无需再次向passport发起认证

### 2\. 同域名下的单点登录

`cookie`的`domain`属性设置为当前域的父域，并且父域的`cookie`会被子域所共享。`path`属性默认为web应用的上下文路径

利用 Cookie 的这个特点，我们只需要将Cookie的domain属性设置为父域的域名（主域名），同时将 Cookie的path属性设置为根路径，将 `Session ID`（或 `Token`）保存到父域中。这样所有的子域应用就都可以访问到这个`Cookie`

不过这要求应用系统的域名需建立在一个共同的主域名之下，如`tieba.baidu.com` 和 `map.baidu.com`，它们都建立在 `baidu.com`这个主域名之下，那么它们就可以通过这种方式来实现单点登录

### 3\. 不同域名下的单点登录

这里只介绍使用过的：**CAS**（**Central Authentication Service**） 官网流程图： ![CAS](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9122f7e35e34417a823035c4056292f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1956:0:0:0.image)

**app1登录**

1.  用户访问app1系统，app1系统是需要登录的，但用户现在没有登录。**重定向到sso认证中心，并将自己的地址作为参数。**

    `www.sso.com?service=www.java3y.com` **（[www.java3y.com视为app系统的地址）](http://www.java3y.xn--comapp)-h73k897duear536aohq1tfiq8b/ "http://www.java3y.com%E8%A7%86%E4%B8%BAapp%E7%B3%BB%E7%BB%9F%E7%9A%84%E5%9C%B0%E5%9D%80%EF%BC%89")**

2.  跳转到`CAS server`，即SSO登录系统，以后图中的CAS Server我们统一叫做SSO系统。 SSO系统也没有登录，弹出用户登录页。

3.  用户填写用户名、密码，SSO系统进行认证后，将**登录状态写入SSO的session**，浏览器（Browser）中写**入SSO域下的Cookie**。

    **即：用户与认证中心建立全局会话（生成一份Token，写到Cookie中，保存在浏览器上）** ）

4.  认证中心**重定向回app系统**，并把Token携带过去给app1，重定向的地址如：

    `www.java3y.com?token=xxxxxxx`

    SSO系统登录完成后会**生成一个ST（Service Ticket）** ，然后跳转到app1系统，同时将ST作为参数传递给app1系统。

5.  app1系统拿到ST后，从后台向SSO发送请求，**验证ST是否有效**。

6.  验证通过后，app1系统将登录状态写入session并设置app域下的Cookie。注意，此处的 cookie 和 session 保存的是用户在 app1 系统的登录状态，和 CAS 无关。


**app2登录时：**

1.  用户访问app2系统，app2系统没有登录，跳转到SSO。
2.  由于SSO已经登录了，不需要重新登录认证。
3.  SSO生成ST，浏览器跳转到app2系统，并将ST作为参数传递给app2。
4.  app2拿到ST，后台访问SSO，验证ST是否有效。
5.  验证成功后，app2将登录状态写入session，并在app2域下写入Cookie。

## 五、前端水印

1.  **显性水印+DOM元素直接遮盖：** 将水印文字直接通过一层DOM元素，覆盖到需要添加水印的图片上

2.  **显性水印+Canvas**：

    算法和显性水印+DOM元素直接遮盖一样，但其性能优于方案一，安全性略高于方案一 直接通过Canvas绘画，避免了在水印密度较大的情况下大量DOM元素的创建与添加 并且Canvas在部分环境与浏览器下拥用GPU加速的功能，故而性能提升较大

3.  **保护程序+DOM元素直接遮盖**

    上述方案中，将资源绘制在`Canvas`虽是一种可行方案，但对于普通的DOM元素（非图片） 虽然有可行方案例如`html2canva`来将DOM转化为·Canvas，但是实现过于繁杂 并且DOM将失去其事件处理响应功能，故而并不推荐这么使用，除非需要保护的资源没有任何交互 使用浏览器新增的`MutationObserver`特性（主流浏览器都已支持，参考资料中有具体文档链接） 用来监视需要保护的DOM元素及其子代的更改（包括监视DOM及其子代的删减、Style的变化，标签属性变化等等），一旦回调函数通知出现了任何更改 我们可以做出提示，提醒用户操作违法，并且删除掉水印，并且重新生成水印DOM 或者在用户更改了水印DOM的时候，将需要显示的保护资源DOM一并删除

4.  **Base64传输** 将资源文件通过`Base64`编码并且通过request请求返回（或是直接后端保存`Base64`） 而对于Img来说，`Base64`只需要一些小小的的处理就可以在Web中使用（Base64字符串可以直接作为`img`的`url`，但建议使用Js Image对象，这样避免了暴露原始URL到HTML中

5.  **加料的Base64**


## 六、大文件断点续传

上传大文件时，以下几个变量会影响我们的用户体验

+   服务器处理数据的能力
+   请求超时
+   网络波动

**分片上传：**

分片上传，就是将所要上传的文件，按照一定的大小，将整个文件分隔成多个数据块（Part）来进行分片上传,上传完之后再由服务端对所有上传的文件进行汇总整合成原始的文件

大致流程如下：

1.  将需要上传的文件按照一定的分割规则，分割成相同大小的数据块；
2.  初始化一个分片上传任务，返回本次分片上传唯一标识；
3.  按照一定的策略（串行或并行）发送各个分片数据块；
4.  发送完成后，服务端根据判断数据上传是否完整，如果完整，则进行数据块合成得到原始文件

**断点续传:**

断点续传指的是在下载或上传时，将下载或上传任务人为的划分为几个部分

每一个部分采用一个线程进行上传或下载，如果碰到网络故障，可以从已经上传或下载的部分开始继续上传下载未完成的部分，而没有必要从头开始上传下载。用户可以节省时间，提高速度

一般实现方式有两种：

+   服务器端返回，告知从哪开始
+   浏览器端自行处理

上传过程中将文件在服务器写为临时文件，等全部写完了（文件上传完），将此临时文件重命名为正式文件即可

如果中途上传中断过，下次上传的时候根据当前临时文件大小，作为在客户端读取文件的偏移量，从此位置继续读取文件数据块，上传到服务器从此偏移量继续写入文件即可

**实现思路：**

整体思路比较简单，拿到文件，保存文件唯一性标识，切割文件，分段上传，每次上传一段，根据唯一性标识判断文件上传进度，直到文件的全部片段上传完毕

## 七、扫描二维码登录的原理

#### 1）移动端基于 token 的认证机制

![移动端认证机制](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4530b39aab2f4232b74ec848ca7db7e4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1956:0:0:0.image)

基于 `token` 的认证机制，只有在第一次使用需要输入账号密码，后续使用将不在输入账号密码。 **其实在登陆的时候不仅传入账号、密码，还传入了手机的设备信息**

在服务端验证账号、密码正确后，服务端会做两件事。

1.  将账号与设备关联起来，在某种意义上，设备信息就代表着账号。

2.  生成一个 `token` 令牌，并且在 `token` 与账号、设备关联，类似于`key/value`，**token作为 key**，账号、**设备信息作为value**，持久化在磁盘上。


将 `token` 返回给移动端，**移动端将** `token` **存入在本地**，往后移动端都通过 `token` 访问服务端 API ，当然除了 `token` 之外，还需要携带设备信息，因为 `token` 可能会被劫持。带上设备信息之后，就算 `token` 被劫持也没有关系，因为**设备信息是唯一的**。

> **总结：设备信息加token唯一确定用户，完成登录认证**

* * *

#### 2）二维码扫码登录的原理

![二维码扫码登录](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff98b0d424b941d2abaec05975c3de5a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1956:0:0:0.image)

1.  **待扫描阶段**

    待扫描阶段也就是流程图中 1~5 阶段，即生成二维码阶段，这个阶段跟移动端没有关系，是 PC 端跟服务端的交互过程。

    首先 PC 端携带**设备信息**向服务端发起生成二维码请求，**服务端会生成唯一的二维码 ID**，你可以理解为 `UUID`，并且将 **二维码 ID 跟 PC 设备信息关联起来**，这跟移动端登录有点相似。

    PC 端接受到二维码 ID 之后，将二维码 ID 以二维码的形式展示，等待移动端扫码。此时在 PC 端会启动一个定时器，轮询查询二维码的状态。如果移动端未扫描的话，那么一段时间后二维码将会失效。


> **总结：PC端设备信息==>服务端生成二维码==> PC端显示==>定时器轮询二维码状态**

2.  **已扫描待确认阶段**

    流程图中第 6 ~ 10 阶段，我们在 PC 端登录微信时，手机扫码后，PC 端的二维码会变成已扫码，请在手机端确认。这个阶段是移动端跟服务端交互的过程。

    首先移动端扫描二维码，获取二维码 ID，然后**将手机端登录的信息凭证（token）和 二维码 ID 作为参数发送给服务端**，此时的手机一定是登录的，不存在没登录的情况。

    服务端接受请求后，会将 token 与二维码 ID 关联，为什么需要关联呢？你想想，我们使用微信时，移动端退出， PC 端是不是也需要退出，这个关联就有点把子作用了。然后会生成一个一次性 token，这个 token 会返回给移动端，一次性 token 用作确认时候的凭证。

    PC 端的定时器，会轮询到二维码的状态已经发生变化，会将 PC 端的二维码更新为已扫描，请确认。


> **总结：手机扫码==>手机端token+二维码ID发送到服务端==>服务器关联token和二维码ID ==> 生成token返回移动端 ==> PC端二维码状态更新**

3.  **已确认**

    流程图中的 第 11 ~ 15 步骤，这是扫码登录的最后阶段，移动端携带上一步骤中获取的临时 token ，确认登录，服务端校对完成后，会更新二维码状态，并且给 PC 端生成一个正式的 token ，后续 PC 端就是持有这个 token 访问服务端。

    PC 端的定时器，轮询到了二维码状态为登录状态，并且会获取到了生成的 token ，完成登录，后续访问都基于 token 完成。

    在服务器端会跟手机端一样，维护着 token 跟二维码、PC 设备信息、账号等信息。


> **总结：PC端获取生成的token==> 完成登录==>正常访问（基于此token）**

## 八、前端文件下载

### 1、实现方法

#### 1）`form`表单提交

为一个下载按钮添加click事件，点击时动态生成一个表单，利用表单提交的功能来实现文件的下载

```js
/**
 * 下载文件
 * @param {String} path - 请求的地址
 * @param {String} fileName - 文件名
 */
function downloadFile (downloadUrl, fileName) {
    // 创建表单
    const formObj = document.createElement('form');
    formObj.action = downloadUrl;
    formObj.method = 'get';
    formObj.style.display = 'none';
    // 创建input，主要是起传参作用
    const formItem = document.createElement('input');
    formItem.value = fileName; // 传参的值
    formItem.name = 'fileName'; // 传参的字段名
    // 插入到网页中
    formObj.appendChild(formItem);
    document.body.appendChild(formObj);
    formObj.submit(); // 发送请求
    document.body.removeChild(formObj); // 发送完清除掉
}
```

#### 2）`a`标签的`download`

```html
<a href="example.jpg" download>点击下载</a>

<a href="example.jpg" download="test">点击下载</a> // 指定文件名

// 检测浏览器是否支持download属性
const isSupport = 'download' in document.createElement('a');
```

#### 3）`open`或`location.href`

本质上和a标签访问下载链接一样

```js
window.open('downloadFile.zip');

location.href = 'downloadFile.zip';
```

#### 4）Blob对象

调用api，将文件流转为Blob二进制对象，

> 注：IE10以下不支持。

**思路：** 发请求获取二进制数据，转化为Blob对象，利用`URL.createObjectUrl`生成url地址，赋值在`a`标签的`href`属性上，结合`download`进行下载。

```js
/**
 * 下载文件
 * @param {String} path - 下载地址/下载请求地址。
 * @param {String} name - 下载文件的名字/重命名（考虑到兼容性问题，最好加上后缀名）
 */
downloadFile (path, name) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', path);
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function () {
        if (this.status === 200 || this.status === 304) {
            // 如果是IE10及以上，不支持download属性，采用msSaveOrOpenBlob方法，但是IE10以下也不支持msSaveOrOpenBlob
            if ('msSaveOrOpenBlob' in navigator) {
                navigator.msSaveOrOpenBlob(this.response, name);
                return;
            }
            /*
              如果发送请求时不设置xhr.responseType = 'blob'，
              默认ajax请求会返回DOMString类型的数据，即字符串。
              此时需要使用两处注释的代码，对返回的文本转化为Blob对象，然后创建blob url，
              此时需要注释掉原本的const url = URL.createObjectURL(target.response)。
            */
            /*
            const blob = new Blob([this.response], { type: xhr.getResponseHeader('Content-Type') });
            const url = URL.createObjectURL(blob);
            */
            const url = URL.createObjectURL(this.response); // 使用上面则注释此行
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };
}
```

```js
// 上面方法本地测试有时会有跨域问题，下面使用axios重写一下
// 已经配置好proxy
downloadFile (path, name) {
    axios.get({
      url: path,
      method: 'get'
    }).then(res => {
      const blob = new Blob([res.data], { type: res.headers['content-type'] });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    })
}
```

该方法不能缺少`a`标签的`download`属性的设置。

因为发请求时已设置返回数据类型为`Blob`类型`(xhr.responseType = 'blob')`，所以`target.response`就是一个`Blob`对象，打印出来会看到两个属性`size`和`type`。虽然`type`属性已指定了文件的类型，但是为了稳妥起见，还是在`download`属性值里指定后缀名，如`Firefox`不指定下载下来的文件就会不识别类型。

#### 5）利用`Base64`

用法跟上面用`Blob`大同小异，基本上思路一样

**不同点：** 上面是利用`Blob`对象生成`Blob URL`， 这里则是生成`Data URL`，即`base64`编码后的`url`形式。

```js
/**
 * 下载文件
 * @param {String} path - 下载地址/下载请求地址。
 * @param {String} name - 下载文件的名字（考虑到兼容性问题，最好加上后缀名）
 */
downloadFile (path, name) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', path);
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function () {
        if (this.status === 200 || this.status === 304) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(this.response);
            fileReader.onload = function () {
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = this.result;
                a.download = name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };
        }
    };
}
```

### 2、如何获取文件名

返回文件流的时候，在浏览器上观察接口返回的信息，会看到有这么一个`header`：`Content-Disposition`

其中包含了文件名：`filename=和filename*=`可以截取这段字符串中的这两个字段值了

```js
// xhr是XMLHttpRequest对象
const content = xhr.getResponseHeader('content-disposition'); // 注意是全小写，自定义的header也是全小写
if (content) {
    let name1 = content.match(/filename=(.*);/)[1]; // 获取filename的值
    let name2 = content.match(/filename*=(.*)/)[1]; // 获取filename*的值
    name1 = decodeURIComponent(name1);
    name2 = decodeURIComponent(name2.substring(6)); // 这个下标6就是UTF-8''
}
```

## 九、滚动加载

监听页面滚动事件，分析**clientHeight**、**scrollTop**、**scrollHeight**三者的属性关系。

```js
window.addEventListener('scroll', function() {
  const clientHeight = document.documentElement.clientHeight;
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  if (clientHeight + scrollTop >= scrollHeight) {
    // 检测到滚动至页面底部，进行后续操作
    // ...
  }
}, false);
```

## 十、渲染大数据

渲染大数据时，合理使用`createDocumentFragment`和`requestAnimationFrame`，将操作切分为一小段一小段执行。

```js
setTimeout(() => {
  // 插入十万条数据
  const total = 100000;
  // 一次插入的数据
  const once = 20;
  // 插入数据需要的次数
  const loopCount = Math.ceil(total / once);
  let countOfRender = 0;
  const ul = document.querySelector('ul');
  // 添加数据的方法
  function add() {
    const fragment = document.createDocumentFragment();
    for(let i = 0; i < once; i++) {
      const li = document.createElement('li');
      li.innerText = Math.floor(Math.random() * total);
      fragment.appendChild(li);
    }
    ul.appendChild(fragment);
    countOfRender += 1;
    loop();
  }
  function loop() {
    if(countOfRender < loopCount) {
      window.requestAnimationFrame(add);
    }
  }
  loop();
}, 0)
```

## 十一、VDOM转真实DOM基本原理

```js
// vnode结构：
// {
//   tag,
//   attrs,
//   children,
// }

//Virtual DOM => DOM
function render(vnode, container) {
  container.appendChild(_render(vnode));
}
function _render(vnode) {
  // 如果是数字类型转化为字符串
  if (typeof vnode === 'number') {
    vnode = String(vnode);
  }
  // 字符串类型直接就是文本节点
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }
  // 普通DOM
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    // 遍历属性
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    })
  }
  // 子数组进行递归操作
  vnode.children.forEach(child => render(child, dom));
  return dom;
}
```
