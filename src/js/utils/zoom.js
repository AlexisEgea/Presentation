export function zoomEffect(section) {
    const element = document.querySelector('.' + section);
    const rect = element.getBoundingClientRect();

    element.style.position = 'fixed';
    element.style.top = rect.top + 'px';
    element.style.left = rect.left + 'px';
    element.style.width = rect.width + 'px';
    element.style.height = rect.height + 'px';
    element.style.zIndex = 999;

    // Force reflow to allow transition
    element.offsetHeight;

    // Appliquer le style fullscreen via classe
    element.classList.add('fullscreen-active');

    // Remove box-cover
    const boxCoverElement = document.querySelector("." + section + " .box-cover");
    if (boxCoverElement) {
        if (boxCoverElement.classList.contains('fade-in')) {
            boxCoverElement.classList.remove('fade-in');
        }
        boxCoverElement.classList.add('fade-out');
    }
    // Add box-data
    const boxDataElement = document.querySelector("." + section + " .box-data");
    if (boxDataElement) {
        if (boxDataElement.classList.contains('fade-out')) {
            boxDataElement.classList.remove('fade-out');
        }
        boxDataElement.classList.add('fade-in');
    }
}

export function dezoomEffect(section) {
    const element = document.querySelector('.' + section);
    // Sauvegarder la couleur de fond actuelle
    const backgroundColor = element.style.backgroundColor;
    
    element.classList.remove('fullscreen-active');
    
    element.addEventListener('transitionend', () => {
        // Réinitialiser tous les styles sauf la couleur de fond
        element.style = '';
        // Réappliquer la couleur de fond
        element.style.backgroundColor = backgroundColor;
    }, { once: true });
    
    // Add box-cover
    const boxCoverElement = document.querySelector("." + section + " .box-cover");
    console.log(boxCoverElement);
    if (boxCoverElement) {
        if (boxCoverElement.classList.contains('fade-out')) {
            boxCoverElement.classList.remove('fade-out');
        }
        boxCoverElement.classList.add('fade-in');
    }
    // remove box-data
    const boxDataElement = document.querySelector("." + section + " .box-data");
    if (boxDataElement) {
        if (boxDataElement.classList.contains('fade-in')) {
            boxDataElement.classList.remove('fade-in');
        }
        boxDataElement.classList.add('fade-out');
    }
}