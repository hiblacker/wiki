# Npm scripts 自动部署

<!-- TODO Npm scripts 自动部署 -->

1. 先配置 [SSH 免密登录](/DevOps/ssh.html)
2. 使用 scp 命令。或者 rsync

```bash
# 会暴露很多信息，注意风险控制
yarn build:test && scp -r -P 62366 ./dist/* root@123.1.1.29:/home/www
```
