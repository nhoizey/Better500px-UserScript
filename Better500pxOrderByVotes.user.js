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
// @name          Better500pxOrderByVotes
// @namespace     com.gasteroprod.lab.500px
// @description   Enhances 500px.com with a link to the search for current photographer
// @version       1.1.0
// @include       http://500px.com/*
// ==/UserScript==

(function(d) {
  // Check if this is a user gallery page
  if (d.getElementsByTagName('html')[0].classList.contains('user_show')) {
  	var photoLi = d.querySelectorAll('.bottom .subnav .nav li')[3],
  			userName = d.querySelector('.person .info h1').innerText,
  			newLi = '<li><a href="http://500px.com/search?q=' + encodeURIComponent(userName) + '">Best of</a></li>';
  	photoLi.insertAdjacentHTML('afterend', newLi);
  }
}(document));
