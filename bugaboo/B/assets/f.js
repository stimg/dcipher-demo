(function () {
    function E() {
        var b, c, d = document.location.hostname.split(".");
        for (b = d.length - 1; 0 <= b; b--)if (c = d.slice(b).join("."), document.cookie = "__top_level=cookie;domain=." + c + ";", -1 < document.cookie.indexOf("__top_level=cookie"))return document.cookie = "__top_level=;domain=." + c + ";expires=Thu, 01 Jan 1970 00:00:01 GMT;", c;
        return ""
    }

    function F(b) {
        for (var c = "" + document.cookie, d = 0, f = []; ;) {
            d = c.indexOf(b + "=", d);
            if (-1 == d || "" == b)return f;
            var e = c.indexOf(";", d);
            -1 == e && (e = c.length);
            f.push(unescape(c.substring(d +
                                        b.length + 1, e)));
            d = e
        }
    }

    function G(b, c, d, f, e) {
        d = d || "";
        f = f || "";
        e = e || "/";
        document.cookie = b + "=" + escape(c) + (d ? ";expires=" + d.toUTCString() : "") + (f ? ";domain=" + f : "") + ";path=" + e;
        return c
    }

    function N(b, c) {
        c = (c || E()).replace(/^\./, "");
        var d = "_fby_site_" + b, f, e, q, k, h, g, n = 0, m, l = 0, r = Math.round((new Date).getTime() / 1E3);
        f = F(d);
        if (e = f.length) {
            for (k = q = n = 0; k < e; k++)m = f[k], m = m.split("|"), m[5] > q && (q = m[5], n = k);
            m = f[n].split("|");
            f = m[2];
            e = m[3];
            q = m[4];
            k = m[5];
            h = +m[6];
            g = +m[7];
            n = +m[8] || 1;
            1800 < r - k ? (e = q, k = q = r, h += 1, g = 1) : (k = r, g += 1, l =
                r - q)
        } else k = q = e = f = r, g = h = 1;
        n += 1;
        m = [1, c, f, e, q, k, h, g, n];
        G(d, m.join("|"), new Date(1E3 * (r + 31536E4)), "." + c);
        return {
            timeOnPage: function () {
                return Math.round((new Date).getTime() / 1E3) - H
            }, timeOnSite: l, visits: h, pages: g, totalPages: n
        }
    }

    var p = document.location.protocol, g = p + "//cdn.feedbackify.com", O = g + "/dialog.js?1409048010", t = g + "/img/classic", I = p + "//s3.amazonaws.com/fby-form";
    if ("undefined" == typeof FBY) {
        var h = document, l = h.body, p = navigator.userAgent, v = "Microsoft Internet Explorer" == navigator.appName;
        !v || /trident\/\d/i.test(p);
        var u = 0, A = 0, B = 0, x = function (b) {
            !B && u && A && FBY.forms[b].data && (B = 1, FBY.start(b))
        }, J, P = "_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + t, w = function () {
            var b = h.createElement("DIV");
            return function (c) {
                b.innerHTML = c;
                c = b.firstChild;
                b.removeChild(c);
                return c
            }
        }(), y = function (b, c) {
            b.className.match(new RegExp("(\\s|^)" + c + "(\\s|$)")) || (b.className += " " + c)
        }, H = Math.round((new Date).getTime() / 1E3), z = N("");
        FBY = {
            IN: "https://www.feedbackify.com/in", IMG_PATH: t, FORM_PATH: I, forms: {}, config: {
                hideFlash: !0,
                customData: {}
            }, setDevice: function (b) {
                if ("mobile" == b || "tablet" == b || "desktop" == b)FBY.config.device = b
            }, mobile: function (b) {
                !0 === b ? FBY.config.device = "mobile" : !1 === b && (FBY.config.device = "desktop")
            }, customData: function (b, c) {
                if ("object" == typeof b)for (key in b)b.hasOwnProperty(key) && (FBY.config.customData[key] = b[key]); else"string" != typeof b || "string" != typeof c && "number" != typeof c || (FBY.config.customData[b] = c)
            }, setEmail: function (b) {
                FBY.email = b
            }, hideFlash: function (b) {
                FBY.config.hideFlash = b
            }, callback: function (b) {
                "function" == typeof b && (FBY.config.callback = b)
            }, onload: function (b) {
                "function" == typeof b && b.apply({device: this.config.device})
            }, onclose: function (b) {
                "function" == typeof b && (FBY.config.onclose = b)
            }, exitForm: function (b) {
                function c(b) {
                    m = b.clientY;
                    m >= p ? p = m : !(15 > m) || k && z.timeOnPage() < k || "undefined" == typeof FBY || "undefined" != typeof FBY.forms[d] && 0 < FBY.forms[d].calls || (b = Math.round((new Date).getTime() / 1E3), G(l, b, new Date(1E3 * (b + 31536E4)), "." + E()), FBY.showForm(d))
                }

                var d = b.id, f = "undefined" == typeof b.percent ? 100 : b.percent,
                    e = "undefined" == typeof b.interval ? 30 : b.interval, h = "undefined" == typeof b.timeOnSite ? 0 : b.timeOnSite, k = "undefined" == typeof b.timeOnPage ? 0 : b.timeOnPage, g = "undefined" == typeof b.pages ? 0 : b.pages;
                b = "undefined" == typeof b.visits ? 0 : b.visits;
                if (d) {
                    var l = "_fby_last_" + d;
                    if (0 < e) {
                        var n = F(l)[0];
                        if (!navigator.cookieEnabled || n && H - n < 86400 * e)return
                    }
                    if (!(h && z.timeOnSite < h || b && z.visits < b || g && z.pages < g || f < 100 * Math.random())) {
                        var m = 0, p = 0;
                        window.addEventListener ? window.addEventListener("mousemove", c, !1) : document.attachEvent("onmousemove",
                            c)
                    }
                }
            }, showTab: function (b) {
                if (h.getElementById("feedbackify")) {
                    var c = null, d = "right", f = "#FF0059", e = t + "/tab.png", g = 36, k = 100;
                    48 == b.id && (b.color = "#0055A4");
                    "string" == typeof b || "number" == typeof b ? c = String(b) : "object" == typeof b && (c = "undefined" == typeof b.id ? c : String(b.id), d = "undefined" == typeof b.position ? d : b.position, f = "undefined" == typeof b.color ? f : b.color, e = "undefined" == typeof b.img ? e : b.img, g = "undefined" == typeof b.img_w ? g : parseInt(b.img_w), k = "undefined" == typeof b.img_h ? k : parseInt(b.img_h));
                    FBY.addCSS([".fby-tab",
                                ["position:fixed;width:", g, "px;height:", k, "px;overflow:hidden;_position:absolute;"].join(""), ".fby-tab a", ["display:block;position:absolute;width:", g, "px;height:", k, "px;background-color:#000000;cursor:pointer;background:url(", e, ");_background:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=", e, ");"].join(""), ".fby-tab-l", ["top:50%;left:0;margin-top:-", Math.ceil(k / 2), 'px;_top:expression((parseInt(this.parentNode.style.height)-this.clientHeight)/2+"px");_margin-top:0;'].join(""),
                                ".fby-tab-l a", "margin-left:-5px;", ".fby-tab-l a:hover", "margin-left:-2px;", ".fby-tab-r", ["top:50%;right:0px;margin-top:-", Math.ceil(k / 2), 'px;_top:expression((parseInt(this.parentNode.style.height)-this.clientHeight)/2+"px");_left:expression((document.documentElement.clientWidth||document.body.clientWidth)-this.clientWidth+"px");_margin-top:0;'].join(""), ".fby-tab-r a", "margin-left:5px;", ".fby-tab-r a:hover", "margin-left:2px;", ".fby-tab-t", "top:0;margin-top:0px;", ".fby-tab-b", 'top:auto;bottom:0;_top:expression(parseInt(this.parentNode.style.height)-this.clientHeight+"px");'
                    ]);
                    if (null == c)return !1;
                    e = w('<div id="fby-tab-' + c + '" class="fby-tab ' + ("fby-tab-" + ("right" == d ? "r" : "l")) + '"><a href="#" style="background-color:' + f + '!important"></a></div>');
                    e.firstChild.onclick = function () {
                        FBY.showForm(c);
                        return !1
                    };
                    h.getElementById("fby-screen").appendChild(e);
                    FBY.forms[c] = {calls: 0, tab: {position: d, color: f}}
                } else setTimeout(function () {
                    FBY.showTab(b)
                }, 10)
            }, showForm: function (b) {
                if (h.getElementById("feedbackify") && u) {
                    var c = null;
                    "string" == typeof b || "number" == typeof b ? c = String(b) : "object" == typeof o && (c = "undefined" == typeof o.id ? c : String(o.id));
                    if (null == c || l.className.match(/(\s|^)fby-on(\s|$)/))return !1;
                    y(l, "fby-on");
                    FBY.config.hideFlash && (y(l, "fby-hide-embed"), y(l, "fby-hide-object"));
                    "undefined" == typeof FBY.forms[c] && (FBY.forms[c] = {calls: 0});
                    FBY.forms[c].calls++;
                    var d = h.getElementById("feedbackify"), f = h.getElementById("fby-screen"), e = h.getElementById("fby-mask");
                    l.appendChild(d);
                    f.appendChild(e);
                    e.className = "fby-mask fby-show";
                    d.appendChild(w(['<table id="fby-form" style="top:', (h.body.scrollTop ||
                                                                          h.documentElement.scrollTop) + 25, "px;left:", ((window.innerWidth || self.innerWidth || h.clientWidth || l.clientWidth) - 618) / 2, 'px" cellspacing="0" cellpadding="0"><tr><td style="width:9px"></td><td style="width:9px"></td><td style="width:582px"></td><td style="width:9px"></td><td style="width:9px"></td></tr><tr><td rowspan="2" colspan="2" class="fby-d fby-d-tl"></td><td class="fby-d-h fby-d-t"></td><td rowspan="2" colspan="2" class="fby-d fby-d-tr"></td></tr><tr><td class="fby-d-h2"></td></tr><tr><td class="fby-d fby-d-l"></td><td colspan="3" class="fby-d-main"><div class="fby-d-load"><img style="width:16px;height:16px" src="',
                                     t, '/loading_anim.gif"/></div></td><td class="fby-d fby-d-r"></td></tr><tr><td rowspan="2" colspan="2" class="fby-d fby-d-bl"></td><td class="fby-d-h2"></td><td rowspan="2" colspan="2" class="fby-d fby-d-br"></td></tr><tr><td class="fby-d-h fby-d-b"></td></tr></table>'
                    ].join("")));
                    FBY.loadForm(c)
                } else setTimeout(function () {
                    FBY.showForm(b)
                }, 10)
            }, loadForm: function (b) {
                B = 0;
                0 != b ? FBY.forms[b].data = null : x(b);
                u || FBY.loadJS("//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js", function () {
                    FBY.$ = window.jQuery.noConflict(!0);
                    u = 1;
                    x(b)
                });
                A || FBY.loadJS(O, function () {
                    A = 1;
                    x(b)
                });
                0 < b && FBY.loadJS(I + "/" + b + "/d.js", function () {
                    x(b)
                })
            }, addCSS: function (b, c) {
                var d = J ? [] : "html{_background:url(//about:blank) fixed;},.fby-on select {visibility:hidden!important;},.fby-on .fby-hide-iframe {visibility:hidden!important;},.fby-hide-embed embed {visibility:hidden!important;},.fby-hide-object object {visibility:hidden!important;},@media not screen {.fby-tab {display: none;}}".split(",");
                J = 1;
                for (var f = 0; f < b.length; f += 2) {
                    for (var e = b[f].split("|"),
                             g = [], k = b[f + 1].split(";"), l = [], p = 0; p < e.length; p++)g.push((c ? "" : "#feedbackify ") + e[p]);
                    for (e = 0; e < k.length - 1; e++)l.push(k[e] + (-1 < "top|left|height|width|opacity|filter".indexOf(k[e].split(":")[0]) ? ";" : "!important;"));
                    d.push(g.join(",") + "{" + l.join("") + "}")
                }
                d = d.join("");
                if (v)try {
                    var n = document.createStyleSheet();
                    n.cssText = d
                }
                catch (m) {
                    n = document.styleSheets[document.styleSheets.length - 1], n.cssText += "\r\n" + d
                } else n = h.createElement("STYLE"), n.type = "text/css", h.getElementsByTagName("HEAD")[0].appendChild(n),
                    n.appendChild(h.createTextNode(d))
            }, loadJS: function (b, c) {
                var d = h.createElement("SCRIPT"), f = function () {
                    d.x = 1;
                    c && c(this)
                };
                d.src = b;
                v ? d.onreadystatechange = function () {
                    "loaded" != d.readyState && "complete" != d.readyState || d.x || f()
                } : d.onload = f;
                h.getElementsByTagName("HEAD")[0].appendChild(d);
                setTimeout(function () {
                    d.parentNode.removeChild(d);
                    d = null
                }, 15E3);
                return d
            }
        };
        for (var Q = function () {
                var b = P + "/dlg_shad_", c = t + "/dlg_shad_sprite_h.png";
                FBY.addCSS(["#fby-form", "z-index:2147483646;width:618px!important;position:absolute;",
                            ".fby-d-main", "width:600px;height:50px;vertical-align:top;background-color:#FFFFFF;position:relative;", ".fby-d", ["background:url(", t + "/dlg_shad_sprite.png", ");_background:none;"].join(""), ".fby-d-h", ["height:9px;background:url(", c, ");_background:none;"].join(""), ".fby-d-h2", "height:9px;background-color:#FFFFFF;", ".fby-d-tl", ["background-position:-18px;", b, "tl.png);"].join(""), ".fby-d-t", [b, "t.png,sizingMethod=scale);"].join(""), ".fby-d-tr", ["background-position:-36px;", b, "tr.png);"].join(""), ".fby-d-l",
                            [b, "l.png,sizingMethod=scale);"].join(""), ".fby-d-r", ["background-position:-9px;", b, "r.png,sizingMethod=scale);"].join(""), ".fby-d-bl", ["background-position:-54px;", b, "bl.png);"].join(""), ".fby-d-br", ["background-position:-72px;", b, "br.png);"].join(""), ".fby-d-b", ["background-position:0px -9px;", b, "b.png,sizingMethod=scale);"].join(""), ".fby-d-load", "position:relative;", ".fby-d-load img", "position:absolute;left:8px;", ".fby-d-load div", "position:absolute;padding:4px 18px;font-size:16px;font-weight:bold;color:#333;"
                ])
            },
                 g = [], C = 0; C < g.length; C++) {
            var K = g[C];
            if ((new RegExp("^https?://([^/]+\\.)?" + K[0] + "(/|$)", "i")).test(location.href)) {
                FeedbackifyObject = window.FeedbackifyObject || {q: [["start", K[1]]]};
                FBY.loadJS("//cdn.feedbackify.com/feedbackify.js");
                break
            }
        }
        try {
            for (g = 0; g < fby.length; g++)switch (fby[g][0]) {
                case "setDevice":
                    if ("mobile" == fby[g][1] || "tablet" == fby[g][1] || "desktop" == fby[g][1])FBY.config.device = fby[g][1];
                    break;
                case "showTab":
                    FBY.config.showTab = !0;
                    var L = fby[g][1];
                    L.text && (FBY.config.tabText = L.text)
            }
        }
        catch (R) {
        }
        FBY.config.device ||
        (!/(windows (nt|xp|2000))/i.test(p) && /(ipad|android|windows phone|mobile|tablet)/i.test(p) ? FBY.config.device = "other" : FBY.config.device = "desktop");
        if ("desktop" != FBY.config.device)FBY.loadJS("//cdn.feedbackify.com/f-mobile.js"); else {
            var D = function () {
                if (v && document.documentElement.doScroll)try {
                    document.documentElement.doScroll("left")
                }
                catch (b) {
                    setTimeout(D, 1);
                    return
                } else if (!h.body) {
                    setTimeout(D, 1);
                    return
                }
                l = h.body;
                FBY.addCSS(["*", "box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                            "input", "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;max-width:none;", "*:before", "content:none;", "*:after", "content:none;", "|div|span|textarea|input|table|tbody|tr|td|img|p|a", ["border:0;outline:none;width:auto;height:auto;text-align:left;text-indent:0;float:none;padding:0;margin:0;", v ? 'font:12px "Lucida Grande",Tahoma,Verdana,Arial,sans-serif;' : "font:12px arial,helvetica,sans-serif;", "overflow:visible;color:#000;line-height:1.2;background:0 none;position:static;vertical-align:baseline;box-shadow:none;"].join(""),
                            "table", "border-collapse:collapse;border-spacing:0;max-width:inherit;width:auto!important;", "", "z-index:2147483646;position:static;top:0;left:0;", ".fby-screen", 'z-index:2147483646;position:fixed;top:0;left:0;width:0;height:100%;_position:absolute;_top:expression(eval(document.body.scrollTop||document.documentElement.scrollTop));_left:expression(eval(document.body.scrollLeft||document.documentElement.scrollLeft));_width:0;_height:expression(document.documentElement.clientHeight||document.body.clientHeight+"px");',
                            ".fby-mask", 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000;opacity:0.2;filter:alpha(opacity=20);_position:absolute;_width:expression(document.documentElement.clientWidth||document.body.clientWidth+"px");_height:expression(this.parentNode.style.height);', ".fby-show", "display:block;visibility:visible;", ".fby-hide", "display:none;visibility:hidden;"
                ]);
                l.appendChild(w('<div id="feedbackify"><div id="fby-screen" class="fby-screen"><div id="fby-mask" class="fby-mask"></div></div></div>'));
                setTimeout(function () {
                    l.appendChild(h.getElementById("feedbackify"));
                    for (var b = document.getElementsByTagName("iframe"), d, f = 0; f < b.length; f++)d = b[f], 468 == d.width && y(d, "fby-hide-iframe");
                    Q();
                    b = w('<div style="width:1px;padding-left:1px;box-sizing:content-box;-webkit-box-sizing:content-box;-moz-box-sizing:content-box"></div>');
                    l.appendChild(b);
                    FBY.boxModel = 2 === b.offsetWidth;
                    l.removeChild(b).style.display = "none";
                    b = w('<input type="text" style="width:100px;padding-left:1px"/>');
                    l.appendChild(b);
                    FBY.ieFormModel =
                        100 == b.offsetWidth;
                    l.removeChild(b).style.display = "none";
                    try {
                        var e;
                        if ((e = window.jQuery.fn.jquery.split(".")) && 1 == e[0] && 7 <= e[1])FBY.$ = window.jQuery, u = 1; else throw 0;
                    }
                    catch (g) {
                        FBY.loadJS("//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js", function () {
                            FBY.$ = window.jQuery.noConflict(!0);
                            u = 1
                        })
                    }
                }, 500)
            };
            D();
            var M = function (b) {
                var c = b.shift();
                if ("function" == typeof FBY[c])FBY[c](b[0], b[1])
            };
            if ("undefined" != typeof fby)for (; a = fby.shift();)M(a);
            fby = {
                push: function (b) {
                    M(b)
                }
            }
        }
    }
})();