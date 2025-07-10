import { ElementFactory } from '../../components/ui/element-factory/element-factory';
import { ContainerFactory } from '../../components/ui/container-factory/container-factory';
import { ButtonFactory } from '../../components/ui/button/button-factory';
import { App } from '../../App';

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
    const wrapper = ElementFactory.create('div', ['header__heading-wrapper', 'flex']);
    const heading = ElementFactory.create('h1', ['header__heading']);
    heading.textContent = this.headingTextContent;
    const image = ElementFactory.createImage(
      './icons/contact-book.svg',
      ['header__icon'],
      'Контактная книга',
    );
    wrapper.append(image, heading);
    return wrapper;
  }

  public static createAddContactButton(): HTMLButtonElement {
    return ButtonFactory.create({
      type: 'button',
      textContent: this.buttonLabels.addContact,
      modifier: 'header__add-contact',
      onClick: () => {
        App.contactDialog.open();
      },
    });
  }

  private static createContactGroupButton(): HTMLButtonElement {
    return ButtonFactory.create({
      type: 'button',
      textContent: this.buttonLabels.contactGroups,
      modifier: 'header__contact-groups',
      onClick: () => {
        App.groupsDialog.open();
      },
    });
  }
}
