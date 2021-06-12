const canvas = document.getElementById('canvas');

// getContext will only work if called on a var that refers to the canvas element
// when called correctly, getContext returns a reference to the built-in canvas 2d drawing API object
const context = canvas.getContext('2d');
  // canvas covers browser window horizontally and vertically
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

// listens to resize to recalculate the width and height of the canvas on different screen sizes to prevent
// canvas distortion
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context.fillStyle = 'white';
  context.fillRect(10, 20, 150, 50);
});

context.fillStyle = 'white';
// draws shape
context.fillRect(10, 20, 150, 50);
