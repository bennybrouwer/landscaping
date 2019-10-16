'use strict';
// import Sun from './sun.js';

// Base unit to make my .js modules independent of P5 sketch.js, although 
// the latter is assumed to be used.

// Landscape initializes and . . .
// - combines sky and field and underlying details;
// - Puts the horizon in place - !!! movable y-axis, essential in drawing
// - takes away the sequence of updating and drawing from SKETCH.JS
//    so that the latter can be used to train and use the P5 library


let grassColor1, grassColor2;
let skyColor1, skyColor2;

class Landscape {
    constructor(lw = 640, lh = 320) {
        grassColor1 = new BaseColor();
        grassColor2 = new BaseColor();
        skyColor1 = new BaseColor();
        skyColor2 = new BaseColor();
        this.lWidth = lw;
        this.lHeight = lh;

        this.sky = new Sky();

        this.sun = new Sun(this.lWidth, this.lHeight);
        // this.cloud = new Cloud(this.lWidth, this.lHeight, 100, 100, 50);
        // this.cloud = new Cloud(this.lWidth, this.lHeight, 200, 200, 50);

        // this.mc = new MetaballCloud();       // GIVES RUBBISH !!!

        this.horizon = new Horizon(this.lHeight / 2, this.lWidth);
        this.horizon.makeVillage(10);
        // this.terrain = new Terrain(20, 20, 25, 15, 40, 40);

        this.lake = new Lake(this.lWidth, 200, 100, 20, 20);
        this.path = demoPath(20, 50);
    }

    update() {
        this.sun.move();
        // this.cloud.update();
        if (this.path) {
            this.path.update();
        }
    }

    draw() {
        this.drawSky();
        this.drawSun();
        // this.drawClouds();
        // this.cloud.show();
        this.drawGrass();
        this.drawHorizon();
        if (this.terrain) {
            this.drawTerrain();
        }
        if (this.lake) {
            this.lake.drawFlow();
            this.lake.drawFloaters();
        }
        if (this.path) {
            this.path.draw();
            this.path.update();
        }
        if (this.mc) {
            this.mc.draw();
        }
    }

    yCoord(y) {
        return height - y - this.horizon.y;
    }

    drawHorizon() {
        this.horizon.y = Math.floor(this.lHeight * (1 - horizonBox.sliderHorY.value() / 100));
        // DRAW SOME SIMPLE BUILDINGS IN THE DISTANCE AT THE HORIZON --> PERSPECTIVE
        this.horizon.draw();
    }

    drawTerrain() {
        this.terrain.draw(this.horizon.y);
    }

    drawSky() {
        let colSkyPct = canvasColorBox.sliderSkyColor.value();
        skyColor2.setRGBA(66, 66, Math.round(2.55 * colSkyPct), 1);
        for (let i = 0; i < this.horizon.y; i++) {
            skyColor1.setRGBA(66, 66, 255 * this.sun.brightness(), 1);
            let c = skyColor1.lerp(skyColor2, i / (this.lHeight - this.horizon.y));
            // c.makeSepia();
            stroke(c.getRGBA());
            line(0, i, this.lWidth, i);
        }
        // this.sky.draw();
    }

    drawGrass() {
        grassColor2.setRGBA(100, 255, 100, 1);
        for (let i = this.horizon.y; i < this.lHeight; i++) {
            grassColor1.setRGBA(0, 255 * this.sun.brightness(), 0, 1);
            let c = grassColor1.lerp(grassColor2, (i - this.horizon.y) / (this.lHeight - this.horizon.y));
            // c.makeSepia();
            stroke(c.getRGBA());
            line(0, i, this.lWidth, i);
        }
    }

    drawSun() {
        // fill(this.sun.setColor().getRGBA());
        // ellipse(this.sun.pos.x, this.sun.pos.y, this.sun.radius);
        this.sun.show();
        this.sun.look(walls);
    }

    drawClouds() {
        // fill(this.cloud.setColor().getRGBA());
        // ellipse(this.cloud.x, this.cloud.y, this.cloud.radius, this.cloud.radius);
        for (let c of clouds) {
            c.update();
            c.draw();
        }
    }

}