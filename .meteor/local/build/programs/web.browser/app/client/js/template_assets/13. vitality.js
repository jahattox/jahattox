(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/js/template_assets/13. vitality.js                           //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*!                                                                    //
 * Vitality v1.3.5 (http://themes.startbootstrap.com/vitality-v1.3.5)  //
 * Copyright 2013-2015 Start Bootstrap Themes                          //
 * To use this theme you must have a license purchased at WrapBootstrap (https://wrapbootstrap.com)
 */                                                                    //
                                                                       //
(function ($) {                                                        // 7
    "use strict"; // Start of use strict                               // 8
                                                                       //
    // Smooth Scrolling: Smooth scrolls to an ID on the current page.  //
    // To use this feature, add a link on your page that links to an ID, and add the .page-scroll class to the link itself. See the docs for more details.
    $('a.page-scroll').bind('click', function (event) {                // 12
        var $anchor = $(this);                                         // 13
        $('html, body').stop().animate({                               // 14
            scrollTop: $($anchor.attr('href')).offset().top - 50       // 15
        }, 1250, 'easeInOutExpo');                                     //
        event.preventDefault();                                        // 17
    });                                                                //
                                                                       //
    // Activates floating label headings for the contact form.         //
    $("body").on("input propertychange", ".floating-label-form-group", function (e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function () {         //
        $(this).addClass("floating-label-form-group-with-focus");      // 24
    }).on("blur", ".floating-label-form-group", function () {          //
        $(this).removeClass("floating-label-form-group-with-focus");   // 26
    });                                                                //
                                                                       //
    // Closes the Responsive Menu on Menu Item Click                   //
    $('.navbar-collapse ul li a').click(function () {                  // 30
        $('.navbar-toggle:visible').click();                           // 31
    });                                                                //
                                                                       //
    // Owl Carousel Settings                                           //
    $(".about-carousel").owlCarousel({                                 // 35
        items: 3,                                                      // 36
        navigation: true,                                              // 37
        pagination: false,                                             // 38
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
    });                                                                //
                                                                       //
    $(".portfolio-carousel").owlCarousel({                             // 45
        singleItem: true,                                              // 46
        navigation: true,                                              // 47
        pagination: false,                                             // 48
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        autoHeight: true,                                              // 53
        mouseDrag: false,                                              // 54
        touchDrag: false,                                              // 55
        transitionStyle: "fadeUp"                                      // 56
    });                                                                //
                                                                       //
    $(".testimonials-carousel").owlCarousel({                          // 59
        singleItem: true,                                              // 60
        navigation: true,                                              // 61
        pagination: true,                                              // 62
        autoHeight: true,                                              // 63
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        transitionStyle: "backSlide"                                   // 68
    });                                                                //
                                                                       //
    $(".portfolio-gallery").owlCarousel({                              // 71
        items: 3                                                       // 72
    });                                                                //
                                                                       //
    // Magnific Popup jQuery Lightbox Gallery Settings                 //
    $('.gallery-link').magnificPopup({                                 // 76
        type: 'image',                                                 // 77
        gallery: {                                                     // 78
            enabled: true                                              // 79
        },                                                             //
        image: {                                                       // 81
            titleSrc: 'title'                                          // 82
        }                                                              //
    });                                                                //
                                                                       //
    // Formstone Background - Video Background Settings                //
    $("header.video").background({                                     // 87
        source: {                                                      // 88
            poster: "assets/img/bg-mobile-fallback.jpg",               // 89
            mp4: "assets/mp4/camera.mp4"                               // 90
        }                                                              //
    });                                                                //
                                                                       //
    // Scrollspy: Highlights the navigation menu items while scrolling.
    $('body').scrollspy({                                              // 95
        target: '.navbar-fixed-top',                                   // 96
        offset: 51                                                     // 97
    });                                                                //
                                                                       //
    // Portfolio Filtering Scripts & Hover Effect                      //
    var filterList = {                                                 // 101
        init: function () {                                            // 102
                                                                       //
            // MixItUp plugin                                          //
            // http://mixitup.io                                       //
            $('#portfoliolist').mixitup({                              // 106
                targetSelector: '.portfolio',                          // 107
                filterSelector: '.filter',                             // 108
                effects: ['fade'],                                     // 109
                easing: 'snap',                                        // 110
                // call the hover effect                               //
                onMixEnd: filterList.hoverEffect()                     // 112
            });                                                        //
        },                                                             //
                                                                       //
        hoverEffect: function () {                                     // 117
                                                                       //
            // Simple parallax effect                                  //
            $('#portfoliolist .portfolio').hover(function () {         // 120
                $(this).find('.caption').stop().animate({              // 122
                    bottom: 0                                          // 123
                }, 200, 'easeOutQuad');                                //
                $(this).find('img').stop().animate({                   // 125
                    top: -20                                           // 126
                }, 300, 'easeOutQuad');                                //
            }, function () {                                           //
                $(this).find('.caption').stop().animate({              // 130
                    bottom: -75                                        // 131
                }, 200, 'easeInQuad');                                 //
                $(this).find('img').stop().animate({                   // 133
                    top: 0                                             // 134
                }, 300, 'easeOutQuad');                                //
            });                                                        //
        }                                                              //
                                                                       //
    };                                                                 //
                                                                       //
    filterList.init();                                                 // 143
})(jQuery); // End of use strict                                       //
                                                                       //
// Load WOW.js on non-touch devices                                    //
var isPhoneDevice = ("ontouchstart" in document.documentElement);      // 148
$(document).ready(function () {                                        // 149
    if (isPhoneDevice) {                                               // 150
        //mobile                                                       //
    } else {                                                           //
            //desktop                                                  //
            // Initialize WOW.js                                       //
            wow = new WOW({                                            // 155
                offset: 50                                             // 156
            });                                                        //
            wow.init();                                                // 158
        }                                                              //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
