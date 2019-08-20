class Rainfall {
  constructor(count) {
    this.drops = [];
    for (let i = 0; i < count; i++) {
      this.drops[i] = new RainDrop();
    }
  }

  draw() {
    for (let i = 0; i < this.drops.length; i++) {
      this.drops[i].fall();
      this.drops[i].show();
    }
  }

  setDensity(count) {
    if (count > this.drops.length) {
      let t = this.drops.length;
      for (let i = t; i < count; i++) {
        // this.drops[i] = new RainDrop();
        this.drops.push(new RainDrop());
      }
    } else {
      // if (count >= 0) {
      //  LEGAL AND FASTER ?:
      //   this.drops.length = count; // CLEANUP ??
      // } else {
      //   console.error('invalid count (< 0) in rain-density');
      // }
      while (this.drops.length > count) {
        this.drops.pop();
      }
    }
  }
}