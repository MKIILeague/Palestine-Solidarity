document.addEventListener('DOMContentLoaded', function() {
    // Get all news grid images
    const newsImages = Array.from(document.querySelectorAll('.news-item .news-image img')).map(img => img.src);
    const heroImage = document.querySelector('.news-hero img');
    let currentIndex = 0;

    function changeHeroImage() {
        // Fade out current image
        heroImage.style.opacity = '0';
        
        setTimeout(() => {
            // Change image source
            heroImage.src = newsImages[currentIndex];
            // Fade in new image
            heroImage.style.opacity = '1';
            
            // Update index for next image
            currentIndex = (currentIndex + 1) % newsImages.length;
        }, 300); // This matches the CSS transition time
    }

    // Set initial image
    if (heroImage && newsImages.length > 0) {
        heroImage.style.transition = 'opacity 0.3s ease';
        heroImage.style.opacity = '1';
    }

    // Change image every 3 seconds
    setInterval(changeHeroImage, 3000);
});
