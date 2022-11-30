document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementsByClassName('slides')[0];
  const slides = gallery.querySelectorAll('div');
  const dots = document.getElementsByClassName('dots')[0];
  const slideWidth = 540;

  dots.innerHTML = [...slides]
    .reduce((acc, slide, i) => acc + `<div data-id="${i}"></div>`, '');
  

  dots.querySelectorAll('div').forEach(d => {
    d.addEventListener('click', () => toCertainDot(d));
  });

  gallery.addEventListener('scroll', e => clickedDots());

  clickedDots();

  function clickedDots() {
    Array.prototype.forEach.call(dots.getElementsByClassName('clicked'), function(d) {
      d.classList.remove('clicked')
    });
    const crt = Math.floor(gallery.scrollLeft / slideWidth);
    dots
      .querySelector(`div[data-id="${crt}"]`)
      .classList.add('clicked');
  };
  
  function toCertainDot(e) {
    const crt = parseInt(e.dataset.id, 10);
    gallery.scrollTo(crt * slideWidth, 0);
  };

});