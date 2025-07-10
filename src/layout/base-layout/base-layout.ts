import { Header } from '../header/header';
import { Main } from '../main/main';

export class BaseLayout {
  private readonly _fragment = new DocumentFragment();

  constructor() {
    const main = new Main().main;
    this.fragment.append(Header.create(), main);
  }

  public get fragment(): DocumentFragment {
    return this._fragment;
  }
}
