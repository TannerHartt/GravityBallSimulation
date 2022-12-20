import utils, {randomColor, randomIntFromRange} from './utils'

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

// Color palette
const colors = [
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66'
];

let gravity = 1;
let friction = 0.98;
let radius = 30;

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});
addEventListener('click', init);

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    if (ball.y + ball.radius + this.dy > canvas.height || ball.y - 10 < 0) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    if (ball.x + ball.radius + this.dx > canvas.width || this.x - ball.radius <= 0) {
      this.dx = -this.dx;
    } else {

    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

// Implementation
let balls = [];
let ball;
function init() {
  balls = [];

  for (let i = 0; i < 400; i++) {
    let radius = randomIntFromRange(10,30);
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);
    let dx = randomIntFromRange(-2,2);
    let dy = randomIntFromRange(-2,2);
    let color = randomColor(colors);
    balls.push(new Ball(x, y, dx,dy, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  for (let i = 0; i < balls.length - 1; i++) {
    ball = balls[i];
    ball.update();
  }
}

init();
animate();
