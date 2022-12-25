export interface DataProvider<T, V> {
  provide(data: T[]): V[];
}

// export interface NumberDataProvider extends DataProvider<number> {
// }
