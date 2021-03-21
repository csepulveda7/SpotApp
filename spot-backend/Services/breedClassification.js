const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');
const breedData = require('./breedData.json');

// this should recieve and image (as a byte array)
exports.classifyBreed = () => new Promise((resolve) => {
	async function run() {
		try {
			// Load the model.
			const model = await mobilenet.load();

			// Create image buffer array and decode
			const imageBuffer = fs.readFileSync(__dirname + '/breedImage.jpg');
			const tfimage = tfnode.node.decodeImage(imageBuffer);

			// Classify the image.
			const predictions = await model.classify(tfimage);

			// Convert the raw text to capitalizing each first letter of a sentence
			const resultRaw = predictions[0].className.split(',')[0];
			let finalRead = resultRaw.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

			const exceptionBreeds = [
				['Cardigan', 'Cardigan Welsh Corgi'],
				['Pembroke', 'Pembroke Welsh Corgi'],
				['Dingo', 'Shiba Inu'],
				['Mexican Hairless', 'Xoloitzcuintli']
			];

			for (let i = 0; i < exceptionBreeds.length; i++) {
				if (exceptionBreeds[i][0] === finalRead)
					finalRead = exceptionBreeds[i][1];
			}

			console.log(finalRead);

			for (let i = 0; i < breedData.length; i++) {
				if (breedData[i].name === finalRead)
					resolve(finalRead);
			}

			resolve(false);
		}
		catch (e) {
			console.error(e);
			resolve(false);
		}
	}

	run();
});