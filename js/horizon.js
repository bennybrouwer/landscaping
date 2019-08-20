let horizon;

class House {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw(yBase) {
    stroke(0);
    strokeWeight(1);
    fill(72, 61, 0);
    rect(this.x, yBase-this.h, this.w, this.h);
  }
}

class Horizon {
  constructor(y, w) {
    this.y = y;
    this.w = w;
    this.colSpace = "#0000FF";
    this.colEarth = "#00GG00";
    this.houses = [];
  }

  makeVillage(cnt) {
    for (let i = 0; i < cnt; i++) {
      this.houses.push(new House(this.w - random(this.w/3), this.y+random(15), random(10, 50), random(10, 50)));
    }
  }

  draw() {
    // stroke(0);
    // strokeWeight(1);
    // line(0, this.y, width, this.y);
    this.houses.forEach(h => {
      h.draw(this.y);
    });
  }

}