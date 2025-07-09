import { ElementFactory } from '../element-factory/element-factory';
import { App } from '../../../App';
import { GroupDisplay } from './group-display';

export class Groups {
  public static groupsList = ElementFactory.create('ul', ['groups__section']);

  public static display(): HTMLElement {
    this.groupsList.replaceChildren();
    const groups = App.groupsState.items;
    if (groups.length === 0) {
      const text = ElementFactory.create('li', ['groups__empty-text']);
      text.textContent = 'Список групп пуст';
      this.groupsList.append(text);
    } else {
      groups.forEach((group) => {
        this.groupsList.append(new GroupDisplay(group).item);
      });
    }
    return this.groupsList;
  }
}
