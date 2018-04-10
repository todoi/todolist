define("helpers/BlobHelper", ["application/runtime", "project!core"], function(e, t) {
    // e 为 application/runtime 返回的东西
    // t 为 project!core 返回的东西
    function i(e) {
        return function(t) {
            var i = t.target
              , n = 4 === i.readyState;
            if (n && 200 === i.status) {
                var o = a.createObjectURL(i.response);
                e.resolve(o);
            } else
                n && e.reject();
        }
        ;
    }
    var n = t.WBDeferred
      , o = e.global
      , a = e.global.URL || e.global.webkitURL
      , r = e.$
      , s = {}
      , l = {};
    return t.WBSingleton.extend({
        dataURItoBlob: function(e) {
            for (var t = o.Blob, i = o.ArrayBuffer, n = o.DataView, a = o.atob(e.split(",")[1]), r = e.split(",")[0].split(":")[1].split(";")[0], s = new i(a.length), l = new n(s), c = 0; c < a.length; c++)
                l.setUint8(c, a.charCodeAt(c));
            return new t([s],{
                type: r
            });
        },
        fetchDataURI: function(e) {
            var t = this;
            return /^data:/.test(e) ? new n().resolve(e) : e in s ? new n().resolve(s[e]) : e in l ? l[e] : t.xhrRequest(e);
        },
        xhrRequest: function(e) {
            var t = new n()
              , o = t.promise();
            l[e] = o;
            try {
                var a = new XMLHttpRequest();
                a.open("GET", e, !0),
                a.responseType = "blob",
                a.onreadystatechange = i(t),
                a.send();
            } catch (r) {
                t.reject(r);
            }
            return t.done(function(t) {
                s[e] = t;
            }).always(function() {
                delete l[e];
            }),
            o;
        },
        loadImage: function(t, i, n, o) {
            var a = this;
            i = i instanceof r ? i : r(i),
            a.fetchDataURI(t).done(function(e) {
                i.attr("src", e),
                n && n();
            }).fail(function() {
                e.env.isPackagedApp() ? o && o() : (n && (i[0].onload = n),
                o && (i[0].onerror = o),
                i.attr("src", t));
            });
        }
    });
}),
