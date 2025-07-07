import type { Group, Groups } from '../types/types';
import { LocalStorage } from '../services/local-storage';

export class GroupsState {
  private _groups: Groups = [];

  public get groups(): Groups {
    return [...this._groups];
  }

  private set groups(value: Groups) {
    this._groups = [...value];
  }

  public init(): void {
    this.groups = LocalStorage.getGroups();
  }

  public addGroup(group: Group): void {
    this._groups = [...this._groups, group];
    this.save();
  }

  public removeGroup(groupId: string): void {
    this._groups = this._groups.filter(
      (group) => group.group.toLowerCase() !== groupId.toLowerCase(),
    );
    this.save();
  }

  private save(): void {
    LocalStorage.saveGroups(this._groups);
  }
}
