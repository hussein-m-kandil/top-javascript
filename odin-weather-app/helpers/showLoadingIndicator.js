import loadingGif from '../../assets/loading_256.gif';
import createElement from './createElement';

export default function showLoadingIndicator(containerClassName) {
  const contentDiv = document.querySelector(`.${containerClassName}`);
  if (contentDiv) {
    [...contentDiv.children].forEach((child) => child.remove());
    contentDiv.append(
      createElement(
        'img',
        'loading-gif',
        null,
        ['src', loadingGif],
        ['alt', 'Loading...'],
        ['width', '50'],
      ),
    );
  }
}

export { showLoadingIndicator };
