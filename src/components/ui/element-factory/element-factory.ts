export class ElementFactory {
  public static create<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    elementClasses: string[] = [],
  ): HTMLElementTagNameMap[K] {
    const element = document.createElement(tag);
    if (elementClasses.length > 0) {
      element.classList.add(...elementClasses);
    }
    return element;
  }
}
