// Get the computed style of the container element to access its color variable
var avatar_color = "#64f5dd";
var rgb = hexToRgb(avatar_color);
console.log(rgb);
var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
var hueAngle = hsl[0];

const avatars = document.getElementsByClassName('avatar-char');
avatars.forEach(element => {
    element.style.filter = `hue-rotate(${hueAngle}deg)`; // Apply hue rotation using the extracted angle
    
});


// Function to convert hex color to RGB
function hexToRgb(hex) {
    // Remove # symbol if present
    hex = hex.replace('#', '');
    return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
    };
}
// Function to convert RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}