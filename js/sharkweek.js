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

/*!
 * money.js / fx() v0.1.3
 * Copyright 2011, Joss Crowcroft
 *
 * JavaScript library for realtime currency conversion and exchange rate calculation.
 *
 * Freely distributable under the MIT license.
 * Portions of money.js are inspired by or borrowed from underscore.js
 *
 * For details, examples and documentation:
 * http://josscrowcroft.github.com/money.js/
 */
function convertEl(e) {
    var t = accounting.unformat($(e).html());
    console.log("value" + t);
    var n = $.cookie("currency");
    console.log("target" + n), console.log("base" + gBase);
    var r = fx(t).from(gBase).to(n);
    console.log("converted: " + r);
    var i = "%s %v";
    $(e).hasClass("no_symbol") && (i = "%v"), $(e).html(accounting.formatMoney(r, {
        symbol: n,
        format: i,
        decimal: ".",  // decimal point separator
	            thousand: ",",  // thousands separator
	            precision : 2   // decimal places
    }))
}(function(e, t) {
    var n = function(e) {
        return new o(e)
    };
    n.version = "0.1.3";
    var r = e.fxSetup || {
        rates: {},
        base: ""
    };
    n.rates = r.rates, n.base = r.base, n.settings = {
        from: r.from || n.base,
        to: r.to || n.base
    };
    var i = n.convert = function(e, t) {
            if (typeof e == "object" && e.length) {
                for (var r = 0; r < e.length; r++) e[r] = i(e[r], t);
                return e
            }
            return t = t || {}, t.from || (t.from = n.settings.from), t.to || (t.to = n.settings.to), e * s(t.to, t.from)
        },
        s = function(e, t) {
            var r = n.rates;
            r[n.base] = 1;
            if (!r[e] || !r[t]) throw "fx error";
            return t === n.base ? r[e] : e === n.base ? 1 / r[t] : r[e] * (1 / r[t])
        },
        o = function(e) {
            typeof e == "string" ? (this._v = parseFloat(e.replace(/[^0-9-.]/g, "")), this._fx = e.replace(/([^A-Za-z])/g, "")) : this._v = e
        },
        u = n.prototype = o.prototype;
    u.convert = function() {
        var e = Array.prototype.slice.call(arguments);
        return e.unshift(this._v), i.apply(n, e)
    }, u.from = function(e) {
        var t = n(i(this._v, {
            from: e,
            to: n.base
        }));
        return t._fx = n.base, t
    }, u.to = function(e) {
        return i(this._v, {
            from: this._fx ? this._fx : n.settings.from,
            to: e
        })
    }, typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = n), exports.fx = n) : typeof define == "function" && define.amd ? define([], function() {
        return n
    }) : (n.noConflict = function(r) {
        return function() {
            return e.fx = r, n.noConflict = t, n
        }
    }(e.fx), e.fx = n)
})(this),
function(e, t) {
    function n(e) {
        return !!("" === e || e && e.charCodeAt && e.substr)
    }

    function r(e) {
        return c ? c(e) : "[object Array]" === h.call(e)
    }

    function i(e) {
        return "[object Object]" === h.call(e)
    }

    function s(e, t) {
        var n, e = e || {},
            t = t || {};
        for (n in t) t.hasOwnProperty(n) && null == e[n] && (e[n] = t[n]);
        return e
    }

    function o(e, t, n) {
        var r = [],
            i, s;
        if (!e) return r;
        if (l && e.map === l) return e.map(t, n);
        for (i = 0, s = e.length; i < s; i++) r[i] = t.call(n, e[i], i, e);
        return r
    }

    function u(e, t) {
        return e = Math.round(Math.abs(e)), isNaN(e) ? t : e
    }

    function a(e) {
        var t = f.settings.currency.format;
        return "function" == typeof e && (e = e()), n(e) && e.match("%v") ? {
            pos: e,
            neg: e.replace("-", "").replace("%v", "-%v"),
            zero: e
        } : !e || !e.pos || !e.pos.match("%v") ? n(t) ? f.settings.currency.format = {
            pos: t,
            neg: t.replace("%v", "-%v"),
            zero: t
        } : t : e
    }
    var f = {
            version: "0.3.2",
            settings: {
                currency: {
                    symbol: "$",
                    format: "%s%v",
                    decimal: ".",
                    thousand: ",",
                    precision: 2,
                    grouping: 3
                },
                number: {
                    precision: 0,
                    grouping: 3,
                    thousand: ",",
                    decimal: "."
                }
            }
        },
        l = Array.prototype.map,
        c = Array.isArray,
        h = Object.prototype.toString,
        p = f.unformat = f.parse = function(e, t) {
            if (r(e)) return o(e, function(e) {
                return p(e, t)
            });
            e = e || 0;
            if ("number" == typeof e) return e;
            var t = t || ".",
                n = RegExp("[^0-9-" + t + "]", ["g"]),
                n = parseFloat(("" + e).replace(/\((.*)\)/, "-$1").replace(n, "").replace(t, "."));
            return isNaN(n) ? 0 : n
        },
        d = f.toFixed = function(e, t) {
            var t = u(t, f.settings.number.precision),
                n = Math.pow(10, t);
            return (Math.round(f.unformat(e) * n) / n).toFixed(t)
        },
        v = f.formatNumber = function(e, t, n, a) {
            if (r(e)) return o(e, function(e) {
                return v(e, t, n, a)
            });
            var e = p(e),
                l = s(i(t) ? t : {
                    precision: t,
                    thousand: n,
                    decimal: a
                }, f.settings.number),
                c = u(l.precision),
                h = 0 > e ? "-" : "",
                m = parseInt(d(Math.abs(e || 0), c), 10) + "",
                g = 3 < m.length ? m.length % 3 : 0;
            return h + (g ? m.substr(0, g) + l.thousand : "") + m.substr(g).replace(/(\d{3})(?=\d)/g, "$1" + l.thousand) + (c ? l.decimal + d(Math.abs(e), c).split(".")[1] : "")
        },
        m = f.formatMoney = function(e, t, n, l, c, h) {
            if (r(e)) return o(e, function(e) {
                return m(e, t, n, l, c, h)
            });
            var e = p(e),
                d = s(i(t) ? t : {
                    symbol: t,
                    precision: n,
                    thousand: l,
                    decimal: c,
                    format: h
                }, f.settings.currency),
                g = a(d.format);
            return (0 < e ? g.pos : 0 > e ? g.neg : g.zero).replace("%s", d.symbol).replace("%v", v(Math.abs(e), u(d.precision), d.thousand, d.decimal))
        };
    f.formatColumn = function(e, t, l, c, h, d) {
        if (!e) return [];
        var m = s(i(t) ? t : {
                symbol: t,
                precision: l,
                thousand: c,
                decimal: h,
                format: d
            }, f.settings.currency),
            g = a(m.format),
            y = g.pos.indexOf("%s") < g.pos.indexOf("%v") ? !0 : !1,
            b = 0,
            e = o(e, function(e) {
                return r(e) ? f.formatColumn(e, m) : (e = p(e), e = (0 < e ? g.pos : 0 > e ? g.neg : g.zero).replace("%s", m.symbol).replace("%v", v(Math.abs(e), u(m.precision), m.thousand, m.decimal)), e.length > b && (b = e.length), e)
            });
        return o(e, function(e) {
            return n(e) && e.length < b ? y ? e.replace(m.symbol, m.symbol + Array(b - e.length + 1).join(" ")) : Array(b - e.length + 1).join(" ") + e : e
        })
    }, "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = f), exports.accounting = f) : "function" == typeof define && define.amd ? define([], function() {
        return f
    }) : (f.noConflict = function(n) {
        return function() {
            return e.accounting = n, f.noConflict = t, f
        }
    }(e.accounting), e.accounting = f)
}(this),
function(e) {
    typeof define == "function" && define.amd ? define(["jquery"], e) : typeof exports == "object" ? e(require("jquery")) : e(jQuery)
}(function(e) {
    function n(e) {
        return u.raw ? e : encodeURIComponent(e)
    }

    function r(e) {
        return u.raw ? e : decodeURIComponent(e)
    }

    function i(e) {
        return n(u.json ? JSON.stringify(e) : String(e))
    }

    function s(e) {
        e.indexOf('"') === 0 && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return e = decodeURIComponent(e.replace(t, " ")), u.json ? JSON.parse(e) : e
        } catch (n) {}
    }

    function o(t, n) {
        var r = u.raw ? t : s(t);
        return e.isFunction(n) ? n(r) : r
    }
    var t = /\+/g,
        u = e.cookie = function(t, s, a) {
            if (s !== undefined && !e.isFunction(s)) {
                a = e.extend({}, u.defaults, a);
                if (typeof a.expires == "number") {
                    var f = a.expires,
                        l = a.expires = new Date;
                    l.setTime(+l + f * 864e5)
                }
                return document.cookie = [n(t), "=", i(s), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("")
            }
            var c = t ? undefined : {},
                h = document.cookie ? document.cookie.split("; ") : [];
            for (var p = 0, d = h.length; p < d; p++) {
                var v = h[p].split("="),
                    m = r(v.shift()),
                    g = v.join("=");
                if (t && t === m) {
                    c = o(g, s);
                    break
                }!t && (g = o(g)) !== undefined && (c[m] = g)
            }
            return c
        };
    u.defaults = {}, e.removeCookie = function(t, n) {
        return e.cookie(t) === undefined ? !1 : (e.cookie(t, "", e.extend({}, n, {
            expires: -1
        })), !e.cookie(t))
    }
});
var gBase;
(function(e) {
    e.fn.xcurrency = function(t) {
        function s() {
            var t = e.cookie("currency");
            t === n && (e.removeCookie("currency"), e.removeCookie("xrate")), e(".xprice").each(function() {
                var r = accounting.unformat(e(this).html()),
                    i = t,
                    s = fx(r).from(n).to(i),
                    o = "%s %v";
                e(this).hasClass("no_symbol") && (o = "%v"), e(this).html(accounting.formatMoney(s, {
                    symbol: i,
                    format: o
                }))
            }), e(".xprice_options .xoption").each(function() {
                var t = e(this).attr("id"),
                    n = e(this).attr("value"),
                    r = e(this).children().html(),
                    i = "<option value=" + n + ">" + t + " - " + r + "</option>";
                e("select#option").append(e(i))
            }), e(".xprice_options").remove(), e(".unconverted").remove(), e(".converted").removeAttr("style")
        }

        function o() {
            e.ajax({
                type: "POST",
                url: "https://openexchangerates.org/api/latest.json?app_id=067e60ad38b5402fbfb8d79dcdaff439",
                success: function(e) {
                    e === null && r && console.log("success condition. null data returned: " + e)
                },
                error: function(e) {
                    e === null && r && console.log("error condition. null data returned: " + e)
                }
            })
        }

        function u() {
            e.ajax({
                type: "GET",
                url: "https://openexchangerates.org/api/latest.json?app_id=067e60ad38b5402fbfb8d79dcdaff439",
                async: !1,
                jsonpCallback: "jsonCallback",
                contentType: "application/json",
                dataType: "jsonp",
                success: function(t) {
                    r && console.log(t);
                    if (typeof fx != "undefined" && fx.rates) {
                        fx.rates = t.rates, fx.base = t.base, fx.timestamp = t.timestamp;
                        var n = new Date(e.now()),
                            i = new Date(fx.timestamp * 1e3),
                            u = (n - i) / 1e3 / 60;
                        u = parseInt(u, 10), r && (console.log("server date: " + i), console.log("current time: " + n), console.log("diff: " + u)), u > 300 && o(), s()
                    } else var a = {
                        rates: t.rates,
                        base: t.base
                    }
                },
                error: function(e) {
                    r && console.log(e.message)
                }
            })
        }
        var n = t.baseCurrency || "USD";
        gBase = n;
        var r = t.debug || !1;
        e(this).append('<option value="' + n + '">' + n + "</option>");
        for (var i = 0; i < t.currencies.length; i++) e(this).append('<option value="' + t.currencies[i] + '">' + t.currencies[i] + "</option>");
        e.cookie("currency") && (e(this).val(e.cookie("currency")), u()), e(this).change(function() {
            var t = e(this).val();
            t === n ? e.removeCookie("currency", {
                path: "/"
            }) : e.cookie("currency", t, {
                expires: 1,
                path: "/"
            }), window.location.reload()
        })
    }
})(jQuery);

