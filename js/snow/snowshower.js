// let snow = [];
let zOff = 0;
// let gravity;

let spritesheet;

let textures = [];

const spritesFile = 'img/flakes32.png';
// const spritesFile = 'https://photos.google.com/album/AF1QipOv_m4AlTeyopbNCIRqCDy0gFzOqgdju5y3wVjy/photo/AF1QipML06YjEOsP-KoTlFN9nq_0PVoTdU3FLE0_g2W3';

function preload() {
	spritesheet = loadImage(spritesFile);
}

class SnowShower {
  constructor(flakeCount) {
    this.snowFlakes = [];
    for (let x = 0; x < spritesheet.width; x+= 32) {
  		for (let y = 0; y < spritesheet.height; y+= 32) {
  			let img = spritesheet.get(x, y, 32, 32);
  			textures.push(img);
  		}
  	}

  	for (let i = 0; i < flakeCount; i++) {
  		let x = random(width);
  		let y = random(height);
  		let design = random(textures);
  		this.snowFlakes.push(new Snowflake(x, y, design));
    }
  	gravity = createVector(0, 0.1);
  }

  draw() {
    zOff += 0.1;
    for (let flake of this.snowFlakes) {
      // Wind through Perly Noise:
      let xOff = flake.pos.x / width;
      let yOff = flake.pos.y / height;
      let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
      let wind = p5.Vector.fromAngle(wAngle);
      wind.mult(0.1);
  
      flake.applyForce(gravity);
      flake.applyForce(wind);
      flake.update();
      flake.render();
    }
    for (let i = this.snowFlakes.length - 1; i >= 0; i--) {
      if (this.snowFlakes[i].offScreen()) {
        this.snowFlakes.splice(i, 1);
      }
    }
  }

  setDensity(count) {
    if (count > this.snowFlakes.length) {
      let t = this.snowFlakes.length;
      for (let i = t; i < count; i++) {
        let design = random(textures);
        this.snowFlakes.push(new Snowflake(random(width), random(height), design));
      }
    } else {
      // TODO . . . CLEANUP !!!
      // this.snowFlakes.length = count-1; // CLEANUP ??
      while (this.snowFlakes.length > count) {
        this.snowFlakes.pop();
      }
    }
  }

  }
