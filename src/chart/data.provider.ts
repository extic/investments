export interface DataProvider<T, V> {
  provide(data: T[]): V[];
}
