# Electron V9版本

## master分支使用 autoUpdater实现，   builder分支使用 electron-builder 实现

## 安装依赖包
```bash
$ npm i

```

## 更新地址配置，存放打包出来的文件 `RELEASES` , `*.nupkg` , `*.exe` 
```js
autoUpdater.setFeedURL('{Your URL}');
```


## 打包
```bash
$ npm run package
$ npm run build 

```