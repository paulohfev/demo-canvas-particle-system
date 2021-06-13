const canvas = document.getElementById('canvas');

// getContext will only work if called on a var that refers to the canvas element
// when called correctly, getContext returns a reference to the built-in canvas 2d drawing API object
const context = canvas.getContext('2d');
  // canvas covers browser window horizontally and vertically
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particlesArray = [];

// listens to resize to recalculate the width and height of the canvas on different screen sizes to prevent
// canvas distortion
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// x and y coordinates; object for global use
const mouse = {
  x: undefined,
  y: undefined,
}
canvas.addEventListener('click', event => {
  mouse.x = event.x;
  mouse.y = event.y;
});

canvas.addEventListener('mousemove', event => {
  mouse.x = event.x;
  mouse.y = event.y;
})

class Particle {
  constructor() {
    // this.x = mouse.x;
    // this.y = mouse.y;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    context.fillStyle = 'blue';
    // needs to be called for single shapes that are comprised of multiple lines - shapes that aren't connected to previous lines
    context.beginPath();
    // circular path
    context.arc(this.x, this.y, 50, 0, Math.PI * 2);
    context.fill();
  }
}

const initializeParticles = () => {
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}
initializeParticles();

const handleParticles = () => {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
}

const animate = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}
animate();
