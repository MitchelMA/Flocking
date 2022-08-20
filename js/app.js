const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const backgroundcolor = "#222";

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
