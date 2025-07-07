import { ElementFactory } from '../element-factory/element-factory';
import { ContainerFactory } from '../container-factory/container-factory';
import { ButtonFactory } from '../button/button-factory';

export class Header {
  private static readonly buttonLabels = {
    addContact: 'Добавить контакт',
    contactGroups: 'Группы',
  };
  private static readonly headingTextContent = 'Книга контактов';

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
    const heading = ElementFactory.create('h1', ['header__heading']);
    heading.textContent = this.headingTextContent;
    return heading;
  }

  private static createAddContactButton(): HTMLButtonElement {
    return ButtonFactory.create('button', this.buttonLabels.addContact, 'header__add-contact-');
  }

  private static createContactGroupButton(): HTMLButtonElement {
    return ButtonFactory.create(
      'button',
      this.buttonLabels.contactGroups,
      'header__contact-groups-',
    );
  }
}
