export function zoomEffect(element) {
    // Remove dezoom animation if present
    if (element.classList.contains('dezoom-animation')) {
        element.classList.remove('dezoom-animation');
    }
    // Add the zoom animation class
    element.classList.add('zoom-animation');

    // Listen for the end of the animation
    element.addEventListener('animationend', () => {
        element.classList.remove('zoom-animation');
    }, { once: true }); // Use once: true to automatically remove the listener after it fires
}
export function dezoomEffect(element) {
    // Remove zoom animation if present
    if (element.classList.contains('zoom-animation')) {
        element.classList.remove('zoom-animation');
    }
    // Add the dezoom animation class
    element.classList.add('dezoom-animation');
}