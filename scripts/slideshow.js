let active = false;
let currentSlide = 0;

let maxSlide = images.length - 1;

function getPrevSlide() {
    let prevSlide = currentSlide;
    if(currentSlide - 1 < 0) {
        prevSlide = maxSlide;
    }else{
        prevSlide -= 1;
    }
    return prevSlide;
}

function getNextSlide() {
    let nextSlide = currentSlide;
    if(currentSlide + 1 > maxSlide) {
        nextSlide = 0;
    }else{
        nextSlide += 1;
    }
    return nextSlide;
}

function showSlide(slide) {
    let element = document.getElementById("gallery-id");
    let preview_element = document.getElementById("preview");
    let fragment = document.createDocumentFragment();

    element.innerHTML = '';

    currentSlide = slide;

    let currentImg = document.createElement('img');
    currentImg.id = "current-slide";
    currentImg.src = images[currentSlide];

    fragment.appendChild(currentImg);

    element.appendChild(fragment);
    preview_element.style.zIndex = 10;
    preview_element.classList.remove("preview-exit");
    preview_element.classList.add("preview-enter");
    active = true;
}

function hideSlides() {
    let preview_element = document.getElementById("preview");
    preview_element.classList.remove("preview-enter");
    preview_element.classList.add("preview-exit");
    active = false;
}

function changeSlide(prevSlide, newSlide) {
    let element = document.getElementById("gallery-id");
    let fragment = document.createDocumentFragment();

    let current = document.createElement('img');
    current.src = images[prevSlide];

    let img = document.createElement('img');
    img.src = images[newSlide];
    img.style.opacity = 0;
    img.style.position = 'absolute';

    current.classList.add("slide-exit");
    img.classList.add("slide-enter");

    fragment.append(current);
    fragment.append(img);

    element.innerHTML = '';

    element.appendChild(fragment);
}

function changeSlideRight() {
    let prev = currentSlide;
    currentSlide = getNextSlide();
    changeSlide(prev, currentSlide);
}

function changeSlideLeft() {
    let prev = currentSlide;
    currentSlide = getPrevSlide();
    changeSlide(prev, currentSlide);
}