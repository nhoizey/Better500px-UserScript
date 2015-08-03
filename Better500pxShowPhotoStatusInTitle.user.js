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
// @name          Better500pxShowStatusInTab
// @namespace     com.gasteroprod.lab.500px
// @description   Enhances 500px.com photo page with a ❤ in the window/tab title when a it is already faved
// @version       1.1.0
// @include       http://500px.com/*
// @include       https://500px.com/*
// ==/UserScript==

(function(w, d) {
  // Check if this is a user gallery page
  if (d.getElementsByTagName('html')[0].classList.contains('photos_show')) {
    // Check every 2 seconds if the photo is liked and/or favorited
    w.setInterval(function (w, d, photoTitle) {
      var title = '';
      if (d.querySelectorAll('.favorite_wrap .favorited').length) {
        title += '❤ ';
      }
      d.querySelector('title').innerHTML = title + photoTitle;
    }, 2000, w, d, d.querySelector('title').innerHTML);
  }
}(window, document));
