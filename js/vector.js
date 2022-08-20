class Vector {
  x = 0;
  y = 0;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(inVec) {
    this.x += inVec.x;
    this.y += inVec.y;
  }
  sub(inVec) {
    this.x -= inVec.x;
    this.y -= inVec.y;
  }
  mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  setMag(magnitude) {
    let m = this.mag();
    if (m == 0) return;
    this.x = (this.x / m) * magnitude;
    this.y = (this.y / m) * magnitude;
  }
  norm() {
    let m = this.mag();
    if (m == 0) return;
    this.x = this.x / m;
    this.y = this.y / m;
  }
  unit() {
    let un = this.copy();
    un.norm();
    return un;
  }
  limit(max) {
    let m = this.mag();
    if (m == 0 || m < max) return;
    this.x = this.x / m;
    this.y = this.y / m;
    this.mult(max);
  }
  mult(factor) {
    this.x *= factor;
    this.y *= factor;
  }
  div(factor) {
    this.x /= factor;
    this.y /= factor;
  }
  rotatedBy(angle) {
    // deze function maakt gebruik van de volgende Matrix-transformatie:
    // | COS θ  -SIN θ | | Vx |
    // | SIN θ   COS θ | | Vy |
    // Waar θ = angle en V de Vector waarop deze function op werd geroepen
    // bereken de dot-product van (COS θ, -SIN θ) * (Vx, Vy)
    let newX = Math.cos(angle) * this.x + -Math.sin(angle) * this.y;
    // bereken de dot-product van (SIN θ, COS θ) * (Vx, Vy)
    let newY = Math.sin(angle) * this.x + Math.cos(angle) * this.y;
    // maak een vector met de nieuwe x en y waardes, en return dezze
    return new Vector(newX, newY);
  }
  heading = () => Math.atan2(this.y, this.x);
  copy = () => new Vector(this.x, this.y);
  static setByAngle(angle) {
    let x = Math.cos(angle);
    let y = Math.sin(angle);
    return new Vector(x, y);
  }
  static zero = () => new Vector(0, 0);
}
