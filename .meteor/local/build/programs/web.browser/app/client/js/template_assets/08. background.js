(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/js/template_assets/08. background.js                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*! formstone v0.6.12 [background.js] 2015-06-19 | MIT License | formstone.it */
                                                                       //
!(function (a, b) {                                                    // 3
  "use strict";function c() {                                          // 3
    w.iterate.call(y, p);                                              // 3
  }function d() {                                                      //
    y = a(t.base);                                                     // 3
  }function e(b) {                                                     //
    b.youTubeGuid = 0, b.$container = a('<div class="' + u.container + '"></div>').appendTo(this), this.addClass([u.base, b.customClass].join(" "));var c = b.source;b.source = null, g(b, c, !0), d();
  }function f(a) {                                                     //
    a.$container.remove(), this.removeClass([u.base, a.customClass].join(" ")).off(v.namespace), d();
  }function g(b, c, d) {                                               //
    if (c !== b.source) {                                              // 3
      if ((b.source = c, b.responsive = !1, b.isYouTube = !1, "object" === a.type(c) && "string" === a.type(c.video))) {
        var e = c.video.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i);e && e.length >= 1 && (b.isYouTube = !0, b.videoId = e[1]);
      }var f = !b.isYouTube && "object" === a.type(c) && (c.hasOwnProperty("mp4") || c.hasOwnProperty("ogg") || c.hasOwnProperty("webm"));if ((b.video = b.isYouTube || f, b.playing = !1, b.isYouTube)) b.playerReady = !1, b.posterLoaded = !1, k(b, c, d);else if ("object" === a.type(c) && c.hasOwnProperty("poster")) j(b, c, d);else {
        var g = c;if ("object" === a.type(c)) {                        // 3
          var l,                                                       // 3
              m = {},                                                  //
              n = [];for (l in babelHelpers.sanitizeForInObject(c)) c.hasOwnProperty(l) && n.push(l);n.sort(w.sortAsc);for (l in babelHelpers.sanitizeForInObject(n)) n.hasOwnProperty(l) && (m[n[l]] = { width: parseInt(n[l]), url: c[n[l]] });b.responsive = !0, b.sources = m, g = h(b);
        }i(b, g, !1, d);                                               //
      }                                                                //
    } else b.$el.trigger(v.loaded);                                    //
  }function h(a) {                                                     //
    if (a.responsive) for (var c in babelHelpers.sanitizeForInObject(a.sources)) if (a.sources.hasOwnProperty(c) && b.windowWidth >= a.sources[c].width) return a.sources[c].url;return a.source;
  }function i(b, c, d, e) {                                            //
    var f = [u.media, u.image, e !== !0 ? u.animated : ""].join(" "),  // 3
        g = a('<div class="' + f + '"><img></div>'),                   //
        h = g.find("img"),                                             //
        i = c;h.one(v.load, function () {                              //
      z && g.addClass(u["native"]).css({ backgroundImage: "url('" + i + "')" }), g.transition({ property: "opacity" }, function () {
        d || l(b);                                                     // 3
      }).css({ opacity: 1 }), q(b), (!d || e) && b.$el.trigger(v.loaded);
    }).attr("src", i), b.responsive && g.addClass(u.responsive), b.$container.append(g), (h[0].complete || 4 === h[0].readyState) && h.trigger(v.load), b.currentSource = i;
  }function j(c, d, e) {                                               //
    if ((c.source && c.source.poster && (i(c, c.source.poster, !0, !0), e = !1), !b.isMobile)) {
      var f = [u.media, u.video, e !== !0 ? u.animated : ""].join(" "),
          g = '<div class="' + f + '">';g += "<video", c.loop && (g += " loop"), c.mute && (g += " muted"), g += ">", c.source.webm && (g += '<source src="' + c.source.webm + '" type="video/webm" />'), c.source.mp4 && (g += '<source src="' + c.source.mp4 + '" type="video/mp4" />'), c.source.ogg && (g += '<source src="' + c.source.ogg + '" type="video/ogg" />'), g += "</video>", g += "</div>";var h = a(g),
          j = h.find("video");j.one(v.loadedMetaData, function () {    //
        h.transition({ property: "opacity" }, function () {            // 3
          l(c);                                                        // 3
        }).css({ opacity: 1 }), q(c), c.$el.trigger(v.loaded), c.autoPlay && o(c);
      }), c.$container.append(h);                                      //
    }                                                                  //
  }function k(c, d, e) {                                               //
    if (!c.videoId) {                                                  // 3
      var f = d.match(/^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/);c.videoId = f[1];
    }if ((c.posterLoaded || (c.source.poster || (c.source.poster = "http://img.youtube.com/vi/" + c.videoId + "/0.jpg"), c.posterLoaded = !0, i(c, c.source.poster, !0, e), e = !1), !b.isMobile)) if ((a("script[src*='youtube.com/iframe_api']").length || a("head").append('<script src="//www.youtube.com/iframe_api"></script>'), A)) {
      var g = c.guid + "_" + c.youTubeGuid++,                          // 3
          h = [u.media, u.embed, e !== !0 ? u.animated : ""].join(" "),
          j = '<div class="' + h + '">';j += '<div id="' + g + '"></div>', j += "</div>";var k = a(j),
          m = a.extend(!0, {}, { controls: 0, rel: 0, showinfo: 0, wmode: "transparent", enablejsapi: 1, version: 3, playerapiid: g, loop: c.loop ? 1 : 0, autoplay: 1, origin: x.location.protocol + "//" + x.location.host }, c.youtubeOptions);c.$container.append(k), c.player && (c.oldPlayer = c.player, c.player = null), c.player = new x.YT.Player(g, { videoId: c.videoId, playerVars: m, events: { onReady: function () {
            c.playerReady = !0, c.mute && c.player.mute(), c.autoPlay && c.player.playVideo();
          }, onStateChange: function (a) {                             //
            c.playing || a.data !== x.YT.PlayerState.PLAYING ? c.loop && c.playing && a.data === x.YT.PlayerState.ENDED && c.player.playVideo() : (c.playing = !0, c.autoPlay || c.player.pauseVideo(), k.transition({ property: "opacity" }, function () {
              l(c);                                                    // 3
            }).css({ opacity: 1 }), q(c), c.$el.trigger(v.loaded)), c.$el.find(t.embed).addClass(u.ready);
          }, onPlaybackQualityChange: function () {}, onPlaybackRateChange: function () {}, onError: function () {}, onApiChange: function () {} } }), q(c);
    } else B.push({ data: c, source: d });                             //
  }function l(a) {                                                     //
    var b = a.$container.find(t.media);b.length >= 1 && (b.not(":last").remove(), a.oldPlayer = null);
  }function m(a) {                                                     //
    var b = a.$container.find(t.media);b.length >= 1 && b.transition({ property: "opacity" }, function () {
      b.remove(), delete a.source;                                     // 3
    }).css({ opacity: 0 });                                            //
  }function n(a) {                                                     //
    if (a.video) {                                                     // 3
      if (a.isYouTube && a.playerReady) a.player.pauseVideo();else {   // 3
        var b = a.$container.find("video");b.length && b[0].pause();   // 3
      }a.playing = !1;                                                 //
    }                                                                  //
  }function o(a) {                                                     //
    if (a.video) {                                                     // 3
      if (a.isYouTube && a.playerReady) a.player.playVideo();else {    // 3
        var b = a.$container.find("video");b.length && b[0].play();    // 3
      }a.playing = !0;                                                 //
    }                                                                  //
  }function p(a) {                                                     //
    if (a.responsive) {                                                // 3
      var b = h(a);b !== a.currentSource ? i(a, b, !1, !0) : q(a);     // 3
    } else q(a);                                                       //
  }function q(a) {                                                     //
    for (var b = a.$container.find(t.media), c = 0, d = b.length; d > c; c++) {
      var e = b.eq(c),                                                 // 3
          f = a.isYouTube ? "iframe" : e.find("video").length ? "video" : "img",
          g = e.find(f);if (g.length && ("img" !== f || !z)) {         //
        var h = a.$el.outerWidth(),                                    // 3
            i = a.$el.outerHeight(),                                   //
            j = r(a, g);a.width = j.width, a.height = j.height, a.left = 0, a.top = 0;var k = a.isYouTube ? a.embedRatio : a.width / a.height;a.height = i, a.width = a.height * k, a.width < h && (a.width = h, a.height = a.width / k), a.left = -(a.width - h) / 2, a.top = -(a.height - i) / 2, e.css({ height: a.height, width: a.width, left: a.left, top: a.top });
      }                                                                //
    }                                                                  //
  }function r(b, c) {                                                  //
    if (b.isYouTube) return { height: 500, width: 500 / b.embedRatio };if (c.is("img")) {
      var d = c[0];if ("undefined" !== a.type(d.naturalHeight)) return { height: d.naturalHeight, width: d.naturalWidth };var e = new Image();return (e.src = d.src, { height: e.height, width: e.width });
    }return { height: c[0].videoHeight, width: c[0].videoWidth };      //
  }var s = b.Plugin("background", { widget: !0, defaults: { autoPlay: !0, customClass: "", embedRatio: 1.777777, loop: !0, mute: !0, source: null, youtubeOptions: {} }, classes: ["container", "media", "animated", "responsive", "native", "fixed", "ready"], events: { loaded: "loaded", ready: "ready", loadedMetaData: "loadedmetadata" }, methods: { _construct: e, _destruct: f, _resize: c, play: o, pause: n, resize: q, load: g, unload: m } }),
      t = s.classes,                                                   //
      u = t.raw,                                                       //
      v = s.events,                                                    //
      w = s.functions,                                                 //
      x = b.window,                                                    //
      y = [],                                                          //
      z = ("backgroundSize" in b.document.documentElement.style),      //
      A = !1,                                                          //
      B = [];x.onYouTubeIframeAPIReady = function () {                 //
    A = !0;for (var a in babelHelpers.sanitizeForInObject(B)) B.hasOwnProperty(a) && k(B[a].data, B[a].source);B = [];
  };                                                                   //
})(jQuery, Formstone);                                                 //
/////////////////////////////////////////////////////////////////////////

}).call(this);
