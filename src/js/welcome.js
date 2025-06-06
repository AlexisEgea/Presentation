document.addEventListener('DOMContentLoaded', () => {
    const welcomeSection = document.querySelector('.welcome-section');
    const mainSection = document.querySelector('.main-section');
    let hasClicked = false;

    // Ensure main section is hidden by default
    mainSection.classList.add('hidden');

    // Handle click event on the welcome section
    welcomeSection.addEventListener('click', () => {
        if (!hasClicked) {
            welcomeSection.classList.add('fade-out');
            mainSection.classList.remove('hidden');
            mainSection.classList.add('visible');
            hasClicked = true;
        }
    });

    // Check if the page was reloaded (not a fresh visit) and redirect to home if true
    if (performance.getEntriesByType("navigation")[0].type === "reload") {
        window.location.href = "/Presentation";
    }

    document.documentElement.style.scrollBehavior = 'smooth';
});