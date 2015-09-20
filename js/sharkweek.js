$.fn.htmlHighlight = function(html) {
  var normalize;
  normalize = function(str) {
    return str.toString().toLowerCase().replace(/"/g, '');
  };
  return this.each(function() {
    var bfr, elm;
    elm = $(this);
    bfr = normalize(elm.html());
    if (bfr !== normalize(html)) {
      return elm.fadeOut(300, function() {
        return elm.html(html).fadeIn(300);
      });
    }
  });
};

/*fancybox*/
(function(C, z, f, r) {
  var q = f(C),
    n = f(z),
    b = f.fancybox = function() {
      b.open.apply(this, arguments)
    },
    H = navigator.userAgent.match(/msie/i),
    w = null,
    s = z.createTouch !== r,
    t = function(a) {
      return a && a.hasOwnProperty && a instanceof f
    },
    p = function(a) {
      return a && "string" === f.type(a)
    },
    F = function(a) {
      return p(a) && 0 < a.indexOf("%")
    },
    l = function(a, d) {
      var e = parseInt(a, 10) || 0;
      d && F(a) && (e *= b.getViewport()[d] / 100);
      return Math.ceil(e)
    },
    x = function(a, b) {
      return l(a, b) + "px"
    };
  f.extend(b, {
    version: "2.1.4",
    defaults: {
      padding: 15,
      margin: 20,
      width: 800,
      height: 600,
      minWidth: 100,
      minHeight: 100,
      maxWidth: 9999,
      maxHeight: 9999,
      autoSize: !0,
      autoHeight: !1,
      autoWidth: !1,
      autoResize: !0,
      autoCenter: !s,
      fitToView: !0,
      aspectRatio: !1,
      topRatio: 0.5,
      leftRatio: 0.5,
      scrolling: "auto",
      wrapCSS: "",
      arrows: !0,
      closeBtn: !0,
      closeClick: !1,
      nextClick: !1,
      mouseWheel: !0,
      autoPlay: !1,
      playSpeed: 3E3,
      preload: 3,
      modal: !1,
      loop: !0,
      ajax: {
        dataType: "html",
        headers: {
          "X-fancyBox": !0
        }
      },
      iframe: {
        scrolling: "auto",
        preload: !0
      },
      swf: {
        wmode: "transparent",
        allowfullscreen: "true",
        allowscriptaccess: "always"
      },
      keys: {
        next: {
          13: "left",
          34: "up",
          39: "left",
          40: "up"
        },
        prev: {
          8: "right",
          33: "down",
          37: "right",
          38: "down"
        },
        close: [27],
        play: [32],
        toggle: [70]
      },
      direction: {
        next: "left",
        prev: "right"
      },
      scrollOutside: !0,
      index: 0,
      type: null,
      href: null,
      content: null,
      title: null,
      tpl: {
        wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
        image: '<img class="fancybox-image" src="{href}" alt="" />',
        iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' +
          (H ? ' allowtransparency="true"' : "") + "></iframe>",
        error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
        closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
        next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
        prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
      },
      openEffect: "fade",
      openSpeed: 250,
      openEasing: "swing",
      openOpacity: !0,
      openMethod: "zoomIn",
      closeEffect: "fade",
      closeSpeed: 250,
      closeEasing: "swing",
      closeOpacity: !0,
      closeMethod: "zoomOut",
      nextEffect: "elastic",
      nextSpeed: 250,
      nextEasing: "swing",
      nextMethod: "changeIn",
      prevEffect: "elastic",
      prevSpeed: 250,
      prevEasing: "swing",
      prevMethod: "changeOut",
      helpers: {
        overlay: !0,
        title: !0
      },
      onCancel: f.noop,
      beforeLoad: f.noop,
      afterLoad: f.noop,
      beforeShow: f.noop,
      afterShow: f.noop,
      beforeChange: f.noop,
      beforeClose: f.noop,
      afterClose: f.noop
    },
    group: {},
    opts: {},
    previous: null,
    coming: null,
    current: null,
    isActive: !1,
    isOpen: !1,
    isOpened: !1,
    wrap: null,
    skin: null,
    outer: null,
    inner: null,
    player: {
      timer: null,
      isActive: !1
    },
    ajaxLoad: null,
    imgPreload: null,
    transitions: {},
    helpers: {},
    open: function(a, d) {
      if (a && (f.isPlainObject(d) || (d = {}), !1 !== b.close(!0))) return f.isArray(a) || (a = t(a) ? f(a).get() : [a]), f.each(a, function(e, c) {
        var k = {},
          g, h, j, m, l;
        "object" === f.type(c) && (c.nodeType && (c = f(c)), t(c) ? (k = {
          href: c.data("fancybox-href") || c.attr("href"),
          title: c.data("fancybox-title") || c.attr("title"),
          isDom: !0,
          element: c
        }, f.metadata && f.extend(!0, k,
          c.metadata())) : k = c);
        g = d.href || k.href || (p(c) ? c : null);
        h = d.title !== r ? d.title : k.title || "";
        m = (j = d.content || k.content) ? "html" : d.type || k.type;
        !m && k.isDom && (m = c.data("fancybox-type"), m || (m = (m = c.prop("class").match(/fancybox\.(\w+)/)) ? m[1] : null));
        p(g) && (m || (b.isImage(g) ? m = "image" : b.isSWF(g) ? m = "swf" : "#" === g.charAt(0) ? m = "inline" : p(c) && (m = "html", j = c)), "ajax" === m && (l = g.split(/\s+/, 2), g = l.shift(), l = l.shift()));
        j || ("inline" === m ? g ? j = f(p(g) ? g.replace(/.*(?=#[^\s]+$)/, "") : g) : k.isDom && (j = c) : "html" === m ? j = g : !m && (!g &&
          k.isDom) && (m = "inline", j = c));
        f.extend(k, {
          href: g,
          type: m,
          content: j,
          title: h,
          selector: l
        });
        a[e] = k
      }), b.opts = f.extend(!0, {}, b.defaults, d), d.keys !== r && (b.opts.keys = d.keys ? f.extend({}, b.defaults.keys, d.keys) : !1), b.group = a, b._start(b.opts.index)
    },
    cancel: function() {
      var a = b.coming;
      a && !1 !== b.trigger("onCancel") && (b.hideLoading(), b.ajaxLoad && b.ajaxLoad.abort(), b.ajaxLoad = null, b.imgPreload && (b.imgPreload.onload = b.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(), b.coming = null, b.current ||
        b._afterZoomOut(a))
    },
    close: function(a) {
      b.cancel();
      !1 !== b.trigger("beforeClose") && (b.unbindEvents(), b.isActive && (!b.isOpen || !0 === a ? (f(".fancybox-wrap").stop(!0).trigger("onReset").remove(), b._afterZoomOut()) : (b.isOpen = b.isOpened = !1, b.isClosing = !0, f(".fancybox-item, .fancybox-nav").remove(), b.wrap.stop(!0, !0).removeClass("fancybox-opened"), b.transitions[b.current.closeMethod]())))
    },
    play: function(a) {
      var d = function() {
          clearTimeout(b.player.timer)
        },
        e = function() {
          d();
          b.current && b.player.isActive && (b.player.timer =
            setTimeout(b.next, b.current.playSpeed))
        },
        c = function() {
          d();
          f("body").unbind(".player");
          b.player.isActive = !1;
          b.trigger("onPlayEnd")
        };
      if (!0 === a || !b.player.isActive && !1 !== a) {
        if (b.current && (b.current.loop || b.current.index < b.group.length - 1)) b.player.isActive = !0, f("body").bind({
          "afterShow.player onUpdate.player": e,
          "onCancel.player beforeClose.player": c,
          "beforeLoad.player": d
        }), e(), b.trigger("onPlayStart")
      } else c()
    },
    next: function(a) {
      var d = b.current;
      d && (p(a) || (a = d.direction.next), b.jumpto(d.index + 1, a, "next"))
    },
    prev: function(a) {
      var d = b.current;
      d && (p(a) || (a = d.direction.prev), b.jumpto(d.index - 1, a, "prev"))
    },
    jumpto: function(a, d, e) {
      var c = b.current;
      c && (a = l(a), b.direction = d || c.direction[a >= c.index ? "next" : "prev"], b.router = e || "jumpto", c.loop && (0 > a && (a = c.group.length + a % c.group.length), a %= c.group.length), c.group[a] !== r && (b.cancel(), b._start(a)))
    },
    reposition: function(a, d) {
      var e = b.current,
        c = e ? e.wrap : null,
        k;
      c && (k = b._getPosition(d), a && "scroll" === a.type ? (delete k.position, c.stop(!0, !0).animate(k, 200)) : (c.css(k), e.pos = f.extend({},
        e.dim, k)))
    },
    update: function(a) {
      var d = a && a.type,
        e = !d || "orientationchange" === d;
      e && (clearTimeout(w), w = null);
      b.isOpen && !w && (w = setTimeout(function() {
        var c = b.current;
        c && !b.isClosing && (b.wrap.removeClass("fancybox-tmp"), (e || "load" === d || "resize" === d && c.autoResize) && b._setDimension(), "scroll" === d && c.canShrink || b.reposition(a), b.trigger("onUpdate"), w = null)
      }, e && !s ? 0 : 300))
    },
    toggle: function(a) {
      b.isOpen && (b.current.fitToView = "boolean" === f.type(a) ? a : !b.current.fitToView, s && (b.wrap.removeAttr("style").addClass("fancybox-tmp"),
        b.trigger("onUpdate")), b.update())
    },
    hideLoading: function() {
      n.unbind(".loading");
      f("#fancybox-loading").remove()
    },
    showLoading: function() {
      var a, d;
      b.hideLoading();
      a = f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");
      n.bind("keydown.loading", function(a) {
        if (27 === (a.which || a.keyCode)) a.preventDefault(), b.cancel()
      });
      b.defaults.fixed || (d = b.getViewport(), a.css({
        position: "absolute",
        top: 0.5 * d.h + d.y,
        left: 0.5 * d.w + d.x
      }))
    },
    getViewport: function() {
      var a = b.current && b.current.locked ||
        !1,
        d = {
          x: q.scrollLeft(),
          y: q.scrollTop()
        };
      a ? (d.w = a[0].clientWidth, d.h = a[0].clientHeight) : (d.w = s && C.innerWidth ? C.innerWidth : q.width(), d.h = s && C.innerHeight ? C.innerHeight : q.height());
      return d
    },
    unbindEvents: function() {
      b.wrap && t(b.wrap) && b.wrap.unbind(".fb");
      n.unbind(".fb");
      q.unbind(".fb")
    },
    bindEvents: function() {
      var a = b.current,
        d;
      a && (q.bind("orientationchange.fb" + (s ? "" : " resize.fb") + (a.autoCenter && !a.locked ? " scroll.fb" : ""), b.update), (d = a.keys) && n.bind("keydown.fb", function(e) {
        var c = e.which || e.keyCode,
          k =
          e.target || e.srcElement;
        if (27 === c && b.coming) return !1;
        !e.ctrlKey && (!e.altKey && !e.shiftKey && !e.metaKey && (!k || !k.type && !f(k).is("[contenteditable]"))) && f.each(d, function(d, k) {
          if (1 < a.group.length && k[c] !== r) return b[d](k[c]), e.preventDefault(), !1;
          if (-1 < f.inArray(c, k)) return b[d](), e.preventDefault(), !1
        })
      }), f.fn.mousewheel && a.mouseWheel && b.wrap.bind("mousewheel.fb", function(d, c, k, g) {
        for (var h = f(d.target || null), j = !1; h.length && !j && !h.is(".fancybox-skin") && !h.is(".fancybox-wrap");) j = h[0] && !(h[0].style.overflow &&
          "hidden" === h[0].style.overflow) && (h[0].clientWidth && h[0].scrollWidth > h[0].clientWidth || h[0].clientHeight && h[0].scrollHeight > h[0].clientHeight), h = f(h).parent();
        if (0 !== c && !j && 1 < b.group.length && !a.canShrink) {
          if (0 < g || 0 < k) b.prev(0 < g ? "down" : "left");
          else if (0 > g || 0 > k) b.next(0 > g ? "up" : "right");
          d.preventDefault()
        }
      }))
    },
    trigger: function(a, d) {
      var e, c = d || b.coming || b.current;
      if (c) {
        f.isFunction(c[a]) && (e = c[a].apply(c, Array.prototype.slice.call(arguments, 1)));
        if (!1 === e) return !1;
        c.helpers && f.each(c.helpers, function(d,
          e) {
          e && (b.helpers[d] && f.isFunction(b.helpers[d][a])) && (e = f.extend(!0, {}, b.helpers[d].defaults, e), b.helpers[d][a](e, c))
        });
        f.event.trigger(a + ".fb")
      }
    },
    isImage: function(a) {
      return p(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i)
    },
    isSWF: function(a) {
      return p(a) && a.match(/\.(swf)((\?|#).*)?$/i)
    },
    _start: function(a) {
      var d = {},
        e, c;
      a = l(a);
      e = b.group[a] || null;
      if (!e) return !1;
      d = f.extend(!0, {}, b.opts, e);
      e = d.margin;
      c = d.padding;
      "number" === f.type(e) && (d.margin = [e, e, e, e]);
      "number" === f.type(c) &&
        (d.padding = [c, c, c, c]);
      d.modal && f.extend(!0, d, {
        closeBtn: !1,
        closeClick: !1,
        nextClick: !1,
        arrows: !1,
        mouseWheel: !1,
        keys: null,
        helpers: {
          overlay: {
            closeClick: !1
          }
        }
      });
      d.autoSize && (d.autoWidth = d.autoHeight = !0);
      "auto" === d.width && (d.autoWidth = !0);
      "auto" === d.height && (d.autoHeight = !0);
      d.group = b.group;
      d.index = a;
      b.coming = d;
      if (!1 === b.trigger("beforeLoad")) b.coming = null;
      else {
        c = d.type;
        e = d.href;
        if (!c) return b.coming = null, b.current && b.router && "jumpto" !== b.router ? (b.current.index = a, b[b.router](b.direction)) : !1;
        b.isActive = !0;
        if ("image" === c || "swf" === c) d.autoHeight = d.autoWidth = !1, d.scrolling = "visible";
        "image" === c && (d.aspectRatio = !0);
        "iframe" === c && s && (d.scrolling = "scroll");
        d.wrap = f(d.tpl.wrap).addClass("fancybox-" + (s ? "mobile" : "desktop") + " fancybox-type-" + c + " fancybox-tmp " + d.wrapCSS).appendTo(d.parent || "body");
        f.extend(d, {
          skin: f(".fancybox-skin", d.wrap),
          outer: f(".fancybox-outer", d.wrap),
          inner: f(".fancybox-inner", d.wrap)
        });
        f.each(["Top", "Right", "Bottom", "Left"], function(a, b) {
          d.skin.css("padding" + b, x(d.padding[a]))
        });
        b.trigger("onReady");
        if ("inline" === c || "html" === c) {
          if (!d.content || !d.content.length) return b._error("content")
        } else if (!e) return b._error("href");
        "image" === c ? b._loadImage() : "ajax" === c ? b._loadAjax() : "iframe" === c ? b._loadIframe() : b._afterLoad()
      }
    },
    _error: function(a) {
      f.extend(b.coming, {
        type: "html",
        autoWidth: !0,
        autoHeight: !0,
        minWidth: 0,
        minHeight: 0,
        scrolling: "no",
        hasError: a,
        content: b.coming.tpl.error
      });
      b._afterLoad()
    },
    _loadImage: function() {
      var a = b.imgPreload = new Image;
      a.onload = function() {
        this.onload = this.onerror = null;
        b.coming.width =
          this.width;
        b.coming.height = this.height;
        b._afterLoad()
      };
      a.onerror = function() {
        this.onload = this.onerror = null;
        b._error("image")
      };
      a.src = b.coming.href;
      !0 !== a.complete && b.showLoading()
    },
    _loadAjax: function() {
      var a = b.coming;
      b.showLoading();
      b.ajaxLoad = f.ajax(f.extend({}, a.ajax, {
        url: a.href,
        error: function(a, e) {
          b.coming && "abort" !== e ? b._error("ajax", a) : b.hideLoading()
        },
        success: function(d, e) {
          "success" === e && (a.content = d, b._afterLoad())
        }
      }))
    },
    _loadIframe: function() {
      var a = b.coming,
        d = f(a.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", s ? "auto" : a.iframe.scrolling).attr("src", a.href);
      f(a.wrap).bind("onReset", function() {
        try {
          f(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
        } catch (a) {}
      });
      a.iframe.preload && (b.showLoading(), d.one("load", function() {
        f(this).data("ready", 1);
        s || f(this).bind("load.fb", b.update);
        f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
        b._afterLoad()
      }));
      a.content = d.appendTo(a.inner);
      a.iframe.preload || b._afterLoad()
    },
    _preloadImages: function() {
      var a =
        b.group,
        d = b.current,
        e = a.length,
        c = d.preload ? Math.min(d.preload, e - 1) : 0,
        f, g;
      for (g = 1; g <= c; g += 1) f = a[(d.index + g) % e], "image" === f.type && f.href && ((new Image).src = f.href)
    },
    _afterLoad: function() {
      var a = b.coming,
        d = b.current,
        e, c, k, g, h;
      b.hideLoading();
      if (a && !1 !== b.isActive)
        if (!1 === b.trigger("afterLoad", a, d)) a.wrap.stop(!0).trigger("onReset").remove(), b.coming = null;
        else {
          d && (b.trigger("beforeChange", d), d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());
          b.unbindEvents();
          e = a.content;
          c = a.type;
          k = a.scrolling;
          f.extend(b, {
            wrap: a.wrap,
            skin: a.skin,
            outer: a.outer,
            inner: a.inner,
            current: a,
            previous: d
          });
          g = a.href;
          switch (c) {
            case "inline":
            case "ajax":
            case "html":
              a.selector ? e = f("<div>").html(e).find(a.selector) : t(e) && (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()), e = e.show().detach(), a.wrap.bind("onReset", function() {
                f(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
              }));
              break;
            case "image":
              e = a.tpl.image.replace("{href}", g);
              break;
            case "swf":
              e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + g + '"></param>', h = "", f.each(a.swf, function(a, b) {
                e += '<param name="' + a + '" value="' + b + '"></param>';
                h += " " + a + '="' + b + '"'
              }), e += '<embed src="' + g + '" type="application/x-shockwave-flash" width="100%" height="100%"' + h + "></embed></object>"
          }(!t(e) || !e.parent().is(a.inner)) && a.inner.append(e);
          b.trigger("beforeShow");
          a.inner.css("overflow", "yes" === k ? "scroll" : "no" === k ? "hidden" : k);
          b._setDimension();
          b.reposition();
          b.isOpen = !1;
          b.coming = null;
          b.bindEvents();
          if (b.isOpened) {
            if (d.prevMethod) b.transitions[d.prevMethod]()
          } else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();
          b.transitions[b.isOpened ? a.nextMethod : a.openMethod]();
          b._preloadImages()
        }
    },
    _setDimension: function() {
      var a = b.getViewport(),
        d = 0,
        e = !1,
        c = !1,
        e = b.wrap,
        k = b.skin,
        g = b.inner,
        h = b.current,
        c = h.width,
        j = h.height,
        m = h.minWidth,
        u = h.minHeight,
        n = h.maxWidth,
        v = h.maxHeight,
        s = h.scrolling,
        q = h.scrollOutside ? h.scrollbarWidth : 0,
        y = h.margin,
        p = l(y[1] + y[3]),
        r = l(y[0] + y[2]),
        z, A, t, D, B, G, C, E, w;
      e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");
      y = l(k.outerWidth(!0) - k.width());
      z = l(k.outerHeight(!0) - k.height());
      A = p + y;
      t = r + z;
      D = F(c) ? (a.w - A) * l(c) / 100 : c;
      B = F(j) ? (a.h - t) * l(j) / 100 : j;
      if ("iframe" === h.type) {
        if (w = h.content, h.autoHeight && 1 === w.data("ready")) try {
          w[0].contentWindow.document.location && (g.width(D).height(9999), G = w.contents().find("body"), q && G.css("overflow-x",
            "hidden"), B = G.height())
        } catch (H) {}
      } else if (h.autoWidth || h.autoHeight) g.addClass("fancybox-tmp"), h.autoWidth || g.width(D), h.autoHeight || g.height(B), h.autoWidth && (D = g.width()), h.autoHeight && (B = g.height()), g.removeClass("fancybox-tmp");
      c = l(D);
      j = l(B);
      E = D / B;
      m = l(F(m) ? l(m, "w") - A : m);
      n = l(F(n) ? l(n, "w") - A : n);
      u = l(F(u) ? l(u, "h") - t : u);
      v = l(F(v) ? l(v, "h") - t : v);
      G = n;
      C = v;
      h.fitToView && (n = Math.min(a.w - A, n), v = Math.min(a.h - t, v));
      A = a.w - p;
      r = a.h - r;
      h.aspectRatio ? (c > n && (c = n, j = l(c / E)), j > v && (j = v, c = l(j * E)), c < m && (c = m, j = l(c / E)), j < u &&
        (j = u, c = l(j * E))) : (c = Math.max(m, Math.min(c, n)), h.autoHeight && "iframe" !== h.type && (g.width(c), j = g.height()), j = Math.max(u, Math.min(j, v)));
      if (h.fitToView)
        if (g.width(c).height(j), e.width(c + y), a = e.width(), p = e.height(), h.aspectRatio)
          for (;
            (a > A || p > r) && (c > m && j > u) && !(19 < d++);) j = Math.max(u, Math.min(v, j - 10)), c = l(j * E), c < m && (c = m, j = l(c / E)), c > n && (c = n, j = l(c / E)), g.width(c).height(j), e.width(c + y), a = e.width(), p = e.height();
        else c = Math.max(m, Math.min(c, c - (a - A))), j = Math.max(u, Math.min(j, j - (p - r)));
      q && ("auto" === s && j < B && c + y +
        q < A) && (c += q);
      g.width(c).height(j);
      e.width(c + y);
      a = e.width();
      p = e.height();
      e = (a > A || p > r) && c > m && j > u;
      c = h.aspectRatio ? c < G && j < C && c < D && j < B : (c < G || j < C) && (c < D || j < B);
      f.extend(h, {
        dim: {
          width: x(a),
          height: x(p)
        },
        origWidth: D,
        origHeight: B,
        canShrink: e,
        canExpand: c,
        wPadding: y,
        hPadding: z,
        wrapSpace: p - k.outerHeight(!0),
        skinSpace: k.height() - j
      });
      !w && (h.autoHeight && j > u && j < v && !c) && g.height("auto")
    },
    _getPosition: function(a) {
      var d = b.current,
        e = b.getViewport(),
        c = d.margin,
        f = b.wrap.width() + c[1] + c[3],
        g = b.wrap.height() + c[0] + c[2],
        c = {
          position: "absolute",
          top: c[0],
          left: c[3]
        };
      d.autoCenter && d.fixed && !a && g <= e.h && f <= e.w ? c.position = "fixed" : d.locked || (c.top += e.y, c.left += e.x);
      c.top = x(Math.max(c.top, c.top + (e.h - g) * d.topRatio));
      c.left = x(Math.max(c.left, c.left + (e.w - f) * d.leftRatio));
      return c
    },
    _afterZoomIn: function() {
      var a = b.current;
      a && (b.isOpen = b.isOpened = !0, b.wrap.css("overflow", "visible").addClass("fancybox-opened"), b.update(), (a.closeClick || a.nextClick && 1 < b.group.length) && b.inner.css("cursor", "pointer").bind("click.fb", function(d) {
        !f(d.target).is("a") && !f(d.target).parent().is("a") &&
          (d.preventDefault(), b[a.closeClick ? "close" : "next"]())
      }), a.closeBtn && f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb", function(a) {
        a.preventDefault();
        b.close()
      }), a.arrows && 1 < b.group.length && ((a.loop || 0 < a.index) && f(a.tpl.prev).appendTo(b.outer).bind("click.fb", b.prev), (a.loop || a.index < b.group.length - 1) && f(a.tpl.next).appendTo(b.outer).bind("click.fb", b.next)), b.trigger("afterShow"), !a.loop && a.index === a.group.length - 1 ? b.play(!1) : b.opts.autoPlay && !b.player.isActive && (b.opts.autoPlay = !1, b.play()))
    },
    _afterZoomOut: function(a) {
      a =
        a || b.current;
      f(".fancybox-wrap").trigger("onReset").remove();
      f.extend(b, {
        group: {},
        opts: {},
        router: !1,
        current: null,
        isActive: !1,
        isOpened: !1,
        isOpen: !1,
        isClosing: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null
      });
      b.trigger("afterClose", a)
    }
  });
  b.transitions = {
    getOrigPosition: function() {
      var a = b.current,
        d = a.element,
        e = a.orig,
        c = {},
        f = 50,
        g = 50,
        h = a.hPadding,
        j = a.wPadding,
        m = b.getViewport();
      !e && (a.isDom && d.is(":visible")) && (e = d.find("img:first"), e.length || (e = d));
      t(e) ? (c = e.offset(), e.is("img") && (f = e.outerWidth(), g = e.outerHeight())) :
        (c.top = m.y + (m.h - g) * a.topRatio, c.left = m.x + (m.w - f) * a.leftRatio);
      if ("fixed" === b.wrap.css("position") || a.locked) c.top -= m.y, c.left -= m.x;
      return c = {
        top: x(c.top - h * a.topRatio),
        left: x(c.left - j * a.leftRatio),
        width: x(f + j),
        height: x(g + h)
      }
    },
    step: function(a, d) {
      var e, c, f = d.prop;
      c = b.current;
      var g = c.wrapSpace,
        h = c.skinSpace;
      if ("width" === f || "height" === f) e = d.end === d.start ? 1 : (a - d.start) / (d.end - d.start), b.isClosing && (e = 1 - e), c = "width" === f ? c.wPadding : c.hPadding, c = a - c, b.skin[f](l("width" === f ? c : c - g * e)), b.inner[f](l("width" ===
        f ? c : c - g * e - h * e))
    },
    zoomIn: function() {
      var a = b.current,
        d = a.pos,
        e = a.openEffect,
        c = "elastic" === e,
        k = f.extend({
          opacity: 1
        }, d);
      delete k.position;
      c ? (d = this.getOrigPosition(), a.openOpacity && (d.opacity = 0.1)) : "fade" === e && (d.opacity = 0.1);
      b.wrap.css(d).animate(k, {
        duration: "none" === e ? 0 : a.openSpeed,
        easing: a.openEasing,
        step: c ? this.step : null,
        complete: b._afterZoomIn
      })
    },
    zoomOut: function() {
      var a = b.current,
        d = a.closeEffect,
        e = "elastic" === d,
        c = {
          opacity: 0.1
        };
      e && (c = this.getOrigPosition(), a.closeOpacity && (c.opacity = 0.1));
      b.wrap.animate(c, {
        duration: "none" === d ? 0 : a.closeSpeed,
        easing: a.closeEasing,
        step: e ? this.step : null,
        complete: b._afterZoomOut
      })
    },
    changeIn: function() {
      var a = b.current,
        d = a.nextEffect,
        e = a.pos,
        c = {
          opacity: 1
        },
        f = b.direction,
        g;
      e.opacity = 0.1;
      "elastic" === d && (g = "down" === f || "up" === f ? "top" : "left", "down" === f || "right" === f ? (e[g] = x(l(e[g]) - 200), c[g] = "+=200px") : (e[g] = x(l(e[g]) + 200), c[g] = "-=200px"));
      "none" === d ? b._afterZoomIn() : b.wrap.css(e).animate(c, {
        duration: a.nextSpeed,
        easing: a.nextEasing,
        complete: b._afterZoomIn
      })
    },
    changeOut: function() {
      var a =
        b.previous,
        d = a.prevEffect,
        e = {
          opacity: 0.1
        },
        c = b.direction;
      "elastic" === d && (e["down" === c || "up" === c ? "top" : "left"] = ("up" === c || "left" === c ? "-" : "+") + "=200px");
      a.wrap.animate(e, {
        duration: "none" === d ? 0 : a.prevSpeed,
        easing: a.prevEasing,
        complete: function() {
          f(this).trigger("onReset").remove()
        }
      })
    }
  };
  b.helpers.overlay = {
    defaults: {
      closeClick: !0,
      speedOut: 200,
      showEarly: !0,
      css: {},
      locked: !s,
      fixed: !0
    },
    overlay: null,
    fixed: !1,
    create: function(a) {
      a = f.extend({}, this.defaults, a);
      this.overlay && this.close();
      this.overlay = f('<div class="fancybox-overlay"></div>').appendTo("body");
      this.fixed = !1;
      a.fixed && b.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
    },
    open: function(a) {
      var d = this;
      a = f.extend({}, this.defaults, a);
      this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a);
      this.fixed || (q.bind("resize.overlay", f.proxy(this.update, this)), this.update());
      a.closeClick && this.overlay.bind("click.overlay", function(a) {
        f(a.target).hasClass("fancybox-overlay") && (b.isActive ? b.close() : d.close())
      });
      this.overlay.css(a.css).show()
    },
    close: function() {
      f(".fancybox-overlay").remove();
      q.unbind("resize.overlay");
      this.overlay = null;
      !1 !== this.margin && (f("body").css("margin-right", this.margin), this.margin = !1);
      this.el && this.el.removeClass("fancybox-lock")
    },
    update: function() {
      var a = "100%",
        b;
      this.overlay.width(a).height("100%");
      H ? (b = Math.max(z.documentElement.offsetWidth, z.body.offsetWidth), n.width() > b && (a = n.width())) : n.width() > q.width() && (a = n.width());
      this.overlay.width(a).height(n.height())
    },
    onReady: function(a, b) {
      f(".fancybox-overlay").stop(!0, !0);
      this.overlay || (this.margin = n.height() > q.height() || "scroll" === f("body").css("overflow-y") ? f("body").css("margin-right") : !1, this.el = z.all && !z.querySelector ? f("html") : f("body"), this.create(a));
      a.locked && this.fixed && (b.locked = this.overlay.append(b.wrap), b.fixed = !1);
      !0 === a.showEarly && this.beforeShow.apply(this, arguments)
    },
    beforeShow: function(a, b) {
      b.locked && (this.el.addClass("fancybox-lock"), !1 !== this.margin && f("body").css("margin-right", l(this.margin) + b.scrollbarWidth));
      this.open(a)
    },
    onUpdate: function() {
      this.fixed ||
        this.update()
    },
    afterClose: function(a) {
      this.overlay && !b.isActive && this.overlay.fadeOut(a.speedOut, f.proxy(this.close, this))
    }
  };
  b.helpers.title = {
    defaults: {
      type: "float",
      position: "bottom"
    },
    beforeShow: function(a) {
      var d = b.current,
        e = d.title,
        c = a.type;
      f.isFunction(e) && (e = e.call(d.element, d));
      if (p(e) && "" !== f.trim(e)) {
        d = f('<div class="fancybox-title fancybox-title-' + c + '-wrap">' + e + "</div>");
        switch (c) {
          case "inside":
            c = b.skin;
            break;
          case "outside":
            c = b.wrap;
            break;
          case "over":
            c = b.inner;
            break;
          default:
            c = b.skin, d.appendTo("body"),
            H && d.width(d.width()), d.wrapInner('<span class="child"></span>'), b.current.margin[2] += Math.abs(l(d.css("margin-bottom")))
        }
        d["top" === a.position ? "prependTo" : "appendTo"](c)
      }
    }
  };
  f.fn.fancybox = function(a) {
    var d, e = f(this),
      c = this.selector || "",
      k = function(g) {
        var h = f(this).blur(),
          j = d,
          k, l;
        !g.ctrlKey && (!g.altKey && !g.shiftKey && !g.metaKey) && !h.is(".fancybox-wrap") && (k = a.groupAttr || "data-fancybox-group", l = h.attr(k), l || (k = "rel", l = h.get(0)[k]), l && ("" !== l && "nofollow" !== l) && (h = c.length ? f(c) : e, h = h.filter("[" + k + '="' + l +
          '"]'), j = h.index(this)), a.index = j, !1 !== b.open(h, a) && g.preventDefault())
      };
    a = a || {};
    d = a.index || 0;
    !c || !1 === a.live ? e.unbind("click.fb-start").bind("click.fb-start", k) : n.undelegate(c, "click.fb-start").delegate(c + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", k);
    this.filter("[data-fancybox-start=1]").trigger("click");
    return this
  };
  n.ready(function() {
    f.scrollbarWidth === r && (f.scrollbarWidth = function() {
      var a = f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
        b = a.children(),
        b = b.innerWidth() - b.height(99).innerWidth();
      a.remove();
      return b
    });
    if (f.support.fixedPosition === r) {
      var a = f.support,
        d = f('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
        e = 20 === d[0].offsetTop || 15 === d[0].offsetTop;
      d.remove();
      a.fixedPosition = e
    }
    f.extend(b.defaults, {
      scrollbarWidth: f.scrollbarWidth(),
      fixed: f.support.fixedPosition,
      parent: f("body")
    })
  })
})(window, document, jQuery);

// Generated by CoffeeScript 1.4.0
/*
jQuery Waypoints - v2.0.2
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function() {
  var t = [].indexOf || function(t) {
      for (var e = 0, n = this.length; e < n; e++) {
        if (e in this && this[e] === t) return e
      }
      return -1
    },
    e = [].slice;
  (function(t, e) {
    if (typeof define === "function" && define.amd) {
      return define("waypoints", ["jquery"], function(n) {
        return e(n, t)
      })
    } else {
      return e(t.jQuery, t)
    }
  })(this, function(n, r) {
    var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
    i = n(r);
    c = t.call(r, "ontouchstart") >= 0;
    s = {
      horizontal: {},
      vertical: {}
    };
    f = 1;
    a = {};
    u = "waypoints-context-id";
    p = "resize.waypoints";
    y = "scroll.waypoints";
    v = 1;
    w = "waypoints-waypoint-ids";
    g = "waypoint";
    m = "waypoints";
    o = function() {
      function t(t) {
        var e = this;
        this.$element = t;
        this.element = t[0];
        this.didResize = false;
        this.didScroll = false;
        this.id = "context" + f++;
        this.oldScroll = {
          x: t.scrollLeft(),
          y: t.scrollTop()
        };
        this.waypoints = {
          horizontal: {},
          vertical: {}
        };
        t.data(u, this.id);
        a[this.id] = this;
        t.bind(y, function() {
          var t;
          if (!(e.didScroll || c)) {
            e.didScroll = true;
            t = function() {
              e.doScroll();
              return e.didScroll = false
            };
            return r.setTimeout(t, n[m].settings.scrollThrottle)
          }
        });
        t.bind(p, function() {
          var t;
          if (!e.didResize) {
            e.didResize = true;
            t = function() {
              n[m]("refresh");
              return e.didResize = false
            };
            return r.setTimeout(t, n[m].settings.resizeThrottle)
          }
        })
      }
      t.prototype.doScroll = function() {
        var t, e = this;
        t = {
          horizontal: {
            newScroll: this.$element.scrollLeft(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left"
          },
          vertical: {
            newScroll: this.$element.scrollTop(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up"
          }
        };
        if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
          n[m]("refresh")
        }
        n.each(t, function(t, r) {
          var i, o, l;
          l = [];
          o = r.newScroll > r.oldScroll;
          i = o ? r.forward : r.backward;
          n.each(e.waypoints[t], function(t, e) {
            var n, i;
            if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
              return l.push(e)
            } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
              return l.push(e)
            }
          });
          l.sort(function(t, e) {
            return t.offset - e.offset
          });
          if (!o) {
            l.reverse()
          }
          return n.each(l, function(t, e) {
            if (e.options.continuous || t === l.length - 1) {
              return e.trigger([i])
            }
          })
        });
        return this.oldScroll = {
          x: t.horizontal.newScroll,
          y: t.vertical.newScroll
        }
      };
      t.prototype.refresh = function() {
        var t, e, r, i = this;
        r = n.isWindow(this.element);
        e = this.$element.offset();
        this.doScroll();
        t = {
          horizontal: {
            contextOffset: r ? 0 : e.left,
            contextScroll: r ? 0 : this.oldScroll.x,
            contextDimension: this.$element.width(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left",
            offsetProp: "left"
          },
          vertical: {
            contextOffset: r ? 0 : e.top,
            contextScroll: r ? 0 : this.oldScroll.y,
            contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up",
            offsetProp: "top"
          }
        };
        return n.each(t, function(t, e) {
          return n.each(i.waypoints[t], function(t, r) {
            var i, o, l, s, f;
            i = r.options.offset;
            l = r.offset;
            o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
            if (n.isFunction(i)) {
              i = i.apply(r.element)
            } else if (typeof i === "string") {
              i = parseFloat(i);
              if (r.options.offset.indexOf("%") > -1) {
                i = Math.ceil(e.contextDimension * i / 100)
              }
            }
            r.offset = o - e.contextOffset + e.contextScroll - i;
            if (r.options.onlyOnScroll && l != null || !r.enabled) {
              return
            }
            if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
              return r.trigger([e.backward])
            } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
              return r.trigger([e.forward])
            } else if (l === null && e.oldScroll >= r.offset) {
              return r.trigger([e.forward])
            }
          })
        })
      };
      t.prototype.checkEmpty = function() {
        if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
          this.$element.unbind([p, y].join(" "));
          return delete a[this.id]
        }
      };
      return t
    }();
    l = function() {
      function t(t, e, r) {
        var i, o;
        r = n.extend({}, n.fn[g].defaults, r);
        if (r.offset === "bottom-in-view") {
          r.offset = function() {
            var t;
            t = n[m]("viewportHeight");
            if (!n.isWindow(e.element)) {
              t = e.$element.height()
            }
            return t - n(this).outerHeight()
          }
        }
        this.$element = t;
        this.element = t[0];
        this.axis = r.horizontal ? "horizontal" : "vertical";
        this.callback = r.handler;
        this.context = e;
        this.enabled = r.enabled;
        this.id = "waypoints" + v++;
        this.offset = null;
        this.options = r;
        e.waypoints[this.axis][this.id] = this;
        s[this.axis][this.id] = this;
        i = (o = t.data(w)) != null ? o : [];
        i.push(this.id);
        t.data(w, i)
      }
      t.prototype.trigger = function(t) {
        if (!this.enabled) {
          return
        }
        if (this.callback != null) {
          this.callback.apply(this.element, t)
        }
        if (this.options.triggerOnce) {
          return this.destroy()
        }
      };
      t.prototype.disable = function() {
        return this.enabled = false
      };
      t.prototype.enable = function() {
        this.context.refresh();
        return this.enabled = true
      };
      t.prototype.destroy = function() {
        delete s[this.axis][this.id];
        delete this.context.waypoints[this.axis][this.id];
        return this.context.checkEmpty()
      };
      t.getWaypointsByElement = function(t) {
        var e, r;
        r = n(t).data(w);
        if (!r) {
          return []
        }
        e = n.extend({}, s.horizontal, s.vertical);
        return n.map(r, function(t) {
          return e[t]
        })
      };
      return t
    }();
    d = {
      init: function(t, e) {
        var r;
        if (e == null) {
          e = {}
        }
        if ((r = e.handler) == null) {
          e.handler = t
        }
        this.each(function() {
          var t, r, i, s;
          t = n(this);
          i = (s = e.context) != null ? s : n.fn[g].defaults.context;
          if (!n.isWindow(i)) {
            i = t.closest(i)
          }
          i = n(i);
          r = a[i.data(u)];
          if (!r) {
            r = new o(i)
          }
          return new l(t, r, e)
        });
        n[m]("refresh");
        return this
      },
      disable: function() {
        return d._invoke(this, "disable")
      },
      enable: function() {
        return d._invoke(this, "enable")
      },
      destroy: function() {
        return d._invoke(this, "destroy")
      },
      prev: function(t, e) {
        return d._traverse.call(this, t, e, function(t, e, n) {
          if (e > 0) {
            return t.push(n[e - 1])
          }
        })
      },
      next: function(t, e) {
        return d._traverse.call(this, t, e, function(t, e, n) {
          if (e < n.length - 1) {
            return t.push(n[e + 1])
          }
        })
      },
      _traverse: function(t, e, i) {
        var o, l;
        if (t == null) {
          t = "vertical"
        }
        if (e == null) {
          e = r
        }
        l = h.aggregate(e);
        o = [];
        this.each(function() {
          var e;
          e = n.inArray(this, l[t]);
          return i(o, e, l[t])
        });
        return this.pushStack(o)
      },
      _invoke: function(t, e) {
        t.each(function() {
          var t;
          t = l.getWaypointsByElement(this);
          return n.each(t, function(t, n) {
            n[e]();
            return true
          })
        });
        return this
      }
    };
    n.fn[g] = function() {
      var t, r;
      r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
      if (d[r]) {
        return d[r].apply(this, t)
      } else if (n.isFunction(r)) {
        return d.init.apply(this, arguments)
      } else if (n.isPlainObject(r)) {
        return d.init.apply(this, [null, r])
      } else if (!r) {
        return n.error("jQuery Waypoints needs a callback function or handler option.")
      } else {
        return n.error("The " + r + " method does not exist in jQuery Waypoints.")
      }
    };
    n.fn[g].defaults = {
      context: r,
      continuous: true,
      enabled: true,
      horizontal: false,
      offset: 0,
      triggerOnce: false
    };
    h = {
      refresh: function() {
        return n.each(a, function(t, e) {
          return e.refresh()
        })
      },
      viewportHeight: function() {
        var t;
        return (t = r.innerHeight) != null ? t : i.height()
      },
      aggregate: function(t) {
        var e, r, i;
        e = s;
        if (t) {
          e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0
        }
        if (!e) {
          return []
        }
        r = {
          horizontal: [],
          vertical: []
        };
        n.each(r, function(t, i) {
          n.each(e[t], function(t, e) {
            return i.push(e)
          });
          i.sort(function(t, e) {
            return t.offset - e.offset
          });
          r[t] = n.map(i, function(t) {
            return t.element
          });
          return r[t] = n.unique(r[t])
        });
        return r
      },
      above: function(t) {
        if (t == null) {
          t = r
        }
        return h._filter(t, "vertical", function(t, e) {
          return e.offset <= t.oldScroll.y
        })
      },
      below: function(t) {
        if (t == null) {
          t = r
        }
        return h._filter(t, "vertical", function(t, e) {
          return e.offset > t.oldScroll.y
        })
      },
      left: function(t) {
        if (t == null) {
          t = r
        }
        return h._filter(t, "horizontal", function(t, e) {
          return e.offset <= t.oldScroll.x
        })
      },
      right: function(t) {
        if (t == null) {
          t = r
        }
        return h._filter(t, "horizontal", function(t, e) {
          return e.offset > t.oldScroll.x
        })
      },
      enable: function() {
        return h._invoke("enable")
      },
      disable: function() {
        return h._invoke("disable")
      },
      destroy: function() {
        return h._invoke("destroy")
      },
      extendFn: function(t, e) {
        return d[t] = e
      },
      _invoke: function(t) {
        var e;
        e = n.extend({}, s.vertical, s.horizontal);
        return n.each(e, function(e, n) {
          n[t]();
          return true
        })
      },
      _filter: function(t, e, r) {
        var i, o;
        i = a[n(t).data(u)];
        if (!i) {
          return []
        }
        o = [];
        n.each(i.waypoints[e], function(t, e) {
          if (r(i, e)) {
            return o.push(e)
          }
        });
        o.sort(function(t, e) {
          return t.offset - e.offset
        });
        return n.map(o, function(t) {
          return t.element
        })
      }
    };
    n[m] = function() {
      var t, n;
      n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
      if (h[n]) {
        return h[n].apply(null, t)
      } else {
        return h.aggregate.call(null, n)
      }
    };
    n[m].settings = {
      resizeThrottle: 100,
      scrollThrottle: 30
    };
    return i.load(function() {
      return n[m]("refresh")
    })
  })
}).call(this);


/* STORe.js */

var Store;

Store = window.Store = {
  errors: [],
  init: function() {
    var page;
    page = $('body').attr('id');
    this.inPreview = /\/admin\/design/.test(top.location.pathname);
    this.common();
    this[page] && typeof this[page]['init'] === 'function' && this[page]['init'](this);
    return setTimeout((function(_this) {
      return function() {
        return $('body').addClass('loaded');
      };
    })(this), this.inPreview ? 500 : 0);
  },
  common: function() {
    $('body').imagesLoaded(this.fixHeights);
    this.hideUrlBar();
    $('body').data('search') === true && this.setupSearch();
    $(document).ajaxSend(this.working).ajaxComplete(this.finished);
    window.API.onError = (function(_this) {
      return function(error) {
        return _this.error(error);
      };
    })(this);
    if (!this.cookiesEnabled()) {
      this.errors.push('Cookies must be enabled to use this store');
    }
    if (this.errors.length) {
      return setTimeout($.proxy(this.error, this, this.errors), 500);
    }
  },
  fixHeights: function() {
    var dh, m, mh;
    m = $('.main .page');
    m.css({
      height: 'auto'
    });
    mh = m.outerHeight();
    dh = $(document).height();
    return mh < dh && m.css({
      height: dh - m.offset().top
    });
  },
  setupMobileNav: function() {
    return $('.main header .menu').on('click', function(e) {
      e.preventDefault();
      return $('body').toggleClass('show_menu');
    });
  },
  hideUrlBar: function() {
    if (window.scrollTo && typeof window.scrollTo === 'function') {
      return window.addEventListener('load', (function(_this) {
        return function() {
          return setTimeout(function() {
            return window.scrollTo(0, 1);
          }, 0);
        };
      })(this));
    }
  },
  setupSearch: function() {
    var blur, focus, searchForm;
    searchForm = $('form.search');
    focus = function() {
      return searchForm.addClass('focus');
    };
    blur = function() {
      $(this).val('');
      return searchForm.removeClass('focus');
    };
    searchForm.on('click focus', focus);
    return searchForm.on('blur', 'input', blur);
  },
  working: function() {
    return $('body').addClass('working');
  },
  finished: function() {
    return $('body').removeClass('working');
  },
  error: function(error) {
    var elm;
    this.clearErrors();
    this.finished();
    if (Object.prototype.toString.call(error) === '[object Array]') {
      error = error.join('</li><li>');
    } else {
      return true;
    }
    elm = $("<div class='errors' style='display:none;cursor:pointer'><ul><li>" + error + "</li></ul></div>");
    if ($('.main h1').length) {
      elm.insertAfter('.main h1:first');
    } else {
      elm.prependTo('.main > div:first');
    }
    elm.on('click', $.proxy(this.clearErrors, this));
    elm.slideDown('fast');
    $('html, body').animate({
      scrollTop: 0
    }, {
      duration: 500,
      easing: 'swing'
    });
    return $('body').trigger('api.error');
  },
  clearErrors: function() {
    return $('.errors').slideUp('fast', function() {
      return $(this).remove();
    });
  },
  updateCart: function(cart) {
    $('aside .cart .count, .main header .cart').htmlHighlight(cart.item_count);
    return $('aside .cart .total').htmlHighlight(Format.money(cart.total, true, true));
  },
  cookiesEnabled: function() {
    var cookieEnabled;
    cookieEnabled = navigator.cookieEnabled;
    if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
      document.cookie = 'testcookie';
      cookieEnabled = document.cookie.indexOf('testcookie') !== -1;
    }
    return cookieEnabled;
  }
};

$(function() {
  return Store.init();
});

/* CART */

Store.cart = window.Store.cart = {
  init: function(_super) {
    this["super"] = _super;
    this.form = $('#cart_form');
    this.timer = null;
    this.form.find('input, select').each(this.setDefaultVal);
    this.form.on('keyup change', '[name*="cart[update]"], [name="cart[discount_code]"], [name="cart[shipping_country_id]"]', $.proxy(this.handleItemUpdate, this));
    return this.form.on('click', 'a.remove', $.proxy(this.handleItemRemove, this));
  },
  setDefaultVal: function() {
    var elm;
    elm = $(this);
    return elm.data('defaultVal', elm.val());
  },
  handleItemRemove: function(e) {
    var link;
    e.preventDefault();
    this["super"].clearErrors();
    this["super"].working();
    link = $(e.currentTarget);
    link.addClass('loading');
    return Cart.removeItem(link.data('item-id'), $.proxy(this.updateCart, this));
  },
  handleItemUpdate: function(e) {
    var elm, val;
    elm = $(e.currentTarget);
    val = elm.val();
    if (!(val === '' || val === elm.data('defaultVal'))) {
      clearTimeout(this.timer);
      return this.timer = setTimeout($.proxy(this.processItemUpdate, this, elm, val), 500);
    }
  },
  processItemUpdate: function(elm, val) {
    elm.data('defaultVal', val);
    this["super"].clearErrors();
    this["super"].working();
    return Cart.updateFromForm('cart_form', $.proxy(this.updateCart, this));
  },
  updateCart: function(cart) {
    this["super"].finished();
    this["super"].updateCart(cart);
    if (cart.item_count) {
      this.updateItems(cart);
      this.updateDiscount(cart);
      this.updateShipping(cart);
      return this.updateTotal(cart);
    } else {
      return this.form.fadeOut(300, function() {
        $(this).remove();
        return $('.cart_empty').fadeIn(300);
      });
    }
  },
  updateItems: function(cart) {
    var removed;
    removed = 0;
    return $('.cart_item[data-item-id]', this.form).each(function(index) {
      var elm, id, item;
      elm = $(this);
      id = Number(elm.data('item-id'));
      item = cart.items[index - removed];
      if (item && id === item.id) {
        return elm.find('.price').htmlHighlight(Format.money(item.price, true, true));
      } else {
        removed++;
        return elm.slideUp('fast', function() {
          return elm.remove();
        });
      }
    });
  },
  updateDiscount: function(cart) {
    if (cart.discount) {
      $('#cart_discount_code').fadeOut(300, function() {
        return $(this).remove();
      });
      $('label[for=cart_discount_code]').htmlHighlight(cart.discount.name);
      return $('.discount .value').htmlHighlight(cart.discount.free_shipping ? '' : Format.money(cart.discount.amount, true, true));
    }
  },
  updateShipping: function(cart) {
    if (cart.shipping) {
      $('.cart_shipping_value').toggle(!cart.shipping.pending).htmlHighlight(Format.money(cart.shipping.amount, true, true));
      return $('#country').toggle(cart.shipping.strict);
    }
  },
  updateTotal: function(cart) {
    return $('.total_price', this.form).htmlHighlight(Format.money(cart.total, true, true));
  }
};

/* CONTACT */

Store.contact = window.Store.contact = {
  init: function(_super) {
    this["super"] = _super;
    if (!this["super"].inPreview) {
      return $('form.contact input:visible:first').focus();
    }
  }
};

/* product */
Store.product = window.Store.product = {
  messages: {
    addToCart: 'Add to Cart',
    addingToCart: 'Adding&hellip;',
    addedToCart: 'Added!'
  },
  init: function(_super) {
    this["super"] = _super;
    $('.fancybox').fancybox();
    this.setupAddToCart();
    return this.setupMobileGallery();
  },
  setupAddToCart: function() {
    this.button = $('button.add');
    this.form = $('form.add');
    this.form.on('submit', $.proxy(this.addToCart, this));
    return $('body').on('api.error', $.proxy(this.resolveError, this));
  },
  addToCart: function(e) {
    var item, quantity;
    e.preventDefault();
    if (this.button.hasClass('disabled')) {
      return false;
    }
    this["super"].working();
    this["super"].clearErrors();
    this.button.html(this.messages.addingToCart).addClass('disabled');
    item = $('[name="cart[add][id]"]').val();
    quantity = $('[name="cart[add][quantity]"]').val();
    return Cart.addItem(item, quantity, $.proxy(this.finishAdding, this));
  },
  finishAdding: function(cart) {
    this["super"].finished();
    this["super"].updateCart(cart);
    this.button.html(this.messages.addedToCart).removeClass('disabled');
    return setTimeout($.proxy(function() {
      return this.button.html(this.messages.addToCart);
    }, this), 3000);
  },
  resolveError: function(e) {
    this.button.html(this.messages.addToCart).removeClass('disabled');
    return this["super"].finished();
  },
  setupMobileGallery: function() {
    return $('.mobile_gallery').on('click', 'a', $.proxy(this.setActiveImage, this));
  },
  setActiveImage: function(e) {
    var elm, img;
    e.preventDefault();
    elm = $(e.currentTarget);
    img = $("<img src='" + (elm.attr('href')) + "' class='mobile_gallery_viewer'>");
    img.imagesLoaded((function(_this) {
      return function() {
        $('.mobile_gallery_viewer').replaceWith(img);
        return _this["super"].fixHeights();
      };
    })(this));
    return elm.closest('li').addClass('active').siblings().removeClass('active');
  }
};

/* PRODUCTS */
Store.products = window.Store.products = {
  breakPoint: 765,
  init: function(_super) {
    this["super"] = _super;
    this.products = $('.products_list');
    this.scrollTrigger = $(this["super"].infiniteOptions.paginationSelector);
    return this["super"].infiniteOptions && this.prefillPage();
  },
  prefillPage: function() {
    var url;
    if ($(this["super"].infiniteOptions.moreSelector).length !== 0) {
      url = $(this["super"].infiniteOptions.moreSelector).attr('href');
      if (this.products.height() + this.products.offset().top < $(window).height()) {
        return this.fetchNextPage(url, $.proxy(this.prefillPage, this));
      } else {
        return this.setupWaypoints();
      }
    }
  },
  setupWaypoints: function() {
    var url;
    if (this["super"].infiniteOptions) {
      url = $(this["super"].infiniteOptions.moreSelector).attr('href');
      return url && this.scrollTrigger.waypoint($.proxy(this.fetchNextPage, this, url, $.proxy(this.setupWaypoints, this)), {
        offset: '110%'
      });
    }
  },
  fetchNextPage: function(url, callback) {
    this.scrollTrigger.waypoint('destroy');
    return $.ajax({
      url: url,
      type: 'get',
      dataType: 'html',
      success: $.proxy(this.parseResponse, this, callback)
    });
  },
  parseResponse: function(callback, response) {
    var items, moreLink;
    items = $(this["super"].infiniteOptions.itemSelector, response);
    moreLink = $(this["super"].infiniteOptions.moreSelector, response);
    return items.imagesLoaded((function(_this) {
      return function() {
        _this.products.append(items);
        return _this.updateWaypoints(moreLink, callback);
      };
    })(this));
  },
  updateWaypoints: function(moreLink, callback) {
    if (moreLink.length) {
      $(this["super"].infiniteOptions.moreSelector).replaceWith(moreLink);
    } else {
      $(this["super"].infiniteOptions.moreSelector).remove();
      this.scrollTrigger.waypoint('destroy');
    }
    return callback && typeof callback === 'function' && callback();
  }
};