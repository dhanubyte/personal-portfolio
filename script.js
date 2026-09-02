// ===== SLIDER LOGIC =====
const slider = document.getElementById('slider');
const dotsWrapper = document.getElementById('dots');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

let currentSlide = 0;

// Build dot indicators dynamically based on number of slides
function buildDots() {
    dotsWrapper.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentSlide) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsWrapper.appendChild(dot);
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
    updateDots();
}

function goTo(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;
    updateSlider();
}

function nextSlide() {
    goTo(currentSlide + 1);
}

function prevSlide() {
    goTo(currentSlide - 1);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// Basic swipe support for touch devices
let touchStartX = 0;
slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});
slider.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        diff > 0 ? nextSlide() : prevSlide();
    }
});

// Init
buildDots();
updateSlider();
