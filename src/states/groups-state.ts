import type { Group } from '../types/types';
import { LocalStorage } from '../services/local-storage/local-storage';
import { BaseListState } from './base-list-state';

export class GroupsState extends BaseListState<Group> {
  override addItem(item: Group): void {
    super.addItem(item);
    this.saveGroup();
  }

  constructor() {
    super();
    this.init();
  }

  public init(): void {
    this.items = LocalStorage.getGroups();
    this.saveGroup();
  }

  public removeGroup(groupName: string): void {
    this.removeItem((group) => group.name.toLowerCase() === groupName.toLowerCase());
    this.saveGroup();
  }

  private saveGroup(): void {
    LocalStorage.saveGroups(this.items);
  }
}
