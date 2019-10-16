// see bottom for naming conventions or (https://diffbw.com/forest-vs-forrest)

const branchIniLength = 100;
const branchDecrease = 0.5;

const bushes = [];

// const stemColors = [
//   p5.Color(255, 0, 255, 55),
//   p5.Color(255, 0, 255, 55),
//   p5.Color(255, 0, 255, 55),
//   p5.Color(255, 0, 255, 55),
//   p5.Color(255, 0, 255, 55),
//   p5.Color(255, 0, 255, 55),
//   p5.Color(255, 0, 255, 55),
//   p5.Color(255, 0, 255, 55),
//   p5.Color(255, 0, 255, 55),
//   p5.Color(255, 0, 255, 55)
// ];

class Forest {
  constructor(centerX, centerY, radius) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius || random(width - centerX);

    this.width = 3 * radius / 2;
    this.height = 2 * radius / 3;

    this.trees = [];
    this.density = 0.1;

    // this.stemColor = stemColors[1];
    // console.log(this.stemColor);
    // let count = Math.round(this.radius * this.density);

    this.addTree = function(x, y) {
      return this.trees.push(new Tree(x, y));
    };

    this.setup = function(treeCount) {
      let range = this.radius/3;
      for (let i = 0; i < treeCount; i++) {
        let t = new Tree(random(this.centerX-range, this.centerX+range), 
                         random(this.centerY-range, this.centerY+range));
        this.trees.push(t);
        // console.log(t);
      };
    }

    this.show = function() {
      if (debug || true) {
        // stroke(150, 255, 150, 0.5);
        stroke(50, 0.9);
        strokeWeight(1);
        // fill(255, 0, 255, 30);
        fill(25, 10);
        ellipse(this.centerX, landscape.yCoord(this.centerY), this.width, this.height);
      }
      // console.log(this.stemColor);
      // stroke(this.stemColor);
      stroke(255, 0, 255);
      this.trees.forEach((t) => t.show());
    }

    this.growBranches = function() {
      this.trees.forEach((t) => {
        if ((t.branches.length < 6) && (random(1) < 0.5)) {
          t.growBranches();
        }
      });
    };
  };
}

class Tree {
  constructor(x, y) {   // lower side of the stem
    this.x = x;
    this.y = y;
    this.branches = [];
    this.leaves = [];
    this.branchCount = 0;
    this.finished = false;

    let a = createVector(this.x, height - this.y);
    let b = createVector(this.x, height - branchIniLength - this.y);
    this.root = new Branch(a, b);
    this.branches.push(this.root);

    this.addBranch = function(begin, end) {
      this.branches.push(new Branch(begin, end));
    };

    this.growBranches = function() {
      for (let i = this.branches.length - 1; i >= 0; i--) {
        if (!this.branches[i].finished) {
          this.branches.push(this.branches[i].branchA());
          this.branches.push(this.branches[i].branchB());
        }
        this.branches[i].finished = true;
      }
      this.branchCount++;
    
      // if (this.branchCount === 6) {
      //   for (var i = 0; i < this.branches.length; i++) {
      //     if (!this.branches[i].finished) {
      //       let leaf = this.branches[i].end.copy();
      //       leaves.push(leaf);
      //     }
      //   }
      // }
    };

    this.show = function() {
      if (debug) {
        fill(200, 120, 20, 75);
        strokeWeight(0);
        // ellipse(this.x, height - this.y, 20, 10);
        ellipse(this.x, landscape.yCoord(this.y), 20, 10);
      }
      this.branches.forEach(b => {
        b.show();
      });
    };
  };
};

class Branch {
  constructor(begin, end) {
    // this.x1 = begin.x;
    // this.x2 = end.x;
    // this.y1 = begin.y;
    // this.y2 = end.y;
    this.begin = createVector(begin.x, begin.y);
    this.end = createVector(end.x, end.y);
    this.finished = false;
    this.angle = PI / 2;
    this.red = random(100, 255);
    this.green = 0;
    this.blue = random(100, 255);

    this.jitter = function () {
      this.end.x += random(-1, 1);
      this.end.y += random(-1, 1);
    };

    this.show = function () {
      stroke(this.red, this.green, this.blue);
      stroke('#661B04');
      strokeWeight(2);
      line(this.begin.x,
           this.begin.y,
           this.end.x,
           this.end.y);
    };

    this.branchMe = function (a) {
      this.angle = -PI / 4;
      // this.angle = slider.value();
      // let end = p5.createVector(this.end.x, this.end.y);
      // let begin = p5.createVector(this.begin.x, this.begin.y);
      let dir = p5.Vector.sub(this.end, this.begin);
      dir.rotate(random(a) * this.angle).mult(branchDecrease);
      let newEnd = p5.Vector.add(this.end, dir);
      return new Branch(this.end, newEnd);
    };
    this.branchA = function() {return this.branchMe( 1)};
    this.branchB = function() {return this.branchMe(-1)};
  }
}


// As a noun, forest is "A dense collection of trees covering a relatively large area. 
// Larger than woods" or "Any dense collection or amount" or " A defined area of land
// set aside in England as royal hunting ground or for other privileged use; all such areas".

// As a proper noun, forrest is "surname topographical fromMiddle English dot for someone
// who lived or worked in a royal Royal forest " or "given name male fromsurnames transferred
// from the surname".

