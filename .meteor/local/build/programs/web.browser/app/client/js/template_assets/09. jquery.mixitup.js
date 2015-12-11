(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/js/template_assets/09. jquery.mixitup.js                     //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
 * MIXITUP - A CSS3 & JQuery Filter and Sort Plugin                    //
 * Version: 1.4.0                                                      //
 * Author: Patrick Kunka                                               //
 * Copyright 2012-2013 Patrick Kunka, All Rights Reserved              //
 * FREE FOR NON-COMMERCIAL USE                                         //
 * http://www.mixitup.io                                               //
 */                                                                    //
(function (e) {                                                        // 9
    function m(d, b, h, c, a) {                                        // 10
        function j() {                                                 // 11
            k.unbind();                                                // 12
            b && v(b, h, c, a);                                        // 13
            a.startOrder = [];                                         // 14
            a.newOrder = [];                                           // 15
            a.origSort = [];                                           // 16
            a.checkSort = [];                                          // 17
            u.removeStyle(a.prefix + "filter, filter, " + a.prefix + "transform, transform, opacity, display").css(a.clean).removeAttr("data-checksum");
            window.atob || u.css({                                     // 19
                display: "none",                                       // 20
                opacity: "0"                                           // 21
            });                                                        //
            k.removeStyle(a.prefix + "transition, transition, " + a.prefix + "perspective, perspective, " + a.prefix + "perspective-origin, perspective-origin, " + (a.resizeContainer ? "height" : ""));
            "list" == a.layoutMode ? (q.css({                          // 24
                display: a.targetDisplayList,                          // 26
                opacity: "1"                                           // 27
            }), a.origDisplay = a.targetDisplayList) : (q.css({        //
                display: a.targetDisplayGrid,                          // 29
                opacity: "1"                                           // 30
            }), a.origDisplay = a.targetDisplayGrid);                  //
            a.origLayout = a.layoutMode;                               // 32
            setTimeout(function () {                                   // 33
                u.removeStyle(a.prefix + "transition, transition");    // 34
                a.mixing = !1;                                         // 35
                if ("function" == typeof a.onMixEnd) {                 // 36
                    var b = a.onMixEnd.call(this, a);                  // 37
                    a = b ? b : a;                                     // 38
                }                                                      //
            });                                                        //
        }                                                              //
        clearInterval(a.failsafe);                                     // 42
        a.mixing = !0;                                                 // 43
        if ("function" == typeof a.onMixStart) {                       // 44
            var f = a.onMixStart.call(this, a);                        // 45
            a = f ? f : a;                                             // 46
        }                                                              //
        for (var g = a.transitionSpeed, f = 0; 2 > f; f++) {           // 48
            var n = 0 == f ? n = a.prefix : "";                        // 50
            a.transition[n + "transition"] = "all " + g + "ms linear";
            a.transition[n + "transform"] = n + "translate3d(0,0,0)";  // 52
            a.perspective[n + "perspective"] = a.perspectiveDistance + "px";
            a.perspective[n + "perspective-origin"] = a.perspectiveOrigin;
        }                                                              //
        var r = a.targetSelector,                                      // 56
            u = c.find(r);                                             //
        u.each(function () {                                           // 58
            this.data = {};                                            // 59
        });                                                            //
        var k = u.parent();                                            // 61
        k.css(a.perspective);                                          // 62
        a.easingFallback = "ease-in-out";                              // 63
        "smooth" == a.easing && (a.easing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)");
        "snap" == a.easing && (a.easing = "cubic-bezier(0.77, 0, 0.175, 1)");
        "windback" == a.easing && (a.easing = "cubic-bezier(0.175, 0.885, 0.320, 1.275)", a.easingFallback = "cubic-bezier(0.175, 0.885, 0.320, 1)");
        "windup" == a.easing && (a.easing = "cubic-bezier(0.6, -0.28, 0.735, 0.045)", a.easingFallback = "cubic-bezier(0.6, 0.28, 0.735, 0.045)");
        f = "list" == a.layoutMode && null != a.listEffects ? a.listEffects : a.effects;
        Array.prototype.indexOf && (a.fade = -1 < f.indexOf("fade") ? "0" : "", a.scale = -1 < f.indexOf("scale") ? "scale(.01)" : "", a.rotateZ = -1 < f.indexOf("rotateZ") ? "rotate(180deg)" : "", a.rotateY = -1 < f.indexOf("rotateY") ? "rotateY(90deg)" : "", a.rotateX = -1 < f.indexOf("rotateX") ? "rotateX(90deg)" : "", a.blur = -1 < f.indexOf("blur") ? "blur(8px)" : "", a.grayscale = -1 < f.indexOf("grayscale") ? "grayscale(100%)" : "");
        d = d.replace(/\s|\//g, ".");                                  // 71
        var q = e(),                                                   // 72
            s = e();                                                   //
        if ("or" == a.filterLogic) {                                   // 74
            var m = d.split(".");                                      // 75
            !0 == a.multiFilter && "" == m[0] && m.shift();            // 76
            1 > m.length ? s = s.add(c.find(r + ":visible")) : u.each(function () {
                for (var a = 0, b = e(this), c = 0; c < m.length; c++) b.hasClass(m[c]) && (q = q.add(b), a++);
                0 == a && (s = s.add(b));                              // 79
            });                                                        //
        } else q = q.add(k.find(r + "." + d)), s = s.add(k.find(r + ":not(." + d + "):visible"));
        d = q.length;                                                  // 83
        var t = e(),                                                   // 84
            p = e(),                                                   //
            l = e();                                                   //
        s.each(function () {                                           // 87
            var a = e(this);                                           // 88
            "none" != a.css("display") && (t = t.add(a), l = l.add(a));
        });                                                            //
        if (q.filter(":visible").length == d && !t.length && !b) {     // 91
            if (a.origLayout == a.layoutMode) return (j(), !1);        // 92
            if (1 == q.length) return ("list" == a.layoutMode ? (c.addClass(a.listClass), c.removeClass(a.gridClass), l.css("display", a.targetDisplayList)) : (c.addClass(a.gridClass), c.removeClass(a.listClass), l.css("display", a.targetDisplayGrid)), j(), !1);
        }                                                              //
        a.origHeight = k.height();                                     // 95
        if (q.length) {                                                // 96
            c.removeClass(a.failClass);                                // 97
            q.each(function () {                                       // 98
                var a = e(this);                                       // 99
                "none" == a.css("display") ? p = p.add(a) : l = l.add(a);
            });                                                        //
            if (a.origLayout != a.layoutMode && !1 == a.animateGridList) return ("list" == a.layoutMode ? (c.addClass(a.listClass), c.removeClass(a.gridClass), l.css("display", a.targetDisplayList)) : (c.addClass(a.gridClass), c.removeClass(a.listClass), l.css("display", a.targetDisplayGrid)), j(), !1);
            if (!window.atob) return (j(), !1);                        // 103
            u.css(a.clean);                                            // 104
            l.each(function () {                                       // 105
                this.data.origPos = e(this).offset();                  // 106
            });                                                        //
            "list" == a.layoutMode ? (c.addClass(a.listClass), c.removeClass(a.gridClass), p.css("display", a.targetDisplayList)) : (c.addClass(a.gridClass), c.removeClass(a.listClass), p.css("display", a.targetDisplayGrid));
            p.each(function () {                                       // 110
                this.data.showInterPos = e(this).offset();             // 111
            });                                                        //
            t.each(function () {                                       // 113
                this.data.hideInterPos = e(this).offset();             // 114
            });                                                        //
            l.each(function () {                                       // 116
                this.data.preInterPos = e(this).offset();              // 117
            });                                                        //
            "list" == a.layoutMode ? l.css("display", a.targetDisplayList) : l.css("display", a.targetDisplayGrid);
            b && v(b, h, c, a);                                        // 120
            if (b && a.origSort.compare(a.checkSort)) return (j(), !1);
            t.hide();                                                  // 122
            p.each(function () {                                       // 123
                this.data.finalPos = e(this).offset();                 // 124
            });                                                        //
            l.each(function () {                                       // 126
                this.data.finalPrePos = e(this).offset();              // 127
            });                                                        //
            a.newHeight = k.height();                                  // 129
            b && v("reset", null, c, a);                               // 130
            p.hide();                                                  // 131
            l.css("display", a.origDisplay);                           // 132
            "block" == a.origDisplay ? (c.addClass(a.listClass), p.css("display", a.targetDisplayList)) : (c.removeClass(a.listClass), p.css("display", a.targetDisplayGrid));
            a.resizeContainer && k.css("height", a.origHeight + "px");
            d = {};                                                    // 135
            for (f = 0; 2 > f; f++) n = 0 == f ? n = a.prefix : "", d[n + "transform"] = a.scale + " " + a.rotateX + " " + a.rotateY + " " + a.rotateZ, d[n + "filter"] = a.blur + " " + a.grayscale;
            p.css(d);                                                  // 138
            l.each(function () {                                       // 139
                var b = this.data,                                     // 140
                    c = e(this);                                       //
                c.hasClass("mix_tohide") ? (b.preTX = b.origPos.left - b.hideInterPos.left, b.preTY = b.origPos.top - b.hideInterPos.top) : (b.preTX = b.origPos.left - b.preInterPos.left, b.preTY = b.origPos.top - b.preInterPos.top);
                for (var d = {}, g = 0; 2 > g; g++) {                  // 143
                    var f = 0 == g ? f = a.prefix : "";                // 144
                    d[f + "transform"] = "translate(" + b.preTX + "px," + b.preTY + "px)";
                }                                                      //
                c.css(d);                                              // 147
            });                                                        //
            "list" == a.layoutMode ? (c.addClass(a.listClass), c.removeClass(a.gridClass)) : (c.addClass(a.gridClass), c.removeClass(a.listClass));
            setTimeout(function () {                                   // 151
                if (a.resizeContainer) {                               // 152
                    for (var b = {}, c = 0; 2 > c; c++) {              // 153
                        var d = 0 == c ? d = a.prefix : "";            // 154
                        b[d + "transition"] = "all " + g + "ms ease-in-out";
                        b.height = a.newHeight + "px";                 // 156
                    }                                                  //
                    k.css(b);                                          // 158
                }                                                      //
                t.css("opacity", a.fade);                              // 160
                p.css("opacity", 1);                                   // 161
                p.each(function () {                                   // 162
                    var b = this.data;                                 // 163
                    b.tX = b.finalPos.left - b.showInterPos.left;      // 164
                    b.tY = b.finalPos.top - b.showInterPos.top;        // 165
                    for (var c = {}, d = 0; 2 > d; d++) {              // 166
                        var f = 0 == d ? f = a.prefix : "";            // 167
                        c[f + "transition-property"] = f + "transform, " + f + "filter, opacity";
                        c[f + "transition-timing-function"] = a.easing + ", linear, linear";
                        c[f + "transition-duration"] = g + "ms";       // 171
                        c[f + "transition-delay"] = "0";               // 172
                        c[f + "transform"] = "translate(" + b.tX + "px," + b.tY + "px)";
                        c[f + "filter"] = "none";                      // 174
                    }                                                  //
                    e(this).css("-webkit-transition", "all " + g + "ms " + a.easingFallback).css(c);
                });                                                    //
                l.each(function () {                                   // 178
                    var b = this.data;                                 // 179
                    b.tX = 0 != b.finalPrePos.left ? b.finalPrePos.left - b.preInterPos.left : 0;
                    b.tY = 0 != b.finalPrePos.left ? b.finalPrePos.top - b.preInterPos.top : 0;
                    for (var c = {}, d = 0; 2 > d; d++) {              // 182
                        var f = 0 == d ? f = a.prefix : "";            // 183
                        c[f + "transition"] = "all " + g + "ms " + a.easing;
                        c[f + "transform"] = "translate(" + b.tX + "px," + b.tY + "px)";
                    }                                                  //
                    e(this).css("-webkit-transition", "all " + g + "ms " + a.easingFallback).css(c);
                });                                                    //
                b = {};                                                // 190
                for (c = 0; 2 > c; c++) d = 0 == c ? d = a.prefix : "", b[d + "transition"] = "all " + g + "ms " + a.easing + ", " + d + "filter " + g + "ms linear, opacity " + g + "ms linear", b[d + "transform"] = a.scale + " " + a.rotateX + " " + a.rotateY + " " + a.rotateZ, b[d + "filter"] = a.blur + " " + a.grayscale, b.opacity = a.fade;
                t.css(b);                                              // 192
                k.bind("webkitTransitionEnd transitionend otransitionend oTransitionEnd", function (a) {
                    if (-1 < a.originalEvent.propertyName.indexOf("transform") || -1 < a.originalEvent.propertyName.indexOf("opacity")) -1 < r.indexOf(".") ? e(a.target).hasClass(r.replace(".", "")) && j() : e(a.target).is(r) && j();
                });                                                    //
            }, 10);                                                    //
            a.failsafe = setTimeout(function () {                      // 198
                a.mixing && j();                                       // 199
            }, g + 400);                                               //
        } else {                                                       //
            a.resizeContainer && k.css("height", a.origHeight + "px");
            if (!window.atob) return (j(), !1);                        // 203
            t = s;                                                     // 204
            setTimeout(function () {                                   // 205
                k.css(a.perspective);                                  // 206
                if (a.resizeContainer) {                               // 207
                    for (var b = {}, d = 0; 2 > d; d++) {              // 208
                        var e = 0 == d ? e = a.prefix : "";            // 209
                        b[e + "transition"] = "height " + g + "ms ease-in-out";
                        b.height = a.minHeight + "px";                 // 211
                    }                                                  //
                    k.css(b);                                          // 213
                }                                                      //
                u.css(a.transition);                                   // 215
                if (s.length) {                                        // 216
                    b = {};                                            // 217
                    for (d = 0; 2 > d; d++) e = 0 == d ? e = a.prefix : "", b[e + "transform"] = a.scale + " " + a.rotateX + " " + a.rotateY + " " + a.rotateZ, b[e + "filter"] = a.blur + " " + a.grayscale, b.opacity = a.fade;
                    t.css(b);                                          // 219
                    k.bind("webkitTransitionEnd transitionend otransitionend oTransitionEnd", function (b) {
                        if (-1 < b.originalEvent.propertyName.indexOf("transform") || -1 < b.originalEvent.propertyName.indexOf("opacity")) c.addClass(a.failClass), j();
                    });                                                //
                } else a.mixing = !1;                                  //
            }, 10);                                                    //
        }                                                              //
    }                                                                  //
                                                                       //
    function v(d, b, h, c) {                                           // 228
        function a(a, b) {                                             // 230
            return 1 * a.attr(d).toLowerCase() < 1 * b.attr(d).toLowerCase() ? -1 : 1 * a.attr(d).toLowerCase() > 1 * b.attr(d).toLowerCase() ? 1 : 0;
        }                                                              //
                                                                       //
        function j(a) {                                                // 234
            "asc" == b ? f.prepend(a).prepend(" \
	") : f.append(a).append(" \
	");                                                                   //
        }                                                              //
        h.find(c.targetSelector).wrapAll('<div class="mix_sorter"/>');
        var f = h.find(".mix_sorter");                                 // 240
        c.origSort.length || f.find(c.targetSelector + ":visible").each(function () {
            e(this).wrap("<s/>");                                      // 242
            c.origSort.push(e(this).parent().html().replace(/\s+/g, ""));
            e(this).unwrap();                                          // 244
        });                                                            //
        f.empty();                                                     // 246
        if ("reset" == d) e.each(c.startOrder, function () {           // 247
            f.append(this).append(" \
	");                                                                   //
        });else if ("default" == d) e.each(c.origOrder, function () {  //
            j(this);                                                   // 253
        });else if ("random" == d) {                                   //
            if (!c.newOrder.length) {                                  // 256
                for (var g = c.startOrder.slice(), n = g.length, r = n; r--;) {
                    var m = parseInt(Math.random() * n),               // 258
                        k = g[r];                                      //
                    g[r] = g[m];                                       // 260
                    g[m] = k;                                          // 261
                }                                                      //
                c.newOrder = g;                                        // 263
            }                                                          //
            e.each(c.newOrder, function () {                           // 265
                f.append(this).append(" \
	");                                                                   //
            });                                                        //
        } else "custom" == d ? e.each(b, function () {                 //
            j(this);                                                   // 270
        }) : ("undefined" === typeof c.origOrder[0].attr(d) && console.log("No such attribute found. Terminating"), c.newOrder.length || (e.each(c.origOrder, function () {
            c.newOrder.push(e(this));                                  // 273
        }), c.newOrder.sort(a)), e.each(c.newOrder, function () {      //
            j(this);                                                   // 275
        }));                                                           //
        c.checkSort = [];                                              // 277
        f.find(c.targetSelector + ":visible").each(function (a) {      // 278
            var b = e(this);                                           // 279
            0 == a && b.attr("data-checksum", "1");                    // 280
            b.wrap("<s/>");                                            // 281
            c.checkSort.push(b.parent().html().replace(/\s+/g, ""));   // 282
            b.unwrap();                                                // 283
        });                                                            //
        h.find(c.targetSelector).unwrap();                             // 285
    }                                                                  //
    var w = {                                                          // 287
        init: function (d) {                                           // 288
            return this.each(function () {                             // 289
                var b = {                                              // 290
                    targetSelector: ".mix",                            // 291
                    filterSelector: ".filter",                         // 292
                    sortSelector: ".sort",                             // 293
                    buttonEvent: "click",                              // 294
                    effects: ["fade", "scale"],                        // 295
                    listEffects: null,                                 // 296
                    easing: "smooth",                                  // 297
                    layoutMode: "grid",                                // 298
                    targetDisplayGrid: "inline-block",                 // 299
                    targetDisplayList: "block",                        // 300
                    listClass: "",                                     // 301
                    gridClass: "",                                     // 302
                    transitionSpeed: 600,                              // 303
                    showOnLoad: "all",                                 // 304
                    multiFilter: !1,                                   // 305
                    filterLogic: "or",                                 // 306
                    resizeContainer: !0,                               // 307
                    minHeight: 0,                                      // 308
                    failClass: "fail",                                 // 309
                    perspectiveDistance: "3000",                       // 310
                    perspectiveOrigin: "50% 50%",                      // 311
                    animateGridList: !0,                               // 312
                    onMixLoad: null,                                   // 313
                    onMixStart: null,                                  // 314
                    onMixEnd: null,                                    // 315
                    container: null,                                   // 316
                    origOrder: [],                                     // 317
                    startOrder: [],                                    // 318
                    newOrder: [],                                      // 319
                    origSort: [],                                      // 320
                    checkSort: [],                                     // 321
                    filter: "",                                        // 322
                    mixing: !1,                                        // 323
                    origDisplay: "",                                   // 324
                    origLayout: "",                                    // 325
                    origHeight: 0,                                     // 326
                    newHeight: 0,                                      // 327
                    isTouch: !1,                                       // 328
                    resetDelay: 0,                                     // 329
                    failsafe: null,                                    // 330
                    prefix: "",                                        // 331
                    easingFallback: "ease-in-out",                     // 332
                    transition: {},                                    // 333
                    perspective: {},                                   // 334
                    clean: {},                                         // 335
                    fade: "1",                                         // 336
                    scale: "",                                         // 337
                    rotateX: "",                                       // 338
                    rotateY: "",                                       // 339
                    rotateZ: "",                                       // 340
                    blur: "",                                          // 341
                    grayscale: ""                                      // 342
                };                                                     //
                d && e.extend(b, d);                                   // 344
                this.config = b;                                       // 345
                e.support.touch = "ontouchend" in document;            // 346
                e.support.touch && (b.isTouch = !0, b.resetDelay = 350);
                b.container = e(this);                                 // 348
                var h = b.container,                                   // 349
                    c;                                                 //
                a: {                                                   // 351
                    c = h[0];                                          // 352
                    for (var a = ["Webkit", "Moz", "O", "ms"], j = 0; j < a.length; j++) if (a[j] + "Transition" in c.style) {
                        c = a[j];                                      // 355
                        break a;                                       // 356
                    }                                                  //
                    c = "transition" in c.style ? "" : !1;             // 358
                }                                                      //
                b.prefix = c;                                          // 360
                b.prefix = b.prefix ? "-" + b.prefix.toLowerCase() + "-" : "";
                h.find(b.targetSelector).each(function () {            // 363
                    b.origOrder.push(e(this));                         // 364
                });                                                    //
                for (c = 0; 2 > c; c++) a = 0 == c ? a = b.prefix : "", b.transition[a + "transition"] = "all " + b.transitionSpeed + "ms ease-in-out", b.perspective[a + "perspective"] = b.perspectiveDistance + "px", b.perspective[a + "perspective-origin"] = b.perspectiveOrigin;
                for (c = 0; 2 > c; c++) a = 0 == c ? a = b.prefix : "", b.clean[a + "transition"] = "none";
                "list" == b.layoutMode ? (h.addClass(b.listClass), b.origDisplay = b.targetDisplayList) : (h.addClass(b.gridClass), b.origDisplay = b.targetDisplayGrid);
                b.origLayout = b.layoutMode;                           // 370
                c = b.showOnLoad.split(" ");                           // 371
                e.each(c, function () {                                // 372
                    e(b.filterSelector + '[data-filter="' + this + '"]').addClass("active");
                });                                                    //
                h.find(b.targetSelector).addClass("mix_all");          // 375
                "all" == c[0] && (c[0] = "mix_all", b.showOnLoad = "mix_all");
                var f = e();                                           // 377
                e.each(c, function () {                                // 378
                    f = f.add(e("." + this));                          // 379
                });                                                    //
                f.each(function () {                                   // 381
                    var a = e(this);                                   // 382
                    "list" == b.layoutMode ? a.css("display", b.targetDisplayList) : a.css("display", b.targetDisplayGrid);
                    a.css(b.transition);                               // 384
                });                                                    //
                setTimeout(function () {                               // 386
                    b.mixing = !0;                                     // 387
                    f.css("opacity", "1");                             // 388
                    setTimeout(function () {                           // 389
                        "list" == b.layoutMode ? f.removeStyle(b.prefix + "transition, transition").css({
                            display: b.targetDisplayList,              // 391
                            opacity: 1                                 // 392
                        }) : f.removeStyle(b.prefix + "transition, transition").css({
                            display: b.targetDisplayGrid,              // 394
                            opacity: 1                                 // 395
                        });                                            //
                        b.mixing = !1;                                 // 397
                        if ("function" == typeof b.onMixLoad) {        // 398
                            var a = b.onMixLoad.call(this, b);         // 399
                            b = a ? a : b;                             // 400
                        }                                              //
                    }, b.transitionSpeed);                             //
                }, 10);                                                //
                b.filter = b.showOnLoad;                               // 404
                e(b.sortSelector).bind(b.buttonEvent, function () {    // 405
                    if (!b.mixing) {                                   // 406
                        var a = e(this),                               // 407
                            c = a.attr("data-sort"),                   //
                            d = a.attr("data-order");                  //
                        if (a.hasClass("active")) {                    // 410
                            if ("random" != c) return !1;              // 411
                        } else e(b.sortSelector).removeClass("active"), a.addClass("active");
                        h.find(b.targetSelector).each(function () {    // 413
                            b.startOrder.push(e(this));                // 414
                        });                                            //
                        m(b.filter, c, d, h, b);                       // 416
                    }                                                  //
                });                                                    //
                e(b.filterSelector).bind(b.buttonEvent, function () {  // 419
                    if (!b.mixing) {                                   // 420
                        var a = e(this);                               // 421
                        if (!1 == b.multiFilter) e(b.filterSelector).removeClass("active"), a.addClass("active"), b.filter = a.attr("data-filter"), e(b.filterSelector + '[data-filter="' + b.filter + '"]').addClass("active"), "all" == b.filter && (b.filter = "mix_all");else {
                            var c = a.attr("data-filter");             // 424
                            "all" == c && (c = "mix_all");             // 425
                            a.hasClass("active") ? (a.removeClass("active"), b.filter = b.filter.replace(RegExp("(\\s|^)" + c), "")) : (a.addClass("active"), b.filter = b.filter + " " + c);
                        }                                              //
                        m(b.filter, null, null, h, b);                 // 428
                    }                                                  //
                });                                                    //
            });                                                        //
        },                                                             //
        toGrid: function () {                                          // 433
            return this.each(function () {                             // 434
                var d = this.config;                                   // 435
                "grid" != d.layoutMode && (d.layoutMode = "grid", m(d.filter, null, null, e(this), d));
            });                                                        //
        },                                                             //
        toList: function () {                                          // 439
            return this.each(function () {                             // 440
                var d = this.config;                                   // 441
                "list" != d.layoutMode && (d.layoutMode = "list", m(d.filter, null, null, e(this), d));
            });                                                        //
        },                                                             //
        filter: function (d) {                                         // 446
            return this.each(function () {                             // 447
                var b = this.config;                                   // 448
                e(b.filterSelector).removeClass("active");             // 449
                e(b.filterSelector + '[data-filter="' + d + '"]').addClass("active");
                "all" == d && (d = "mix_all");                         // 451
                b.mixing || (b.filter = d, m(d, null, null, e(this), b));
            });                                                        //
        },                                                             //
        sort: function (d) {                                           // 455
            return this.each(function () {                             // 456
                var b = this.config;                                   // 457
                if (e.isArray(d)) var h = d[0],                        // 458
                    c = d[1];else h = d, c = "desc";                   //
                b.mixing || (e(this).find(b.targetSelector).each(function () {
                    b.startOrder.push(e(this));                        // 462
                }), m(b.filter, h, c, e(this), b));                    //
            });                                                        //
        }                                                              //
    };                                                                 //
    e.fn.mixitup = function (d, b) {                                   // 467
        if (w[d]) return w[d].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" === typeof d || !d) return w.init.apply(this, arguments);
    };                                                                 //
    e.fn.removeStyle = function (d) {                                  // 472
        return this.each(function () {                                 // 473
            var b = e(this);                                           // 474
            d = d.replace(/\s+/g, "");                                 // 475
            var h = d.split(",");                                      // 476
            e.each(h, function () {                                    // 477
                var c = RegExp(this.toString() + "[^;]+;?", "g");      // 478
                b.attr("style", function (a, b) {                      // 479
                    if (b) return b.replace(c, "");                    // 480
                });                                                    //
            });                                                        //
        });                                                            //
    };                                                                 //
    Array.prototype.compare = function (d) {                           // 485
        if (this.length != d.length) return !1;                        // 486
        for (var b = 0; b < d.length; b++) if (this[b].compare && !this[b].compare(d[b]) || this[b] !== d[b]) return !1;
        return !0;                                                     // 490
    };                                                                 //
})(jQuery);                                                            //
/////////////////////////////////////////////////////////////////////////

}).call(this);
