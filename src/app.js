import koa from 'koa';
import RSS from 'rss';
import Client from 'oc-news-js';

import config from '../config.json';

const client = new Client(config.endpoint, config.username, config.password);
const app = koa();

app.experimental = true;

let cachedFolder = null;
/**
 * Get the folder we should get the items from, or the client if we want all items
 */
async function getItemSource () {
	if (config.folderId) {
		if (!cachedFolder) {
			const folders = await client.listFolders();
			for (let folder of folders) {
				if (folder.id === config.folderId) {
					cachedFolder = folder;
				}
			}
		}
		return cachedFolder;
	} else {
		return client;
	}
}

app.use(async function () {
	const source = await getItemSource();
	const items = await source.getItems();

	const feed = new RSS(config.feedOptions);
	for (let item of items) {
		feed.item({
			title: item.title,
			description: item.body,
			url: item.url,
			guid: item.guid,
			author: item.author,
			date: new Date(item.pubDate * 1000)
		});
	}

	this.body = feed.xml({indent: true});
});

app.listen(config.port);
console.log('Running on port ' + config.port);
