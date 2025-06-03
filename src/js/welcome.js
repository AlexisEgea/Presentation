document.addEventListener('DOMContentLoaded', () => {
    const welcomeSection = document.querySelector('.welcome-section');
    let hasScrolled = false;

    // Handle scroll event
    window.addEventListener('scroll', () => {
        if (!hasScrolled && window.scrollY > 20) {
            welcomeSection.classList.add('fade-out');
            hasScrolled = true;
        }
    });

    // Add smooth scroll behavior to the page
    document.documentElement.style.scrollBehavior = 'smooth';
});