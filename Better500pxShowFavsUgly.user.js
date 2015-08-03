// Copyright (c) Nicolas Hoizey 2011-2014
// Released under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported licence (CC BY-NC-SA 3.0)
// http://creativecommons.org/licenses/by-nc-sa/3.0/
//
// Better500px
// UserScripts to enhance 500px.com
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
// @name          Better500pxShowFavsUgly
// @namespace     com.gasteroprod.lab.500px
// @description   Enhances 500px.com with fav indicators on thumbs
// @version       1.0.0
// @include       https://500px.com/*
// @exclude       https://500px.com/stories
// @exclude       https://500px.com/blog
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function showFavsUgly() {
  jQuery("head").append("\
    <style>\
    .photo .fav { position: absolute; top: 1px; right: 1px; width: 20px; height: 20px; font-size: 20px; color: #c33; text-shadow: 2px 1px 3px rgba(0, 0, 0, 0.75); line-height: 1.1; text-align: center; overflow: hidden; }\
    .photo .yes { color: #6c6; }\
    </style>\
    ");

  setInterval(function loadPhotoInfos() {
    jQuery('.photos div.photo, .container div.photo').not('.Better500pxShowFavs').not('.loading').slice(0, 5).each(function () {
      var that = jQuery(this),
          photo = that.find('[data-ga-action="Title"]').eq(0),
          photoUrl = photo.attr('href');
      that.addClass('loading');
      jQuery.ajax({
        dataType: "html",
        url: photoUrl,
        context: that,
        success: function(data) {
            if (data.match(/,"favorited":true,/)) {
              $(this).append('<div class="fav yes">❤</div>');
            } else {
              $(this).append('<div class="fav">×</div>');
            }
          },
        error: function (jqxhr, textStatus, error) {
            $(this).append('<div class="fav fav0">?</div>');
          },
        complete: function () {
            $(this).addClass('Better500pxShowFavs').removeClass('loading');
          }
      });
    });
  }, 1000);
}

// load jQuery and execute the main function
addJQuery(showFavsUgly);

