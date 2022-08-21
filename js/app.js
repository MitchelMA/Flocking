const navhandle = document.getElementById("handle");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const backgroundcolor = "#222";
const boidcolor = "whitesmoke";

const DEG_TO_RAD = 0.017453292519943295;
const RAD_TO_DEG = 57.29577951308232;

// USER DEFINES

let showfps = false;
let seperatefrommouse = false;
// The speed at which every boid wants to fly
let targetspeed = 0.07;
// Factor on how fast every boid changes speed
let resolve = 0.007;
// The area in which the boid can see other boids
let range = 46;
// Factor for the force of keeping distance to other boids
let seperation = 0.0022;
// Factor for the force of wanting to keep together
let cohesion = 0.00035;
// Factor for the force of wanting to align with surounding boids
let alignment = 0.035;

// END USER DEFINES

let mouseVector = Vector.zero();
let avdir = Vector.zero();

let dirdailpos = new Vector(canvas.width - 100, canvas.height - 100);

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

let testang = 10;
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

  // reset the average direction vector and set the correct location of the direction dail position
  avdir.x = 0;
  avdir.y = 0;
  dirdailpos.x = canvas.width - 100;
  dirdailpos.y = canvas.height - 100;

  // Start game code

  for (let boid of boids) {
    boid.calculate();
    boid.move();
    boid.draw();
    avdir.add(boid.velocity.copy());
  }
  avdir.div(boids.length);
  avdir.setMag(75);

  // end game code

  // draw the average direction of all boids
  ctx.beginPath();
  ctx.strokeStyle = "limegreen";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 4;
  ctx.translate(dirdailpos.x, dirdailpos.y);
  ctx.moveTo(0, 0);
  ctx.lineTo(avdir.x, avdir.y);

  let sidevec = avdir.copy().rotatedBy(140 * DEG_TO_RAD);
  sidevec.setMag(20);
  sidevec.add(avdir);
  ctx.lineTo(sidevec.x, sidevec.y);

  ctx.moveTo(avdir.x, avdir.y);
  sidevec = avdir.copy().rotatedBy(-140 * DEG_TO_RAD);
  sidevec.setMag(20);
  sidevec.add(avdir);

  ctx.lineTo(sidevec.x, sidevec.y);

  ctx.stroke();
  ctx.resetTransform();
  ctx.closePath();

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

// mouse seperation
document.addEventListener("mousedown", (e) => {
  seperatefrommouse = true;
});
document.addEventListener("mouseup", (e) => {
  seperatefrommouse = false;
});

navhandle.addEventListener("click", (e) => {
  navhandle.parentElement.classList.toggle("open");
});

// code for sliders
// fpscheckbox
const fpscheckbox = document.getElementById("showfpsinput");
// targetspeed
const targetspeedslider = document.getElementById("targetspeedinput");
const targetspeedvalue = document.getElementById("targetspeedvalue");
// set their starting values:
targetspeedslider.value = targetspeed;
targetspeedvalue.textContent = targetspeed;

// resolve
const resolveslider = document.getElementById("resolveinput");
const resolvevalue = document.getElementById("resolvevalue");
// set their starting values:
resolveslider.value = resolve;
resolvevalue.textContent = resolve;

// range
const rangeslider = document.getElementById("rangeinput");
const rangevalue = document.getElementById("rangevalue");
// set their starting values:
rangeslider.value = range;
rangevalue.textContent = range;

// seperation
const seperationslider = document.getElementById("seperationinput");
const seperationvalue = document.getElementById("seperationvalue");
// set their starting values:
seperationslider.value = seperation;
seperationvalue.textContent = seperation;

// cohesion
const cohesionslider = document.getElementById("cohesioninput");
const cohesionvalue = document.getElementById("cohesionvalue");
// set their starting values:
cohesionslider.value = cohesion;
cohesionvalue.textContent = cohesion;

// alignment
const alignmentslider = document.getElementById("alignmentinput");
const alignmentvalue = document.getElementById("alignmentvalue");
// set their starting values:
alignmentslider.value = alignment;
alignmentvalue.textContent = alignment;

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
