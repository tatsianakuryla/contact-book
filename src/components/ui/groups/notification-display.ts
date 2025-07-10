import { ElementFactory } from '../element-factory/element-factory';
import { ButtonFactory } from '../button/button-factory';
import { App } from '../../../App';
import { GroupedContacts } from '../contacts/grouped-contacts';
import type { Group } from '../../../types/types';
import { defaultGroupValue } from '../../../constants/constants';
import { Toast } from '../toast/toast';

import { GroupsList } from './groups-list.ts';

export class NotificationDialog {
  private readonly _dialog: HTMLDialogElement;
  private readonly _heading: HTMLElement;
  private readonly _message: HTMLElement;
  private _group: Group = defaultGroupValue;

  constructor() {
    this._dialog = ElementFactory.create('dialog', ['notification']);
    this._heading = ElementFactory.create('h2', ['notification__heading']);
    this._heading.textContent = 'Удалить группу?';

    this._message = ElementFactory.create('p', ['notification__text']);
    this._message.textContent =
      'Удаление группы повлечёт за собой удаление контактов, связанных с этой группой';
    this._dialog.append(this._heading, this._message, this.getCloseButton(), this.getButtonsBox());
    document.body.append(this._dialog);
  }

  public open(group: Group): void {
    this._group = group;
    this._dialog.showModal();
  }

  public close(): void {
    this._dialog.close();
  }

  private getCloseButton(): HTMLButtonElement {
    return ButtonFactory.create({
      type: 'button',
      textContent: 'X',
      modifier: 'notification__close',
      onClick: () => this.close(),
    });
  }

  private getButtonsBox(): HTMLDivElement {
    const wrapper = ElementFactory.create('div', ['notification__buttons-box']);
    wrapper.append(this.getApproveButton(), this.getCancelButton());
    return wrapper;
  }

  private getApproveButton(): HTMLButtonElement {
    return ButtonFactory.create({
      type: 'button',
      textContent: 'Да, удалить',
      modifier: 'notification__approve',
      onClick: () => {
        App.contactsState.removeContactsWithGroup(this._group);
        App.groupsState.removeGroup(this._group.name);
        GroupedContacts.update();
        GroupsList.update();
        Toast.show('Группа успешно удалена');
        this.close();
      },
    });
  }

  private getCancelButton(): HTMLButtonElement {
    return ButtonFactory.create({
      type: 'button',
      textContent: 'Отмена',
      modifier: 'notification__cancel',
      onClick: () => this.close(),
    });
  }
}
