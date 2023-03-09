import { useEffect, useState } from 'react';
import type { IHookReturn, IOptions } from './typing';

export function useAsyncPool<T = unknown, U = unknown>(options: IOptions<T, U>): IHookReturn<U> {
  const { list = [], fn = () => {}, limit = 1 } = options;

  const [data, setData] = useState<U[]>([]); // Promise运行后的数据
  const [taskIndex, setTaskIndex] = useState(0); // 当前任务的索引
  const [loading, setLoading] = useState(false); // 是否加载中

  // 获取需要进行的任务，通过Promise.all 进行包装
  const handleResolve = async () => {
    // 获取需要处理的队列
    const tasks = [...list].splice(taskIndex, limit);

    // 构造Promise.all,进行并发请求
    const result = (await Promise.all(tasks.map(task => fn(task)))) as U[];

    // 更新数据
    await setData((total: U[]) => {
      return [...total, ...result];
    });

    // 更新Index
    await setTaskIndex((currentIndex: number) => currentIndex + limit);
  };

  // 点击执行
  const handleRun = () => {
    if (!loading) {
      setTaskIndex(0);
      setData([]);
      setLoading(true);
    }
  };

  // 计算剩余数量
  const pendingCount = list.length - data.length;

  // 计算完成数量
  const doneCount = data.length;

  // 任务完成时，任务结束
  const handleUpdateBegin = () => {
    const { length: dataLength } = data;
    const { length: listLength } = list;
    const hasData = dataLength > 0;
    const hasList = listLength > 0;
    if (hasData && hasList && dataLength === listLength) {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUpdateBegin();
  }, [data]);

  useEffect(() => {
    if (loading && taskIndex < list.length) {
      handleResolve();
    }
  }, [loading, taskIndex]);

  return {
    run: handleRun,
    data,
    loading,
    pendingCount,
    doneCount,
  };
}