/// IMAGES LOADED ///
/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function() {
  function e() {}

  function t(e, t) {
    for (var n = e.length; n--;)
      if (e[n].listener === t) return n;
    return -1
  }

  function n(e) {
    return function() {
      return this[e].apply(this, arguments)
    }
  }
  var i = e.prototype,
    r = this,
    o = r.EventEmitter;
  i.getListeners = function(e) {
    var t, n, i = this._getEvents();
    if ("object" == typeof e) {
      t = {};
      for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
    } else t = i[e] || (i[e] = []);
    return t
  }, i.flattenListeners = function(e) {
    var t, n = [];
    for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
    return n
  }, i.getListenersAsObject = function(e) {
    var t, n = this.getListeners(e);
    return n instanceof Array && (t = {}, t[e] = n), t || n
  }, i.addListener = function(e, n) {
    var i, r = this.getListenersAsObject(e),
      o = "object" == typeof n;
    for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {
      listener: n,
      once: !1
    });
    return this
  }, i.on = n("addListener"), i.addOnceListener = function(e, t) {
    return this.addListener(e, {
      listener: t,
      once: !0
    })
  }, i.once = n("addOnceListener"), i.defineEvent = function(e) {
    return this.getListeners(e), this
  }, i.defineEvents = function(e) {
    for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
    return this
  }, i.removeListener = function(e, n) {
    var i, r, o = this.getListenersAsObject(e);
    for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
    return this
  }, i.off = n("removeListener"), i.addListeners = function(e, t) {
    return this.manipulateListeners(!1, e, t)
  }, i.removeListeners = function(e, t) {
    return this.manipulateListeners(!0, e, t)
  }, i.manipulateListeners = function(e, t, n) {
    var i, r, o = e ? this.removeListener : this.addListener,
      s = e ? this.removeListeners : this.addListeners;
    if ("object" != typeof t || t instanceof RegExp)
      for (i = n.length; i--;) o.call(this, t, n[i]);
    else
      for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
    return this
  }, i.removeEvent = function(e) {
    var t, n = typeof e,
      i = this._getEvents();
    if ("string" === n) delete i[e];
    else if ("object" === n)
      for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
    else delete this._events;
    return this
  }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function(e, t) {
    var n, i, r, o, s = this.getListenersAsObject(e);
    for (r in s)
      if (s.hasOwnProperty(r))
        for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
    return this
  }, i.trigger = n("emitEvent"), i.emit = function(e) {
    var t = Array.prototype.slice.call(arguments, 1);
    return this.emitEvent(e, t)
  }, i.setOnceReturnValue = function(e) {
    return this._onceReturnValue = e, this
  }, i._getOnceReturnValue = function() {
    return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
  }, i._getEvents = function() {
    return this._events || (this._events = {})
  }, e.noConflict = function() {
    return r.EventEmitter = o, e
  }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
    return e
  }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this),
