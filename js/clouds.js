// let Cloud;

let clouds = [];

class Cloud {
  constructor(limX, limY, x, y, radius) {
    this.pos = createVector(x, y);
    this.radius = radius;
    this.vel = createVector(0, 0);
    this.blue = random(100, 255);
    this.alpha = random(100, 255);
    this.yoff = 0; // random(0, 1);
    this.xoff = 0; // random(0, 1);

    this.x = 0;    // kan weg
    this.y = 150;  // kan weg
    this.limX = limX;
    this.limY = limY;
    this.yMax = -10000000;
    this.speed = 0.5;
    this.radius = 100;
    this.colMorning = '#0000FF';
    this.colNoon    = '#0000FF';
    this.colEvening = '#0000FF';
    this.initColors();
  }

  update() {
    let newVel = createVector(mouseX - width / 2, mouseY - height / 2);
    newVel.div(50);
    // newVel.setMag(3);
    newVel.limit(3);
    this.vel.lerp(newVel, 0.2);
    this.pos.add(this.vel);
  }

  constrain() {
    this.pos.x = constrain(this.pos.x, -width / 4, width / 4);
    this.pos.y = constrain(this.pos.y, -height / 4, height / 4);
  }

  show() {
    fill(0, 0, this.blue, this.alpha);
    // ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    push();
    // translate(this.pos.x, this.pos.y);
    beginShape();
    // let xoff = 0;
    for (let a = 0; a < TWO_PI; a += 0.1) {
      let offset = map(noise(this.xoff, this.yoff), 0, 1, -25, 25);
      let r = this.radius + offset;
      let x = this.pos.x + r * cos(a);
      let y = this.pos.y + r * sin(a);
      vertex(x, y);
      this.xoff += 0.001;
    }

    this.yoff += 0.001;

    endShape(CLOSE);
    pop();
  }

  move() {
    this.x += this.speed / 2; // make random or so
    if (this.x > this.limX) {
      this.x = 0;
    }
    this.y = 150 - 150 * (sin(TWO_PI * this.x / (2 * this.limX)));
    if (this.y > this.yMax) {
      this.yMax = this.y;
    }
  }

  brightness() {
    // fraction 0 ... 1
    return sin(TWO_PI * this.x / (2 * this.limX));
    // return 1 - sin(TWO_PI * this.x / (this.limX));
  }

  initColors() {
    this.colMorning = new BaseColor();
    this.colMorning.setRGBA(55, 55, 255);
    this.colNoon = new BaseColor();
    this.colNoon.setRGBA(255, 255, 255);
    this.colEvening = new BaseColor();
    this.colEvening.setRGBA(55, 55, 255);
  }

  setColor() {
    return this.colMorning.lerp(this.colNoon, this.brightness());
  }
}
