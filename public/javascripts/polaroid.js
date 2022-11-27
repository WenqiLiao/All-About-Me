const gallery = document.querySelector('.slides');
const slides = gallery.querySelectorAll('div');
const dots = document.querySelector('.dots');
const slideCount = slides.length;
const slideWidth = 540;

const clickedDots = () => {
  dots
    .querySelectorAll('div.clicked')
    .forEach(d => d.classList.remove('clicked'));
  const index = Math.floor(gallery.scrollLeft / slideWidth);
  dots
    .querySelector(`div[data-id="${index}"]`)
    .classList.add('clicked');
};

const scrollToElement = e => {
  const index = parseInt(e.dataset.id, 10);
  gallery.scrollTo(index * slideWidth, 0);
};

dots.innerHTML += [...slides]
  .map((slide, i) => `<div data-id="${i}"></div>`)
  .join('');

dots.querySelectorAll('div').forEach(d => {
  d.addEventListener('click', () => scrollToElement(d));
});

gallery.addEventListener('scroll', e => clickedDots());

clickedDots();