import { readFileSync, writeFileSync } from 'node:fs';

const taggedBlogs = JSON.parse(readFileSync('./data/taggedBlogs.json'));
const allBlogs = JSON.parse(readFileSync('./datasets/allblogs.json'));

// const allBlogs = {};

console.log(process.argv);
console.log('t', taggedBlogs);

const observableBlogs = {
	nodes: [],
	links: [],
};

const missedBlogs = [];


for (const [domain, blogData] of Object.entries(allBlogs)) {
	const currentBlog = {
		id: domain,
		group: 2,
	};

  console.log(`${domain}: ${blogData}`);
  observableBlogs.nodes.push(currentBlog);

	for (let i = 0; i < blogData.recommendations.length; i++) {
		// console.log('targ', blogData.recommendations[i]);
		const currentRec = blogData.recommendations[i];
	  observableBlogs.links.push({
	  	source: domain,
	  	target: currentRec,
	  	value: 1,
	  });

	  // console.log('aaa', allBlogs[currentRec]);
	  if (!allBlogs[currentRec] && !missedBlogs.includes(currentRec)) {
	  	console.log('pushing', currentRec);
	  	missedBlogs.push(currentRec);
	  	observableBlogs.nodes.push({
	  		id: currentRec,
	  		group: 2,
	  	});
	  }
  }
};

console.log(`ndoes: ${observableBlogs.nodes.length} links: ${observableBlogs.links.length} `);

// writeFileSync('./src/observableBlogs.json', JSON.stringify(observableBlogs, null, 2));
