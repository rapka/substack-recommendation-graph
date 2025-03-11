# substack-recommendation-graph

An Obsidian vault used for tracking and graphing right wing Substack blogs, with a particular focus on the race science, anti-vaccine, and gender critical blogospheres.

This repo consists of Markdown files named after each blog; each link in the file represents a recommendation on that Substack.

Its intent is to be visualized with Obsidian's graph mode for visualizing notes (to be added). It's my hope that this data will help shine a light on the emergence of these networks of hate.


### Usage

#### Installation

This is a Node project built for versions 22 and up.

#### Scraping


##### Individual Blogs

`npm run scrape url {url} {depth}` will scrape recommendations from the specified URL into a JSON file at `datasets/{url}-{depth}.json` containing data relating to `blogUrl` and all blogs within `depth` degrees of separation.

##### List of Blogs

`npm run scape list raceBlogs.json {depth}` will read from a list of urls specified by a file in the `data` directory.

`npm run scrape list {blogUrl} {depth}` will create a JSON file at `data/{blogUrl}-{depth}.json`

Adding `append` as a final argument (i.e. `npm run scrape www.aporiamagazine.com append`) will combine scraped data into `data/blogs.json` rather than a new file.

Note on url formatting: Some custom domains will redirect to a version that includes `www.` (i.e. "www.aporiamagazine.com") while others don't. Be careful to use the correct domain.


### Dataset

#### Methodology

The existing `data/blogs.json` in this repo was collected by hand over the weekend of April 27, 2024. Substack defaults blog names to "{Person}'s Newsletter"; I didn't notice any conflicts caused by this, but I may have missed them or made a typo somewhere. Blogs are added in the order they're listed on each Subtack's `/recommendations` page, which I believe is reverse chronological order.


#### Future work

With a few exceptions, there is currently no data in any blog pages besides their recommendations list. In the future, I hope to add tags on GC and race science blogs to better visualize how the blogosphere works as well as links to the blogs in question.


this data was generated between 12/19/2024 and 12/26/2024 by accessing the following blogs with depth 3

www.aporiamagazine.com
cremieux.xyz
astralcodexten.com
christopherrufo.com
razibkhan.com
balajis.com
www.stevesailer.net
www.jollyheretic.com
www.emilkirkegaard.com
basedcamppodcast.substack.com

genspect.substack.com
jessesingal.substack.com
www.libsoftiktok.com
restorechildhood.substack.com
lgbtcouragecoalition.substack.com
juliebindel.substack.com
elizamondegreen.sub
www.realityslaststand.com

