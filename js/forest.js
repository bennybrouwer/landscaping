// see bottom for naming conventions or (https://diffbw.com/forest-vs-forrest)

const debug = true;

const branchIniLength = 100;
const branchDecrease = 0.5;

class Forest {
  constructor(centerX, centerY, radius) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius || random(width - centerX);

    this.width = 3 * radius / 2;
    this.height = 2 * radius / 3;

    this.trees = [];
    this.density = 0.1;
    // let count = Math.round(this.radius * this.density);

    this.addTree = function(x, y) {
      return this.trees.push(new Tree(x, y));
    };

    this.setup = function(treeCount) {
      let range = this.radius/3;
      for (let i = 0; i < treeCount; i++) {
        // let t = this.addTree(random(this.centerX-range, this.centerX+range), 
        //                      random(this.centerY-range, this.centerY+range));
        let t = new Tree(random(this.centerX-range, this.centerX+range), 
                         random(this.centerY-range, this.centerY+range));
        this.trees.push(t);
        console.log(t);
        t.addBranch();
      };
    }

    this.show = function() {
      if (debug) {
        fill(0, 255, 0, 50);
        ellipse(this.centerX, height - this.centerY, this.width, this.height);
      }
      this.trees.forEach((t) => t.show());
    }

    this.addBranches = function() {
      this.trees.forEach((t) => {
        t.addBranch();
      });
    };
  };
}

class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.branches = [];

    let a = createVector(this.x, height - this.y);
    let b = createVector(this.x, height - branchIniLength - this.y);
    let root = new Branch(a, b);
    this.branches.push(root);

    this.addBranch = function(begin, end) {
      this.branches.push(new Branch(begin, end));
    };

    this.show = function() {
      if (debug) {
        fill(0, 0, 0);
        ellipse(this.x, height - this.y, 30);
      }
      this.branches.forEach(b => {
        b.show();
      });
    };
  };
};

class Branch {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.finished = false;
    this.angle = PI / 4;

    this.jitter = function () {
      this.x2 += random(-1, 1);
      this.y2 += random(-1, 1);
    };

    this.show = function () {
      if (debug) {
        fill(255, 0, 0);
        ellipse(this.x1, this.y1, 10);
      }
      stroke(255);
      strokeWeight(2);
      line(this.x1, this.y1, this.x2, this.y2);
    };

    this.branchMe = function (a) {
      this.angle = slider.value();
      let end = p5.createVector(this.x2, this.y2);
      let begin = p5.createVector(this.x1, this.y1);
      let dir = p5.Vector.sub(end, begin);
      dir.rotate(a * this.angle).mult(branchDecrease);
      let newEnd = p5.Vector.add(end, dir);
      return new Branch(this.x2, this.y2, newEnd.x, newEnd.y);
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

