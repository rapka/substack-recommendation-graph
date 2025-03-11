import Parser from '@postlight/parser';
import { writeFileSync } from 'node:fs';
import { setTimeout } from 'node:timers/promises';

// Delay
const SCRAPE_DELAY = 500;

//  Parse Substack root url from lead_image_url
const getSubstackUrl = (baseUrl) => {
	return decodeURI(decodeURI(baseUrl)
		.replace(/.*steep\//, '')
		.replace(/.*https%3A%2F%2F/, ''))
		.replace(/%2F.*/, '');
};

const getRecommendations = async (url, allBlogData, outputFilePath, currentDepth) => {

	const blogData = {
		domain: url,
		recommendations: [],
	};

	const RecommendationsExtractor = {
		domain: url,
		content: {
		  selectors: ['div.recommended-publications-container'],
		},
    extend: {
      recommendations: {
        selectors: [['div.recommendation-body div.top-row a', 'href']],
        allowMultiple: true,
      },
      substackUrl: {
      	selectors: [['meta', 'content']],
      	allowMultiple: true,
      }
    },
	};

	try {
		// Check that recommendation data doesn't exist
		if (!allBlogData[blogData.domain] || !allBlogData[blogData.domain].recommendations) {
			const result = await Parser.parse(`http://${url}/recommendations`, { customExtractor: RecommendationsExtractor });

			if (result.error) {
				console.log(`Error fectching recommendations for ${blogData.domain}: ${JSON.stringify(result)}`);
				return;
			}

			if (result.recommendations) {
				blogData.recommendations = result.recommendations.map(rec => rec.split(/\/[?#]/)[0].replace(/https\:\/\//, ''));
			}

			if (result.lead_image_url) {
				blogData.substackUrl = getSubstackUrl(result.lead_image_url);
			}

			await setTimeout(SCRAPE_DELAY);
		} else {
			// Reuse existing recommendations
			blogData.recommendations = allBlogs[blogData.domain].recommendations;
		}


		// Get blog metadata
		if (!allBlogData[blogData.domain]) {
			const rootResult = await Parser.parse(`http://${url}`);

			if (rootResult.error) {
				console.log(`Error fetching blog metadata for ${url}: ${JSON.stringify(rootResult)}`);
				return;
			}

			blogData.url = rootResult.url;
			blogData.title = (rootResult.title || 'Unknown Title').replace(' | Substack', '');
			blogData.description = (rootResult.excerpt || 'Unknown Description').replace(/ Click to read.*/, '');
			allBlogData[blogData.domain] = blogData;

			await setTimeout(SCRAPE_DELAY);

			try {
				writeFileSync(`./${outputFilePath}`, JSON.stringify(allBlogData, null, 2));
			} catch (err) {
				console.error(`Error saving to file at ${outputFilePath}: ${err}`);
			}

			console.log(`Data saved for ${blogData.domain} at depth ${currentDepth}`);
		} else {
		  // console.log(`duplicate blog: ${blogData.domain} DEPTH: ${currentDepth}`);
		}
	} catch (e) {
		console.error(`Unknown error: ${e}`);
	}

	// Break recursion
	if (currentDepth === 0) {
		return;
	}

	for (let i = 0; i < blogData.recommendations.length; i++) {
		await getRecommendations(blogData.recommendations[i], allBlogData, outputFilePath, currentDepth - 1);
	}
};

export default getRecommendations;