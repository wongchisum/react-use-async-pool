/**
 * useAyncPool 需要传入的 options 配置
 */
export interface IOptions<T = unknown, U = unknown> {
  /**
   * 执行异步函数的参数，数组
   * @defaultValue []
   */
  list: T[];
  /**
   * 需要执行的异步函数
   * @defaultValue () => {}
   */
  fn: (args: T) => Promise<U>;
  /**
   * 限制最大并发数，默认为1
   * @defaultValue 1
   */
  limit?: number;
}

/**
 * useAsyncPool 返回值
 */
export interface IHookReturn<U = unknown> {
   /**
   * 手动触发请求的函数
   */
  run: () => void;
  /**
   * 已获取的数据
   */
  data: U[];
  /**
   * 是否加载中
   */
  loading: boolean;
  /**
   * 等待执行的任务数
   */
  pendingCount: number;
  /**
   * 已完成的任务数
   */
  doneCount: number;
}
