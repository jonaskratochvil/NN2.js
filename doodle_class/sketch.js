const len = 784;
const total_data = 1000

const CAT = 0;
const RAINBOW = 1;
const TRAIN = 2;

let cats_data;
let rainbows_data;
let trains_data;

// creates objects
let cats = {};
let trains = {};
let rainbows = {};

let nn;

// loads .bin files but requires additional function loadbinary.js
function preload() {
	cats_data = loadBytes('Data/cats1000.bin');
	trains_data = loadBytes('Data/trains1000.bin');
	rainbows_data = loadBytes('Data/rainbows1000.bin');
}

function setup() {
	createCanvas(280, 280);
	background(255);
	prepareData(cats, cats_data, CAT);
	prepareData(trains, trains_data, TRAIN);
	prepareData(rainbows, rainbows_data, RAINBOW);

	// making neural network
	nn = new NeuralNetwork(784, 40, 3);

	// shuffle training data together 

	let training = [];
	// concatenate the cats training 
	training = training.concat(cats.training);
	training = training.concat(trains.training);
	training = training.concat(rainbows.training);


	// we need to test how we did
	let testing = [];
	// concatenate the cats training 
	testing = testing.concat(cats.testing);
	testing = testing.concat(trains.testing);
	testing = testing.concat(rainbows.testing);

	// attatch action to button specified in index.html
	let trainButton = select('#train');
	let epochcounter = 0;
	// anonymous function -> action to do after mouse is clicked
	trainButton.mousePressed(function () {
		trainEpoch(training);
		epochcounter++;
		console.log("finished training of " + epochcounter + " epoch.");
	});

	let testButton = select('#test');
	testButton.mousePressed(function () {
		testAll(testing);
		let percent = testAll(testing);
		console.log("Corect: " + nf(percent, 2, 2) + " %."); //number format (asi kolik pred
		// desetinou carkou a kolik za ni)
	});

	let guessButton = select('#guess');
	guessButton.mousePressed(function () {
		let inputs = [];
		let img = get(); //gets pixels of a current image
		img.resize(28, 28); // resizes them to 28,28
		img.loadPixels();
		// all RGB values are going to be the same to I can just skip each time a do just once
		for (let i = 0; i < len; i++) {
			let bright = img.pixels[i*4];
			inputs[i] = (255-bright)/255.0; // reverse color
		}
		let guess = nn.feedforward(inputs);
		let m = max(guess);
		let classification = guess.indexOf(m);
		// let's see the result!
		if(classification == CAT){
			console.log("cat")
		}
		else if(classification == TRAIN){
			console.log("train")
		}
		else if(classification == RAINBOW){
			console.log("rainbow")}
	});

	let clearButton = select('#clear');
	clearButton.mousePressed(function () {
		background(255);
	});
}

function draw() {
	strokeWeight(8);
	stroke(0);
	if (mouseIsPressed) {
		line(pmouseX, pmouseY, mouseX, mouseY); //previous mouse position and current
	}






}