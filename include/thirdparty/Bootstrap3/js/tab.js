+function(c) {
  function g(a) {
    return this.each(function() {
      var f = c(this), b = f.data("bs.tab");
      b || f.data("bs.tab", b = new d(this));
      if ("string" == typeof a) {
        b[a]();
      }
    });
  }
  var d = function(a) {
    this.element = c(a);
  };
  d.VERSION = "3.3.6";
  d.TRANSITION_DURATION = 150;
  d.prototype.show = function() {
    var a = this.element, f = a.closest("ul:not(.dropdown-menu)"), b = a.data("target");
    b || (b = (b = a.attr("href")) && b.replace(/.*(?=#[^\s]*$)/, ""));
    if (!a.parent("li").hasClass("active")) {
      var d = f.find(".active:last a"), e = c.Event("hide.bs.tab", {relatedTarget:a[0]}), h = c.Event("show.bs.tab", {relatedTarget:d[0]});
      d.trigger(e);
      a.trigger(h);
      h.isDefaultPrevented() || e.isDefaultPrevented() || (b = c(b), this.activate(a.closest("li"), f), this.activate(b, b.parent(), function() {
        d.trigger({type:"hidden.bs.tab", relatedTarget:a[0]});
        a.trigger({type:"shown.bs.tab", relatedTarget:d[0]});
      }));
    }
  };
  d.prototype.activate = function(a, f, b) {
    function g() {
      e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1);
      a.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0);
      h ? (a[0].offsetWidth, a.addClass("in")) : a.removeClass("fade");
      a.parent(".dropdown-menu").length && a.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0);
      b && b();
    }
    var e = f.find("> .active"), h = b && c.support.transition && (e.length && e.hasClass("fade") || !!f.find("> .fade").length);
    e.length && h ? e.one("bsTransitionEnd", g).emulateTransitionEnd(d.TRANSITION_DURATION) : g();
    e.removeClass("in");
  };
  var l = c.fn.tab;
  c.fn.tab = g;
  c.fn.tab.Constructor = d;
  c.fn.tab.noConflict = function() {
    c.fn.tab = l;
    return this;
  };
  var k = function(a) {
    a.preventDefault();
    g.call(c(this), "show");
  };
  c(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', k).on("click.bs.tab.data-api", '[data-toggle="pill"]', k);
}(jQuery);
