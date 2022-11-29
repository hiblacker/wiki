# 免费 HTTPS 证书安装

本文以 nginx 、腾讯云、linux 系统为例。

5 步走。

## 1. 申请证书

很多平台都可以，腾讯云，又拍云等。

腾讯云控制台搜索 SSL 证书，申请免费证书，一键 HTTPS 需要花钱。

填好域名后申请，免费的不能申请泛域名 形如 `*.tencent.com`。

申请后需要审核，一天内审核通过。通常几分钟内即可通过。

## 2. 下载证书

下载并解压申请好的证书。

其中包含 `cloud.tencent.com_nginx` 文件夹，内容：

-   `cloud.tencent.com_bundle.crt` 证书文件
-   `cloud.tencent.com_bundle.pem` 证书文件（可忽略该文件）
-   `cloud.tencent.com.key` 私钥文件
-   `cloud.tencent.com.csr` CSR 文件（可忽略该文件）

## 3. 上传证书到服务器

Mac 推荐使用 FinalShell 操作。

将已获取到的 .crt 证书文件和 .key 私钥文件从本地目录拷贝到服务器的 `/usr/local/nginx/conf` 目录（此处为 Nginx 默认安装目录，请根据实际情况操作）下。

## 4. 修改 Nginx 配置文件

```sh
server {
     #SSL 默认访问端口号为 443
     listen 443 ssl;
     #请填写绑定证书的域名
     server_name cloud.tencent.com;
     #请填写证书文件的相对路径或绝对路径
     ssl_certificate cloud.tencent.com_bundle.crt;
     #请填写私钥文件的相对路径或绝对路径
     ssl_certificate_key cloud.tencent.com.key;
     ssl_session_timeout 5m;
     #请按照以下协议配置
     ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
     #请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
     ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
     ssl_prefer_server_ciphers on;
     location / {
         #网站主页路径。此路径仅供参考，具体请您按照实际目录操作。
         #例如，您的网站主页在 Nginx 服务器的 /etc/www 目录下，则请修改 root 后面的 html 为 /etc/www。
         root html;
         index  index.html index.htm;
     }
}
```

## 5. 重启 Nginx

检测配置是否正确

```
nginx -t
```

没问题后重启

```sh
nginx -s reload
```

重载成功，即可使用 https://cloud.tencent.com 进行访问。

## HTTP 强转 HTTPS

```sh
server {
 #SSL 默认访问端口号为 443
 listen 443 ssl;
 #请填写绑定证书的域名
 server_name cloud.tencent.com;
 #请填写证书文件的相对路径或绝对路径
 ssl_certificate  cloud.tencent.com_bundle.crt;
 #请填写私钥文件的相对路径或绝对路径
 ssl_certificate_key cloud.tencent.com.key;
 ssl_session_timeout 5m;
 #请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
 ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
 #请按照以下协议配置
 ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
 ssl_prefer_server_ciphers on;
 location / {
   #网站主页路径。此路径仅供参考，具体请您按照实际目录操作。
   #例如，您的网站主页在 Nginx 服务器的 /etc/www 目录下，则请修改 root 后面的 html 为 /etc/www。
   root html;
   index index.html index.htm;
 }
}
server {
 listen 80;
 #请填写绑定证书的域名
 server_name cloud.tencent.com;
 #把http的域名请求转成https
 return 301 https://$host$request_uri;
}

```
