var mic;

function setup () {
	noLoop();
}

function audioStart() {
	mic = new p5.AudioIn();
	mic.start();
	loop();
}

function draw () {
	var vol = mic.getLevel();
	console.log(vol);
}

function mousePressed() { getAudioContext().resume() }