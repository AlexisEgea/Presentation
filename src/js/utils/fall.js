const { Engine, Render, Runner, Bodies, Composite, Body } = Matter;

const engine = Engine.create();

const matterContainer = document.querySelector('.matter-container');
const matterCanvas = document.querySelector('.matter-canvas');

const render = Render.create({
    element: matterContainer,
    canvas: matterCanvas,
    engine: engine,
    options: {
        width: matterContainer.offsetWidth,
        height: matterContainer.offsetHeight,
        wireframes: false,
        background: 'transparent'
    }
});

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

const containerWidth = render.options.width;
const containerHeight = render.options.height;

const walls = [
    Bodies.rectangle(containerWidth / 2, 0, containerWidth, 10, { isStatic: true }), // top
    Bodies.rectangle(containerWidth / 2, containerHeight, containerWidth, 10, { isStatic: true }), // bottom
    Bodies.rectangle(0, containerHeight / 2, 10, containerHeight, { isStatic: true }), // left
    Bodies.rectangle(containerWidth, containerHeight / 2, 10, containerHeight, { isStatic: true }) // right
];

Composite.add(engine.world, walls);

// List of programming language and library icons to display
const iconImages = [
    'https://alexisegea.github.io/Presentation/data/programming/bash.png',
    'https://alexisegea.github.io/Presentation/data/programming/cplusplus.png',
    'https://alexisegea.github.io/Presentation/data/programming/css.png',
    'https://alexisegea.github.io/Presentation/data/programming/html.png',
    'https://alexisegea.github.io/Presentation/data/programming/java.png',
    'https://alexisegea.github.io/Presentation/data/programming/javascript.png',
    'https://alexisegea.github.io/Presentation/data/programming/matplotlib.png',
    'https://alexisegea.github.io/Presentation/data/programming/numpy.png',
    'https://alexisegea.github.io/Presentation/data/programming/pandas.png',
    'https://alexisegea.github.io/Presentation/data/programming/prolog.png',
    'https://alexisegea.github.io/Presentation/data/programming/python.png',
    'https://alexisegea.github.io/Presentation/data/programming/pytorch.png',
    'https://alexisegea.github.io/Presentation/data/programming/r.png',
    'https://alexisegea.github.io/Presentation/data/programming/robotframework.png',
    'https://alexisegea.github.io/Presentation/data/programming/sklearn.png',
    'https://alexisegea.github.io/Presentation/data/programming/springboot.png',
    'https://alexisegea.github.io/Presentation/data/programming/sqlalchemy.png',
    'https://alexisegea.github.io/Presentation/data/programming/tensorflow.png',
    'https://alexisegea.github.io/Presentation/data/programming/threejs.png',
    'https://alexisegea.github.io/Presentation/data/programming/typescript.png',
];

let balls = [];

function clearBalls() {
    balls.forEach(ball => {
        Composite.remove(engine.world, ball);
    });
    balls = [];
}

// Utility function: Convert image to base64 for use as texture
function loadImageToBase64(imgSrc, callback) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = function () {
        // Standard target size for all icons
        const targetSize = 100;

        const canvas = document.createElement('canvas');
        canvas.width = targetSize;
        canvas.height = targetSize;

        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, targetSize, targetSize);

        // Calculate dimensions to center image in square
        const aspectRatio = img.width / img.height;
        let drawWidth, drawHeight;

        if (aspectRatio > 1) {
            // Landscape image
            drawWidth = targetSize;
            drawHeight = targetSize / aspectRatio;
        } else {
            // Portrait or square image
            drawHeight = targetSize;
            drawWidth = targetSize * aspectRatio;
        }

        const offsetX = (targetSize - drawWidth) / 2;
        const offsetY = (targetSize - drawHeight) / 2;

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        const dataURL = canvas.toDataURL();
        callback(dataURL);
    };

    img.src = imgSrc;
}

// Handle clicks on the programming section
document.querySelector('.matter-container').addEventListener('click', (event) => {
    event.stopPropagation();

    clearBalls();
    iconImages.forEach((imgSrc) => {
        loadImageToBase64(imgSrc, (texture) => {
            if (texture) {
                const radius = 30;
                const x = Math.random() * (containerWidth - 2 * radius) + radius;

                const ball = Bodies.circle(x, 0, radius, {
                    restitution: 0.8,
                    friction: 0.1,
                    frictionAir: 0.02, // Add slight air resistance for natural falling effect
                    render: {
                        sprite: {
                            texture: texture,
                            xScale: 0.5,
                            yScale: 0.5
                        }
                    }
                });

                // Add slight random initial rotation
                Body.setAngularVelocity(ball, Math.random() * 0.1 - 0.05);

                Composite.add(engine.world, ball);
                balls.push(ball);
            }
        });
    });
});