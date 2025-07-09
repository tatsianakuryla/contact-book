import type { Contact, Contacts, Group } from '../types/types';
import { LocalStorage } from '../services/local-storage/local-storage';
import { IdGenerator } from '../services/id-generator/id-generator';

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

  public removeContact(id: string): void {
    this.removeItem((contact) => contact.id === id);
    this.saveContacts();
  }

  public removeContactsWithGroup(group: Group): void {
    this.items = this.items.filter((item) => item.group.name !== group.name);
    this.saveContacts();
  }

  public editContact(updatedContact: Contact): void {
    this.items = this.items.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact,
    );
    this.saveContacts();
  }

  public completeNewContact(
    contact: Contact,
    nameInputValue: string,
    phoneInputValue: string,
    selectValue: string,
  ): Contact {
    const rawName = nameInputValue.trim().toLowerCase();
    const name = rawName
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const telephoneNumber = phoneInputValue;
    const group = selectValue;
    const id = contact.id === '' ? IdGenerator.generate() : contact.id;

    return {
      id,
      name,
      telephoneNumber,
      group: { name: group },
    };
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
      const groupName = item.group.name;
      result[groupName] ??= [];
      result[groupName].push(item);
    });
    return result;
  }
}
