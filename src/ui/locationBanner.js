import { container } from "../store/canvas";

const bannerContainer = document.createElement(`div`);
const banner = document.createElement('div');
bannerContainer.className = `bannerContainer`;
banner.className = `banner`
bannerContainer.appendChild(banner);
container.appendChild(bannerContainer);

export const ShowBanner = (name) => {
  const updated = name.split('').map((char, i) => {
    if (i === 0) return char.toUpperCase();
    if (/[A-Z]/.test(char)) {
      return '  ' + char;
    }
    return char
  })
  bannerContainer.style.top = '12%';
  banner.innerHTML = `${updated.join('')}`;
  setTimeout(() => {
    bannerContainer.style.top = '-50%';
  }, 1600);
}

