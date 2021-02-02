import Carousel from "./components/Carousel"

document.addEventListener('DOMContentLoaded', () => {
    const carouselProps = {
        element: document.querySelector('.Carousel'),
        slides: [
            {
                content: '<h3>0</h3>'
            },
            {
                content: '<h3>1</h3>'
            },
            {
                content: '<h3>2</h3>'
            },
            {
                content: '<h3>3</h3>'
            },
        ],
        direction: 1,
        duration: 2000,
        slideDelay: 5000,
        numVisibleSlides: 3
    }
    const carousel = new Carousel(carouselProps)
    carousel.update()
})