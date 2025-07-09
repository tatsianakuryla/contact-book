import type { Contact, Contacts } from '../types/types';
import { LocalStorage } from '../services/local-storage';
import { BaseListState } from './base-list-state';

export class ContactsState extends BaseListState<Contact> {
  private _groupedContacts: Record<string, Contacts> = {};

  constructor() {
    super();
    this.init();
  }

  public get groupedContacts(): Record<string, Contacts> {
    return this._groupedContacts;
  }

  public get groupNames(): string[] {
    return Object.keys(this._groupedContacts);
  }

  override addItem(item: Contact): void {
    super.addItem(item);
    this.saveContacts();
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

  private init(): void {
    this.items = LocalStorage.getContacts();
    this._groupedContacts = this.groupContacts();
  }

  private saveContacts(): void {
    this._groupedContacts = this.groupContacts();
    LocalStorage.saveContacts(this.items);
  }

  private groupContacts(): Record<string, Contacts> {
    const result: Record<string, Contacts> = {};
    this.items.forEach((item) => {
      const groupName = item.group?.name;
      result[groupName] ??= [];
      result[groupName].push(item);
    });
    return result;
  }
}
