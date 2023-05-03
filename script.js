const canvas = document.getElementById('hexagonCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hexagonSize = 30;
const hexagonGap = 8;

let mouseX = -1;
let mouseY = -1;

class Hexagon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = '#FFFFFF';
    this.targetColor = '#FFFFFF';
    this.borderColor = '#FFFFFF';
  }

  resetColor() {
    this.targetColor = '#FFFFFF';
  }

  updateColor() {
    const currentColor = this.color;
    const targetColor = this.targetColor;

    if (currentColor !== targetColor) {
      const currentR = parseInt(currentColor.slice(1, 3), 16);
      const currentG = parseInt(currentColor.slice(3, 5), 16);
      const currentB = parseInt(currentColor.slice(5, 7), 16);

      const targetR = parseInt(targetColor.slice(1, 3), 16);
      const targetG = parseInt(targetColor.slice(3, 5), 16);
      const targetB = parseInt(targetColor.slice(5, 7), 16);

      const newR = Math.round(currentR + (targetR - currentR) * 0.1);
      const newG = Math.round(currentG + (targetG - currentG) * 0.1);
      const newB = Math.round(currentB + (targetB - currentB) * 0.1);

      this.color = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    }
  }

  isMouseOver(mouseX, mouseY) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < hexagonSize;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x + hexagonSize * Math.cos(0), this.y + hexagonSize * Math.sin(0));

    for (let side = 0; side < 7; side++) {
      ctx.lineTo(this.x + hexagonSize * Math.cos(side * 2 * Math.PI / 6), this.y + hexagonSize * Math.sin(side * 2 * Math.PI / 6));
    }

    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = this.borderColor;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function getRandomSoftColor() {
    function hslToRgb(h, s, l) {
      let r, g, b;
  
      if (s === 0) {
        r = g = b = l; // Achromatic
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
  
    const hue = Math.random(); // Hue değeri 0 ile 1 arasında
    const saturation = Math.random() * 0.25 + 0.25; // Doygunluk değeri %25 ile %50 arasında
    const lightness = Math.random() * 0.15 + 0.7; // Parlaklık değeri %70 ile %85 arasında
  
    const [r, g, b] = hslToRgb(hue, saturation, lightness);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  

const hexagons = [];
function createHexagons()
{
    for (let y = -hexagonSize; y < canvas.height + hexagonSize * 2; y += (hexagonSize * 1.5)) {
        for (let x = -hexagonSize; x < canvas.width + hexagonSize * 2; x += ((hexagonSize + hexagonGap) * 2)) {
          hexagons.push(new Hexagon(x, y));
          hexagons.push(new Hexagon(x + hexagonSize + hexagonGap, y + hexagonSize * 0.75));
        }
      }
}
createHexagons();

function animate() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    hexagons.forEach(hexagon => {
      hexagon.updateColor();
      hexagon.draw();
    });
  
    setTimeout(() => {
        requestAnimationFrame(animate);
      }, 16.7); // 60 FPS için 1000/60 = 16.7ms
  }
  
  animate();
  window.addEventListener('resize', () => {
    const hexagons = [];
    createHexagons();
    animate();
  });
  canvas.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  
    hexagons.forEach(hexagon => {
      if (hexagon.isMouseOver(mouseX, mouseY)) {
        hexagon.targetColor = getRandomSoftColor();
      } else {
        hexagon.resetColor();
      }
    });
  });
  
  canvas.addEventListener('mouseleave', () => {
    mouseX = -1;
    mouseY = -1;
  
    hexagons.forEach(hexagon => {
      hexagon.resetColor();
    });
  });
  
