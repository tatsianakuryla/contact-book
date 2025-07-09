import type { Contacts, Groups } from '../../types/types';
import { defaultGroups } from '../../constants/constants';

export class LocalStorage {
  public static saveContacts(value: Contacts): void {
    localStorage.setItem('contacts', JSON.stringify(value));
  }

  public static getContacts(): Contacts | [] {
    const result = localStorage.getItem('contacts');
    return result ? JSON.parse(result) : [];
  }

  public static saveGroups(value: Groups): void {
    localStorage.setItem('groups', JSON.stringify(value));
  }

  public static getGroups(): Groups | [] {
    const result = localStorage.getItem('groups');
    return result ? JSON.parse(result) : defaultGroups;
  }

  public static saveLastId(value: number): void {
    localStorage.setItem('id_generator_counter', value.toString());
  }

  public static getLastId(): number {
    const result = localStorage.getItem('id_generator_counter');
    return result ? +result : 0;
  }
}
