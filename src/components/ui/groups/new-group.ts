import { ElementFactory } from '../element-factory/element-factory';
import { InputFactory } from '../input/input';
import { ButtonFactory } from '../button/button-factory';

export class NewGroup {
  private _item: HTMLElement = ElementFactory.create('li', ['new-group', 'flex']);
  private _errorBox: HTMLDivElement = ElementFactory.create('div', ['new-group__error-box']);

  constructor() {
    this.item.append(this.getNewGroupInputWrapper(), this._errorBox);
  }

  public get item(): HTMLElement {
    return this._item;
  }

  private getNewGroupInputWrapper(): HTMLDivElement {
    const wrapper = ElementFactory.create('div', ['new-group__input-wrapper', 'flex']);
    wrapper.append(this.getNewGroupInput(), this.getDeleteNewGroupButton());
    return wrapper;
  }

  private getNewGroupInput(): HTMLInputElement {
    return InputFactory.create({
      type: 'text',
      name: 'new-group',
      value: '',
      placeholder: 'Введите название',
      modifier: 'new-group__item',
    });
  }

  private getDeleteNewGroupButton(): HTMLButtonElement {
    return ButtonFactory.create({
      type: 'button',
      textContent: 'X',
      modifier: 'new-group__delete',
      onClick: () => {
        this.item.remove();
      },
    });
  }
}
