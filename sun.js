// let sun;

class Sun {
  constructor(limX, limY) {
    this.pos = createVector(0, 150);
    // this.x = 0;
    // this.y = 150;
    this.limX = limX;
    this.limY = limY;
    this.yMax = -10000000;
    this.speed = 0.5;
    this.radius = 100;
    this.colMorning = '#FF0000';
    this.colNoon    = '#FFFF00';
    this.colEvening = '#FF0000';
    this.initColors();

    this.rays = [];
    for (let i = 0; i < 360; i += 1) {
      this.rays.push(new Ray(this.pos, radians(i)));
    }
  }

  show() {
    fill(this.setColor().getRGBA());
    ellipse(this.pos.x, this.pos.y, this.radius);
    for (let r of this.rays) {
      // r.show();
    }
  }

  move() {
    this.pos.x += this.speed;
    if (this.pos.x > this.limX) {
      this.pos.x = 0;
    }
    this.pos.y = 350 - 250 * (sin(TWO_PI * this.pos.x / (2 * this.limX)));
    if (this.pos.y > this.yMax) {
      this.yMax = this.pos.y;
    }
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  brightness() {
    // fraction 0 ... 1
    return sin(TWO_PI * this.pos.x / (2 * this.limX));
    // return 1 - sin(TWO_PI * this.pos.x / (this.limX));
  }

  initColors() {
    this.colMorning = new BaseColor();
    this.colMorning.setRGBA(255, 0, 0);
    this.colNoon = new BaseColor();
    this.colNoon.setRGBA(255, 255, 0);
    this.colEvening = new BaseColor();
    this.colEvening.setRGBA(255, 0, 0);
  }

  setColor() {
    return this.colMorning.lerp(this.colNoon, this.brightness());  
  }

  look(walls) {
    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = p5.Vector.dist(this.pos, pt);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest) {
        strokeWeight(1);
        stroke(255, 255, 0, 55);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }

}