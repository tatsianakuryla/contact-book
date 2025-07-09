import { ElementFactory } from '../element-factory/element-factory';
import type { Contact } from '../../../types/types';
import { ButtonFactory } from '../button/button-factory';

export class ContactDisplay {
  private _item: HTMLLIElement = ElementFactory.create('li', ['contact', 'flex']);

  constructor(contact: Contact) {
    this._item.append(
      this.getContactName(contact),
      this.getContactNumber(contact),
      this.getEditContactButton(),
      this.getDeleteContactButton(),
    );
  }

  public get item(): HTMLElement {
    return this._item;
  }

  private getContactName(contact: Contact): HTMLElement {
    const name = ElementFactory.create('div', ['contact__name']);
    name.textContent = contact.name;
    return name;
  }

  private getContactNumber(contact: Contact): HTMLElement {
    const number = ElementFactory.create('div', ['contact__number']);
    number.textContent = contact.telephoneNumber;
    return number;
  }

  private getEditContactButton(): HTMLButtonElement {
    return ButtonFactory.create({ type: 'button', textContent: '', modifier: 'contact__edit' });
  }

  private getDeleteContactButton(): HTMLButtonElement {
    return ButtonFactory.create({ type: 'button', textContent: '', modifier: 'contact__delete' });
  }
}
