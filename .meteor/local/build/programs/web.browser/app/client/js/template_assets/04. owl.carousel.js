(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/js/template_assets/04. owl.carousel.js                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
 *  jQuery OwlCarousel v1.3.3                                          //
 *                                                                     //
 *  Copyright (c) 2013 Bartosz Wojciechowski                           //
 *  http://www.owlgraphic.com/owlcarousel/                             //
 *                                                                     //
 *  Licensed under MIT                                                 //
 *                                                                     //
 */                                                                    //
                                                                       //
/*JS Lint helpers: */                                                  //
/*global dragMove: false, dragEnd: false, $, jQuery, alert, window, document */
/*jslint nomen: true, continue:true */                                 //
                                                                       //
if (typeof Object.create !== "function") {                             // 15
    Object.create = function (obj) {                                   // 16
        function F() {}                                                // 17
        F.prototype = obj;                                             // 18
        return new F();                                                // 19
    };                                                                 //
}                                                                      //
(function ($, window, document) {                                      // 22
                                                                       //
    var Carousel = {                                                   // 24
        init: function (options, el) {                                 // 25
            var base = this;                                           // 26
                                                                       //
            base.$elem = $(el);                                        // 28
            base.options = $.extend({}, $.fn.owlCarousel.options, base.$elem.data(), options);
                                                                       //
            base.userOptions = options;                                // 31
            base.loadContent();                                        // 32
        },                                                             //
                                                                       //
        loadContent: function () {                                     // 35
            var base = this,                                           // 36
                url;                                                   //
                                                                       //
            function getData(data) {                                   // 38
                var i,                                                 // 39
                    content = "";                                      //
                if (typeof base.options.jsonSuccess === "function") {  // 40
                    base.options.jsonSuccess.apply(this, [data]);      // 41
                } else {                                               //
                    for (i in babelHelpers.sanitizeForInObject(data.owl)) {
                        if (data.owl.hasOwnProperty(i)) {              // 44
                            content += data.owl[i].item;               // 45
                        }                                              //
                    }                                                  //
                    base.$elem.html(content);                          // 48
                }                                                      //
                base.logIn();                                          // 50
            }                                                          //
                                                                       //
            if (typeof base.options.beforeInit === "function") {       // 53
                base.options.beforeInit.apply(this, [base.$elem]);     // 54
            }                                                          //
                                                                       //
            if (typeof base.options.jsonPath === "string") {           // 57
                url = base.options.jsonPath;                           // 58
                $.getJSON(url, getData);                               // 59
            } else {                                                   //
                base.logIn();                                          // 61
            }                                                          //
        },                                                             //
                                                                       //
        logIn: function () {                                           // 65
            var base = this;                                           // 66
                                                                       //
            base.$elem.data("owl-originalStyles", base.$elem.attr("style"));
            base.$elem.data("owl-originalClasses", base.$elem.attr("class"));
                                                                       //
            base.$elem.css({ opacity: 0 });                            // 71
            base.orignalItems = base.options.items;                    // 72
            base.checkBrowser();                                       // 73
            base.wrapperWidth = 0;                                     // 74
            base.checkVisible = null;                                  // 75
            base.setVars();                                            // 76
        },                                                             //
                                                                       //
        setVars: function () {                                         // 79
            var base = this;                                           // 80
            if (base.$elem.children().length === 0) {                  // 81
                return false;                                          // 81
            }                                                          //
            base.baseClass();                                          // 82
            base.eventTypes();                                         // 83
            base.$userItems = base.$elem.children();                   // 84
            base.itemsAmount = base.$userItems.length;                 // 85
            base.wrapItems();                                          // 86
            base.$owlItems = base.$elem.find(".owl-item");             // 87
            base.$owlWrapper = base.$elem.find(".owl-wrapper");        // 88
            base.playDirection = "next";                               // 89
            base.prevItem = 0;                                         // 90
            base.prevArr = [0];                                        // 91
            base.currentItem = 0;                                      // 92
            base.customEvents();                                       // 93
            base.onStartup();                                          // 94
        },                                                             //
                                                                       //
        onStartup: function () {                                       // 97
            var base = this;                                           // 98
            base.updateItems();                                        // 99
            base.calculateAll();                                       // 100
            base.buildControls();                                      // 101
            base.updateControls();                                     // 102
            base.response();                                           // 103
            base.moveEvents();                                         // 104
            base.stopOnHover();                                        // 105
            base.owlStatus();                                          // 106
                                                                       //
            if (base.options.transitionStyle !== false) {              // 108
                base.transitionTypes(base.options.transitionStyle);    // 109
            }                                                          //
            if (base.options.autoPlay === true) {                      // 111
                base.options.autoPlay = 5000;                          // 112
            }                                                          //
            base.play();                                               // 114
                                                                       //
            base.$elem.find(".owl-wrapper").css("display", "block");   // 116
                                                                       //
            if (!base.$elem.is(":visible")) {                          // 118
                base.watchVisibility();                                // 119
            } else {                                                   //
                base.$elem.css("opacity", 1);                          // 121
            }                                                          //
            base.onstartup = false;                                    // 123
            base.eachMoveUpdate();                                     // 124
            if (typeof base.options.afterInit === "function") {        // 125
                base.options.afterInit.apply(this, [base.$elem]);      // 126
            }                                                          //
        },                                                             //
                                                                       //
        eachMoveUpdate: function () {                                  // 130
            var base = this;                                           // 131
                                                                       //
            if (base.options.lazyLoad === true) {                      // 133
                base.lazyLoad();                                       // 134
            }                                                          //
            if (base.options.autoHeight === true) {                    // 136
                base.autoHeight();                                     // 137
            }                                                          //
            base.onVisibleItems();                                     // 139
                                                                       //
            if (typeof base.options.afterAction === "function") {      // 141
                base.options.afterAction.apply(this, [base.$elem]);    // 142
            }                                                          //
        },                                                             //
                                                                       //
        updateVars: function () {                                      // 146
            var base = this;                                           // 147
            if (typeof base.options.beforeUpdate === "function") {     // 148
                base.options.beforeUpdate.apply(this, [base.$elem]);   // 149
            }                                                          //
            base.watchVisibility();                                    // 151
            base.updateItems();                                        // 152
            base.calculateAll();                                       // 153
            base.updatePosition();                                     // 154
            base.updateControls();                                     // 155
            base.eachMoveUpdate();                                     // 156
            if (typeof base.options.afterUpdate === "function") {      // 157
                base.options.afterUpdate.apply(this, [base.$elem]);    // 158
            }                                                          //
        },                                                             //
                                                                       //
        reload: function () {                                          // 162
            var base = this;                                           // 163
            window.setTimeout(function () {                            // 164
                base.updateVars();                                     // 165
            }, 0);                                                     //
        },                                                             //
                                                                       //
        watchVisibility: function () {                                 // 169
            var base = this;                                           // 170
                                                                       //
            if (base.$elem.is(":visible") === false) {                 // 172
                base.$elem.css({ opacity: 0 });                        // 173
                window.clearInterval(base.autoPlayInterval);           // 174
                window.clearInterval(base.checkVisible);               // 175
            } else {                                                   //
                return false;                                          // 177
            }                                                          //
            base.checkVisible = window.setInterval(function () {       // 179
                if (base.$elem.is(":visible")) {                       // 180
                    base.reload();                                     // 181
                    base.$elem.animate({ opacity: 1 }, 200);           // 182
                    window.clearInterval(base.checkVisible);           // 183
                }                                                      //
            }, 500);                                                   //
        },                                                             //
                                                                       //
        wrapItems: function () {                                       // 188
            var base = this;                                           // 189
            base.$userItems.wrapAll("<div class=\"owl-wrapper\">").wrap("<div class=\"owl-item\"></div>");
            base.$elem.find(".owl-wrapper").wrap("<div class=\"owl-wrapper-outer\">");
            base.wrapperOuter = base.$elem.find(".owl-wrapper-outer");
            base.$elem.css("display", "block");                        // 193
        },                                                             //
                                                                       //
        baseClass: function () {                                       // 196
            var base = this,                                           // 197
                hasBaseClass = base.$elem.hasClass(base.options.baseClass),
                hasThemeClass = base.$elem.hasClass(base.options.theme);
                                                                       //
            if (!hasBaseClass) {                                       // 201
                base.$elem.addClass(base.options.baseClass);           // 202
            }                                                          //
                                                                       //
            if (!hasThemeClass) {                                      // 205
                base.$elem.addClass(base.options.theme);               // 206
            }                                                          //
        },                                                             //
                                                                       //
        updateItems: function () {                                     // 210
            var base = this,                                           // 211
                width,                                                 //
                i;                                                     //
                                                                       //
            if (base.options.responsive === false) {                   // 213
                return false;                                          // 214
            }                                                          //
            if (base.options.singleItem === true) {                    // 216
                base.options.items = base.orignalItems = 1;            // 217
                base.options.itemsCustom = false;                      // 218
                base.options.itemsDesktop = false;                     // 219
                base.options.itemsDesktopSmall = false;                // 220
                base.options.itemsTablet = false;                      // 221
                base.options.itemsTabletSmall = false;                 // 222
                base.options.itemsMobile = false;                      // 223
                return false;                                          // 224
            }                                                          //
                                                                       //
            width = $(base.options.responsiveBaseWidth).width();       // 227
                                                                       //
            if (width > (base.options.itemsDesktop[0] || base.orignalItems)) {
                base.options.items = base.orignalItems;                // 230
            }                                                          //
            if (base.options.itemsCustom !== false) {                  // 232
                //Reorder array by screen size                         //
                base.options.itemsCustom.sort(function (a, b) {        // 234
                    return a[0] - b[0];                                // 234
                });                                                    //
                                                                       //
                for (i = 0; i < base.options.itemsCustom.length; i += 1) {
                    if (base.options.itemsCustom[i][0] <= width) {     // 237
                        base.options.items = base.options.itemsCustom[i][1];
                    }                                                  //
                }                                                      //
            } else {                                                   //
                                                                       //
                if (width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false) {
                    base.options.items = base.options.itemsDesktop[1];
                }                                                      //
                                                                       //
                if (width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false) {
                    base.options.items = base.options.itemsDesktopSmall[1];
                }                                                      //
                                                                       //
                if (width <= base.options.itemsTablet[0] && base.options.itemsTablet !== false) {
                    base.options.items = base.options.itemsTablet[1];  // 253
                }                                                      //
                                                                       //
                if (width <= base.options.itemsTabletSmall[0] && base.options.itemsTabletSmall !== false) {
                    base.options.items = base.options.itemsTabletSmall[1];
                }                                                      //
                                                                       //
                if (width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false) {
                    base.options.items = base.options.itemsMobile[1];  // 261
                }                                                      //
            }                                                          //
                                                                       //
            //if number of items is less than declared                 //
            if (base.options.items > base.itemsAmount && base.options.itemsScaleUp === true) {
                base.options.items = base.itemsAmount;                 // 267
            }                                                          //
        },                                                             //
                                                                       //
        response: function () {                                        // 271
            var base = this,                                           // 272
                smallDelay,                                            //
                lastWindowWidth;                                       //
                                                                       //
            if (base.options.responsive !== true) {                    // 276
                return false;                                          // 277
            }                                                          //
            lastWindowWidth = $(window).width();                       // 279
                                                                       //
            base.resizer = function () {                               // 281
                if ($(window).width() !== lastWindowWidth) {           // 282
                    if (base.options.autoPlay !== false) {             // 283
                        window.clearInterval(base.autoPlayInterval);   // 284
                    }                                                  //
                    window.clearTimeout(smallDelay);                   // 286
                    smallDelay = window.setTimeout(function () {       // 287
                        lastWindowWidth = $(window).width();           // 288
                        base.updateVars();                             // 289
                    }, base.options.responsiveRefreshRate);            //
                }                                                      //
            };                                                         //
            $(window).resize(base.resizer);                            // 293
        },                                                             //
                                                                       //
        updatePosition: function () {                                  // 296
            var base = this;                                           // 297
            base.jumpTo(base.currentItem);                             // 298
            if (base.options.autoPlay !== false) {                     // 299
                base.checkAp();                                        // 300
            }                                                          //
        },                                                             //
                                                                       //
        appendItemsSizes: function () {                                // 304
            var base = this,                                           // 305
                roundPages = 0,                                        //
                lastItem = base.itemsAmount - base.options.items;      //
                                                                       //
            base.$owlItems.each(function (index) {                     // 309
                var $this = $(this);                                   // 310
                $this.css({ "width": base.itemWidth }).data("owl-item", Number(index));
                                                                       //
                if (index % base.options.items === 0 || index === lastItem) {
                    if (!(index > lastItem)) {                         // 316
                        roundPages += 1;                               // 317
                    }                                                  //
                }                                                      //
                $this.data("owl-roundPages", roundPages);              // 320
            });                                                        //
        },                                                             //
                                                                       //
        appendWrapperSizes: function () {                              // 324
            var base = this,                                           // 325
                width = base.$owlItems.length * base.itemWidth;        //
                                                                       //
            base.$owlWrapper.css({                                     // 328
                "width": width * 2,                                    // 329
                "left": 0                                              // 330
            });                                                        //
            base.appendItemsSizes();                                   // 332
        },                                                             //
                                                                       //
        calculateAll: function () {                                    // 335
            var base = this;                                           // 336
            base.calculateWidth();                                     // 337
            base.appendWrapperSizes();                                 // 338
            base.loops();                                              // 339
            base.max();                                                // 340
        },                                                             //
                                                                       //
        calculateWidth: function () {                                  // 343
            var base = this;                                           // 344
            base.itemWidth = Math.round(base.$elem.width() / base.options.items);
        },                                                             //
                                                                       //
        max: function () {                                             // 348
            var base = this,                                           // 349
                maximum = (base.itemsAmount * base.itemWidth - base.options.items * base.itemWidth) * -1;
            if (base.options.items > base.itemsAmount) {               // 351
                base.maximumItem = 0;                                  // 352
                maximum = 0;                                           // 353
                base.maximumPixels = 0;                                // 354
            } else {                                                   //
                base.maximumItem = base.itemsAmount - base.options.items;
                base.maximumPixels = maximum;                          // 357
            }                                                          //
            return maximum;                                            // 359
        },                                                             //
                                                                       //
        min: function () {                                             // 362
            return 0;                                                  // 363
        },                                                             //
                                                                       //
        loops: function () {                                           // 366
            var base = this,                                           // 367
                prev = 0,                                              //
                elWidth = 0,                                           //
                i,                                                     //
                item,                                                  //
                roundPageNum;                                          //
                                                                       //
            base.positionsInArray = [0];                               // 374
            base.pagesInArray = [];                                    // 375
                                                                       //
            for (i = 0; i < base.itemsAmount; i += 1) {                // 377
                elWidth += base.itemWidth;                             // 378
                base.positionsInArray.push(-elWidth);                  // 379
                                                                       //
                if (base.options.scrollPerPage === true) {             // 381
                    item = $(base.$owlItems[i]);                       // 382
                    roundPageNum = item.data("owl-roundPages");        // 383
                    if (roundPageNum !== prev) {                       // 384
                        base.pagesInArray[prev] = base.positionsInArray[i];
                        prev = roundPageNum;                           // 386
                    }                                                  //
                }                                                      //
            }                                                          //
        },                                                             //
                                                                       //
        buildControls: function () {                                   // 392
            var base = this;                                           // 393
            if (base.options.navigation === true || base.options.pagination === true) {
                base.owlControls = $("<div class=\"owl-controls\"/>").toggleClass("clickable", !base.browser.isTouch).appendTo(base.$elem);
            }                                                          //
            if (base.options.pagination === true) {                    // 397
                base.buildPagination();                                // 398
            }                                                          //
            if (base.options.navigation === true) {                    // 400
                base.buildButtons();                                   // 401
            }                                                          //
        },                                                             //
                                                                       //
        buildButtons: function () {                                    // 405
            var base = this,                                           // 406
                buttonsWrapper = $("<div class=\"owl-buttons\"/>");    //
            base.owlControls.append(buttonsWrapper);                   // 408
                                                                       //
            base.buttonPrev = $("<div/>", {                            // 410
                "class": "owl-prev",                                   // 411
                "html": base.options.navigationText[0] || ""           // 412
            });                                                        //
                                                                       //
            base.buttonNext = $("<div/>", {                            // 415
                "class": "owl-next",                                   // 416
                "html": base.options.navigationText[1] || ""           // 417
            });                                                        //
                                                                       //
            buttonsWrapper.append(base.buttonPrev).append(base.buttonNext);
                                                                       //
            buttonsWrapper.on("touchstart.owlControls mousedown.owlControls", "div[class^=\"owl\"]", function (event) {
                event.preventDefault();                                // 425
            });                                                        //
                                                                       //
            buttonsWrapper.on("touchend.owlControls mouseup.owlControls", "div[class^=\"owl\"]", function (event) {
                event.preventDefault();                                // 429
                if ($(this).hasClass("owl-next")) {                    // 430
                    base.next();                                       // 431
                } else {                                               //
                    base.prev();                                       // 433
                }                                                      //
            });                                                        //
        },                                                             //
                                                                       //
        buildPagination: function () {                                 // 438
            var base = this;                                           // 439
                                                                       //
            base.paginationWrapper = $("<div class=\"owl-pagination\"/>");
            base.owlControls.append(base.paginationWrapper);           // 442
                                                                       //
            base.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (event) {
                event.preventDefault();                                // 445
                if (Number($(this).data("owl-page")) !== base.currentItem) {
                    base.goTo(Number($(this).data("owl-page")), true);
                }                                                      //
            });                                                        //
        },                                                             //
                                                                       //
        updatePagination: function () {                                // 452
            var base = this,                                           // 453
                counter,                                               //
                lastPage,                                              //
                lastItem,                                              //
                i,                                                     //
                paginationButton,                                      //
                paginationButtonInner;                                 //
                                                                       //
            if (base.options.pagination === false) {                   // 461
                return false;                                          // 462
            }                                                          //
                                                                       //
            base.paginationWrapper.html("");                           // 465
                                                                       //
            counter = 0;                                               // 467
            lastPage = base.itemsAmount - base.itemsAmount % base.options.items;
                                                                       //
            for (i = 0; i < base.itemsAmount; i += 1) {                // 470
                if (i % base.options.items === 0) {                    // 471
                    counter += 1;                                      // 472
                    if (lastPage === i) {                              // 473
                        lastItem = base.itemsAmount - base.options.items;
                    }                                                  //
                    paginationButton = $("<div/>", {                   // 476
                        "class": "owl-page"                            // 477
                    });                                                //
                    paginationButtonInner = $("<span></span>", {       // 479
                        "text": base.options.paginationNumbers === true ? counter : "",
                        "class": base.options.paginationNumbers === true ? "owl-numbers" : ""
                    });                                                //
                    paginationButton.append(paginationButtonInner);    // 483
                                                                       //
                    paginationButton.data("owl-page", lastPage === i ? lastItem : i);
                    paginationButton.data("owl-roundPages", counter);  // 486
                                                                       //
                    base.paginationWrapper.append(paginationButton);   // 488
                }                                                      //
            }                                                          //
            base.checkPagination();                                    // 491
        },                                                             //
        checkPagination: function () {                                 // 493
            var base = this;                                           // 494
            if (base.options.pagination === false) {                   // 495
                return false;                                          // 496
            }                                                          //
            base.paginationWrapper.find(".owl-page").each(function () {
                if ($(this).data("owl-roundPages") === $(base.$owlItems[base.currentItem]).data("owl-roundPages")) {
                    base.paginationWrapper.find(".owl-page").removeClass("active");
                    $(this).addClass("active");                        // 503
                }                                                      //
            });                                                        //
        },                                                             //
                                                                       //
        checkNavigation: function () {                                 // 508
            var base = this;                                           // 509
                                                                       //
            if (base.options.navigation === false) {                   // 511
                return false;                                          // 512
            }                                                          //
            if (base.options.rewindNav === false) {                    // 514
                if (base.currentItem === 0 && base.maximumItem === 0) {
                    base.buttonPrev.addClass("disabled");              // 516
                    base.buttonNext.addClass("disabled");              // 517
                } else if (base.currentItem === 0 && base.maximumItem !== 0) {
                    base.buttonPrev.addClass("disabled");              // 519
                    base.buttonNext.removeClass("disabled");           // 520
                } else if (base.currentItem === base.maximumItem) {    //
                    base.buttonPrev.removeClass("disabled");           // 522
                    base.buttonNext.addClass("disabled");              // 523
                } else if (base.currentItem !== 0 && base.currentItem !== base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");           // 525
                    base.buttonNext.removeClass("disabled");           // 526
                }                                                      //
            }                                                          //
        },                                                             //
                                                                       //
        updateControls: function () {                                  // 531
            var base = this;                                           // 532
            base.updatePagination();                                   // 533
            base.checkNavigation();                                    // 534
            if (base.owlControls) {                                    // 535
                if (base.options.items >= base.itemsAmount) {          // 536
                    base.owlControls.hide();                           // 537
                } else {                                               //
                    base.owlControls.show();                           // 539
                }                                                      //
            }                                                          //
        },                                                             //
                                                                       //
        destroyControls: function () {                                 // 544
            var base = this;                                           // 545
            if (base.owlControls) {                                    // 546
                base.owlControls.remove();                             // 547
            }                                                          //
        },                                                             //
                                                                       //
        next: function (speed) {                                       // 551
            var base = this;                                           // 552
                                                                       //
            if (base.isTransition) {                                   // 554
                return false;                                          // 555
            }                                                          //
                                                                       //
            base.currentItem += base.options.scrollPerPage === true ? base.options.items : 1;
            if (base.currentItem > base.maximumItem + (base.options.scrollPerPage === true ? base.options.items - 1 : 0)) {
                if (base.options.rewindNav === true) {                 // 560
                    base.currentItem = 0;                              // 561
                    speed = "rewind";                                  // 562
                } else {                                               //
                    base.currentItem = base.maximumItem;               // 564
                    return false;                                      // 565
                }                                                      //
            }                                                          //
            base.goTo(base.currentItem, speed);                        // 568
        },                                                             //
                                                                       //
        prev: function (speed) {                                       // 571
            var base = this;                                           // 572
                                                                       //
            if (base.isTransition) {                                   // 574
                return false;                                          // 575
            }                                                          //
                                                                       //
            if (base.options.scrollPerPage === true && base.currentItem > 0 && base.currentItem < base.options.items) {
                base.currentItem = 0;                                  // 579
            } else {                                                   //
                base.currentItem -= base.options.scrollPerPage === true ? base.options.items : 1;
            }                                                          //
            if (base.currentItem < 0) {                                // 583
                if (base.options.rewindNav === true) {                 // 584
                    base.currentItem = base.maximumItem;               // 585
                    speed = "rewind";                                  // 586
                } else {                                               //
                    base.currentItem = 0;                              // 588
                    return false;                                      // 589
                }                                                      //
            }                                                          //
            base.goTo(base.currentItem, speed);                        // 592
        },                                                             //
                                                                       //
        goTo: function (position, speed, drag) {                       // 595
            var base = this,                                           // 596
                goToPixel;                                             //
                                                                       //
            if (base.isTransition) {                                   // 599
                return false;                                          // 600
            }                                                          //
            if (typeof base.options.beforeMove === "function") {       // 602
                base.options.beforeMove.apply(this, [base.$elem]);     // 603
            }                                                          //
            if (position >= base.maximumItem) {                        // 605
                position = base.maximumItem;                           // 606
            } else if (position <= 0) {                                //
                position = 0;                                          // 608
            }                                                          //
                                                                       //
            base.currentItem = base.owl.currentItem = position;        // 611
            if (base.options.transitionStyle !== false && drag !== "drag" && base.options.items === 1 && base.browser.support3d === true) {
                base.swapSpeed(0);                                     // 613
                if (base.browser.support3d === true) {                 // 614
                    base.transition3d(base.positionsInArray[position]);
                } else {                                               //
                    base.css2slide(base.positionsInArray[position], 1);
                }                                                      //
                base.afterGo();                                        // 619
                base.singleItemTransition();                           // 620
                return false;                                          // 621
            }                                                          //
            goToPixel = base.positionsInArray[position];               // 623
                                                                       //
            if (base.browser.support3d === true) {                     // 625
                base.isCss3Finish = false;                             // 626
                                                                       //
                if (speed === true) {                                  // 628
                    base.swapSpeed("paginationSpeed");                 // 629
                    window.setTimeout(function () {                    // 630
                        base.isCss3Finish = true;                      // 631
                    }, base.options.paginationSpeed);                  //
                } else if (speed === "rewind") {                       //
                    base.swapSpeed(base.options.rewindSpeed);          // 635
                    window.setTimeout(function () {                    // 636
                        base.isCss3Finish = true;                      // 637
                    }, base.options.rewindSpeed);                      //
                } else {                                               //
                    base.swapSpeed("slideSpeed");                      // 641
                    window.setTimeout(function () {                    // 642
                        base.isCss3Finish = true;                      // 643
                    }, base.options.slideSpeed);                       //
                }                                                      //
                base.transition3d(goToPixel);                          // 646
            } else {                                                   //
                if (speed === true) {                                  // 648
                    base.css2slide(goToPixel, base.options.paginationSpeed);
                } else if (speed === "rewind") {                       //
                    base.css2slide(goToPixel, base.options.rewindSpeed);
                } else {                                               //
                    base.css2slide(goToPixel, base.options.slideSpeed);
                }                                                      //
            }                                                          //
            base.afterGo();                                            // 656
        },                                                             //
                                                                       //
        jumpTo: function (position) {                                  // 659
            var base = this;                                           // 660
            if (typeof base.options.beforeMove === "function") {       // 661
                base.options.beforeMove.apply(this, [base.$elem]);     // 662
            }                                                          //
            if (position >= base.maximumItem || position === -1) {     // 664
                position = base.maximumItem;                           // 665
            } else if (position <= 0) {                                //
                position = 0;                                          // 667
            }                                                          //
            base.swapSpeed(0);                                         // 669
            if (base.browser.support3d === true) {                     // 670
                base.transition3d(base.positionsInArray[position]);    // 671
            } else {                                                   //
                base.css2slide(base.positionsInArray[position], 1);    // 673
            }                                                          //
            base.currentItem = base.owl.currentItem = position;        // 675
            base.afterGo();                                            // 676
        },                                                             //
                                                                       //
        afterGo: function () {                                         // 679
            var base = this;                                           // 680
                                                                       //
            base.prevArr.push(base.currentItem);                       // 682
            base.prevItem = base.owl.prevItem = base.prevArr[base.prevArr.length - 2];
            base.prevArr.shift(0);                                     // 684
                                                                       //
            if (base.prevItem !== base.currentItem) {                  // 686
                base.checkPagination();                                // 687
                base.checkNavigation();                                // 688
                base.eachMoveUpdate();                                 // 689
                                                                       //
                if (base.options.autoPlay !== false) {                 // 691
                    base.checkAp();                                    // 692
                }                                                      //
            }                                                          //
            if (typeof base.options.afterMove === "function" && base.prevItem !== base.currentItem) {
                base.options.afterMove.apply(this, [base.$elem]);      // 696
            }                                                          //
        },                                                             //
                                                                       //
        stop: function () {                                            // 700
            var base = this;                                           // 701
            base.apStatus = "stop";                                    // 702
            window.clearInterval(base.autoPlayInterval);               // 703
        },                                                             //
                                                                       //
        checkAp: function () {                                         // 706
            var base = this;                                           // 707
            if (base.apStatus !== "stop") {                            // 708
                base.play();                                           // 709
            }                                                          //
        },                                                             //
                                                                       //
        play: function () {                                            // 713
            var base = this;                                           // 714
            base.apStatus = "play";                                    // 715
            if (base.options.autoPlay === false) {                     // 716
                return false;                                          // 717
            }                                                          //
            window.clearInterval(base.autoPlayInterval);               // 719
            base.autoPlayInterval = window.setInterval(function () {   // 720
                base.next(true);                                       // 721
            }, base.options.autoPlay);                                 //
        },                                                             //
                                                                       //
        swapSpeed: function (action) {                                 // 725
            var base = this;                                           // 726
            if (action === "slideSpeed") {                             // 727
                base.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed));
            } else if (action === "paginationSpeed") {                 //
                base.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed));
            } else if (typeof action !== "string") {                   //
                base.$owlWrapper.css(base.addCssSpeed(action));        // 732
            }                                                          //
        },                                                             //
                                                                       //
        addCssSpeed: function (speed) {                                // 736
            return {                                                   // 737
                "-webkit-transition": "all " + speed + "ms ease",      // 738
                "-moz-transition": "all " + speed + "ms ease",         // 739
                "-o-transition": "all " + speed + "ms ease",           // 740
                "transition": "all " + speed + "ms ease"               // 741
            };                                                         //
        },                                                             //
                                                                       //
        removeTransition: function () {                                // 745
            return {                                                   // 746
                "-webkit-transition": "",                              // 747
                "-moz-transition": "",                                 // 748
                "-o-transition": "",                                   // 749
                "transition": ""                                       // 750
            };                                                         //
        },                                                             //
                                                                       //
        doTranslate: function (pixels) {                               // 754
            return {                                                   // 755
                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "transform": "translate3d(" + pixels + "px, 0px,0px)"  // 760
            };                                                         //
        },                                                             //
                                                                       //
        transition3d: function (value) {                               // 764
            var base = this;                                           // 765
            base.$owlWrapper.css(base.doTranslate(value));             // 766
        },                                                             //
                                                                       //
        css2move: function (value) {                                   // 769
            var base = this;                                           // 770
            base.$owlWrapper.css({ "left": value });                   // 771
        },                                                             //
                                                                       //
        css2slide: function (value, speed) {                           // 774
            var base = this;                                           // 775
                                                                       //
            base.isCssFinish = false;                                  // 777
            base.$owlWrapper.stop(true, true).animate({                // 778
                "left": value                                          // 779
            }, {                                                       //
                duration: speed || base.options.slideSpeed,            // 781
                complete: function () {                                // 782
                    base.isCssFinish = true;                           // 783
                }                                                      //
            });                                                        //
        },                                                             //
                                                                       //
        checkBrowser: function () {                                    // 788
            var base = this,                                           // 789
                translate3D = "translate3d(0px, 0px, 0px)",            //
                tempElem = document.createElement("div"),              //
                regex,                                                 //
                asSupport,                                             //
                support3d,                                             //
                isTouch;                                               //
                                                                       //
            tempElem.style.cssText = "  -moz-transform:" + translate3D + "; -ms-transform:" + translate3D + "; -o-transform:" + translate3D + "; -webkit-transform:" + translate3D + "; transform:" + translate3D;
            regex = /translate3d\(0px, 0px, 0px\)/g;                   // 802
            asSupport = tempElem.style.cssText.match(regex);           // 803
            support3d = asSupport !== null && asSupport.length !== 0;  // 804
                                                                       //
            isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints;
                                                                       //
            base.browser = {                                           // 808
                "support3d": support3d,                                // 809
                "isTouch": isTouch                                     // 810
            };                                                         //
        },                                                             //
                                                                       //
        moveEvents: function () {                                      // 814
            var base = this;                                           // 815
            if (base.options.mouseDrag !== false || base.options.touchDrag !== false) {
                base.gestures();                                       // 817
                base.disabledEvents();                                 // 818
            }                                                          //
        },                                                             //
                                                                       //
        eventTypes: function () {                                      // 822
            var base = this,                                           // 823
                types = ["s", "e", "x"];                               //
                                                                       //
            base.ev_types = {};                                        // 826
                                                                       //
            if (base.options.mouseDrag === true && base.options.touchDrag === true) {
                types = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"];
            } else if (base.options.mouseDrag === false && base.options.touchDrag === true) {
                types = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"];
            } else if (base.options.mouseDrag === true && base.options.touchDrag === false) {
                types = ["mousedown.owl", "mousemove.owl", "mouseup.owl"];
            }                                                          //
                                                                       //
            base.ev_types.start = types[0];                            // 848
            base.ev_types.move = types[1];                             // 849
            base.ev_types.end = types[2];                              // 850
        },                                                             //
                                                                       //
        disabledEvents: function () {                                  // 853
            var base = this;                                           // 854
            base.$elem.on("dragstart.owl", function (event) {          // 855
                event.preventDefault();                                // 855
            });                                                        //
            base.$elem.on("mousedown.disableTextSelect", function (e) {
                return $(e.target).is('input, textarea, select, option');
            });                                                        //
        },                                                             //
                                                                       //
        gestures: function () {                                        // 861
            /*jslint unparam: true*/                                   //
            var base = this,                                           // 863
                locals = {                                             //
                offsetX: 0,                                            // 865
                offsetY: 0,                                            // 866
                baseElWidth: 0,                                        // 867
                relativePos: 0,                                        // 868
                position: null,                                        // 869
                minSwipe: null,                                        // 870
                maxSwipe: null,                                        // 871
                sliding: null,                                         // 872
                dargging: null,                                        // 873
                targetElement: null                                    // 874
            };                                                         //
                                                                       //
            base.isCssFinish = true;                                   // 877
                                                                       //
            function getTouches(event) {                               // 879
                if (event.touches !== undefined) {                     // 880
                    return {                                           // 881
                        x: event.touches[0].pageX,                     // 882
                        y: event.touches[0].pageY                      // 883
                    };                                                 //
                }                                                      //
                                                                       //
                if (event.touches === undefined) {                     // 887
                    if (event.pageX !== undefined) {                   // 888
                        return {                                       // 889
                            x: event.pageX,                            // 890
                            y: event.pageY                             // 891
                        };                                             //
                    }                                                  //
                    if (event.pageX === undefined) {                   // 894
                        return {                                       // 895
                            x: event.clientX,                          // 896
                            y: event.clientY                           // 897
                        };                                             //
                    }                                                  //
                }                                                      //
            }                                                          //
                                                                       //
            function swapEvents(type) {                                // 903
                if (type === "on") {                                   // 904
                    $(document).on(base.ev_types.move, dragMove);      // 905
                    $(document).on(base.ev_types.end, dragEnd);        // 906
                } else if (type === "off") {                           //
                    $(document).off(base.ev_types.move);               // 908
                    $(document).off(base.ev_types.end);                // 909
                }                                                      //
            }                                                          //
                                                                       //
            function dragStart(event) {                                // 913
                var ev = event.originalEvent || event || window.event,
                    position;                                          //
                                                                       //
                if (ev.which === 3) {                                  // 917
                    return false;                                      // 918
                }                                                      //
                if (base.itemsAmount <= base.options.items) {          // 920
                    return;                                            // 921
                }                                                      //
                if (base.isCssFinish === false && !base.options.dragBeforeAnimFinish) {
                    return false;                                      // 924
                }                                                      //
                if (base.isCss3Finish === false && !base.options.dragBeforeAnimFinish) {
                    return false;                                      // 927
                }                                                      //
                                                                       //
                if (base.options.autoPlay !== false) {                 // 930
                    window.clearInterval(base.autoPlayInterval);       // 931
                }                                                      //
                                                                       //
                if (base.browser.isTouch !== true && !base.$owlWrapper.hasClass("grabbing")) {
                    base.$owlWrapper.addClass("grabbing");             // 935
                }                                                      //
                                                                       //
                base.newPosX = 0;                                      // 938
                base.newRelativeX = 0;                                 // 939
                                                                       //
                $(this).css(base.removeTransition());                  // 941
                                                                       //
                position = $(this).position();                         // 943
                locals.relativePos = position.left;                    // 944
                                                                       //
                locals.offsetX = getTouches(ev).x - position.left;     // 946
                locals.offsetY = getTouches(ev).y - position.top;      // 947
                                                                       //
                swapEvents("on");                                      // 949
                                                                       //
                locals.sliding = false;                                // 951
                locals.targetElement = ev.target || ev.srcElement;     // 952
            }                                                          //
                                                                       //
            function dragMove(event) {                                 // 955
                var ev = event.originalEvent || event || window.event,
                    minSwipe,                                          //
                    maxSwipe;                                          //
                                                                       //
                base.newPosX = getTouches(ev).x - locals.offsetX;      // 960
                base.newPosY = getTouches(ev).y - locals.offsetY;      // 961
                base.newRelativeX = base.newPosX - locals.relativePos;
                                                                       //
                if (typeof base.options.startDragging === "function" && locals.dragging !== true && base.newRelativeX !== 0) {
                    locals.dragging = true;                            // 965
                    base.options.startDragging.apply(base, [base.$elem]);
                }                                                      //
                                                                       //
                if ((base.newRelativeX > 8 || base.newRelativeX < -8) && base.browser.isTouch === true) {
                    if (ev.preventDefault !== undefined) {             // 970
                        ev.preventDefault();                           // 971
                    } else {                                           //
                        ev.returnValue = false;                        // 973
                    }                                                  //
                    locals.sliding = true;                             // 975
                }                                                      //
                                                                       //
                if ((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false) {
                    $(document).off("touchmove.owl");                  // 979
                }                                                      //
                                                                       //
                minSwipe = function () {                               // 982
                    return base.newRelativeX / 5;                      // 983
                };                                                     //
                                                                       //
                maxSwipe = function () {                               // 986
                    return base.maximumPixels + base.newRelativeX / 5;
                };                                                     //
                                                                       //
                base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe());
                if (base.browser.support3d === true) {                 // 991
                    base.transition3d(base.newPosX);                   // 992
                } else {                                               //
                    base.css2move(base.newPosX);                       // 994
                }                                                      //
            }                                                          //
                                                                       //
            function dragEnd(event) {                                  // 998
                var ev = event.originalEvent || event || window.event,
                    newPosition,                                       //
                    handlers,                                          //
                    owlStopEvent;                                      //
                                                                       //
                ev.target = ev.target || ev.srcElement;                // 1004
                                                                       //
                locals.dragging = false;                               // 1006
                                                                       //
                if (base.browser.isTouch !== true) {                   // 1008
                    base.$owlWrapper.removeClass("grabbing");          // 1009
                }                                                      //
                                                                       //
                if (base.newRelativeX < 0) {                           // 1012
                    base.dragDirection = base.owl.dragDirection = "left";
                } else {                                               //
                    base.dragDirection = base.owl.dragDirection = "right";
                }                                                      //
                                                                       //
                if (base.newRelativeX !== 0) {                         // 1018
                    newPosition = base.getNewPosition();               // 1019
                    base.goTo(newPosition, false, "drag");             // 1020
                    if (locals.targetElement === ev.target && base.browser.isTouch !== true) {
                        $(ev.target).on("click.disable", function (ev) {
                            ev.stopImmediatePropagation();             // 1023
                            ev.stopPropagation();                      // 1024
                            ev.preventDefault();                       // 1025
                            $(ev.target).off("click.disable");         // 1026
                        });                                            //
                        handlers = $._data(ev.target, "events").click;
                        owlStopEvent = handlers.pop();                 // 1029
                        handlers.splice(0, 0, owlStopEvent);           // 1030
                    }                                                  //
                }                                                      //
                swapEvents("off");                                     // 1033
            }                                                          //
            base.$elem.on(base.ev_types.start, ".owl-wrapper", dragStart);
        },                                                             //
                                                                       //
        getNewPosition: function () {                                  // 1038
            var base = this,                                           // 1039
                newPosition = base.closestItem();                      //
                                                                       //
            if (newPosition > base.maximumItem) {                      // 1042
                base.currentItem = base.maximumItem;                   // 1043
                newPosition = base.maximumItem;                        // 1044
            } else if (base.newPosX >= 0) {                            //
                newPosition = 0;                                       // 1046
                base.currentItem = 0;                                  // 1047
            }                                                          //
            return newPosition;                                        // 1049
        },                                                             //
        closestItem: function () {                                     // 1051
            var base = this,                                           // 1052
                array = base.options.scrollPerPage === true ? base.pagesInArray : base.positionsInArray,
                goal = base.newPosX,                                   //
                closest = null;                                        //
                                                                       //
            $.each(array, function (i, v) {                            // 1057
                if (goal - base.itemWidth / 20 > array[i + 1] && goal - base.itemWidth / 20 < v && base.moveDirection() === "left") {
                    closest = v;                                       // 1059
                    if (base.options.scrollPerPage === true) {         // 1060
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {                                           //
                        base.currentItem = i;                          // 1063
                    }                                                  //
                } else if (goal + base.itemWidth / 20 < v && goal + base.itemWidth / 20 > (array[i + 1] || array[i] - base.itemWidth) && base.moveDirection() === "right") {
                    if (base.options.scrollPerPage === true) {         // 1066
                        closest = array[i + 1] || array[array.length - 1];
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {                                           //
                        closest = array[i + 1];                        // 1070
                        base.currentItem = i + 1;                      // 1071
                    }                                                  //
                }                                                      //
            });                                                        //
            return base.currentItem;                                   // 1075
        },                                                             //
                                                                       //
        moveDirection: function () {                                   // 1078
            var base = this,                                           // 1079
                direction;                                             //
            if (base.newRelativeX < 0) {                               // 1081
                direction = "right";                                   // 1082
                base.playDirection = "next";                           // 1083
            } else {                                                   //
                direction = "left";                                    // 1085
                base.playDirection = "prev";                           // 1086
            }                                                          //
            return direction;                                          // 1088
        },                                                             //
                                                                       //
        customEvents: function () {                                    // 1091
            /*jslint unparam: true*/                                   //
            var base = this;                                           // 1093
            base.$elem.on("owl.next", function () {                    // 1094
                base.next();                                           // 1095
            });                                                        //
            base.$elem.on("owl.prev", function () {                    // 1097
                base.prev();                                           // 1098
            });                                                        //
            base.$elem.on("owl.play", function (event, speed) {        // 1100
                base.options.autoPlay = speed;                         // 1101
                base.play();                                           // 1102
                base.hoverStatus = "play";                             // 1103
            });                                                        //
            base.$elem.on("owl.stop", function () {                    // 1105
                base.stop();                                           // 1106
                base.hoverStatus = "stop";                             // 1107
            });                                                        //
            base.$elem.on("owl.goTo", function (event, item) {         // 1109
                base.goTo(item);                                       // 1110
            });                                                        //
            base.$elem.on("owl.jumpTo", function (event, item) {       // 1112
                base.jumpTo(item);                                     // 1113
            });                                                        //
        },                                                             //
                                                                       //
        stopOnHover: function () {                                     // 1117
            var base = this;                                           // 1118
            if (base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false) {
                base.$elem.on("mouseover", function () {               // 1120
                    base.stop();                                       // 1121
                });                                                    //
                base.$elem.on("mouseout", function () {                // 1123
                    if (base.hoverStatus !== "stop") {                 // 1124
                        base.play();                                   // 1125
                    }                                                  //
                });                                                    //
            }                                                          //
        },                                                             //
                                                                       //
        lazyLoad: function () {                                        // 1131
            var base = this,                                           // 1132
                i,                                                     //
                $item,                                                 //
                itemNumber,                                            //
                $lazyImg,                                              //
                follow;                                                //
                                                                       //
            if (base.options.lazyLoad === false) {                     // 1139
                return false;                                          // 1140
            }                                                          //
            for (i = 0; i < base.itemsAmount; i += 1) {                // 1142
                $item = $(base.$owlItems[i]);                          // 1143
                                                                       //
                if ($item.data("owl-loaded") === "loaded") {           // 1145
                    continue;                                          // 1146
                }                                                      //
                                                                       //
                itemNumber = $item.data("owl-item");                   // 1149
                $lazyImg = $item.find(".lazyOwl");                     // 1150
                                                                       //
                if (typeof $lazyImg.data("src") !== "string") {        // 1152
                    $item.data("owl-loaded", "loaded");                // 1153
                    continue;                                          // 1154
                }                                                      //
                if ($item.data("owl-loaded") === undefined) {          // 1156
                    $lazyImg.hide();                                   // 1157
                    $item.addClass("loading").data("owl-loaded", "checked");
                }                                                      //
                if (base.options.lazyFollow === true) {                // 1160
                    follow = itemNumber >= base.currentItem;           // 1161
                } else {                                               //
                    follow = true;                                     // 1163
                }                                                      //
                if (follow && itemNumber < base.currentItem + base.options.items && $lazyImg.length) {
                    base.lazyPreload($item, $lazyImg);                 // 1166
                }                                                      //
            }                                                          //
        },                                                             //
                                                                       //
        lazyPreload: function ($item, $lazyImg) {                      // 1171
            var base = this,                                           // 1172
                iterations = 0,                                        //
                isBackgroundImg;                                       //
                                                                       //
            if ($lazyImg.prop("tagName") === "DIV") {                  // 1176
                $lazyImg.css("background-image", "url(" + $lazyImg.data("src") + ")");
                isBackgroundImg = true;                                // 1178
            } else {                                                   //
                $lazyImg[0].src = $lazyImg.data("src");                // 1180
            }                                                          //
                                                                       //
            function showImage() {                                     // 1183
                $item.data("owl-loaded", "loaded").removeClass("loading");
                $lazyImg.removeAttr("data-src");                       // 1185
                if (base.options.lazyEffect === "fade") {              // 1186
                    $lazyImg.fadeIn(400);                              // 1187
                } else {                                               //
                    $lazyImg.show();                                   // 1189
                }                                                      //
                if (typeof base.options.afterLazyLoad === "function") {
                    base.options.afterLazyLoad.apply(this, [base.$elem]);
                }                                                      //
            }                                                          //
                                                                       //
            function checkLazyImage() {                                // 1196
                iterations += 1;                                       // 1197
                if (base.completeImg($lazyImg.get(0)) || isBackgroundImg === true) {
                    showImage();                                       // 1199
                } else if (iterations <= 100) {                        //
                    //if image loads in less than 10 seconds           //
                    window.setTimeout(checkLazyImage, 100);            // 1201
                } else {                                               //
                    showImage();                                       // 1203
                }                                                      //
            }                                                          //
                                                                       //
            checkLazyImage();                                          // 1207
        },                                                             //
                                                                       //
        autoHeight: function () {                                      // 1210
            var base = this,                                           // 1211
                $currentimg = $(base.$owlItems[base.currentItem]).find("img"),
                iterations;                                            //
                                                                       //
            function addHeight() {                                     // 1215
                var $currentItem = $(base.$owlItems[base.currentItem]).height();
                base.wrapperOuter.css("height", $currentItem + "px");  // 1217
                if (!base.wrapperOuter.hasClass("autoHeight")) {       // 1218
                    window.setTimeout(function () {                    // 1219
                        base.wrapperOuter.addClass("autoHeight");      // 1220
                    }, 0);                                             //
                }                                                      //
            }                                                          //
                                                                       //
            function checkImage() {                                    // 1225
                iterations += 1;                                       // 1226
                if (base.completeImg($currentimg.get(0))) {            // 1227
                    addHeight();                                       // 1228
                } else if (iterations <= 100) {                        //
                    //if image loads in less than 10 seconds           //
                    window.setTimeout(checkImage, 100);                // 1230
                } else {                                               //
                    base.wrapperOuter.css("height", ""); //Else remove height attribute
                }                                                      //
            }                                                          //
                                                                       //
            if ($currentimg.get(0) !== undefined) {                    // 1236
                iterations = 0;                                        // 1237
                checkImage();                                          // 1238
            } else {                                                   //
                addHeight();                                           // 1240
            }                                                          //
        },                                                             //
                                                                       //
        completeImg: function (img) {                                  // 1244
            var naturalWidthType;                                      // 1245
                                                                       //
            if (!img.complete) {                                       // 1247
                return false;                                          // 1248
            }                                                          //
            naturalWidthType = typeof img.naturalWidth;                // 1250
            if (naturalWidthType !== "undefined" && img.naturalWidth === 0) {
                return false;                                          // 1252
            }                                                          //
            return true;                                               // 1254
        },                                                             //
                                                                       //
        onVisibleItems: function () {                                  // 1257
            var base = this,                                           // 1258
                i;                                                     //
                                                                       //
            if (base.options.addClassActive === true) {                // 1261
                base.$owlItems.removeClass("active");                  // 1262
            }                                                          //
            base.visibleItems = [];                                    // 1264
            for (i = base.currentItem; i < base.currentItem + base.options.items; i += 1) {
                base.visibleItems.push(i);                             // 1266
                                                                       //
                if (base.options.addClassActive === true) {            // 1268
                    $(base.$owlItems[i]).addClass("active");           // 1269
                }                                                      //
            }                                                          //
            base.owl.visibleItems = base.visibleItems;                 // 1272
        },                                                             //
                                                                       //
        transitionTypes: function (className) {                        // 1275
            var base = this;                                           // 1276
            //Currently available: "fade", "backSlide", "goDown", "fadeUp"
            base.outClass = "owl-" + className + "-out";               // 1278
            base.inClass = "owl-" + className + "-in";                 // 1279
        },                                                             //
                                                                       //
        singleItemTransition: function () {                            // 1282
            var base = this,                                           // 1283
                outClass = base.outClass,                              //
                inClass = base.inClass,                                //
                $currentItem = base.$owlItems.eq(base.currentItem),    //
                $prevItem = base.$owlItems.eq(base.prevItem),          //
                prevPos = Math.abs(base.positionsInArray[base.currentItem]) + base.positionsInArray[base.prevItem],
                origin = Math.abs(base.positionsInArray[base.currentItem]) + base.itemWidth / 2,
                animEnd = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';
                                                                       //
            base.isTransition = true;                                  // 1292
                                                                       //
            base.$owlWrapper.addClass('owl-origin').css({              // 1294
                "-webkit-transform-origin": origin + "px",             // 1297
                "-moz-perspective-origin": origin + "px",              // 1298
                "perspective-origin": origin + "px"                    // 1299
            });                                                        //
            function transStyles(prevPos) {                            // 1301
                return {                                               // 1302
                    "position": "relative",                            // 1303
                    "left": prevPos + "px"                             // 1304
                };                                                     //
            }                                                          //
                                                                       //
            $prevItem.css(transStyles(prevPos, 10)).addClass(outClass).on(animEnd, function () {
                base.endPrev = true;                                   // 1312
                $prevItem.off(animEnd);                                // 1313
                base.clearTransStyle($prevItem, outClass);             // 1314
            });                                                        //
                                                                       //
            $currentItem.addClass(inClass).on(animEnd, function () {   // 1317
                base.endCurrent = true;                                // 1320
                $currentItem.off(animEnd);                             // 1321
                base.clearTransStyle($currentItem, inClass);           // 1322
            });                                                        //
        },                                                             //
                                                                       //
        clearTransStyle: function (item, classToRemove) {              // 1326
            var base = this;                                           // 1327
            item.css({                                                 // 1328
                "position": "",                                        // 1329
                "left": ""                                             // 1330
            }).removeClass(classToRemove);                             //
                                                                       //
            if (base.endPrev && base.endCurrent) {                     // 1333
                base.$owlWrapper.removeClass('owl-origin');            // 1334
                base.endPrev = false;                                  // 1335
                base.endCurrent = false;                               // 1336
                base.isTransition = false;                             // 1337
            }                                                          //
        },                                                             //
                                                                       //
        owlStatus: function () {                                       // 1341
            var base = this;                                           // 1342
            base.owl = {                                               // 1343
                "userOptions": base.userOptions,                       // 1344
                "baseElement": base.$elem,                             // 1345
                "userItems": base.$userItems,                          // 1346
                "owlItems": base.$owlItems,                            // 1347
                "currentItem": base.currentItem,                       // 1348
                "prevItem": base.prevItem,                             // 1349
                "visibleItems": base.visibleItems,                     // 1350
                "isTouch": base.browser.isTouch,                       // 1351
                "browser": base.browser,                               // 1352
                "dragDirection": base.dragDirection                    // 1353
            };                                                         //
        },                                                             //
                                                                       //
        clearEvents: function () {                                     // 1357
            var base = this;                                           // 1358
            base.$elem.off(".owl owl mousedown.disableTextSelect");    // 1359
            $(document).off(".owl owl");                               // 1360
            $(window).off("resize", base.resizer);                     // 1361
        },                                                             //
                                                                       //
        unWrap: function () {                                          // 1364
            var base = this;                                           // 1365
            if (base.$elem.children().length !== 0) {                  // 1366
                base.$owlWrapper.unwrap();                             // 1367
                base.$userItems.unwrap().unwrap();                     // 1368
                if (base.owlControls) {                                // 1369
                    base.owlControls.remove();                         // 1370
                }                                                      //
            }                                                          //
            base.clearEvents();                                        // 1373
            base.$elem.attr("style", base.$elem.data("owl-originalStyles") || "").attr("class", base.$elem.data("owl-originalClasses"));
        },                                                             //
                                                                       //
        destroy: function () {                                         // 1379
            var base = this;                                           // 1380
            base.stop();                                               // 1381
            window.clearInterval(base.checkVisible);                   // 1382
            base.unWrap();                                             // 1383
            base.$elem.removeData();                                   // 1384
        },                                                             //
                                                                       //
        reinit: function (newOptions) {                                // 1387
            var base = this,                                           // 1388
                options = $.extend({}, base.userOptions, newOptions);  //
            base.unWrap();                                             // 1390
            base.init(options, base.$elem);                            // 1391
        },                                                             //
                                                                       //
        addItem: function (htmlString, targetPosition) {               // 1394
            var base = this,                                           // 1395
                position;                                              //
                                                                       //
            if (!htmlString) {                                         // 1398
                return false;                                          // 1398
            }                                                          //
                                                                       //
            if (base.$elem.children().length === 0) {                  // 1400
                base.$elem.append(htmlString);                         // 1401
                base.setVars();                                        // 1402
                return false;                                          // 1403
            }                                                          //
            base.unWrap();                                             // 1405
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;                                         // 1407
            } else {                                                   //
                position = targetPosition;                             // 1409
            }                                                          //
            if (position >= base.$userItems.length || position === -1) {
                base.$userItems.eq(-1).after(htmlString);              // 1412
            } else {                                                   //
                base.$userItems.eq(position).before(htmlString);       // 1414
            }                                                          //
                                                                       //
            base.setVars();                                            // 1417
        },                                                             //
                                                                       //
        removeItem: function (targetPosition) {                        // 1420
            var base = this,                                           // 1421
                position;                                              //
                                                                       //
            if (base.$elem.children().length === 0) {                  // 1424
                return false;                                          // 1425
            }                                                          //
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;                                         // 1428
            } else {                                                   //
                position = targetPosition;                             // 1430
            }                                                          //
                                                                       //
            base.unWrap();                                             // 1433
            base.$userItems.eq(position).remove();                     // 1434
            base.setVars();                                            // 1435
        }                                                              //
                                                                       //
    };                                                                 //
                                                                       //
    $.fn.owlCarousel = function (options) {                            // 1440
        return this.each(function () {                                 // 1441
            if ($(this).data("owl-init") === true) {                   // 1442
                return false;                                          // 1443
            }                                                          //
            $(this).data("owl-init", true);                            // 1445
            var carousel = Object.create(Carousel);                    // 1446
            carousel.init(options, this);                              // 1447
            $.data(this, "owlCarousel", carousel);                     // 1448
        });                                                            //
    };                                                                 //
                                                                       //
    $.fn.owlCarousel.options = {                                       // 1452
                                                                       //
        items: 5,                                                      // 1454
        itemsCustom: false,                                            // 1455
        itemsDesktop: [1199, 4],                                       // 1456
        itemsDesktopSmall: [979, 3],                                   // 1457
        itemsTablet: [768, 2],                                         // 1458
        itemsTabletSmall: false,                                       // 1459
        itemsMobile: [479, 1],                                         // 1460
        singleItem: false,                                             // 1461
        itemsScaleUp: false,                                           // 1462
                                                                       //
        slideSpeed: 200,                                               // 1464
        paginationSpeed: 800,                                          // 1465
        rewindSpeed: 1000,                                             // 1466
                                                                       //
        autoPlay: false,                                               // 1468
        stopOnHover: false,                                            // 1469
                                                                       //
        navigation: false,                                             // 1471
        navigationText: ["prev", "next"],                              // 1472
        rewindNav: true,                                               // 1473
        scrollPerPage: false,                                          // 1474
                                                                       //
        pagination: true,                                              // 1476
        paginationNumbers: false,                                      // 1477
                                                                       //
        responsive: true,                                              // 1479
        responsiveRefreshRate: 200,                                    // 1480
        responsiveBaseWidth: window,                                   // 1481
                                                                       //
        baseClass: "owl-carousel",                                     // 1483
        theme: "owl-theme",                                            // 1484
                                                                       //
        lazyLoad: false,                                               // 1486
        lazyFollow: true,                                              // 1487
        lazyEffect: "fade",                                            // 1488
                                                                       //
        autoHeight: false,                                             // 1490
                                                                       //
        jsonPath: false,                                               // 1492
        jsonSuccess: false,                                            // 1493
                                                                       //
        dragBeforeAnimFinish: true,                                    // 1495
        mouseDrag: true,                                               // 1496
        touchDrag: true,                                               // 1497
                                                                       //
        addClassActive: false,                                         // 1499
        transitionStyle: false,                                        // 1500
                                                                       //
        beforeUpdate: false,                                           // 1502
        afterUpdate: false,                                            // 1503
        beforeInit: false,                                             // 1504
        afterInit: false,                                              // 1505
        beforeMove: false,                                             // 1506
        afterMove: false,                                              // 1507
        afterAction: false,                                            // 1508
        startDragging: false,                                          // 1509
        afterLazyLoad: false                                           // 1510
    };                                                                 //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
