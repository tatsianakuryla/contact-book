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
    this.createContainer();

    const toast = ElementFactory.create('div', ['toast__content']);

    const text = ElementFactory.create('span', ['toast__message']);
    text.textContent = message;

    toast.append(text);
    this.container!.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4000);
  }
}
