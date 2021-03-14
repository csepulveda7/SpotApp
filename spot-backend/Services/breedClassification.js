const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');

// this should recieve and image (as a byte array)
exports.classifyBreed = () => new Promise((resolve) => {
	async function run() {
		// Load the model.
		const model = await mobilenet.load();
		// remove imageBuffer and just pass in bytearray to tfimage
		const imageBuffer = fs.readFileSync(__dirname + '/breedImage.jpg');
		const tfimage = tfnode.node.decodeImage(imageBuffer);

		// Classify the image.
		const predictions = await model.classify(tfimage);

		// console.log(predictions[0].className);
		resolve(predictions[0].className.split(',')[0]);
	}

	run();
});