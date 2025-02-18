const { createCanvas } = require('canvas');

// Create canvas
const canvas = createCanvas(1920, 1080);
const ctx = canvas.getContext('2d');

// Create gradient background
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, '#006847'); // Palestinian flag green
gradient.addColorStop(0.3, '#000000'); // Black
gradient.addColorStop(0.7, '#FFFFFF'); // White
gradient.addColorStop(1, '#e31d1a'); // Palestinian flag red

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Add overlay pattern
ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
for (let i = 0; i < canvas.width; i += 20) {
    for (let j = 0; j < canvas.height; j += 20) {
        if ((i + j) % 40 === 0) {
            ctx.fillRect(i, j, 10, 10);
        }
    }
}

// Save the canvas as an image
const fs = require('fs');
const out = fs.createWriteStream(__dirname + '/hero-bg.jpg');
const stream = canvas.createJPEGStream();
stream.pipe(out);
out.on('finish', () => console.log('Hero background image was created successfully'));
