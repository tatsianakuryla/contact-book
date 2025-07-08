import { Header } from '../components/ui/header/header';
import { Main } from '../components/ui/main/main';

export class BaseView {
  private readonly _fragment = new DocumentFragment();

  constructor() {
    const main = new Main().main;
    this.fragment.append(Header.create(), main);
  }

  public get fragment(): DocumentFragment {
    return this._fragment;
  }
}
