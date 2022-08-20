class Boid {
  constructor(size, color, position, startdirection, startspeed) {
    this.size = size;
    this.color = color;
    this.position = position.copy();
    this.velocity = Vector.setByAngle(startdirection);
    this.velocity.setMag(startspeed);
  }

  draw() {
    function drawTriangle(x, y, size) {
      ctx.beginPath();
      ctx.moveTo(x + size / 2, y);
      ctx.lineTo(x - size / 2, y - size / 2);
      ctx.lineTo(x - size / 2, y + size / 2);
      ctx.lineTo(x + size / 2, y);
      ctx.closePath();
      ctx.fill();
    }

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.fillStyle = this.color;
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.velocity.heading());
    drawTriangle(0, 0, this.size);
    ctx.resetTransform();
  }

  move() {
    let targetScale = this.velocity.copy();
    targetScale.setMag(targetspeed);
    // v += resolve * (t - v)
    // where `v` is the current velocity and `t` is the targetScale
    targetScale.sub(this.velocity);
    targetScale.mult(resolve);
    this.velocity.add(targetScale);

    // adjust the velocity vector by the deltaTime
    let adjustedVelCopy = this.velocity.copy();
    adjustedVelCopy.mult(deltaT);
    this.position.add(adjustedVelCopy);

    // loop around
    if (this.position.x < 0) {
      this.position.x = canvas.width;
    }
    if (this.position.x > canvas.width) {
      this.position.x = 0;
    }

    if (this.position.y < 0) {
      this.position.y = canvas.height;
    }
    if (this.position.y > canvas.height) {
      this.position.y = 0;
    }
  }

  calculate() {
    // get an array of the boids that are in range
    let nearby = this.findnearby();
    let avdist = Vector.zero();
    let avspeed = Vector.zero();

    for (let near of nearby) {
      // SEPERATION PART
      // manoeuvre this boid away from the other boid that is in range
      let sepvector = near.position.copy();
      // now we have a vector pointing from this boid to the other boid
      sepvector.sub(this.position);
      // we normalize it and set the magnitude to the seperation value
      sepvector.setMag(seperation);
      // but we want to get away, so multiply it with -1 to invert it
      sepvector.mult(-1);
      this.velocity.add(sepvector);
      // END SEPERATION PART

      // COHESION PART
      // get their average position
      let dist = near.position.copy();
      dist.sub(this.position);
      avdist.add(dist);
      // END COHESION PART

      // ALIGNMENT PART
      let speed = near.velocity.copy();
      avspeed.add(speed);
      // END ALIGNMENT PART
    }

    // CONTINUING OF COHESION PART
    avdist.div(nearby.length);
    avdist.mult(cohesion);
    this.velocity.add(avdist);
    // END COHESION PART

    // CONTINUING OF ALIGNMENT PART
    avspeed.div(vearby.length);
    a;
  }

  isInRange(other) {
    let thisposcopy = this.position.copy();
    thisposcopy.sub(other.position);
    let distance = thisposcopy.mag();

    return distance <= range;
  }

  findnearby() {
    let near = [];
    for (let i = 0; i < boids.length; i++) {
      if (this.isInRange(boids[i])) {
        near.push(boids[i]);
      }
    }
    return near;
  }
}
