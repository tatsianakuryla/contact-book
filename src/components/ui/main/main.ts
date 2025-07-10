import { ElementFactory } from '../element-factory/element-factory';
import { ContainerFactory } from '../container-factory/container-factory';
import { GroupedContacts } from '../contacts/grouped-contacts';

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

  public init(): void {
    this._container.append(GroupedContacts.contactsSection);
    GroupedContacts.update();
  }
}
