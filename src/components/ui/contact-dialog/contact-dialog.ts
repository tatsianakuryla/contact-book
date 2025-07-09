import IMask from 'imask';

import { ElementFactory } from '../element-factory/element-factory';
import { InputFactory } from '../input/input';
import { ButtonFactory } from '../button/button-factory';
import type { Contact, Group } from '../../../types/types';
import { defaultContactValue } from '../../../constants/constants';
import { CustomSelect } from '../custom-select/custom-select';
import { App } from '../../../App';
import { GroupedContacts } from '../contacts/grouped-contacts';
import { ContactDataValidator } from '../../validator/contact-data-validator';

export class ContactDialog {
  private readonly _dialog: HTMLDialogElement;
  private readonly _form: HTMLFormElement;
  private readonly _heading: HTMLElement;
  private readonly _nameInput: HTMLInputElement;
  private readonly _phoneInput: HTMLInputElement;
  private readonly _nameErrorBox: HTMLDivElement;
  private readonly _phoneErrorBox: HTMLDivElement;
  private readonly _select: CustomSelect;
  private currentContact: Contact = defaultContactValue;

  constructor(groups: Group[]) {
    this._dialog = ElementFactory.create('dialog', ['contact-dialog']);
    this._form = ElementFactory.create('form', ['contact-form']);

    this._heading = ElementFactory.create('h2', ['contact-form__heading']);
    this._nameInput = this.createNameInput();
    this._phoneInput = this.createTelephoneNumberInput();
    this._nameErrorBox = this.createNameErrorBox();
    this._phoneErrorBox = this.createNumberErrorBox();
    this._select = new CustomSelect(groups);

    const saveBtn = ButtonFactory.create({
      type: 'submit',
      textContent: 'Сохранить',
      modifier: 'contact-form__submit-',
    });
    const cancelBtn = ButtonFactory.create({
      type: 'button',
      textContent: 'X',
      modifier: 'contact-form__cancel-',
      onClick: () => this.close(),
    });

    this._form.append(
      this._heading,
      this.createNameBox(),
      this.createPhoneBox(),
      this._select.container,
      saveBtn,
      cancelBtn,
    );
    this._form.addEventListener('submit', this.onSubmit.bind(this));
    this._dialog.append(this._form);

    document.body.append(this._dialog);
  }

  public open(contact: Contact = defaultContactValue): void {
    this.clearErrors();
    this.currentContact = contact;

    const isNew = contact.id === '';
    this._heading.textContent = isNew ? 'Добавление контакта' : 'Редактирование контакта';
    this._nameInput.value = contact.name;
    this._phoneInput.value = contact.telephoneNumber;
    this._select.setContact(contact);

    this._dialog.showModal();
  }

  public close(): void {
    this.clearErrors();
    this._form.reset();
    this._select.reset();
    this._dialog.close();
  }

  private createNameInput(): HTMLInputElement {
    return InputFactory.create({
      type: 'text',
      name: 'name',
      value: '',
      placeholder: 'Введите ФИО',
      modifier: 'contact-form__name',
    });
  }

  private createNumberErrorBox(): HTMLDivElement {
    return ElementFactory.create('div', ['contact-form__error-box']);
  }

  private createNameBox(): HTMLDivElement {
    const container = ElementFactory.create('div', ['contact-form__name-box', 'flex']);
    container.append(this._nameInput, this._nameErrorBox);
    return container;
  }

  private createTelephoneNumberInput(): HTMLInputElement {
    const input = InputFactory.create({
      type: 'text',
      name: 'number',
      value: '',
      placeholder: 'Введите номер',
      modifier: 'contact-form__number',
    });
    IMask(input, { mask: '+{7} (000) 000-00-00' });
    return input;
  }

  private createNameErrorBox(): HTMLDivElement {
    return ElementFactory.create('div', ['contact-form__error-box']);
  }

  private createPhoneBox(): HTMLDivElement {
    const container = ElementFactory.create('div', ['contact-form__phone-box', 'flex']);
    container.append(this._phoneInput, this._phoneErrorBox);
    return container;
  }

  private clearErrors(): void {
    this._nameErrorBox.textContent = '';
    this._phoneErrorBox.textContent = '';
  }

  private onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    const newContact = App.contactsState.completeNewContact(
      this.currentContact,
      this._nameInput.value,
      this._phoneInput.value,
      this._select.value,
    );

    const validationResult = ContactDataValidator.validate(newContact, this._phoneInput);

    if (validationResult.name || validationResult.number) {
      this._nameErrorBox.textContent = validationResult.name ?? '';
      this._phoneErrorBox.textContent = validationResult.number ?? '';
      return;
    }
    if (!this.currentContact.id) {
      App.contactsState.addItem(newContact);
    } else {
      App.contactsState.editContact(newContact);
    }

    GroupedContacts.display();
    this.close();
  }
}
