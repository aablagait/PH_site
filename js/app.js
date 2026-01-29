/* ================== MAIN GALLERY ================== */

let activeCategory = null;

document.querySelectorAll(".category").forEach(category => {
  const mainImg = category.querySelector(".main-photo img");
  const thumbs = Array.from(category.querySelectorAll(".thumbs img"));
  let currentIndex = 0;

  if (thumbs.length > 0) thumbs[0].classList.add("active");

  function setActiveCategory() {
    activeCategory = category;
  }

  function showImage(index) {
    if (index < 0) index = thumbs.length - 1;
    if (index >= thumbs.length) index = 0;

    currentIndex = index;

    thumbs.forEach(t => t.classList.remove("active"));
    const thumb = thumbs[currentIndex];
    thumb.classList.add("active");

    mainImg.style.opacity = "0";
    setTimeout(() => {
      mainImg.src = thumb.src;
      mainImg.dataset.full = thumb.dataset.full;
      mainImg.style.opacity = "1";
    }, 300);
  }

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      setActiveCategory();
      showImage(index);
    });
  });

  mainImg.addEventListener("click", () => {
    setActiveCategory();
  });

  let startX = 0;
  mainImg.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  mainImg.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) < 50) return;
    diff > 0 ? showImage(currentIndex + 1) : showImage(currentIndex - 1);
  });
});

/* ================== LIGHTBOX ================== */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCounter = document.getElementById("lightbox-counter");

let lightboxImages = [];
let lightboxIndex = 0;

document.querySelectorAll(".category").forEach(category => {
  const mainImg = category.querySelector(".main-photo img");
  const thumbs = Array.from(category.querySelectorAll(".thumbs img"));

  mainImg.addEventListener("click", () => {
    lightboxImages = thumbs.map(t => t.dataset.full);
    const currentFull = mainImg.dataset.full;
    lightboxIndex = lightboxImages.indexOf(currentFull);
    if (lightboxIndex === -1) lightboxIndex = 0;
    openLightbox();
  });
});

function openLightbox() {
  updateLightbox();
  lightbox.classList.add("active");
}

function updateLightbox() {
  lightboxImg.src = lightboxImages[lightboxIndex];
  lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
}

function showLightbox(index) {
  if (index < 0) index = lightboxImages.length - 1;
  if (index >= lightboxImages.length) index = 0;
  lightboxIndex = index;
  updateLightbox();
}

lightboxImg.addEventListener("click", e => {
  const rect = lightboxImg.getBoundingClientRect();
  const x = e.clientX - rect.left;
  x < rect.width / 2
    ? showLightbox(lightboxIndex - 1)
    : showLightbox(lightboxIndex + 1);
});

let lbStartX = 0;
lightboxImg.addEventListener("touchstart", e => {
  lbStartX = e.touches[0].clientX;
});

lightboxImg.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  const diff = lbStartX - endX;
  if (Math.abs(diff) < 50) return;
  diff > 0 ? showLightbox(lightboxIndex + 1) : showLightbox(lightboxIndex - 1);
});

lightbox.addEventListener("click", e => {
  if (e.target !== lightbox) return;
  lightbox.classList.remove("active");
});

document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "ArrowRight") showLightbox(lightboxIndex + 1);
  if (e.key === "ArrowLeft") showLightbox(lightboxIndex - 1);
  if (e.key === "Escape") lightbox.classList.remove("active");
});

/* ================== HERO SLIDER ================== */

const heroImages = document.querySelectorAll(".hero-image");
const prevBtn = document.querySelector(".hero-prev");
const nextBtn = document.querySelector(".hero-next");
const counter = document.querySelector(".hero-counter");

let heroIndex = 0;
let heroTimer = null;

function updateCounter() {
  counter.textContent = `${heroIndex + 1} / ${heroImages.length}`;
}

function showHero(index) {
  heroImages.forEach(img => img.classList.remove("active"));

  if (index < 0) index = heroImages.length - 1;
  if (index >= heroImages.length) index = 0;

  heroIndex = index;
  heroImages[heroIndex].classList.add("active");
  updateCounter();
}

function nextHero() {
  showHero(heroIndex + 1);
}

function prevHero() {
  showHero(heroIndex - 1);
}

function startHeroAuto() {
  heroTimer = setInterval(nextHero, 5000);
}

function resetHeroAuto() {
  clearInterval(heroTimer);
  startHeroAuto();
}

nextBtn.addEventListener("click", () => {
  nextHero();
  resetHeroAuto();
});

prevBtn.addEventListener("click", () => {
  prevHero();
  resetHeroAuto();
});

showHero(0);
startHeroAuto();

/* ================== ABOUT PHOTO ================== */

const aboutImg = document.querySelector(".about-photo img");

if (aboutImg) {
  aboutImg.addEventListener("click", () => {
    lightboxImages = [aboutImg.src];
    lightboxIndex = 0;
    openLightbox();
  });
}
