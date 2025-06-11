export function zoomIn(sectionClass) {
    const box = document.querySelector(`.box.${sectionClass}`);

    // Handle fade transitions for box-cover/box-data (Zoom In)
    const boxCoverElement = document.querySelector(`.${sectionClass} .box-cover`);
    if (boxCoverElement) {
        boxCoverElement.classList.remove('fade-in');
        boxCoverElement.classList.add('fade-out');
    }

    const boxDataElement = document.querySelector(`.${sectionClass} .box-data`);
    if (boxDataElement) {
        boxDataElement.classList.remove('fade-out');
        boxDataElement.classList.add('fade-in');
    }

    // Get current dimensions and position of the box
    const boxRect = box.getBoundingClientRect();
    // Clone the box
    const clone = box.cloneNode(true);
    clone.classList.add('zoom-clone');
    clone.style.position = 'fixed';
    clone.style.top = `${boxRect.top}px`;
    clone.style.left = `${boxRect.left}px`;
    clone.style.width = `${boxRect.width}px`;
    clone.style.height = `${boxRect.height}px`;
    clone.style.margin = '0';
    clone.style.transform = 'scale(1)';
    clone.style.transformOrigin = 'center center';
    clone.style.transition = 'transform 0.8s ease-in-out, top 0.8s ease-in-out, left 0.8s ease-in-out, width 0.8s ease-in-out, height 0.8s ease-in-out';
    clone.style.zIndex = '1000';
    // Add clone to DOM
    document.body.appendChild(clone);
    // Force reflow to ensure browser registers initial state
    clone.offsetHeight;
    // Animate to fullscreen
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.width = '100vw';
    clone.style.height = '100vh';
    clone.style.transform = 'scale(1)';

    // Add click handler to trigger zoomOut
    clone.addEventListener('click', () => {
        zoomOut(clone, boxRect, sectionClass);
    });
}

function zoomOut(clone, originalRect, sectionClass) {
    // Animate back to original position/size
    clone.style.top = `${originalRect.top}px`;
    clone.style.left = `${originalRect.left}px`;
    clone.style.width = `${originalRect.width}px`;
    clone.style.height = `${originalRect.height}px`;
    clone.style.transform = 'scale(1)';

    // Handle fade transitions for box-cover/box-data (Zoom Out)
    const boxCoverElement = document.querySelector(`.${sectionClass} .box-cover`);
    if (boxCoverElement) {
        boxCoverElement.classList.remove('fade-out');
        boxCoverElement.classList.add('fade-in');
    }

    const boxDataElement = document.querySelector(`.${sectionClass} .box-data`);
    if (boxDataElement) {
        boxDataElement.classList.remove('fade-in');
        boxDataElement.classList.add('fade-out');
    }

    // Remove clone after animation completes
    clone.addEventListener('transitionend', function handler() {
        clone.remove();
        clone.removeEventListener('transitionend', handler);
    });
}
