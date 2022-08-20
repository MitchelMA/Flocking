const navhandle = document.getElementById("handle");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const backgroundcolor = "#222";
const boidcolor = "whitesmoke";

const DEG_TO_RAD = 0.017453292519943295;
const RAD_TO_DEG = 57.29577951308232;

// USER DEFINES

let showfps = false;
// The speed at which every boid wants to fly
let targetspeed = 0.1;
// Factor on how fast every boid changes speed
let resolve = 0.01;
// The area in which the boid can see other boids
let range = 35;
// Factor for the force of keeping distance to other boids
let seperation = 0.01;
// Factor for the force of wanting to keep together
let cohesion = 0.001;
// Factor for the force of wanting to align with surounding boids
let alignment = 0.01;

// END USER DEFINES

let mouseVector = Vector.zero();

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
  generateBoids(20);

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
    boid.calculate();
    boid.move();
    boid.draw();
  }

  // end game code

  // show fps
  ctx.font = "20px Arial";
  if (showfps) {
    ctx.fillText(fps.toFixed(0), 5, 25);
  }
  // show boid count
  ctx.fillText(boids.length, 65, 25);

  curT = time;
  window.requestAnimationFrame(draw);
}

function generateBoids(boidAmount) {
  boids = [];
  for (let i = 0; i < boidAmount; i++) {
    let tmp = new Boid(
      15,
      boidcolor,
      new Vector(
        Math.floor(Math.random() * (canvas.width + 1)),
        Math.floor(Math.random() * (canvas.height + 1))
      ),
      Math.random() * (2 * Math.PI),
      0.1 + Math.random() * 0.2
    );
    boids.push(tmp);
  }
}

function addBoid(amount) {
  for (let i = 0; i < amount; i++) {
    let tmp = new Boid(
      15,
      boidcolor,
      new Vector(
        Math.floor(Math.random() * (canvas.width + 1)),
        Math.floor(Math.random() * (canvas.height + 1))
      ),
      Math.random() * (2 * Math.PI),
      0.1 + Math.random() * 0.2
    );
    boids.push(tmp);
  }
}

function removeBoid(amount) {
  for (let i = 0; i < amount; i++) boids.splice(0, 1);
}

// call setup
setup();

navhandle.addEventListener("click", (e) => {
  navhandle.parentElement.classList.toggle("open");
});

// code for sliders
// fpscheckbox
const fpscheckbox = document.getElementById("showfpsinput");
// targetspeed
const targetspeedslider = document.getElementById("targetspeedinput");
const targetspeedvalue = document.getElementById("targetspeedvalue");
// resolve
const resolveslider = document.getElementById("resolveinput");
const resolvevalue = document.getElementById("resolvevalue");
// range
const rangeslider = document.getElementById("rangeinput");
const rangevalue = document.getElementById("rangevalue");
// seperation
const seperationslider = document.getElementById("seperationinput");
const seperationvalue = document.getElementById("seperationvalue");
// cohesion
const cohesionslider = document.getElementById("cohesioninput");
const cohesionvalue = document.getElementById("cohesionvalue");
// alignment
const alignmentslider = document.getElementById("alignmentinput");
const alignmentvalue = document.getElementById("alignmentvalue");

fpscheckbox.onclick = function () {
  showfps = this.checked;
};

targetspeedslider.onchange = function () {
  targetspeedvalue.textContent = this.value;
  targetspeed = Number(this.value);
};

resolveslider.onchange = function () {
  resolvevalue.textContent = this.value;
  resolve = Number(this.value);
};

rangeslider.onchange = function () {
  rangevalue.textContent = this.value;
  range = Number(this.value);
};

seperationslider.onchange = function () {
  seperationvalue.textContent = this.value;
  seperation = Number(this.value);
};

cohesionslider.onchange = function () {
  cohesionvalue.textContent = this.value;
  cohesion = Number(this.value);
};

alignmentslider.onchange = function () {
  alignmentvalue.textContent = this.value;
  alignment = Number(this.value);
};

// set the mouse position
document.addEventListener("mousemove", (e) => {
  mouseVector.x = e.clientX;
  mouseVector.y = e.clientY;
});
