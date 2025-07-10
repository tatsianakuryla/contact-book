import { ElementFactory } from '../element-factory/element-factory';
import { GroupsList } from './groups';
import { ButtonFactory } from '../button/button-factory';

export class GroupsDialog {
  private readonly _dialog: HTMLDialogElement;
  private readonly _heading: HTMLElement;

  constructor() {
    this._dialog = ElementFactory.create('dialog', ['groups-dialog']);
    this._heading = ElementFactory.create('h2', ['groups-dialog__heading']);
    this._heading.textContent = 'Группы контактов';
    const cancelButton = ButtonFactory.create({
      type: 'button',
      textContent: 'X',
      modifier: 'groups-dialog__cancel-',
      onClick: () => this.close(),
    });
    this._dialog.append(this._heading, GroupsList.list, cancelButton);
    document.body.append(this._dialog);
  }

  public open(): void {
    GroupsList.update();
    this._dialog.showModal();
  }

  public close(): void {
    this._dialog.close();
  }
}
