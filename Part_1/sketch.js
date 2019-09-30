var mic;
var fft;

function setup () {
	noLoop();
	createCanvas(windowWidth, windowHeight);
}

function audioStart() {
	mic = new p5.AudioIn();
	mic.start();
	fft = new p5.FFT(0.8,1024);
	fft.setInput(mic);
	loop();
	$("#intro").hide();
	$("#controller").show();
}

function draw () {
	var vol = mic.getLevel();
	var spectrum = fft.analyze();

	var lowestFrequencyBucket = spectrum.length*0.1;
	var highestFrequencyBucket = spectrum.length*0.40;

	var trimmedSpectrum = spectrum.slice(lowestFrequencyBucket, highestFrequencyBucket);

	var circleRadius = 200;
	var circleCenterX = windowWidth/2;
	var circleCenterY = windowHeight/2;
	var minLineLength = 5;
	var amplitudeCoefficient = $("#volume").val();
	var circleNumberDots = trimmedSpectrum.length;

	background(255);

	function lineGetStartXCoordinateForDot (i) {
		return Math.sin(2*Math.PI*(i/circleNumberDots))*circleRadius+circleCenterX;
	}

	function lineGetStartYCoordinateForDot (i) {
		return Math.cos(2*Math.PI*(i/circleNumberDots))*circleRadius+circleCenterY;
	}

	function lineGetEndXCoordinateForDot (i, lineLength) {
		return Math.sin(2*Math.PI*(i/circleNumberDots))*(circleRadius+lineLength*amplitudeCoefficient+minLineLength)+circleCenterX;
	}

	function lineGetEndYCoordinateForDot (i, lineLength) {
		return Math.cos(2*Math.PI*(i/circleNumberDots))*(circleRadius+lineLength*amplitudeCoefficient+minLineLength)+circleCenterY;
	}

	for(var i = 0; i<circleNumberDots; i++) {
		line(lineGetStartXCoordinateForDot(i), lineGetStartYCoordinateForDot(i), lineGetEndXCoordinateForDot(i, trimmedSpectrum[i]), lineGetEndYCoordinateForDot(i, trimmedSpectrum[i]));
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() { getAudioContext().resume() }