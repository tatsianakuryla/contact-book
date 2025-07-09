import { ElementFactory } from '../element-factory/element-factory';
import { ButtonFactory } from '../button/button-factory';
import type { Contact, Group } from '../../../types/types';

export class CustomSelect {
  private readonly _container: HTMLDivElement;
  private readonly _trigger: HTMLButtonElement;
  private readonly _listBox: HTMLDivElement;
  private _options: HTMLButtonElement[] = [];
  private _selectedIndex: number = -1;
  private _contact: Contact;
  private readonly _groups: Group[];

  constructor(contact: Contact, groups: Group[]) {
    this._contact = contact;
    this._groups = groups;
    this._selectedIndex = this._groups.findIndex((g) => g.name === this._contact.group.name);

    this._container = ElementFactory.create('div', ['contact-form__custom-select']);

    this._trigger = ButtonFactory.create({
      type: 'button',
      textContent:
        this._selectedIndex >= 0 ? this._groups[this._selectedIndex].name : 'Выберите группу',
      modifier: 'contact-form__trigger',
      onClick: () => this.toggleList(),
    });
    this._container.append(this._trigger);

    this._listBox = ElementFactory.create('div', ['contact-form__options-list', 'hidden']);
    this._listBox.setAttribute('tabindex', '-1');
    this._container.append(this._listBox);

    this._groups.forEach((group, idx) => {
      const option = ButtonFactory.create({
        type: 'button',
        textContent: group.name,
        modifier: 'contact-form__option',
        onClick: () => this.onOptionSelect(idx),
      });
      option.setAttribute('tabindex', '-1');
      this._listBox.append(option);
      this._options.push(option);
    });

    this._container.addEventListener('keydown', (event) => this.onKeyDown(event));
    document.addEventListener('click', (event) => this.onDocumentClick(event));
  }

  public get container(): HTMLDivElement {
    return this._container;
  }

  public get value(): string {
    return this._selectedIndex >= 0 ? this._groups[this._selectedIndex].name : '';
  }

  public reset(): void {
    this._selectedIndex = -1;
    this._trigger.textContent = 'Выберите группу';
    this._listBox.classList.add('hidden');
  }

  private toggleList(): void {
    if (this.isOpen()) {
      this.closeList();
    } else {
      this.openList();
    }
  }

  private openList(): void {
    this._listBox.classList.remove('hidden');
    const index = this._selectedIndex >= 0 ? this._selectedIndex : 0;
    this.focusOption(index);
  }

  private closeList(): void {
    this._listBox.classList.add('hidden');
    this._trigger.focus();
  }

  private isOpen(): boolean {
    return !this._listBox.classList.contains('hidden');
  }

  private onOptionSelect(index: number): void {
    this.select(index);
    this.closeList();
  }

  private select(index: number): void {
    this._selectedIndex = index;
    const group = this._groups[index];
    this._trigger.textContent = group.name;
    this._contact.group = group;
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
