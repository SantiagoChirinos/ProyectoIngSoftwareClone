let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (index + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
}

setInterval(() => {
    showSlide(currentSlide + 1);
}, 10000);

if(localStorage.getItem('rol') == 0){ //oculta para los que sean clientes
    document.getElementById('MenuSaldo').classList.add('hidden');    
}