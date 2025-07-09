type ButtonTypeAttributeValue = 'button' | 'submit' | 'reset';

export interface ButtonOptions {
  type: ButtonTypeAttributeValue;
  textContent: string;
  modifier: string;
  onClick?: (event: MouseEvent) => void;
}
