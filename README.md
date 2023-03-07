# react-use-async-pool

`react-use-async-pool` 是一个 react hook,支持控制异步函数的并发控制

主要解决 `Promise.all` 在并发大量请求时，无法限制并发数的缺陷

以及 `Promise.all` 无法获取当前异步请求进度

---

## 文档

 https://react-use-async-pool.netlify.app/

## 示例

 https://react-use-async-pool.netlify.app/components/Demo

---
## 使用

### 安装依赖

```bash
pnpm i react-use-async-pool
```

### 在 React 中使用

通过 ESM 方式导入

```ts
import React from "react";
import { useAsyncPool } from "react-use-async-pool";

const request = async (id: number) => {
  const result = await fetch(`https://picsum.photos/id/${id}/info`);
  const data = await result.json();
  return data;
};

const randomIdList = Array.from({ length: 20 }, () =>
  Math.floor(Math.random() * 50)
);

const Demo = () => {
  const { run, loading, data } = useAsyncPool({
    list: randomIdList, // 数组，参数列表
    fn: request, // 需要发起异步请求的函数
    limit: 2, // 限制并发的请求数位 2
  });

  return (
    <div>
      <div>
        {Array.isArray(data) &&
          data.map((item) => {
            return <div>{JSON.stringify(item)}</div>;
          })}
      </div>
      <div>
        <button disabled={loading} onClick={run}>
          {loading ? "加载中..." : "发起请求"}
        </button>
      </div>
    </div>
  );
};

export default Demo;
```

查看更多示例: https://github.com/TonicFizzRicky/react-use-async-pool/tree/master/src/Demo/demos

---
## 开发

你可以 Fork 此仓库进行开发

Fork 后可以安装依赖

```bash
pnpm i
```

启动本地开发环境

```bash
pnpm dev
```

打包文档

```bash
pnpm build-docs
```

打包为 ssr 静态站点

```bash
pnpm ssr-docs
```

打包库
```bash
pnpm build-lib
```


---

## 致谢

站点生成: [vite-plugin-react-pages](https://github.com/vitejs/vite-plugin-react-pages)