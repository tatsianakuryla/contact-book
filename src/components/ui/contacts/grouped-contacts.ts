import { ElementFactory } from '../element-factory/element-factory';
import { ButtonFactory } from '../button/button-factory';
import { App } from '../../../App';

import { ContactDisplay } from './contact-display';

export class GroupedContacts {
  public static contactsSection = ElementFactory.create('section', ['contacts__section']);
  public static display(): HTMLElement {
    this.contactsSection.replaceChildren();
    if (App.contactsState.items.length === 0) {
      const text = ElementFactory.create('p', ['contacts__section__empty-text']);
      text.textContent = 'Список контактов пуст';
      this.contactsSection.append(text);
    } else {
      const groupedContacts = App.contactsState.groupedContacts;
      const groups = App.contactsState.groupNames;
      groups.forEach((group) => {
        const contactsGroup = ElementFactory.create('ul', ['contacts__group']);
        const header = this.getGroupHeader(group, contactsGroup.id);
        groupedContacts[group].forEach((contact) => {
          contactsGroup.append(new ContactDisplay(contact).item);
        });

        if (group === '') {
          this.contactsSection.append(contactsGroup);
        } else {
          this.contactsSection.append(header, contactsGroup);
        }
      });
    }
    return this.contactsSection;
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
