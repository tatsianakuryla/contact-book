import { LocalStorage } from '../local-storage/local-storage';

export class IdGenerator {
  private static counter: number = LocalStorage.getLastId();

  public static generate(): string {
    this.counter += 1;
    LocalStorage.saveLastId(this.counter);
    return this.counter.toString();
  }
}
