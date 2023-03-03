---
title: useAsyncPool
---

# useAsyncPool

主要解决: react 在并行发起异步请求时，增加对并发数的控制

## Promise.all 的不足

使用 `Promise.all` 时，没有控制并发数，在并发请求数量大的情况下，会造成请求阻塞

<Demo src="./demos/demo1.tsx" />

使用 `useAsyncPool` hook 去控制并发数

<Demo src="./demos/demo2.tsx" />

## 类型文档

<TsInfo src="./types.ts" name="IOptions" />

<TsInfo src="./types.ts" name="IHookReturn" />






