import type { Contact, Contacts } from '../types/types';
import { LocalStorage } from '../services/local-storage';

export class ContactsListState {
  private _contacts: Contacts = [];

  public get contacts(): Contacts {
    return [...this._contacts];
  }

  private set contacts(value: Contacts) {
    this._contacts = [...value];
  }

  public init(): void {
    this.contacts = LocalStorage.getContacts();
  }

  public addContact(contact: Contact): void {
    this._contacts = [...this._contacts, contact];
    this.save();
  }

  public removeContact(telephoneNumber: string): void {
    this._contacts = this._contacts.filter(
      (contact) => contact.telephoneNumber !== telephoneNumber,
    );
    this.save();
  }

  public editContact(updatedContact: Contact): void {
    this._contacts = this._contacts.map((contact) =>
      contact.telephoneNumber === updatedContact.telephoneNumber ? updatedContact : contact,
    );
    this.save();
  }

  private save(): void {
    LocalStorage.saveContacts(this._contacts);
  }
}
