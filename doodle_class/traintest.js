function trainEpoch(training) {
	// we now need to shuffle the array shuffle(training, true) the boolean means that it
	// will affect the training data
	// cool - now it is shuffeled 

	// train for one epoch
	shuffle(training, true);

	for (let i = 0; i < training.length; i++) {
		let data = training[i]; // every value by 255
		let inputs = Array.from(data).map(x => x / 255); // makes new array -> takes old array and divides

		let label = training[i].label;
		let targets = [0, 0, 0];
		targets[label] = 1;
		nn.train(inputs, targets);
	}
}

function testAll(testing) {

	let correct = 0;

	for (let i = 0; i < testing.length; i++) {
	//for (let i = 0; i < 1; i++) {

		let data = testing[i]; // every value by 255
		let inputs = Array.from(data).map(x => x / 255); // makes new array -> takes old array and divides

		let label = testing[i].label;
		let guess = nn.feedforward(inputs);

		let m = max(guess);
		let classification = guess.indexOf(m); // ulozi index nejvetsi hodnoty z guess
		//console.log(guess);
		//console.log(classification);
		//console.log(label);
		if (classification == label) {
			correct++;
		}
	}

	let percentage = 100 * correct / testing.length;
	return percentage;
}