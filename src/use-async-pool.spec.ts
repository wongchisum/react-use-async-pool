/*
 * @Author: wangzhisen
 * @Date: 2023-03-09 13:28:43
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2023-03-09 13:55:21
 *
 * useAsyncPool 测试用例
 */

import { act, renderHook } from '@testing-library/react-hooks';
import { useAsyncPool } from './index';
import { describe, expect, it } from 'vitest';

// 模拟异步请求
const request = async (id: number, delay = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(id);
    }, delay);
  });
};

// 生成 [1,2,...,10]
const requestIds = Array.from({ length: 10 }, (_, index: number) => index);

describe('useAyncPool hook', () => {
  it('should default concurrency be one', () => {
    // 不指定并发数，默认的并发数为1
    const { result } = renderHook(() =>
      useAsyncPool({
        list: requestIds,
        fn: request,
      }),
    );

    // 运行
    act(() => {
      result.current.run();
    });

    // 一秒后执行测试，此时应该剩余9个任务
    setTimeout(() => {
      expect(result.current.data);
      expect(result.current.doneCount).toBe(1);
      expect(result.current.pendingCount).toBe(9);
    }, 1000);
  });

  it('test concurrency', () => {
    // 指定并发数为2
    const { result } = renderHook(() =>
      useAsyncPool({
        list: requestIds,
        fn: request,
        limit: 2,
      }),
    );

    // 运行
    act(() => {
      result.current.run();
    });

    // 一秒后执行测试，已执行2个,此时应该剩余8个任务
    setTimeout(() => {
      expect(result.current.data);
      expect(result.current.doneCount).toBe(2);
      expect(result.current.pendingCount).toBe(8);
    }, 1000);
  });

  it('test result order', () => {
    // 指定并发数为2
    const { result } = renderHook(() =>
      useAsyncPool({
        list: requestIds,
        fn: request,
        limit: 2,
      }),
    );

    // 运行
    act(() => {
      result.current.run();
    });

    // 两秒后执行测试，此时data应为[1,2,3,4],此时应该剩余6个任务
    setTimeout(() => {
      expect(result.current.data.length).toBe(4);
      expect(result.current.doneCount).toBe(4);
      expect(result.current.pendingCount).toBe(6);
      expect(result.current.data.length).toEqual([1, 2, 3, 4]);
    }, 2000);
  });

  it('test end state', () => {
    // 指定并发数为2
    const { result } = renderHook(() =>
      useAsyncPool({
        list: requestIds,
        fn: request,
        limit: 2,
      }),
    );

    // 运行
    act(() => {
      result.current.run();
    });

    // 两秒后执行测试，此时data应为[1,2,3,4],此时应该剩余6个任务
    setTimeout(() => {
      expect(result.current.data.length).toBe(10);
      expect(result.current.doneCount).toBe(10);
      expect(result.current.pendingCount).toBe(0);
      expect(result.current.loading).toBeFalsy();
      expect(result.current.data.length).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    }, 5000);
  });
});
