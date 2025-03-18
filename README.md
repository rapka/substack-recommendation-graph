# substack-recommendation-graph

The Substack Recommendation Graph is a dataset representing the Substack blogosphere and centered on the extensive "Gender Critical" anti-transgender and race science networks present on the platform.

Substack's management has been [shown to be connected](https://www.polemics.md/substacks-ceo-sure-is-cozy-with-the-right-2/) to the far-right content present on the website. This dataset, created by following the "recommended" blog list feature of Substack, shows how connected these networks are. It's my hope that this data will help shine a light on the emergence of these networks of hate.

Also included in this repo are scripts for scraping recommendation networks from specific blogs and converting the data to other formats for analysis.


## Scripts

### Installation

The scripts for scraping and converting data are written in NodeJS 22.

### Scraping


##### Individual Blogs

`npm run scrape url {url} {depth}` will scrape recommendations from the specified URL into a JSON file at `datasets/{url}-{depth}.json` containing data relating to `blogUrl` and all blogs within `depth` degrees of separation.

##### List of Blogs

`npm run scape list {file.json} {depth}` will read from a list of URLs specified by a file (i.e. `raceBlogs.json` or `terfBlogs.json`) in the `data` directory.

`npm run scrape list {blogUrl} {depth}` will create a JSON file at `data/{blogUrl}-{depth}.json`

Adding `append` as a final argument (i.e. `npm run scrape www.aporiamagazine.com append`) will combine scraped data into `data/blogs.json` rather than a new file.

Note on url formatting: Some custom domains are configured to include `www.` in their names (i.e. "christopherrufo.com") while most will. Attempting to use an invalid url will throw an `ENOTFOUND` error.


#### Conversion scripts

`npm run convert {filneame}` will convert a json file in the `datasets` directory to a CSV file capable of being [load into Gephi](https://docs.gephi.org/User_Manual/Import_CSV_Data/
).


### Dataset


#### Future work

With a few exceptions, there is currently no data in any blog pages besides their recommendations list. In the future, I hope to add tags on GC and race science blogs to better visualize how the blogosphere works as well as links to the blogs in question.


This data was generated between 3/15/2025 and 3/217/2025 by accessing the following blogs with depth 3
