import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentPath = dirname(fileURLToPath(import.meta.url));
const outputFilePath = join(currentPath, '..', 'datasets', process.argv[2]);
const allBlogs = JSON.parse(readFileSync(outputFilePath));

console.log(process.argv);

const outputFilename = `${process.argv[2].replace('.json', '.csv')}`;

const simplifyName = name => name.replace('.substack.com', '').replace('www.', '');

writeFileSync(outputFilePath, 'source;target\n`');

for (const [domain, blogData] of Object.entries(allBlogs)) {
	const currentBlog = {
		id: domain,
		group: 2,
	};

  console.log(`${domain}: ${blogData}`);

	for (let i = 0; i < blogData.recommendations.length; i++) {
	 	const currentRec = blogData.recommendations[i];

		appendFileSync(outputFilePath, `${simplifyName(domain)};${simplifyName(currentRec)}\n`);
  }
};
