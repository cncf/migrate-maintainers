"use strict";

const file = require('./file.js');

function importJsonFile (filePath) {
	return file.read(filePath)
		.then(textFileData => {
			return JSON.parse(textFileData);
		});
};

module.exports = importJsonFile;
