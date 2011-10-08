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
// @namespace     http://dev.gasteroprod.com/Better500px-UserScript/
// @description   Enhances 500px.com
// @version       1.0
// @include       http://500px.com/*
// @include       http://*.500px.com/*
// ==/UserScript==

// 500px already uses jQuery
var $ = unsafeWindow.jQuery;

$("head").append(" \
<style> \
.photos .thumb .info .right { opacity: 100; } \
.photos .thumb .fav, .search_result .search_result_photo .fav { position: absolute; top: 3px;right: 3px; width: 16px; height: 16px; overflow: hidden; } \
.search_result_photo { position: relative; } \
</style> \
");

// check if the user is connected and get his username
var isConnected = false;
var username = '';
if ($('#menu_profile_login').length == 0) {
    var isConnected = true;
    var username = $('#menu_profile .username').attr('href').replace(/\//,'');
}

if (isConnected) {

    // check if this is a page with a list of photos
    if ($('.photos').length > 0) {

        // check if this is not my own favorites page
        var isOwnFavorites = new RegExp('^http://500px.com/' + username + '/favorites');
        if (!isOwnFavorites.exec(location.href)) {
            // show for each photo if it is already a favorite
            $('.thumb').each(function() {
                var that = $(this);
                var url = that.find('a.image').attr('href');
                that.append('<div class="fav"></div>').find('.fav').load(url + ' #fave_link');
                that = null;
                url = null;
            });
        }
    }
    
    // check if this is a search result with a list of photos
    if ($('.search_result_photo').length > 0) {

        // show for each photo if it is already a favorite
        $('.search_result_photo').each(function() {
            var that = $(this);
            var url = that.find('a').attr('href');
            that.append('<div class="fav"></div>').find('.fav').load(url + ' #fave_link');
            that = null;
            url = null;
        });
    }
    
}
