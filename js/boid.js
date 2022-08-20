class Boid {
  constructor(size, color, position, startdirection, startspeed) {
    this.size = size;
    this.color = color;
    this.position = position.copy();
    this.velocity = Vector.setByAngle(startdirection);
    this.velocity.setMag(startspeed);
  }

  draw() {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.fillStyle = this.color;
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.velocity.heading());
    drawTriangle(0, 0, this.size);
    ctx.resetTransform();
  }

  move() {
    let adjustedVelCopy = this.velocity.copy();

    let targetScale = this.velocity.copy();
    targetScale.setMag(targetspeed);

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
}

function drawTriangle(x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x + size / 2, y);
  ctx.lineTo(x - size / 2, y - size / 2);
  ctx.lineTo(x - size / 2, y + size / 2);
  ctx.lineTo(x + size / 2, y);
  ctx.closePath();
  ctx.fill();
}
