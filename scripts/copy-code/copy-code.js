(function ($) {
  'use strict';

  $(function () {
    $('.post code')
      .addClass('prettyprint linenums')
    ;

    (function () {
      var q = null;
      window.PR_SHOULD_USE_CONTINUATION = !0;
      (function() {
        function L(a) {
          function m(a) {
            var f = a.charCodeAt(0);
            if (f !== 92) {
              return f
            }
            var b = a.charAt(1);
            return (f = r[b]) ? f : "0" <= b && b <= "7" ? parseInt(a.substring(1), 8) : b === "u" || b === "x" ? parseInt(a.substring(2), 16) : a.charCodeAt(1)
          }
          function e(a) {
            if (a < 32) {
              return (a < 16 ? "\\x0" : "\\x") + a.toString(16)
            }
            a = String.fromCharCode(a);
            if (a === "\\" || a === "-" || a === "[" || a === "]") {
              a = "\\" + a
            }
            return a
          }
          function h(a) {
            for (var f = a.substring(1, a.length - 1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g), a = [], b = [], o = f[0] === "^", c = o ? 1 : 0, i = f.length; c < i; ++c) {
              var j = f[c];
              if (/\\[bdsw]/i.test(j)) {
                a.push(j)
              } else {
                var j = m(j), d;
                c + 2 < i && "-" === f[c + 1] ? (d = m(f[c + 2]),
                c += 2) : d = j;
                b.push([j, d]);
                d < 65 || j > 122 || (d < 65 || j > 90 || b.push([Math.max(65, j) | 32, Math.min(d, 90) | 32]),
                d < 97 || j > 122 || b.push([Math.max(97, j) & -33, Math.min(d, 122) & -33]))
              }
            }
            b.sort(function(a, f) {
              return a[0] - f[0] || f[1] - a[1]
            });
            f = [];
            j = [NaN, NaN];
            for (c = 0; c < b.length; ++c) {
              i = b[c],
              i[0] <= j[1] + 1 ? j[1] = Math.max(j[1], i[1]) : f.push(j = i)
            }
            b = ["["];
            o && b.push("^");
            b.push.apply(b, a);
            for (c = 0; c < f.length; ++c) {
              i = f[c],
              b.push(e(i[0])),
              i[1] > i[0] && (i[1] + 1 > i[0] && b.push("-"),
              b.push(e(i[1])))
            }
            b.push("]");
            return b.join("")
          }
          function y(a) {
            for (var f = a.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g), b = f.length, d = [], c = 0, i = 0; c < b; ++c) {
              var j = f[c];
              j === "(" ? ++i : "\\" === j.charAt(0) && (j = +j.substring(1)) && j <= i && (d[j] = -1)
            }
            for (c = 1; c < d.length; ++c) {
              -1 === d[c] && (d[c] = ++t)
            }
            for (i = c = 0; c < b; ++c) {
              j = f[c],
              j === "(" ? (++i,
              d[i] === void 0 && (f[c] = "(?:")) : "\\" === j.charAt(0) && (j = +j.substring(1)) && j <= i && (f[c] = "\\" + d[i])
            }
            for (i = c = 0; c < b; ++c) {
              "^" === f[c] && "^" !== f[c + 1] && (f[c] = "")
            }
            if (a.ignoreCase && s) {
              for (c = 0; c < b; ++c) {
                j = f[c],
                a = j.charAt(0),
                j.length >= 2 && a === "[" ? f[c] = h(j) : a !== "\\" && (f[c] = j.replace(/[A-Za-z]/g, function(a) {
                  a = a.charCodeAt(0);
                  return "[" + String.fromCharCode(a & -33, a | 32) + "]"
                }))
              }
            }
            return f.join("")
          }
          for (var t = 0, s = !1, l = !1, p = 0, d = a.length; p < d; ++p) {
            var g = a[p];
            if (g.ignoreCase) {
              l = !0
            } else {
              if (/[a-z]/i.test(g.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi, ""))) {
                s = !0;
                l = !1;
                break
              }
            }
          }
          for (var r = {
            b: 8,
            t: 9,
            n: 10,
            v: 11,
            f: 12,
            r: 13
          }, n = [], p = 0, d = a.length; p < d; ++p) {
            g = a[p];
            if (g.global || g.multiline) {
              throw Error("" + g)
            }
            n.push("(?:" + y(g) + ")")
          }
          return RegExp(n.join("|"), l ? "gi" : "g")
        }
        function M(a) {
          function m(a) {
            switch (a.nodeType) {
            case 1:
              if (e.test(a.className)) {
                break
              }
              for (var g = a.firstChild; g; g = g.nextSibling) {
                m(g)
              }
              g = a.nodeName;
              if ("BR" === g || "LI" === g) {
                h[s] = "\n",
                t[s << 1] = y++,
                t[s++ << 1 | 1] = a
              }
              break;
            case 3:
              ;
            case 4:
              g = a.nodeValue,
              g.length && (g = p ? g.replace(/\r\n?/g, "\n") : g.replace(/[\t\n\r ]+/g, " "),
              h[s] = g,
              t[s << 1] = y,
              y += g.length,
              t[s++ << 1 | 1] = a)
            }
          }
          var e = /(?:^|\s)nocode(?:\s|$)/, h = [], y = 0, t = [], s = 0, l;
          a.currentStyle ? l = a.currentStyle.whiteSpace : window.getComputedStyle && (l = document.defaultView.getComputedStyle(a, q).getPropertyValue("white-space"));
          var p = l && "pre" === l.substring(0, 3);
          m(a);
          return {
            a: h.join("").replace(/\n$/, ""),
            c: t
          }
        }
        function B(a, m, e, h) {
          m && (a = {
            a: m,
            d: a
          },
          e(a),
          h.push.apply(h, a.e))
        }
        function x(a, m) {
          function e(a) {
            for (var l = a.d, p = [l, "pln"], d = 0, g = a.a.match(y) || [], r = {}, n = 0, z = g.length; n < z; ++n) {
              var f = g[n], b = r[f], o = void 0, c;
              if (typeof b === "string") {
                c = !1
              } else {
                var i = h[f.charAt(0)];
                if (i) {
                  o = f.match(i[1]),
                  b = i[0]
                } else {
                  for (c = 0; c < t; ++c) {
                    if (i = m[c],
                    o = f.match(i[1])) {
                      b = i[0];
                      break
                    }
                  }
                  o || (b = "pln")
                }
                if ((c = b.length >= 5 && "lang-" === b.substring(0, 5)) && !(o && typeof o[1] === "string")) {
                  c = !1,
                  b = "src"
                }
                c || (r[f] = b)
              }
              i = d;
              d += f.length;
              if (c) {
                c = o[1];
                var j = f.indexOf(c)
                  , k = j + c.length;
                o[2] && (k = f.length - o[2].length,
                j = k - c.length);
                b = b.substring(5);
                B(l + i, f.substring(0, j), e, p);
                B(l + i + j, c, C(b, c), p);
                B(l + i + k, f.substring(k), e, p)
              } else {
                p.push(l + i, b)
              }
            }
            a.e = p
          }
          var h = {}, y;
          (function() {
            for (var e = a.concat(m), l = [], p = {}, d = 0, g = e.length; d < g; ++d) {
              var r = e[d]
                , n = r[3];
              if (n) {
                for (var k = n.length; --k >= 0; ) {
                  h[n.charAt(k)] = r
                }
              }
              r = r[1];
              n = "" + r;
              p.hasOwnProperty(n) || (l.push(r),
              p[n] = q)
            }
            l.push(/[\S\s]/);
            y = L(l)
          }
          )();
          var t = m.length;
          return e
        }
        function u(a) {
          var m = []
            , e = [];
          a.tripleQuotedStrings ? m.push(["str", /^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/, q, "'\""]) : a.multiLineStrings ? m.push(["str", /^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/, q, "'\"`"]) : m.push(["str", /^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/, q, "\"'"]);
          a.verbatimStrings && e.push(["str", /^@"(?:[^"]|"")*(?:"|$)/, q]);
          var h = a.hashComments;
          h && (a.cStyleComments ? (h > 1 ? m.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, q, "#"]) : m.push(["com", /^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\n\r]*)/, q, "#"]),
          e.push(["str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/, q])) : m.push(["com", /^#[^\n\r]*/, q, "#"]));
          a.cStyleComments && (e.push(["com", /^\/\/[^\n\r]*/, q]),
          e.push(["com", /^\/\*[\S\s]*?(?:\*\/|$)/, q]));
          a.regexLiterals && e.push(["lang-regex", /^(?:^^\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\(|\*|\*=|\+=|,|-=|->|\/|\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\^=|\^\^|\^\^=|{|\||\|=|\|\||\|\|=|~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/]);
          (h = a.types) && e.push(["typ", h]);
          a = ("" + a.keywords).replace(/^ | $/g, "");
          a.length && e.push(["kwd", RegExp("^(?:" + a.replace(/[\s,]+/g, "|") + ")\\b"), q]);
          m.push(["pln", /^\s+/, q, " \r\n\t\u00a0"]);
          e.push(["lit", /^@[$_a-z][\w$@]*/i, q], ["typ", /^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/, q], ["pln", /^[$_a-z][\w$@]*/i, q], ["lit", /^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i, q, "0123456789"], ["pln", /^\\[\S\s]?/, q], ["pun", /^.[^\s\w"-$'./@\\`]*/, q]);
          return x(m, e)
        }
        function D(a, m) {
          function e(a) {
            switch (a.nodeType) {
            case 1:
              if (k.test(a.className)) {
                break
              }
              if ("BR" === a.nodeName) {
                h(a),
                a.parentNode && a.parentNode.removeChild(a)
              } else {
                for (a = a.firstChild; a; a = a.nextSibling) {
                  e(a)
                }
              }
              break;
            case 3:
              ;
            case 4:
              if (p) {
                var b = a.nodeValue
                  , d = b.match(t);
                if (d) {
                  var c = b.substring(0, d.index);
                  a.nodeValue = c;
                  (b = b.substring(d.index + d[0].length)) && a.parentNode.insertBefore(s.createTextNode(b), a.nextSibling);
                  h(a);
                  c || a.parentNode.removeChild(a)
                }
              }
            }
          }
          function h(a) {
            function b(a, d) {
              var e = d ? a.cloneNode(!1) : a
                , f = a.parentNode;
              if (f) {
                var f = b(f, 1)
                  , g = a.nextSibling;
                f.appendChild(e);
                for (var h = g; h; h = g) {
                  g = h.nextSibling,
                  f.appendChild(h)
                }
              }
              return e
            }
            for (; !a.nextSibling; ) {
              if (a = a.parentNode,
              !a) {
                return
              }
            }
            for (var a = b(a.nextSibling, 0), e; (e = a.parentNode) && e.nodeType === 1; ) {
              a = e
            }
            d.push(a)
          }
          var k = /(?:^|\s)nocode(?:\s|$)/, t = /\r\n?|\n/, s = a.ownerDocument, l;
          a.currentStyle ? l = a.currentStyle.whiteSpace : window.getComputedStyle && (l = s.defaultView.getComputedStyle(a, q).getPropertyValue("white-space"));
          var p = l && "pre" === l.substring(0, 3);
          for (l = s.createElement("LI"); a.firstChild; ) {
            l.appendChild(a.firstChild)
          }
          for (var d = [l], g = 0; g < d.length; ++g) {
            e(d[g])
          }
          m === (m | 0) && d[0].setAttribute("value", m);
          var r = s.createElement("OL");
          r.className = "linenums";
          for (var n = Math.max(0, m - 1 | 0) || 0, g = 0, z = d.length; g < z; ++g) {
            l = d[g],
            l.className = "L" + (g + n) % 10,
            l.firstChild || l.appendChild(s.createTextNode("\u00a0")),
            r.appendChild(l)
          }
          a.appendChild(r)
        }
        function k(a, m) {
          for (var e = m.length; --e >= 0; ) {
            var h = m[e];
            A.hasOwnProperty(h) ? window.console && console.warn("cannot override language handler %s", h) : A[h] = a
          }
        }
        function C(a, m) {
          if (!a || !A.hasOwnProperty(a)) {
            a = /^\s*</.test(m) ? "default-markup" : "default-code"
          }
          return A[a]
        }
        function E(a) {
          var m = a.g;
          try {
            var e = M(a.h)
              , h = e.a;
            a.a = h;
            a.c = e.c;
            a.d = 0;
            C(m, h)(a);
            var k = /\bMSIE\b/.test(navigator.userAgent)
              , m = /\n/g
              , t = a.a
              , s = t.length
              , e = 0
              , l = a.c
              , p = l.length
              , h = 0
              , d = a.e
              , g = d.length
              , a = 0;
            d[g] = s;
            var r, n;
            for (n = r = 0; n < g; ) {
              d[n] !== d[n + 2] ? (d[r++] = d[n++],
              d[r++] = d[n++]) : n += 2
            }
            g = r;
            for (n = r = 0; n < g; ) {
              for (var z = d[n], f = d[n + 1], b = n + 2; b + 2 <= g && d[b + 1] === f; ) {
                b += 2
              }
              d[r++] = z;
              d[r++] = f;
              n = b
            }
            for (d.length = r; h < p; ) {
              var o = l[h + 2] || s, c = d[a + 2] || s, b = Math.min(o, c), i = l[h + 1], j;
              if (i.nodeType !== 1 && (j = t.substring(e, b))) {
                k && (j = j.replace(m, "\r"));
                i.nodeValue = j;
                var u = i.ownerDocument
                  , v = u.createElement("SPAN");
                v.className = d[a + 1];
                var x = i.parentNode;
                x.replaceChild(v, i);
                v.appendChild(i);
                e < o && (l[h + 1] = i = u.createTextNode(t.substring(b, o)),
                x.insertBefore(i, v.nextSibling))
              }
              e = b;
              e >= o && (h += 2);
              e >= c && (a += 2)
            }
          } catch (w) {
            "console"in window && console.log(w && w.stack ? w.stack : w)
          }
        }
        var v = ["break,continue,do,else,for,if,return,while"]
          , w = [[v, "auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"], "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"]
          , F = [w, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"]
          , G = [w, "abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"]
          , H = [G, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"]
          , w = [w, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"]
          , I = [v, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"]
          , J = [v, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"]
          , v = [v, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"]
          , K = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/
          , N = /\S/
          , O = u({
          keywords: [F, H, w, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END" + I, J, v],
          hashComments: !0,
          cStyleComments: !0,
          multiLineStrings: !0,
          regexLiterals: !0
        })
          , A = {};
        k(O, ["default-code"]);
        k(x([], [["pln", /^[^<?]+/], ["dec", /^<!\w[^>]*(?:>|$)/], ["com", /^<\!--[\S\s]*?(?:--\>|$)/], ["lang-", /^<\?([\S\s]+?)(?:\?>|$)/], ["lang-", /^<%([\S\s]+?)(?:%>|$)/], ["pun", /^(?:<[%?]|[%?]>)/], ["lang-", /^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i], ["lang-js", /^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i], ["lang-css", /^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i], ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]]), "default-markup,htm,html,mxml,xhtml,xml,xsl".split(","));
        k(x([["pln", /^\s+/, q, " \t\r\n"], ["atv", /^(?:"[^"]*"?|'[^']*'?)/, q, "\"'"]], [["tag", /^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i], ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i], ["lang-uq.val", /^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/], ["pun", /^[/<->]+/], ["lang-js", /^on\w+\s*=\s*"([^"]+)"/i], ["lang-js", /^on\w+\s*=\s*'([^']+)'/i], ["lang-js", /^on\w+\s*=\s*([^\s"'>]+)/i], ["lang-css", /^style\s*=\s*"([^"]+)"/i], ["lang-css", /^style\s*=\s*'([^']+)'/i], ["lang-css", /^style\s*=\s*([^\s"'>]+)/i]]), ["in.tag"]);
        k(x([], [["atv", /^[\S\s]+/]]), ["uq.val"]);
        k(u({
          keywords: F,
          hashComments: !0,
          cStyleComments: !0,
          types: K
        }), "c,cc,cpp,cxx,cyc,m".split(","));
        k(u({
          keywords: "null,true,false"
        }), ["json"]);
        k(u({
          keywords: H,
          hashComments: !0,
          cStyleComments: !0,
          verbatimStrings: !0,
          types: K
        }), ["cs"]);
        k(u({
          keywords: G,
          cStyleComments: !0
        }), ["java"]);
        k(u({
          keywords: v,
          hashComments: !0,
          multiLineStrings: !0
        }), ["bsh", "csh", "sh"]);
        k(u({
          keywords: I,
          hashComments: !0,
          multiLineStrings: !0,
          tripleQuotedStrings: !0
        }), ["cv", "py"]);
        k(u({
          keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
          hashComments: !0,
          multiLineStrings: !0,
          regexLiterals: !0
        }), ["perl", "pl", "pm"]);
        k(u({
          keywords: J,
          hashComments: !0,
          multiLineStrings: !0,
          regexLiterals: !0
        }), ["rb"]);
        k(u({
          keywords: w,
          cStyleComments: !0,
          regexLiterals: !0
        }), ["js"]);
        k(u({
          keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes",
          hashComments: 3,
          cStyleComments: !0,
          multilineStrings: !0,
          tripleQuotedStrings: !0,
          regexLiterals: !0
        }), ["coffee"]);
        k(x([], [["str", /^[\S\s]+/]]), ["regex"]);
        window.prettyPrintOne = function(a, m, e) {
          var h = document.createElement("PRE");
          h.innerHTML = a;
          e && D(h, e);
          E({
            g: m,
            i: e,
            h: h
          });
          return h.innerHTML
        }
        ;
        window.prettyPrint = function(a) {
          function m() {
            for (var e = window.PR_SHOULD_USE_CONTINUATION ? l.now() + 250 : Infinity; p < h.length && l.now() < e; p++) {
              var n = h[p]
                , k = n.className;
              if (k.indexOf("prettyprint") >= 0) {
                var k = k.match(g), f, b;
                if (b = !k) {
                  b = n;
                  for (var o = void 0, c = b.firstChild; c; c = c.nextSibling) {
                    var i = c.nodeType
                      , o = i === 1 ? o ? b : c : i === 3 ? N.test(c.nodeValue) ? b : o : o
                  }
                  b = (f = o === b ? void 0 : o) && "CODE" === f.tagName
                }
                b && (k = f.className.match(g));
                k && (k = k[1]);
                b = !1;
                for (o = n.parentNode; o; o = o.parentNode) {
                  if ((o.tagName === "pre" || o.tagName === "code" || o.tagName === "xmp") && o.className && o.className.indexOf("prettyprint") >= 0) {
                    b = !0;
                    break
                  }
                }
                b || ((b = (b = n.className.match(/\blinenums\b(?::(\d+))?/)) ? b[1] && b[1].length ? +b[1] : !0 : !1) && D(n, b),
                d = {
                  g: k,
                  h: n,
                  i: b
                },
                E(d))
              }
            }
            p < h.length ? setTimeout(m, 250) : a && a()
          }
          for (var e = [document.getElementsByTagName("pre"), document.getElementsByTagName("code"), document.getElementsByTagName("xmp")], h = [], k = 0; k < e.length; ++k) {
            for (var t = 0, s = e[k].length; t < s; ++t) {
              h.push(e[k][t])
            }
          }
          var e = q
            , l = Date;
          l.now || (l = {
            now: function() {
              return +new Date
            }
          });
          var p = 0, d, g = /\blang(?:uage)?-([\w.]+)(?!\S)/;
          m()
        }
        ;
        window.PR = {
          createSimpleLexer: x,
          registerLangHandler: k,
          sourceDecorator: u,
          PR_ATTRIB_NAME: "atn",
          PR_ATTRIB_VALUE: "atv",
          PR_COMMENT: "com",
          PR_DECLARATION: "dec",
          PR_KEYWORD: "kwd",
          PR_LITERAL: "lit",
          PR_NOCODE: "nocode",
          PR_PLAIN: "pln",
          PR_PUNCTUATION: "pun",
          PR_SOURCE: "src",
          PR_STRING: "str",
          PR_TAG: "tag",
          PR_TYPE: "typ"
        }
      }
      )();
      PR.registerLangHandler(PR.createSimpleLexer([["pln", /^[\t\n\f\r ]+/, null, " \t\r\n\u000c"]], [["str", /^"(?:[^\n\f\r"\\]|\\(?:\r\n?|\n|\f)|\\[\S\s])*"/, null], ["str", /^'(?:[^\n\f\r'\\]|\\(?:\r\n?|\n|\f)|\\[\S\s])*'/, null], ["lang-css-str", /^url\(([^"')]*)\)/i], ["kwd", /^(?:url|rgb|!important|@import|@page|@media|@charset|inherit)(?=[^\w-]|$)/i, null], ["lang-css-kw", /^(-?(?:[_a-z]|\\[\da-f]+ ?)(?:[\w-]|\\\\[\da-f]+ ?)*)\s*:/i], ["com", /^\/\*[^*]*\*+(?:[^*/][^*]*\*+)*\//], ["com", /^(?:<\!--|--\>)/], ["lit", /^(?:\d+|\d*\.\d+)(?:%|[a-z]+)?/i], ["lit", /^#[\da-f]{3,6}/i], ["pln", /^-?(?:[_a-z]|\\[\da-f]+ ?)(?:[\w-]|\\\\[\da-f]+ ?)*/i], ["pun", /^[^\s\w"']+/]]), ["css"]);
      PR.registerLangHandler(PR.createSimpleLexer([], [["kwd", /^-?(?:[_a-z]|\\[\da-f]+ ?)(?:[\w-]|\\\\[\da-f]+ ?)*/i]]), ["css-kw"]);
      PR.registerLangHandler(PR.createSimpleLexer([], [["str", /^[^"')]+/]]), ["css-str"]);
      prettyPrint();
    })();

    (function () {
      !function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Clipboard=t()}}(function(){var t,e,n;return function t(e,n,o){function i(a,c){if(!n[a]){if(!e[a]){var l="function"==typeof require&&require;if(!c&&l)return l(a,!0);if(r)return r(a,!0);var s=new Error("Cannot find module '"+a+"'");throw s.code="MODULE_NOT_FOUND",s}var u=n[a]={exports:{}};e[a][0].call(u.exports,function(t){var n=e[a][1][t];return i(n||t)},u,u.exports,t,e,n,o)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(t,e,n){function o(t,e){for(;t&&t.nodeType!==i;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}var i=9;if("undefined"!=typeof Element&&!Element.prototype.matches){var r=Element.prototype;r.matches=r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector}e.exports=o},{}],2:[function(t,e,n){function o(t,e,n,o,r){var a=i.apply(this,arguments);return t.addEventListener(n,a,r),{destroy:function(){t.removeEventListener(n,a,r)}}}function i(t,e,n,o){return function(n){n.delegateTarget=r(n.target,e),n.delegateTarget&&o.call(t,n)}}var r=t("./closest");e.exports=o},{"./closest":1}],3:[function(t,e,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},{}],4:[function(t,e,n){function o(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!c.string(e))throw new TypeError("Second argument must be a String");if(!c.fn(n))throw new TypeError("Third argument must be a Function");if(c.node(t))return i(t,e,n);if(c.nodeList(t))return r(t,e,n);if(c.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function i(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function r(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return l(document.body,t,e,n)}var c=t("./is"),l=t("delegate");e.exports=o},{"./is":3,delegate:2}],5:[function(t,e,n){function o(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var o=window.getSelection(),i=document.createRange();i.selectNodeContents(t),o.removeAllRanges(),o.addRange(i),e=o.toString()}return e}e.exports=o},{}],6:[function(t,e,n){function o(){}o.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function o(){i.off(t,o),e.apply(n,arguments)}var i=this;return o._=e,this.on(t,o,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,i=n.length;for(o;o<i;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],i=[];if(o&&e)for(var r=0,a=o.length;r<a;r++)o[r].fn!==e&&o[r].fn._!==e&&i.push(o[r]);return i.length?n[t]=i:delete n[t],this}},e.exports=o},{}],7:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","select"],r);else if(void 0!==o)r(n,e("select"));else{var a={exports:{}};r(a,i.select),i.clipboardAction=a.exports}}(this,function(t,e){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=n(e),r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),c=function(){function t(e){o(this,t),this.resolveOptions(e),this.initSelection()}return a(t,[{key:"resolveOptions",value:function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=e.action,this.container=e.container,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function t(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function t(){var e=this,n="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[n?"right":"left"]="-9999px";var o=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=o+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,i.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function t(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function t(){this.selectedText=(0,i.default)(this.target),this.copyText()}},{key:"copyText",value:function t(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function t(e){this.emitter.emit(e?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function t(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function t(){this.removeFake()}},{key:"action",set:function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function t(){return this._action}},{key:"target",set:function t(e){if(void 0!==e){if(!e||"object"!==(void 0===e?"undefined":r(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e}},get:function t(){return this._target}}]),t}();t.exports=c})},{select:5}],8:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","./clipboard-action","tiny-emitter","good-listener"],r);else if(void 0!==o)r(n,e("./clipboard-action"),e("tiny-emitter"),e("good-listener"));else{var a={exports:{}};r(a,i.clipboardAction,i.tinyEmitter,i.goodListener),i.clipboard=a.exports}}(this,function(t,e,n,o){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function l(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}var s=i(e),u=i(n),f=i(o),d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),p=function(t){function e(t,n){r(this,e);var o=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return o.resolveOptions(n),o.listenClick(t),o}return c(e,t),h(e,[{key:"resolveOptions",value:function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText,this.container="object"===d(e.container)?e.container:document.body}},{key:"listenClick",value:function t(e){var n=this;this.listener=(0,f.default)(e,"click",function(t){return n.onClick(t)})}},{key:"onClick",value:function t(e){var n=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new s.default({action:this.action(n),target:this.target(n),text:this.text(n),container:this.container,trigger:n,emitter:this})}},{key:"defaultAction",value:function t(e){return l("action",e)}},{key:"defaultTarget",value:function t(e){var n=l("target",e);if(n)return document.querySelector(n)}},{key:"defaultText",value:function t(e){return l("text",e)}},{key:"destroy",value:function t(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],n="string"==typeof e?[e]:e,o=!!document.queryCommandSupported;return n.forEach(function(t){o=o&&!!document.queryCommandSupported(t)}),o}}]),e}(u.default);t.exports=p})},{"./clipboard-action":7,"good-listener":4,"tiny-emitter":6}]},{},[8])(8)});
    })();

    $('.post code').each(function () {
      var $copy = $('<a>', {
        'class': 'fa-code-copy-button fa fa-clipboard',
        'title': 'Copiar'
      });

      $copy.tooltipster({ functionAfter: function (ins, helper) {
        $(this).tooltipster('content', 'Copiar');
      }})

      $copy.on('click', function () {
        event.preventDefault();

        $(this).tooltipster('content', 'Copiado');
      });

      $copy.prependTo($(this).parents('.codebox').not('.spoiler'));

      new Clipboard('.fa-code-copy-button', {
        target: function (trigger) {
          return $(trigger).parent().find('code').get(0);
        }
      });
    });
  });
}(jQuery));
