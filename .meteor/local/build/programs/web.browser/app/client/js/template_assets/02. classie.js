(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/js/template_assets/02. classie.js                            //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*!                                                                    //
 * classie - class helper functions                                    //
 * from bonzo https://github.com/ded/bonzo                             //
 *                                                                     //
 * classie.has( elem, 'my-class' ) -> true/false                       //
 * classie.add( elem, 'my-new-class' )                                 //
 * classie.remove( elem, 'my-unwanted-class' )                         //
 * classie.toggle( elem, 'my-class' )                                  //
 */                                                                    //
                                                                       //
/*jshint browser: true, strict: true, undef: true */                   //
                                                                       //
(function (window) {                                                   // 14
                                                                       //
  'use strict';                                                        // 16
                                                                       //
  // class helper functions from bonzo https://github.com/ded/bonzo    //
                                                                       //
  function classReg(className) {                                       // 20
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");            // 21
  }                                                                    //
                                                                       //
  // classList support for class management                            //
  // altho to be fair, the api sucks because it won't accept multiple classes at once
  var hasClass, addClass, removeClass;                                 // 26
                                                                       //
  if ('classList' in document.documentElement) {                       // 28
    hasClass = function (elem, c) {                                    // 29
      return elem.classList.contains(c);                               // 30
    };                                                                 //
    addClass = function (elem, c) {                                    // 32
      elem.classList.add(c);                                           // 33
    };                                                                 //
    removeClass = function (elem, c) {                                 // 35
      elem.classList.remove(c);                                        // 36
    };                                                                 //
  } else {                                                             //
    hasClass = function (elem, c) {                                    // 40
      return classReg(c).test(elem.className);                         // 41
    };                                                                 //
    addClass = function (elem, c) {                                    // 43
      if (!hasClass(elem, c)) {                                        // 44
        elem.className = elem.className + ' ' + c;                     // 45
      }                                                                //
    };                                                                 //
    removeClass = function (elem, c) {                                 // 48
      elem.className = elem.className.replace(classReg(c), ' ');       // 49
    };                                                                 //
  }                                                                    //
                                                                       //
  function toggleClass(elem, c) {                                      // 53
    var fn = hasClass(elem, c) ? removeClass : addClass;               // 54
    fn(elem, c);                                                       // 55
  }                                                                    //
                                                                       //
  var classie = {                                                      // 58
    // full names                                                      //
    hasClass: hasClass,                                                // 60
    addClass: addClass,                                                // 61
    removeClass: removeClass,                                          // 62
    toggleClass: toggleClass,                                          // 63
    // short names                                                     //
    has: hasClass,                                                     // 65
    add: addClass,                                                     // 66
    remove: removeClass,                                               // 67
    toggle: toggleClass                                                // 68
  };                                                                   //
                                                                       //
  // transport                                                         //
  if (typeof define === 'function' && define.amd) {                    // 72
    // AMD                                                             //
    define(classie);                                                   // 74
  } else {                                                             //
    // browser global                                                  //
    window.classie = classie;                                          // 77
  }                                                                    //
})(window);                                                            //
/*global define: false */                                              //
/////////////////////////////////////////////////////////////////////////

}).call(this);
