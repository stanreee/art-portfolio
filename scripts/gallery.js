const gallery = document.querySelector('.gallery');
var pageNumber = 0;
const maxPage =  Math.floor(images.length / 8);

function loadGallery() {
    var thumbnails = document.getElementById("thumbnails");
    let fragment = document.createDocumentFragment();
    var row = 0;
    var column = 0;
    var page = 0;
    images.forEach((image, index) => {
        let img = document.createElement('img');
        img.src = image;
        img.classList.add('thumbnails-img');
        img.style.left = (page * 100) + (5 + (column * (18.75 + 5))) + 'vw';
        img.style.top = 80 + (row * (360 + 53.75)) + 'px';
        img.style.opacity = 0;
        img.onclick = function(){
            showSlideShow(index);
        };
        column += 1;
        if(column > 3) {
            column = 0;
            row += 1;
            if(row > 1) {
                row = 0;
                page += 1;
                gallery.style.width = (100 + page * 100) + 'vw';
            }
        }
        fragment.appendChild(img);
    });
    thumbnails.appendChild(fragment);
}

function loadNavigationBar() {
    const navibar = document.querySelector('.navigation-bar');
    let fragment = document.createDocumentFragment();
    for(let i = 0; i <= maxPage; i++) {
        let img = document.createElement('img');
        img.src = i == pageNumber ? fullNaviBubble.src : emptyNaviBubble.src;
        const imgClass = i == pageNumber ? fullNaviBubble.className : emptyNaviBubble.className;
        img.classList.add(imgClass);
        img.onclick = function() {
            moveToPage(i);
        };
        img.style.cursor = 'pointer';
        fragment.appendChild(img);
    }
    navibar.appendChild(fragment);
}

var has_fired;
window.addEventListener('scroll', function() {
    var galleryScroll = document.getElementById("gallery-scroll");
    var gallery = document.getElementsByClassName("thumbnails-img");
    if(!has_fired && window.scrollY >= (galleryScroll.offsetTop / 2)) {
        has_fired = true;
        for(let i = 0; i < gallery.length; i++){
            delayFade(i, gallery);
        }
    }
});

function delayFade(i, gallery) {
    setTimeout(function() {
        gallery[i].classList.add("fade-in-img");
    }, 100 * i);
}

function showSlideShow(slide) {
    showSlide(slide);
}

function moveToPage(page) {
    const oldPage = pageNumber;
    if(pageNumber < page) {
        turnPageRight(page - pageNumber);
    }else if(pageNumber > page) {
        turnPageLeft(pageNumber - page);
    }
    const navibar = document.querySelector('.navigation-bar');
    navibar.children[oldPage].src = emptyNaviBubble.src;
    navibar.children[oldPage].className = emptyNaviBubble.className;
    navibar.children[pageNumber].src = fullNaviBubble.src;
    navibar.children[pageNumber].className = fullNaviBubble.className;
}

function turnPageRight(times) {
    const gallery = document.querySelector('.gallery');

    const size = gallery.clientWidth;
    
    if(pageNumber == maxPage) pageNumber = 0;
    else pageNumber += times;
    gallery.style.transform = 'translateX(' + pageNumber * -100 + 'vw)';
}

function turnPageLeft(times) {
    const gallery = document.querySelector('.gallery');

    const size = gallery.clientWidth;
    
    pageNumber -= times;
    gallery.style.transform = 'translateX(' + pageNumber * -100 + 'vw)';
}

loadGallery();
loadNavigationBar();