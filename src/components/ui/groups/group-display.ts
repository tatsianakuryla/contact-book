import { ElementFactory } from '../element-factory/element-factory';
import type { Group } from '../../../types/types';
import { ButtonFactory } from '../button/button-factory';
import { App } from '../../../App';

export class GroupDisplay {
  private _item: HTMLLIElement = ElementFactory.create('li', ['group', 'flex']);
  private readonly _group: Group;

  constructor(group: Group) {
    this._group = group;
    this._item.append(this.getGroupName(group), this.getDeleteGroupButton());
  }

  public get item(): HTMLElement {
    return this._item;
  }

  private getGroupName(group: Group): HTMLDivElement {
    const name = ElementFactory.create('div', ['group__name']);
    name.textContent = group.name;
    return name;
  }

  private getDeleteGroupButton(): HTMLButtonElement {
    return ButtonFactory.create({
      type: 'button',
      textContent: '',
      modifier: 'group__delete',
      onClick: () => {
        App.notificationDialog.open(this._group);
      },
    });
  }
}
