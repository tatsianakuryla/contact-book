import { ElementFactory } from '../element-factory/element-factory';
import { ButtonFactory } from '../button/button-factory';
import type { Contact, Group } from '../../../types/types';

export class CustomSelect {
  private _initialIndex = -1;
  private readonly _container: HTMLDivElement;
  private readonly _trigger: HTMLButtonElement;
  private readonly _listBox: HTMLDivElement;
  private _options: HTMLButtonElement[] = [];
  private readonly _emptyGroupError: HTMLDivElement;
  private _selectedIndex: number = -1;
  private readonly _groups: Group[];

  constructor(groups: Group[]) {
    this._groups = groups;

    this._container = ElementFactory.create('div', ['contact-form__custom-select', 'flex']);

    this._trigger = ButtonFactory.create({
      type: 'button',
      textContent:
        this._selectedIndex >= 0 ? this._groups[this._selectedIndex].name : 'Выберите группу',
      modifier: 'contact-form__trigger',
      onClick: () => this.toggleList(),
    });

    this._listBox = ElementFactory.create('div', ['contact-form__options-list', 'hidden', 'flex']);
    this._listBox.setAttribute('tabindex', '-1');
    this._container.append(this._trigger, this._listBox);

    if (groups.length !== 0) {
      const noneOption = ButtonFactory.create({
        type: 'button',
        textContent: 'Без группы',
        modifier: 'contact-form__option-none',
        onClick: () => this.onOptionSelect(-1),
      });
      noneOption.setAttribute('tabindex', '-1');
      this._listBox.append(noneOption);
      this._options.push(noneOption);
    }

    this._groups.forEach((group, index) => {
      const option = ButtonFactory.create({
        type: 'button',
        textContent: group.name,
        modifier: 'contact-form__option',
        onClick: () => this.onOptionSelect(index),
      });
      option.setAttribute('tabindex', '-1');
      this._listBox.append(option);
      this._options.push(option);
    });

    this._container.addEventListener('keydown', (event) => this.onKeyDown(event));
    document.addEventListener('click', (event) => this.onDocumentClick(event));
    this._emptyGroupError = ElementFactory.create('div', ['contact-form__empty-group-error']);
    this._container.append(this._emptyGroupError);
  }

  public get container(): HTMLDivElement {
    return this._container;
  }

  public get value(): string {
    return this._selectedIndex >= 0 ? this._groups[this._selectedIndex].name : '';
  }

  public reset(): void {
    this._selectedIndex = this._initialIndex;
    if (this._initialIndex >= 0) {
      this._trigger.textContent = this._groups[this._initialIndex].name;
    } else {
      this._trigger.textContent = 'Выберите группу';
    }
    this._listBox.classList.add('hidden');
    this._emptyGroupError.textContent = '';
  }

  private toggleList(): void {
    if (this.isOpen()) {
      this.closeList();
    } else {
      this.openList();
    }
  }

  private openList(): void {
    if (this._groups.length === 0) {
      this._emptyGroupError.textContent = 'Нет созданных групп';
      return;
    }
    this._listBox.classList.remove('hidden');
    const index = this._selectedIndex >= 0 ? this._selectedIndex : 0;
    this._trigger.classList.add('contact-form__trigger-button_open');
    this.focusOption(index);
  }

  private closeList(): void {
    this._listBox.classList.add('hidden');
    this._trigger.focus();
    this._trigger.classList.remove('contact-form__trigger-button_open');
  }

  private isOpen(): boolean {
    return !this._listBox.classList.contains('hidden');
  }

  private onOptionSelect(index: number): void {
    this.select(index);
    this.closeList();
  }

  public setContact(contact: Contact): void {
    const index = this._groups.findIndex((g) => g.name === contact.group.name);
    this._initialIndex = index;
    this._selectedIndex = index;

    if (index >= 0) {
      this._trigger.textContent = this._groups[index].name;
    } else {
      this._trigger.textContent = 'Выберите группу';
    }
  }

  public select(index: number): void {
    this._selectedIndex = index;
    this._trigger.textContent = index >= 0 ? this._groups[index].name : 'Выберите группу';
  }

  public update(groups: Group[]): void {
    const previous = this.value;

    this._options.forEach((button) => button.remove());
    this._options = [];

    this._groups.length = 0;
    this._groups.push(...groups);

    if (groups.length) {
      const noneOption = ButtonFactory.create({
        type: 'button',
        textContent: 'Без группы',
        modifier: 'contact-form__option-none',
        onClick: () => this.onOptionSelect(-1),
      });
      noneOption.setAttribute('tabindex', '-1');
      this._listBox.append(noneOption);
      this._options.push(noneOption);
    }

    groups.forEach((group, index) => {
      const option = ButtonFactory.create({
        type: 'button',
        textContent: group.name,
        modifier: 'contact-form__option',
        onClick: () => this.onOptionSelect(index),
      });
      option.setAttribute('tabindex', '-1');
      this._listBox.append(option);
      this._options.push(option);
    });

    const index = this._groups.findIndex((group) => group.name === previous);
    this.select(index);
  }

  private focusOption(index: number): void {
    this._options[index].focus();
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen()) {
      if (
        event.target === this._trigger &&
        (event.key === 'ArrowDown' || event.key === 'ArrowUp')
      ) {
        event.preventDefault();
        this.openList();
      }
      return;
    }
    let focusedIndex: number;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusNext();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPrev();
        break;
      case 'Home':
        event.preventDefault();
        this.focusOption(0);
        break;
      case 'End':
        event.preventDefault();
        this.focusOption(this._options.length - 1);
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        focusedIndex = this._options.findIndex((option) => option === document.activeElement);
        if (focusedIndex >= 0) {
          this.select(focusedIndex);
          this.closeList();
        }
        break;
      }
      case 'Escape':
      case 'Tab':
        this.closeList();
        break;
    }
  }

  private focusNext(): void {
    let index = this._options.findIndex((option) => option === document.activeElement);
    index = (index + 1) % this._options.length;
    this.focusOption(index);
  }

  private focusPrev(): void {
    let index = this._options.findIndex((option) => option === document.activeElement);
    index = (index - 1 + this._options.length) % this._options.length;
    this.focusOption(index);
  }

  private onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) return;

    const { target } = event;
    if (target instanceof Node && !this._container.contains(target)) {
      this.closeList();
    }
  }
}
