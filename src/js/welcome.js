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

    // Check if the page was reloaded (not a fresh visit) and redirect to home if true
    if (performance.getEntriesByType("navigation")[0].type === "reload") {
        window.location.href = "/";
    }

    document.documentElement.style.scrollBehavior = 'smooth';
});