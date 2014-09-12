// Copyright (c) Nicolas Hoizey 2011-2014
// Released under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported licence (CC BY-NC-SA 3.0)
// http://creativecommons.org/licenses/by-nc-sa/3.0/
//
// Better500px
// UserScript to enhance 500px.com
// http://lab.gasteroprod.com/Better500px-UserScript/
//
// Author
// Nicolas Hoizey <nicolas@hoizey.com>
// http://gasteroprod.com/
//
// --------------------------------------------------------------------
// This is a UserScript.
//
// To install it on Firefox, you need the Greasemonkey addon:
//   http://greasemonkey.mozdev.org/
// Nothing is needed to install it on Chrome
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Better500pxRss
// @namespace     com.gasteroprod.lab.500px
// @description   Enhances 500px.com gallery and favorites pages with link to the RSS feeds
// @version       1.2.1
// @include       http://500px.com/*
// ==/UserScript==

(function(w, d) {
	if (w.location.href.match(/^http:\/\/500px\.com\/([-0-9a-z_]+)(\/favorites)?$/i)) {
		// first remove existing feed links
		var head = d.querySelector('head'),
				rssLinks = head.querySelectorAll('link[type="application/rss+xml"]'),
				nbLinks = rssLinks.length;
		for (var i = 0; i < nbLinks; i++) {
			var thisLink = rssLinks[i];
			thisLink.parentNode.removeChild(thisLink);
		}

		// then add the one that will be useful
		var newLink = d.createElement('link'),
				userName = d.querySelector('.person .info h1').innerHTML;
		newLink.setAttribute('rel', 'alternate');
		newLink.setAttribute('type', 'application/rss+xml');
		newLink.setAttribute('href', w.location.href + '/rss.rss');
		newLink.setAttribute('title', userName + ' ' + (w.location.href.match(/\/favorites$/i) ? 'favorites' : 'photos'));
		head.appendChild(newLink);
	}
}(window, document));
