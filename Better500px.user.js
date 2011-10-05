// Copyright (c) Nicolas Hoizey 2011
// Released under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported licence (CC BY-NC-SA 3.0) 
// http://creativecommons.org/licenses/by-nc-sa/3.0/
//
// Better500px
// UserScript to enhance 500px.com
//
// Author
// Nicolas Hoizey <nicolas@hoizey.com>
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
// @namespace     http://gasteroprod.com/
// @description   Enhances 500px.com
// @version       0.1
// @include       http://500px.com/*
// @include       http://*.500px.com/*
// ==/UserScript==

// 500px already uses jQuery
var $ = unsafeWindow.jQuery;

