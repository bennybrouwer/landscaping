let flies = [];

class Starling {
  constructor(x, y, z) {
    this.pos = createVector(x || random(800), y || random(800));
    this.prev = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.wingDir = -4;

    this.update = function () {
      this.vel.add(this.acc);
      this.vel.limit(5);
      this.pos.add(this.vel);
      this.acc.mult(0);
      if (random(5) < abs(this.vel.x)) {
        this.wingDir = -this.wingDir;
      }
    };

    this.show = function () {
      stroke(55);
      strokeWeight(6);
      point(this.pos.x, this.pos.y);
      strokeWeight(2);
      line(this.pos.x-8, this.pos.y+this.wingDir, this.pos.x,   this.pos.y);
      line(this.pos.x,   this.pos.y,   this.pos.x+8, this.pos.y+this.wingDir);
      // line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
      this.prev.x = this.pos.x;
      this.prev.y = this.pos.y;
    };

    this.attracted = function (target, j) {
      let force = p5.Vector.sub(target, this.pos);
      let d = force.mag();
      if (d < 20) {
        force.mult(-1);
      }
      d = constrain(d, 5, 25);
      let strength = G / (d * d);
      force.setMag(strength);
      this.acc.add(force);
    };
  }
}


class Flock {
  constructor(count) {
    this.starlings = [];
    for (let i = 0; i < count; i++) {
      this.starlings.push(new Starling());
    }
  }

  draw() {
    stroke(255);
    strokeWeight(4);
    flies.forEach( fly => {
      stroke(0, 255, 0);
      point(fly.x, fly.y);
    });
    this.starlings.forEach( s => {
      for (let j = 0; j < flies.length; j++) {
        s.attracted(flies[j], j);
      }
      s.update();
      s.show();
    });
  }

  setDensity(count) {
    if (count > this.starlings.length) {
      let t = this.starlings.length;
      for (let i = t; i < count; i++) {
        this.starlings.push(new Starling());
      }
    } else {
      while (this.starlings.length > count) {
        this.starlings.pop();
      }
    }
  }
}


