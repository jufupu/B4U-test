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
    // Handle Next button click
    nxtBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            if (window.innerWidth <= 768) { // Mobile breakpoint 
                if (container.scrollLeft + cardWidth >= container.scrollWidth) {
                    container.scrollLeft = 0; // Loop to start
                } else {
                    container.scrollLeft += cardWidth; // Scroll by one card
                }
            } else {
                if (container.scrollLeft + containerWidth >= container.scrollWidth) {
                    container.scrollLeft = 0; // Loop to start
                } else {
                    container.scrollLeft += containerWidth; // Scroll by container width
                }
            }
        });
    });

    // Handle Previous button click
    preBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            if (window.innerWidth <= 768) { // Mobile breakpoint 
                if (container.scrollLeft <= 0) {
                    container.scrollLeft = container.scrollWidth - cardWidth; // Loop to end
                } else {
                    container.scrollLeft -= cardWidth; // Scroll by one card
                }
            } else {
                if (container.scrollLeft <= 0) {
                    container.scrollLeft = container.scrollWidth - containerWidth; // Loop to end
                } else {
                    container.scrollLeft -= containerWidth; // Scroll by container width
                }
            }
        });
    });

    // Add swipe functionality for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance to detect a swipe
        const swipeDistance = touchStartX - touchEndX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe left (next)
                if (container.scrollLeft + cardWidth >= container.scrollWidth) {
                    container.scrollLeft = 0; // Loop to start
                } else {
                    container.scrollLeft += cardWidth; // Scroll by one card
                }
            } else {
                // Swipe right (previous)
                if (container.scrollLeft <= 0) {
                    container.scrollLeft = container.scrollWidth - cardWidth; // Loop to end
                } else {
                    container.scrollLeft -= cardWidth; // Scroll by one card
                }
            }
        }
    }
}

productContainers.forEach(container => {
    const cardWidth = getCardWidth(container);
    const containerWidth = getContainerWidth(container);
    handleScroll(container, cardWidth, containerWidth);
});
