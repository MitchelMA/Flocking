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
    drawTriangle(this.position.x, this.position.y, this.size);
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
