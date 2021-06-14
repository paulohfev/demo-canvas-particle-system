const canvas = document.getElementById('canvas');

// getContext will only work if called on a var that refers to the canvas element
// when called correctly, getContext returns a reference to the built-in canvas 2d drawing API object
const context = canvas.getContext('2d');
  // canvas covers browser window horizontally and vertically
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particlesArray = [];
  let hue = 0;

// listens to resize to recalculate the width and height of the canvas on different screen sizes to prevent canvas distortion
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
  for (let i = 0; i < 10; i++) {
    particlesArray.push(new Particle());
  }
});

canvas.addEventListener('mousemove', event => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle());
  }
})

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
        // will cycle through the entire color spectrum to produce a raindow effect
    this.color = `hsl(${hue}, 100%, 50%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    // decreases size of particles to the end of the animation cycle
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    context.fillStyle = this.color;
    // needs to be called for single shapes that are comprised of multiple lines - shapes that aren't connected to previous lines
    context.beginPath();
    // circular path
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
  }
}

const handleParticles = () => {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    for (let j = i; j < particlesArray.length; j++ ) {
      // Pythagorean theorem algorithm basis
      const distanceParticleXAxis = particlesArray[i].x - particlesArray[j].x;
      const distanceParticleYAxis = particlesArray[i].y - particlesArray[j].y;
      // hypotenuse of the triangle representing the distance between two particles
      const distanceBetweenParticles = Math.sqrt(
        distanceParticleXAxis * distanceParticleXAxis + distanceParticleYAxis * distanceParticleYAxis
      );

      if (distanceBetweenParticles < 100) {
        // draws the line connecting each particle to generate the constellation style
        context.beginPath();
        context.strokeStyle = particlesArray[i].color;
        context.lineWidth = 0.2;
        context.moveTo(particlesArray[i].x, particlesArray[i].y);
        context.lineTo(particlesArray[j].x, particlesArray[j].y);
        context.stroke();
        context.closePath();
      }
    }

    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

const animate = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue+=2;
  requestAnimationFrame(animate);
}
animate();
