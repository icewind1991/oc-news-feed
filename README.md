# oc-news-feed

Export items in the ownCloud news app as rss feed

# configuration

`config.json`
```json
{
    "port": 3000, // the port this program listens on
	"endpoint": "https://icewind.nl/owncloud", // the path where ownCloud is install
	"username": "me",
	"password": "secret",
	"folderId": 7, // the folder to export, if not set all feeds will be exported
	"feedOptions": { // options for the resulting rss feed, for more options see https://github.com/dylang/node-rss
		"title": "Youtube",
		"feed_url": "http://example.com/feed",
		"site_url": "http://example.com"
	}
}

```

# Usage

- `npm install`
- `npm run build`
- `npm run start`
