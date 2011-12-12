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
// This is a UserScript.
//
// To install it on Firefox, you need the Greasemonkey addon:
//   http://greasemonkey.mozdev.org/
// Nothing is needed to install it on Chrome
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Better500px
// @namespace     com.gasteroprod.dev.500px
// @description   Enhances 500px.com
// @version       1.4
// @include       http://500px.com/*
// @include       http://*.500px.com/*
// ==/UserScript==

var better500px = function () {
    var isConnected = false,
        username = '',
        allLoaded = false,
        sortByDateHtml = jQuery('.rightside .photos').clone(),
        sortByScoreHtml = '',
        sortByFavsHtml = '';

    jQuery("head").append(" \
        <style> \
        .photos .thumb .info .right { opacity: 100; } \
        .photos .thumb .fav, .search_result .search_result_photo .fav { position: absolute; top: 3px;right: 3px; width: 16px; height: 16px; overflow: hidden; } \
        .search_result_photo { position: relative; } \
        .sortby ul { display: inline; }\
        .sortby li { display: inline; padding: .3em; }\
        .sortby li:after { content: ','; }\
        .sortby li:last-child:after { content: none; }\
        .sortby .active { font-weight: bold; }\
        .sortby a { cursor: pointer; }\
        .sortby .loading { padding-left: 20px; background: url('/icons/fave_loader.gif') no-repeat top left; }\
        </style> \
        ");

    // check if the user is connected and get his username
    if (jQuery('#menu_profile_login').length == 0) {
        var isConnected = true;
        var username = jQuery('#menu_profile .username').attr('href').replace(/\//, '');

        // check if this is a page with a list of photos
        if (jQuery('.photos').length > 0) {

            // check if this is not my own favorites page
            var isOwnFavorites = new RegExp('^http://500px.com/' + username + '/favorites');
            if (!isOwnFavorites.exec(location.href)) {

                setInterval(function(){
                    // show for each photo if it is already a favorite
                    jQuery('.thumb').not('.better500px').slice(0, 5).each(function () {
                        var that = jQuery(this);
                        var url = that.find('a.image').attr('href');
                        that.append('<div class="fav"></div>').find('.fav').load(url + ' #fave_link');
                        that.addClass('better500px');
                        that = null;
                        url = null;
                    });
                }, 500);
            }
        }

        // check if this is a search result with a list of photos
        if (jQuery('.search_result_photo').length > 0) {

            setInterval(function(){
                // show for each photo if it is already a favorite
                jQuery('.search_result_photo').not('.better500px').slice(0, 5).each(function () {
                    var that = jQuery(this);
                    var url = that.find('a').attr('href');
                    that.append('<div class="fav"></div>').find('.fav').load(url + ' #fave_link');
                    that.addClass('better500px');
                    that = null;
                    url = null;
                });
            }, 500);
        }

        jQuery('.tabs').after('<div class="sortby">Sort by<ul><li class="active"><a class="date">date</a></li><li><a class="score">score</a></li><!--<li><a class="favs">favorites</a></li>--></ul></div>');
        jQuery('.sortby a').bind('click', function() {
                var that = jQuery(this);
                var type = that.attr('class');
                var previousType = jQuery('.sortby li.active a').attr('class');
                if (type != previousType) {
                    jQuery('.sortby li').removeClass('active');
                    that.parent().addClass('active');
                    switch(type) {
                        case 'date':
                            if (sortByDateHtml != '') {
                                jQuery('.rightside .photos').replaceWith(sortByDateHtml);
                            }
                            break;
                        case 'score':
                            if (sortByScoreHtml != '') {
                                jQuery('.rightside .photos').replaceWith(sortByScoreHtml);
                            } else {
                                jQuery('.sortby .score').parent().addClass('loading');
                                loadAll(sortByScore);
                            }
                            break;
                        case 'favs':
                            if (sortByFavsHtml != '') {
                                jQuery('.rightside .photos').replaceWith(sortByFavsHtml);
                            } else {
                                jQuery('.sortby .favs').parent().addClass('loading');
                                loadAll(sortByFavs);
                            }
                            break;
                        default:
                            // what?
                    }
                }
            });
        sortByDateHtml = jQuery('.rightside .photos').clone();
    }

    var loadAll = function (loadAllCallback) {
        if (allLoaded) {
            loadAllCallback();
        } else {
            var nextPage = jQuery(".photo_paginate .next_page").attr("href");
            if (nextPage == null || nextPage == undefined) {
                jQuery('.photo_paginate').remove();
                allLoaded = true;
                sortByDateHtml = jQuery('.rightside .photos').clone();
                loadAllCallback();
                return;
            } else {
                jQuery(".photo_paginate .next_page").attr("href", null);
                jQuery.get(nextPage, function (data) {
                    var jData = jQuery(data);
                    jData.find(".photos.profile .thumb").appendTo(".photos.profile");
                    jQuery(".photo_paginate").replaceWith(jData.find(".photo_paginate"));
                    loadAll(loadAllCallback);
                });
            }
        }
    }

    var sortByScore = function () {
        $('.photos .thumb, .search_result_photo').sortElements(function(a, b){
            var aValue = $(a).find('.right').text().trim();
            var bValue = $(b).find('.right').text().trim();
            aValue = (aValue == 'N/A') ? 0 : parseInt(aValue, 10);
            bValue = (bValue == 'N/A') ? 0 : parseInt(bValue, 10);
            return aValue > bValue ? -1 : 1;
        });
        jQuery('.sortby .loading').removeClass('loading');
        sortByScoreHtml = jQuery('.rightside .photos').clone();
    }

    var sortByFavs = function () {
        $('.photos .thumb, .search_result_photo').sortElements(function(a, b){
            var aValue = $(a).find('.right').text().trim();
            var bValue = $(b).find('.right').text().trim();
            aValue = (aValue == 'N/A') ? 0 : parseInt(aValue, 10);
            bValue = (bValue == 'N/A') ? 0 : parseInt(bValue, 10);
            return aValue > bValue ? -1 : 1;
        });
        jQuery('.sortby .loading').removeClass('loading');
        sortByFavsHtml = jQuery('.rightside .photos').clone();
    }
}

var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js');
jQueryScript.addEventListener('load', function () {
    var sortElementsScript = document.createElement('script')
    sortElementsScript.setAttribute('src', 'https://raw.github.com/padolsey/jQuery-Plugins/master/sortElements/jquery.sortElements.js');
    sortElementsScript.addEventListener('load', function() {
        var better500pxScript = document.createElement('script');
        better500pxScript.textContent = '(' + better500px.toString() + ')();';
        document.body.appendChild(better500pxScript);
    }, false);
    document.body.appendChild(sortElementsScript);
}, false);
document.body.appendChild(jQueryScript);
