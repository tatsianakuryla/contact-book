export class App {
  render(container: HTMLElement): void {
    container.innerHTML = '';

    const heading = document.createElement('h1');
    heading.textContent = 'Hello world';

    container.appendChild(heading);
  }
}
