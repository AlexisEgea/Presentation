import { displayContentWithTypingAnimation } from './typeAnimation.js';

export function addMoveUpAction(section) {
    const elements = ['title', 'subtitle'].map(type => 
        document.querySelector('.' + section + '-' + type)
    );
    const sectionElement = document.querySelector('.' + section);
    sectionElement.scrollTop = 0;

    const moveUpListener = (event) => {
        event.stopPropagation();
        
        elements.forEach(element => {
            if (element) {
                element.classList.add('move-up');
            }
        });
        
        elements.forEach(element => {
            if (element) {
                element.removeEventListener('click', moveUpListener);
            }
        });

        const clickElement = document.querySelector('.' + section + '-click');
        elements.forEach(element => {
            if (element) {
                element.addEventListener('animationend', () => {
                    clickElement.innerText = "Click to skip typing animation";
                    let content = sectionElement.querySelector(".init-content");
                    displayContentWithTypingAnimation('init');
                }, { once: true }); // Remove listener after first trigger
            }
        });
    };
    // Add click listener
    if (sectionElement) {
        sectionElement.addEventListener('click', moveUpListener);
    }
}

addMoveUpAction('init');

// Define animations for each section
const animations = {
    'init': {
        exit: {
            animation: 'fadeOut 1s ease-in-out forwards'
        }
    },
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
    },
};

const section = document.querySelector('.init');
section.addEventListener('click', () => {
    if(section.classList.contains('ready')) {
        // Apply exit animation to init section
        Object.assign(section.style, animations.init.exit);

        const onAnimationEnd = (event) => {
            console.log('Animation ended for animationName:', event.animationName);
            console.log('Dezoom animation completed');
            section.style.display = 'none';
        
            const mainGrid = document.querySelector('.main-grid');
            mainGrid.style.display = 'grid';
            mainGrid.style.opacity = '0';
        
            // Get all grid items and apply their specific animations
            // This is wanted to have a hard-coded implementation
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
                const sectionClass = Array.from(item.classList)
                    .find(cls => animations[cls]);
        
                if (sectionClass && animations[sectionClass]) {
                    // Apply enter animation
                    Object.assign(item.style, animations[sectionClass].enter);
        
                    setTimeout(() => {
                        // Apply final state
                        Object.assign(item.style, animations[sectionClass].final);
                    }, 100 * index);
                }
            });
        
            setTimeout(() => {
                mainGrid.style.transition = 'opacity 0.5s ease-out';
                mainGrid.style.opacity = '1';
            }, 100);
        
            section.removeEventListener('animationend', onAnimationEnd);
        };
        
        section.addEventListener('animationend', onAnimationEnd);
    }
});