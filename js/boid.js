class Boid {
  constructor(size, color, position) {
    this.size = size;
    this.color = color;
    this.position = position.copy();
  }

  draw() {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.fillStyle = this.color;
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(0);
    drawTriangle(0, 0, this.size);
    ctx.resetTransform();
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
