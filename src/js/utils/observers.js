// Function to create and manage observers for a section
export function createSectionObserver(section, onVisible) {
    let contentLoaded = false;

    // Create an observer to watch when section becomes visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !contentLoaded) {
                onVisible();
                contentLoaded = true;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Watch for class changes on section
    const classObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' && !contentLoaded) {
                if (section.classList.contains('visible')) {
                    console.log("observation start");
                    observer.observe(section);
                }
            }
        });
    });

    // Start observing class changes
    classObserver.observe(section, {
        attributes: true,
        attributeFilter: ['class']
    });

    return {
        stopObserving: () => {
            observer.disconnect();
            classObserver.disconnect();
        }
    };
} 