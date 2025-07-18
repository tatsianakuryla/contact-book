import { ElementFactory } from '../../components/ui/element-factory/element-factory';
import { ContainerFactory } from '../../components/ui/container-factory/container-factory';
import { GroupedContacts } from '../../components/ui/contacts/grouped-contacts';
import { Header } from '../header/header';

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
    const button = Header.createAddContactButton();
    button.classList.remove('header__add-contact-button');
    button.classList.add('main__add-contact-button');
    this._container.append(button, GroupedContacts.contactsSection);
    GroupedContacts.update();
  }
}
