/// <reference path="../node_modules/@types/p5/global.d.ts" />

let song;
let songVolume = 1;
let cellSize;
let pad = 10;
let xbound;
let ybound;
let floaters = [];
let speed = 1;

function preload() {
	song = loadSound("assets/sounds/Through-My-Eyes.mp3");
}

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.mousePressed(togglePlay);
	song.setVolume(songVolume)
	amp = new p5.Amplitude();
	cellSize = windowWidth / 10;
	xbound = windowWidth + cellSize;
	ybound = windowHeight + cellSize;
	pad = windowWidth / 30;

	for (let x = 0; x < xbound; x+=cellSize) {
		for (let y = 0; y < ybound; y+=cellSize) {
			floaters.push(new Floater(x, y));
		}
	}

	song.loop();
}

function draw() {
	background(30)
	for (let i = 0; i < floaters.length; i++) {
		floaters[i].move();
		floaters[i].display();
	}
}

function togglePlay() {
	if (song.isPlaying()) {
		song.pause();
	} else {
		song.play();
	}
}

class Floater {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.diameter = random(cellSize/4, cellSize - pad);
		if (random(0, 5) > 3) {
			this.pulse = true;
		} else {
			this.pulse = false;
		}
	}

	move() {
		this.y += speed;
		if (this.y > ybound) {
			this.y = 0;
		}
	}

	display() {
		let volume = amp.getLevel();

		let d;
		if (this.pulse) {
			d = map(volume, 0, songVolume, this.diameter, 2*cellSize);
		} else {
			d = this.diameter
		}

		let floaterColor = color(255)
		floaterColor.setAlpha(map(this.y, 0, windowHeight, 255, 20))
		fill(floaterColor)

		ellipse(this.x, this.y, d, d);
	}
}