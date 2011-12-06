// Copyright (c) Nicolas Hoizey 2011
// Released under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported licence (CC BY-NC-SA 3.0) 
// http://creativecommons.org/licenses/by-nc-sa/3.0/
//
// Better500px
// UserScript to enhance 500px.com
// http://dev.gasteroprod.com/Better500px-UserScript/
//
// Author
// Nicolas Hoizey <nicolas@hoizey.com>
// http://gasteroprod.com/
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Better500px", and click Uninstall.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Better500px
// @namespace     com.gasteroprod.dev.500px
// @description   Enhances 500px.com
// @version       1.1
// @include       http://500px.com/*
// @include       http://*.500px.com/*
// ==/UserScript==

var better500px = function() {
    var isConnected = false,
        username = '';

    // 500px already uses jQuery
    if (typeof unsafeWindow != 'undefined') {
   		jQuery = unsafeWindow.jQuery;
   	} else {
   		$.noConflict();
   	}

    jQuery("head").append(" \
        <style> \
        .photos .thumb .info .right { opacity: 100; } \
        .photos .thumb .fav, .search_result .search_result_photo .fav { position: absolute; top: 3px;right: 3px; width: 16px; height: 16px; overflow: hidden; } \
        .search_result_photo { position: relative; } \
        </style> \
        ");

    // check if the user is connected and get his username
    if (jQuery('#menu_profile_login').length == 0) {
        var isConnected = true;
        var username = jQuery('#menu_profile .username').attr('href').replace(/\//,'');
    }

    if (isConnected) {

        // check if this is a page with a list of photos
        if (jQuery('.photos').length > 0) {

            // check if this is not my own favorites page
            var isOwnFavorites = new RegExp('^http://500px.com/' + username + '/favorites');
            if (!isOwnFavorites.exec(location.href)) {
                // show for each photo if it is already a favorite
                jQuery('.thumb').each(function() {
                    var that = jQuery(this);
                    var url = that.find('a.image').attr('href');
                    that.append('<div class="fav"></div>').find('.fav').load(url + ' #fave_link');
                    that = null;
                    url = null;
                });
            }
        }

        // check if this is a search result with a list of photos
        if (jQuery('.search_result_photo').length > 0) {

            // show for each photo if it is already a favorite
            jQuery('.search_result_photo').each(function() {
                var that = jQuery(this);
                var url = that.find('a').attr('href');
                that.append('<div class="fav"></div>').find('.fav').load(url + ' #fave_link');
                that = null;
                url = null;
            });
        }

    }
}

// taken from @freeatnet_en's 500px_infscroll GM script
if (navigator.userAgent.match(/Firefox/)) {
	unsafeWindow.onload = better500px;
} else if (navigator.userAgent.match(/Chrome/)) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + better500px.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
} else {
	alert("I do not know what to do :(");
}