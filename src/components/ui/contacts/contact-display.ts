import { ElementFactory } from '../element-factory/element-factory';
import type { Contact } from '../../../types/types';
import { ButtonFactory } from '../button/button-factory';
import { App } from '../../../App';
import { GroupedContacts } from './grouped-contacts';

export class ContactDisplay {
  private _item: HTMLLIElement = ElementFactory.create('li', ['contact', 'flex']);
  private _contact: Contact;

  constructor(contact: Contact) {
    this._contact = contact;
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

  private getContactName(contact: Contact): HTMLDivElement {
    const name = ElementFactory.create('div', ['contact__name']);
    name.textContent = contact.name;
    return name;
  }

  private getContactNumber(contact: Contact): HTMLDivElement {
    const number = ElementFactory.create('div', ['contact__number']);
    number.textContent = contact.telephoneNumber;
    return number;
  }

  private getEditContactButton(): HTMLButtonElement {
    return ButtonFactory.create({
      type: 'button',
      textContent: '',
      modifier: 'contact__edit',
      onClick: () => {
        App.contactDialog.open(this._contact);
      },
    });
  }

  private getDeleteContactButton(): HTMLButtonElement {
    return ButtonFactory.create({
      type: 'button',
      textContent: '',
      modifier: 'contact__delete',
      onClick: () => {
        App.contactsState.removeContact(this._contact.id);
        GroupedContacts.update();
      },
    });
  }
}
