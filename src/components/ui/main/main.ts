import { ElementFactory } from '../element-factory/element-factory';
import { ContainerFactory } from '../container-factory/container-factory';
import { App } from '../../../App';
import { ContactGroups } from '../contacts/contact-group-display';

export class Main {
  private readonly _main: HTMLElement;
  private readonly _container: HTMLElement;

  constructor() {
    this._main = ElementFactory.create('main', ['main']);
    this._container = ContainerFactory.create('main');
    this._main.append(this._container);
    this.init();
  }

  public get main(): HTMLElement {
    return this._main;
  }

  init(): void {
    if (App.contactsState.items.length === 0) {
      const text = ElementFactory.create('p', ['main__empty-text']);
      text.textContent = 'Список контактов пуст';
      this._container.append(text);
    } else {
      this._container.append(ContactGroups.display());
    }
  }
}
