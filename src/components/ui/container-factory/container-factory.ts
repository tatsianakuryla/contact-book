import { ElementFactory } from '../element-factory/element-factory';

export class ContainerFactory {
  public static create(elementName: string): HTMLDivElement {
    return ElementFactory.create('div', ['container', `${elementName}__container`, 'flex']);
  }
}
