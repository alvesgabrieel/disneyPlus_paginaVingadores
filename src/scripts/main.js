const carouselList = document.querySelector('[data-carousel="list"]');
const carouselItem = document.querySelectorAll('[data-carousel="item"]');

const state = {
    mouseDownPosition: 0,
    movement: 0,
    lastTranslatePosition: 0,
    currentSlidePosition: 0,
    currentItemIndex: 0,
    currentSlideIndex: 0
}

function animateTransition(active) {
    if(active) {
        carouselList.style.transition = 'transform .3s'
    } else {
        carouselList.style.removeProperty('transition')
    }
}

function preventDefault(event){
    event.preventDefault();
}

function translateSlide(position){
    state.lastTranslatePosition = position;
    carouselList.style.transform = `translateX(${position}px)`;
}

function getCenterPosition(slideIndex) {
    const item = carouselItem[state.currentItemIndex];
    const itemWidth = item.offsetWidth;
    const bodyWidth = document.body.clientWidth;
    const slideWidth = itemWidth * 5;
    const margin = (bodyWidth - slideWidth) / 2;
    return margin - (slideWidth * slideIndex);
}

function setVisibleSlide(slideIndex) {
    state.currentSlideIndex = slideIndex;
    const centerPosition = getCenterPosition(slideIndex);
    animateTransition(true);
    translateSlide(centerPosition);
}

function backwardSlide() {
    if(state.currentSlideIndex > 0) {
        setVisibleSlide(state.currentSlideIndex - 1);
    } else {
        setVisibleSlide(state.currentSlideIndex);
    }
}

function forwardSlide() {
    const lastItemIndex = carouselItem.length - 1;
    const lastSlideIndex = Math.floor(lastItemIndex / 5)
    if(state.currentSlideIndex < lastSlideIndex) {
        setVisibleSlide(state.currentSlideIndex + 1);
    } else {
        setVisibleSlide(state.currentSlideIndex);
    }
}

function onMouseUp(event) {
    if(state.movement > 150) {
        backwardSlide();
    } else if (state.movement < -150) {
        forwardSlide();
    } else {
        setVisibleSlide(state.currentSlideIndex);
    }

    const item = event.currentTarget;
    item.removeEventListener('mousemove', onMouseMove);
}

function onMouseDown(event, index) {
    const item = event.currentTarget;
    state.currentItemIndex = index;
    state.mouseDownPosition = event.clientX;
    state.currentSlidePosition = event.clientX - state.lastTranslatePosition;
    animateTransition(false);
    item.addEventListener('mousemove', onMouseMove);
}

function onMouseMove(event) {
    state.movement = event.clientX - state.mouseDownPosition;
    const position = event.clientX - state.currentSlidePosition;
    translateSlide(position);
}

function onMouseLeave(event) {
    const item = event.currentTarget;
    item.removeEventListener('mousemove', onMouseMove);
}

function setListeners() {
    carouselItem.forEach(function(item, index) {
        const link = item.querySelector('.movie-carousel__link');
        link.addEventListener('click', preventDefault);
        item.addEventListener('dragstart', preventDefault);
        item.addEventListener('mouseup', onMouseUp);
        item.addEventListener('mousedown', function(event) {
            onMouseDown(event, index);
        });
        item.addEventListener('mouseleave', onMouseLeave);
    })
}

setListeners();
setVisibleSlide(0)

