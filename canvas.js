const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Input
let mouse = {
  x: undefined,
  y: undefined
}

//Event Listeners
window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", () => {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
});

//Animation Options
const minVel = 0.05;
const maxVel = 0.07;
const minRadius = 15;
const maxRadius = 50;
const circleAmount = 200;
const circleColors = ["#164B60", "#1B6B93", "#4FC0D0", "#A2FF86"]
const inflateDistance = 100;

//Circles class
class BouncyCircle {
  constructor(x, y, yVel, xVel, radius, color) {
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    // Behaviour
    this.x += this.xVel;
    this.y += this.yVel;
    if (this.x >= canvas.width - this.radius || this.x <= this.radius) {
      this.xVel = -this.xVel;
    }
    if (this.y >= canvas.height - this.radius || this.y <= this.radius) {
      this.yVel = -this.yVel;
    }

    // Interactiveness
    if (mouse.x - this.x < inflateDistance 
      && mouse.x - this.x > -inflateDistance
      && mouse.y - this.y < inflateDistance
      && mouse.y - this.y > -inflateDistance
      && this.radius < maxRadius) {
      this.radius += 1;
    }
    else if (this.radius > minRadius){
      this.radius -= 1;
    }
  }
}

//Circle creation
const circles = [];
function createCircles() {
  for (let i = 0; i < circleAmount; i++){
    const x = (Math.random() * (canvas.width - minRadius * 2) + minRadius);
    const y = (Math.random() * (canvas.height - minRadius * 2) + minRadius);
    //Random numbers that can be positive or negative
    let xVel = 0;
    let yVel = 0;
    if (Math.random() > 0.5) {
      xVel = (Math.random() * maxVel) + minVel;
      yVel = (Math.random() * maxVel) + minVel;
    }
    else {
      xVel = -((Math.random() * maxVel) + minVel);
      yVel = -((Math.random() * maxVel) + minVel);
    }
    const color = circleColors[(Math.floor(Math.random() * circleColors.length))];
    const newCircle = new BouncyCircle(x, y, xVel, yVel, minRadius, color);
    circles.push(newCircle);
  }
}
createCircles();

//Animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < circles.length; i++) {
    circles[i].draw();
    circles[i].update();
  }
}
animate();


