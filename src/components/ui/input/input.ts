import { ElementFactory } from '../element-factory/element-factory';
import type { InputOptions } from './types';

export class InputFactory {
  public static create({
    type,
    name,
    modifier,
    placeholder,
    value,
    onInput,
  }: InputOptions): HTMLInputElement {
    const input = ElementFactory.create('input', ['input', `${modifier}-input`]);
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;
    input.value = value;
    if (onInput) {
      input.addEventListener('input', onInput);
    }
    return input;
  }
}
