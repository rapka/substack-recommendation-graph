import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import getRecommendations from './getRecommendations.js';

let blogsToProcess = [];
let outputFilePath = '';
let maxDepth = 3;

const currentPath = dirname(fileURLToPath(import.meta.url));

if (process.argv[4] && parseInt(process.argv[4])) {
	maxDepth = parseInt(process.argv[4]);
	console.log(`Using depth: ${maxDepth}`);
} else {
	console.log(`Using default depth: ${maxDepth}`);
}

const currentDepth = maxDepth.valueOf();


// Scrape single blog
if (process.argv[2] === 'url') {
	if (!process.argv[3]) {
		console.error('No input url specified.');
		process.exit();
	}

	const rootUrl = process.argv[3];
	blogsToProcess.push(rootUrl);
	outputFilePath = join(currentPath, '..', 'datasets', `${rootUrl.replaceAll('.', '_')}-${maxDepth}.json`);
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

	outputFilePath = join(currentPath, '..' ,'datasets', `${blogListFilename.replaceAll('.json', '')}-${maxDepth}.json`);
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
	initialBlogData = JSON.parse(readFileSync(outputFilePath));
	console.log(`Existing blog data read from ${outputFilePath}`);
} catch (err) {
	console.log(`No valid existing file at ${outputFilePath}. Creating a new one.`);
	initialBlogData = {};
}


for (let i = 0; i < blogsToProcess.length; i++) {
	await getRecommendations(blogsToProcess[i], initialBlogData, outputFilePath, maxDepth, currentDepth);
}
