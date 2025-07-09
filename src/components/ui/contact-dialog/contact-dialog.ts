import IMask from 'imask';

import { ElementFactory } from '../element-factory/element-factory';
import { InputFactory } from '../input/input';
import { ButtonFactory } from '../button/button-factory';
import type { Contact, Group } from '../../../types/types';
import { defaultContactValue } from '../../../constants/constants';
import { CustomSelect } from '../custom-select/custom-select';

export class ContactDialog {
  private readonly _dialog: HTMLDialogElement;
  private readonly _form: HTMLFormElement;
  private readonly _nameInput: HTMLInputElement;
  private readonly _phoneInput: HTMLInputElement;
  private readonly _select: HTMLDivElement;

  constructor(contact: Contact, groups: Group[]) {
    this._dialog = ElementFactory.create('dialog', ['contact-dialog']);
    this._form = ElementFactory.create('form', ['contact-form']);
    this._nameInput = this.createNameInput(contact);
    this._phoneInput = this.createTelephoneNumberInput(contact);
    this._select = new CustomSelect(contact, groups).container;
    this.initForm(contact);

    this._dialog.append(this._form);
  }

  public get element(): HTMLDialogElement {
    return this._dialog;
  }

  private initForm(contact: Contact): void {
    const heading = this.createFromHeading(contact);

    const saveButton = ButtonFactory.create({
      type: 'submit',
      textContent: 'Сохранить',
      modifier: 'contact-form__submit-',
    });
    const cancelButton = ButtonFactory.create({
      type: 'button',
      textContent: '',
      modifier: 'contact-form__cancel-',
      onClick: () => this.close(),
    });

    this._form.append(
      heading,
      this._nameInput,
      this._phoneInput,
      this._select,
      saveButton,
      cancelButton,
    );

    this._form.addEventListener('submit', this.onSubmit.bind(this));
  }

  private createFromHeading(contact: Contact): HTMLElement {
    const formHeading = ElementFactory.create('h2', ['contact-form__heading']);
    formHeading.textContent =
      contact.name.length === 0 ? 'Добавление контакта' : 'Редактирование контакта';
    return formHeading;
  }

  private createNameInput(contact: Contact = defaultContactValue): HTMLInputElement {
    return InputFactory.create({
      type: 'text',
      name: 'name',
      value: contact.name,
      placeholder: 'Введите ФИО',
      modifier: 'contact-form__name',
    });
  }

  private createTelephoneNumberInput(contact: Contact = defaultContactValue): HTMLInputElement {
    const numberInput = InputFactory.create({
      type: 'text',
      name: 'number',
      placeholder: 'Введите номер',
      value: contact.telephoneNumber,
      modifier: 'contact-form__number',
    });
    IMask(numberInput, {
      mask: '+{7} (000) 000-00-00',
    });
    return numberInput;
  }

  private onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    this.close();
  }

  public open(): void {
    this._dialog.showModal();
  }

  public close(): void {
    this._dialog.close();
  }
}
