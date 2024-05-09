let container = document.querySelector(".container");
let gridSizeText = document.querySelector("h3");
let slider = document.querySelector("input");
let submit = document.querySelector("button");

slider.addEventListener("input", (e) => {
    gridSizeText.innerText = `${slider.value}x${slider.value}`;
});

submit.addEventListener("pointerdown", () => {
    container.innerHTML = '';
    createGrid(slider.value);
});

function createGrid(userInput=16) {
    for (let i = 0; i < userInput; i++)
        for (let j = 0; j < userInput; j++)
        {
            let newDiv = document.createElement("div");
            newDiv.style.width = `${(1 / userInput) * 100}%`;
            newDiv.style.height = `${(1 / userInput) * 100}%`;
            newDiv.style.backgroundColor = 'hsl(0 0% 100%)';
            console.log(newDiv.style.backgroundColor);

            newDiv.addEventListener("mouseover", () => {
                if (newDiv.style.backgroundColor == 'rgb(255, 255, 255)')
                {
                    newDiv.style.backgroundColor = generateHSL();
                }
                else {
                    // Get the current background color
                    let currentColor = newDiv.style.backgroundColor;

                    // Parse the RGB values from the color string
                    let rgbValues = currentColor.match(/\d+/g);
                    let r = parseInt(rgbValues[0], 10);
                    let g = parseInt(rgbValues[1], 10);
                    let b = parseInt(rgbValues[2], 10);

                    // Convert RGB to HSL
                    let hslValues = rgbToHsl(r, g, b);
                    let h = hslValues[0];
                    let s = hslValues[1];
                    let l = hslValues[2];

                    // Decrease the lightness by 10%
                    l = Math.max(0, l - 10);

                    // Convert HSL back to RGB
                    let newRgbValues = hslToRgb(h, s, l);
                    let newColor = `rgb(${newRgbValues[0]}, ${newRgbValues[1]}, ${newRgbValues[2]})`;

                    // Update the color with the new lightness value
                    newDiv.style.backgroundColor = newColor;
                }
                
                
            });

            container.appendChild(newDiv); 
        }

}

function generateRGB() {
    val1 = Math.floor(Math.random() * 255)
    val2 = Math.floor(Math.random() * 255)
    val3 = Math.floor(Math.random() * 255)

    return `rgb(${val1} ${val2} ${val3})`
}

function generateHSL() {
    val1 = Math.floor(Math.random() * 359)
    val2 = Math.floor(Math.random() * 100)

    return `hsl(${val1} ${val2}% 90%)`
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h * 360, s * 100, l * 100];
}

function hslToRgb(h, s, l) {
    let r, g, b;
    h /= 360;
    s /= 100;
    l /= 100;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

createGrid();
