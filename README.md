# electron-builder  （Electron V9版本，使用官网的`electron-quick-start`示例实现

## 安装依赖包
```bash
$ npm i

```

## package.json 更新地址配置
```json
"publish": [
      {
        "provider": "generic",
        "url": "http://192.168.30.111:7430/upload/electron"
      }
    ]
```


## 打包
```bash
$ npm run dist
```