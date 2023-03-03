(function(n) {
  if ("object" == typeof exports && "object" == typeof module) {
    module.exports = n();
  } else {
    if ("function" == typeof define && define.amd) {
      return define([], n);
    }
    (this || window).CodeMirror = n();
  }
})(function() {
  function n(a, b) {
    if (!(this instanceof n)) {
      return new n(a, b);
    }
    this.options = b = b ? X(b) : {};
    X(xf, b, !1);
    xc(b);
    var c = b.value;
    "string" == typeof c && (c = new P(c, b.mode, null, b.lineSeparator));
    this.doc = c;
    var d = new n.inputStyles[b.inputStyle](this), d = this.display = new yf(a, c, d);
    d.wrapper.CodeMirror = this;
    Ad(this);
    Bd(this);
    b.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap");
    b.autofocus && !cb && d.input.focus();
    Cd(this);
    this.state = {keyMaps:[], overlays:[], modeGen:0, overwrite:!1, delayingBlurEvent:!1, focused:!1, suppressEdits:!1, pasteIncoming:!1, cutIncoming:!1, selectingText:!1, draggingText:!1, highlight:new va, keySeq:null, specialChars:null};
    var e = this;
    B && 11 > C && setTimeout(function() {
      e.display.input.reset(!0);
    }, 20);
    zf(this);
    Dd || (Af(), Dd = !0);
    La(this);
    this.curOp.forceUpdate = !0;
    Ed(this, c);
    b.autofocus && !cb || e.hasFocus() ? setTimeout(db(yc, this), 20) : eb(this);
    for (var f in Ma) {
      if (Ma.hasOwnProperty(f)) {
        Ma[f](this, b[f], Fd);
      }
    }
    Gd(this);
    b.finishInit && b.finishInit(this);
    for (c = 0;c < zc.length;++c) {
      zc[c](this);
    }
    Na(this);
    K && b.lineWrapping && "optimizelegibility" == getComputedStyle(d.lineDiv).textRendering && (d.lineDiv.style.textRendering = "auto");
  }
  function yf(a, b, c) {
    this.input = c;
    this.scrollbarFiller = r("div", null, "CodeMirror-scrollbar-filler");
    this.scrollbarFiller.setAttribute("cm-not-content", "true");
    this.gutterFiller = r("div", null, "CodeMirror-gutter-filler");
    this.gutterFiller.setAttribute("cm-not-content", "true");
    this.lineDiv = r("div", null, "CodeMirror-code");
    this.selectionDiv = r("div", null, null, "position: relative; z-index: 1");
    this.cursorDiv = r("div", null, "CodeMirror-cursors");
    this.measure = r("div", null, "CodeMirror-measure");
    this.lineMeasure = r("div", null, "CodeMirror-measure");
    this.lineSpace = r("div", [this.measure, this.lineMeasure, this.selectionDiv, this.cursorDiv, this.lineDiv], null, "position: relative; outline: none");
    this.mover = r("div", [r("div", [this.lineSpace], "CodeMirror-lines")], null, "position: relative");
    this.sizer = r("div", [this.mover], "CodeMirror-sizer");
    this.sizerWidth = null;
    this.heightForcer = r("div", null, null, "position: absolute; height: " + Hd + "px; width: 1px;");
    this.gutters = r("div", null, "CodeMirror-gutters");
    this.lineGutter = null;
    this.scroller = r("div", [this.sizer, this.heightForcer, this.gutters], "CodeMirror-scroll");
    this.scroller.setAttribute("tabIndex", "-1");
    this.wrapper = r("div", [this.scrollbarFiller, this.gutterFiller, this.scroller], "CodeMirror");
    B && 8 > C && (this.gutters.style.zIndex = -1, this.scroller.style.paddingRight = 0);
    K || pa && cb || (this.scroller.draggable = !0);
    a && (a.appendChild ? a.appendChild(this.wrapper) : a(this.wrapper));
    this.reportedViewFrom = this.reportedViewTo = this.viewFrom = this.viewTo = b.first;
    this.view = [];
    this.externalMeasured = this.renderedView = null;
    this.lastWrapHeight = this.lastWrapWidth = this.viewOffset = 0;
    this.updateLineNumbers = null;
    this.nativeBarWidth = this.barHeight = this.barWidth = 0;
    this.scrollbarsClipped = !1;
    this.lineNumWidth = this.lineNumInnerWidth = this.lineNumChars = null;
    this.alignWidgets = !1;
    this.maxLine = this.cachedCharWidth = this.cachedTextHeight = this.cachedPaddingH = null;
    this.maxLineLength = 0;
    this.maxLineChanged = !1;
    this.wheelDX = this.wheelDY = this.wheelStartX = this.wheelStartY = null;
    this.shift = !1;
    this.activeTouch = this.selForContextMenu = null;
    c.init(this);
  }
  function Ac(a) {
    a.doc.mode = n.getMode(a.options, a.doc.modeOption);
    fb(a);
  }
  function fb(a) {
    a.doc.iter(function(a) {
      a.stateAfter && (a.stateAfter = null);
      a.styles && (a.styles = null);
    });
    a.doc.frontier = a.doc.first;
    gb(a, 100);
    a.state.modeGen++;
    a.curOp && N(a);
  }
  function Id(a) {
    var b = wa(a.display), c = a.options.lineWrapping, d = c && Math.max(5, a.display.scroller.clientWidth / hb(a.display) - 3);
    return function(e) {
      if (xa(a.doc, e)) {
        return 0;
      }
      var f = 0;
      if (e.widgets) {
        for (var g = 0;g < e.widgets.length;g++) {
          e.widgets[g].height && (f += e.widgets[g].height);
        }
      }
      return c ? f + (Math.ceil(e.text.length / d) || 1) * b : f + b;
    };
  }
  function Bc(a) {
    var b = a.doc, c = Id(a);
    b.iter(function(a) {
      var b = c(a);
      b != a.height && da(a, b);
    });
  }
  function Bd(a) {
    a.display.wrapper.className = a.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + a.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
    ib(a);
  }
  function jb(a) {
    Ad(a);
    N(a);
    setTimeout(function() {
      Cc(a);
    }, 20);
  }
  function Ad(a) {
    var b = a.display.gutters, c = a.options.gutters;
    ya(b);
    for (var d = 0;d < c.length;++d) {
      var e = c[d], f = b.appendChild(r("div", null, "CodeMirror-gutter " + e));
      "CodeMirror-linenumbers" == e && (a.display.lineGutter = f, f.style.width = (a.display.lineNumWidth || 1) + "px");
    }
    b.style.display = d ? "" : "none";
    Dc(a);
  }
  function Dc(a) {
    a.display.sizer.style.marginLeft = a.display.gutters.offsetWidth + "px";
  }
  function Kb(a) {
    if (0 == a.height) {
      return 0;
    }
    for (var b = a.text.length, c, d = a;c = za(d, !0);) {
      c = c.find(0, !0), d = c.from.line, b += c.from.ch - c.to.ch;
    }
    for (d = a;c = za(d, !1);) {
      c = c.find(0, !0), b -= d.text.length - c.from.ch, d = c.to.line, b += d.text.length - c.to.ch;
    }
    return b;
  }
  function Ec(a) {
    var b = a.display;
    a = a.doc;
    b.maxLine = t(a, a.first);
    b.maxLineLength = Kb(b.maxLine);
    b.maxLineChanged = !0;
    a.iter(function(a) {
      var d = Kb(a);
      d > b.maxLineLength && (b.maxLineLength = d, b.maxLine = a);
    });
  }
  function xc(a) {
    var b = D(a.gutters, "CodeMirror-linenumbers");
    -1 == b && a.lineNumbers ? a.gutters = a.gutters.concat(["CodeMirror-linenumbers"]) : -1 < b && !a.lineNumbers && (a.gutters = a.gutters.slice(0), a.gutters.splice(b, 1));
  }
  function kb(a) {
    var b = a.display, c = b.gutters.offsetWidth, d = Math.round(a.doc.height + Fc(a.display));
    return {clientHeight:b.scroller.clientHeight, viewHeight:b.wrapper.clientHeight, scrollWidth:b.scroller.scrollWidth, clientWidth:b.scroller.clientWidth, viewWidth:b.wrapper.clientWidth, barLeft:a.options.fixedGutter ? c : 0, docHeight:d, scrollHeight:d + ea(a) + b.barHeight, nativeBarWidth:b.nativeBarWidth, gutterWidth:c};
  }
  function Gc(a, b, c) {
    this.cm = c;
    var d = this.vert = r("div", [r("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"), e = this.horiz = r("div", [r("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
    a(d);
    a(e);
    v(d, "scroll", function() {
      d.clientHeight && b(d.scrollTop, "vertical");
    });
    v(e, "scroll", function() {
      e.clientWidth && b(e.scrollLeft, "horizontal");
    });
    this.checkedZeroWidth = !1;
    B && 8 > C && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
  }
  function Hc() {
  }
  function Cd(a) {
    a.display.scrollbars && (a.display.scrollbars.clear(), a.display.scrollbars.addClass && lb(a.display.wrapper, a.display.scrollbars.addClass));
    a.display.scrollbars = new n.scrollbarModel[a.options.scrollbarStyle](function(b) {
      a.display.wrapper.insertBefore(b, a.display.scrollbarFiller);
      v(b, "mousedown", function() {
        a.state.focused && setTimeout(function() {
          a.display.input.focus();
        }, 0);
      });
      b.setAttribute("cm-not-content", "true");
    }, function(b, c) {
      "horizontal" == c ? Oa(a, b) : mb(a, b);
    }, a);
    a.display.scrollbars.addClass && nb(a.display.wrapper, a.display.scrollbars.addClass);
  }
  function Pa(a, b) {
    b || (b = kb(a));
    var c = a.display.barWidth, d = a.display.barHeight;
    Jd(a, b);
    for (var e = 0;4 > e && c != a.display.barWidth || d != a.display.barHeight;e++) {
      c != a.display.barWidth && a.options.lineWrapping && Lb(a), Jd(a, kb(a)), c = a.display.barWidth, d = a.display.barHeight;
    }
  }
  function Jd(a, b) {
    var c = a.display, d = c.scrollbars.update(b);
    c.sizer.style.paddingRight = (c.barWidth = d.right) + "px";
    c.sizer.style.paddingBottom = (c.barHeight = d.bottom) + "px";
    d.right && d.bottom ? (c.scrollbarFiller.style.display = "block", c.scrollbarFiller.style.height = d.bottom + "px", c.scrollbarFiller.style.width = d.right + "px") : c.scrollbarFiller.style.display = "";
    d.bottom && a.options.coverGutterNextToScrollbar && a.options.fixedGutter ? (c.gutterFiller.style.display = "block", c.gutterFiller.style.height = d.bottom + "px", c.gutterFiller.style.width = b.gutterWidth + "px") : c.gutterFiller.style.display = "";
  }
  function Ic(a, b, c) {
    var d = c && null != c.top ? Math.max(0, c.top) : a.scroller.scrollTop, d = Math.floor(d - a.lineSpace.offsetTop), e = c && null != c.bottom ? c.bottom : d + a.wrapper.clientHeight, d = Aa(b, d), e = Aa(b, e);
    if (c && c.ensure) {
      var f = c.ensure.from.line;
      c = c.ensure.to.line;
      f < d ? (d = f, e = Aa(b, fa(t(b, f)) + a.wrapper.clientHeight)) : Math.min(c, b.lastLine()) >= e && (d = Aa(b, fa(t(b, c)) - a.wrapper.clientHeight), e = c);
    }
    return {from:d, to:Math.max(e, d + 1)};
  }
  function Cc(a) {
    var b = a.display, c = b.view;
    if (b.alignWidgets || b.gutters.firstChild && a.options.fixedGutter) {
      for (var d = Jc(b) - b.scroller.scrollLeft + a.doc.scrollLeft, e = b.gutters.offsetWidth, f = d + "px", g = 0;g < c.length;g++) {
        if (!c[g].hidden) {
          a.options.fixedGutter && c[g].gutter && (c[g].gutter.style.left = f);
          var h = c[g].alignable;
          if (h) {
            for (var k = 0;k < h.length;k++) {
              h[k].style.left = f;
            }
          }
        }
      }
      a.options.fixedGutter && (b.gutters.style.left = d + e + "px");
    }
  }
  function Gd(a) {
    if (!a.options.lineNumbers) {
      return !1;
    }
    var b = a.doc, b = Kc(a.options, b.first + b.size - 1), c = a.display;
    if (b.length != c.lineNumChars) {
      var d = c.measure.appendChild(r("div", [r("div", b)], "CodeMirror-linenumber CodeMirror-gutter-elt")), e = d.firstChild.offsetWidth, d = d.offsetWidth - e;
      c.lineGutter.style.width = "";
      c.lineNumInnerWidth = Math.max(e, c.lineGutter.offsetWidth - d) + 1;
      c.lineNumWidth = c.lineNumInnerWidth + d;
      c.lineNumChars = c.lineNumInnerWidth ? b.length : -1;
      c.lineGutter.style.width = c.lineNumWidth + "px";
      Dc(a);
      return !0;
    }
    return !1;
  }
  function Kc(a, b) {
    return String(a.lineNumberFormatter(b + a.firstLineNumber));
  }
  function Jc(a) {
    return a.scroller.getBoundingClientRect().left - a.sizer.getBoundingClientRect().left;
  }
  function Mb(a, b, c) {
    var d = a.display;
    this.viewport = b;
    this.visible = Ic(d, a.doc, b);
    this.editorIsHidden = !d.wrapper.offsetWidth;
    this.wrapperHeight = d.wrapper.clientHeight;
    this.wrapperWidth = d.wrapper.clientWidth;
    this.oldDisplayWidth = qa(a);
    this.force = c;
    this.dims = Lc(a);
    this.events = [];
  }
  function Mc(a, b) {
    var c = a.display, d = a.doc;
    if (b.editorIsHidden) {
      return ra(a), !1;
    }
    if (!b.force && b.visible.from >= c.viewFrom && b.visible.to <= c.viewTo && (null == c.updateLineNumbers || c.updateLineNumbers >= c.viewTo) && c.renderedView == c.view && 0 == Kd(a)) {
      return !1;
    }
    Gd(a) && (ra(a), b.dims = Lc(a));
    var e = d.first + d.size, f = Math.max(b.visible.from - a.options.viewportMargin, d.first), g = Math.min(e, b.visible.to + a.options.viewportMargin);
    c.viewFrom < f && 20 > f - c.viewFrom && (f = Math.max(d.first, c.viewFrom));
    c.viewTo > g && 20 > c.viewTo - g && (g = Math.min(e, c.viewTo));
    sa && (f = Nc(a.doc, f), g = Ld(a.doc, g));
    d = f != c.viewFrom || g != c.viewTo || c.lastWrapHeight != b.wrapperHeight || c.lastWrapWidth != b.wrapperWidth;
    e = a.display;
    0 == e.view.length || f >= e.viewTo || g <= e.viewFrom ? (e.view = Nb(a, f, g), e.viewFrom = f) : (e.viewFrom > f ? e.view = Nb(a, f, e.viewFrom).concat(e.view) : e.viewFrom < f && (e.view = e.view.slice(Ba(a, f))), e.viewFrom = f, e.viewTo < g ? e.view = e.view.concat(Nb(a, e.viewTo, g)) : e.viewTo > g && (e.view = e.view.slice(0, Ba(a, g))));
    e.viewTo = g;
    c.viewOffset = fa(t(a.doc, c.viewFrom));
    a.display.mover.style.top = c.viewOffset + "px";
    g = Kd(a);
    if (!d && 0 == g && !b.force && c.renderedView == c.view && (null == c.updateLineNumbers || c.updateLineNumbers >= c.viewTo)) {
      return !1;
    }
    f = ga();
    4 < g && (c.lineDiv.style.display = "none");
    Bf(a, c.updateLineNumbers, b.dims);
    4 < g && (c.lineDiv.style.display = "");
    c.renderedView = c.view;
    f && ga() != f && f.offsetHeight && f.focus();
    ya(c.cursorDiv);
    ya(c.selectionDiv);
    c.gutters.style.height = c.sizer.style.minHeight = 0;
    d && (c.lastWrapHeight = b.wrapperHeight, c.lastWrapWidth = b.wrapperWidth, gb(a, 400));
    c.updateLineNumbers = null;
    return !0;
  }
  function Md(a, b) {
    for (var c = b.viewport, d = !0;;d = !1) {
      if (!d || !a.options.lineWrapping || b.oldDisplayWidth == qa(a)) {
        if (c && null != c.top && (c = {top:Math.min(a.doc.height + Fc(a.display) - Oc(a), c.top)}), b.visible = Ic(a.display, a.doc, c), b.visible.from >= a.display.viewFrom && b.visible.to <= a.display.viewTo) {
          break;
        }
      }
      if (!Mc(a, b)) {
        break;
      }
      Lb(a);
      d = kb(a);
      ob(a);
      Pc(a, d);
      Pa(a, d);
    }
    b.signal(a, "update", a);
    if (a.display.viewFrom != a.display.reportedViewFrom || a.display.viewTo != a.display.reportedViewTo) {
      b.signal(a, "viewportChange", a, a.display.viewFrom, a.display.viewTo), a.display.reportedViewFrom = a.display.viewFrom, a.display.reportedViewTo = a.display.viewTo;
    }
  }
  function Qc(a, b) {
    var c = new Mb(a, b);
    if (Mc(a, c)) {
      Lb(a);
      Md(a, c);
      var d = kb(a);
      ob(a);
      Pc(a, d);
      Pa(a, d);
      c.finish();
    }
  }
  function Pc(a, b) {
    a.display.sizer.style.minHeight = b.docHeight + "px";
    var c = b.docHeight + a.display.barHeight;
    a.display.heightForcer.style.top = c + "px";
    a.display.gutters.style.height = Math.max(c + ea(a), b.clientHeight) + "px";
  }
  function Lb(a) {
    a = a.display;
    for (var b = a.lineDiv.offsetTop, c = 0;c < a.view.length;c++) {
      var d = a.view[c], e;
      if (!d.hidden) {
        if (B && 8 > C) {
          var f = d.node.offsetTop + d.node.offsetHeight;
          e = f - b;
          b = f;
        } else {
          e = d.node.getBoundingClientRect(), e = e.bottom - e.top;
        }
        f = d.line.height - e;
        2 > e && (e = wa(a));
        if (.001 < f || -.001 > f) {
          if (da(d.line, e), Nd(d.line), d.rest) {
            for (e = 0;e < d.rest.length;e++) {
              Nd(d.rest[e]);
            }
          }
        }
      }
    }
  }
  function Nd(a) {
    if (a.widgets) {
      for (var b = 0;b < a.widgets.length;++b) {
        a.widgets[b].height = a.widgets[b].node.parentNode.offsetHeight;
      }
    }
  }
  function Lc(a) {
    for (var b = a.display, c = {}, d = {}, e = b.gutters.clientLeft, f = b.gutters.firstChild, g = 0;f;f = f.nextSibling, ++g) {
      c[a.options.gutters[g]] = f.offsetLeft + f.clientLeft + e, d[a.options.gutters[g]] = f.clientWidth;
    }
    return {fixedPos:Jc(b), gutterTotalWidth:b.gutters.offsetWidth, gutterLeft:c, gutterWidth:d, wrapperWidth:b.wrapper.clientWidth};
  }
  function Bf(a, b, c) {
    function d(b) {
      var c = b.nextSibling;
      K && Y && a.display.currentWheelTarget == b ? b.style.display = "none" : b.parentNode.removeChild(b);
      return c;
    }
    for (var e = a.display, f = a.options.lineNumbers, g = e.lineDiv, h = g.firstChild, k = e.view, e = e.viewFrom, l = 0;l < k.length;l++) {
      var m = k[l];
      if (!m.hidden) {
        if (m.node && m.node.parentNode == g) {
          for (;h != m.node;) {
            h = d(h);
          }
          h = f && null != b && b <= e && m.lineNumber;
          m.changes && (-1 < D(m.changes, "gutter") && (h = !1), Od(a, m, e, c));
          h && (ya(m.lineNumber), m.lineNumber.appendChild(document.createTextNode(Kc(a.options, e))));
          h = m.node.nextSibling;
        } else {
          var u = Cf(a, m, e, c);
          g.insertBefore(u, h);
        }
      }
      e += m.size;
    }
    for (;h;) {
      h = d(h);
    }
  }
  function Od(a, b, c, d) {
    for (var e = 0;e < b.changes.length;e++) {
      var f = b.changes[e];
      if ("text" == f) {
        var f = b, g = f.text.className, h = Pd(a, f);
        f.text == f.node && (f.node = h.pre);
        f.text.parentNode.replaceChild(h.pre, f.text);
        f.text = h.pre;
        h.bgClass != f.bgClass || h.textClass != f.textClass ? (f.bgClass = h.bgClass, f.textClass = h.textClass, Rc(f)) : g && (f.text.className = g);
      } else {
        if ("gutter" == f) {
          Qd(a, b, c, d);
        } else {
          if ("class" == f) {
            Rc(b);
          } else {
            if ("widget" == f) {
              f = a;
              g = b;
              h = d;
              g.alignable && (g.alignable = null);
              for (var k = g.node.firstChild, l = void 0;k;k = l) {
                l = k.nextSibling, "CodeMirror-linewidget" == k.className && g.node.removeChild(k);
              }
              Rd(f, g, h);
            }
          }
        }
      }
    }
    b.changes = null;
  }
  function pb(a) {
    a.node == a.text && (a.node = r("div", null, null, "position: relative"), a.text.parentNode && a.text.parentNode.replaceChild(a.node, a.text), a.node.appendChild(a.text), B && 8 > C && (a.node.style.zIndex = 2));
    return a.node;
  }
  function Pd(a, b) {
    var c = a.display.externalMeasured;
    return c && c.line == b.line ? (a.display.externalMeasured = null, b.measure = c.measure, c.built) : Sd(a, b);
  }
  function Rc(a) {
    var b = a.bgClass ? a.bgClass + " " + (a.line.bgClass || "") : a.line.bgClass;
    b && (b += " CodeMirror-linebackground");
    if (a.background) {
      b ? a.background.className = b : (a.background.parentNode.removeChild(a.background), a.background = null);
    } else {
      if (b) {
        var c = pb(a);
        a.background = c.insertBefore(r("div", null, b), c.firstChild);
      }
    }
    a.line.wrapClass ? pb(a).className = a.line.wrapClass : a.node != a.text && (a.node.className = "");
    a.text.className = (a.textClass ? a.textClass + " " + (a.line.textClass || "") : a.line.textClass) || "";
  }
  function Qd(a, b, c, d) {
    b.gutter && (b.node.removeChild(b.gutter), b.gutter = null);
    b.gutterBackground && (b.node.removeChild(b.gutterBackground), b.gutterBackground = null);
    if (b.line.gutterClass) {
      var e = pb(b);
      b.gutterBackground = r("div", null, "CodeMirror-gutter-background " + b.line.gutterClass, "left: " + (a.options.fixedGutter ? d.fixedPos : -d.gutterTotalWidth) + "px; width: " + d.gutterTotalWidth + "px");
      e.insertBefore(b.gutterBackground, b.text);
    }
    var f = b.line.gutterMarkers;
    if (a.options.lineNumbers || f) {
      var e = pb(b), g = b.gutter = r("div", null, "CodeMirror-gutter-wrapper", "left: " + (a.options.fixedGutter ? d.fixedPos : -d.gutterTotalWidth) + "px");
      a.display.input.setUneditable(g);
      e.insertBefore(g, b.text);
      b.line.gutterClass && (g.className += " " + b.line.gutterClass);
      !a.options.lineNumbers || f && f["CodeMirror-linenumbers"] || (b.lineNumber = g.appendChild(r("div", Kc(a.options, c), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + d.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + a.display.lineNumInnerWidth + "px")));
      if (f) {
        for (b = 0;b < a.options.gutters.length;++b) {
          c = a.options.gutters[b], (e = f.hasOwnProperty(c) && f[c]) && g.appendChild(r("div", [e], "CodeMirror-gutter-elt", "left: " + d.gutterLeft[c] + "px; width: " + d.gutterWidth[c] + "px"));
        }
      }
    }
  }
  function Cf(a, b, c, d) {
    var e = Pd(a, b);
    b.text = b.node = e.pre;
    e.bgClass && (b.bgClass = e.bgClass);
    e.textClass && (b.textClass = e.textClass);
    Rc(b);
    Qd(a, b, c, d);
    Rd(a, b, d);
    return b.node;
  }
  function Rd(a, b, c) {
    Td(a, b.line, b, c, !0);
    if (b.rest) {
      for (var d = 0;d < b.rest.length;d++) {
        Td(a, b.rest[d], b, c, !1);
      }
    }
  }
  function Td(a, b, c, d, e) {
    if (b.widgets) {
      var f = pb(c), g = 0;
      for (b = b.widgets;g < b.length;++g) {
        var h = b[g], k = r("div", [h.node], "CodeMirror-linewidget");
        h.handleMouseEvents || k.setAttribute("cm-ignore-events", "true");
        var l = h, m = k, u = d;
        if (l.noHScroll) {
          (c.alignable || (c.alignable = [])).push(m);
          var p = u.wrapperWidth;
          m.style.left = u.fixedPos + "px";
          l.coverGutter || (p -= u.gutterTotalWidth, m.style.paddingLeft = u.gutterTotalWidth + "px");
          m.style.width = p + "px";
        }
        l.coverGutter && (m.style.zIndex = 5, m.style.position = "relative", l.noHScroll || (m.style.marginLeft = -u.gutterTotalWidth + "px"));
        a.display.input.setUneditable(k);
        e && h.above ? f.insertBefore(k, c.gutter || c.text) : f.appendChild(k);
        Q(h, "redraw");
      }
    }
  }
  function Sc(a) {
    return q(a.line, a.ch);
  }
  function Ob(a, b) {
    return 0 > y(a, b) ? b : a;
  }
  function Pb(a, b) {
    return 0 > y(a, b) ? a : b;
  }
  function Ud(a) {
    a.state.focused || (a.display.input.focus(), yc(a));
  }
  function Qb(a, b, c, d, e) {
    var f = a.doc;
    a.display.shift = !1;
    d || (d = f.sel);
    var g = a.state.pasteIncoming || "paste" == e, h = f.splitLines(b), k = null;
    if (g && 1 < d.ranges.length) {
      if (V && V.join("\n") == b) {
        if (0 == d.ranges.length % V.length) {
          for (var k = [], l = 0;l < V.length;l++) {
            k.push(f.splitLines(V[l]));
          }
        }
      } else {
        h.length == d.ranges.length && (k = Rb(h, function(a) {
          return [a];
        }));
      }
    }
    for (l = d.ranges.length - 1;0 <= l;l--) {
      var m = d.ranges[l], u = m.from(), p = m.to();
      m.empty() && (c && 0 < c ? u = q(u.line, u.ch - c) : a.state.overwrite && !g && (p = q(p.line, Math.min(t(f, p.line).text.length, p.ch + A(h).length))));
      m = a.curOp.updateInput;
      u = {from:u, to:p, text:k ? k[l % k.length] : h, origin:e || (g ? "paste" : a.state.cutIncoming ? "cut" : "+input")};
      Qa(a.doc, u);
      Q(a, "inputRead", a, u);
    }
    b && !g && Vd(a, b);
    Ra(a);
    a.curOp.updateInput = m;
    a.curOp.typing = !0;
    a.state.pasteIncoming = a.state.cutIncoming = !1;
  }
  function Wd(a, b) {
    var c = a.clipboardData && a.clipboardData.getData("text/plain");
    if (c) {
      return a.preventDefault(), b.isReadOnly() || b.options.disableInput || R(b, function() {
        Qb(b, c, 0, null, "paste");
      }), !0;
    }
  }
  function Vd(a, b) {
    if (a.options.electricChars && a.options.smartIndent) {
      for (var c = a.doc.sel, d = c.ranges.length - 1;0 <= d;d--) {
        var e = c.ranges[d];
        if (!(100 < e.head.ch || d && c.ranges[d - 1].head.line == e.head.line)) {
          var f = a.getModeAt(e.head), g = !1;
          if (f.electricChars) {
            for (var h = 0;h < f.electricChars.length;h++) {
              if (-1 < b.indexOf(f.electricChars.charAt(h))) {
                g = qb(a, e.head.line, "smart");
                break;
              }
            }
          } else {
            f.electricInput && f.electricInput.test(t(a.doc, e.head.line).text.slice(0, e.head.ch)) && (g = qb(a, e.head.line, "smart"));
          }
          g && Q(a, "electricInput", a, e.head.line);
        }
      }
    }
  }
  function Xd(a) {
    for (var b = [], c = [], d = 0;d < a.doc.sel.ranges.length;d++) {
      var e = a.doc.sel.ranges[d].head.line, e = {anchor:q(e, 0), head:q(e + 1, 0)};
      c.push(e);
      b.push(a.getRange(e.anchor, e.head));
    }
    return {text:b, ranges:c};
  }
  function Yd(a) {
    a.setAttribute("autocorrect", "off");
    a.setAttribute("autocapitalize", "off");
    a.setAttribute("spellcheck", "false");
  }
  function Tc(a) {
    this.cm = a;
    this.prevInput = "";
    this.pollingFast = !1;
    this.polling = new va;
    this.hasSelection = this.inaccurateSelection = !1;
    this.composing = null;
  }
  function Zd() {
    var a = r("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none"), b = r("div", [a], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
    K ? a.style.width = "1000px" : a.setAttribute("wrap", "off");
    Sa && (a.style.border = "1px solid black");
    Yd(a);
    return b;
  }
  function Uc(a) {
    this.cm = a;
    this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null;
    this.polling = new va;
    this.gracePeriod = !1;
  }
  function $d(a, b) {
    var c = Vc(a, b.line);
    if (!c || c.hidden) {
      return null;
    }
    var d = t(a.doc, b.line), c = ae(c, d, b.line), d = Z(d), e = "left";
    d && (e = Sb(d, b.ch) % 2 ? "right" : "left");
    c = be(c.map, b.ch, e);
    c.offset = "right" == c.collapse ? c.end : c.start;
    return c;
  }
  function Ta(a, b) {
    b && (a.bad = !0);
    return a;
  }
  function Tb(a, b, c) {
    var d;
    if (b == a.display.lineDiv) {
      d = a.display.lineDiv.childNodes[c];
      if (!d) {
        return Ta(a.clipPos(q(a.display.viewTo - 1)), !0);
      }
      b = null;
      c = 0;
    } else {
      for (d = b;;d = d.parentNode) {
        if (!d || d == a.display.lineDiv) {
          return null;
        }
        if (d.parentNode && d.parentNode == a.display.lineDiv) {
          break;
        }
      }
    }
    for (var e = 0;e < a.display.view.length;e++) {
      var f = a.display.view[e];
      if (f.node == d) {
        return Df(f, b, c);
      }
    }
  }
  function Df(a, b, c) {
    function d(b, c, d) {
      for (var e = -1;e < (l ? l.length : 0);e++) {
        for (var f = 0 > e ? k.map : l[e], g = 0;g < f.length;g += 3) {
          var h = f[g + 2];
          if (h == b || h == c) {
            c = F(0 > e ? a.line : a.rest[e]);
            e = f[g] + d;
            if (0 > d || h != b) {
              e = f[g + (d ? 1 : 0)];
            }
            return q(c, e);
          }
        }
      }
    }
    var e = a.text.firstChild, f = !1;
    if (!b || !Wc(e, b)) {
      return Ta(q(F(a.line), 0), !0);
    }
    if (b == e && (f = !0, b = e.childNodes[c], c = 0, !b)) {
      return c = a.rest ? A(a.rest) : a.line, Ta(q(F(c), c.text.length), f);
    }
    var g = 3 == b.nodeType ? b : null, h = b;
    g || 1 != b.childNodes.length || 3 != b.firstChild.nodeType || (g = b.firstChild, c && (c = g.nodeValue.length));
    for (;h.parentNode != e;) {
      h = h.parentNode;
    }
    var k = a.measure, l = k.maps;
    if (b = d(g, h, c)) {
      return Ta(b, f);
    }
    e = h.nextSibling;
    for (g = g ? g.nodeValue.length - c : 0;e;e = e.nextSibling) {
      if (b = d(e, e.firstChild, 0)) {
        return Ta(q(b.line, b.ch - g), f);
      }
      g += e.textContent.length;
    }
    h = h.previousSibling;
    for (g = c;h;h = h.previousSibling) {
      if (b = d(h, h.firstChild, -1)) {
        return Ta(q(b.line, b.ch + g), f);
      }
      g += e.textContent.length;
    }
  }
  function Ef(a, b, c, d, e) {
    function f(a) {
      return function(b) {
        return b.id == a;
      };
    }
    function g(b) {
      if (1 == b.nodeType) {
        var c = b.getAttribute("cm-text");
        if (null != c) {
          "" == c && (c = b.textContent.replace(/\u200b/g, "")), h += c;
        } else {
          var c = b.getAttribute("cm-marker"), p;
          if (c) {
            b = a.findMarks(q(d, 0), q(e + 1, 0), f(+c)), b.length && (p = b[0].find()) && (h += Ca(a.doc, p.from, p.to).join(l));
          } else {
            if ("false" != b.getAttribute("contenteditable")) {
              for (p = 0;p < b.childNodes.length;p++) {
                g(b.childNodes[p]);
              }
              /^(pre|div|p)$/i.test(b.nodeName) && (k = !0);
            }
          }
        }
      } else {
        3 == b.nodeType && (b = b.nodeValue) && (k && (h += l, k = !1), h += b);
      }
    }
    for (var h = "", k = !1, l = a.doc.lineSeparator();;) {
      g(b);
      if (b == c) {
        break;
      }
      b = b.nextSibling;
    }
    return h;
  }
  function la(a, b) {
    this.ranges = a;
    this.primIndex = b;
  }
  function z(a, b) {
    this.anchor = a;
    this.head = b;
  }
  function aa(a, b) {
    var c = a[b];
    a.sort(function(a, b) {
      return y(a.from(), b.from());
    });
    b = D(a, c);
    for (c = 1;c < a.length;c++) {
      var d = a[c], e = a[c - 1];
      if (0 <= y(e.to(), d.from())) {
        var f = Pb(e.from(), d.from()), g = Ob(e.to(), d.to()), d = e.empty() ? d.from() == d.head : e.from() == e.head;
        c <= b && --b;
        a.splice(--c, 2, new z(d ? g : f, d ? f : g));
      }
    }
    return new la(a, b);
  }
  function ha(a, b) {
    return new la([new z(a, b || a)], 0);
  }
  function x(a, b) {
    if (b.line < a.first) {
      return q(a.first, 0);
    }
    var c = a.first + a.size - 1;
    if (b.line > c) {
      return q(c, t(a, c).text.length);
    }
    var c = t(a, b.line).text.length, d = b.ch, c = null == d || d > c ? q(b.line, c) : 0 > d ? q(b.line, 0) : b;
    return c;
  }
  function rb(a, b) {
    return b >= a.first && b < a.first + a.size;
  }
  function ce(a, b) {
    for (var c = [], d = 0;d < b.length;d++) {
      c[d] = x(a, b[d]);
    }
    return c;
  }
  function sb(a, b, c, d) {
    return a.cm && a.cm.display.shift || a.extend ? (a = b.anchor, d && (b = 0 > y(c, a), b != 0 > y(d, a) ? (a = c, c = d) : b != 0 > y(c, d) && (c = d)), new z(a, c)) : new z(d || c, c);
  }
  function Ub(a, b, c, d) {
    H(a, new la([sb(a, a.sel.primary(), b, c)], 0), d);
  }
  function de(a, b, c) {
    for (var d = [], e = 0;e < a.sel.ranges.length;e++) {
      d[e] = sb(a, a.sel.ranges[e], b[e], null);
    }
    b = aa(d, a.sel.primIndex);
    H(a, b, c);
  }
  function Xc(a, b, c, d) {
    var e = a.sel.ranges.slice(0);
    e[b] = c;
    H(a, aa(e, a.sel.primIndex), d);
  }
  function Ff(a, b, c) {
    c = {ranges:b.ranges, update:function(b) {
      this.ranges = [];
      for (var c = 0;c < b.length;c++) {
        this.ranges[c] = new z(x(a, b[c].anchor), x(a, b[c].head));
      }
    }, origin:c && c.origin};
    J(a, "beforeSelectionChange", a, c);
    a.cm && J(a.cm, "beforeSelectionChange", a.cm, c);
    return c.ranges != b.ranges ? aa(c.ranges, c.ranges.length - 1) : b;
  }
  function ee(a, b, c) {
    var d = a.history.done, e = A(d);
    e && e.ranges ? (d[d.length - 1] = b, Vb(a, b, c)) : H(a, b, c);
  }
  function H(a, b, c) {
    Vb(a, b, c);
    b = a.sel;
    var d = a.cm ? a.cm.curOp.id : NaN, e = a.history, f = c && c.origin, g;
    if (!(g = d == e.lastSelOp) && (g = f && e.lastSelOrigin == f) && !(g = e.lastModTime == e.lastSelTime && e.lastOrigin == f)) {
      g = A(e.done);
      var h = f.charAt(0);
      g = "*" == h || "+" == h && g.ranges.length == b.ranges.length && g.somethingSelected() == b.somethingSelected() && new Date - a.history.lastSelTime <= (a.cm ? a.cm.options.historyEventDelay : 500);
    }
    g ? e.done[e.done.length - 1] = b : Wb(b, e.done);
    e.lastSelTime = +new Date;
    e.lastSelOrigin = f;
    e.lastSelOp = d;
    c && !1 !== c.clearRedo && fe(e.undone);
  }
  function Vb(a, b, c) {
    if (W(a, "beforeSelectionChange") || a.cm && W(a.cm, "beforeSelectionChange")) {
      b = Ff(a, b, c);
    }
    var d = c && c.bias || (0 > y(b.primary().head, a.sel.primary().head) ? -1 : 1);
    ge(a, he(a, b, d, !0));
    c && !1 === c.scroll || !a.cm || Ra(a.cm);
  }
  function ge(a, b) {
    b.equals(a.sel) || (a.sel = b, a.cm && (a.cm.curOp.updateInput = a.cm.curOp.selectionChanged = !0, ie(a.cm)), Q(a, "cursorActivity", a));
  }
  function je(a) {
    ge(a, he(a, a.sel, null, !1), ia);
  }
  function he(a, b, c, d) {
    for (var e, f = 0;f < b.ranges.length;f++) {
      var g = b.ranges[f], h = b.ranges.length == a.sel.ranges.length && a.sel.ranges[f], k = Yc(a, g.anchor, h && h.anchor, c, d), h = Yc(a, g.head, h && h.head, c, d);
      if (e || k != g.anchor || h != g.head) {
        e || (e = b.ranges.slice(0, f)), e[f] = new z(k, h);
      }
    }
    return e ? aa(e, b.primIndex) : b;
  }
  function Ua(a, b, c, d, e) {
    var f = t(a, b.line);
    if (f.markedSpans) {
      for (var g = 0;g < f.markedSpans.length;++g) {
        var h = f.markedSpans[g], k = h.marker;
        if ((null == h.from || (k.inclusiveLeft ? h.from <= b.ch : h.from < b.ch)) && (null == h.to || (k.inclusiveRight ? h.to >= b.ch : h.to > b.ch))) {
          if (e && (J(k, "beforeCursorEnter"), k.explicitlyCleared)) {
            if (f.markedSpans) {
              --g;
              continue;
            } else {
              break;
            }
          }
          if (k.atomic) {
            if (c) {
              var g = k.find(0 > d ? 1 : -1), l;
              if (0 > d ? k.inclusiveRight : k.inclusiveLeft) {
                g = ke(a, g, -d, f);
              }
              if (g && g.line == b.line && (l = y(g, c)) && (0 > d ? 0 > l : 0 < l)) {
                return Ua(a, g, b, d, e);
              }
            }
            c = k.find(0 > d ? -1 : 1);
            if (0 > d ? k.inclusiveLeft : k.inclusiveRight) {
              c = ke(a, c, d, f);
            }
            return c ? Ua(a, c, b, d, e) : null;
          }
        }
      }
    }
    return b;
  }
  function Yc(a, b, c, d, e) {
    d = d || 1;
    b = Ua(a, b, c, d, e) || !e && Ua(a, b, c, d, !0) || Ua(a, b, c, -d, e) || !e && Ua(a, b, c, -d, !0);
    return b ? b : (a.cantEdit = !0, q(a.first, 0));
  }
  function ke(a, b, c, d) {
    return 0 > c && 0 == b.ch ? b.line > a.first ? x(a, q(b.line - 1)) : null : 0 < c && b.ch == (d || t(a, b.line)).text.length ? b.line < a.first + a.size - 1 ? q(b.line + 1, 0) : null : new q(b.line, b.ch + c);
  }
  function ob(a) {
    a.display.input.showSelection(a.display.input.prepareSelection());
  }
  function le(a, b) {
    for (var c = a.doc, d = {}, e = d.cursors = document.createDocumentFragment(), f = d.selection = document.createDocumentFragment(), g = 0;g < c.sel.ranges.length;g++) {
      if (!1 !== b || g != c.sel.primIndex) {
        var h = c.sel.ranges[g], k = h.empty();
        (k || a.options.showCursorWhenSelecting) && me(a, h.head, e);
        k || Gf(a, h, f);
      }
    }
    return d;
  }
  function me(a, b, c) {
    b = ma(a, b, "div", null, null, !a.options.singleCursorHeightPerLine);
    var d = c.appendChild(r("div", "\u00a0", "CodeMirror-cursor"));
    d.style.left = b.left + "px";
    d.style.top = b.top + "px";
    d.style.height = Math.max(0, b.bottom - b.top) * a.options.cursorHeight + "px";
    b.other && (a = c.appendChild(r("div", "\u00a0", "CodeMirror-cursor CodeMirror-secondarycursor")), a.style.display = "", a.style.left = b.other.left + "px", a.style.top = b.other.top + "px", a.style.height = .85 * (b.other.bottom - b.other.top) + "px");
  }
  function Gf(a, b, c) {
    function d(a, b, c, d) {
      0 > b && (b = 0);
      b = Math.round(b);
      d = Math.round(d);
      h.appendChild(r("div", null, "CodeMirror-selected", "position: absolute; left: " + a + "px; top: " + b + "px; width: " + (null == c ? m - a : c) + "px; height: " + (d - b) + "px"));
    }
    function e(b, c, e) {
      var f = t(g, b), h = f.text.length, k, u;
      Hf(Z(f), c || 0, null == e ? h : e, function(g, n, r) {
        var t = Xb(a, q(b, g), "div", f, "left"), v, w;
        g == n ? (v = t, r = w = t.left) : (v = Xb(a, q(b, n - 1), "div", f, "right"), "rtl" == r && (r = t, t = v, v = r), r = t.left, w = v.right);
        null == c && 0 == g && (r = l);
        3 < v.top - t.top && (d(r, t.top, null, t.bottom), r = l, t.bottom < v.top && d(r, t.bottom, null, v.top));
        null == e && n == h && (w = m);
        if (!k || t.top < k.top || t.top == k.top && t.left < k.left) {
          k = t;
        }
        if (!u || v.bottom > u.bottom || v.bottom == u.bottom && v.right > u.right) {
          u = v;
        }
        r < l + 1 && (r = l);
        d(r, v.top, w - r, v.bottom);
      });
      return {start:k, end:u};
    }
    var f = a.display, g = a.doc, h = document.createDocumentFragment(), k = ne(a.display), l = k.left, m = Math.max(f.sizerWidth, qa(a) - f.sizer.offsetLeft) - k.right, f = b.from();
    b = b.to();
    if (f.line == b.line) {
      e(f.line, f.ch, b.ch);
    } else {
      var u = t(g, f.line), k = t(g, b.line), k = ja(u) == ja(k), f = e(f.line, f.ch, k ? u.text.length + 1 : null).end;
      b = e(b.line, k ? 0 : null, b.ch).start;
      k && (f.top < b.top - 2 ? (d(f.right, f.top, null, f.bottom), d(l, b.top, b.left, b.bottom)) : d(f.right, f.top, b.left - f.right, f.bottom));
      f.bottom < b.top && d(l, f.bottom, null, b.top);
    }
    c.appendChild(h);
  }
  function Zc(a) {
    if (a.state.focused) {
      var b = a.display;
      clearInterval(b.blinker);
      var c = !0;
      b.cursorDiv.style.visibility = "";
      0 < a.options.cursorBlinkRate ? b.blinker = setInterval(function() {
        b.cursorDiv.style.visibility = (c = !c) ? "" : "hidden";
      }, a.options.cursorBlinkRate) : 0 > a.options.cursorBlinkRate && (b.cursorDiv.style.visibility = "hidden");
    }
  }
  function gb(a, b) {
    a.doc.mode.startState && a.doc.frontier < a.display.viewTo && a.state.highlight.set(b, db(If, a));
  }
  function If(a) {
    var b = a.doc;
    b.frontier < b.first && (b.frontier = b.first);
    if (!(b.frontier >= a.display.viewTo)) {
      var c = +new Date + a.options.workTime, d = ta(b.mode, tb(a, b.frontier)), e = [];
      b.iter(b.frontier, Math.min(b.first + b.size, a.display.viewTo + 500), function(f) {
        if (b.frontier >= a.display.viewFrom) {
          var g = f.styles, h = f.text.length > a.options.maxHighlightLength, k = oe(a, f, h ? ta(b.mode, d) : d, !0);
          f.styles = k.styles;
          var l = f.styleClasses;
          (k = k.classes) ? f.styleClasses = k : l && (f.styleClasses = null);
          l = !g || g.length != f.styles.length || l != k && (!l || !k || l.bgClass != k.bgClass || l.textClass != k.textClass);
          for (k = 0;!l && k < g.length;++k) {
            l = g[k] != f.styles[k];
          }
          l && e.push(b.frontier);
          f.stateAfter = h ? d : ta(b.mode, d);
        } else {
          f.text.length <= a.options.maxHighlightLength && $c(a, f.text, d), f.stateAfter = 0 == b.frontier % 5 ? ta(b.mode, d) : null;
        }
        ++b.frontier;
        if (+new Date > c) {
          return gb(a, a.options.workDelay), !0;
        }
      });
      e.length && R(a, function() {
        for (var b = 0;b < e.length;b++) {
          na(a, e[b], "text");
        }
      });
    }
  }
  function Jf(a, b, c) {
    for (var d, e, f = a.doc, g = c ? -1 : b - (a.doc.mode.innerMode ? 1E3 : 100);b > g;--b) {
      if (b <= f.first) {
        return f.first;
      }
      var h = t(f, b - 1);
      if (h.stateAfter && (!c || b <= f.frontier)) {
        return b;
      }
      h = ba(h.text, null, a.options.tabSize);
      if (null == e || d > h) {
        e = b - 1, d = h;
      }
    }
    return e;
  }
  function tb(a, b, c) {
    var d = a.doc, e = a.display;
    if (!d.mode.startState) {
      return !0;
    }
    var f = Jf(a, b, c), g = f > d.first && t(d, f - 1).stateAfter, g = g ? ta(d.mode, g) : Kf(d.mode);
    d.iter(f, b, function(c) {
      $c(a, c.text, g);
      c.stateAfter = f == b - 1 || 0 == f % 5 || f >= e.viewFrom && f < e.viewTo ? ta(d.mode, g) : null;
      ++f;
    });
    c && (d.frontier = f);
    return g;
  }
  function Fc(a) {
    return a.mover.offsetHeight - a.lineSpace.offsetHeight;
  }
  function ne(a) {
    if (a.cachedPaddingH) {
      return a.cachedPaddingH;
    }
    var b = S(a.measure, r("pre", "x")), b = window.getComputedStyle ? window.getComputedStyle(b) : b.currentStyle, b = {left:parseInt(b.paddingLeft), right:parseInt(b.paddingRight)};
    isNaN(b.left) || isNaN(b.right) || (a.cachedPaddingH = b);
    return b;
  }
  function ea(a) {
    return Hd - a.display.nativeBarWidth;
  }
  function qa(a) {
    return a.display.scroller.clientWidth - ea(a) - a.display.barWidth;
  }
  function Oc(a) {
    return a.display.scroller.clientHeight - ea(a) - a.display.barHeight;
  }
  function ae(a, b, c) {
    if (a.line == b) {
      return {map:a.measure.map, cache:a.measure.cache};
    }
    for (var d = 0;d < a.rest.length;d++) {
      if (a.rest[d] == b) {
        return {map:a.measure.maps[d], cache:a.measure.caches[d]};
      }
    }
    for (d = 0;d < a.rest.length;d++) {
      if (F(a.rest[d]) > c) {
        return {map:a.measure.maps[d], cache:a.measure.caches[d], before:!0};
      }
    }
  }
  function Vc(a, b) {
    if (b >= a.display.viewFrom && b < a.display.viewTo) {
      return a.display.view[Ba(a, b)];
    }
    var c = a.display.externalMeasured;
    if (c && b >= c.lineN && b < c.lineN + c.size) {
      return c;
    }
  }
  function Yb(a, b) {
    var c = F(b), d = Vc(a, c);
    d && !d.text ? d = null : d && d.changes && (Od(a, d, c, Lc(a)), a.curOp.forceUpdate = !0);
    if (!d) {
      var e;
      e = ja(b);
      d = F(e);
      e = a.display.externalMeasured = new pe(a.doc, e, d);
      e.lineN = d;
      d = e.built = Sd(a, e);
      e.text = d.pre;
      S(a.display.lineMeasure, d.pre);
      d = e;
    }
    c = ae(d, b, c);
    return {line:b, view:d, rect:null, map:c.map, cache:c.cache, before:c.before, hasHeights:!1};
  }
  function ad(a, b, c, d, e) {
    b.before && (c = -1);
    var f = c + (d || "");
    if (b.cache.hasOwnProperty(f)) {
      a = b.cache[f];
    } else {
      b.rect || (b.rect = b.view.text.getBoundingClientRect());
      if (!b.hasHeights) {
        var g = b.view, h = b.rect, k = a.options.lineWrapping, l = k && qa(a);
        if (!g.measure.heights || k && g.measure.width != l) {
          var m = g.measure.heights = [];
          if (k) {
            for (g.measure.width = l, g = g.text.firstChild.getClientRects(), k = 0;k < g.length - 1;k++) {
              var l = g[k], u = g[k + 1];
              2 < Math.abs(l.bottom - u.bottom) && m.push((l.bottom + u.top) / 2 - h.top);
            }
          }
          m.push(h.bottom - h.top);
        }
        b.hasHeights = !0;
      }
      g = d;
      k = be(b.map, c, g);
      d = k.node;
      h = k.start;
      l = k.end;
      c = k.collapse;
      var p;
      if (3 == d.nodeType) {
        for (m = 0;4 > m;m++) {
          for (;h && ub(b.line.text.charAt(k.coverStart + h));) {
            --h;
          }
          for (;k.coverStart + l < k.coverEnd && ub(b.line.text.charAt(k.coverStart + l));) {
            ++l;
          }
          if (B && 9 > C && 0 == h && l == k.coverEnd - k.coverStart) {
            p = d.parentNode.getBoundingClientRect();
          } else {
            if (B && a.options.lineWrapping) {
              var n = Da(d, h, l).getClientRects();
              p = n.length ? n["right" == g ? n.length - 1 : 0] : bd;
            } else {
              p = Da(d, h, l).getBoundingClientRect() || bd;
            }
          }
          if (p.left || p.right || 0 == h) {
            break;
          }
          l = h;
          --h;
          c = "right";
        }
        B && 11 > C && ((n = !window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI) || (null != cd ? n = cd : (m = S(a.display.measure, r("span", "x")), n = m.getBoundingClientRect(), m = Da(m, 0, 1).getBoundingClientRect(), n = cd = 1 < Math.abs(n.left - m.left)), n = !n), n || (n = screen.logicalXDPI / screen.deviceXDPI, m = screen.logicalYDPI / screen.deviceYDPI, p = {left:p.left * n, right:p.right * n, top:p.top * m, bottom:p.bottom * m}));
      } else {
        0 < h && (c = g = "right"), p = a.options.lineWrapping && 1 < (n = d.getClientRects()).length ? n["right" == g ? n.length - 1 : 0] : d.getBoundingClientRect();
      }
      !(B && 9 > C) || h || p && (p.left || p.right) || (p = (p = d.parentNode.getClientRects()[0]) ? {left:p.left, right:p.left + hb(a.display), top:p.top, bottom:p.bottom} : bd);
      n = p.top - b.rect.top;
      d = p.bottom - b.rect.top;
      h = (n + d) / 2;
      g = b.view.measure.heights;
      for (m = 0;m < g.length - 1 && !(h < g[m]);m++) {
      }
      c = {left:("right" == c ? p.right : p.left) - b.rect.left, right:("left" == c ? p.left : p.right) - b.rect.left, top:m ? g[m - 1] : 0, bottom:g[m]};
      p.left || p.right || (c.bogus = !0);
      a.options.singleCursorHeightPerLine || (c.rtop = n, c.rbottom = d);
      a = c;
      a.bogus || (b.cache[f] = a);
    }
    return {left:a.left, right:a.right, top:e ? a.rtop : a.top, bottom:e ? a.rbottom : a.bottom};
  }
  function be(a, b, c) {
    for (var d, e, f, g, h = 0;h < a.length;h += 3) {
      var k = a[h], l = a[h + 1];
      if (b < k) {
        e = 0, f = 1, g = "left";
      } else {
        if (b < l) {
          e = b - k, f = e + 1;
        } else {
          if (h == a.length - 3 || b == l && a[h + 3] > b) {
            f = l - k, e = f - 1, b >= l && (g = "right");
          }
        }
      }
      if (null != e) {
        d = a[h + 2];
        k == l && c == (d.insertLeft ? "left" : "right") && (g = c);
        if ("left" == c && 0 == e) {
          for (;h && a[h - 2] == a[h - 3] && a[h - 1].insertLeft;) {
            d = a[(h -= 3) + 2], g = "left";
          }
        }
        if ("right" == c && e == l - k) {
          for (;h < a.length - 3 && a[h + 3] == a[h + 4] && !a[h + 5].insertLeft;) {
            d = a[(h += 3) + 2], g = "right";
          }
        }
        break;
      }
    }
    return {node:d, start:e, end:f, collapse:g, coverStart:k, coverEnd:l};
  }
  function qe(a) {
    if (a.measure && (a.measure.cache = {}, a.measure.heights = null, a.rest)) {
      for (var b = 0;b < a.rest.length;b++) {
        a.measure.caches[b] = {};
      }
    }
  }
  function re(a) {
    a.display.externalMeasure = null;
    ya(a.display.lineMeasure);
    for (var b = 0;b < a.display.view.length;b++) {
      qe(a.display.view[b]);
    }
  }
  function ib(a) {
    re(a);
    a.display.cachedCharWidth = a.display.cachedTextHeight = a.display.cachedPaddingH = null;
    a.options.lineWrapping || (a.display.maxLineChanged = !0);
    a.display.lineNumChars = null;
  }
  function dd(a, b, c, d) {
    if (b.widgets) {
      for (var e = 0;e < b.widgets.length;++e) {
        if (b.widgets[e].above) {
          var f = vb(b.widgets[e]);
          c.top += f;
          c.bottom += f;
        }
      }
    }
    if ("line" == d) {
      return c;
    }
    d || (d = "local");
    b = fa(b);
    b = "local" == d ? b + a.display.lineSpace.offsetTop : b - a.display.viewOffset;
    if ("page" == d || "window" == d) {
      a = a.display.lineSpace.getBoundingClientRect(), b += a.top + ("window" == d ? 0 : window.pageYOffset || (document.documentElement || document.body).scrollTop), d = a.left + ("window" == d ? 0 : window.pageXOffset || (document.documentElement || document.body).scrollLeft), c.left += d, c.right += d;
    }
    c.top += b;
    c.bottom += b;
    return c;
  }
  function se(a, b, c) {
    if ("div" == c) {
      return b;
    }
    var d = b.left;
    b = b.top;
    "page" == c ? (d -= window.pageXOffset || (document.documentElement || document.body).scrollLeft, b -= window.pageYOffset || (document.documentElement || document.body).scrollTop) : "local" != c && c || (c = a.display.sizer.getBoundingClientRect(), d += c.left, b += c.top);
    a = a.display.lineSpace.getBoundingClientRect();
    return {left:d - a.left, top:b - a.top};
  }
  function Xb(a, b, c, d, e) {
    d || (d = t(a.doc, b.line));
    var f = d;
    b = b.ch;
    d = ad(a, Yb(a, d), b, e);
    return dd(a, f, d, c);
  }
  function ma(a, b, c, d, e, f) {
    function g(b, g) {
      var h = ad(a, e, b, g ? "right" : "left", f);
      g ? h.left = h.right : h.right = h.left;
      return dd(a, d, h, c);
    }
    function h(a, b) {
      var c = k[b], d = c.level % 2;
      a == ed(c) && b && c.level < k[b - 1].level ? (c = k[--b], a = fd(c) - (c.level % 2 ? 0 : 1), d = !0) : a == fd(c) && b < k.length - 1 && c.level < k[b + 1].level && (c = k[++b], a = ed(c) - c.level % 2, d = !1);
      return d && a == c.to && a > c.from ? g(a - 1) : g(a, d);
    }
    d = d || t(a.doc, b.line);
    e || (e = Yb(a, d));
    var k = Z(d);
    b = b.ch;
    if (!k) {
      return g(b);
    }
    var l = Sb(k, b), l = h(b, l);
    null != wb && (l.other = h(b, wb));
    return l;
  }
  function te(a, b) {
    var c = 0;
    b = x(a.doc, b);
    a.options.lineWrapping || (c = hb(a.display) * b.ch);
    var d = t(a.doc, b.line), e = fa(d) + a.display.lineSpace.offsetTop;
    return {left:c, right:c, top:e, bottom:e + d.height};
  }
  function Zb(a, b, c, d) {
    a = q(a, b);
    a.xRel = d;
    c && (a.outside = !0);
    return a;
  }
  function gd(a, b, c) {
    var d = a.doc;
    c += a.display.viewOffset;
    if (0 > c) {
      return Zb(d.first, 0, !0, -1);
    }
    var e = Aa(d, c), f = d.first + d.size - 1;
    if (e > f) {
      return Zb(d.first + d.size - 1, t(d, f).text.length, !0, 1);
    }
    0 > b && (b = 0);
    for (d = t(d, e);;) {
      if (e = Lf(a, d, e, b, c), f = (d = za(d, !1)) && d.find(0, !0), d && (e.ch > f.from.ch || e.ch == f.from.ch && 0 < e.xRel)) {
        e = F(d = f.to.line);
      } else {
        return e;
      }
    }
  }
  function Lf(a, b, c, d, e) {
    function f(d) {
      d = ma(a, q(c, d), "line", b, l);
      h = !0;
      if (g > d.bottom) {
        return d.left - k;
      }
      if (g < d.top) {
        return d.left + k;
      }
      h = !1;
      return d.left;
    }
    var g = e - fa(b), h = !1, k = 2 * a.display.wrapper.clientWidth, l = Yb(a, b), m = Z(b), u = b.text.length;
    e = $b(b);
    var p = ac(b), n = f(e), r = h, t = f(p), v = h;
    if (d > t) {
      return Zb(c, p, v, 1);
    }
    for (;;) {
      if (m ? p == e || p == hd(b, e, 1) : 1 >= p - e) {
        m = d < n || d - n <= t - d ? e : p;
        for (d -= m == e ? n : t;ub(b.text.charAt(m));) {
          ++m;
        }
        return Zb(c, m, m == e ? r : v, -1 > d ? -1 : 1 < d ? 1 : 0);
      }
      var w = Math.ceil(u / 2), x = e + w;
      if (m) {
        for (var x = e, y = 0;y < w;++y) {
          x = hd(b, x, 1);
        }
      }
      y = f(x);
      if (y > d) {
        p = x;
        t = y;
        if (v = h) {
          t += 1E3;
        }
        u = w;
      } else {
        e = x, n = y, r = h, u -= w;
      }
    }
  }
  function wa(a) {
    if (null != a.cachedTextHeight) {
      return a.cachedTextHeight;
    }
    if (null == Ea) {
      Ea = r("pre");
      for (var b = 0;49 > b;++b) {
        Ea.appendChild(document.createTextNode("x")), Ea.appendChild(r("br"));
      }
      Ea.appendChild(document.createTextNode("x"));
    }
    S(a.measure, Ea);
    b = Ea.offsetHeight / 50;
    3 < b && (a.cachedTextHeight = b);
    ya(a.measure);
    return b || 1;
  }
  function hb(a) {
    if (null != a.cachedCharWidth) {
      return a.cachedCharWidth;
    }
    var b = r("span", "xxxxxxxxxx"), c = r("pre", [b]);
    S(a.measure, c);
    b = b.getBoundingClientRect();
    b = (b.right - b.left) / 10;
    2 < b && (a.cachedCharWidth = b);
    return b || 10;
  }
  function La(a) {
    a.curOp = {cm:a, viewChanged:!1, startHeight:a.doc.height, forceUpdate:!1, updateInput:null, typing:!1, changeObjs:null, cursorActivityHandlers:null, cursorActivityCalled:0, selectionChanged:!1, updateMaxLine:!1, scrollLeft:null, scrollTop:null, scrollToPos:null, focus:!1, id:++Mf};
    Va ? Va.ops.push(a.curOp) : a.curOp.ownsGroup = Va = {ops:[a.curOp], delayedCallbacks:[]};
  }
  function Na(a) {
    if (a = a.curOp.ownsGroup) {
      try {
        var b = a.delayedCallbacks, c = 0;
        do {
          for (;c < b.length;c++) {
            b[c].call(null);
          }
          for (var d = 0;d < a.ops.length;d++) {
            var e = a.ops[d];
            if (e.cursorActivityHandlers) {
              for (;e.cursorActivityCalled < e.cursorActivityHandlers.length;) {
                e.cursorActivityHandlers[e.cursorActivityCalled++].call(null, e.cm);
              }
            }
          }
        } while (c < b.length);
      } finally {
        Va = null;
        for (b = 0;b < a.ops.length;b++) {
          a.ops[b].cm.curOp = null;
        }
        a = a.ops;
        for (b = 0;b < a.length;b++) {
          var e = a[b], c = e.cm, f = d = c.display;
          !f.scrollbarsClipped && f.scroller.offsetWidth && (f.nativeBarWidth = f.scroller.offsetWidth - f.scroller.clientWidth, f.heightForcer.style.height = ea(c) + "px", f.sizer.style.marginBottom = -f.nativeBarWidth + "px", f.sizer.style.borderRightWidth = ea(c) + "px", f.scrollbarsClipped = !0);
          e.updateMaxLine && Ec(c);
          e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < d.viewFrom || e.scrollToPos.to.line >= d.viewTo) || d.maxLineChanged && c.options.lineWrapping;
          e.update = e.mustUpdate && new Mb(c, e.mustUpdate && {top:e.scrollTop, ensure:e.scrollToPos}, e.forceUpdate);
        }
        for (b = 0;b < a.length;b++) {
          e = a[b], e.updatedDisplay = e.mustUpdate && Mc(e.cm, e.update);
        }
        for (b = 0;b < a.length;b++) {
          if (e = a[b], c = e.cm, d = c.display, e.updatedDisplay && Lb(c), e.barMeasure = kb(c), d.maxLineChanged && !c.options.lineWrapping && (f = void 0, f = d.maxLine.text.length, f = ad(c, Yb(c, d.maxLine), f, void 0), e.adjustWidthTo = f.left + 3, c.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(d.scroller.clientWidth, d.sizer.offsetLeft + e.adjustWidthTo + ea(c) + c.display.barWidth), e.maxScrollLeft = Math.max(0, d.sizer.offsetLeft + e.adjustWidthTo - qa(c))), 
          e.updatedDisplay || e.selectionChanged) {
            e.preparedSelection = d.input.prepareSelection();
          }
        }
        for (b = 0;b < a.length;b++) {
          e = a[b], c = e.cm, null != e.adjustWidthTo && (c.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < c.doc.scrollLeft && Oa(c, Math.min(c.display.scroller.scrollLeft, e.maxScrollLeft), !0), c.display.maxLineChanged = !1), e.preparedSelection && c.display.input.showSelection(e.preparedSelection), e.updatedDisplay && Pc(c, e.barMeasure), (e.updatedDisplay || e.startHeight != c.doc.height) && Pa(c, e.barMeasure), e.selectionChanged && Zc(c), c.state.focused && e.updateInput && 
          c.display.input.reset(e.typing), !e.focus || e.focus != ga() || document.hasFocus && !document.hasFocus() || Ud(e.cm);
        }
        for (b = 0;b < a.length;b++) {
          e = a[b];
          c = e.cm;
          d = c.display;
          f = c.doc;
          e.updatedDisplay && Md(c, e.update);
          null == d.wheelStartX || null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos || (d.wheelStartX = d.wheelStartY = null);
          null == e.scrollTop || d.scroller.scrollTop == e.scrollTop && !e.forceScroll || (f.scrollTop = Math.max(0, Math.min(d.scroller.scrollHeight - d.scroller.clientHeight, e.scrollTop)), d.scrollbars.setScrollTop(f.scrollTop), d.scroller.scrollTop = f.scrollTop);
          null == e.scrollLeft || d.scroller.scrollLeft == e.scrollLeft && !e.forceScroll || (f.scrollLeft = Math.max(0, Math.min(d.scroller.scrollWidth - qa(c), e.scrollLeft)), d.scrollbars.setScrollLeft(f.scrollLeft), d.scroller.scrollLeft = f.scrollLeft, Cc(c));
          if (e.scrollToPos) {
            var g = void 0, h = x(f, e.scrollToPos.from), g = x(f, e.scrollToPos.to), k = e.scrollToPos.margin;
            null == k && (k = 0);
            for (var l = 0;5 > l;l++) {
              var m = !1, u = ma(c, h), p = g && g != h ? ma(c, g) : u, p = bc(c, Math.min(u.left, p.left), Math.min(u.top, p.top) - k, Math.max(u.left, p.left), Math.max(u.bottom, p.bottom) + k), n = c.doc.scrollTop, q = c.doc.scrollLeft;
              null != p.scrollTop && (mb(c, p.scrollTop), 1 < Math.abs(c.doc.scrollTop - n) && (m = !0));
              null != p.scrollLeft && (Oa(c, p.scrollLeft), 1 < Math.abs(c.doc.scrollLeft - q) && (m = !0));
              if (!m) {
                break;
              }
            }
            g = u;
            e.scrollToPos.isCursor && c.state.focused && (O(c, "scrollCursorIntoView") || (k = c.display, l = k.sizer.getBoundingClientRect(), h = null, 0 > g.top + l.top ? h = !0 : g.bottom + l.top > (window.innerHeight || document.documentElement.clientHeight) && (h = !1), null == h || Nf || (g = r("div", "\u200b", null, "position: absolute; top: " + (g.top - k.viewOffset - c.display.lineSpace.offsetTop) + "px; height: " + (g.bottom - g.top + ea(c) + k.barHeight) + "px; left: " + g.left + "px; width: 2px;"), 
            c.display.lineSpace.appendChild(g), g.scrollIntoView(h), c.display.lineSpace.removeChild(g))));
          }
          h = e.maybeHiddenMarkers;
          g = e.maybeUnhiddenMarkers;
          if (h) {
            for (k = 0;k < h.length;++k) {
              h[k].lines.length || J(h[k], "hide");
            }
          }
          if (g) {
            for (k = 0;k < g.length;++k) {
              g[k].lines.length && J(g[k], "unhide");
            }
          }
          d.wrapper.offsetHeight && (f.scrollTop = c.display.scroller.scrollTop);
          e.changeObjs && J(c, "changes", c, e.changeObjs);
          e.update && e.update.finish();
        }
      }
    }
  }
  function R(a, b) {
    if (a.curOp) {
      return b();
    }
    La(a);
    try {
      return b();
    } finally {
      Na(a);
    }
  }
  function G(a, b) {
    return function() {
      if (a.curOp) {
        return b.apply(a, arguments);
      }
      La(a);
      try {
        return b.apply(a, arguments);
      } finally {
        Na(a);
      }
    };
  }
  function E(a) {
    return function() {
      if (this.curOp) {
        return a.apply(this, arguments);
      }
      La(this);
      try {
        return a.apply(this, arguments);
      } finally {
        Na(this);
      }
    };
  }
  function L(a) {
    return function() {
      var b = this.cm;
      if (!b || b.curOp) {
        return a.apply(this, arguments);
      }
      La(b);
      try {
        return a.apply(this, arguments);
      } finally {
        Na(b);
      }
    };
  }
  function pe(a, b, c) {
    for (var d = this.line = b, e;d = za(d, !1);) {
      d = d.find(1, !0).line, (e || (e = [])).push(d);
    }
    this.size = (this.rest = e) ? F(A(this.rest)) - c + 1 : 1;
    this.node = this.text = null;
    this.hidden = xa(a, b);
  }
  function Nb(a, b, c) {
    var d = [], e;
    for (e = b;e < c;) {
      b = new pe(a.doc, t(a.doc, e), e), e += b.size, d.push(b);
    }
    return d;
  }
  function N(a, b, c, d) {
    null == b && (b = a.doc.first);
    null == c && (c = a.doc.first + a.doc.size);
    d || (d = 0);
    var e = a.display;
    d && c < e.viewTo && (null == e.updateLineNumbers || e.updateLineNumbers > b) && (e.updateLineNumbers = b);
    a.curOp.viewChanged = !0;
    if (b >= e.viewTo) {
      sa && Nc(a.doc, b) < e.viewTo && ra(a);
    } else {
      if (c <= e.viewFrom) {
        sa && Ld(a.doc, c + d) > e.viewFrom ? ra(a) : (e.viewFrom += d, e.viewTo += d);
      } else {
        if (b <= e.viewFrom && c >= e.viewTo) {
          ra(a);
        } else {
          if (b <= e.viewFrom) {
            var f = cc(a, c, c + d, 1);
            f ? (e.view = e.view.slice(f.index), e.viewFrom = f.lineN, e.viewTo += d) : ra(a);
          } else {
            if (c >= e.viewTo) {
              (f = cc(a, b, b, -1)) ? (e.view = e.view.slice(0, f.index), e.viewTo = f.lineN) : ra(a);
            } else {
              var f = cc(a, b, b, -1), g = cc(a, c, c + d, 1);
              f && g ? (e.view = e.view.slice(0, f.index).concat(Nb(a, f.lineN, g.lineN)).concat(e.view.slice(g.index)), e.viewTo += d) : ra(a);
            }
          }
        }
      }
    }
    if (a = e.externalMeasured) {
      c < a.lineN ? a.lineN += d : b < a.lineN + a.size && (e.externalMeasured = null);
    }
  }
  function na(a, b, c) {
    a.curOp.viewChanged = !0;
    var d = a.display, e = a.display.externalMeasured;
    e && b >= e.lineN && b < e.lineN + e.size && (d.externalMeasured = null);
    b < d.viewFrom || b >= d.viewTo || (a = d.view[Ba(a, b)], null != a.node && (a = a.changes || (a.changes = []), -1 == D(a, c) && a.push(c)));
  }
  function ra(a) {
    a.display.viewFrom = a.display.viewTo = a.doc.first;
    a.display.view = [];
    a.display.viewOffset = 0;
  }
  function Ba(a, b) {
    if (b >= a.display.viewTo) {
      return null;
    }
    b -= a.display.viewFrom;
    if (0 > b) {
      return null;
    }
    for (var c = a.display.view, d = 0;d < c.length;d++) {
      if (b -= c[d].size, 0 > b) {
        return d;
      }
    }
  }
  function cc(a, b, c, d) {
    var e = Ba(a, b), f = a.display.view;
    if (!sa || c == a.doc.first + a.doc.size) {
      return {index:e, lineN:c};
    }
    for (var g = 0, h = a.display.viewFrom;g < e;g++) {
      h += f[g].size;
    }
    if (h != b) {
      if (0 < d) {
        if (e == f.length - 1) {
          return null;
        }
        b = h + f[e].size - b;
        e++;
      } else {
        b = h - b;
      }
      c += b;
    }
    for (;Nc(a.doc, c) != c;) {
      if (e == (0 > d ? 0 : f.length - 1)) {
        return null;
      }
      c += d * f[e - (0 > d ? 1 : 0)].size;
      e += d;
    }
    return {index:e, lineN:c};
  }
  function Kd(a) {
    a = a.display.view;
    for (var b = 0, c = 0;c < a.length;c++) {
      var d = a[c];
      d.hidden || d.node && !d.changes || ++b;
    }
    return b;
  }
  function zf(a) {
    function b() {
      d.activeTouch && (e = setTimeout(function() {
        d.activeTouch = null;
      }, 1E3), f = d.activeTouch, f.end = +new Date);
    }
    function c(a, b) {
      if (null == b.left) {
        return !0;
      }
      var c = b.left - a.left, d = b.top - a.top;
      return 400 < c * c + d * d;
    }
    var d = a.display;
    v(d.scroller, "mousedown", G(a, Of));
    B && 11 > C ? v(d.scroller, "dblclick", G(a, function(b) {
      if (!O(a, b)) {
        var c = Fa(a, b);
        !c || id(a, b, "gutterClick", !0) || oa(a.display, b) || (M(b), b = a.findWordAt(c), Ub(a.doc, b.anchor, b.head));
      }
    })) : v(d.scroller, "dblclick", function(b) {
      O(a, b) || M(b);
    });
    jd || v(d.scroller, "contextmenu", function(b) {
      ue(a, b);
    });
    var e, f = {end:0};
    v(d.scroller, "touchstart", function(a) {
      var b;
      1 != a.touches.length ? b = !1 : (b = a.touches[0], b = 1 >= b.radiusX && 1 >= b.radiusY);
      b || (clearTimeout(e), b = +new Date, d.activeTouch = {start:b, moved:!1, prev:300 >= b - f.end ? f : null}, 1 == a.touches.length && (d.activeTouch.left = a.touches[0].pageX, d.activeTouch.top = a.touches[0].pageY));
    });
    v(d.scroller, "touchmove", function() {
      d.activeTouch && (d.activeTouch.moved = !0);
    });
    v(d.scroller, "touchend", function(e) {
      var f = d.activeTouch;
      if (f && !oa(d, e) && null != f.left && !f.moved && 300 > new Date - f.start) {
        var g = a.coordsChar(d.activeTouch, "page"), f = !f.prev || c(f, f.prev) ? new z(g, g) : !f.prev.prev || c(f, f.prev.prev) ? a.findWordAt(g) : new z(q(g.line, 0), x(a.doc, q(g.line + 1, 0)));
        a.setSelection(f.anchor, f.head);
        a.focus();
        M(e);
      }
      b();
    });
    v(d.scroller, "touchcancel", b);
    v(d.scroller, "scroll", function() {
      d.scroller.clientHeight && (mb(a, d.scroller.scrollTop), Oa(a, d.scroller.scrollLeft, !0), J(a, "scroll", a));
    });
    v(d.scroller, "mousewheel", function(b) {
      ve(a, b);
    });
    v(d.scroller, "DOMMouseScroll", function(b) {
      ve(a, b);
    });
    v(d.wrapper, "scroll", function() {
      d.wrapper.scrollTop = d.wrapper.scrollLeft = 0;
    });
    d.dragFunctions = {enter:function(b) {
      O(a, b) || dc(b);
    }, over:function(b) {
      if (!O(a, b)) {
        var c = Fa(a, b);
        if (c) {
          var d = document.createDocumentFragment();
          me(a, c, d);
          a.display.dragCursor || (a.display.dragCursor = r("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), a.display.lineSpace.insertBefore(a.display.dragCursor, a.display.cursorDiv));
          S(a.display.dragCursor, d);
        }
        dc(b);
      }
    }, start:function(b) {
      if (B && (!a.state.draggingText || 100 > +new Date - we)) {
        dc(b);
      } else {
        if (!O(a, b) && !oa(a.display, b) && (b.dataTransfer.setData("Text", a.getSelection()), b.dataTransfer.setDragImage && !xe)) {
          var c = r("img", null, null, "position: fixed; left: 0; top: 0;");
          c.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
          ca && (c.width = c.height = 1, a.display.wrapper.appendChild(c), c._top = c.offsetTop);
          b.dataTransfer.setDragImage(c, 0, 0);
          ca && c.parentNode.removeChild(c);
        }
      }
    }, drop:G(a, Pf), leave:function() {
      ye(a);
    }};
    var g = d.input.getField();
    v(g, "keyup", function(b) {
      ze.call(a, b);
    });
    v(g, "keydown", G(a, Ae));
    v(g, "keypress", G(a, Be));
    v(g, "focus", db(yc, a));
    v(g, "blur", db(eb, a));
  }
  function Qf(a) {
    var b = a.display;
    if (b.lastWrapHeight != b.wrapper.clientHeight || b.lastWrapWidth != b.wrapper.clientWidth) {
      b.cachedCharWidth = b.cachedTextHeight = b.cachedPaddingH = null, b.scrollbarsClipped = !1, a.setSize();
    }
  }
  function oa(a, b) {
    for (var c = b.target || b.srcElement;c != a.wrapper;c = c.parentNode) {
      if (!c || 1 == c.nodeType && "true" == c.getAttribute("cm-ignore-events") || c.parentNode == a.sizer && c != a.mover) {
        return !0;
      }
    }
  }
  function Fa(a, b, c, d) {
    var e = a.display;
    if (!c && "true" == (b.target || b.srcElement).getAttribute("cm-not-content")) {
      return null;
    }
    var f, g;
    c = e.lineSpace.getBoundingClientRect();
    try {
      f = b.clientX - c.left, g = b.clientY - c.top;
    } catch (k) {
      return null;
    }
    b = gd(a, f, g);
    var h;
    d && 1 == b.xRel && (h = t(a.doc, b.line).text).length == b.ch && (d = ba(h, h.length, a.options.tabSize) - h.length, b = q(b.line, Math.max(0, Math.round((f - ne(a.display).left) / hb(a.display)) - d)));
    return b;
  }
  function Of(a) {
    var b = this.display;
    if (!(b.activeTouch && b.input.supportsTouch() || O(this, a))) {
      if (b.shift = a.shiftKey, oa(b, a)) {
        K || (b.scroller.draggable = !1, setTimeout(function() {
          b.scroller.draggable = !0;
        }, 100));
      } else {
        if (!id(this, a, "gutterClick", !0)) {
          var c = Fa(this, a);
          window.focus();
          switch(Ce(a)) {
            case 1:
              this.state.selectingText ? this.state.selectingText(a) : c ? Rf(this, a, c) : (a.target || a.srcElement) == b.scroller && M(a);
              break;
            case 2:
              K && (this.state.lastMiddleDown = +new Date);
              c && Ub(this.doc, c);
              setTimeout(function() {
                b.input.focus();
              }, 20);
              M(a);
              break;
            case 3:
              jd ? ue(this, a) : Sf(this);
          }
        }
      }
    }
  }
  function Rf(a, b, c) {
    B ? setTimeout(db(Ud, a), 0) : a.curOp.focus = ga();
    var d = +new Date, e;
    ec && ec.time > d - 400 && 0 == y(ec.pos, c) ? e = "triple" : fc && fc.time > d - 400 && 0 == y(fc.pos, c) ? (e = "double", ec = {time:d, pos:c}) : (e = "single", fc = {time:d, pos:c});
    var d = a.doc.sel, f = Y ? b.metaKey : b.ctrlKey, g;
    a.options.dragDrop && Tf && !a.isReadOnly() && "single" == e && -1 < (g = d.contains(c)) && (0 > y((g = d.ranges[g]).from(), c) || 0 < c.xRel) && (0 < y(g.to(), c) || 0 > c.xRel) ? Uf(a, b, c, f) : Vf(a, b, c, e, f);
  }
  function Uf(a, b, c, d) {
    var e = a.display, f = +new Date, g = G(a, function(h) {
      K && (e.scroller.draggable = !1);
      a.state.draggingText = !1;
      ka(document, "mouseup", g);
      ka(e.scroller, "drop", g);
      10 > Math.abs(b.clientX - h.clientX) + Math.abs(b.clientY - h.clientY) && (M(h), !d && +new Date - 200 < f && Ub(a.doc, c), K || B && 9 == C ? setTimeout(function() {
        document.body.focus();
        e.input.focus();
      }, 20) : e.input.focus());
    });
    K && (e.scroller.draggable = !0);
    a.state.draggingText = g;
    e.scroller.dragDrop && e.scroller.dragDrop();
    v(document, "mouseup", g);
    v(e.scroller, "drop", g);
  }
  function Vf(a, b, c, d, e) {
    function f(b) {
      if (0 != y(w, b)) {
        if (w = b, "rect" == d) {
          for (var e = [], f = a.options.tabSize, g = ba(t(l, c.line).text, c.ch, f), h = ba(t(l, b.line).text, b.ch, f), k = Math.min(g, h), g = Math.max(g, h), h = Math.min(c.line, b.line), n = Math.min(a.lastLine(), Math.max(c.line, b.line));h <= n;h++) {
            var r = t(l, h).text, v = De(r, k, f);
            k == g ? e.push(new z(q(h, v), q(h, v))) : r.length > v && e.push(new z(q(h, v), q(h, De(r, g, f))));
          }
          e.length || e.push(new z(c, c));
          H(l, aa(p.ranges.slice(0, u).concat(e), u), {origin:"*mouse", scroll:!1});
          a.scrollIntoView(b);
        } else {
          e = m, f = e.anchor, k = b, "single" != d && (b = "double" == d ? a.findWordAt(b) : new z(q(b.line, 0), x(l, q(b.line + 1, 0))), 0 < y(b.anchor, f) ? (k = b.head, f = Pb(e.from(), b.anchor)) : (k = b.anchor, f = Ob(e.to(), b.head))), e = p.ranges.slice(0), e[u] = new z(x(l, f), k), H(l, aa(e, u), kd);
        }
      }
    }
    function g(b) {
      var c = ++A, e = Fa(a, b, !0, "rect" == d);
      if (e) {
        if (0 != y(e, w)) {
          a.curOp.focus = ga();
          f(e);
          var h = Ic(k, l);
          (e.line >= h.to || e.line < h.from) && setTimeout(G(a, function() {
            A == c && g(b);
          }), 150);
        } else {
          var m = b.clientY < B.top ? -20 : b.clientY > B.bottom ? 20 : 0;
          m && setTimeout(G(a, function() {
            A == c && (k.scroller.scrollTop += m, g(b));
          }), 50);
        }
      }
    }
    function h(b) {
      a.state.selectingText = !1;
      A = Infinity;
      M(b);
      k.input.focus();
      ka(document, "mousemove", F);
      ka(document, "mouseup", C);
      l.history.lastSelOrigin = null;
    }
    var k = a.display, l = a.doc;
    M(b);
    var m, u, p = l.sel, n = p.ranges;
    e && !b.shiftKey ? (u = l.sel.contains(c), m = -1 < u ? n[u] : new z(c, c)) : (m = l.sel.primary(), u = l.sel.primIndex);
    if (b.altKey) {
      d = "rect", e || (m = new z(c, c)), c = Fa(a, b, !0, !0), u = -1;
    } else {
      if ("double" == d) {
        var r = a.findWordAt(c);
        m = a.display.shift || l.extend ? sb(l, m, r.anchor, r.head) : r;
      } else {
        "triple" == d ? (r = new z(q(c.line, 0), x(l, q(c.line + 1, 0))), m = a.display.shift || l.extend ? sb(l, m, r.anchor, r.head) : r) : m = sb(l, m, c);
      }
    }
    e ? -1 == u ? (u = n.length, H(l, aa(n.concat([m]), u), {scroll:!1, origin:"*mouse"})) : 1 < n.length && n[u].empty() && "single" == d && !b.shiftKey ? (H(l, aa(n.slice(0, u).concat(n.slice(u + 1)), 0), {scroll:!1, origin:"*mouse"}), p = l.sel) : Xc(l, u, m, kd) : (u = 0, H(l, new la([m], 0), kd), p = l.sel);
    var w = c, B = k.wrapper.getBoundingClientRect(), A = 0, F = G(a, function(a) {
      Ce(a) ? g(a) : h(a);
    }), C = G(a, h);
    a.state.selectingText = C;
    v(document, "mousemove", F);
    v(document, "mouseup", C);
  }
  function id(a, b, c, d) {
    try {
      var e = b.clientX, f = b.clientY;
    } catch (k) {
      return !1;
    }
    if (e >= Math.floor(a.display.gutters.getBoundingClientRect().right)) {
      return !1;
    }
    d && M(b);
    d = a.display;
    var g = d.lineDiv.getBoundingClientRect();
    if (f > g.bottom || !W(a, c)) {
      return ld(b);
    }
    f -= g.top - d.viewOffset;
    for (g = 0;g < a.options.gutters.length;++g) {
      var h = d.gutters.childNodes[g];
      if (h && h.getBoundingClientRect().right >= e) {
        return e = Aa(a.doc, f), J(a, c, a, e, a.options.gutters[g], b), ld(b);
      }
    }
  }
  function Pf(a) {
    var b = this;
    ye(b);
    if (!O(b, a) && !oa(b.display, a)) {
      M(a);
      B && (we = +new Date);
      var c = Fa(b, a, !0), d = a.dataTransfer.files;
      if (c && !b.isReadOnly()) {
        if (d && d.length && window.FileReader && window.File) {
          var e = d.length, f = Array(e), g = 0;
          a = function(a, d) {
            if (!b.options.allowDropFileTypes || -1 != D(b.options.allowDropFileTypes, a.type)) {
              var h = new FileReader;
              h.onload = G(b, function() {
                var a = h.result;
                /[\x00-\x08\x0e-\x1f]{2}/.test(a) && (a = "");
                f[d] = a;
                ++g == e && (c = x(b.doc, c), a = {from:c, to:c, text:b.doc.splitLines(f.join(b.doc.lineSeparator())), origin:"paste"}, Qa(b.doc, a), ee(b.doc, ha(c, Ga(a))));
              });
              h.readAsText(a);
            }
          };
          for (var h = 0;h < e;++h) {
            a(d[h], h);
          }
        } else {
          if (b.state.draggingText && -1 < b.doc.sel.contains(c)) {
            b.state.draggingText(a), setTimeout(function() {
              b.display.input.focus();
            }, 20);
          } else {
            try {
              if (f = a.dataTransfer.getData("Text")) {
                if (b.state.draggingText && (Y ? !a.altKey : !a.ctrlKey)) {
                  var k = b.listSelections()
                }
                Vb(b.doc, ha(c, c));
                if (k) {
                  for (h = 0;h < k.length;++h) {
                    Wa(b.doc, "", k[h].anchor, k[h].head, "drag");
                  }
                }
                b.replaceSelection(f, "around", "paste");
                b.display.input.focus();
              }
            } catch (l) {
            }
          }
        }
      }
    }
  }
  function ye(a) {
    a.display.dragCursor && (a.display.lineSpace.removeChild(a.display.dragCursor), a.display.dragCursor = null);
  }
  function mb(a, b) {
    2 > Math.abs(a.doc.scrollTop - b) || (a.doc.scrollTop = b, pa || Qc(a, {top:b}), a.display.scroller.scrollTop != b && (a.display.scroller.scrollTop = b), a.display.scrollbars.setScrollTop(b), pa && Qc(a), gb(a, 100));
  }
  function Oa(a, b, c) {
    (c ? b == a.doc.scrollLeft : 2 > Math.abs(a.doc.scrollLeft - b)) || (b = Math.min(b, a.display.scroller.scrollWidth - a.display.scroller.clientWidth), a.doc.scrollLeft = b, Cc(a), a.display.scroller.scrollLeft != b && (a.display.scroller.scrollLeft = b), a.display.scrollbars.setScrollLeft(b));
  }
  function ve(a, b) {
    var c = Ee(b), d = c.x, c = c.y, e = a.display, f = e.scroller, g = f.scrollWidth > f.clientWidth, h = f.scrollHeight > f.clientHeight;
    if (d && g || c && h) {
      if (c && Y && K) {
        var g = b.target, k = e.view;
        a: for (;g != f;g = g.parentNode) {
          for (var l = 0;l < k.length;l++) {
            if (k[l].node == g) {
              a.display.currentWheelTarget = g;
              break a;
            }
          }
        }
      }
      !d || pa || ca || null == T ? (c && null != T && (h = c * T, g = a.doc.scrollTop, k = g + e.wrapper.clientHeight, 0 > h ? g = Math.max(0, g + h - 50) : k = Math.min(a.doc.height, k + h + 50), Qc(a, {top:g, bottom:k})), 20 > gc && (null == e.wheelStartX ? (e.wheelStartX = f.scrollLeft, e.wheelStartY = f.scrollTop, e.wheelDX = d, e.wheelDY = c, setTimeout(function() {
        if (null != e.wheelStartX) {
          var a = f.scrollLeft - e.wheelStartX, b = f.scrollTop - e.wheelStartY, a = b && e.wheelDY && b / e.wheelDY || a && e.wheelDX && a / e.wheelDX;
          e.wheelStartX = e.wheelStartY = null;
          a && (T = (T * gc + a) / (gc + 1), ++gc);
        }
      }, 200)) : (e.wheelDX += d, e.wheelDY += c))) : (c && h && mb(a, Math.max(0, Math.min(f.scrollTop + c * T, f.scrollHeight - f.clientHeight))), Oa(a, Math.max(0, Math.min(f.scrollLeft + d * T, f.scrollWidth - f.clientWidth))), (!c || c && h) && M(b), e.wheelStartX = null);
    }
  }
  function hc(a, b, c) {
    if ("string" == typeof b && (b = ic[b], !b)) {
      return !1;
    }
    a.display.input.ensurePolled();
    var d = a.display.shift, e = !1;
    try {
      a.isReadOnly() && (a.state.suppressEdits = !0), c && (a.display.shift = !1), e = b(a) != Fe;
    } finally {
      a.display.shift = d, a.state.suppressEdits = !1;
    }
    return e;
  }
  function Wf(a, b, c) {
    for (var d = 0;d < a.state.keyMaps.length;d++) {
      var e = xb(b, a.state.keyMaps[d], c, a);
      if (e) {
        return e;
      }
    }
    return a.options.extraKeys && xb(b, a.options.extraKeys, c, a) || xb(b, a.options.keyMap, c, a);
  }
  function jc(a, b, c, d) {
    var e = a.state.keySeq;
    if (e) {
      if (Xf(b)) {
        return "handled";
      }
      Yf.set(50, function() {
        a.state.keySeq == e && (a.state.keySeq = null, a.display.input.reset());
      });
      b = e + " " + b;
    }
    d = Wf(a, b, d);
    "multi" == d && (a.state.keySeq = b);
    "handled" == d && Q(a, "keyHandled", a, b, c);
    if ("handled" == d || "multi" == d) {
      M(c), Zc(a);
    }
    return e && !d && /\'$/.test(b) ? (M(c), !0) : !!d;
  }
  function Ge(a, b) {
    var c = Zf(b, !0);
    return c ? b.shiftKey && !a.state.keySeq ? jc(a, "Shift-" + c, b, function(b) {
      return hc(a, b, !0);
    }) || jc(a, c, b, function(b) {
      if ("string" == typeof b ? /^go[A-Z]/.test(b) : b.motion) {
        return hc(a, b);
      }
    }) : jc(a, c, b, function(b) {
      return hc(a, b);
    }) : !1;
  }
  function $f(a, b, c) {
    return jc(a, "'" + c + "'", b, function(b) {
      return hc(a, b, !0);
    });
  }
  function Ae(a) {
    this.curOp.focus = ga();
    if (!O(this, a)) {
      B && 11 > C && 27 == a.keyCode && (a.returnValue = !1);
      var b = a.keyCode;
      this.display.shift = 16 == b || a.shiftKey;
      var c = Ge(this, a);
      ca && (md = c ? b : null, !c && 88 == b && !He && (Y ? a.metaKey : a.ctrlKey) && this.replaceSelection("", null, "cut"));
      18 != b || /\bCodeMirror-crosshair\b/.test(this.display.lineDiv.className) || ag(this);
    }
  }
  function ag(a) {
    function b(a) {
      18 != a.keyCode && a.altKey || (lb(c, "CodeMirror-crosshair"), ka(document, "keyup", b), ka(document, "mouseover", b));
    }
    var c = a.display.lineDiv;
    nb(c, "CodeMirror-crosshair");
    v(document, "keyup", b);
    v(document, "mouseover", b);
  }
  function ze(a) {
    16 == a.keyCode && (this.doc.sel.shift = !1);
    O(this, a);
  }
  function Be(a) {
    if (!(oa(this.display, a) || O(this, a) || a.ctrlKey && !a.altKey || Y && a.metaKey)) {
      var b = a.keyCode, c = a.charCode;
      if (ca && b == md) {
        md = null, M(a);
      } else {
        if (!ca || a.which && !(10 > a.which) || !Ge(this, a)) {
          if (b = String.fromCharCode(null == c ? b : c), !$f(this, a, b)) {
            this.display.input.onKeyPress(a);
          }
        }
      }
    }
  }
  function Sf(a) {
    a.state.delayingBlurEvent = !0;
    setTimeout(function() {
      a.state.delayingBlurEvent && (a.state.delayingBlurEvent = !1, eb(a));
    }, 100);
  }
  function yc(a) {
    a.state.delayingBlurEvent && (a.state.delayingBlurEvent = !1);
    "nocursor" != a.options.readOnly && (a.state.focused || (J(a, "focus", a), a.state.focused = !0, nb(a.display.wrapper, "CodeMirror-focused"), a.curOp || a.display.selForContextMenu == a.doc.sel || (a.display.input.reset(), K && setTimeout(function() {
      a.display.input.reset(!0);
    }, 20)), a.display.input.receivedFocus()), Zc(a));
  }
  function eb(a) {
    a.state.delayingBlurEvent || (a.state.focused && (J(a, "blur", a), a.state.focused = !1, lb(a.display.wrapper, "CodeMirror-focused")), clearInterval(a.display.blinker), setTimeout(function() {
      a.state.focused || (a.display.shift = !1);
    }, 150));
  }
  function ue(a, b) {
    var c;
    (c = oa(a.display, b)) || (c = W(a, "gutterContextMenu") ? id(a, b, "gutterContextMenu", !1) : !1);
    if (!c && !O(a, b, "contextmenu")) {
      a.display.input.onContextMenu(b);
    }
  }
  function Ie(a, b) {
    if (0 > y(a, b.from)) {
      return a;
    }
    if (0 >= y(a, b.to)) {
      return Ga(b);
    }
    var c = a.line + b.text.length - (b.to.line - b.from.line) - 1, d = a.ch;
    a.line == b.to.line && (d += Ga(b).ch - b.to.ch);
    return q(c, d);
  }
  function nd(a, b) {
    for (var c = [], d = 0;d < a.sel.ranges.length;d++) {
      var e = a.sel.ranges[d];
      c.push(new z(Ie(e.anchor, b), Ie(e.head, b)));
    }
    return aa(c, a.sel.primIndex);
  }
  function Je(a, b, c) {
    return a.line == b.line ? q(c.line, a.ch - b.ch + c.ch) : q(c.line + (a.line - b.line), a.ch);
  }
  function Ke(a, b, c) {
    b = {canceled:!1, from:b.from, to:b.to, text:b.text, origin:b.origin, cancel:function() {
      this.canceled = !0;
    }};
    c && (b.update = function(b, c, f, g) {
      b && (this.from = x(a, b));
      c && (this.to = x(a, c));
      f && (this.text = f);
      void 0 !== g && (this.origin = g);
    });
    J(a, "beforeChange", a, b);
    a.cm && J(a.cm, "beforeChange", a.cm, b);
    return b.canceled ? null : {from:b.from, to:b.to, text:b.text, origin:b.origin};
  }
  function Qa(a, b, c) {
    if (a.cm) {
      if (!a.cm.curOp) {
        return G(a.cm, Qa)(a, b, c);
      }
      if (a.cm.state.suppressEdits) {
        return;
      }
    }
    if (W(a, "beforeChange") || a.cm && W(a.cm, "beforeChange")) {
      if (b = Ke(a, b, !0), !b) {
        return;
      }
    }
    if (c = Le && !c && bg(a, b.from, b.to)) {
      for (var d = c.length - 1;0 <= d;--d) {
        Me(a, {from:c[d].from, to:c[d].to, text:d ? [""] : b.text});
      }
    } else {
      Me(a, b);
    }
  }
  function Me(a, b) {
    if (1 != b.text.length || "" != b.text[0] || 0 != y(b.from, b.to)) {
      var c = nd(a, b);
      Ne(a, b, c, a.cm ? a.cm.curOp.id : NaN);
      yb(a, b, c, od(a, b));
      var d = [];
      Ha(a, function(a, c) {
        c || -1 != D(d, a.history) || (Oe(a.history, b), d.push(a.history));
        yb(a, b, null, od(a, b));
      });
    }
  }
  function kc(a, b, c) {
    if (!a.cm || !a.cm.state.suppressEdits) {
      for (var d = a.history, e, f = a.sel, g = "undo" == b ? d.done : d.undone, h = "undo" == b ? d.undone : d.done, k = 0;k < g.length && (e = g[k], c ? !e.ranges || e.equals(a.sel) : e.ranges);k++) {
      }
      if (k != g.length) {
        for (d.lastOrigin = d.lastSelOrigin = null;;) {
          if (e = g.pop(), e.ranges) {
            Wb(e, h);
            if (c && !e.equals(a.sel)) {
              H(a, e, {clearRedo:!1});
              return;
            }
            f = e;
          } else {
            break;
          }
        }
        c = [];
        Wb(f, h);
        h.push({changes:c, generation:d.generation});
        d.generation = e.generation || ++d.maxGeneration;
        d = W(a, "beforeChange") || a.cm && W(a.cm, "beforeChange");
        for (k = e.changes.length - 1;0 <= k;--k) {
          var l = e.changes[k];
          l.origin = b;
          if (d && !Ke(a, l, !1)) {
            g.length = 0;
            break;
          }
          c.push(pd(a, l));
          f = k ? nd(a, l) : A(g);
          yb(a, l, f, Pe(a, l));
          !k && a.cm && a.cm.scrollIntoView({from:l.from, to:Ga(l)});
          var m = [];
          Ha(a, function(a, b) {
            b || -1 != D(m, a.history) || (Oe(a.history, l), m.push(a.history));
            yb(a, l, null, Pe(a, l));
          });
        }
      }
    }
  }
  function Qe(a, b) {
    if (0 != b && (a.first += b, a.sel = new la(Rb(a.sel.ranges, function(a) {
      return new z(q(a.anchor.line + b, a.anchor.ch), q(a.head.line + b, a.head.ch));
    }), a.sel.primIndex), a.cm)) {
      N(a.cm, a.first, a.first - b, b);
      for (var c = a.cm.display, d = c.viewFrom;d < c.viewTo;d++) {
        na(a.cm, d, "gutter");
      }
    }
  }
  function yb(a, b, c, d) {
    if (a.cm && !a.cm.curOp) {
      return G(a.cm, yb)(a, b, c, d);
    }
    if (b.to.line < a.first) {
      Qe(a, b.text.length - 1 - (b.to.line - b.from.line));
    } else {
      if (!(b.from.line > a.lastLine())) {
        if (b.from.line < a.first) {
          var e = b.text.length - 1 - (a.first - b.from.line);
          Qe(a, e);
          b = {from:q(a.first, 0), to:q(b.to.line + e, b.to.ch), text:[A(b.text)], origin:b.origin};
        }
        e = a.lastLine();
        b.to.line > e && (b = {from:b.from, to:q(e, t(a, e).text.length), text:[b.text[0]], origin:b.origin});
        b.removed = Ca(a, b.from, b.to);
        c || (c = nd(a, b));
        a.cm ? cg(a.cm, b, d) : qd(a, b, d);
        Vb(a, c, ia);
      }
    }
  }
  function cg(a, b, c) {
    var d = a.doc, e = a.display, f = b.from, g = b.to, h = !1, k = f.line;
    a.options.lineWrapping || (k = F(ja(t(d, f.line))), d.iter(k, g.line + 1, function(a) {
      if (a == e.maxLine) {
        return h = !0;
      }
    }));
    -1 < d.sel.contains(b.from, b.to) && ie(a);
    qd(d, b, c, Id(a));
    a.options.lineWrapping || (d.iter(k, f.line + b.text.length, function(a) {
      var b = Kb(a);
      b > e.maxLineLength && (e.maxLine = a, e.maxLineLength = b, e.maxLineChanged = !0, h = !1);
    }), h && (a.curOp.updateMaxLine = !0));
    d.frontier = Math.min(d.frontier, f.line);
    gb(a, 400);
    c = b.text.length - (g.line - f.line) - 1;
    b.full ? N(a) : f.line != g.line || 1 != b.text.length || Re(a.doc, b) ? N(a, f.line, g.line + 1, c) : na(a, f.line, "text");
    c = W(a, "changes");
    if ((d = W(a, "change")) || c) {
      b = {from:f, to:g, text:b.text, removed:b.removed, origin:b.origin}, d && Q(a, "change", a, b), c && (a.curOp.changeObjs || (a.curOp.changeObjs = [])).push(b);
    }
    a.display.selForContextMenu = null;
  }
  function Wa(a, b, c, d, e) {
    d || (d = c);
    if (0 > y(d, c)) {
      var f = d;
      d = c;
      c = f;
    }
    "string" == typeof b && (b = a.splitLines(b));
    Qa(a, {from:c, to:d, text:b, origin:e});
  }
  function bc(a, b, c, d, e) {
    var f = a.display, g = wa(a.display);
    0 > c && (c = 0);
    var h = a.curOp && null != a.curOp.scrollTop ? a.curOp.scrollTop : f.scroller.scrollTop, k = Oc(a), l = {};
    e - c > k && (e = c + k);
    var m = a.doc.height + Fc(f), u = c < g, g = e > m - g;
    c < h ? l.scrollTop = u ? 0 : c : e > h + k && (c = Math.min(c, (g ? m : e) - k), c != h && (l.scrollTop = c));
    h = a.curOp && null != a.curOp.scrollLeft ? a.curOp.scrollLeft : f.scroller.scrollLeft;
    a = qa(a) - (a.options.fixedGutter ? f.gutters.offsetWidth : 0);
    (f = d - b > a) && (d = b + a);
    10 > b ? l.scrollLeft = 0 : b < h ? l.scrollLeft = Math.max(0, b - (f ? 0 : 10)) : d > a + h - 3 && (l.scrollLeft = d + (f ? 0 : 10) - a);
    return l;
  }
  function lc(a, b, c) {
    null == b && null == c || mc(a);
    null != b && (a.curOp.scrollLeft = (null == a.curOp.scrollLeft ? a.doc.scrollLeft : a.curOp.scrollLeft) + b);
    null != c && (a.curOp.scrollTop = (null == a.curOp.scrollTop ? a.doc.scrollTop : a.curOp.scrollTop) + c);
  }
  function Ra(a) {
    mc(a);
    var b = a.getCursor(), c = b, d = b;
    a.options.lineWrapping || (c = b.ch ? q(b.line, b.ch - 1) : b, d = q(b.line, b.ch + 1));
    a.curOp.scrollToPos = {from:c, to:d, margin:a.options.cursorScrollMargin, isCursor:!0};
  }
  function mc(a) {
    var b = a.curOp.scrollToPos;
    if (b) {
      a.curOp.scrollToPos = null;
      var c = te(a, b.from), d = te(a, b.to), b = bc(a, Math.min(c.left, d.left), Math.min(c.top, d.top) - b.margin, Math.max(c.right, d.right), Math.max(c.bottom, d.bottom) + b.margin);
      a.scrollTo(b.scrollLeft, b.scrollTop);
    }
  }
  function qb(a, b, c, d) {
    var e = a.doc, f;
    null == c && (c = "add");
    "smart" == c && (e.mode.indent ? f = tb(a, b) : c = "prev");
    var g = a.options.tabSize, h = t(e, b), k = ba(h.text, null, g);
    h.stateAfter && (h.stateAfter = null);
    var l = h.text.match(/^\s*/)[0], m;
    if (!d && !/\S/.test(h.text)) {
      m = 0, c = "not";
    } else {
      if ("smart" == c && (m = e.mode.indent(f, h.text.slice(l.length), h.text), m == Fe || 150 < m)) {
        if (!d) {
          return;
        }
        c = "prev";
      }
    }
    "prev" == c ? m = b > e.first ? ba(t(e, b - 1).text, null, g) : 0 : "add" == c ? m = k + a.options.indentUnit : "subtract" == c ? m = k - a.options.indentUnit : "number" == typeof c && (m = k + c);
    m = Math.max(0, m);
    c = "";
    d = 0;
    if (a.options.indentWithTabs) {
      for (a = Math.floor(m / g);a;--a) {
        d += g, c += "\t";
      }
    }
    d < m && (c += Se(m - d));
    if (c != l) {
      return Wa(e, c, q(b, 0), q(b, l.length), "+input"), h.stateAfter = null, !0;
    }
    for (a = 0;a < e.sel.ranges.length;a++) {
      if (g = e.sel.ranges[a], g.head.line == b && g.head.ch < l.length) {
        d = q(b, l.length);
        Xc(e, a, new z(d, d));
        break;
      }
    }
  }
  function nc(a, b, c, d) {
    var e = b, f = b;
    "number" == typeof b ? f = t(a, Math.max(a.first, Math.min(b, a.first + a.size - 1))) : e = F(b);
    if (null == e) {
      return null;
    }
    d(f, e) && a.cm && na(a.cm, e, c);
    return f;
  }
  function Xa(a, b) {
    for (var c = a.doc.sel.ranges, d = [], e = 0;e < c.length;e++) {
      for (var f = b(c[e]);d.length && 0 >= y(f.from, A(d).to);) {
        var g = d.pop();
        if (0 > y(g.from, f.from)) {
          f.from = g.from;
          break;
        }
      }
      d.push(f);
    }
    R(a, function() {
      for (var b = d.length - 1;0 <= b;b--) {
        Wa(a.doc, "", d[b].from, d[b].to, "+delete");
      }
      Ra(a);
    });
  }
  function rd(a, b, c, d, e) {
    function f(b) {
      var d = (e ? hd : Te)(l, h, c, !0);
      if (null == d) {
        if (b = !b) {
          b = g + c, b < a.first || b >= a.first + a.size ? b = m = !1 : (g = b, b = l = t(a, b));
        }
        if (b) {
          h = e ? (0 > c ? ac : $b)(l) : 0 > c ? l.text.length : 0;
        } else {
          return m = !1;
        }
      } else {
        h = d;
      }
      return !0;
    }
    var g = b.line, h = b.ch, k = c, l = t(a, g), m = !0;
    if ("char" == d) {
      f();
    } else {
      if ("column" == d) {
        f(!0);
      } else {
        if ("word" == d || "group" == d) {
          var u = null;
          d = "group" == d;
          for (var p = a.cm && a.cm.getHelper(b, "wordChars"), n = !0;!(0 > c) || f(!n);n = !1) {
            var r = l.text.charAt(h) || "\n", r = oc(r, p) ? "w" : d && "\n" == r ? "n" : !d || /\s/.test(r) ? null : "p";
            !d || n || r || (r = "s");
            if (u && u != r) {
              0 > c && (c = 1, f());
              break;
            }
            r && (u = r);
            if (0 < c && !f(!n)) {
              break;
            }
          }
        }
      }
    }
    b = Yc(a, q(g, h), b, k, !0);
    m || (b.hitSide = !0);
    return b;
  }
  function Ue(a, b, c, d) {
    var e = a.doc, f = b.left, g;
    for ("page" == d ? g = b.top + c * (Math.min(a.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight) - (0 > c ? 1.5 : .5) * wa(a.display)) : "line" == d && (g = 0 < c ? b.bottom + 3 : b.top - 3);;) {
      b = gd(a, f, g);
      if (!b.outside) {
        break;
      }
      if (0 > c ? 0 >= g : g >= e.height) {
        b.hitSide = !0;
        break;
      }
      g += 5 * c;
    }
    return b;
  }
  function w(a, b, c, d) {
    n.defaults[a] = b;
    c && (Ma[a] = d ? function(a, b, d) {
      d != Fd && c(a, b, d);
    } : c);
  }
  function dg(a) {
    var b = a.split(/-(?!$)/);
    a = b[b.length - 1];
    for (var c, d, e, f, g = 0;g < b.length - 1;g++) {
      var h = b[g];
      if (/^(cmd|meta|m)$/i.test(h)) {
        f = !0;
      } else {
        if (/^a(lt)?$/i.test(h)) {
          c = !0;
        } else {
          if (/^(c|ctrl|control)$/i.test(h)) {
            d = !0;
          } else {
            if (/^s(hift)$/i.test(h)) {
              e = !0;
            } else {
              throw Error("Unrecognized modifier name: " + h);
            }
          }
        }
      }
    }
    c && (a = "Alt-" + a);
    d && (a = "Ctrl-" + a);
    f && (a = "Cmd-" + a);
    e && (a = "Shift-" + a);
    return a;
  }
  function pc(a) {
    return "string" == typeof a ? ua[a] : a;
  }
  function Ya(a, b, c, d, e) {
    if (d && d.shared) {
      return eg(a, b, c, d, e);
    }
    if (a.cm && !a.cm.curOp) {
      return G(a.cm, Ya)(a, b, c, d, e);
    }
    var f = new Ia(a, e);
    e = y(b, c);
    d && X(d, f, !1);
    if (0 < e || 0 == e && !1 !== f.clearWhenEmpty) {
      return f;
    }
    f.replacedWith && (f.collapsed = !0, f.widgetNode = r("span", [f.replacedWith], "CodeMirror-widget"), d.handleMouseEvents || f.widgetNode.setAttribute("cm-ignore-events", "true"), d.insertLeft && (f.widgetNode.insertLeft = !0));
    if (f.collapsed) {
      if (Ve(a, b.line, b, c, f) || b.line != c.line && Ve(a, c.line, b, c, f)) {
        throw Error("Inserting collapsed marker partially overlapping an existing one");
      }
      sa = !0;
    }
    f.addToHistory && Ne(a, {from:b, to:c, origin:"markText"}, a.sel, NaN);
    var g = b.line, h = a.cm, k;
    a.iter(g, c.line + 1, function(a) {
      h && f.collapsed && !h.options.lineWrapping && ja(a) == h.display.maxLine && (k = !0);
      f.collapsed && g != b.line && da(a, 0);
      var d = new qc(f, g == b.line ? b.ch : null, g == c.line ? c.ch : null);
      a.markedSpans = a.markedSpans ? a.markedSpans.concat([d]) : [d];
      d.marker.attachLine(a);
      ++g;
    });
    f.collapsed && a.iter(b.line, c.line + 1, function(b) {
      xa(a, b) && da(b, 0);
    });
    f.clearOnEnter && v(f, "beforeCursorEnter", function() {
      f.clear();
    });
    f.readOnly && (Le = !0, (a.history.done.length || a.history.undone.length) && a.clearHistory());
    f.collapsed && (f.id = ++sd, f.atomic = !0);
    if (h) {
      k && (h.curOp.updateMaxLine = !0);
      if (f.collapsed) {
        N(h, b.line, c.line + 1);
      } else {
        if (f.className || f.title || f.startStyle || f.endStyle || f.css) {
          for (d = b.line;d <= c.line;d++) {
            na(h, d, "text");
          }
        }
      }
      f.atomic && je(h.doc);
      Q(h, "markerAdded", h, f);
    }
    return f;
  }
  function eg(a, b, c, d, e) {
    d = X(d);
    d.shared = !1;
    var f = [Ya(a, b, c, d, e)], g = f[0], h = d.widgetNode;
    Ha(a, function(a) {
      h && (d.widgetNode = h.cloneNode(!0));
      f.push(Ya(a, x(a, b), x(a, c), d, e));
      for (var l = 0;l < a.linked.length;++l) {
        if (a.linked[l].isParent) {
          return;
        }
      }
      g = A(f);
    });
    return new rc(f, g);
  }
  function We(a) {
    return a.findMarks(q(a.first, 0), a.clipPos(q(a.lastLine())), function(a) {
      return a.parent;
    });
  }
  function fg(a) {
    for (var b = 0;b < a.length;b++) {
      var c = a[b], d = [c.primary.doc];
      Ha(c.primary.doc, function(a) {
        d.push(a);
      });
      for (var e = 0;e < c.markers.length;e++) {
        var f = c.markers[e];
        -1 == D(d, f.doc) && (f.parent = null, c.markers.splice(e--, 1));
      }
    }
  }
  function qc(a, b, c) {
    this.marker = a;
    this.from = b;
    this.to = c;
  }
  function zb(a, b) {
    if (a) {
      for (var c = 0;c < a.length;++c) {
        var d = a[c];
        if (d.marker == b) {
          return d;
        }
      }
    }
  }
  function od(a, b) {
    if (b.full) {
      return null;
    }
    var c = rb(a, b.from.line) && t(a, b.from.line).markedSpans, d = rb(a, b.to.line) && t(a, b.to.line).markedSpans;
    if (!c && !d) {
      return null;
    }
    var e = b.from.ch, f = b.to.ch, g = 0 == y(b.from, b.to);
    if (c) {
      for (var h = 0, k;h < c.length;++h) {
        var l = c[h], m = l.marker;
        if (null == l.from || (m.inclusiveLeft ? l.from <= e : l.from < e) || !(l.from != e || "bookmark" != m.type || g && l.marker.insertLeft)) {
          var u = null == l.to || (m.inclusiveRight ? l.to >= e : l.to > e);
          (k || (k = [])).push(new qc(m, l.from, u ? null : l.to));
        }
      }
    }
    c = k;
    if (d) {
      for (var h = 0, p;h < d.length;++h) {
        if (k = d[h], l = k.marker, null == k.to || (l.inclusiveRight ? k.to >= f : k.to > f) || k.from == f && "bookmark" == l.type && (!g || k.marker.insertLeft)) {
          m = null == k.from || (l.inclusiveLeft ? k.from <= f : k.from < f), (p || (p = [])).push(new qc(l, m ? null : k.from - f, null == k.to ? null : k.to - f));
        }
      }
    }
    d = p;
    g = 1 == b.text.length;
    p = A(b.text).length + (g ? e : 0);
    if (c) {
      for (f = 0;f < c.length;++f) {
        if (h = c[f], null == h.to) {
          (k = zb(d, h.marker), k) ? g && (h.to = null == k.to ? null : k.to + p) : h.to = e;
        }
      }
    }
    if (d) {
      for (f = 0;f < d.length;++f) {
        h = d[f], null != h.to && (h.to += p), null == h.from ? (k = zb(c, h.marker), k || (h.from = p, g && (c || (c = [])).push(h))) : (h.from += p, g && (c || (c = [])).push(h));
      }
    }
    c && (c = Xe(c));
    d && d != c && (d = Xe(d));
    e = [c];
    if (!g) {
      var g = b.text.length - 2, n;
      if (0 < g && c) {
        for (f = 0;f < c.length;++f) {
          null == c[f].to && (n || (n = [])).push(new qc(c[f].marker, null, null));
        }
      }
      for (f = 0;f < g;++f) {
        e.push(n);
      }
      e.push(d);
    }
    return e;
  }
  function Xe(a) {
    for (var b = 0;b < a.length;++b) {
      var c = a[b];
      null != c.from && c.from == c.to && !1 !== c.marker.clearWhenEmpty && a.splice(b--, 1);
    }
    return a.length ? a : null;
  }
  function Pe(a, b) {
    var c;
    if (c = b["spans_" + a.id]) {
      for (var d = 0, e = [];d < b.text.length;++d) {
        e.push(gg(c[d]));
      }
      c = e;
    } else {
      c = null;
    }
    d = od(a, b);
    if (!c) {
      return d;
    }
    if (!d) {
      return c;
    }
    for (e = 0;e < c.length;++e) {
      var f = c[e], g = d[e];
      if (f && g) {
        var h = 0;
        a: for (;h < g.length;++h) {
          for (var k = g[h], l = 0;l < f.length;++l) {
            if (f[l].marker == k.marker) {
              continue a;
            }
          }
          f.push(k);
        }
      } else {
        g && (c[e] = g);
      }
    }
    return c;
  }
  function bg(a, b, c) {
    var d = null;
    a.iter(b.line, c.line + 1, function(a) {
      if (a.markedSpans) {
        for (var b = 0;b < a.markedSpans.length;++b) {
          var c = a.markedSpans[b].marker;
          !c.readOnly || d && -1 != D(d, c) || (d || (d = [])).push(c);
        }
      }
    });
    if (!d) {
      return null;
    }
    a = [{from:b, to:c}];
    for (b = 0;b < d.length;++b) {
      c = d[b];
      for (var e = c.find(0), f = 0;f < a.length;++f) {
        var g = a[f];
        if (!(0 > y(g.to, e.from) || 0 < y(g.from, e.to))) {
          var h = [f, 1], k = y(g.from, e.from), l = y(g.to, e.to);
          (0 > k || !c.inclusiveLeft && !k) && h.push({from:g.from, to:e.from});
          (0 < l || !c.inclusiveRight && !l) && h.push({from:e.to, to:g.to});
          a.splice.apply(a, h);
          f += h.length - 1;
        }
      }
    }
    return a;
  }
  function Ye(a) {
    var b = a.markedSpans;
    if (b) {
      for (var c = 0;c < b.length;++c) {
        b[c].marker.detachLine(a);
      }
      a.markedSpans = null;
    }
  }
  function Ze(a, b) {
    if (b) {
      for (var c = 0;c < b.length;++c) {
        b[c].marker.attachLine(a);
      }
      a.markedSpans = b;
    }
  }
  function $e(a, b) {
    var c = a.lines.length - b.lines.length;
    if (0 != c) {
      return c;
    }
    var c = a.find(), d = b.find(), e = y(c.from, d.from) || (a.inclusiveLeft ? -1 : 0) - (b.inclusiveLeft ? -1 : 0);
    return e ? -e : (c = y(c.to, d.to) || (a.inclusiveRight ? 1 : 0) - (b.inclusiveRight ? 1 : 0)) ? c : b.id - a.id;
  }
  function za(a, b) {
    var c = sa && a.markedSpans, d;
    if (c) {
      for (var e, f = 0;f < c.length;++f) {
        e = c[f], e.marker.collapsed && null == (b ? e.from : e.to) && (!d || 0 > $e(d, e.marker)) && (d = e.marker);
      }
    }
    return d;
  }
  function Ve(a, b, c, d, e) {
    a = t(a, b);
    if (a = sa && a.markedSpans) {
      for (b = 0;b < a.length;++b) {
        var f = a[b];
        if (f.marker.collapsed) {
          var g = f.marker.find(0), h = y(g.from, c) || (f.marker.inclusiveLeft ? -1 : 0) - (e.inclusiveLeft ? -1 : 0), k = y(g.to, d) || (f.marker.inclusiveRight ? 1 : 0) - (e.inclusiveRight ? 1 : 0);
          if (!(0 <= h && 0 >= k || 0 >= h && 0 <= k) && (0 >= h && (0 < y(g.to, c) || f.marker.inclusiveRight && e.inclusiveLeft) || 0 <= h && (0 > y(g.from, d) || f.marker.inclusiveLeft && e.inclusiveRight))) {
            return !0;
          }
        }
      }
    }
  }
  function ja(a) {
    for (var b;b = za(a, !0);) {
      a = b.find(-1, !0).line;
    }
    return a;
  }
  function Nc(a, b) {
    var c = t(a, b), d = ja(c);
    return c == d ? b : F(d);
  }
  function Ld(a, b) {
    if (b > a.lastLine()) {
      return b;
    }
    var c = t(a, b), d;
    if (!xa(a, c)) {
      return b;
    }
    for (;d = za(c, !1);) {
      c = d.find(1, !0).line;
    }
    return F(c) + 1;
  }
  function xa(a, b) {
    var c = sa && b.markedSpans;
    if (c) {
      for (var d, e = 0;e < c.length;++e) {
        if (d = c[e], d.marker.collapsed && (null == d.from || !d.marker.widgetNode && 0 == d.from && d.marker.inclusiveLeft && td(a, b, d))) {
          return !0;
        }
      }
    }
  }
  function td(a, b, c) {
    if (null == c.to) {
      return b = c.marker.find(1, !0), td(a, b.line, zb(b.line.markedSpans, c.marker));
    }
    if (c.marker.inclusiveRight && c.to == b.text.length) {
      return !0;
    }
    for (var d, e = 0;e < b.markedSpans.length;++e) {
      if (d = b.markedSpans[e], d.marker.collapsed && !d.marker.widgetNode && d.from == c.to && (null == d.to || d.to != c.from) && (d.marker.inclusiveLeft || c.marker.inclusiveRight) && td(a, b, d)) {
        return !0;
      }
    }
  }
  function vb(a) {
    if (null != a.height) {
      return a.height;
    }
    var b = a.doc.cm;
    if (!b) {
      return 0;
    }
    if (!Wc(document.body, a.node)) {
      var c = "position: relative;";
      a.coverGutter && (c += "margin-left: -" + b.display.gutters.offsetWidth + "px;");
      a.noHScroll && (c += "width: " + b.display.wrapper.clientWidth + "px;");
      S(b.display.measure, r("div", [a.node], null, c));
    }
    return a.height = a.node.parentNode.offsetHeight;
  }
  function hg(a, b, c, d) {
    var e = new sc(a, c, d), f = a.cm;
    f && e.noHScroll && (f.display.alignWidgets = !0);
    nc(a, b, "widget", function(b) {
      var c = b.widgets || (b.widgets = []);
      null == e.insertAt ? c.push(e) : c.splice(Math.min(c.length - 1, Math.max(0, e.insertAt)), 0, e);
      e.line = b;
      f && !xa(a, b) && (c = fa(b) < a.scrollTop, da(b, b.height + vb(e)), c && lc(f, null, e.height), f.curOp.forceUpdate = !0);
      return !0;
    });
    return e;
  }
  function af(a, b) {
    if (a) {
      for (;;) {
        var c = a.match(/(?:^|\s+)line-(background-)?(\S+)/);
        if (!c) {
          break;
        }
        a = a.slice(0, c.index) + a.slice(c.index + c[0].length);
        var d = c[1] ? "bgClass" : "textClass";
        null == b[d] ? b[d] = c[2] : (new RegExp("(?:^|s)" + c[2] + "(?:$|s)")).test(b[d]) || (b[d] += " " + c[2]);
      }
    }
    return a;
  }
  function bf(a, b) {
    if (a.blankLine) {
      return a.blankLine(b);
    }
    if (a.innerMode) {
      var c = n.innerMode(a, b);
      if (c.mode.blankLine) {
        return c.mode.blankLine(c.state);
      }
    }
  }
  function ud(a, b, c, d) {
    for (var e = 0;10 > e;e++) {
      d && (d[0] = n.innerMode(a, c).mode);
      var f = a.token(b, c);
      if (b.pos > b.start) {
        return f;
      }
    }
    throw Error("Mode " + a.name + " failed to advance stream.");
  }
  function cf(a, b, c, d) {
    function e(a) {
      return {start:m.start, end:m.pos, string:m.current(), type:h || null, state:a ? ta(f.mode, l) : l};
    }
    var f = a.doc, g = f.mode, h;
    b = x(f, b);
    var k = t(f, b.line), l = tb(a, b.line, c), m = new tc(k.text, a.options.tabSize), u;
    for (d && (u = []);(d || m.pos < b.ch) && !m.eol();) {
      m.start = m.pos, h = ud(g, m, l), d && u.push(e(!0));
    }
    return d ? u : e();
  }
  function df(a, b, c, d, e, f, g) {
    var h = c.flattenSpans;
    null == h && (h = a.options.flattenSpans);
    var k = 0, l = null, m = new tc(b, a.options.tabSize), u, p = a.options.addModeClass && [null];
    for ("" == b && af(bf(c, d), f);!m.eol();) {
      m.pos > a.options.maxHighlightLength ? (h = !1, g && $c(a, b, d, m.pos), m.pos = b.length, u = null) : u = af(ud(c, m, d, p), f);
      if (p) {
        var n = p[0].name;
        n && (u = "m-" + (u ? n + " " + u : n));
      }
      if (!h || l != u) {
        for (;k < m.start;) {
          k = Math.min(m.start, k + 5E4), e(k, l);
        }
        l = u;
      }
      m.start = m.pos;
    }
    for (;k < m.pos;) {
      a = Math.min(m.pos, k + 5E4), e(a, l), k = a;
    }
  }
  function oe(a, b, c, d) {
    var e = [a.state.modeGen], f = {};
    df(a, b.text, a.doc.mode, c, function(a, b) {
      e.push(a, b);
    }, f, d);
    for (c = 0;c < a.state.overlays.length;++c) {
      var g = a.state.overlays[c], h = 1, k = 0;
      df(a, b.text, g.mode, !0, function(a, b) {
        for (var c = h;k < a;) {
          var d = e[h];
          d > a && e.splice(h, 1, a, e[h + 1], d);
          h += 2;
          k = Math.min(a, d);
        }
        if (b) {
          if (g.opaque) {
            e.splice(c, h - c, a, "cm-overlay " + b), h = c + 2;
          } else {
            for (;c < h;c += 2) {
              d = e[c + 1], e[c + 1] = (d ? d + " " : "") + "cm-overlay " + b;
            }
          }
        }
      }, f);
    }
    return {styles:e, classes:f.bgClass || f.textClass ? f : null};
  }
  function ef(a, b, c) {
    if (!b.styles || b.styles[0] != a.state.modeGen) {
      var d = tb(a, F(b)), e = oe(a, b, b.text.length > a.options.maxHighlightLength ? ta(a.doc.mode, d) : d);
      b.stateAfter = d;
      b.styles = e.styles;
      e.classes ? b.styleClasses = e.classes : b.styleClasses && (b.styleClasses = null);
      c === a.doc.frontier && a.doc.frontier++;
    }
    return b.styles;
  }
  function $c(a, b, c, d) {
    var e = a.doc.mode;
    a = new tc(b, a.options.tabSize);
    a.start = a.pos = d || 0;
    for ("" == b && bf(e, c);!a.eol();) {
      ud(e, a, c), a.start = a.pos;
    }
  }
  function ff(a, b) {
    if (!a || /^\s*$/.test(a)) {
      return null;
    }
    var c = b.addModeClass ? ig : jg;
    return c[a] || (c[a] = a.replace(/\S+/g, "cm-$&"));
  }
  function Sd(a, b) {
    var c = r("span", null, null, K ? "padding-right: .1px" : null), c = {pre:r("pre", [c], "CodeMirror-line"), content:c, col:0, pos:0, cm:a, splitSpaces:(B || K) && a.getOption("lineWrapping")};
    b.measure = {};
    for (var d = 0;d <= (b.rest ? b.rest.length : 0);d++) {
      var e = d ? b.rest[d - 1] : b.line, f;
      c.pos = 0;
      c.addToken = kg;
      var g;
      if (null != vd) {
        g = vd;
      } else {
        g = S(a.display.measure, document.createTextNode("A\u062eA"));
        var h = Da(g, 0, 1).getBoundingClientRect();
        g = h && h.left != h.right ? vd = 3 > Da(g, 1, 2).getBoundingClientRect().right - h.right : !1;
      }
      g && (f = Z(e)) && (c.addToken = lg(c.addToken, f));
      c.map = [];
      h = b != a.display.externalMeasured && F(e);
      a: {
        g = c;
        var h = ef(a, e, h), k = e.markedSpans, l = e.text, m = 0;
        if (k) {
          for (var u = l.length, p = 0, n = 1, q = "", t = void 0, v = void 0, w = 0, x = void 0, y = void 0, A = void 0, C = void 0, z = void 0;;) {
            if (w == p) {
              for (var x = y = A = C = v = "", z = null, w = Infinity, G = [], H, D = 0;D < k.length;++D) {
                var I = k[D], E = I.marker;
                "bookmark" == E.type && I.from == p && E.widgetNode ? G.push(E) : I.from <= p && (null == I.to || I.to > p || E.collapsed && I.to == p && I.from == p) ? (null != I.to && I.to != p && w > I.to && (w = I.to, y = ""), E.className && (x += " " + E.className), E.css && (v = (v ? v + ";" : "") + E.css), E.startStyle && I.from == p && (A += " " + E.startStyle), E.endStyle && I.to == w && (H || (H = [])).push(E.endStyle, I.to), E.title && !C && (C = E.title), E.collapsed && (!z || 0 > $e(z.marker, 
                E)) && (z = I)) : I.from > p && w > I.from && (w = I.from);
              }
              if (H) {
                for (D = 0;D < H.length;D += 2) {
                  H[D + 1] == w && (y += " " + H[D]);
                }
              }
              if (z && (z.from || 0) == p) {
                gf(g, (null == z.to ? u + 1 : z.to) - p, z.marker, null == z.from);
                if (null == z.to) {
                  break a;
                }
                z.to == p && (z = !1);
              }
              if (!z && G.length) {
                for (D = 0;D < G.length;++D) {
                  gf(g, 0, G[D]);
                }
              }
            }
            if (p >= u) {
              break;
            }
            for (G = Math.min(u, w);;) {
              if (q) {
                D = p + q.length;
                z || (I = D > G ? q.slice(0, G - p) : q, g.addToken(g, I, t ? t + x : x, A, p + I.length == w ? y : "", C, v));
                if (D >= G) {
                  q = q.slice(G - p);
                  p = G;
                  break;
                }
                p = D;
                A = "";
              }
              q = l.slice(m, m = h[n++]);
              t = ff(h[n++], g.cm.options);
            }
          }
        } else {
          for (var n = 1;n < h.length;n += 2) {
            g.addToken(g, l.slice(m, m = h[n]), ff(h[n + 1], g.cm.options));
          }
        }
      }
      e.styleClasses && (e.styleClasses.bgClass && (c.bgClass = wd(e.styleClasses.bgClass, c.bgClass || "")), e.styleClasses.textClass && (c.textClass = wd(e.styleClasses.textClass, c.textClass || "")));
      0 == c.map.length && c.map.push(0, 0, c.content.appendChild(mg(a.display.measure)));
      0 == d ? (b.measure.map = c.map, b.measure.cache = {}) : ((b.measure.maps || (b.measure.maps = [])).push(c.map), (b.measure.caches || (b.measure.caches = [])).push({}));
    }
    K && /\bcm-tab\b/.test(c.content.lastChild.className) && (c.content.className = "cm-tab-wrap-hack");
    J(a, "renderLine", a, b.line, c.pre);
    c.pre.className && (c.textClass = wd(c.pre.className, c.textClass || ""));
    return c;
  }
  function kg(a, b, c, d, e, f, g) {
    if (b) {
      var h = a.splitSpaces ? b.replace(/ {3,}/g, ng) : b, k = a.cm.state.specialChars, l = !1;
      if (k.test(b)) {
        for (var m = document.createDocumentFragment(), n = 0;;) {
          k.lastIndex = n;
          var p = k.exec(b), q = p ? p.index - n : b.length - n;
          if (q) {
            var t = document.createTextNode(h.slice(n, n + q));
            B && 9 > C ? m.appendChild(r("span", [t])) : m.appendChild(t);
            a.map.push(a.pos, a.pos + q, t);
            a.col += q;
            a.pos += q;
          }
          if (!p) {
            break;
          }
          n += q + 1;
          "\t" == p[0] ? (t = a.cm.options.tabSize, p = t - a.col % t, t = m.appendChild(r("span", Se(p), "cm-tab")), t.setAttribute("role", "presentation"), t.setAttribute("cm-text", "\t"), a.col += p) : ("\r" == p[0] || "\n" == p[0] ? (t = m.appendChild(r("span", "\r" == p[0] ? "\u240d" : "\u2424", "cm-invalidchar")), t.setAttribute("cm-text", p[0])) : (t = a.cm.options.specialCharPlaceholder(p[0]), t.setAttribute("cm-text", p[0]), B && 9 > C ? m.appendChild(r("span", [t])) : m.appendChild(t)), 
          a.col += 1);
          a.map.push(a.pos, a.pos + 1, t);
          a.pos++;
        }
      } else {
        a.col += b.length;
        var m = document.createTextNode(h);
        a.map.push(a.pos, a.pos + b.length, m);
        B && 9 > C && (l = !0);
        a.pos += b.length;
      }
      if (c || d || e || l || g) {
        return b = c || "", d && (b += d), e && (b += e), d = r("span", [m], b, g), f && (d.title = f), a.content.appendChild(d);
      }
      a.content.appendChild(m);
    }
  }
  function ng(a) {
    for (var b = " ", c = 0;c < a.length - 2;++c) {
      b += c % 2 ? " " : "\u00a0";
    }
    return b + " ";
  }
  function lg(a, b) {
    return function(c, d, e, f, g, h, k) {
      e = e ? e + " cm-force-border" : "cm-force-border";
      for (var l = c.pos, m = l + d.length;;) {
        for (var n = 0;n < b.length;n++) {
          var p = b[n];
          if (p.to > l && p.from <= l) {
            break;
          }
        }
        if (p.to >= m) {
          return a(c, d, e, f, g, h, k);
        }
        a(c, d.slice(0, p.to - l), e, f, null, h, k);
        f = null;
        d = d.slice(p.to - l);
        l = p.to;
      }
    };
  }
  function gf(a, b, c, d) {
    var e = !d && c.widgetNode;
    e && a.map.push(a.pos, a.pos + b, e);
    !d && a.cm.display.input.needsContentAttribute && (e || (e = a.content.appendChild(document.createElement("span"))), e.setAttribute("cm-marker", c.id));
    e && (a.cm.display.input.setUneditable(e), a.content.appendChild(e));
    a.pos += b;
  }
  function Re(a, b) {
    return 0 == b.from.ch && 0 == b.to.ch && "" == A(b.text) && (!a.cm || a.cm.options.wholeLineUpdateBefore);
  }
  function qd(a, b, c, d) {
    function e(a, c, e) {
      a.text = c;
      a.stateAfter && (a.stateAfter = null);
      a.styles && (a.styles = null);
      null != a.order && (a.order = null);
      Ye(a);
      Ze(a, e);
      c = d ? d(a) : 1;
      c != a.height && da(a, c);
      Q(a, "change", a, b);
    }
    function f(a, b) {
      for (var e = a, f = [];e < b;++e) {
        f.push(new Ab(k[e], c ? c[e] : null, d));
      }
      return f;
    }
    var g = b.from, h = b.to, k = b.text, l = t(a, g.line), m = t(a, h.line), n = A(k), p = c ? c[k.length - 1] : null, q = h.line - g.line;
    if (b.full) {
      a.insert(0, f(0, k.length)), a.remove(k.length, a.size - k.length);
    } else {
      if (Re(a, b)) {
        var r = f(0, k.length - 1);
        e(m, m.text, p);
        q && a.remove(g.line, q);
        r.length && a.insert(g.line, r);
      } else {
        l == m ? 1 == k.length ? e(l, l.text.slice(0, g.ch) + n + l.text.slice(h.ch), p) : (r = f(1, k.length - 1), r.push(new Ab(n + l.text.slice(h.ch), p, d)), e(l, l.text.slice(0, g.ch) + k[0], c ? c[0] : null), a.insert(g.line + 1, r)) : 1 == k.length ? (e(l, l.text.slice(0, g.ch) + k[0] + m.text.slice(h.ch), c ? c[0] : null), a.remove(g.line + 1, q)) : (e(l, l.text.slice(0, g.ch) + k[0], c ? c[0] : null), e(m, n + m.text.slice(h.ch), p), r = f(1, k.length - 1), 1 < q && a.remove(g.line + 1, 
        q - 1), a.insert(g.line + 1, r));
      }
    }
    Q(a, "change", a, b);
  }
  function Bb(a) {
    this.lines = a;
    this.parent = null;
    for (var b = 0, c = 0;b < a.length;++b) {
      a[b].parent = this, c += a[b].height;
    }
    this.height = c;
  }
  function Cb(a) {
    this.children = a;
    for (var b = 0, c = 0, d = 0;d < a.length;++d) {
      var e = a[d], b = b + e.chunkSize(), c = c + e.height;
      e.parent = this;
    }
    this.size = b;
    this.height = c;
    this.parent = null;
  }
  function Ha(a, b, c) {
    function d(a, f, g) {
      if (a.linked) {
        for (var h = 0;h < a.linked.length;++h) {
          var k = a.linked[h];
          if (k.doc != f) {
            var l = g && k.sharedHist;
            if (!c || l) {
              b(k.doc, l), d(k.doc, a, l);
            }
          }
        }
      }
    }
    d(a, null, !0);
  }
  function Ed(a, b) {
    if (b.cm) {
      throw Error("This document is already in use.");
    }
    a.doc = b;
    b.cm = a;
    Bc(a);
    Ac(a);
    a.options.lineWrapping || Ec(a);
    a.options.mode = b.modeOption;
    N(a);
  }
  function t(a, b) {
    b -= a.first;
    if (0 > b || b >= a.size) {
      throw Error("There is no line " + (b + a.first) + " in the document.");
    }
    for (var c = a;!c.lines;) {
      for (var d = 0;;++d) {
        var e = c.children[d], f = e.chunkSize();
        if (b < f) {
          c = e;
          break;
        }
        b -= f;
      }
    }
    return c.lines[b];
  }
  function Ca(a, b, c) {
    var d = [], e = b.line;
    a.iter(b.line, c.line + 1, function(a) {
      a = a.text;
      e == c.line && (a = a.slice(0, c.ch));
      e == b.line && (a = a.slice(b.ch));
      d.push(a);
      ++e;
    });
    return d;
  }
  function xd(a, b, c) {
    var d = [];
    a.iter(b, c, function(a) {
      d.push(a.text);
    });
    return d;
  }
  function da(a, b) {
    var c = b - a.height;
    if (c) {
      for (var d = a;d;d = d.parent) {
        d.height += c;
      }
    }
  }
  function F(a) {
    if (null == a.parent) {
      return null;
    }
    var b = a.parent;
    a = D(b.lines, a);
    for (var c = b.parent;c;b = c, c = c.parent) {
      for (var d = 0;c.children[d] != b;++d) {
        a += c.children[d].chunkSize();
      }
    }
    return a + b.first;
  }
  function Aa(a, b) {
    var c = a.first;
    a: do {
      for (var d = 0;d < a.children.length;++d) {
        var e = a.children[d], f = e.height;
        if (b < f) {
          a = e;
          continue a;
        }
        b -= f;
        c += e.chunkSize();
      }
      return c;
    } while (!a.lines);
    for (d = 0;d < a.lines.length;++d) {
      e = a.lines[d].height;
      if (b < e) {
        break;
      }
      b -= e;
    }
    return c + d;
  }
  function fa(a) {
    a = ja(a);
    for (var b = 0, c = a.parent, d = 0;d < c.lines.length;++d) {
      var e = c.lines[d];
      if (e == a) {
        break;
      } else {
        b += e.height;
      }
    }
    for (a = c.parent;a;c = a, a = c.parent) {
      for (d = 0;d < a.children.length && (e = a.children[d], e != c);++d) {
        b += e.height;
      }
    }
    return b;
  }
  function Z(a) {
    var b = a.order;
    null == b && (b = a.order = og(a.text));
    return b;
  }
  function uc(a) {
    this.done = [];
    this.undone = [];
    this.undoDepth = Infinity;
    this.lastModTime = this.lastSelTime = 0;
    this.lastOrigin = this.lastSelOrigin = this.lastOp = this.lastSelOp = null;
    this.generation = this.maxGeneration = a || 1;
  }
  function pd(a, b) {
    var c = {from:Sc(b.from), to:Ga(b), text:Ca(a, b.from, b.to)};
    hf(a, c, b.from.line, b.to.line + 1);
    Ha(a, function(a) {
      hf(a, c, b.from.line, b.to.line + 1);
    }, !0);
    return c;
  }
  function fe(a) {
    for (;a.length;) {
      if (A(a).ranges) {
        a.pop();
      } else {
        break;
      }
    }
  }
  function Ne(a, b, c, d) {
    var e = a.history;
    e.undone.length = 0;
    var f = +new Date, g, h;
    if (h = e.lastOp == d || e.lastOrigin == b.origin && b.origin && ("+" == b.origin.charAt(0) && a.cm && e.lastModTime > f - a.cm.options.historyEventDelay || "*" == b.origin.charAt(0))) {
      e.lastOp == d ? (fe(e.done), g = A(e.done)) : e.done.length && !A(e.done).ranges ? g = A(e.done) : 1 < e.done.length && !e.done[e.done.length - 2].ranges ? (e.done.pop(), g = A(e.done)) : g = void 0, h = g;
    }
    if (h) {
      var k = A(g.changes);
      0 == y(b.from, b.to) && 0 == y(b.from, k.to) ? k.to = Ga(b) : g.changes.push(pd(a, b));
    } else {
      for ((g = A(e.done)) && g.ranges || Wb(a.sel, e.done), g = {changes:[pd(a, b)], generation:e.generation}, e.done.push(g);e.done.length > e.undoDepth;) {
        e.done.shift(), e.done[0].ranges || e.done.shift();
      }
    }
    e.done.push(c);
    e.generation = ++e.maxGeneration;
    e.lastModTime = e.lastSelTime = f;
    e.lastOp = e.lastSelOp = d;
    e.lastOrigin = e.lastSelOrigin = b.origin;
    k || J(a, "historyAdded");
  }
  function Wb(a, b) {
    var c = A(b);
    c && c.ranges && c.equals(a) || b.push(a);
  }
  function hf(a, b, c, d) {
    var e = b["spans_" + a.id], f = 0;
    a.iter(Math.max(a.first, c), Math.min(a.first + a.size, d), function(c) {
      c.markedSpans && ((e || (e = b["spans_" + a.id] = {}))[f] = c.markedSpans);
      ++f;
    });
  }
  function gg(a) {
    if (!a) {
      return null;
    }
    for (var b = 0, c;b < a.length;++b) {
      a[b].marker.explicitlyCleared ? c || (c = a.slice(0, b)) : c && c.push(a[b]);
    }
    return c ? c.length ? c : null : a;
  }
  function Za(a, b, c) {
    for (var d = 0, e = [];d < a.length;++d) {
      var f = a[d];
      if (f.ranges) {
        e.push(c ? la.prototype.deepCopy.call(f) : f);
      } else {
        var f = f.changes, g = [];
        e.push({changes:g});
        for (var h = 0;h < f.length;++h) {
          var k = f[h], l;
          g.push({from:k.from, to:k.to, text:k.text});
          if (b) {
            for (var m in k) {
              (l = m.match(/^spans_(\d+)$/)) && -1 < D(b, Number(l[1])) && (A(g)[m] = k[m], delete k[m]);
            }
          }
        }
      }
    }
    return e;
  }
  function jf(a, b, c, d) {
    c < a.line ? a.line += d : b < a.line && (a.line = b, a.ch = 0);
  }
  function kf(a, b, c, d) {
    for (var e = 0;e < a.length;++e) {
      var f = a[e], g = !0;
      if (f.ranges) {
        f.copied || (f = a[e] = f.deepCopy(), f.copied = !0);
        for (var h = 0;h < f.ranges.length;h++) {
          jf(f.ranges[h].anchor, b, c, d), jf(f.ranges[h].head, b, c, d);
        }
      } else {
        for (h = 0;h < f.changes.length;++h) {
          var k = f.changes[h];
          if (c < k.from.line) {
            k.from = q(k.from.line + d, k.from.ch), k.to = q(k.to.line + d, k.to.ch);
          } else {
            if (b <= k.to.line) {
              g = !1;
              break;
            }
          }
        }
        g || (a.splice(0, e + 1), e = 0);
      }
    }
  }
  function Oe(a, b) {
    var c = b.from.line, d = b.to.line, e = b.text.length - (d - c) - 1;
    kf(a.done, c, d, e);
    kf(a.undone, c, d, e);
  }
  function ld(a) {
    return null != a.defaultPrevented ? a.defaultPrevented : 0 == a.returnValue;
  }
  function Ce(a) {
    var b = a.which;
    null == b && (a.button & 1 ? b = 1 : a.button & 2 ? b = 3 : a.button & 4 && (b = 2));
    Y && a.ctrlKey && 1 == b && (b = 3);
    return b;
  }
  function vc(a, b, c) {
    a = a._handlers && a._handlers[b];
    return c ? a && 0 < a.length ? a.slice() : lf : a || lf;
  }
  function Q(a, b) {
    function c(a) {
      return function() {
        a.apply(null, e);
      };
    }
    var d = vc(a, b, !1);
    if (d.length) {
      var e = Array.prototype.slice.call(arguments, 2), f;
      Va ? f = Va.delayedCallbacks : Db ? f = Db : (f = Db = [], setTimeout(pg, 0));
      for (var g = 0;g < d.length;++g) {
        f.push(c(d[g]));
      }
    }
  }
  function pg() {
    var a = Db;
    Db = null;
    for (var b = 0;b < a.length;++b) {
      a[b]();
    }
  }
  function O(a, b, c) {
    "string" == typeof b && (b = {type:b, preventDefault:function() {
      this.defaultPrevented = !0;
    }});
    J(a, c || b.type, a, b);
    return ld(b) || b.codemirrorIgnore;
  }
  function ie(a) {
    var b = a._handlers && a._handlers.cursorActivity;
    if (b) {
      a = a.curOp.cursorActivityHandlers || (a.curOp.cursorActivityHandlers = []);
      for (var c = 0;c < b.length;++c) {
        -1 == D(a, b[c]) && a.push(b[c]);
      }
    }
  }
  function W(a, b) {
    return 0 < vc(a, b).length;
  }
  function $a(a) {
    a.prototype.on = function(a, c) {
      v(this, a, c);
    };
    a.prototype.off = function(a, c) {
      ka(this, a, c);
    };
  }
  function va() {
    this.id = null;
  }
  function Se(a) {
    for (;wc.length <= a;) {
      wc.push(A(wc) + " ");
    }
    return wc[a];
  }
  function A(a) {
    return a[a.length - 1];
  }
  function D(a, b) {
    for (var c = 0;c < a.length;++c) {
      if (a[c] == b) {
        return c;
      }
    }
    return -1;
  }
  function Rb(a, b) {
    for (var c = [], d = 0;d < a.length;d++) {
      c[d] = b(a[d], d);
    }
    return c;
  }
  function Eb() {
  }
  function mf(a, b) {
    var c;
    Object.create ? c = Object.create(a) : (Eb.prototype = a, c = new Eb);
    b && X(b, c);
    return c;
  }
  function X(a, b, c) {
    b || (b = {});
    for (var d in a) {
      !a.hasOwnProperty(d) || !1 === c && b.hasOwnProperty(d) || (b[d] = a[d]);
    }
    return b;
  }
  function db(a) {
    var b = Array.prototype.slice.call(arguments, 1);
    return function() {
      return a.apply(null, b);
    };
  }
  function oc(a, b) {
    return b ? -1 < b.source.indexOf("\\w") && nf(a) ? !0 : b.test(a) : nf(a);
  }
  function of(a) {
    for (var b in a) {
      if (a.hasOwnProperty(b) && a[b]) {
        return !1;
      }
    }
    return !0;
  }
  function ub(a) {
    return 768 <= a.charCodeAt(0) && qg.test(a);
  }
  function r(a, b, c, d) {
    a = document.createElement(a);
    c && (a.className = c);
    d && (a.style.cssText = d);
    if ("string" == typeof b) {
      a.appendChild(document.createTextNode(b));
    } else {
      if (b) {
        for (c = 0;c < b.length;++c) {
          a.appendChild(b[c]);
        }
      }
    }
    return a;
  }
  function ya(a) {
    for (var b = a.childNodes.length;0 < b;--b) {
      a.removeChild(a.firstChild);
    }
    return a;
  }
  function S(a, b) {
    return ya(a).appendChild(b);
  }
  function ga() {
    for (var a = document.activeElement;a && a.root && a.root.activeElement;) {
      a = a.root.activeElement;
    }
    return a;
  }
  function Fb(a) {
    return new RegExp("(^|\\s)" + a + "(?:$|\\s)\\s*");
  }
  function wd(a, b) {
    for (var c = a.split(" "), d = 0;d < c.length;d++) {
      c[d] && !Fb(c[d]).test(b) && (b += " " + c[d]);
    }
    return b;
  }
  function pf(a) {
    if (document.body.getElementsByClassName) {
      for (var b = document.body.getElementsByClassName("CodeMirror"), c = 0;c < b.length;c++) {
        var d = b[c].CodeMirror;
        d && a(d);
      }
    }
  }
  function Af() {
    var a;
    v(window, "resize", function() {
      null == a && (a = setTimeout(function() {
        a = null;
        pf(Qf);
      }, 100));
    });
    v(window, "blur", function() {
      pf(eb);
    });
  }
  function mg(a) {
    if (null == yd) {
      var b = r("span", "\u200b");
      S(a, r("span", [b, document.createTextNode("x")]));
      0 != a.firstChild.offsetHeight && (yd = 1 >= b.offsetWidth && 2 < b.offsetHeight && !(B && 8 > C));
    }
    a = yd ? r("span", "\u200b") : r("span", "\u00a0", null, "display: inline-block; width: 1px; margin-right: -1px");
    a.setAttribute("cm-text", "");
    return a;
  }
  function Hf(a, b, c, d) {
    if (!a) {
      return d(b, c, "ltr");
    }
    for (var e = !1, f = 0;f < a.length;++f) {
      var g = a[f];
      if (g.from < c && g.to > b || b == c && g.to == b) {
        d(Math.max(g.from, b), Math.min(g.to, c), 1 == g.level ? "rtl" : "ltr"), e = !0;
      }
    }
    e || d(b, c, "ltr");
  }
  function ed(a) {
    return a.level % 2 ? a.to : a.from;
  }
  function fd(a) {
    return a.level % 2 ? a.from : a.to;
  }
  function $b(a) {
    return (a = Z(a)) ? ed(a[0]) : 0;
  }
  function ac(a) {
    var b = Z(a);
    return b ? fd(A(b)) : a.text.length;
  }
  function qf(a, b) {
    var c = t(a.doc, b), d = ja(c);
    d != c && (b = F(d));
    d = (c = Z(d)) ? c[0].level % 2 ? ac(d) : $b(d) : 0;
    return q(b, d);
  }
  function rf(a, b) {
    var c = qf(a, b.line), d = t(a.doc, c.line), e = Z(d);
    return e && 0 != e[0].level ? c : (d = Math.max(0, d.text.search(/\S/)), q(c.line, b.line == c.line && b.ch <= d && b.ch ? 0 : d));
  }
  function Sb(a, b) {
    wb = null;
    for (var c = 0, d;c < a.length;++c) {
      var e = a[c];
      if (e.from < b && e.to > b) {
        return c;
      }
      if (e.from == b || e.to == b) {
        if (null == d) {
          d = c;
        } else {
          var f;
          f = e.level;
          var g = a[d].level, h = a[0].level;
          f = f == h ? !0 : g == h ? !1 : f < g;
          if (f) {
            return e.from != e.to && (wb = d), c;
          }
          e.from != e.to && (wb = c);
          break;
        }
      }
    }
    return d;
  }
  function zd(a, b, c, d) {
    if (!d) {
      return b + c;
    }
    do {
      b += c;
    } while (0 < b && ub(a.text.charAt(b)));
    return b;
  }
  function hd(a, b, c, d) {
    var e = Z(a);
    if (!e) {
      return Te(a, b, c, d);
    }
    var f = Sb(e, b), g = e[f];
    for (b = zd(a, b, g.level % 2 ? -c : c, d);;) {
      if (b > g.from && b < g.to) {
        return b;
      }
      if (b == g.from || b == g.to) {
        if (Sb(e, b) == f) {
          return b;
        }
        g = e[f + c];
        return 0 < c == g.level % 2 ? g.to : g.from;
      }
      g = e[f += c];
      if (!g) {
        return null;
      }
      b = 0 < c == g.level % 2 ? zd(a, g.to, -1, d) : zd(a, g.from, 1, d);
    }
  }
  function Te(a, b, c, d) {
    b += c;
    if (d) {
      for (;0 < b && ub(a.text.charAt(b));) {
        b += c;
      }
    }
    return 0 > b || b > a.text.length ? null : b;
  }
  var U = navigator.userAgent, sf = navigator.platform, pa = /gecko\/\d/i.test(U), tf = /MSIE \d/.test(U), uf = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(U), B = tf || uf, C = B && (tf ? document.documentMode || 6 : uf[1]), K = /WebKit\//.test(U), rg = K && /Qt\/\d+\.\d+/.test(U), sg = /Chrome\//.test(U), ca = /Opera\//.test(U), xe = /Apple Computer/.test(navigator.vendor), tg = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(U), Nf = /PhantomJS/.test(U), Sa = /AppleWebKit/.test(U) && /Mobile\/\w+/.test(U), 
  cb = Sa || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(U), Y = Sa || /Mac/.test(sf), ug = /win/i.test(sf), Ja = ca && U.match(/Version\/(\d*\.\d*)/);
  Ja && (Ja = Number(Ja[1]));
  Ja && 15 <= Ja && (ca = !1, K = !0);
  var vf = Y && (rg || ca && (null == Ja || 12.11 > Ja)), jd = pa || B && 9 <= C, Le = !1, sa = !1;
  Gc.prototype = X({update:function(a) {
    var b = a.scrollWidth > a.clientWidth + 1, c = a.scrollHeight > a.clientHeight + 1, d = a.nativeBarWidth;
    c ? (this.vert.style.display = "block", this.vert.style.bottom = b ? d + "px" : "0", this.vert.firstChild.style.height = Math.max(0, a.scrollHeight - a.clientHeight + (a.viewHeight - (b ? d : 0))) + "px") : (this.vert.style.display = "", this.vert.firstChild.style.height = "0");
    b ? (this.horiz.style.display = "block", this.horiz.style.right = c ? d + "px" : "0", this.horiz.style.left = a.barLeft + "px", this.horiz.firstChild.style.width = a.scrollWidth - a.clientWidth + (a.viewWidth - a.barLeft - (c ? d : 0)) + "px") : (this.horiz.style.display = "", this.horiz.firstChild.style.width = "0");
    !this.checkedZeroWidth && 0 < a.clientHeight && (0 == d && this.zeroWidthHack(), this.checkedZeroWidth = !0);
    return {right:c ? d : 0, bottom:b ? d : 0};
  }, setScrollLeft:function(a) {
    this.horiz.scrollLeft != a && (this.horiz.scrollLeft = a);
    this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz);
  }, setScrollTop:function(a) {
    this.vert.scrollTop != a && (this.vert.scrollTop = a);
    this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert);
  }, zeroWidthHack:function() {
    this.horiz.style.height = this.vert.style.width = Y && !tg ? "12px" : "18px";
    this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none";
    this.disableHoriz = new va;
    this.disableVert = new va;
  }, enableZeroWidthBar:function(a, b) {
    function c() {
      var d = a.getBoundingClientRect();
      document.elementFromPoint(d.left + 1, d.bottom - 1) != a ? a.style.pointerEvents = "none" : b.set(1E3, c);
    }
    a.style.pointerEvents = "auto";
    b.set(1E3, c);
  }, clear:function() {
    var a = this.horiz.parentNode;
    a.removeChild(this.horiz);
    a.removeChild(this.vert);
  }}, Gc.prototype);
  Hc.prototype = X({update:function() {
    return {bottom:0, right:0};
  }, setScrollLeft:function() {
  }, setScrollTop:function() {
  }, clear:function() {
  }}, Hc.prototype);
  n.scrollbarModel = {"native":Gc, "null":Hc};
  Mb.prototype.signal = function(a, b) {
    W(a, b) && this.events.push(arguments);
  };
  Mb.prototype.finish = function() {
    for (var a = 0;a < this.events.length;a++) {
      J.apply(null, this.events[a]);
    }
  };
  var q = n.Pos = function(a, b) {
    if (!(this instanceof q)) {
      return new q(a, b);
    }
    this.line = a;
    this.ch = b;
  }, y = n.cmpPos = function(a, b) {
    return a.line - b.line || a.ch - b.ch;
  }, V = null;
  Tc.prototype = X({init:function(a) {
    function b(a) {
      if (d.somethingSelected()) {
        V = d.getSelections(), c.inaccurateSelection && (c.prevInput = "", c.inaccurateSelection = !1, f.value = V.join("\n"), ab(f));
      } else {
        if (d.options.lineWiseCopyCut) {
          var b = Xd(d);
          V = b.text;
          "cut" == a.type ? d.setSelections(b.ranges, null, ia) : (c.prevInput = "", f.value = b.text.join("\n"), ab(f));
        } else {
          return;
        }
      }
      "cut" == a.type && (d.state.cutIncoming = !0);
    }
    var c = this, d = this.cm, e = this.wrapper = Zd(), f = this.textarea = e.firstChild;
    a.wrapper.insertBefore(e, a.wrapper.firstChild);
    Sa && (f.style.width = "0px");
    v(f, "input", function() {
      B && 9 <= C && c.hasSelection && (c.hasSelection = null);
      c.poll();
    });
    v(f, "paste", function(a) {
      O(d, a) || Wd(a, d) || (d.state.pasteIncoming = !0, c.fastPoll());
    });
    v(f, "cut", b);
    v(f, "copy", b);
    v(a.scroller, "paste", function(b) {
      oa(a, b) || O(d, b) || (d.state.pasteIncoming = !0, c.focus());
    });
    v(a.lineSpace, "selectstart", function(b) {
      oa(a, b) || M(b);
    });
    v(f, "compositionstart", function() {
      var a = d.getCursor("from");
      c.composing && c.composing.range.clear();
      c.composing = {start:a, range:d.markText(a, d.getCursor("to"), {className:"CodeMirror-composing"})};
    });
    v(f, "compositionend", function() {
      c.composing && (c.poll(), c.composing.range.clear(), c.composing = null);
    });
  }, prepareSelection:function() {
    var a = this.cm, b = a.display, c = a.doc, d = le(a);
    if (a.options.moveInputWithCursor) {
      var a = ma(a, c.sel.primary().head, "div"), c = b.wrapper.getBoundingClientRect(), e = b.lineDiv.getBoundingClientRect();
      d.teTop = Math.max(0, Math.min(b.wrapper.clientHeight - 10, a.top + e.top - c.top));
      d.teLeft = Math.max(0, Math.min(b.wrapper.clientWidth - 10, a.left + e.left - c.left));
    }
    return d;
  }, showSelection:function(a) {
    var b = this.cm.display;
    S(b.cursorDiv, a.cursors);
    S(b.selectionDiv, a.selection);
    null != a.teTop && (this.wrapper.style.top = a.teTop + "px", this.wrapper.style.left = a.teLeft + "px");
  }, reset:function(a) {
    if (!this.contextMenuPending) {
      var b, c, d = this.cm, e = d.doc;
      d.somethingSelected() ? (this.prevInput = "", b = e.sel.primary(), c = (b = He && (100 < b.to().line - b.from().line || 1E3 < (c = d.getSelection()).length)) ? "-" : c || d.getSelection(), this.textarea.value = c, d.state.focused && ab(this.textarea), B && 9 <= C && (this.hasSelection = c)) : a || (this.prevInput = this.textarea.value = "", B && 9 <= C && (this.hasSelection = null));
      this.inaccurateSelection = b;
    }
  }, getField:function() {
    return this.textarea;
  }, supportsTouch:function() {
    return !1;
  }, focus:function() {
    if ("nocursor" != this.cm.options.readOnly && (!cb || ga() != this.textarea)) {
      try {
        this.textarea.focus();
      } catch (a) {
      }
    }
  }, blur:function() {
    this.textarea.blur();
  }, resetPosition:function() {
    this.wrapper.style.top = this.wrapper.style.left = 0;
  }, receivedFocus:function() {
    this.slowPoll();
  }, slowPoll:function() {
    var a = this;
    a.pollingFast || a.polling.set(this.cm.options.pollInterval, function() {
      a.poll();
      a.cm.state.focused && a.slowPoll();
    });
  }, fastPoll:function() {
    function a() {
      c.poll() || b ? (c.pollingFast = !1, c.slowPoll()) : (b = !0, c.polling.set(60, a));
    }
    var b = !1, c = this;
    c.pollingFast = !0;
    c.polling.set(20, a);
  }, poll:function() {
    var a = this.cm, b = this.textarea, c = this.prevInput;
    if (this.contextMenuPending || !a.state.focused || vg(b) && !c && !this.composing || a.isReadOnly() || a.options.disableInput || a.state.keySeq) {
      return !1;
    }
    var d = b.value;
    if (d == c && !a.somethingSelected()) {
      return !1;
    }
    if (B && 9 <= C && this.hasSelection === d || Y && /[\uf700-\uf7ff]/.test(d)) {
      return a.display.input.reset(), !1;
    }
    if (a.doc.sel == a.display.selForContextMenu) {
      var e = d.charCodeAt(0);
      8203 != e || c || (c = "\u200b");
      if (8666 == e) {
        return this.reset(), this.cm.execCommand("undo");
      }
    }
    for (var f = 0, e = Math.min(c.length, d.length);f < e && c.charCodeAt(f) == d.charCodeAt(f);) {
      ++f;
    }
    var g = this;
    R(a, function() {
      Qb(a, d.slice(f), c.length - f, null, g.composing ? "*compose" : null);
      1E3 < d.length || -1 < d.indexOf("\n") ? b.value = g.prevInput = "" : g.prevInput = d;
      g.composing && (g.composing.range.clear(), g.composing.range = a.markText(g.composing.start, a.getCursor("to"), {className:"CodeMirror-composing"}));
    });
    return !0;
  }, ensurePolled:function() {
    this.pollingFast && this.poll() && (this.pollingFast = !1);
  }, onKeyPress:function() {
    B && 9 <= C && (this.hasSelection = null);
    this.fastPoll();
  }, onContextMenu:function(a) {
    function b() {
      if (null != g.selectionStart) {
        var a = e.somethingSelected(), b = "\u200b" + (a ? g.value : "");
        g.value = "\u21da";
        g.value = b;
        d.prevInput = a ? "" : "\u200b";
        g.selectionStart = 1;
        g.selectionEnd = b.length;
        f.selForContextMenu = e.doc.sel;
      }
    }
    function c() {
      d.contextMenuPending = !1;
      d.wrapper.style.position = "relative";
      g.style.cssText = l;
      B && 9 > C && f.scrollbars.setScrollTop(f.scroller.scrollTop = k);
      if (null != g.selectionStart) {
        (!B || B && 9 > C) && b();
        var a = 0, c = function() {
          f.selForContextMenu == e.doc.sel && 0 == g.selectionStart && 0 < g.selectionEnd && "\u200b" == d.prevInput ? G(e, ic.selectAll)(e) : 10 > a++ ? f.detectingSelectAll = setTimeout(c, 500) : f.input.reset();
        };
        f.detectingSelectAll = setTimeout(c, 200);
      }
    }
    var d = this, e = d.cm, f = e.display, g = d.textarea, h = Fa(e, a), k = f.scroller.scrollTop;
    if (h && !ca) {
      e.options.resetSelectionOnContextMenu && -1 == e.doc.sel.contains(h) && G(e, H)(e.doc, ha(h), ia);
      var l = g.style.cssText;
      d.wrapper.style.position = "absolute";
      g.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (a.clientY - 5) + "px; left: " + (a.clientX - 5) + "px; z-index: 1000; background: " + (B ? "rgba(255, 255, 255, .05)" : "transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
      if (K) {
        var m = window.scrollY
      }
      f.input.focus();
      K && window.scrollTo(null, m);
      f.input.reset();
      e.somethingSelected() || (g.value = d.prevInput = " ");
      d.contextMenuPending = !0;
      f.selForContextMenu = e.doc.sel;
      clearTimeout(f.detectingSelectAll);
      B && 9 <= C && b();
      if (jd) {
        dc(a);
        var n = function() {
          ka(window, "mouseup", n);
          setTimeout(c, 20);
        };
        v(window, "mouseup", n);
      } else {
        setTimeout(c, 50);
      }
    }
  }, readOnlyChanged:function(a) {
    a || this.reset();
  }, setUneditable:Eb, needsContentAttribute:!1}, Tc.prototype);
  Uc.prototype = X({init:function(a) {
    function b(a) {
      if (d.somethingSelected()) {
        V = d.getSelections(), "cut" == a.type && d.replaceSelection("", null, "cut");
      } else {
        if (d.options.lineWiseCopyCut) {
          var b = Xd(d);
          V = b.text;
          "cut" == a.type && d.operation(function() {
            d.setSelections(b.ranges, 0, ia);
            d.replaceSelection("", null, "cut");
          });
        } else {
          return;
        }
      }
      if (a.clipboardData && !Sa) {
        a.preventDefault(), a.clipboardData.clearData(), a.clipboardData.setData("text/plain", V.join("\n"));
      } else {
        var c = Zd();
        a = c.firstChild;
        d.display.lineSpace.insertBefore(c, d.display.lineSpace.firstChild);
        a.value = V.join("\n");
        var h = document.activeElement;
        ab(a);
        setTimeout(function() {
          d.display.lineSpace.removeChild(c);
          h.focus();
        }, 50);
      }
    }
    var c = this, d = c.cm;
    a = c.div = a.lineDiv;
    Yd(a);
    v(a, "paste", function(a) {
      O(d, a) || Wd(a, d);
    });
    v(a, "compositionstart", function(a) {
      a = a.data;
      c.composing = {sel:d.doc.sel, data:a, startData:a};
      if (a) {
        var b = d.doc.sel.primary(), g = d.getLine(b.head.line).indexOf(a, Math.max(0, b.head.ch - a.length));
        -1 < g && g <= b.head.ch && (c.composing.sel = ha(q(b.head.line, g), q(b.head.line, g + a.length)));
      }
    });
    v(a, "compositionupdate", function(a) {
      c.composing.data = a.data;
    });
    v(a, "compositionend", function(a) {
      var b = c.composing;
      b && (a.data == b.startData || /\u200b/.test(a.data) || (b.data = a.data), setTimeout(function() {
        b.handled || c.applyComposition(b);
        c.composing == b && (c.composing = null);
      }, 50));
    });
    v(a, "touchstart", function() {
      c.forceCompositionEnd();
    });
    v(a, "input", function() {
      c.composing || !d.isReadOnly() && c.pollContent() || R(c.cm, function() {
        N(d);
      });
    });
    v(a, "copy", b);
    v(a, "cut", b);
  }, prepareSelection:function() {
    var a = le(this.cm, !1);
    a.focus = this.cm.state.focused;
    return a;
  }, showSelection:function(a) {
    a && this.cm.display.view.length && (a.focus && this.showPrimarySelection(), this.showMultipleSelections(a));
  }, showPrimarySelection:function() {
    var a = window.getSelection(), b = this.cm.doc.sel.primary(), c = Tb(this.cm, a.anchorNode, a.anchorOffset), d = Tb(this.cm, a.focusNode, a.focusOffset);
    if (!c || c.bad || !d || d.bad || 0 != y(Pb(c, d), b.from()) || 0 != y(Ob(c, d), b.to())) {
      if (c = $d(this.cm, b.from()), d = $d(this.cm, b.to()), c || d) {
        var e = this.cm.display.view, b = a.rangeCount && a.getRangeAt(0);
        c ? d || (d = e[e.length - 1].measure, d = d.maps ? d.maps[d.maps.length - 1] : d.map, d = {node:d[d.length - 1], offset:d[d.length - 2] - d[d.length - 3]}) : c = {node:e[0].measure.map[2], offset:0};
        try {
          var f = Da(c.node, c.offset, d.offset, d.node);
        } catch (g) {
        }
        f && (!pa && this.cm.state.focused ? (a.collapse(c.node, c.offset), f.collapsed || a.addRange(f)) : (a.removeAllRanges(), a.addRange(f)), b && null == a.anchorNode ? a.addRange(b) : pa && this.startGracePeriod());
        this.rememberSelection();
      }
    }
  }, startGracePeriod:function() {
    var a = this;
    clearTimeout(this.gracePeriod);
    this.gracePeriod = setTimeout(function() {
      a.gracePeriod = !1;
      a.selectionChanged() && a.cm.operation(function() {
        a.cm.curOp.selectionChanged = !0;
      });
    }, 20);
  }, showMultipleSelections:function(a) {
    S(this.cm.display.cursorDiv, a.cursors);
    S(this.cm.display.selectionDiv, a.selection);
  }, rememberSelection:function() {
    var a = window.getSelection();
    this.lastAnchorNode = a.anchorNode;
    this.lastAnchorOffset = a.anchorOffset;
    this.lastFocusNode = a.focusNode;
    this.lastFocusOffset = a.focusOffset;
  }, selectionInEditor:function() {
    var a = window.getSelection();
    if (!a.rangeCount) {
      return !1;
    }
    a = a.getRangeAt(0).commonAncestorContainer;
    return Wc(this.div, a);
  }, focus:function() {
    "nocursor" != this.cm.options.readOnly && this.div.focus();
  }, blur:function() {
    this.div.blur();
  }, getField:function() {
    return this.div;
  }, supportsTouch:function() {
    return !0;
  }, receivedFocus:function() {
    function a() {
      b.cm.state.focused && (b.pollSelection(), b.polling.set(b.cm.options.pollInterval, a));
    }
    var b = this;
    this.selectionInEditor() ? this.pollSelection() : R(this.cm, function() {
      b.cm.curOp.selectionChanged = !0;
    });
    this.polling.set(this.cm.options.pollInterval, a);
  }, selectionChanged:function() {
    var a = window.getSelection();
    return a.anchorNode != this.lastAnchorNode || a.anchorOffset != this.lastAnchorOffset || a.focusNode != this.lastFocusNode || a.focusOffset != this.lastFocusOffset;
  }, pollSelection:function() {
    if (!this.composing && !this.gracePeriod && this.selectionChanged()) {
      var a = window.getSelection(), b = this.cm;
      this.rememberSelection();
      var c = Tb(b, a.anchorNode, a.anchorOffset), d = Tb(b, a.focusNode, a.focusOffset);
      c && d && R(b, function() {
        H(b.doc, ha(c, d), ia);
        if (c.bad || d.bad) {
          b.curOp.selectionChanged = !0;
        }
      });
    }
  }, pollContent:function() {
    var a = this.cm, b = a.display, c = a.doc.sel.primary(), d = c.from(), c = c.to();
    if (d.line < b.viewFrom || c.line > b.viewTo - 1) {
      return !1;
    }
    var e;
    d.line == b.viewFrom || 0 == (e = Ba(a, d.line)) ? (d = F(b.view[0].line), e = b.view[0].node) : (d = F(b.view[e].line), e = b.view[e - 1].node.nextSibling);
    var f = Ba(a, c.line);
    f == b.view.length - 1 ? (c = b.viewTo - 1, b = b.lineDiv.lastChild) : (c = F(b.view[f + 1].line) - 1, b = b.view[f + 1].node.previousSibling);
    b = a.doc.splitLines(Ef(a, e, b, d, c));
    for (e = Ca(a.doc, q(d, 0), q(c, t(a.doc, c).text.length));1 < b.length && 1 < e.length;) {
      if (A(b) == A(e)) {
        b.pop(), e.pop(), c--;
      } else {
        if (b[0] == e[0]) {
          b.shift(), e.shift(), d++;
        } else {
          break;
        }
      }
    }
    for (var g = 0, f = 0, h = b[0], k = e[0], l = Math.min(h.length, k.length);g < l && h.charCodeAt(g) == k.charCodeAt(g);) {
      ++g;
    }
    h = A(b);
    k = A(e);
    for (l = Math.min(h.length - (1 == b.length ? g : 0), k.length - (1 == e.length ? g : 0));f < l && h.charCodeAt(h.length - f - 1) == k.charCodeAt(k.length - f - 1);) {
      ++f;
    }
    b[b.length - 1] = h.slice(0, h.length - f);
    b[0] = b[0].slice(g);
    d = q(d, g);
    c = q(c, e.length ? A(e).length - f : 0);
    if (1 < b.length || b[0] || y(d, c)) {
      return Wa(a.doc, b, d, c, "+input"), !0;
    }
  }, ensurePolled:function() {
    this.forceCompositionEnd();
  }, reset:function() {
    this.forceCompositionEnd();
  }, forceCompositionEnd:function() {
    this.composing && !this.composing.handled && (this.applyComposition(this.composing), this.composing.handled = !0, this.div.blur(), this.div.focus());
  }, applyComposition:function(a) {
    this.cm.isReadOnly() ? G(this.cm, N)(this.cm) : a.data && a.data != a.startData && G(this.cm, Qb)(this.cm, a.data, 0, a.sel);
  }, setUneditable:function(a) {
    a.contentEditable = "false";
  }, onKeyPress:function(a) {
    a.preventDefault();
    this.cm.isReadOnly() || G(this.cm, Qb)(this.cm, String.fromCharCode(null == a.charCode ? a.keyCode : a.charCode), 0);
  }, readOnlyChanged:function(a) {
    this.div.contentEditable = String("nocursor" != a);
  }, onContextMenu:Eb, resetPosition:Eb, needsContentAttribute:!0}, Uc.prototype);
  n.inputStyles = {textarea:Tc, contenteditable:Uc};
  la.prototype = {primary:function() {
    return this.ranges[this.primIndex];
  }, equals:function(a) {
    if (a == this) {
      return !0;
    }
    if (a.primIndex != this.primIndex || a.ranges.length != this.ranges.length) {
      return !1;
    }
    for (var b = 0;b < this.ranges.length;b++) {
      var c = this.ranges[b], d = a.ranges[b];
      if (0 != y(c.anchor, d.anchor) || 0 != y(c.head, d.head)) {
        return !1;
      }
    }
    return !0;
  }, deepCopy:function() {
    for (var a = [], b = 0;b < this.ranges.length;b++) {
      a[b] = new z(Sc(this.ranges[b].anchor), Sc(this.ranges[b].head));
    }
    return new la(a, this.primIndex);
  }, somethingSelected:function() {
    for (var a = 0;a < this.ranges.length;a++) {
      if (!this.ranges[a].empty()) {
        return !0;
      }
    }
    return !1;
  }, contains:function(a, b) {
    b || (b = a);
    for (var c = 0;c < this.ranges.length;c++) {
      var d = this.ranges[c];
      if (0 <= y(b, d.from()) && 0 >= y(a, d.to())) {
        return c;
      }
    }
    return -1;
  }};
  z.prototype = {from:function() {
    return Pb(this.anchor, this.head);
  }, to:function() {
    return Ob(this.anchor, this.head);
  }, empty:function() {
    return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
  }};
  var bd = {left:0, right:0, top:0, bottom:0}, Ea, Va = null, Mf = 0, fc, ec, we = 0, gc = 0, T = null;
  B ? T = -.53 : pa ? T = 15 : sg ? T = -.7 : xe && (T = -1 / 3);
  var Ee = function(a) {
    var b = a.wheelDeltaX, c = a.wheelDeltaY;
    null == b && a.detail && a.axis == a.HORIZONTAL_AXIS && (b = a.detail);
    null == c && a.detail && a.axis == a.VERTICAL_AXIS ? c = a.detail : null == c && (c = a.wheelDelta);
    return {x:b, y:c};
  };
  n.wheelEventPixels = function(a) {
    a = Ee(a);
    a.x *= T;
    a.y *= T;
    return a;
  };
  var Yf = new va, md = null, Ga = n.changeEnd = function(a) {
    return a.text ? q(a.from.line + a.text.length - 1, A(a.text).length + (1 == a.text.length ? a.from.ch : 0)) : a.to;
  };
  n.prototype = {constructor:n, focus:function() {
    window.focus();
    this.display.input.focus();
  }, setOption:function(a, b) {
    var c = this.options, d = c[a];
    if (c[a] != b || "mode" == a) {
      c[a] = b, Ma.hasOwnProperty(a) && G(this, Ma[a])(this, b, d);
    }
  }, getOption:function(a) {
    return this.options[a];
  }, getDoc:function() {
    return this.doc;
  }, addKeyMap:function(a, b) {
    this.state.keyMaps[b ? "push" : "unshift"](pc(a));
  }, removeKeyMap:function(a) {
    for (var b = this.state.keyMaps, c = 0;c < b.length;++c) {
      if (b[c] == a || b[c].name == a) {
        return b.splice(c, 1), !0;
      }
    }
  }, addOverlay:E(function(a, b) {
    var c = a.token ? a : n.getMode(this.options, a);
    if (c.startState) {
      throw Error("Overlays may not be stateful.");
    }
    this.state.overlays.push({mode:c, modeSpec:a, opaque:b && b.opaque});
    this.state.modeGen++;
    N(this);
  }), removeOverlay:E(function(a) {
    for (var b = this.state.overlays, c = 0;c < b.length;++c) {
      var d = b[c].modeSpec;
      if (d == a || "string" == typeof a && d.name == a) {
        b.splice(c, 1);
        this.state.modeGen++;
        N(this);
        break;
      }
    }
  }), indentLine:E(function(a, b, c) {
    "string" != typeof b && "number" != typeof b && (b = null == b ? this.options.smartIndent ? "smart" : "prev" : b ? "add" : "subtract");
    rb(this.doc, a) && qb(this, a, b, c);
  }), indentSelection:E(function(a) {
    for (var b = this.doc.sel.ranges, c = -1, d = 0;d < b.length;d++) {
      var e = b[d];
      if (e.empty()) {
        e.head.line > c && (qb(this, e.head.line, a, !0), c = e.head.line, d == this.doc.sel.primIndex && Ra(this));
      } else {
        for (var f = e.from(), e = e.to(), g = Math.max(c, f.line), c = Math.min(this.lastLine(), e.line - (e.ch ? 0 : 1)) + 1, e = g;e < c;++e) {
          qb(this, e, a);
        }
        e = this.doc.sel.ranges;
        0 == f.ch && b.length == e.length && 0 < e[d].from().ch && Xc(this.doc, d, new z(f, e[d].to()), ia);
      }
    }
  }), getTokenAt:function(a, b) {
    return cf(this, a, b);
  }, getLineTokens:function(a, b) {
    return cf(this, q(a), b, !0);
  }, getTokenTypeAt:function(a) {
    a = x(this.doc, a);
    var b = ef(this, t(this.doc, a.line)), c = 0, d = (b.length - 1) / 2;
    a = a.ch;
    if (0 == a) {
      b = b[2];
    } else {
      for (;;) {
        var e = c + d >> 1;
        if ((e ? b[2 * e - 1] : 0) >= a) {
          d = e;
        } else {
          if (b[2 * e + 1] < a) {
            c = e + 1;
          } else {
            b = b[2 * e + 2];
            break;
          }
        }
      }
    }
    c = b ? b.indexOf("cm-overlay ") : -1;
    return 0 > c ? b : 0 == c ? null : b.slice(0, c - 1);
  }, getModeAt:function(a) {
    var b = this.doc.mode;
    return b.innerMode ? n.innerMode(b, this.getTokenAt(a).state).mode : b;
  }, getHelper:function(a, b) {
    return this.getHelpers(a, b)[0];
  }, getHelpers:function(a, b) {
    var c = [];
    if (!bb.hasOwnProperty(b)) {
      return c;
    }
    var d = bb[b], e = this.getModeAt(a);
    if ("string" == typeof e[b]) {
      d[e[b]] && c.push(d[e[b]]);
    } else {
      if (e[b]) {
        for (var f = 0;f < e[b].length;f++) {
          var g = d[e[b][f]];
          g && c.push(g);
        }
      } else {
        e.helperType && d[e.helperType] ? c.push(d[e.helperType]) : d[e.name] && c.push(d[e.name]);
      }
    }
    for (f = 0;f < d._global.length;f++) {
      g = d._global[f], g.pred(e, this) && -1 == D(c, g.val) && c.push(g.val);
    }
    return c;
  }, getStateAfter:function(a, b) {
    var c = this.doc;
    a = Math.max(c.first, Math.min(null == a ? c.first + c.size - 1 : a, c.first + c.size - 1));
    return tb(this, a + 1, b);
  }, cursorCoords:function(a, b) {
    var c;
    c = this.doc.sel.primary();
    c = null == a ? c.head : "object" == typeof a ? x(this.doc, a) : a ? c.from() : c.to();
    return ma(this, c, b || "page");
  }, charCoords:function(a, b) {
    return Xb(this, x(this.doc, a), b || "page");
  }, coordsChar:function(a, b) {
    a = se(this, a, b || "page");
    return gd(this, a.left, a.top);
  }, lineAtHeight:function(a, b) {
    a = se(this, {top:a, left:0}, b || "page").top;
    return Aa(this.doc, a + this.display.viewOffset);
  }, heightAtLine:function(a, b) {
    var c = !1, d;
    "number" == typeof a ? (d = this.doc.first + this.doc.size - 1, a < this.doc.first ? a = this.doc.first : a > d && (a = d, c = !0), d = t(this.doc, a)) : d = a;
    return dd(this, d, {top:0, left:0}, b || "page").top + (c ? this.doc.height - fa(d) : 0);
  }, defaultTextHeight:function() {
    return wa(this.display);
  }, defaultCharWidth:function() {
    return hb(this.display);
  }, setGutterMarker:E(function(a, b, c) {
    return nc(this.doc, a, "gutter", function(a) {
      var e = a.gutterMarkers || (a.gutterMarkers = {});
      e[b] = c;
      !c && of(e) && (a.gutterMarkers = null);
      return !0;
    });
  }), clearGutter:E(function(a) {
    var b = this, c = b.doc, d = c.first;
    c.iter(function(c) {
      c.gutterMarkers && c.gutterMarkers[a] && (c.gutterMarkers[a] = null, na(b, d, "gutter"), of(c.gutterMarkers) && (c.gutterMarkers = null));
      ++d;
    });
  }), lineInfo:function(a) {
    if ("number" == typeof a) {
      if (!rb(this.doc, a)) {
        return null;
      }
      var b = a;
      a = t(this.doc, a);
      if (!a) {
        return null;
      }
    } else {
      if (b = F(a), null == b) {
        return null;
      }
    }
    return {line:b, handle:a, text:a.text, gutterMarkers:a.gutterMarkers, textClass:a.textClass, bgClass:a.bgClass, wrapClass:a.wrapClass, widgets:a.widgets};
  }, getViewport:function() {
    return {from:this.display.viewFrom, to:this.display.viewTo};
  }, addWidget:function(a, b, c, d, e) {
    var f = this.display;
    a = ma(this, x(this.doc, a));
    var g = a.bottom, h = a.left;
    b.style.position = "absolute";
    b.setAttribute("cm-ignore-events", "true");
    this.display.input.setUneditable(b);
    f.sizer.appendChild(b);
    if ("over" == d) {
      g = a.top;
    } else {
      if ("above" == d || "near" == d) {
        var k = Math.max(f.wrapper.clientHeight, this.doc.height), l = Math.max(f.sizer.clientWidth, f.lineSpace.clientWidth);
        ("above" == d || a.bottom + b.offsetHeight > k) && a.top > b.offsetHeight ? g = a.top - b.offsetHeight : a.bottom + b.offsetHeight <= k && (g = a.bottom);
        h + b.offsetWidth > l && (h = l - b.offsetWidth);
      }
    }
    b.style.top = g + "px";
    b.style.left = b.style.right = "";
    "right" == e ? (h = f.sizer.clientWidth - b.offsetWidth, b.style.right = "0px") : ("left" == e ? h = 0 : "middle" == e && (h = (f.sizer.clientWidth - b.offsetWidth) / 2), b.style.left = h + "px");
    c && (a = bc(this, h, g, h + b.offsetWidth, g + b.offsetHeight), null != a.scrollTop && mb(this, a.scrollTop), null != a.scrollLeft && Oa(this, a.scrollLeft));
  }, triggerOnKeyDown:E(Ae), triggerOnKeyPress:E(Be), triggerOnKeyUp:ze, execCommand:function(a) {
    if (ic.hasOwnProperty(a)) {
      return ic[a].call(null, this);
    }
  }, triggerElectric:E(function(a) {
    Vd(this, a);
  }), findPosH:function(a, b, c, d) {
    var e = 1;
    0 > b && (e = -1, b = -b);
    var f = 0;
    for (a = x(this.doc, a);f < b && (a = rd(this.doc, a, e, c, d), !a.hitSide);++f) {
    }
    return a;
  }, moveH:E(function(a, b) {
    var c = this;
    c.extendSelectionsBy(function(d) {
      return c.display.shift || c.doc.extend || d.empty() ? rd(c.doc, d.head, a, b, c.options.rtlMoveVisually) : 0 > a ? d.from() : d.to();
    }, Gb);
  }), deleteH:E(function(a, b) {
    var c = this.doc;
    this.doc.sel.somethingSelected() ? c.replaceSelection("", null, "+delete") : Xa(this, function(d) {
      var e = rd(c, d.head, a, b, !1);
      return 0 > a ? {from:e, to:d.head} : {from:d.head, to:e};
    });
  }), findPosV:function(a, b, c, d) {
    var e = 1;
    0 > b && (e = -1, b = -b);
    var f = 0;
    for (a = x(this.doc, a);f < b && (a = ma(this, a, "div"), null == d ? d = a.left : a.left = d, a = Ue(this, a, e, c), !a.hitSide);++f) {
    }
    return a;
  }, moveV:E(function(a, b) {
    var c = this, d = this.doc, e = [], f = !c.display.shift && !d.extend && d.sel.somethingSelected();
    d.extendSelectionsBy(function(g) {
      if (f) {
        return 0 > a ? g.from() : g.to();
      }
      var k = ma(c, g.head, "div");
      null != g.goalColumn && (k.left = g.goalColumn);
      e.push(k.left);
      var l = Ue(c, k, a, b);
      "page" == b && g == d.sel.primary() && lc(c, null, Xb(c, l, "div").top - k.top);
      return l;
    }, Gb);
    if (e.length) {
      for (var g = 0;g < d.sel.ranges.length;g++) {
        d.sel.ranges[g].goalColumn = e[g];
      }
    }
  }), findWordAt:function(a) {
    var b = t(this.doc, a.line).text, c = a.ch, d = a.ch;
    if (b) {
      var e = this.getHelper(a, "wordChars");
      (0 > a.xRel || d == b.length) && c ? --c : ++d;
      for (var f = b.charAt(c), f = oc(f, e) ? function(a) {
        return oc(a, e);
      } : /\s/.test(f) ? function(a) {
        return /\s/.test(a);
      } : function(a) {
        return !/\s/.test(a) && !oc(a);
      };0 < c && f(b.charAt(c - 1));) {
        --c;
      }
      for (;d < b.length && f(b.charAt(d));) {
        ++d;
      }
    }
    return new z(q(a.line, c), q(a.line, d));
  }, toggleOverwrite:function(a) {
    if (null == a || a != this.state.overwrite) {
      (this.state.overwrite = !this.state.overwrite) ? nb(this.display.cursorDiv, "CodeMirror-overwrite") : lb(this.display.cursorDiv, "CodeMirror-overwrite"), J(this, "overwriteToggle", this, this.state.overwrite);
    }
  }, hasFocus:function() {
    return this.display.input.getField() == ga();
  }, isReadOnly:function() {
    return !(!this.options.readOnly && !this.doc.cantEdit);
  }, scrollTo:E(function(a, b) {
    null == a && null == b || mc(this);
    null != a && (this.curOp.scrollLeft = a);
    null != b && (this.curOp.scrollTop = b);
  }), getScrollInfo:function() {
    var a = this.display.scroller;
    return {left:a.scrollLeft, top:a.scrollTop, height:a.scrollHeight - ea(this) - this.display.barHeight, width:a.scrollWidth - ea(this) - this.display.barWidth, clientHeight:Oc(this), clientWidth:qa(this)};
  }, scrollIntoView:E(function(a, b) {
    null == a ? (a = {from:this.doc.sel.primary().head, to:null}, null == b && (b = this.options.cursorScrollMargin)) : "number" == typeof a ? a = {from:q(a, 0), to:null} : null == a.from && (a = {from:a, to:null});
    a.to || (a.to = a.from);
    a.margin = b || 0;
    if (null != a.from.line) {
      mc(this), this.curOp.scrollToPos = a;
    } else {
      var c = bc(this, Math.min(a.from.left, a.to.left), Math.min(a.from.top, a.to.top) - a.margin, Math.max(a.from.right, a.to.right), Math.max(a.from.bottom, a.to.bottom) + a.margin);
      this.scrollTo(c.scrollLeft, c.scrollTop);
    }
  }), setSize:E(function(a, b) {
    function c(a) {
      return "number" == typeof a || /^\d+$/.test(String(a)) ? a + "px" : a;
    }
    var d = this;
    null != a && (d.display.wrapper.style.width = c(a));
    null != b && (d.display.wrapper.style.height = c(b));
    d.options.lineWrapping && re(this);
    var e = d.display.viewFrom;
    d.doc.iter(e, d.display.viewTo, function(a) {
      if (a.widgets) {
        for (var b = 0;b < a.widgets.length;b++) {
          if (a.widgets[b].noHScroll) {
            na(d, e, "widget");
            break;
          }
        }
      }
      ++e;
    });
    d.curOp.forceUpdate = !0;
    J(d, "refresh", this);
  }), operation:function(a) {
    return R(this, a);
  }, refresh:E(function() {
    var a = this.display.cachedTextHeight;
    N(this);
    this.curOp.forceUpdate = !0;
    ib(this);
    this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop);
    Dc(this);
    (null == a || .5 < Math.abs(a - wa(this.display))) && Bc(this);
    J(this, "refresh", this);
  }), swapDoc:E(function(a) {
    var b = this.doc;
    b.cm = null;
    Ed(this, a);
    ib(this);
    this.display.input.reset();
    this.scrollTo(a.scrollLeft, a.scrollTop);
    this.curOp.forceScroll = !0;
    Q(this, "swapDoc", this, b);
    return b;
  }), getInputField:function() {
    return this.display.input.getField();
  }, getWrapperElement:function() {
    return this.display.wrapper;
  }, getScrollerElement:function() {
    return this.display.scroller;
  }, getGutterElement:function() {
    return this.display.gutters;
  }};
  $a(n);
  var xf = n.defaults = {}, Ma = n.optionHandlers = {}, Fd = n.Init = {toString:function() {
    return "CodeMirror.Init";
  }};
  w("value", "", function(a, b) {
    a.setValue(b);
  }, !0);
  w("mode", null, function(a, b) {
    a.doc.modeOption = b;
    Ac(a);
  }, !0);
  w("indentUnit", 2, Ac, !0);
  w("indentWithTabs", !1);
  w("smartIndent", !0);
  w("tabSize", 4, function(a) {
    fb(a);
    ib(a);
    N(a);
  }, !0);
  w("lineSeparator", null, function(a, b) {
    if (a.doc.lineSep = b) {
      var c = [], d = a.doc.first;
      a.doc.iter(function(a) {
        for (var e = 0;;) {
          var h = a.text.indexOf(b, e);
          if (-1 == h) {
            break;
          }
          e = h + b.length;
          c.push(q(d, h));
        }
        d++;
      });
      for (var e = c.length - 1;0 <= e;e--) {
        Wa(a.doc, b, c[e], q(c[e].line, c[e].ch + b.length));
      }
    }
  });
  w("specialChars", /[\t\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g, function(a, b, c) {
    a.state.specialChars = new RegExp(b.source + (b.test("\t") ? "" : "|\t"), "g");
    c != n.Init && a.refresh();
  });
  w("specialCharPlaceholder", function(a) {
    var b = r("span", "\u2022", "cm-invalidchar");
    b.title = "\\u" + a.charCodeAt(0).toString(16);
    b.setAttribute("aria-label", b.title);
    return b;
  }, function(a) {
    a.refresh();
  }, !0);
  w("electricChars", !0);
  w("inputStyle", cb ? "contenteditable" : "textarea", function() {
    throw Error("inputStyle can not (yet) be changed in a running editor");
  }, !0);
  w("rtlMoveVisually", !ug);
  w("wholeLineUpdateBefore", !0);
  w("theme", "default", function(a) {
    Bd(a);
    jb(a);
  }, !0);
  w("keyMap", "default", function(a, b, c) {
    b = pc(b);
    (c = c != n.Init && pc(c)) && c.detach && c.detach(a, b);
    b.attach && b.attach(a, c || null);
  });
  w("extraKeys", null);
  w("lineWrapping", !1, function(a) {
    a.options.lineWrapping ? (nb(a.display.wrapper, "CodeMirror-wrap"), a.display.sizer.style.minWidth = "", a.display.sizerWidth = null) : (lb(a.display.wrapper, "CodeMirror-wrap"), Ec(a));
    Bc(a);
    N(a);
    ib(a);
    setTimeout(function() {
      Pa(a);
    }, 100);
  }, !0);
  w("gutters", [], function(a) {
    xc(a.options);
    jb(a);
  }, !0);
  w("fixedGutter", !0, function(a, b) {
    a.display.gutters.style.left = b ? Jc(a.display) + "px" : "0";
    a.refresh();
  }, !0);
  w("coverGutterNextToScrollbar", !1, function(a) {
    Pa(a);
  }, !0);
  w("scrollbarStyle", "native", function(a) {
    Cd(a);
    Pa(a);
    a.display.scrollbars.setScrollTop(a.doc.scrollTop);
    a.display.scrollbars.setScrollLeft(a.doc.scrollLeft);
  }, !0);
  w("lineNumbers", !1, function(a) {
    xc(a.options);
    jb(a);
  }, !0);
  w("firstLineNumber", 1, jb, !0);
  w("lineNumberFormatter", function(a) {
    return a;
  }, jb, !0);
  w("showCursorWhenSelecting", !1, ob, !0);
  w("resetSelectionOnContextMenu", !0);
  w("lineWiseCopyCut", !0);
  w("readOnly", !1, function(a, b) {
    "nocursor" == b ? (eb(a), a.display.input.blur(), a.display.disabled = !0) : a.display.disabled = !1;
    a.display.input.readOnlyChanged(b);
  });
  w("disableInput", !1, function(a, b) {
    b || a.display.input.reset();
  }, !0);
  w("dragDrop", !0, function(a, b, c) {
    !b != !(c && c != n.Init) && (c = a.display.dragFunctions, b = b ? v : ka, b(a.display.scroller, "dragstart", c.start), b(a.display.scroller, "dragenter", c.enter), b(a.display.scroller, "dragover", c.over), b(a.display.scroller, "dragleave", c.leave), b(a.display.scroller, "drop", c.drop));
  });
  w("allowDropFileTypes", null);
  w("cursorBlinkRate", 530);
  w("cursorScrollMargin", 0);
  w("cursorHeight", 1, ob, !0);
  w("singleCursorHeightPerLine", !0, ob, !0);
  w("workTime", 100);
  w("workDelay", 100);
  w("flattenSpans", !0, fb, !0);
  w("addModeClass", !1, fb, !0);
  w("pollInterval", 100);
  w("undoDepth", 200, function(a, b) {
    a.doc.history.undoDepth = b;
  });
  w("historyEventDelay", 1250);
  w("viewportMargin", 10, function(a) {
    a.refresh();
  }, !0);
  w("maxHighlightLength", 1E4, fb, !0);
  w("moveInputWithCursor", !0, function(a, b) {
    b || a.display.input.resetPosition();
  });
  w("tabindex", null, function(a, b) {
    a.display.input.getField().tabIndex = b || "";
  });
  w("autofocus", null);
  var wf = n.modes = {}, Hb = n.mimeModes = {};
  n.defineMode = function(a, b) {
    n.defaults.mode || "null" == a || (n.defaults.mode = a);
    2 < arguments.length && (b.dependencies = Array.prototype.slice.call(arguments, 2));
    wf[a] = b;
  };
  n.defineMIME = function(a, b) {
    Hb[a] = b;
  };
  n.resolveMode = function(a) {
    if ("string" == typeof a && Hb.hasOwnProperty(a)) {
      a = Hb[a];
    } else {
      if (a && "string" == typeof a.name && Hb.hasOwnProperty(a.name)) {
        var b = Hb[a.name];
        "string" == typeof b && (b = {name:b});
        a = mf(b, a);
        a.name = b.name;
      } else {
        if ("string" == typeof a && /^[\w\-]+\/[\w\-]+\+xml$/.test(a)) {
          return n.resolveMode("application/xml");
        }
      }
    }
    return "string" == typeof a ? {name:a} : a || {name:"null"};
  };
  n.getMode = function(a, b) {
    b = n.resolveMode(b);
    var c = wf[b.name];
    if (!c) {
      return n.getMode(a, "text/plain");
    }
    c = c(a, b);
    if (Ib.hasOwnProperty(b.name)) {
      var d = Ib[b.name], e;
      for (e in d) {
        d.hasOwnProperty(e) && (c.hasOwnProperty(e) && (c["_" + e] = c[e]), c[e] = d[e]);
      }
    }
    c.name = b.name;
    b.helperType && (c.helperType = b.helperType);
    if (b.modeProps) {
      for (e in b.modeProps) {
        c[e] = b.modeProps[e];
      }
    }
    return c;
  };
  n.defineMode("null", function() {
    return {token:function(a) {
      a.skipToEnd();
    }};
  });
  n.defineMIME("text/plain", "null");
  var Ib = n.modeExtensions = {};
  n.extendMode = function(a, b) {
    var c = Ib.hasOwnProperty(a) ? Ib[a] : Ib[a] = {};
    X(b, c);
  };
  n.defineExtension = function(a, b) {
    n.prototype[a] = b;
  };
  n.defineDocExtension = function(a, b) {
    P.prototype[a] = b;
  };
  n.defineOption = w;
  var zc = [];
  n.defineInitHook = function(a) {
    zc.push(a);
  };
  var bb = n.helpers = {};
  n.registerHelper = function(a, b, c) {
    bb.hasOwnProperty(a) || (bb[a] = n[a] = {_global:[]});
    bb[a][b] = c;
  };
  n.registerGlobalHelper = function(a, b, c, d) {
    n.registerHelper(a, b, d);
    bb[a]._global.push({pred:c, val:d});
  };
  var ta = n.copyState = function(a, b) {
    if (!0 === b) {
      return b;
    }
    if (a.copyState) {
      return a.copyState(b);
    }
    var c = {}, d;
    for (d in b) {
      var e = b[d];
      e instanceof Array && (e = e.concat([]));
      c[d] = e;
    }
    return c;
  }, Kf = n.startState = function(a, b, c) {
    return a.startState ? a.startState(b, c) : !0;
  };
  n.innerMode = function(a, b) {
    for (;a.innerMode;) {
      var c = a.innerMode(b);
      if (!c || c.mode == a) {
        break;
      }
      b = c.state;
      a = c.mode;
    }
    return c || {mode:a, state:b};
  };
  var ic = n.commands = {selectAll:function(a) {
    a.setSelection(q(a.firstLine(), 0), q(a.lastLine()), ia);
  }, singleSelection:function(a) {
    a.setSelection(a.getCursor("anchor"), a.getCursor("head"), ia);
  }, killLine:function(a) {
    Xa(a, function(b) {
      if (b.empty()) {
        var c = t(a.doc, b.head.line).text.length;
        return b.head.ch == c && b.head.line < a.lastLine() ? {from:b.head, to:q(b.head.line + 1, 0)} : {from:b.head, to:q(b.head.line, c)};
      }
      return {from:b.from(), to:b.to()};
    });
  }, deleteLine:function(a) {
    Xa(a, function(b) {
      return {from:q(b.from().line, 0), to:x(a.doc, q(b.to().line + 1, 0))};
    });
  }, delLineLeft:function(a) {
    Xa(a, function(a) {
      return {from:q(a.from().line, 0), to:a.from()};
    });
  }, delWrappedLineLeft:function(a) {
    Xa(a, function(b) {
      var c = a.charCoords(b.head, "div").top + 5;
      return {from:a.coordsChar({left:0, top:c}, "div"), to:b.from()};
    });
  }, delWrappedLineRight:function(a) {
    Xa(a, function(b) {
      var c = a.charCoords(b.head, "div").top + 5, c = a.coordsChar({left:a.display.lineDiv.offsetWidth + 100, top:c}, "div");
      return {from:b.from(), to:c};
    });
  }, undo:function(a) {
    a.undo();
  }, redo:function(a) {
    a.redo();
  }, undoSelection:function(a) {
    a.undoSelection();
  }, redoSelection:function(a) {
    a.redoSelection();
  }, goDocStart:function(a) {
    a.extendSelection(q(a.firstLine(), 0));
  }, goDocEnd:function(a) {
    a.extendSelection(q(a.lastLine()));
  }, goLineStart:function(a) {
    a.extendSelectionsBy(function(b) {
      return qf(a, b.head.line);
    }, {origin:"+move", bias:1});
  }, goLineStartSmart:function(a) {
    a.extendSelectionsBy(function(b) {
      return rf(a, b.head);
    }, {origin:"+move", bias:1});
  }, goLineEnd:function(a) {
    a.extendSelectionsBy(function(b) {
      b = b.head.line;
      for (var c, d = t(a.doc, b);c = za(d, !1);) {
        d = c.find(1, !0).line, b = null;
      }
      c = (c = Z(d)) ? c[0].level % 2 ? $b(d) : ac(d) : d.text.length;
      return q(null == b ? F(d) : b, c);
    }, {origin:"+move", bias:-1});
  }, goLineRight:function(a) {
    a.extendSelectionsBy(function(b) {
      b = a.charCoords(b.head, "div").top + 5;
      return a.coordsChar({left:a.display.lineDiv.offsetWidth + 100, top:b}, "div");
    }, Gb);
  }, goLineLeft:function(a) {
    a.extendSelectionsBy(function(b) {
      b = a.charCoords(b.head, "div").top + 5;
      return a.coordsChar({left:0, top:b}, "div");
    }, Gb);
  }, goLineLeftSmart:function(a) {
    a.extendSelectionsBy(function(b) {
      var c = a.charCoords(b.head, "div").top + 5, c = a.coordsChar({left:0, top:c}, "div");
      return c.ch < a.getLine(c.line).search(/\S/) ? rf(a, b.head) : c;
    }, Gb);
  }, goLineUp:function(a) {
    a.moveV(-1, "line");
  }, goLineDown:function(a) {
    a.moveV(1, "line");
  }, goPageUp:function(a) {
    a.moveV(-1, "page");
  }, goPageDown:function(a) {
    a.moveV(1, "page");
  }, goCharLeft:function(a) {
    a.moveH(-1, "char");
  }, goCharRight:function(a) {
    a.moveH(1, "char");
  }, goColumnLeft:function(a) {
    a.moveH(-1, "column");
  }, goColumnRight:function(a) {
    a.moveH(1, "column");
  }, goWordLeft:function(a) {
    a.moveH(-1, "word");
  }, goGroupRight:function(a) {
    a.moveH(1, "group");
  }, goGroupLeft:function(a) {
    a.moveH(-1, "group");
  }, goWordRight:function(a) {
    a.moveH(1, "word");
  }, delCharBefore:function(a) {
    a.deleteH(-1, "char");
  }, delCharAfter:function(a) {
    a.deleteH(1, "char");
  }, delWordBefore:function(a) {
    a.deleteH(-1, "word");
  }, delWordAfter:function(a) {
    a.deleteH(1, "word");
  }, delGroupBefore:function(a) {
    a.deleteH(-1, "group");
  }, delGroupAfter:function(a) {
    a.deleteH(1, "group");
  }, indentAuto:function(a) {
    a.indentSelection("smart");
  }, indentMore:function(a) {
    a.indentSelection("add");
  }, indentLess:function(a) {
    a.indentSelection("subtract");
  }, insertTab:function(a) {
    a.replaceSelection("\t");
  }, insertSoftTab:function(a) {
    for (var b = [], c = a.listSelections(), d = a.options.tabSize, e = 0;e < c.length;e++) {
      var f = c[e].from(), f = ba(a.getLine(f.line), f.ch, d);
      b.push(Array(d - f % d + 1).join(" "));
    }
    a.replaceSelections(b);
  }, defaultTab:function(a) {
    a.somethingSelected() ? a.indentSelection("add") : a.execCommand("insertTab");
  }, transposeChars:function(a) {
    R(a, function() {
      for (var b = a.listSelections(), c = [], d = 0;d < b.length;d++) {
        var e = b[d].head, f = t(a.doc, e.line).text;
        if (f) {
          if (e.ch == f.length && (e = new q(e.line, e.ch - 1)), 0 < e.ch) {
            e = new q(e.line, e.ch + 1), a.replaceRange(f.charAt(e.ch - 1) + f.charAt(e.ch - 2), q(e.line, e.ch - 2), e, "+transpose");
          } else {
            if (e.line > a.doc.first) {
              var g = t(a.doc, e.line - 1).text;
              g && a.replaceRange(f.charAt(0) + a.doc.lineSeparator() + g.charAt(g.length - 1), q(e.line - 1, g.length - 1), q(e.line, 1), "+transpose");
            }
          }
        }
        c.push(new z(e, e));
      }
      a.setSelections(c);
    });
  }, newlineAndIndent:function(a) {
    R(a, function() {
      for (var b = a.listSelections().length, c = 0;c < b;c++) {
        var d = a.listSelections()[c];
        a.replaceRange(a.doc.lineSeparator(), d.anchor, d.head, "+input");
        a.indentLine(d.from().line + 1, null, !0);
      }
      Ra(a);
    });
  }, toggleOverwrite:function(a) {
    a.toggleOverwrite();
  }}, ua = n.keyMap = {};
  ua.basic = {Left:"goCharLeft", Right:"goCharRight", Up:"goLineUp", Down:"goLineDown", End:"goLineEnd", Home:"goLineStartSmart", PageUp:"goPageUp", PageDown:"goPageDown", Delete:"delCharAfter", Backspace:"delCharBefore", "Shift-Backspace":"delCharBefore", Tab:"defaultTab", "Shift-Tab":"indentAuto", Enter:"newlineAndIndent", Insert:"toggleOverwrite", Esc:"singleSelection"};
  ua.pcDefault = {"Ctrl-A":"selectAll", "Ctrl-D":"deleteLine", "Ctrl-Z":"undo", "Shift-Ctrl-Z":"redo", "Ctrl-Y":"redo", "Ctrl-Home":"goDocStart", "Ctrl-End":"goDocEnd", "Ctrl-Up":"goLineUp", "Ctrl-Down":"goLineDown", "Ctrl-Left":"goGroupLeft", "Ctrl-Right":"goGroupRight", "Alt-Left":"goLineStart", "Alt-Right":"goLineEnd", "Ctrl-Backspace":"delGroupBefore", "Ctrl-Delete":"delGroupAfter", "Ctrl-S":"save", "Ctrl-F":"find", "Ctrl-G":"findNext", "Shift-Ctrl-G":"findPrev", "Shift-Ctrl-F":"replace", "Shift-Ctrl-R":"replaceAll", 
  "Ctrl-[":"indentLess", "Ctrl-]":"indentMore", "Ctrl-U":"undoSelection", "Shift-Ctrl-U":"redoSelection", "Alt-U":"redoSelection", fallthrough:"basic"};
  ua.emacsy = {"Ctrl-F":"goCharRight", "Ctrl-B":"goCharLeft", "Ctrl-P":"goLineUp", "Ctrl-N":"goLineDown", "Alt-F":"goWordRight", "Alt-B":"goWordLeft", "Ctrl-A":"goLineStart", "Ctrl-E":"goLineEnd", "Ctrl-V":"goPageDown", "Shift-Ctrl-V":"goPageUp", "Ctrl-D":"delCharAfter", "Ctrl-H":"delCharBefore", "Alt-D":"delWordAfter", "Alt-Backspace":"delWordBefore", "Ctrl-K":"killLine", "Ctrl-T":"transposeChars"};
  ua.macDefault = {"Cmd-A":"selectAll", "Cmd-D":"deleteLine", "Cmd-Z":"undo", "Shift-Cmd-Z":"redo", "Cmd-Y":"redo", "Cmd-Home":"goDocStart", "Cmd-Up":"goDocStart", "Cmd-End":"goDocEnd", "Cmd-Down":"goDocEnd", "Alt-Left":"goGroupLeft", "Alt-Right":"goGroupRight", "Cmd-Left":"goLineLeft", "Cmd-Right":"goLineRight", "Alt-Backspace":"delGroupBefore", "Ctrl-Alt-Backspace":"delGroupAfter", "Alt-Delete":"delGroupAfter", "Cmd-S":"save", "Cmd-F":"find", "Cmd-G":"findNext", "Shift-Cmd-G":"findPrev", "Cmd-Alt-F":"replace", 
  "Shift-Cmd-Alt-F":"replaceAll", "Cmd-[":"indentLess", "Cmd-]":"indentMore", "Cmd-Backspace":"delWrappedLineLeft", "Cmd-Delete":"delWrappedLineRight", "Cmd-U":"undoSelection", "Shift-Cmd-U":"redoSelection", "Ctrl-Up":"goDocStart", "Ctrl-Down":"goDocEnd", fallthrough:["basic", "emacsy"]};
  ua["default"] = Y ? ua.macDefault : ua.pcDefault;
  n.normalizeKeyMap = function(a) {
    var b = {}, c;
    for (c in a) {
      if (a.hasOwnProperty(c)) {
        var d = a[c];
        if (!/^(name|fallthrough|(de|at)tach)$/.test(c)) {
          if ("..." != d) {
            for (var e = Rb(c.split(" "), dg), f = 0;f < e.length;f++) {
              var g, h;
              f == e.length - 1 ? (h = e.join(" "), g = d) : (h = e.slice(0, f + 1).join(" "), g = "...");
              var k = b[h];
              if (!k) {
                b[h] = g;
              } else {
                if (k != g) {
                  throw Error("Inconsistent bindings for " + h);
                }
              }
            }
          }
          delete a[c];
        }
      }
    }
    for (var l in b) {
      a[l] = b[l];
    }
    return a;
  };
  var xb = n.lookupKey = function(a, b, c, d) {
    b = pc(b);
    var e = b.call ? b.call(a, d) : b[a];
    if (!1 === e) {
      return "nothing";
    }
    if ("..." === e) {
      return "multi";
    }
    if (null != e && c(e)) {
      return "handled";
    }
    if (b.fallthrough) {
      if ("[object Array]" != Object.prototype.toString.call(b.fallthrough)) {
        return xb(a, b.fallthrough, c, d);
      }
      for (e = 0;e < b.fallthrough.length;e++) {
        var f = xb(a, b.fallthrough[e], c, d);
        if (f) {
          return f;
        }
      }
    }
  }, Xf = n.isModifierKey = function(a) {
    a = "string" == typeof a ? a : Ka[a.keyCode];
    return "Ctrl" == a || "Alt" == a || "Shift" == a || "Mod" == a;
  }, Zf = n.keyName = function(a, b) {
    if (ca && 34 == a.keyCode && a["char"]) {
      return !1;
    }
    var c = Ka[a.keyCode], d = c;
    if (null == d || a.altGraphKey) {
      return !1;
    }
    a.altKey && "Alt" != c && (d = "Alt-" + d);
    (vf ? a.metaKey : a.ctrlKey) && "Ctrl" != c && (d = "Ctrl-" + d);
    (vf ? a.ctrlKey : a.metaKey) && "Cmd" != c && (d = "Cmd-" + d);
    !b && a.shiftKey && "Shift" != c && (d = "Shift-" + d);
    return d;
  };
  n.fromTextArea = function(a, b) {
    function c() {
      a.value = h.getValue();
    }
    b = b ? X(b) : {};
    b.value = a.value;
    !b.tabindex && a.tabIndex && (b.tabindex = a.tabIndex);
    !b.placeholder && a.placeholder && (b.placeholder = a.placeholder);
    if (null == b.autofocus) {
      var d = ga();
      b.autofocus = d == a || null != a.getAttribute("autofocus") && d == document.body;
    }
    if (a.form && (v(a.form, "submit", c), !b.leaveSubmitMethodAlone)) {
      var e = a.form, f = e.submit;
      try {
        var g = e.submit = function() {
          c();
          e.submit = f;
          e.submit();
          e.submit = g;
        };
      } catch (k) {
      }
    }
    b.finishInit = function(b) {
      b.save = c;
      b.getTextArea = function() {
        return a;
      };
      b.toTextArea = function() {
        b.toTextArea = isNaN;
        c();
        a.parentNode.removeChild(b.getWrapperElement());
        a.style.display = "";
        a.form && (ka(a.form, "submit", c), "function" == typeof a.form.submit && (a.form.submit = f));
      };
    };
    a.style.display = "none";
    var h = n(function(b) {
      a.parentNode.insertBefore(b, a.nextSibling);
    }, b);
    return h;
  };
  var tc = n.StringStream = function(a, b) {
    this.pos = this.start = 0;
    this.string = a;
    this.tabSize = b || 8;
    this.lineStart = this.lastColumnPos = this.lastColumnValue = 0;
  };
  tc.prototype = {eol:function() {
    return this.pos >= this.string.length;
  }, sol:function() {
    return this.pos == this.lineStart;
  }, peek:function() {
    return this.string.charAt(this.pos) || void 0;
  }, next:function() {
    if (this.pos < this.string.length) {
      return this.string.charAt(this.pos++);
    }
  }, eat:function(a) {
    var b = this.string.charAt(this.pos);
    if ("string" == typeof a ? b == a : b && (a.test ? a.test(b) : a(b))) {
      return ++this.pos, b;
    }
  }, eatWhile:function(a) {
    for (var b = this.pos;this.eat(a);) {
    }
    return this.pos > b;
  }, eatSpace:function() {
    for (var a = this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));) {
      ++this.pos;
    }
    return this.pos > a;
  }, skipToEnd:function() {
    this.pos = this.string.length;
  }, skipTo:function(a) {
    a = this.string.indexOf(a, this.pos);
    if (-1 < a) {
      return this.pos = a, !0;
    }
  }, backUp:function(a) {
    this.pos -= a;
  }, column:function() {
    this.lastColumnPos < this.start && (this.lastColumnValue = ba(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start);
    return this.lastColumnValue - (this.lineStart ? ba(this.string, this.lineStart, this.tabSize) : 0);
  }, indentation:function() {
    return ba(this.string, null, this.tabSize) - (this.lineStart ? ba(this.string, this.lineStart, this.tabSize) : 0);
  }, match:function(a, b, c) {
    if ("string" == typeof a) {
      var d = function(a) {
        return c ? a.toLowerCase() : a;
      }, e = this.string.substr(this.pos, a.length);
      if (d(e) == d(a)) {
        return !1 !== b && (this.pos += a.length), !0;
      }
    } else {
      if ((a = this.string.slice(this.pos).match(a)) && 0 < a.index) {
        return null;
      }
      a && !1 !== b && (this.pos += a[0].length);
      return a;
    }
  }, current:function() {
    return this.string.slice(this.start, this.pos);
  }, hideFirstChars:function(a, b) {
    this.lineStart += a;
    try {
      return b();
    } finally {
      this.lineStart -= a;
    }
  }};
  var sd = 0, Ia = n.TextMarker = function(a, b) {
    this.lines = [];
    this.type = b;
    this.doc = a;
    this.id = ++sd;
  };
  $a(Ia);
  Ia.prototype.clear = function() {
    if (!this.explicitlyCleared) {
      var a = this.doc.cm, b = a && !a.curOp;
      b && La(a);
      if (W(this, "clear")) {
        var c = this.find();
        c && Q(this, "clear", c.from, c.to);
      }
      for (var d = c = null, e = 0;e < this.lines.length;++e) {
        var f = this.lines[e], g = zb(f.markedSpans, this);
        a && !this.collapsed ? na(a, F(f), "text") : a && (null != g.to && (d = F(f)), null != g.from && (c = F(f)));
        for (var h = f, k = f.markedSpans, l = g, m = void 0, n = 0;n < k.length;++n) {
          k[n] != l && (m || (m = [])).push(k[n]);
        }
        h.markedSpans = m;
        null == g.from && this.collapsed && !xa(this.doc, f) && a && da(f, wa(a.display));
      }
      if (a && this.collapsed && !a.options.lineWrapping) {
        for (e = 0;e < this.lines.length;++e) {
          f = ja(this.lines[e]), g = Kb(f), g > a.display.maxLineLength && (a.display.maxLine = f, a.display.maxLineLength = g, a.display.maxLineChanged = !0);
        }
      }
      null != c && a && this.collapsed && N(a, c, d + 1);
      this.lines.length = 0;
      this.explicitlyCleared = !0;
      this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, a && je(a.doc));
      a && Q(a, "markerCleared", a, this);
      b && Na(a);
      this.parent && this.parent.clear();
    }
  };
  Ia.prototype.find = function(a, b) {
    null == a && "bookmark" == this.type && (a = 1);
    for (var c, d, e = 0;e < this.lines.length;++e) {
      var f = this.lines[e], g = zb(f.markedSpans, this);
      if (null != g.from && (c = q(b ? f : F(f), g.from), -1 == a)) {
        return c;
      }
      if (null != g.to && (d = q(b ? f : F(f), g.to), 1 == a)) {
        return d;
      }
    }
    return c && {from:c, to:d};
  };
  Ia.prototype.changed = function() {
    var a = this.find(-1, !0), b = this, c = this.doc.cm;
    a && c && R(c, function() {
      var d = a.line, e = F(a.line);
      if (e = Vc(c, e)) {
        qe(e), c.curOp.selectionChanged = c.curOp.forceUpdate = !0;
      }
      c.curOp.updateMaxLine = !0;
      xa(b.doc, d) || null == b.height || (e = b.height, b.height = null, (e = vb(b) - e) && da(d, d.height + e));
    });
  };
  Ia.prototype.attachLine = function(a) {
    if (!this.lines.length && this.doc.cm) {
      var b = this.doc.cm.curOp;
      b.maybeHiddenMarkers && -1 != D(b.maybeHiddenMarkers, this) || (b.maybeUnhiddenMarkers || (b.maybeUnhiddenMarkers = [])).push(this);
    }
    this.lines.push(a);
  };
  Ia.prototype.detachLine = function(a) {
    this.lines.splice(D(this.lines, a), 1);
    !this.lines.length && this.doc.cm && (a = this.doc.cm.curOp, (a.maybeHiddenMarkers || (a.maybeHiddenMarkers = [])).push(this));
  };
  var sd = 0, rc = n.SharedTextMarker = function(a, b) {
    this.markers = a;
    this.primary = b;
    for (var c = 0;c < a.length;++c) {
      a[c].parent = this;
    }
  };
  $a(rc);
  rc.prototype.clear = function() {
    if (!this.explicitlyCleared) {
      this.explicitlyCleared = !0;
      for (var a = 0;a < this.markers.length;++a) {
        this.markers[a].clear();
      }
      Q(this, "clear");
    }
  };
  rc.prototype.find = function(a, b) {
    return this.primary.find(a, b);
  };
  var sc = n.LineWidget = function(a, b, c) {
    if (c) {
      for (var d in c) {
        c.hasOwnProperty(d) && (this[d] = c[d]);
      }
    }
    this.doc = a;
    this.node = b;
  };
  $a(sc);
  sc.prototype.clear = function() {
    var a = this.doc.cm, b = this.line.widgets, c = this.line, d = F(c);
    if (null != d && b) {
      for (var e = 0;e < b.length;++e) {
        b[e] == this && b.splice(e--, 1);
      }
      b.length || (c.widgets = null);
      var f = vb(this);
      da(c, Math.max(0, c.height - f));
      a && R(a, function() {
        var b = -f;
        fa(c) < (a.curOp && a.curOp.scrollTop || a.doc.scrollTop) && lc(a, null, b);
        na(a, d, "widget");
      });
    }
  };
  sc.prototype.changed = function() {
    var a = this.height, b = this.doc.cm, c = this.line;
    this.height = null;
    var d = vb(this) - a;
    d && (da(c, c.height + d), b && R(b, function() {
      b.curOp.forceUpdate = !0;
      fa(c) < (b.curOp && b.curOp.scrollTop || b.doc.scrollTop) && lc(b, null, d);
    }));
  };
  var Ab = n.Line = function(a, b, c) {
    this.text = a;
    Ze(this, b);
    this.height = c ? c(this) : 1;
  };
  $a(Ab);
  Ab.prototype.lineNo = function() {
    return F(this);
  };
  var jg = {}, ig = {};
  Bb.prototype = {chunkSize:function() {
    return this.lines.length;
  }, removeInner:function(a, b) {
    for (var c = a, d = a + b;c < d;++c) {
      var e = this.lines[c];
      this.height -= e.height;
      var f = e;
      f.parent = null;
      Ye(f);
      Q(e, "delete");
    }
    this.lines.splice(a, b);
  }, collapse:function(a) {
    a.push.apply(a, this.lines);
  }, insertInner:function(a, b, c) {
    this.height += c;
    this.lines = this.lines.slice(0, a).concat(b).concat(this.lines.slice(a));
    for (a = 0;a < b.length;++a) {
      b[a].parent = this;
    }
  }, iterN:function(a, b, c) {
    for (b = a + b;a < b;++a) {
      if (c(this.lines[a])) {
        return !0;
      }
    }
  }};
  Cb.prototype = {chunkSize:function() {
    return this.size;
  }, removeInner:function(a, b) {
    this.size -= b;
    for (var c = 0;c < this.children.length;++c) {
      var d = this.children[c], e = d.chunkSize();
      if (a < e) {
        var f = Math.min(b, e - a), g = d.height;
        d.removeInner(a, f);
        this.height -= g - d.height;
        e == f && (this.children.splice(c--, 1), d.parent = null);
        if (0 == (b -= f)) {
          break;
        }
        a = 0;
      } else {
        a -= e;
      }
    }
    25 > this.size - b && (1 < this.children.length || !(this.children[0] instanceof Bb)) && (c = [], this.collapse(c), this.children = [new Bb(c)], this.children[0].parent = this);
  }, collapse:function(a) {
    for (var b = 0;b < this.children.length;++b) {
      this.children[b].collapse(a);
    }
  }, insertInner:function(a, b, c) {
    this.size += b.length;
    this.height += c;
    for (var d = 0;d < this.children.length;++d) {
      var e = this.children[d], f = e.chunkSize();
      if (a <= f) {
        e.insertInner(a, b, c);
        if (e.lines && 50 < e.lines.length) {
          for (;50 < e.lines.length;) {
            a = e.lines.splice(e.lines.length - 25, 25), a = new Bb(a), e.height -= a.height, this.children.splice(d + 1, 0, a), a.parent = this;
          }
          this.maybeSpill();
        }
        break;
      }
      a -= f;
    }
  }, maybeSpill:function() {
    if (!(10 >= this.children.length)) {
      var a = this;
      do {
        var b = a.children.splice(a.children.length - 5, 5), b = new Cb(b);
        if (a.parent) {
          a.size -= b.size;
          a.height -= b.height;
          var c = D(a.parent.children, a);
          a.parent.children.splice(c + 1, 0, b);
        } else {
          c = new Cb(a.children), c.parent = a, a.children = [c, b], a = c;
        }
        b.parent = a.parent;
      } while (10 < a.children.length);
      a.parent.maybeSpill();
    }
  }, iterN:function(a, b, c) {
    for (var d = 0;d < this.children.length;++d) {
      var e = this.children[d], f = e.chunkSize();
      if (a < f) {
        f = Math.min(b, f - a);
        if (e.iterN(a, f, c)) {
          return !0;
        }
        if (0 == (b -= f)) {
          break;
        }
        a = 0;
      } else {
        a -= f;
      }
    }
  }};
  var wg = 0, P = n.Doc = function(a, b, c, d) {
    if (!(this instanceof P)) {
      return new P(a, b, c, d);
    }
    null == c && (c = 0);
    Cb.call(this, [new Bb([new Ab("", null)])]);
    this.first = c;
    this.scrollTop = this.scrollLeft = 0;
    this.cantEdit = !1;
    this.cleanGeneration = 1;
    this.frontier = c;
    c = q(c, 0);
    this.sel = ha(c);
    this.history = new uc(null);
    this.id = ++wg;
    this.modeOption = b;
    this.lineSep = d;
    this.extend = !1;
    "string" == typeof a && (a = this.splitLines(a));
    qd(this, {from:c, to:c, text:a});
    H(this, ha(c), ia);
  };
  P.prototype = mf(Cb.prototype, {constructor:P, iter:function(a, b, c) {
    c ? this.iterN(a - this.first, b - a, c) : this.iterN(this.first, this.first + this.size, a);
  }, insert:function(a, b) {
    for (var c = 0, d = 0;d < b.length;++d) {
      c += b[d].height;
    }
    this.insertInner(a - this.first, b, c);
  }, remove:function(a, b) {
    this.removeInner(a - this.first, b);
  }, getValue:function(a) {
    var b = xd(this, this.first, this.first + this.size);
    return !1 === a ? b : b.join(a || this.lineSeparator());
  }, setValue:L(function(a) {
    var b = q(this.first, 0), c = this.first + this.size - 1;
    Qa(this, {from:b, to:q(c, t(this, c).text.length), text:this.splitLines(a), origin:"setValue", full:!0}, !0);
    H(this, ha(b));
  }), replaceRange:function(a, b, c, d) {
    b = x(this, b);
    c = c ? x(this, c) : b;
    Wa(this, a, b, c, d);
  }, getRange:function(a, b, c) {
    a = Ca(this, x(this, a), x(this, b));
    return !1 === c ? a : a.join(c || this.lineSeparator());
  }, getLine:function(a) {
    return (a = this.getLineHandle(a)) && a.text;
  }, getLineHandle:function(a) {
    if (rb(this, a)) {
      return t(this, a);
    }
  }, getLineNumber:function(a) {
    return F(a);
  }, getLineHandleVisualStart:function(a) {
    "number" == typeof a && (a = t(this, a));
    return ja(a);
  }, lineCount:function() {
    return this.size;
  }, firstLine:function() {
    return this.first;
  }, lastLine:function() {
    return this.first + this.size - 1;
  }, clipPos:function(a) {
    return x(this, a);
  }, getCursor:function(a) {
    var b = this.sel.primary();
    return null == a || "head" == a ? b.head : "anchor" == a ? b.anchor : "end" == a || "to" == a || !1 === a ? b.to() : b.from();
  }, listSelections:function() {
    return this.sel.ranges;
  }, somethingSelected:function() {
    return this.sel.somethingSelected();
  }, setCursor:L(function(a, b, c) {
    a = x(this, "number" == typeof a ? q(a, b || 0) : a);
    H(this, ha(a, null), c);
  }), setSelection:L(function(a, b, c) {
    var d = x(this, a);
    a = x(this, b || a);
    H(this, ha(d, a), c);
  }), extendSelection:L(function(a, b, c) {
    Ub(this, x(this, a), b && x(this, b), c);
  }), extendSelections:L(function(a, b) {
    de(this, ce(this, a), b);
  }), extendSelectionsBy:L(function(a, b) {
    var c = Rb(this.sel.ranges, a);
    de(this, ce(this, c), b);
  }), setSelections:L(function(a, b, c) {
    if (a.length) {
      for (var d = 0, e = [];d < a.length;d++) {
        e[d] = new z(x(this, a[d].anchor), x(this, a[d].head));
      }
      null == b && (b = Math.min(a.length - 1, this.sel.primIndex));
      H(this, aa(e, b), c);
    }
  }), addSelection:L(function(a, b, c) {
    var d = this.sel.ranges.slice(0);
    d.push(new z(x(this, a), x(this, b || a)));
    H(this, aa(d, d.length - 1), c);
  }), getSelection:function(a) {
    for (var b = this.sel.ranges, c, d = 0;d < b.length;d++) {
      var e = Ca(this, b[d].from(), b[d].to());
      c = c ? c.concat(e) : e;
    }
    return !1 === a ? c : c.join(a || this.lineSeparator());
  }, getSelections:function(a) {
    for (var b = [], c = this.sel.ranges, d = 0;d < c.length;d++) {
      var e = Ca(this, c[d].from(), c[d].to());
      !1 !== a && (e = e.join(a || this.lineSeparator()));
      b[d] = e;
    }
    return b;
  }, replaceSelection:function(a, b, c) {
    for (var d = [], e = 0;e < this.sel.ranges.length;e++) {
      d[e] = a;
    }
    this.replaceSelections(d, b, c || "+input");
  }, replaceSelections:L(function(a, b, c) {
    for (var d = [], e = this.sel, f = 0;f < e.ranges.length;f++) {
      var g = e.ranges[f];
      d[f] = {from:g.from(), to:g.to(), text:this.splitLines(a[f]), origin:c};
    }
    if (f = b && "end" != b) {
      f = [];
      c = a = q(this.first, 0);
      for (e = 0;e < d.length;e++) {
        var h = d[e], g = Je(h.from, a, c), k = Je(Ga(h), a, c);
        a = h.to;
        c = k;
        "around" == b ? (h = this.sel.ranges[e], h = 0 > y(h.head, h.anchor), f[e] = new z(h ? k : g, h ? g : k)) : f[e] = new z(g, g);
      }
      f = new la(f, this.sel.primIndex);
    }
    b = f;
    for (f = d.length - 1;0 <= f;f--) {
      Qa(this, d[f]);
    }
    b ? ee(this, b) : this.cm && Ra(this.cm);
  }), undo:L(function() {
    kc(this, "undo");
  }), redo:L(function() {
    kc(this, "redo");
  }), undoSelection:L(function() {
    kc(this, "undo", !0);
  }), redoSelection:L(function() {
    kc(this, "redo", !0);
  }), setExtending:function(a) {
    this.extend = a;
  }, getExtending:function() {
    return this.extend;
  }, historySize:function() {
    for (var a = this.history, b = 0, c = 0, d = 0;d < a.done.length;d++) {
      a.done[d].ranges || ++b;
    }
    for (d = 0;d < a.undone.length;d++) {
      a.undone[d].ranges || ++c;
    }
    return {undo:b, redo:c};
  }, clearHistory:function() {
    this.history = new uc(this.history.maxGeneration);
  }, markClean:function() {
    this.cleanGeneration = this.changeGeneration(!0);
  }, changeGeneration:function(a) {
    a && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null);
    return this.history.generation;
  }, isClean:function(a) {
    return this.history.generation == (a || this.cleanGeneration);
  }, getHistory:function() {
    return {done:Za(this.history.done), undone:Za(this.history.undone)};
  }, setHistory:function(a) {
    var b = this.history = new uc(this.history.maxGeneration);
    b.done = Za(a.done.slice(0), null, !0);
    b.undone = Za(a.undone.slice(0), null, !0);
  }, addLineClass:L(function(a, b, c) {
    return nc(this, a, "gutter" == b ? "gutter" : "class", function(a) {
      var e = "text" == b ? "textClass" : "background" == b ? "bgClass" : "gutter" == b ? "gutterClass" : "wrapClass";
      if (a[e]) {
        if (Fb(c).test(a[e])) {
          return !1;
        }
        a[e] += " " + c;
      } else {
        a[e] = c;
      }
      return !0;
    });
  }), removeLineClass:L(function(a, b, c) {
    return nc(this, a, "gutter" == b ? "gutter" : "class", function(a) {
      var e = "text" == b ? "textClass" : "background" == b ? "bgClass" : "gutter" == b ? "gutterClass" : "wrapClass", f = a[e];
      if (f) {
        if (null == c) {
          a[e] = null;
        } else {
          var g = f.match(Fb(c));
          if (!g) {
            return !1;
          }
          var h = g.index + g[0].length;
          a[e] = f.slice(0, g.index) + (g.index && h != f.length ? " " : "") + f.slice(h) || null;
        }
      } else {
        return !1;
      }
      return !0;
    });
  }), addLineWidget:L(function(a, b, c) {
    return hg(this, a, b, c);
  }), removeLineWidget:function(a) {
    a.clear();
  }, markText:function(a, b, c) {
    return Ya(this, x(this, a), x(this, b), c, c && c.type || "range");
  }, setBookmark:function(a, b) {
    var c = {replacedWith:b && (null == b.nodeType ? b.widget : b), insertLeft:b && b.insertLeft, clearWhenEmpty:!1, shared:b && b.shared, handleMouseEvents:b && b.handleMouseEvents};
    a = x(this, a);
    return Ya(this, a, a, c, "bookmark");
  }, findMarksAt:function(a) {
    a = x(this, a);
    var b = [], c = t(this, a.line).markedSpans;
    if (c) {
      for (var d = 0;d < c.length;++d) {
        var e = c[d];
        (null == e.from || e.from <= a.ch) && (null == e.to || e.to >= a.ch) && b.push(e.marker.parent || e.marker);
      }
    }
    return b;
  }, findMarks:function(a, b, c) {
    a = x(this, a);
    b = x(this, b);
    var d = [], e = a.line;
    this.iter(a.line, b.line + 1, function(f) {
      if (f = f.markedSpans) {
        for (var g = 0;g < f.length;g++) {
          var h = f[g];
          e == a.line && a.ch > h.to || null == h.from && e != a.line || e == b.line && h.from > b.ch || c && !c(h.marker) || d.push(h.marker.parent || h.marker);
        }
      }
      ++e;
    });
    return d;
  }, getAllMarks:function() {
    var a = [];
    this.iter(function(b) {
      if (b = b.markedSpans) {
        for (var c = 0;c < b.length;++c) {
          null != b[c].from && a.push(b[c].marker);
        }
      }
    });
    return a;
  }, posFromIndex:function(a) {
    var b, c = this.first;
    this.iter(function(d) {
      d = d.text.length + 1;
      if (d > a) {
        return b = a, !0;
      }
      a -= d;
      ++c;
    });
    return x(this, q(c, b));
  }, indexFromPos:function(a) {
    a = x(this, a);
    var b = a.ch;
    if (a.line < this.first || 0 > a.ch) {
      return 0;
    }
    this.iter(this.first, a.line, function(a) {
      b += a.text.length + 1;
    });
    return b;
  }, copy:function(a) {
    var b = new P(xd(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep);
    b.scrollTop = this.scrollTop;
    b.scrollLeft = this.scrollLeft;
    b.sel = this.sel;
    b.extend = !1;
    a && (b.history.undoDepth = this.history.undoDepth, b.setHistory(this.getHistory()));
    return b;
  }, linkedDoc:function(a) {
    a || (a = {});
    var b = this.first, c = this.first + this.size;
    null != a.from && a.from > b && (b = a.from);
    null != a.to && a.to < c && (c = a.to);
    b = new P(xd(this, b, c), a.mode || this.modeOption, b, this.lineSep);
    a.sharedHist && (b.history = this.history);
    (this.linked || (this.linked = [])).push({doc:b, sharedHist:a.sharedHist});
    b.linked = [{doc:this, isParent:!0, sharedHist:a.sharedHist}];
    a = We(this);
    for (c = 0;c < a.length;c++) {
      var d = a[c], e = d.find(), f = b.clipPos(e.from), e = b.clipPos(e.to);
      y(f, e) && (f = Ya(b, f, e, d.primary, d.primary.type), d.markers.push(f), f.parent = d);
    }
    return b;
  }, unlinkDoc:function(a) {
    a instanceof n && (a = a.doc);
    if (this.linked) {
      for (var b = 0;b < this.linked.length;++b) {
        if (this.linked[b].doc == a) {
          this.linked.splice(b, 1);
          a.unlinkDoc(this);
          fg(We(this));
          break;
        }
      }
    }
    if (a.history == this.history) {
      var c = [a.id];
      Ha(a, function(a) {
        c.push(a.id);
      }, !0);
      a.history = new uc(null);
      a.history.done = Za(this.history.done, c);
      a.history.undone = Za(this.history.undone, c);
    }
  }, iterLinkedDocs:function(a) {
    Ha(this, a);
  }, getMode:function() {
    return this.mode;
  }, getEditor:function() {
    return this.cm;
  }, splitLines:function(a) {
    return this.lineSep ? a.split(this.lineSep) : xg(a);
  }, lineSeparator:function() {
    return this.lineSep || "\n";
  }});
  P.prototype.eachLine = P.prototype.iter;
  var yg = "iter insert remove copy getEditor constructor".split(" "), Jb;
  for (Jb in P.prototype) {
    P.prototype.hasOwnProperty(Jb) && 0 > D(yg, Jb) && (n.prototype[Jb] = function(a) {
      return function() {
        return a.apply(this.doc, arguments);
      };
    }(P.prototype[Jb]));
  }
  $a(P);
  var M = n.e_preventDefault = function(a) {
    a.preventDefault ? a.preventDefault() : a.returnValue = !1;
  }, zg = n.e_stopPropagation = function(a) {
    a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0;
  }, dc = n.e_stop = function(a) {
    M(a);
    zg(a);
  }, v = n.on = function(a, b, c) {
    a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : (a = a._handlers || (a._handlers = {}), (a[b] || (a[b] = [])).push(c));
  }, lf = [], ka = n.off = function(a, b, c) {
    if (a.removeEventListener) {
      a.removeEventListener(b, c, !1);
    } else {
      if (a.detachEvent) {
        a.detachEvent("on" + b, c);
      } else {
        for (a = vc(a, b, !1), b = 0;b < a.length;++b) {
          if (a[b] == c) {
            a.splice(b, 1);
            break;
          }
        }
      }
    }
  }, J = n.signal = function(a, b) {
    var c = vc(a, b, !0);
    if (c.length) {
      for (var d = Array.prototype.slice.call(arguments, 2), e = 0;e < c.length;++e) {
        c[e].apply(null, d);
      }
    }
  }, Db = null, Hd = 30, Fe = n.Pass = {toString:function() {
    return "CodeMirror.Pass";
  }}, ia = {scroll:!1}, kd = {origin:"*mouse"}, Gb = {origin:"+move"};
  va.prototype.set = function(a, b) {
    clearTimeout(this.id);
    this.id = setTimeout(b, a);
  };
  var ba = n.countColumn = function(a, b, c, d, e) {
    null == b && (b = a.search(/[^\s\u00a0]/), -1 == b && (b = a.length));
    d = d || 0;
    for (e = e || 0;;) {
      var f = a.indexOf("\t", d);
      if (0 > f || f >= b) {
        return e + (b - d);
      }
      e += f - d;
      e += c - e % c;
      d = f + 1;
    }
  }, De = n.findColumn = function(a, b, c) {
    for (var d = 0, e = 0;;) {
      var f = a.indexOf("\t", d);
      -1 == f && (f = a.length);
      var g = f - d;
      if (f == a.length || e + g >= b) {
        return d + Math.min(g, b - e);
      }
      e += f - d;
      e += c - e % c;
      d = f + 1;
      if (e >= b) {
        return d;
      }
    }
  }, wc = [""], ab = function(a) {
    a.select();
  };
  Sa ? ab = function(a) {
    a.selectionStart = 0;
    a.selectionEnd = a.value.length;
  } : B && (ab = function(a) {
    try {
      a.select();
    } catch (b) {
    }
  });
  var Ag = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/, nf = n.isWordChar = function(a) {
    return /\w/.test(a) || "\u0080" < a && (a.toUpperCase() != a.toLowerCase() || Ag.test(a));
  }, qg = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/, 
  Da;
  Da = document.createRange ? function(a, b, c, d) {
    var e = document.createRange();
    e.setEnd(d || a, c);
    e.setStart(a, b);
    return e;
  } : function(a, b, c) {
    var d = document.body.createTextRange();
    try {
      d.moveToElementText(a.parentNode);
    } catch (e) {
      return d;
    }
    d.collapse(!0);
    d.moveEnd("character", c);
    d.moveStart("character", b);
    return d;
  };
  var Wc = n.contains = function(a, b) {
    3 == b.nodeType && (b = b.parentNode);
    if (a.contains) {
      return a.contains(b);
    }
    do {
      if (11 == b.nodeType && (b = b.host), b == a) {
        return !0;
      }
    } while (b = b.parentNode);
  };
  B && 11 > C && (ga = function() {
    try {
      return document.activeElement;
    } catch (a) {
      return document.body;
    }
  });
  var lb = n.rmClass = function(a, b) {
    var c = a.className, d = Fb(b).exec(c);
    if (d) {
      var e = c.slice(d.index + d[0].length);
      a.className = c.slice(0, d.index) + (e ? d[1] + e : "");
    }
  }, nb = n.addClass = function(a, b) {
    var c = a.className;
    Fb(b).test(c) || (a.className += (c ? " " : "") + b);
  }, Dd = !1, Tf = function() {
    if (B && 9 > C) {
      return !1;
    }
    var a = r("div");
    return "draggable" in a || "dragDrop" in a;
  }(), yd, vd, xg = n.splitLines = 3 != "\n\nb".split(/\n/).length ? function(a) {
    for (var b = 0, c = [], d = a.length;b <= d;) {
      var e = a.indexOf("\n", b);
      -1 == e && (e = a.length);
      var f = a.slice(b, "\r" == a.charAt(e - 1) ? e - 1 : e), g = f.indexOf("\r");
      -1 != g ? (c.push(f.slice(0, g)), b += g + 1) : (c.push(f), b = e + 1);
    }
    return c;
  } : function(a) {
    return a.split(/\r\n?|\n/);
  }, vg = window.getSelection ? function(a) {
    try {
      return a.selectionStart != a.selectionEnd;
    } catch (b) {
      return !1;
    }
  } : function(a) {
    try {
      var b = a.ownerDocument.selection.createRange();
    } catch (c) {
    }
    return b && b.parentElement() == a ? 0 != b.compareEndPoints("StartToEnd", b) : !1;
  }, He = function() {
    var a = r("div");
    if ("oncopy" in a) {
      return !0;
    }
    a.setAttribute("oncopy", "return;");
    return "function" == typeof a.oncopy;
  }(), cd = null, Ka = n.keyNames = {3:"Enter", 8:"Backspace", 9:"Tab", 13:"Enter", 16:"Shift", 17:"Ctrl", 18:"Alt", 19:"Pause", 20:"CapsLock", 27:"Esc", 32:"Space", 33:"PageUp", 34:"PageDown", 35:"End", 36:"Home", 37:"Left", 38:"Up", 39:"Right", 40:"Down", 44:"PrintScrn", 45:"Insert", 46:"Delete", 59:";", 61:"=", 91:"Mod", 92:"Mod", 93:"Mod", 106:"*", 107:"=", 109:"-", 110:".", 111:"/", 127:"Delete", 173:"-", 186:";", 187:"=", 188:",", 189:"-", 190:".", 191:"/", 192:"`", 219:"[", 220:"\\", 221:"]", 
  222:"'", 63232:"Up", 63233:"Down", 63234:"Left", 63235:"Right", 63272:"Delete", 63273:"Home", 63275:"End", 63276:"PageUp", 63277:"PageDown", 63302:"Insert"};
  (function() {
    for (var a = 0;10 > a;a++) {
      Ka[a + 48] = Ka[a + 96] = String(a);
    }
    for (a = 65;90 >= a;a++) {
      Ka[a] = String.fromCharCode(a);
    }
    for (a = 1;12 >= a;a++) {
      Ka[a + 111] = Ka[a + 63235] = "F" + a;
    }
  })();
  var wb, og = function() {
    function a(a) {
      return 247 >= a ? "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN".charAt(a) : 1424 <= a && 1524 >= a ? "R" : 1536 <= a && 1773 >= a ? "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm".charAt(a - 
      1536) : 1774 <= a && 2220 >= a ? "r" : 8192 <= a && 8203 >= a ? "w" : 8204 == a ? "b" : "L";
    }
    function b(a, b, c) {
      this.level = a;
      this.from = b;
      this.to = c;
    }
    var c = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, d = /[stwN]/, e = /[LRr]/, f = /[Lb1n]/, g = /[1n]/;
    return function(h) {
      if (!c.test(h)) {
        return !1;
      }
      for (var k = h.length, l = [], m = 0, n;m < k;++m) {
        l.push(a(h.charCodeAt(m)));
      }
      for (var m = 0, p = "L";m < k;++m) {
        n = l[m], "m" == n ? l[m] = p : p = n;
      }
      m = 0;
      for (p = "L";m < k;++m) {
        n = l[m], "1" == n && "r" == p ? l[m] = "n" : e.test(n) && (p = n, "r" == n && (l[m] = "R"));
      }
      m = 1;
      for (p = l[0];m < k - 1;++m) {
        n = l[m], "+" == n && "1" == p && "1" == l[m + 1] ? l[m] = "1" : "," != n || p != l[m + 1] || "1" != p && "n" != p || (l[m] = p), p = n;
      }
      for (m = 0;m < k;++m) {
        if (n = l[m], "," == n) {
          l[m] = "N";
        } else {
          if ("%" == n) {
            for (p = m + 1;p < k && "%" == l[p];++p) {
            }
            var q = m && "!" == l[m - 1] || p < k && "1" == l[p] ? "1" : "N";
            for (n = m;n < p;++n) {
              l[n] = q;
            }
            m = p - 1;
          }
        }
      }
      m = 0;
      for (p = "L";m < k;++m) {
        n = l[m], "L" == p && "1" == n ? l[m] = "L" : e.test(n) && (p = n);
      }
      for (m = 0;m < k;++m) {
        if (d.test(l[m])) {
          for (p = m + 1;p < k && d.test(l[p]);++p) {
          }
          n = "L" == (p < k ? l[p] : "L");
          q = "L" == (m ? l[m - 1] : "L") || n ? "L" : "R";
          for (n = m;n < p;++n) {
            l[n] = q;
          }
          m = p - 1;
        }
      }
      for (var p = [], r, m = 0;m < k;) {
        if (f.test(l[m])) {
          n = m;
          for (++m;m < k && f.test(l[m]);++m) {
          }
          p.push(new b(0, n, m));
        } else {
          var t = m, q = p.length;
          for (++m;m < k && "L" != l[m];++m) {
          }
          for (n = t;n < m;) {
            if (g.test(l[n])) {
              t < n && p.splice(q, 0, new b(1, t, n));
              t = n;
              for (++n;n < m && g.test(l[n]);++n) {
              }
              p.splice(q, 0, new b(2, t, n));
              t = n;
            } else {
              ++n;
            }
          }
          t < m && p.splice(q, 0, new b(1, t, m));
        }
      }
      1 == p[0].level && (r = h.match(/^\s+/)) && (p[0].from = r[0].length, p.unshift(new b(0, 0, r[0].length)));
      1 == A(p).level && (r = h.match(/\s+$/)) && (A(p).to -= r[0].length, p.push(new b(0, k - r[0].length, k)));
      2 == p[0].level && p.unshift(new b(1, p[0].to, p[0].to));
      p[0].level != A(p).level && p.push(new b(p[0].level, k, k));
      return p;
    };
  }();
  n.version = "5.10.0";
  return n;
});
