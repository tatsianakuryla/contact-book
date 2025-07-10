import { App } from './App';
import './styles/modern-normalize.css';
import './styles/main.scss';
import './layout/header/header-styles.scss';
import './layout/main/main-style.scss';

const rootElement = document.getElementById('contact-book');

if (rootElement) {
  const app = new App();
  app.render(rootElement);
}
