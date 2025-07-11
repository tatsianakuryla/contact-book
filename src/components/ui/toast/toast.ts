import { ElementFactory } from '../element-factory/element-factory';

export class Toast {
  private static container: HTMLDivElement | null = null;

  private static createContainer(): void {
    if (!this.container) {
      this.container = ElementFactory.create('div', ['toast']);
      document.body.appendChild(this.container);
    }
  }

  public static show(message: string): void {
    this.displayToast(message, 4000, document.body);
  }

  public static showUnderModal(message: string, modal: HTMLDialogElement): void {
    this.displayToast(message, 2000, modal);
  }

  private static displayToast(message: string, duration: number, container: HTMLElement): void {
    this.createContainer();

    const toast = ElementFactory.create('div', ['toast__content']);
    const text = ElementFactory.create('span', ['toast__message']);
    text.textContent = message;

    toast.append(text);
    this.container!.appendChild(toast);

    if (!container.contains(this.container!)) {
      container.append(this.container!);
    }

    setTimeout(() => {
      toast.remove();
    }, duration);
  }
}
