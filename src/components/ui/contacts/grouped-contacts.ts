import { ElementFactory } from '../element-factory/element-factory';
import { ButtonFactory } from '../button/button-factory';
import { App } from '../../../App';
import { ContactDisplay } from './contact-display';

export class GroupedContacts {
  public static display(): HTMLElement {
    const contactsSection = ElementFactory.create('section', ['contacts__section']);

    const groupedContacts = App.contactsState.groupedContacts;
    const groups = App.contactsState.groupNames;
    groups.forEach((group) => {
      const contactsGroup = ElementFactory.create('ul', ['contacts__group']);
      contactsGroup.id = `group-list-${group}`;

      const header = this.getGroupHeader(group, contactsGroup.id);

      groupedContacts[group].forEach((contact) => {
        contactsGroup.append(new ContactDisplay(contact).item);
      });

      if (group === '') {
        contactsSection.append(contactsGroup);
      } else {
        contactsSection.append(header, contactsGroup);
      }
    });
    return contactsSection;
  }

  private static getGroupHeader(groupName: string, targetId: string): HTMLDivElement {
    const headerWrapper: HTMLDivElement = ElementFactory.create('div', [
      'contacts__group-header',
      'flex',
    ]);
    const groupHeading = ElementFactory.create('h3', ['contacts__group-name']);
    groupHeading.textContent = groupName;
    headerWrapper.append(groupHeading, this.getOpenGroupButton(targetId));
    return headerWrapper;
  }

  private static getOpenGroupButton(targetId: string): HTMLButtonElement {
    const toggleButton = ButtonFactory.create({
      type: 'button',
      textContent: '▾',
      modifier: 'contacts__group-toggle',
      onClick: (event: MouseEvent) => {
        const targetList = document.getElementById(targetId);
        if (targetList) {
          targetList.classList.toggle('hidden');
          const button = event.currentTarget as HTMLButtonElement;
          button.textContent = targetList.classList.contains('hidden') ? '▸' : '▾';
        }
      },
    });
    toggleButton.setAttribute('aria-controls', targetId);
    return toggleButton;
  }
}
