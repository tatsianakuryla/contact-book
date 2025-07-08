import { ContactsState } from './states/contacts-state';
import { GroupsState } from './states/groups-state';
import { BaseView } from './views/base-view';

export class App {
  public static readonly contactsState = new ContactsState();
  public static readonly groupsState = new GroupsState();

  render(app: HTMLElement): void {
    app.appendChild(new BaseView().fragment);
  }
}
