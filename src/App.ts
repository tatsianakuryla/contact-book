import { ContactsState } from './states/contacts-state';
import { GroupsState } from './states/groups-state';
import { BaseLayout } from './layout/base-layout/base-layout';
import { ContactDialog } from './components/ui/contacts/contact-dialog';
import { GroupsDialog } from './components/ui/groups/groups-dialog';
import { GroupDeleteNotificationDialog } from './components/ui/group-delete-notification-dialog/group-delete-notification-dialog';

export class App {
  public static readonly contactsState = new ContactsState();
  public static readonly groupsState = new GroupsState();
  public static readonly contactDialog = new ContactDialog(App.groupsState.items);
  public static readonly groupsDialog = new GroupsDialog();
  public static readonly notificationDialog = new GroupDeleteNotificationDialog();

  render(app: HTMLElement): void {
    app.append(new BaseLayout().fragment);
  }
}
