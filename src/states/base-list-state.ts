export abstract class BaseListState<T> {
  protected _items: T[] = [];

  protected set items(value: T[]) {
    this._items = [...value];
  }

  public get items(): T[] {
    return [...this._items];
  }

  public addItem(item: T): void {
    this._items.push(item);
  }

  protected removeItem(predicate: (item: T) => boolean): void {
    this.items = this.items.filter((item) => !predicate(item));
  }
}
