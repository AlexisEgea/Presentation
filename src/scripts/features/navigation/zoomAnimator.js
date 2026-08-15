// Builds a fixed-position clone used for zoom transitions.
function createZoomClone(box, boxRect) {
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
    return clone;
}

// Uses innerHeight to avoid mobile viewport height jumps.
function getStableViewportHeightPx() {
    return `${window.innerHeight}px`;
}

// Animates a grid card from its cell to fullscreen.
export function zoomIn(sectionClass, options = {}) {
    const { disableZoomOutClick = false, onZoomInComplete = null } = options;
    const box = document.querySelector(`.box.${sectionClass}`);
    if (!box) {
        return null;
    }

    // Switch visual focus from poster (cover) to detailed content.
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

    // Create transition clone and animate it to fullscreen bounds.
    const boxRect = box.getBoundingClientRect();
    const clone = createZoomClone(box, boxRect);
    document.body.appendChild(clone);
    clone.offsetHeight;
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.width = '100vw';
    clone.style.height = getStableViewportHeightPx();
    clone.style.transform = 'scale(1)';

    // Notify caller when zoom-in completes (used to trigger navigation).
    if (typeof onZoomInComplete === 'function') {
        clone.addEventListener('transitionend', () => {
            onZoomInComplete(sectionClass, clone);
        }, { once: true });
    }

    // Optional legacy behavior: click fullscreen clone to zoom out.
    if (!disableZoomOutClick) {
        clone.addEventListener('click', () => {
            zoomOut(clone, boxRect, sectionClass);
        });
    }

    return clone;
}

// Animates the fullscreen clone back to its original card position.
function zoomOut(clone, originalRect, sectionClass, onComplete = null) {
    clone.style.top = `${originalRect.top}px`;
    clone.style.left = `${originalRect.left}px`;
    clone.style.width = `${originalRect.width}px`;
    clone.style.height = `${originalRect.height}px`;
    clone.style.transform = 'scale(1)';

    // Restore poster view while collapsing back to the grid card.
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

    // Finalize once geometric properties have finished transitioning.
    const watchedProps = new Set(['width', 'height']);
    let isFinalized = false;

    const finalize = () => {
        if (isFinalized) {
            return;
        }
        isFinalized = true;
        clone.removeEventListener('transitionend', onEnd);
        clone.remove();
        if (typeof onComplete === 'function') {
            onComplete();
        }
    };

    const onEnd = (event) => {
        if (event.target !== clone) {
            return;
        }
        if (!watchedProps.has(event.propertyName)) {
            return;
        }
        finalize();
    };

    clone.addEventListener('transitionend', onEnd);
    // Safety timeout in case transitionend is missed on some browsers.
    window.setTimeout(finalize, 840);
}

// Replays the reverse transition when returning from a section page.
export function dezoomFromFullscreen(sectionClass) {
    const box = document.querySelector(`.box.${sectionClass}`);
    if (!box) {
        return;
    }

    // Start from a fullscreen clone to mirror the section page state.
    const boxRect = box.getBoundingClientRect();
    const clone = createZoomClone(box, boxRect);
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.width = '100vw';
    clone.style.height = getStableViewportHeightPx();
    clone.style.transform = 'scale(1)';
    clone.style.pointerEvents = 'none';

    // Blend from content-heavy view back to poster view during dezoom.
    const cloneCoverElement = clone.querySelector('.box-cover');
    const cloneDataElement = clone.querySelector('.box-data');
    if (cloneCoverElement && cloneDataElement) {
        cloneCoverElement.style.opacity = '0';
        cloneCoverElement.style.visibility = 'visible';
        cloneCoverElement.style.filter = 'blur(8px)';
        cloneCoverElement.style.transition = 'opacity 0.55s ease, filter 0.55s ease';

        cloneDataElement.style.opacity = '1';
        cloneDataElement.style.visibility = 'visible';
        cloneDataElement.style.filter = 'blur(0)';
        cloneDataElement.style.transition = 'opacity 0.55s ease, filter 0.55s ease';
    }

    // Hide original until the clone lands exactly on the target card.
    box.style.visibility = 'hidden';
    document.body.appendChild(clone);
    clone.offsetHeight;

    if (cloneCoverElement && cloneDataElement) {
        cloneCoverElement.style.opacity = '1';
        cloneCoverElement.style.filter = 'blur(0)';
        cloneDataElement.style.opacity = '0';
        cloneDataElement.style.filter = 'blur(10px)';
    }

    // Finish by revealing the original card in its default grid state.
    zoomOut(clone, boxRect, sectionClass, () => {
        box.style.visibility = 'visible';
    });
}
