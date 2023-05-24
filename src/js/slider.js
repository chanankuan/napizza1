const slides = document.querySelectorAll(".home__slide");
const slideImages = document.querySelectorAll(".home__slide-image");
const prevSlideBtns = document.querySelectorAll(".prev-slide-btn");
const nextSlideBtns = document.querySelectorAll(".next-slide-btn");

prevSlideBtns.forEach((btn) => {
  btn.addEventListener("click", prev);
});
nextSlideBtns.forEach((btn) => {
  btn.addEventListener("click", next);
});

setInterval(() => {
  next();
}, 5000);

function prev() {
  let lastIndex = slides.length - 1;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains("active")) {
      slides[i].classList.remove("active");
      if (i !== 0) {
        slides[i - 1].classList.add("active");
      } else {
        slides[lastIndex].classList.add("active");
      }

      return;
    }
  }
}

function next() {
  let lastIndex = slides.length - 1;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains("active")) {
      slides[i].classList.remove("active");
      if (i !== lastIndex) {
        slides[i + 1].classList.add("active");
      } else {
        slides[0].classList.add("active");
      }

      return;
    }
  }
}
