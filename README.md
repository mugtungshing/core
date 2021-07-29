# 音游狗老黄历 Bot ![Core](https://img.shields.io/static/v1?label=&message=Core&color=blue&logo=typescript&logoColor=white)

[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg)](./LICENSE)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@mugtungshing/core)
[![npm](https://img.shields.io/npm/v/@mugtungshing/core)](https://www.npmjs.com/package/@mugtungshing/core)

「音游狗老黄历」生成器核心。

[阅读文档 ↗](https://mugtungshing-core.netlify.app/) [![Netlify Status](https://api.netlify.com/api/v1/badges/686cf4f9-a457-4c56-9b82-0a1f78946133/deploy-status)](https://app.netlify.com/sites/mugtungshing-core/deploys)

## 上手

### 安装

#### 通过包管理器安装

- npm

  ```sh
  npm i @mugtungshing/core
  ```

- yarn

  ```sh
  yarn add @mugtungshing/core
  ```

#### 从 CDN 加载

```html
<script type="module">
  import { tungshing } from "https://cdn.skypack.dev/@mugtungshing/core";
</script>
```

### 使用

```javascript
tungshing(Math.random().toString(), new Date(), "Asia/Shanghai"); // 生成 GMT+8 的今日黄历
```

**注意**：这并不是一个很好的范例，随机种子需要对每个用户独立唯一，且无法通过用户 ID 推出。

## 贡献

欢迎贡献！

1. 点击右上角的 Fork
2. 创建一个分支 (`git checkout -b feature/user-update-dict`)
3. 提交更改 (`git commit -m 'feat(dict): add SDVX'`)
4. 推送更改 (`git push origin feature/user-update-dict`)
5. 提交 Pull Request

> 需要向词典添加内容，请参见 [`dict.json`](./src/tungshing/dict.json)

## 协议

MIT
