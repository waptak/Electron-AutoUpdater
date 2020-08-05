# Electron V9版本，使用官网的`electron-quick-start`示例实现

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