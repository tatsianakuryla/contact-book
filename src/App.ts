import { Header } from './components/ui/header/header';

export class App {
  render(app: HTMLElement): void {
    app.appendChild(Header.create());
  }
}
