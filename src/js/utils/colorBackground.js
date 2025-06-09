function getColorAtPoint(imageElement, xPercent = 0, yPercent = 100) {
    return new Promise((resolve) => {
        // Check if image is already loaded
        if (!imageElement.complete || imageElement.naturalWidth === 0) {
            console.warn("Image not yet loaded or invalid.");
            resolve('rgb(0, 0, 0)');
            return;
        }

        // Create canvas to draw the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = imageElement.naturalWidth;
        canvas.height = imageElement.naturalHeight;

        try {
            // Draw directly from DOM image (if loaded locally and not "tainted")
            ctx.drawImage(imageElement, 0, 0);

            // Calculate real coordinates
            const x = Math.floor((xPercent / 100) * canvas.width);
            const y = Math.floor((yPercent / 100) * canvas.height);

            const pixel = ctx.getImageData(x, y, 1, 1).data;

            // If pixel is transparent, return default color
            if (pixel[3] === 0) {
                console.warn("Transparent pixel detected");
                resolve('rgb(0, 0, 0)');
                return;
            }

            const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
            resolve(color);

        } catch (error) {
            console.error('Error reading pixel (CORS or canvas tainted)', error);
            resolve('rgb(0, 0, 0)');
        }
    });
}


// Function to update box background color based on image
export async function updateBoxBackground(boxElement) {
    const imageElement = boxElement.querySelector('.box-image');
    if (!imageElement) {
        // console.log('No image element found');
        return;
    }

    // console.log('Image source:', imageElement.src);
    try {
        const color = await getColorAtPoint(imageElement, 90, 0);
        // console.log('Final color applied:', color);
        boxElement.style.backgroundColor = color;
    } catch (error) {
        console.error('Error updating background:', error);
    }
}
