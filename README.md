# substack-recommendation-graph

The Substack Recommendation Graph is a dataset representing the Substack blogosphere and centered on the extensive "Gender Critical" anti-transgender and race science networks present on the platform.

Substack's management has been [shown to be connected](https://www.polemics.md/substacks-ceo-sure-is-cozy-with-the-right-2/) to the far-right content present on the website. This dataset, created by following the "recommended" blog list feature of Substack, shows how connected these networks are. It's my hope that this data will help shine a light on the emergence of these networks of hate.

Also included in this repo are scripts for scraping recommendation networks from specific blogs and converting the data to other formats for analysis.


## Datasets

The `datasets` directory contains JSON files containing the recommendation networks of several individual blogs as well as list of anti-transgender and race science blogs stored in `data/terfBlogs.json` and `data/raceBlogs.json` respectively. Additionally, both lists are merged into `data/combinedBlogs.json`, making data/combinedBlogs-3.json the largest and most comprehensive data set.


The `datasets-csv` directory contains all of the datasets converted into edge list CSV files capable of being [visualized by Gephi](https://docs.gephi.org/User_Manual/Import_CSV_Data/
). Blog names are simplified for readability purposes.

All data was generated between 3/15/2025 and 3/17/2025.


## Scripts

### Installation

The scripts for scraping and converting data are written in [NodeJS](https://nodejs.org/en) 22. Ensure you have the right version installed and install dependencies by running `npm install`.

### Scraping

##### Individual Blogs

`npm run scrape url {url} {depth}` will scrape recommendations from the specified URL into a JSON file at `datasets/{url}-{depth}.json` containing data relating to `blogUrl` and all blogs within `depth` degrees of separation (defaults to 3).

##### List of Blogs

`npm run scape list {file.json} {depth}` will read from a list of URLs specified by a file (i.e. `raceBlogs.json` or `terfBlogs.json`) in the `data` directory.

`npm run scrape list {blogUrl} {depth}` will create a JSON file at `data/{blogUrl}-{depth}.json`

Adding `append` as a final argument (i.e. `npm run scrape www.aporiamagazine.com append`) will combine scraped data into `data/blogs.json` rather than a new file.

Note on url formatting: Some custom domains are configured to include `www.` in their names (i.e. "christopherrufo.com") while most will. Attempting to use an invalid url will throw an `ENOTFOUND` error.

The scraping script defaults to delaying requests by 1000ms to avoid ratelimiting. This can be overriden using the `REQUEST_DELAY` environment variable.


#### Conversion scripts

`npm run convert {filneame}` will convert a JSON file in the `datasets` directory into a corresponding CSV file in `datasets-csv`.