function(e) {
  function t(t) {
    var n = e.event;
    return n.target = n.target || n.srcElement || t, n
  }
  var n = document.documentElement,
    i = function() {};
  n.addEventListener ? i = function(e, t, n) {
    e.addEventListener(t, n, !1)
  } : n.attachEvent && (i = function(e, n, i) {
    e[n + i] = i.handleEvent ? function() {
      var n = t(e);
      i.handleEvent.call(i, n)
    } : function() {
      var n = t(e);
      i.call(e, n)
    }, e.attachEvent("on" + n, e[n + i])
  });
  var r = function() {};
  n.removeEventListener ? r = function(e, t, n) {
    e.removeEventListener(t, n, !1)
  } : n.detachEvent && (r = function(e, t, n) {
    e.detachEvent("on" + t, e[t + n]);
    try {
      delete e[t + n]
    } catch (i) {
      e[t + n] = void 0
    }
  });
  var o = {
    bind: i,
    unbind: r
  };
  "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
}(this),
function(e, t) {
  "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(n, i) {
    return t(e, n, i)
  }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
}(window, function(e, t, n) {
  function i(e, t) {
    for (var n in t) e[n] = t[n];
    return e
  }

  function r(e) {
    return "[object Array]" === d.call(e)
  }

  function o(e) {
    var t = [];
    if (r(e)) t = e;
    else if ("number" == typeof e.length)
      for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
    else t.push(e);
    return t
  }

  function s(e, t, n) {
    if (!(this instanceof s)) return new s(e, t);
    "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred);
    var r = this;
    setTimeout(function() {
      r.check()
    })
  }

  function f(e) {
    this.img = e
  }

  function c(e) {
    this.src = e, v[e] = this
  }
  var a = e.jQuery,
    u = e.console,
    h = u !== void 0,
    d = Object.prototype.toString;
  s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function() {
    this.images = [];
    for (var e = 0, t = this.elements.length; t > e; e++) {
      var n = this.elements[e];
      "IMG" === n.nodeName && this.addImage(n);
      var i = n.nodeType;
      if (i && (1 === i || 9 === i || 11 === i))
        for (var r = n.querySelectorAll("img"), o = 0, s = r.length; s > o; o++) {
          var f = r[o];
          this.addImage(f)
        }
    }
  }, s.prototype.addImage = function(e) {
    var t = new f(e);
    this.images.push(t)
  }, s.prototype.check = function() {
    function e(e, r) {
      return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
    }
    var t = this,
      n = 0,
      i = this.images.length;
    if (this.hasAnyBroken = !1, !i) return this.complete(), void 0;
    for (var r = 0; i > r; r++) {
      var o = this.images[r];
      o.on("confirm", e), o.check()
    }
  }, s.prototype.progress = function(e) {
    this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
    var t = this;
    setTimeout(function() {
      t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
    })
  }, s.prototype.complete = function() {
    var e = this.hasAnyBroken ? "fail" : "done";
    this.isComplete = !0;
    var t = this;
    setTimeout(function() {
      if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
        var n = t.hasAnyBroken ? "reject" : "resolve";
        t.jqDeferred[n](t)
      }
    })
  }, a && (a.fn.imagesLoaded = function(e, t) {
    var n = new s(this, e, t);
    return n.jqDeferred.promise(a(this))
  }), f.prototype = new t, f.prototype.check = function() {
    var e = v[this.img.src] || new c(this.img.src);
    if (e.isConfirmed) return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
    if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
    var t = this;
    e.on("confirm", function(e, n) {
      return t.confirm(e.isLoaded, n), !0
    }), e.check()
  }, f.prototype.confirm = function(e, t) {
    this.isLoaded = e, this.emit("confirm", this, t)
  };
  var v = {};
  return c.prototype = new t, c.prototype.check = function() {
    if (!this.isChecked) {
      var e = new Image;
      n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
    }
  }, c.prototype.handleEvent = function(e) {
    var t = "on" + e.type;
    this[t] && this[t](e)
  }, c.prototype.onload = function(e) {
    this.confirm(!0, "onload"), this.unbindProxyEvents(e)
  }, c.prototype.onerror = function(e) {
    this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
  }, c.prototype.confirm = function(e, t) {
    this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
  }, c.prototype.unbindProxyEvents = function(e) {
    n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
  }, s
});


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
    this.hideUrlBar();
    $('body').data('search') === true && this.setupSearch();
    $(document).ajaxSend(this.working).ajaxComplete(this.finished);
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
    $('.navbar-right .cart .count, .main header .cart').htmlHighlight(cart.item_count);
    return $('.navbar-right .cart .total').htmlHighlight(Format.money(cart.total, true, true));
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


  (function($){    
    $(document).ready(function(){
        $('.currency_converter').xcurrency({
            baseCurrency: 'NZD',
            currencies: ["AUD", "CAD", "GBP", "EUR", "JPY", "USD"],
        });
      });
  })(jQuery)
        
