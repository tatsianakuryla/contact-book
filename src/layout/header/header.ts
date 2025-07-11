import { ElementFactory } from '../../components/ui/element-factory/element-factory';
import { ContainerFactory } from '../../components/ui/container-factory/container-factory';
import { ButtonFactory } from '../../components/ui/button/button-factory';
import { App } from '../../App';

export class Header {
  private static readonly _buttonLabels = {
    addContact: 'Добавить контакт',
    contactGroups: 'Группы',
  };
  private static readonly _heading = 'Книга контактов';
  private static readonly _iconPath = './icons/contact-book.svg';
  private static readonly _iconAlt = 'Контактная книга';

  public static create(): HTMLElement {
    const header = ElementFactory.create('header', ['header']);
    const container = ContainerFactory.create('header');
    container.append(
      this.createHeading(),
      this.createAddContactButton(),
      this.createContactGroupButton(),
    );
    header.append(container);
    return header;
  }

  private static createHeading(): HTMLElement {
    const wrapper = ElementFactory.create('div', ['header__heading-wrapper', 'flex']);
    const heading = ElementFactory.create('h1', ['header__heading']);
    heading.textContent = this._heading;
    const image = ElementFactory.createImage(this._iconPath, ['header__icon'], this._iconAlt);
    wrapper.append(image, heading);
    return wrapper;
  }

  private static createButton(
    label: string,
    modifier: string,
    onClick: () => void,
  ): HTMLButtonElement {
    return ButtonFactory.create({
      type: 'button',
      textContent: label,
      modifier,
      onClick,
    });
  }

  public static createAddContactButton(): HTMLButtonElement {
    return this.createButton(this._buttonLabels.addContact, 'header__add-contact', () => {
      App.contactDialog.open();
    });
  }

  private static createContactGroupButton(): HTMLButtonElement {
    return this.createButton(this._buttonLabels.contactGroups, 'header__contact-groups', () => {
      App.groupsDialog.open();
    });
  }
}
