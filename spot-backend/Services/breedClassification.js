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

		// Convert the raw text to capitalizing each first letter of a sentence
		const resultRaw = predictions[0].className.split(',')[0];
		const finalRead = resultRaw.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

		const breedData = require('./breedData.json');

		for (let i = 0; i < breedData.length; i++) {
			if (breedData[i].name === finalRead)
				resolve(finalRead);
		}

		resolve(false);
	}

	run();
});