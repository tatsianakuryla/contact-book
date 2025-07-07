import { ElementFactory } from '../element-factory/element-factory.ts';
import type { ButtonTypeAttributeValue } from './types';

export class ButtonFactory {
  public static create(
    type: ButtonTypeAttributeValue,
    textContent: string,
    modifier: string,
    onClick?: (event: MouseEvent) => void,
  ): HTMLButtonElement {
    const button = ElementFactory.create('button', ['button', `${modifier}button`]);
    button.type = type;
    button.textContent = textContent;
    if (onClick) button.addEventListener('click', onClick);
    return button;
  }
}
