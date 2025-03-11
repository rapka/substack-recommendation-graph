import { readFileSync } from 'node:fs';

import getRecommendations from './getRecommendations.js';

let blogsToProcess = [];
let outputFilePath = '';
let depth = 3;

if (process.argv[4] && parseInt(process.argv[4])) {
	depth = parseInt(process.argv[4]);
	console.log(`Using depth: ${depth}`);
} else {
	console.log(`Using default depth: ${depth}`);
}

// Scrape single blog
if (process.argv[2] === 'url') {
	if (!process.argv[3]) {
		console.error('No input url specified.');
		process.exit();
	}

	const rootUrl = process.argv[3];
	blogsToProcess.push(rootUrl);
	outputFilePath = `./datasets/${rootUrl.replaceAll('.', '_')}-${depth}.json`;
	console.log(`Saving recommendations for url ${process.argv[3]} to ${outputFilePath}`);
// Scrape from a list of blogs
} else if (process.argv[2] === 'list') {
	if (!process.argv[3]) {
		console.error('No input file specified.');
		process.exit();
	}

	const blogListFilename = process.argv[3];
	const blogListPath = `./data/${blogListFilename}`;

	try {
		blogsToProcess = JSON.parse(readFileSync(blogListPath));
	} catch (err) {
		console.error(`Error loading blog list: ${err}`);
		process.exit();
	}

	outputFilePath = `./datasets/${blogListFilename.replaceAll('.json', '')}-${depth}.json`;
	console.log(`Saving recommendations for ${blogsToProcess.length} blogs in ${blogListPath} to ${outputFilePath}`);
} else {
	console.error(`Invalid input flag: ${process.argv[2]}`);
	process.exit();
}

if (process.argv[5] === 'append') {
	outputFilePath = './datasets/allBlogs.json';
}

let initialBlogData;

try {
	const initialBlogData = JSON.parse(readFileSync(outputFilePath));
	console.log(`Existing blog data read from ${outputFilePath}`);
} catch (err) {
	console.log(`No valid existing file at ${outputFilePath}. Creating a new one.`);
	initialBlogData = {}
}


for (let i = 0; i < blogsToProcess.length; i++) {
	await getRecommendations(blogsToProcess[i], initialBlogData, outputFilePath, depth);
}
