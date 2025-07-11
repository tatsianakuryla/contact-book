import { ElementFactory } from '../element-factory/element-factory';
import { ButtonFactory } from '../button/button-factory';
import { App } from '../../../App';
import { GroupedContacts } from '../contacts/grouped-contacts';
import type { Group } from '../../../types/types';
import { defaultGroupValue } from '../../../constants/constants';
import { Toast } from '../toast/toast';
import { GroupsList } from '../groups/groups-list';

export class GroupDeleteNotificationDialog {
  private readonly _dialog: HTMLDialogElement = ElementFactory.create('dialog', [
    'group-delete-notification-dialog',
  ]);
  private readonly _dialogWrapper: HTMLDivElement = ElementFactory.create('div', [
    'notification__wrapper',
    'flex',
  ]);
  private readonly _heading: HTMLElement = ElementFactory.create('h2', ['notification__heading']);
  private readonly _message: HTMLElement = ElementFactory.create('p', ['notification__text']);
  private _group: Group = defaultGroupValue;

  constructor() {
    this._heading.textContent = 'Удалить группу?';
    this._message.textContent =
      'Удаление группы повлечёт за собой удаление контактов, связанных с этой группой';
    this._dialogWrapper.append(
      this._heading,
      this._message,
      this.getCloseButton(),
      this.getButtonsBox(),
    );
    this._dialog.append(this._dialogWrapper);
    document.body.append(this._dialog);
  }

  public open(group: Group): void {
    this._group = group;
    this._dialog.showModal();
  }

  public close(): void {
    this._dialog.close();
  }

  private createButton(text: string, modifier: string, onClick: () => void): HTMLButtonElement {
    return ButtonFactory.create({
      type: 'button',
      textContent: text,
      modifier,
      onClick,
    });
  }

  private getCloseButton(): HTMLButtonElement {
    return this.createButton('', 'notification__close', () => this.close());
  }

  private getApproveButton(): HTMLButtonElement {
    return this.createButton('Да, удалить', 'notification__approve', () => {
      App.contactsState.removeContactsWithGroup(this._group);
      App.groupsState.removeGroup(this._group.name);
      GroupedContacts.update();
      GroupsList.update();
      App.groupsDialog.close();
      Toast.show('Группа успешно удалена');
      this.close();
    });
  }

  private getCancelButton(): HTMLButtonElement {
    return this.createButton('Отмена', 'notification__cancel', () => this.close());
  }

  private getButtonsBox(): HTMLDivElement {
    const wrapper = ElementFactory.create('div', ['notification__buttons-box', 'flex']);
    wrapper.append(this.getApproveButton(), this.getCancelButton());
    return wrapper;
  }
}
