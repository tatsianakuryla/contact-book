import { ElementFactory } from '../element-factory/element-factory';
import { ButtonFactory } from '../button/button-factory';
import { App } from '../../../App';
import { ContactDisplay } from './contact-display';

export class ContactGroups {
  public static display(): HTMLElement {
    const contactsSection = ElementFactory.create('section', ['contacts__section']);

    const groupedContacts = App.contactsState.groupedContacts;
    const groups = App.contactsState.groupNames;
    groups.forEach((group) => {
      contactsSection.append(this.getGroupHeader(group));

      const contactsGroup = ElementFactory.create('ul', ['contacts__group']);
      groupedContacts[group].forEach((contact) => {
        contactsGroup.append(new ContactDisplay(contact).item);
      });

      contactsSection.append(contactsGroup);
    });
    return contactsSection;
  }

  private static getGroupHeader(groupName: string): HTMLDivElement {
    const headerWrapper: HTMLDivElement = ElementFactory.create('div', [
      'contacts__group-header',
      'flex',
    ]);
    const groupHeading = ElementFactory.create('h3', ['contacts__group-name']);
    groupHeading.textContent = groupName;
    const openGroupButton = ButtonFactory.create('button', '', 'contacts__group-open-');
    headerWrapper.append(groupHeading, openGroupButton);
    return headerWrapper;
  }
}
