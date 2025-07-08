import type { Contact } from '../types/types';
import { LocalStorage } from '../services/local-storage';
import { BaseListState } from './base-list-state';

export class ContactsState extends BaseListState<Contact> {
  override addItem(item: Contact): void {
    super.addItem(item);
    this.saveContacts();
  }

  public init(): void {
    this.items = LocalStorage.getContacts();
  }

  public removeContact(telephoneNumber: string): void {
    this.removeItem((contact) => contact.telephoneNumber !== telephoneNumber);
    this.saveContacts();
  }

  public editContact(updatedContact: Contact): void {
    this.items = this.items.map((contact) =>
      contact.telephoneNumber === updatedContact.telephoneNumber ? updatedContact : contact,
    );
    this.saveContacts();
  }

  private saveContacts(): void {
    LocalStorage.saveContacts(this.items);
  }
}
