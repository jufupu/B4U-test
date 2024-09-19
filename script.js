const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

function getCardWidth(container) {
    const card = container.querySelector('.product-card');
    return card ? card.getBoundingClientRect().width : 0;
}

function getContainerWidth(container) {
    return container.getBoundingClientRect().width;
}

function handleScroll(container, cardWidth, containerWidth) {
    const isMobile = () => window.innerWidth <= 768;
    const scrollAmount = () => isMobile() ? cardWidth : containerWidth;

    function scroll(direction) {
        const scrollLeft = container.scrollLeft;
        const maxScroll = container.scrollWidth - scrollAmount();

        if (direction === 'next') {
            container.scrollLeft = scrollLeft >= maxScroll ? 0 : scrollLeft + scrollAmount();
        } else {
            container.scrollLeft = scrollLeft <= 0 ? maxScroll : scrollLeft - scrollAmount();
        }
    }

    nxtBtn.forEach(btn => btn.addEventListener('click', () => scroll('next')));
    preBtn.forEach(btn => btn.addEventListener('click', () => scroll('prev')));

    // Add swipe functionality for mobile devices
    let touchStartX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    container.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const swipeThreshold = 50;
        const swipeDistance = touchStartX - touchEndX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            scroll(swipeDistance > 0 ? 'next' : 'prev');
        }
    });
}

productContainers.forEach(container => {
    const cardWidth = getCardWidth(container);
    const containerWidth = getContainerWidth(container);
    handleScroll(container, cardWidth, containerWidth);
});
