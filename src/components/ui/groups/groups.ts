import { ElementFactory } from '../element-factory/element-factory';
import { App } from '../../../App';
import { GroupDisplay } from './group-display';

export class GroupsList {
  public static list = ElementFactory.create('ul', ['groups__section']);

  public static update(): HTMLElement {
    this.list.replaceChildren();
    const groups = App.groupsState.items;
    if (groups.length === 0) {
      const text = ElementFactory.create('li', ['groups__empty-text']);
      text.textContent = 'Список групп пуст';
      this.list.append(text);
    } else {
      groups.forEach((group) => {
        this.list.append(new GroupDisplay(group).item);
      });
    }
    return this.list;
  }
}
