let cPicker1, cPicker2;
let defColor1 = '#ff0000';
let defColor2 = 'yellow';

// let sliderSizeX, sliderSizeY;
// let sliderPosX,  sliderPosY;

let menuWidth = 200;
let menuLeft = true;

let canvasControlBox;
let canvasColorBox;

let horizonBox;

class ControlBox {
  constructor(x, y) {
    if (menuLeft) {
      this.xPos = x;
    } else {
      this.xPos = width - menuWidth;
    }
    this.yPos = y;
  }
}

class HorizonBox extends ControlBox{
  constructor(x, y) {
    super(x, y);
    createDiv('Horizon:').position(this.xPos, this.yPos);
    this.sliderHorY = createSlider(0, 100, 50)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, this.yPos+20);
  }
}

class CanvasColorBox extends ControlBox {
  constructor(x, y) {
    super(x, y);
    createDiv('Sky Color:').position(this.xPos, this.yPos);
    this.sliderSkyColor = createSlider(0, 100, 50)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, this.yPos+20);
  }
}

class CanvasControlBox extends ControlBox {
  constructor(x, y) {
    super(x, y);
    createDiv('Canvas place:').position(this.xPos, this.yPos);
    this.sliderPosX = createSlider(10, windowWidth, menuWidth)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, this.yPos+20);
    this.sliderPosY = createSlider(10, windowHeight, 10)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, this.yPos+40);
    createDiv('Canvas size:').position(this.xPos, this.yPos+60);
        this.sliderSizeX = createSlider(10, windowWidth - menuWidth - 10, windowWidth - menuWidth - 10)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, this.yPos+80);
    this.sliderSizeY = createSlider(10, windowHeight, height)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, this.yPos+100);
  }
}
class WeatherControlBox extends ControlBox {
  constructor(x, y) {
    super(x, y);
    createDiv('Rain:').position(this.xPos, this.yPos);
    this.sliderRain = createSlider(0, 1000, 0)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, this.yPos+20);
    createDiv('Snow:').position(this.xPos, this.yPos+60);
    this.sliderSnow = createSlider(0, 1000, 0)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, this.yPos+80);
  }
}
class FlockingControlBox extends ControlBox {
  constructor(x, y) {
    super(x, y);
    createDiv('Birds:').position(this.xPos, this.yPos);
    this.sliderBirds = createSlider(0, 100, 0)
        // .parent('.myControls')
        .style('width', '80px')
        .size(menuWidth-20)
        .position(this.xPos, this.yPos+20);
    // createDiv('Flies:').position(this.xPos, this.yPos+60);
    // this.sliderFlies = createSlider(0, 100, 0)
    //     // .parent('.myControls')
    //     .style('width', '80px')
    //     .size(menuWidth-20)
    //     .position(this.xPos, this.yPos+80);
  }
}



