import { ElementFactory } from '../element-factory/element-factory';
import { ButtonFactory } from '../button/button-factory';
import type { Group } from '../../../types/types';
import { ContactDataValidator } from '../../validator/group-data-validator';
import { App } from '../../../App';

import { GroupsList } from './groups';
import { NewGroup } from './new-group';

export class GroupsDialog {
  private readonly _dialog: HTMLDialogElement;
  private readonly _heading: HTMLElement;
  private readonly _newGroupsList: HTMLElement;

  constructor() {
    this._dialog = ElementFactory.create('dialog', ['groups-dialog']);
    this._heading = ElementFactory.create('h2', ['groups-dialog__heading']);
    this._heading.textContent = 'Группы контактов';

    this._newGroupsList = ElementFactory.create('ul', ['new-groups']);
    this._dialog.append(
      this._heading,
      GroupsList.list,
      this._newGroupsList,
      this.getCancelButton(),
      this.getAddGroupButtonsBox(),
    );
    document.body.append(this._dialog);
  }

  public open(): void {
    GroupsList.update();
    this._dialog.showModal();
  }

  public close(): void {
    this._dialog.close();
  }

  private getCancelButton(): HTMLButtonElement {
    return ButtonFactory.create({
      type: 'button',
      textContent: 'X',
      modifier: 'groups-dialog__cancel',
      onClick: () => this.close(),
    });
  }

  private getAddGroupButtonsBox(): HTMLDivElement {
    const wrapper = ElementFactory.create('div', ['groups-dialog__add-group-box']);
    wrapper.append(this.getAddNewGroupButton(), this.getSaveNewGroupButton());
    return wrapper;
  }

  private getSaveNewGroupButton(): HTMLButtonElement {
    return ButtonFactory.create({
      type: 'button',
      textContent: 'Сохранить',
      modifier: 'groups-dialog__save-group',
      onClick: () => this.getNewGroupsData(),
    });
  }

  private getAddNewGroupButton(): HTMLButtonElement {
    return ButtonFactory.create({
      type: 'button',
      textContent: 'Добавить',
      modifier: 'groups-dialog__add-group',
      onClick: () => {
        this._newGroupsList.append(new NewGroup().item);
      },
    });
  }

  private getNewGroupsData(): void {
    const newGroupsBoxes = Array.from(this._newGroupsList.querySelectorAll('.new-group'));

    newGroupsBoxes.forEach((box) => {
      const input = box.querySelector<HTMLInputElement>('input');
      const errorBox = box.querySelector<HTMLDivElement>('.new-group__error-box');

      if (!input) return;

      const value = input.value.trim();
      const newGroup: Group = {
        name: value.charAt(0).toUpperCase() + value.slice(1),
      };

      const { unique, fulled } = ContactDataValidator.validate(newGroup);

      if (fulled) {
        if (errorBox) {
          errorBox.textContent = fulled;
          return;
        }
      }

      if (unique) {
        if (errorBox) {
          errorBox.textContent = unique;
          return;
        }
      }
      if (errorBox) {
        box.remove();
        App.groupsState.addItem(newGroup);
        GroupsList.update();
      }
    });
  }
}
