# 运维

## 常用命令

### 查看 nginx 服务，定位配置文件

1. 查看 nginx 服务

```bash
ps -ef | grep nginx
```
2. 找到 master 进程的 nginx 命令位置, `-t` 查看配置文件位置。

```bash
/usr/sbin/nginx -t
```
