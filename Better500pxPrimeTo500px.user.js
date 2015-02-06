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
// @name          Better500pxPrimeTo500px
// @namespace     com.gasteroprod.lab.500px
// @description   Enhances prime.500px.com photo pages with a link to the same photo on the main 500px site
// @version       1.2.0
// @include       https://prime.500px.com/photos/*
// ==/UserScript==

(function(w, d) {
	parElt = d.querySelector('.navbar-right');
	url = w.location.href.replace(/https:\/\/prime\.500px\.com\/photos\//,'https://500px.com/photo/');
	newLink = '<li><a class="" href="' + url + '">View on 500px</a></li>';
	parElt.innerHTML = newLink + parElt.innerHTML;
}(window, document));
