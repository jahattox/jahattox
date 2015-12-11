(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/js/template_assets/03. cbpAnimatedHeader.js                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * cbpAnimatedHeader.js v1.0.0                                         //
 * http://www.codrops.com                                              //
 *                                                                     //
 * Licensed under the MIT license.                                     //
 * http://www.opensource.org/licenses/mit-license.php                  //
 *                                                                     //
 * Copyright 2013, Codrops                                             //
 * http://www.codrops.com                                              //
 */                                                                    //
if (window.location.pathname === '/') {                                // 11
	var cbpAnimatedHeader = (function () {                                // 12
                                                                       //
		var docElem = document.documentElement,                              // 14
		    header = document.querySelector('.navbar-fixed-top'),            //
		    didScroll = false,                                               //
		    changeHeaderOn = 200;                                            //
                                                                       //
		function init() {                                                    // 19
			window.addEventListener('scroll', function (event) {                // 20
				if (!didScroll) {                                                  // 21
					didScroll = true;                                                 // 22
					setTimeout(scrollPage, 250);                                      // 23
				}                                                                  //
			}, false);                                                          //
		}                                                                    //
                                                                       //
		function scrollPage() {                                              // 28
			var sy = scrollY();                                                 // 29
			if (header == null) {                                               // 30
				header = document.querySelector('.navbar-fixed-top');              // 31
			}                                                                   //
			if (sy >= changeHeaderOn) {                                         // 33
				classie.remove(header, 'navbar-expanded');                         // 34
			} else {                                                            //
				classie.add(header, 'navbar-expanded');                            // 37
			}                                                                   //
			didScroll = false;                                                  // 39
		}                                                                    //
                                                                       //
		function scrollY() {                                                 // 42
			return window.pageYOffset || docElem.scrollTop;                     // 43
		}                                                                    //
                                                                       //
		init();                                                              // 46
	})();                                                                 //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
