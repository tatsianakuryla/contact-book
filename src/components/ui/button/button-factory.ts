import { ElementFactory } from '../element-factory/element-factory';
import type { ButtonOptions } from './types';

export class ButtonFactory {
  public static create({ type, textContent, modifier, onClick }: ButtonOptions): HTMLButtonElement {
    const button = ElementFactory.create('button', ['button', `${modifier}-button`]);
    button.type = type;
    button.textContent = textContent;
    if (onClick) button.addEventListener('click', onClick);
    return button;
  }
}
