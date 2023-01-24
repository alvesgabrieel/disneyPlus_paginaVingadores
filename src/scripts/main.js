const carouselList = document.querySelector('[data-carousel="list"]');
const carouselItem = document.querySelectorAll('[data-carousel="item"]');
const btnPrevious = document.querySelector('[data-carousel="btn-previous"]');
const btnNext = document.querySelector('[data-carousel="btn-next"]');

const state = {
    mouseDownPosition: 0,
    movement: 0,
    lastTranslatePosition: 0,
    currentSlidePosition: 0
}

function preventDefault(event){
    event.preventDefault();
}

function translateSlide(position){
    state.lastTranslatePosition = position;
    carouselList.style.transform = `translateX(${position}px)`;
}

function onMouseUp(event) {
    const item = event.currentTarget;
    item.removeEventListener('mousemove', onMouseMove);
    console.log('mouse up');
}

function onMouseDown(event) {
    const item = event.currentTarget;
    state.mouseDownPosition = event.clientX;
    state.currentSlidePosition = event.clientX - state.lastTranslatePosition;
    item.addEventListener('mousemove', onMouseMove);
    console.log('mouse down');
}

function onMouseMove(event) {
    state.movement = event.clientX - state.mouseDownPosition;
    const position = event.clientX - state.currentSlidePosition;
    translateSlide(position);
    console.log('mouse move');
}

function onMouseLeave(event) {
    const item = event.currentTarget;
    item.removeEventListener('mousemove', onMouseMove);
    console.log('mouse leave');
}

function setListeners() {
    carouselItem.forEach(function(item, index) {
        const link = item.querySelector('.movie-carousel__link');
        link.addEventListener('click', preventDefault);
        item.addEventListener('dragstart', preventDefault);
        item.addEventListener('mouseup', onMouseUp);
        item.addEventListener('mousedown', onMouseDown);
        item.addEventListener('mouseleave', onMouseLeave);
    })
}

setListeners();
