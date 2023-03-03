/**
 * @title 使用 useAsyncPool 代替
 * @description 请使用开发者工具-网络-XHR 观察瀑布图，并点击"发送请求"按钮
 * @order 2
 */

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

const Demo2 = () => {
  const { run, loading, data } = useAsyncPool({
    list: randomIdList,
    fn: request,
    limit: 2,
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

export default Demo2;
