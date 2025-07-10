import { ContactsState } from './states/contacts-state';
import { GroupsState } from './states/groups-state';
import { BaseView } from './views/base-view';
import { ContactDialog } from './components/ui/contacts/contact-dialog';
import { GroupsDialog } from './components/ui/groups/groups-dialog';
import { NotificationDialog } from './components/ui/groups/notification-display';

export class App {
  public static readonly contactsState = new ContactsState();
  public static readonly groupsState = new GroupsState();
  public static readonly contactDialog = new ContactDialog(App.groupsState.items);
  public static readonly groupsDialog = new GroupsDialog();
  public static readonly notificationDialog = new NotificationDialog();

  render(app: HTMLElement): void {
    app.append(new BaseView().fragment);
  }
}
