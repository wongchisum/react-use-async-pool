export interface IPromiseFn<T = unknown, U = unknown> {
  (args: T): Promise<U>;
}

export interface IOptions<T = unknown, U = unknown> {
  /**列表 */
  list: T[];
  /**需要执行的异步函数 */
  fn: IPromiseFn<T, U>;
  /**限制并发数，默认为1 */
  limit?: number;
}

export interface IHookReturn<U = unknown> {
  run: () => void;
  data: U[];
  loading: boolean;
  pendingCount: number;
  doneCount: number;
}
