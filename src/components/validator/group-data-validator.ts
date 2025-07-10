import type { Group } from '../../types/types';
import { App } from '../../App';
import type { GroupValidationResult } from './types';

export class ContactDataValidator {
  private static isGroupNotEmpty(group: Group): boolean {
    return group.name.trim().length > 0;
  }

  private static isGroupUnique(group: Group): boolean {
    return !App.groupsState.items.some(
      (checkedGroup) => checkedGroup.name.toLowerCase() === group.name.toLowerCase(),
    );
  }

  public static validate(group: Group): GroupValidationResult {
    const result: GroupValidationResult = {};

    if (!this.isGroupNotEmpty(group)) {
      result.fulled = 'Поле должно быть заполнено';
    } else if (!this.isGroupUnique(group)) {
      result.unique = 'Такая группа уже существует';
    }

    return result;
  }
}
