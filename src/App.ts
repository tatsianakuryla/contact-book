import { ContactsState } from './states/contacts-state';
import { GroupsState } from './states/groups-state';
import { BaseView } from './views/base-view';
import { ContactDialog } from './components/ui/contact-dialog/contact-dialog';

export class App {
  public static readonly contactsState = new ContactsState();
  public static readonly groupsState = new GroupsState();
  public static readonly contactDialog = new ContactDialog(App.groupsState.items);

  render(app: HTMLElement): void {
    app.append(new BaseView().fragment);
  }
}
