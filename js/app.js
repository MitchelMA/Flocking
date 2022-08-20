const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const backgroundcolor = "#222";
const boidcolor = "whitesmoke";

const DEG_TO_RAD = 0.017453292519943295;
const RAD_TO_DEG = 57.29577951308232;

// USER DEFINES
let showfps = false;
let targetspeed = 0.8;
let resolve = 0.2;

let testBoid = new Boid(
  20,
  "whitesmoke",
  new Vector(canvas.width / 2, canvas.height / 2),
  Math.random() * (2 * Math.PI),
  Math.random() * 0.5
);

// global array of boids
let boids = [];

let oldT = 0,
  curT = 0,
  deltaT = 0,
  fps = 0;

function setup() {
  // set canvas-size
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  // set background
  ctx.fillStyle = backgroundcolor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // generate boids
  generateBoids(10);

  // request the draw
  window.requestAnimationFrame(draw);
}

function draw(time) {
  // calculation of deltaT
  if (oldT != 0) {
    deltaT = curT - oldT;
    fps = 1000 / deltaT;
  }
  oldT = curT;

  // set canvas-size
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  // set backgound
  ctx.fillStyle = backgroundcolor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Start game code

  for (let boid of boids) {
    boid.move();
    boid.draw();
  }

  // end game code

  // show fps
  if (showfps) {
    ctx.font = "20px Arial";
    ctx.fillText(fps.toFixed(0), 5, 25);
  }

  curT = time;
  window.requestAnimationFrame(draw);
}

function generateBoids(boidAmount) {
  for (let i = 0; i < boidAmount; i++) {
    let tmp = new Boid(
      10,
      boidcolor,
      new Vector(
        Math.floor(Math.random() * (canvas.width + 1)),
        Math.floor(Math.random() * (canvas.height + 1))
      ),
      Math.random() * (2 * Math.PI),
      0.1 + Math.random() * 0.5
    );
    boids.push(tmp);
  }
}

// call setup
setup();
