import IMask from 'imask';
import type { Contact } from '../../types/types';
import { App } from '../../App';
import type { ContactValidationResult } from './types';

export class ContactDataValidator {
  private static isContactNameValid(contact: Contact): boolean {
    return contact.name.trim().length > 0;
  }

  private static isContactNumberComplete(input: HTMLInputElement): boolean {
    const phoneMask = IMask(input, {
      mask: '+{7} (000) 000-00-00',
    });
    return phoneMask.masked.isComplete;
  }

  private static isContactNumberNotEmpty(contact: Contact): boolean {
    const digitsOnly = contact.telephoneNumber.replace(/\D/g, '');
    return digitsOnly.length > 0;
  }

  private static isContactNumberUnique(contact: Contact): boolean {
    return !App.contactsState.items
      .filter((checkedContact) => checkedContact.id !== contact.id)
      .some((checkedContact) => checkedContact.telephoneNumber === contact.telephoneNumber);
  }

  public static validate(contact: Contact, input: HTMLInputElement): ContactValidationResult {
    const result: ContactValidationResult = {};

    if (!this.isContactNameValid(contact)) {
      result.name = 'Поле является обязательным';
    }
    if (!this.isContactNumberNotEmpty(contact)) {
      result.number = 'Поле является обязательным';
    } else if (!this.isContactNumberComplete(input)) {
      result.number = 'Введите корректный номер в формате +7 (000) 000-00-00';
    } else if (!this.isContactNumberUnique(contact)) {
      result.number = 'Номер уже добавлен в контакты';
    }

    return result;
  }
}
