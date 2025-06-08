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

    // TODO: will be updated when introduction tag will change
    if (section == 'introduction') {
        const suffixes = ['-title', '-subtitle', '-click', '-content'];
        suffixes.forEach(suffix => {
            const element = document.querySelector('.' + section + suffix);
            if (element) {
                if (element.classList.contains('fade-out')) {
                    element.classList.remove('fade-out');
                }
                element.classList.add('fade-in');
            }
        });
    } else {
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
}

export function dezoomEffect(section) {
    const element = document.querySelector('.' + section);
    element.classList.remove('fullscreen-active');

    element.addEventListener('transitionend', () => {
        element.style = '';
    }, { once: true });

    // TODO: will be updated when introduction tag will change
    if (section == 'introduction') {
        const suffixes = ['-title', '-subtitle', '-click', '-content'];
        suffixes.forEach(suffix => {
            const element = document.querySelector('.' + section + suffix);
            if (element) {
                if (element.classList.contains('fade-in')) {
                    element.classList.remove('fade-in');
                }
                element.classList.add('fade-out');
            }
        });
    } else {
        // Add box-cover
        const boxCoverElement = document.querySelector("." + section + " .box-cover");
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
}