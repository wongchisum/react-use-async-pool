/**
 * @title 使用 Promise.all 去并发请求
 * @description 请使用开发者工具-网络-XHR 观察瀑布图，并点击"发送请求"按钮
 * @order 1
 */

import React, { useState } from "react";
// import { useAsyncPool } from 'my-lib'

const request = async (id: number) => {
  const result = await fetch(`https://picsum.photos/id/${id}/info`);
  const data = await result.json();
  return data;
};

const Demo1 = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<null | any[]>(null);

  const handleFetch = async () => {
    // 随机生成20个id
    setData(null);
    setLoading(true);
    const randomIdList = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 50)
    );
    const tasks = randomIdList.map(request);
    const data = await Promise.all(tasks);
    setData(data);
    setLoading(false);
  };

  return (
    <div>
      <div>
        {Array.isArray(data) &&
          data.map((item) => {
            return (
              <div>{JSON.stringify(item)}</div>
            );
          })}
      </div>
      <div>
        <button onClick={handleFetch} disabled={loading}>{loading ? "加载中..." : "发起请求"}</button>
      </div>
    </div>
  );
};

export default Demo1;
