import { App } from './App';
import './styles/modern-normalize.css';
import './styles/main.scss';

const rootElement = document.getElementById('contact-book');

if (rootElement) {
  const app = new App();
  app.render(rootElement);
}
