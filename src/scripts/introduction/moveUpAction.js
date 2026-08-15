// Define animations for each section
const animations = {
    'presentation': {
        enter: {
            opacity: '0',
            transform: 'translateX(-70px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
        },
        final: {
            opacity: '1',
            transform: 'translateX(0)'
        }
    },
    'soft-skills': {
        enter: {
            opacity: '0',
            transform: 'translateY(-20px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
        },
        final: {
            opacity: '1',
            transform: 'translateY(0)'
        }
    },
    'hard-skills': {
        enter: {
            opacity: '0',
            transform: 'translateX(20px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
        },
        final: {
            opacity: '1',
            transform: 'translateX(0)'
        }
    },
    'education': {
        enter: {
            opacity: '0',
            transform: 'translateY(-20px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
        },
        final: {
            opacity: '1',
            transform: 'translateY(0)'
        }
    },
    'certification': {
        enter: {
            opacity: '0',
            transform: 'translateX(70px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
        },
        final: {
            opacity: '1',
            transform: 'translateX(0)'
        }
    },
    'programming': {
        enter: {
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
        },
        final: {
            opacity: '1',
            transform: 'translateY(0)'
        }
    },
    'personal-project': {
        enter: {
            opacity: '0',
            transform: 'translateX(70px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
        },
        final: {
            opacity: '1',
            transform: 'translateX(0)'
        }
    },
    'work-experience': {
        enter: {
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
        },
        final: {
            opacity: '1',
            transform: 'translateY(0)'
        }
    },
    'resume': {
        enter: {
            opacity: '0',
            transform: 'translateX(-70px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
        },
        final: {
            opacity: '1',
            transform: 'translateX(0)'
        }
    },
    'mail': {
        enter: {
            opacity: '0',
            transform: 'translateY(70px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
        },
        final: {
            opacity: '1',
            transform: 'translateY(0)'
        }
    },
    'linkedin': {
        enter: {
            opacity: '0',
            transform: 'translateX(-70px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
        },
        final: {
            opacity: '1',
            transform: 'translateX(0)'
        }
    },
    'github': {
        enter: {
            opacity: '0',
            transform: 'translateY(-70px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
        },
        final: {
            opacity: '1',
            transform: 'translateY(0)'
        }
    },
    'introduction': {
        enter: {
            opacity: '0',
            transform: 'scale(1.5)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
        },
        final: {
            opacity: '1',
            transform: 'scale(1)'
        }
    }
};

function animateMainGrid() {
    const mainGrid = document.querySelector('.main-grid');
    if (!mainGrid) {
        return;
    }

    mainGrid.style.display = 'grid';
    mainGrid.style.opacity = '0';

    const gridItems = [
        mainGrid.querySelector('.introduction'),
        mainGrid.querySelector('.github'),
        mainGrid.querySelector('.personal-project'),
        mainGrid.querySelector('.education'),
        mainGrid.querySelector('.presentation'),
        mainGrid.querySelector('.work-experience'),
        mainGrid.querySelector('.mail'),
        mainGrid.querySelector('.hard-skills'),
        mainGrid.querySelector('.certification'),
        mainGrid.querySelector('.linkedin'),
        mainGrid.querySelector('.soft-skills'),
        mainGrid.querySelector('.resume'),
        mainGrid.querySelector('.programming')
    ].filter(item => item !== null);

    gridItems.forEach((item, index) => {
        const sectionClass = Array.from(item.classList).find(cls => animations[cls]);

        if (sectionClass && animations[sectionClass]) {
            Object.assign(item.style, animations[sectionClass].enter);

            setTimeout(() => {
                Object.assign(item.style, animations[sectionClass].final);
            }, 100 * index);
        }
    });

    setTimeout(() => {
        mainGrid.style.transition = 'opacity 0.5s ease-out';
        mainGrid.style.opacity = '1';
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    const isReturnFlow = new URLSearchParams(window.location.search).has('from');
    if (!isReturnFlow) {
        animateMainGrid();
    }
});
