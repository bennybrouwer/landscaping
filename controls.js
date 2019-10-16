let cPicker1, cPicker2;
let defColor1 = '#ff0000';
let defColor2 = 'yellow';

// let sliderSizeX, sliderSizeY;
// let sliderPosX,  sliderPosY;

let menuWidth = 200;
let menuLeft = false;

let bounce = true;  // Birds bounce when going off screen


// Some simple parameters to place controls when used:

let yOffset = -25;    // increased befor use
let nextY = (dy) => {
  yOffset += dy;
  return yOffset;
}

let canvasControlBox;
let canvasColorBox;

let horizonBox, weatherControlBox, flockingControlBox;
let vehicleControlBox;
let bounceCheckbox;

class ControlBox {
  constructor(x, y) {
    if (menuLeft) {
      this.xPos = x;
    } else {
      this.xPos = width + 24; //- menuWidth;
    }
    if (y) {
      this.yPos = y;
    } else {
      this.yPos = nextY(20);
    }
  }
}

class CanvasColorBox extends ControlBox {
  constructor(x, y) {
    super(x, y);
    createDiv('Sky Color:').position(this.xPos, nextY(35));
    this.sliderSkyColor = createSlider(0, 100, 50)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, nextY(20));
  }
}

class CanvasControlBox extends ControlBox {
  constructor(x, y) {
    super(x, y);

    let canvasX = (menuLeft) ? menuWidth : 10;

    createDiv('Canvas place:').position(this.xPos, nextY(35));
    this.sliderPosX = createSlider(10, windowWidth, canvasX) // , menuWidth)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, nextY(20));
    this.sliderPosY = createSlider(10, windowHeight, 10)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, nextY(20));
    createDiv('Canvas size:').position(this.xPos, nextY(35));
        this.sliderSizeX = createSlider(10, windowWidth - menuWidth - 10, windowWidth - menuWidth - 10)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, nextY(20));
    this.sliderSizeY = createSlider(10, windowHeight, height)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, nextY(20));
  }
}

class HorizonBox extends ControlBox{
  constructor(x, y) {
    super(x, y);
    createDiv('Horizon:').position(this.xPos, nextY(35));
    this.sliderHorY = createSlider(0, 100, 50)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        // .position(this.xPos, this.yPos+20);
        .position(this.xPos, nextY(20));
  }
}

class WeatherControlBox extends ControlBox {
  constructor(x, y) {
    super(x, y);
    createDiv('Rain:').position(this.xPos, nextY(35));
    this.sliderRain = createSlider(0, 1000, 0)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, nextY(20));
    createDiv('Snow:').position(this.xPos, nextY(35));
    this.sliderSnow = createSlider(0, 1000, 0)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, nextY(20));
  }
}
class FlockingControlBox extends ControlBox {
  constructor(x, y) {
    super(x, y);
    createDiv('Starlings (Fly Hunters):').position(this.xPos, nextY(35));
    this.sliderBirds = createSlider(0, 100, 10)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, nextY(20));
    // createDiv('Flies:').position(this.xPos, this.yPos+60);
    // this.sliderFlies = createSlider(0, 100, 0)
    //     // .parent('.myControls')
    //     .style('width', '80px')
    //     .size(menuWidth-20)
    //     .position(this.xPos, this.yPos+80);
  }
}


class BoidControlBox extends ControlBox {
  constructor(x, y) {
    super(x, y);
    createDiv('Seaguls (Boids):').position(this.xPos, nextY(35));
    this.sliderBoids = createSlider(0, 100, 10)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, nextY(20));
    this.sliderAlignment = createSlider(0, 5, 1, 0.1)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, nextY(20));
    this.sliderCohesion = createSlider(0, 5, 2.5, 0.1)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, nextY(20));
    this.sliderSeparation = createSlider(0, 5, 2.5, 0.1)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, nextY(20));
    this.sliderPerceptionRadius = createSlider(0, 500, 250, 10)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, nextY(40));
  }
}

class VehicleControlBox extends ControlBox {
  constructor(x, y) {
    super(x, y);
    createDiv('Fish:').position(this.xPos, nextY(35));
    this.sliderCars = createSlider(0, 100, 10)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, nextY(20));
    this.sliderCarSpeed = createSlider(5, 20, 1, 0.1)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, nextY(20));
    this.sliderCarForce = createSlider(5, 20, 1, 0.1)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, nextY(20));
    // this.sliderCohesion = createSlider(0, 5, 2.5, 0.1)
    //     // .parent('.myControls')
    //     .style('width', '80px')
    //     .size(menuWidth-20)
    //     .position(this.xPos, nextY(20));
    // this.sliderSeparation = createSlider(0, 5, 2.5, 0.1)
    //     // .parent('.myControls')
    //     .style('width', '80px')
    //     .size(menuWidth-20)
    //     .position(this.xPos, nextY(20));
    // this.sliderPerceptionRadius = createSlider(0, 500, 250, 10)
    //     // .parent('.myControls')
    //     .style('width', '80px')
    //     .size(menuWidth-20)
    //     .position(this.xPos, nextY(40));
  }
}



