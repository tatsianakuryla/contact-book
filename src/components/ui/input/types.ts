type InputType = 'text' | 'tel' | 'email' | 'number' | 'password' | 'search';

export interface InputOptions {
  type: InputType;
  name: string;
  placeholder: string;
  modifier: string;
  value: string;
  onInput?: (event: Event) => void;
}
