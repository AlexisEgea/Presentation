document.addEventListener('DOMContentLoaded', () => {
    const welcomeSection = document.getElementById('welcome-section');
    let hasScrolled = false;

    // Handle scroll event
    window.addEventListener('scroll', () => {
        if (!hasScrolled && window.scrollY > 50) {
            welcomeSection.classList.add('fade-out');
            hasScrolled = true;
        }
    });

    // Add smooth scroll behavior to the page
    document.documentElement.style.scrollBehavior = 'smooth';
});