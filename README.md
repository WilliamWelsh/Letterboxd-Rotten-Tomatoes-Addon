# Letterboxd Rotten Tomatoes Addon

#### Overview

This is a Chrome extension that adds two features to [Letterboxd](https://letterboxd.com). You can see the score & tomato type, and a button added beside the IMDB and TMDB micro-buttons at the bottom that will link you to the film's Rotten Tomato page.

#### Image

![Image](https://i.imgur.com/fEHsYn1.png)

#### Installing

To install this, simply click "Add to Chrome" on the [Chrome Web Store](https://chrome.google.com/webstore/detail/letterboxd-rotten-tomatoe/gbagfhlcandjadfocmenciejcgncjmfd).

Link: [https://chrome.google.com/webstore/detail/letterboxd-rotten-tomatoe/gbagfhlcandjadfocmenciejcgncjmfd](https://chrome.google.com/webstore/detail/letterboxd-rotten-tomatoe/gbagfhlcandjadfocmenciejcgncjmfd) 

![Example](https://i.imgur.com/wn9Ydl8.png)

#### Installing/Editing Yourself

First, clone the repository.

Second, grab an API key from [The Open Movie Database's website](http://www.omdbapi.com/apikey.aspx). Set `OMDbAPIKey` on line 1 in `content.js` to your API key.

```js
var OMDbAPIKey = "YOUR KEY HERE";
```

Next, you need to load the unpacked extension. In Chrome, visit `chrome://extensions/`. Click "Load unpacked" and choose the directory of the repository. It should now work.

![Extensions Help](https://i.imgur.com/slc6Yst.png)