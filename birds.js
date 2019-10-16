// Object Oriented JavaScript STUDY

// 1 hour course by Derek Banas:
// https://youtu.be/O8wwnhdkPE4?t=864


let log = console.log;



// ********** Object: **********

let birdObject = {
  name: "starling",
  fly: function() {
    let t = `one ${this.name} flying`;
    console.log(t);
    return t;
  },
  sound: '. . . tweet tweet . . .',
  speak: function(){
    console.log(sound);
  },
  color: "#0F0F0F",
  views: ["front", "left", "right", "back", "sitting", "praying"],
  subObject: {
    demo: "Object within an object"
  },
  beak: "red",
  eatsMosquitos: true,
  eatsBerries: false
};

log('-- OBJECT --');

document.write('testing: ' + birdObject.fly() + "<br />");
document.write('testing: ', birdObject.subObject.demo + "<br />");

// ********** Constructor Function: **********

function BirdFunction(name, color) {
  this.name = name;
  this.color = color || "#FF0000";
  this.views = ["front", "left", "right", "back", "sitting", "praying"];
  this.sound = '. . . tweet tweet . . .';
  this.speak = () => { 
    console.log(`My sound is: ${this.sound}`);
    return this.sound;
  },
  this.info = () => {
    let t = this.speak();
    console.log(`${this.name} is a bird that sounds like ${t}`);
  }
}

log('-- CONSTRUCTOR FUNCTION --');

let sparrow = new BirdFunction("Sparrow");
sparrow.speak();
sparrow.info();

// ********** Constructor: **********

class BirdConstructor {
  constructor(name, color) {
    this.name = name;
    this.color = color || "#FF0000";
    this.views = ["front", "left", "right", "back", "sitting", "praying"];
    this.sound = '. . . gak gak . . .';
    this.speak = () => {
      console.log(`My sound is: ${this.sound}`);
      return this.sound;
    },
      this.info = () => {
        let t = this.speak();
        console.log(`${this.name} is a bird that sounds like ${t}`);
      };
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
}

log('-- CONSTRUCTOR --');

let goose = new BirdConstructor("Goose");
goose.speak();
goose.info();

goose.setName('Rotgans');
log('goose is now: ', goose.getName());

// ********** Extend the bird: **********

class Starling extends BirdConstructor {
  constructor(description) {
    super('Starling', 'black');
    this.description = description || "not specified";
  }
  toString() {
    return this.getName() + ': ' + this.description + ', ' + super.sound;
  }
}

let starling = new Starling('');
starling.info();
log(starling.toString());

