let myCanvas;

let bkColor;
let landscape;
let snowShower, rainfall, forest, flock, weatherControlBox, flockingControlBox;

function setup() {
	myCanvas = createCanvas(windowWidth-menuWidth-20, windowHeight-20);
	// myCanvas = createCanvas(windowWidth-20, windowHeight-20);
	if (menuLeft) {
		myCanvas.position(menuWidth + 10, 10);
	} else {
		myCanvas.position(10, 10);
	}

	canvasColorBox = new CanvasColorBox(10,10);
	canvasControlBox = new CanvasControlBox(10,60);
	horizonBox = new HorizonBox(10, 180);
	weatherControlBox = new WeatherControlBox(10, 240);
	flockingControlBox = new FlockingControlBox(10, 360);

	bkColor = new BaseColor();
	bkColor.setRGBA(55, 55, 55, 1);

	landscape = new Landscape(myCanvas.width, myCanvas.height);

	// forest = new Forest(200, 200, 100);
	// forest.setup(3);
	// forest.addBranches();

	snowShower = new SnowShower(flakeCount = 0);
	rainfall = new Rainfall(0);

	flock = new Flock(100);

	// Create surrounding boundary to test sun-ray-casting
	walls.push(new Boundary(0, 0, width, 0));
	walls.push(new Boundary(width, 0, width, height));
	walls.push(new Boundary(width, height, 0, height));
	walls.push(new Boundary(0, height, 0, 0));
}

function draw() {
	// myCanvas.background(bkColor.getRGBA());
	myCanvas.size(canvasControlBox.sliderSizeX.value(),
								canvasControlBox.sliderSizeY.value());
	myCanvas.position(canvasControlBox.sliderPosX.value(),
										canvasControlBox.sliderPosY.value());
	// myCanvas.background(bkColor.getHexa());

	landscape.update();
	landscape.draw();

	for (let w of walls) {
		w.show();
	}

	// forest.show();

	let flockDensity = flockingControlBox.sliderBirds.value();
	flock.setDensity(flockDensity);
	flock.draw();

	let rainDensity = weatherControlBox.sliderRain.value();
	rainfall.setDensity(rainDensity);
	rainfall.draw();
	let snowDensity = weatherControlBox.sliderSnow.value();
	snowShower.setDensity(snowDensity);
	snowShower.draw();
	drawTest();
}

function mousePressed() {
	if (mouseX > menuWidth) {
		flies.push(createVector(mouseX, mouseY));
	}
}

function drawTest() {
	let from = new BaseColor();
	from.setRGBA(218, 165, 32);
	let to = new BaseColor();
	to.setRGBA(72, 61, 0);
	colorMode(RGB); // Try changing to HSB.
	let interA = lerpBaseColor(from, to, 0.33);
	let interB = lerpBaseColor(from, to, 0.67);

	stroke(100, 100, 100);
	strokeWeight(1);
	fill(from.getRGBA());
	rect(10, 20, 20, 60);
	fill(interA.getRGBA());
	rect(30, 20, 20, 60);
	fill(interB.getRGBA());
	rect(50, 20, 20, 60);
	fill(to.getRGBA());
	rect(70, 20, 20, 60);
}