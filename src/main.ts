import { App } from './App';
import './styles/main.scss';

const rootElement = document.getElementById('contact-book');

if (rootElement) {
  const app = new App();
  app.render(rootElement);
}
