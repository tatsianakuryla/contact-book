import { ElementFactory } from '../element-factory/element-factory';
import { ButtonFactory } from '../button/button-factory';
import { App } from '../../../App';

import { ContactDisplay } from './contact-display';

export class GroupedContacts {
  public static contactsSection = ElementFactory.create('section', [
    'main__contacts-section',
    'flex',
  ]);
  public static update(): HTMLElement {
    this.contactsSection.replaceChildren();
    if (App.contactsState.items.length === 0) {
      const text = ElementFactory.create('p', ['main__empty-contacts-text', 'flex']);
      text.textContent = 'Список контактов пуст';
      this.contactsSection.append(text);
    } else {
      const groupedContacts = App.contactsState.groupedContacts;
      const groups = App.contactsState.groupNames;
      groups.forEach((group) => {
        const wrapper = ElementFactory.create('div', ['contacts__group-wrapper', 'flex']);
        const contactsGroup = ElementFactory.create('ul', ['contacts__group']);
        contactsGroup.id = `group-list-${group}`;
        const header = this.getGroupHeader(group, contactsGroup.id);
        groupedContacts[group].forEach((contact) => {
          contactsGroup.append(new ContactDisplay(contact).item);
        });

        if (group === '') {
          wrapper.append(contactsGroup);
        } else {
          wrapper.append(header, contactsGroup);
        }
        this.contactsSection.append(wrapper);
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
      textContent: '',
      modifier: 'contacts__group-toggle',
      onClick: (event: MouseEvent) => {
        const targetList = document.getElementById(targetId);
        if (targetList) {
          targetList.classList.toggle('hidden');
          const button = event.currentTarget;
          if (button instanceof HTMLButtonElement) {
            const parent = button.parentElement;
            if (targetList.classList.contains('hidden')) {
              button.classList.add('contacts__group-toggle-button_close');
              if (parent) parent.style.paddingBottom = '0';
            } else {
              button.classList.remove('contacts__group-toggle-button_close');
              if (parent) parent.style.paddingBottom = '24px';
            }
          }
        }
      },
    });
    toggleButton.setAttribute('aria-controls', targetId);
    return toggleButton;
  }
}
