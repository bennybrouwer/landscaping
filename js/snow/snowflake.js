function getRandomSize() {
  // method 1:
  let r = pow(random(0.1, 1), 3);
  return constrain(r * 32, 2, 32);

  // method 2:
  // let r = randomGaussian() * 2.5;
  // return constrain(r * r, 2, 12);

  // method 3:
  // while (true) {
  //   let r1 = random(1);
  //   let r2 = random(1);
  //   if (r2 > r1) {
  //     return r1 * 16;
  //   }
  // }
}


class Snowflake {

  constructor(sx, sy, img) {
    let x = sx || random(width);
    let y = sy || random(-100, -10);
    this.img = img;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();

    this.angle = random(TWO_PI);
    this.dir = (random(1) > 0.5) ? 1 : -1;
    this.xOff = 0;

    this.r = getRandomSize();
  }

  applyForce(force) {
    // Parallax Effect hack:
    let f = force.copy();
    f.mult(this.r);
    this.acc.add(force);
  }

  randomize() {
    let x = random(width);
    let y = random(-100, -10);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.r = getRandomSize();
  }

  update() {

    this.xOff = sin(this.angle) * 3 * this.r;

    this.vel.add(this.acc);
    this.vel.limit(this.r * 0.2);

    if (this.vel.mag() < 1) {
      this.vel.normalize();
    }
    this.pos.add(this.vel);
    this.acc.mult(0);

//    if (this.offScreen()) {
    if (this.pos.y > height + this.r) {
      this.randomize();   // put randomly back on top of screen
    }

    if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    }

    this.angle += this.dir * this.vel.mag() / 200;
  }

  render() {
  //  if (this.img) {
      push();
      translate(this.pos.x + this.xOff, this.pos.y);
      rotate(this.angle);
      imageMode(CENTER);
      image(this.img, 0, 0, this.r, this.r);
      pop();

  //  } else {    // Draw simple snowball - circles
    //   stroke(51, 0, 51);
    //   strokeWeight(this.r);
    //   point(this.pos.x, this.pos.y);
    // }
  }

  offScreen() {
		return (this.pos.y > height + this.r ||
            this.pos.x < -this.r ||
            this.pos.x > width + this.r);
	}





}
