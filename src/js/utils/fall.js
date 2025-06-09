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

// Add container "walls" to keep icons inside
const containerWidth = render.options.width;
const containerHeight = render.options.height;

const walls = [
    Bodies.rectangle(containerWidth / 2, 0, containerWidth, 10, { isStatic: true }), // top
    Bodies.rectangle(containerWidth / 2, containerHeight, containerWidth, 10, { isStatic: true }), // bottom
    Bodies.rectangle(0, containerHeight / 2, 10, containerHeight, { isStatic: true }), // left
    Bodies.rectangle(containerWidth, containerHeight / 2, 10, containerHeight, { isStatic: true }) // right
];

Composite.add(engine.world, walls);

// Function to add a "ball" when clicked
document.querySelector('.programming').addEventListener('click', (event) => {
    event.stopPropagation(); // Stop the click event from propagating to parent elements
    
    const icons = ['💻', '⚙️', '🐍', '☕', '🌐', '📱', '📦', '🖥️'];
    icons.forEach((icon) => {
        const radius = 30; // ball size (larger than 20)
        const x = Math.random() * (containerWidth - 2 * radius) + radius;
    
        const ball = Bodies.circle(x, 0, radius, {
            restitution: 0.8,
            friction: 0.1,
            render: {
                fillStyle: '#fff',
                sprite: {
                    texture: createTextIcon(icon),
                    xScale: 1.5, // slightly enlarge the icon
                    yScale: 1.5
                }
            }
        });
    
        Composite.add(engine.world, ball);
    });
    
});

// Create a texture to display text (emoji)
function createTextIcon(emoji) {
    const size = 50;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.font = `${size - 5}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, size / 2, size / 2);
    return canvas.toDataURL();
}
