let background = document.getElementById("bg");
let images = constants.images;

window.addEventListener('scroll', function() {
    var value = window.scrollY;

    if(value < 1000) background.style.top = value * 0.7 + 'px';
});

function galleryButton() {
    var gallery = document.getElementById("gallery-scroll");
    gallery.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}