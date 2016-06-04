/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

window.addEventListener('scroll', function() {

	var docElem = document.documentElement,
		headerSelector = '.navbar-fixed-top:not(.navbar-subpage)',
		header = document.querySelector( headerSelector ),
		didScroll = false,
		changeHeaderOn = 200;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 250 );
			}
		}, false );
	}

	function scrollPage() {
		if ( window.location.pathname === '/' ) {
			var sy = scrollY();
			if (header == null) {
				header = document.querySelector( headerSelector );
			}
			if ( sy >= changeHeaderOn ) {
				classie.remove( header, 'navbar-expanded' );
			}
			else {
				classie.add( header, 'navbar-expanded' );
			}
			didScroll = false;
		}
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

});

$(document).ready(function() {
	$(window).trigger('scroll');
});