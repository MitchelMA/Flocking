const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const backgroundcolor = "#222";

const DEG_TO_RAD = 0.017453292519943295;
const RAD_TO_DEG = 57.29577951308232;

let testBoid = new Boid(
  20,
  "whitesmoke",
  new Vector(canvas.width / 2, canvas.height / 2)
);

let oldT = 0,
  curT = 0,
  deltaT = 0,
  fps = 0;

function setup() {
  ctx.fillStyle = backgroundcolor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(draw);
}

function draw(time) {
  // calculation of deltaT
  if (oldT != 0) {
    deltaT = curT - oldT;
    fps = 1000 / deltaT;
  }
  oldT = curT;
  ctx.fillStyle = backgroundcolor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Start game code

  testBoid.draw();

  // end game code

  curT = time;
  window.requestAnimationFrame(draw);
}

// call setup
setup();
