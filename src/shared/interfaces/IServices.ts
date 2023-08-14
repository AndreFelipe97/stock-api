export interface IService<C, T> {
  execute({}: C): Promise<T>;
}

export interface IServiceList<T> {
  execute(): Promise<T>;
}
