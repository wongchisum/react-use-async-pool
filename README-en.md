# react-use-async-pool

[![npm version](https://badge.fury.io/js/react-use-async-pool.svg)](https://badge.fury.io/js/react-use-async-pool)  ![CI](https://github.com/TonicFizzRicky/react-use-async-pool/actions/workflows/node.js.yml/badge.svg)

English | <a href="https://github.com/TonicFizzRicky/react-use-async-pool/blob/master/README.md">Simplified Chinese</a>

This is a react hook called `react-use-async-pool`.

You can use it to control asynchronous request in your application.

When we use `Promise.all` for requesting asynchronous functions.We can't setting concurrency.

Also,we can know how many asynchronous functions have been resolved.

So I created `react-use-async-pool` to solve these problems.

DeepWiki:https://deepwiki.com/wongchisum/react-use-async-pool

---

## Document

 https://react-use-async-pool.netlify.app/

## Example

 https://stackblitz.com/edit/react-use-async-pool-demo?file=src%2FApp.tsx

---
## Use

### Install Dependency

```bash
pnpm i react-use-async-pool
```

### Using in React 

import `react-use-async-pool` by ES Module

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
    list: randomIdList, // your array list within arguments,will passed into asynchronous function
    fn: request, // your asynchronous function
    limit: 2, // your maximum concurrency
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
          {loading ? "Loading..." : "Request!"}
        </button>
      </div>
    </div>
  );
};

export default Demo;
```

---
## Development

You can `Fork` this repository to secondary development.

After forked and cloned repository,install project dependencies.

I recommend to use `pnpm` to manage your frontend dependencies.

```bash
pnpm i
```

Use this command to run a local server.

```bash
pnpm dev
```

Build your documents

```bash
pnpm build-docs
```

Build a server-side-render site.

```bash
pnpm ssr-docs
```

Build this package
```bash
pnpm build-lib
```


---

## Appreciate

Document site generate: [vite-plugin-react-pages](https://github.com/vitejs/vite-plugin-react-pages)
