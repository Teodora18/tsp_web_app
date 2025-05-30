var cc = Object.defineProperty;
var uc = (s, t, e) =>
  t in s
    ? cc(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (s[t] = e);
var Ra = (s, t, e) => uc(s, typeof t != "symbol" ? t + "" : t, e);
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) i(n);
  new MutationObserver((n) => {
    for (const r of n)
      if (r.type === "childList")
        for (const o of r.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && i(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(n) {
    const r = {};
    return (
      n.integrity && (r.integrity = n.integrity),
      n.referrerPolicy && (r.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : n.crossOrigin === "anonymous"
          ? (r.credentials = "omit")
          : (r.credentials = "same-origin"),
      r
    );
  }
  function i(n) {
    if (n.ep) return;
    n.ep = !0;
    const r = e(n);
    fetch(n.href, r);
  }
})();
const ft = { ADD: "add", REMOVE: "remove" },
  Hi = { PROPERTYCHANGE: "propertychange" },
  j = {
    CHANGE: "change",
    ERROR: "error",
    CONTEXTMENU: "contextmenu",
    CLICK: "click",
    DBLCLICK: "dblclick",
    KEYDOWN: "keydown",
    KEYPRESS: "keypress",
    LOAD: "load",
    TOUCHMOVE: "touchmove",
    WHEEL: "wheel",
  };
class Xs {
  constructor() {
    this.disposed = !1;
  }
  dispose() {
    this.disposed || ((this.disposed = !0), this.disposeInternal());
  }
  disposeInternal() {}
}
function dc(s, t, e) {
  let i, n;
  e = e || Me;
  let r = 0,
    o = s.length,
    a = !1;
  for (; r < o; )
    (i = r + ((o - r) >> 1)),
      (n = +e(s[i], t)),
      n < 0 ? (r = i + 1) : ((o = i), (a = !n));
  return a ? r : ~r;
}
function Me(s, t) {
  return s > t ? 1 : s < t ? -1 : 0;
}
function fc(s, t) {
  return s < t ? 1 : s > t ? -1 : 0;
}
function Eo(s, t, e) {
  if (s[0] <= t) return 0;
  const i = s.length;
  if (t <= s[i - 1]) return i - 1;
  if (typeof e == "function") {
    for (let n = 1; n < i; ++n) {
      const r = s[n];
      if (r === t) return n;
      if (r < t) return e(t, s[n - 1], r) > 0 ? n - 1 : n;
    }
    return i - 1;
  }
  if (e > 0) {
    for (let n = 1; n < i; ++n) if (s[n] < t) return n - 1;
    return i - 1;
  }
  if (e < 0) {
    for (let n = 1; n < i; ++n) if (s[n] <= t) return n;
    return i - 1;
  }
  for (let n = 1; n < i; ++n) {
    if (s[n] == t) return n;
    if (s[n] < t) return s[n - 1] - t < t - s[n] ? n - 1 : n;
  }
  return i - 1;
}
function gc(s, t, e) {
  for (; t < e; ) {
    const i = s[t];
    (s[t] = s[e]), (s[e] = i), ++t, --e;
  }
}
function Qt(s, t) {
  const e = Array.isArray(t) ? t : [t],
    i = e.length;
  for (let n = 0; n < i; n++) s[s.length] = e[n];
}
function Ne(s, t) {
  const e = s.length;
  if (e !== t.length) return !1;
  for (let i = 0; i < e; i++) if (s[i] !== t[i]) return !1;
  return !0;
}
function _c(s, t, e) {
  const i = t || Me;
  return s.every(function (n, r) {
    if (r === 0) return !0;
    const o = i(s[r - 1], n);
    return !(o > 0 || o === 0);
  });
}
function De() {
  return !0;
}
function Ei() {
  return !1;
}
function Mn() {}
function Ol(s) {
  let t, e, i;
  return function () {
    const n = Array.prototype.slice.call(arguments);
    return (
      (!e || this !== i || !Ne(n, e)) &&
        ((i = this), (e = n), (t = s.apply(this, arguments))),
      t
    );
  };
}
function mc(s) {
  function t() {
    let e;
    try {
      e = s();
    } catch (i) {
      return Promise.reject(i);
    }
    return e instanceof Promise ? e : Promise.resolve(e);
  }
  return t();
}
function rn(s) {
  for (const t in s) delete s[t];
}
function mi(s) {
  let t;
  for (t in s) return !1;
  return !t;
}
class Kt {
  constructor(t) {
    this.propagationStopped,
      this.defaultPrevented,
      (this.type = t),
      (this.target = null);
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
  stopPropagation() {
    this.propagationStopped = !0;
  }
}
class Ws extends Xs {
  constructor(t) {
    super(),
      (this.eventTarget_ = t),
      (this.pendingRemovals_ = null),
      (this.dispatching_ = null),
      (this.listeners_ = null);
  }
  addEventListener(t, e) {
    if (!t || !e) return;
    const i = this.listeners_ || (this.listeners_ = {}),
      n = i[t] || (i[t] = []);
    n.includes(e) || n.push(e);
  }
  dispatchEvent(t) {
    const e = typeof t == "string",
      i = e ? t : t.type,
      n = this.listeners_ && this.listeners_[i];
    if (!n) return;
    const r = e ? new Kt(t) : t;
    r.target || (r.target = this.eventTarget_ || this);
    const o = this.dispatching_ || (this.dispatching_ = {}),
      a = this.pendingRemovals_ || (this.pendingRemovals_ = {});
    i in o || ((o[i] = 0), (a[i] = 0)), ++o[i];
    let l;
    for (let c = 0, h = n.length; c < h; ++c)
      if (
        ("handleEvent" in n[c]
          ? (l = n[c].handleEvent(r))
          : (l = n[c].call(this, r)),
        l === !1 || r.propagationStopped)
      ) {
        l = !1;
        break;
      }
    if (--o[i] === 0) {
      let c = a[i];
      for (delete a[i]; c--; ) this.removeEventListener(i, Mn);
      delete o[i];
    }
    return l;
  }
  disposeInternal() {
    this.listeners_ && rn(this.listeners_);
  }
  getListeners(t) {
    return (this.listeners_ && this.listeners_[t]) || void 0;
  }
  hasListener(t) {
    return this.listeners_
      ? t
        ? t in this.listeners_
        : Object.keys(this.listeners_).length > 0
      : !1;
  }
  removeEventListener(t, e) {
    if (!this.listeners_) return;
    const i = this.listeners_[t];
    if (!i) return;
    const n = i.indexOf(e);
    n !== -1 &&
      (this.pendingRemovals_ && t in this.pendingRemovals_
        ? ((i[n] = Mn), ++this.pendingRemovals_[t])
        : (i.splice(n, 1), i.length === 0 && delete this.listeners_[t]));
  }
}
function $(s, t, e, i, n) {
  if (n) {
    const o = e;
    e = function (a) {
      return s.removeEventListener(t, e), o.call(i ?? this, a);
    };
  } else i && i !== s && (e = e.bind(i));
  const r = { target: s, type: t, listener: e };
  return s.addEventListener(t, e), r;
}
function ws(s, t, e, i) {
  return $(s, t, e, i, !0);
}
function lt(s) {
  s && s.target && (s.target.removeEventListener(s.type, s.listener), rn(s));
}
class jn extends Ws {
  constructor() {
    super(),
      (this.on = this.onInternal),
      (this.once = this.onceInternal),
      (this.un = this.unInternal),
      (this.revision_ = 0);
  }
  changed() {
    ++this.revision_, this.dispatchEvent(j.CHANGE);
  }
  getRevision() {
    return this.revision_;
  }
  onInternal(t, e) {
    if (Array.isArray(t)) {
      const i = t.length,
        n = new Array(i);
      for (let r = 0; r < i; ++r) n[r] = $(this, t[r], e);
      return n;
    }
    return $(this, t, e);
  }
  onceInternal(t, e) {
    let i;
    if (Array.isArray(t)) {
      const n = t.length;
      i = new Array(n);
      for (let r = 0; r < n; ++r) i[r] = ws(this, t[r], e);
    } else i = ws(this, t, e);
    return (e.ol_key = i), i;
  }
  unInternal(t, e) {
    const i = e.ol_key;
    if (i) yc(i);
    else if (Array.isArray(t))
      for (let n = 0, r = t.length; n < r; ++n)
        this.removeEventListener(t[n], e);
    else this.removeEventListener(t, e);
  }
}
jn.prototype.on;
jn.prototype.once;
jn.prototype.un;
function yc(s) {
  if (Array.isArray(s)) for (let t = 0, e = s.length; t < e; ++t) lt(s[t]);
  else lt(s);
}
function Y() {
  throw new Error("Unimplemented abstract method.");
}
let pc = 0;
function V(s) {
  return s.ol_uid || (s.ol_uid = String(++pc));
}
class va extends Kt {
  constructor(t, e, i) {
    super(t), (this.key = e), (this.oldValue = i);
  }
}
class me extends jn {
  constructor(t) {
    super(),
      this.on,
      this.once,
      this.un,
      V(this),
      (this.values_ = null),
      t !== void 0 && this.setProperties(t);
  }
  get(t) {
    let e;
    return (
      this.values_ && this.values_.hasOwnProperty(t) && (e = this.values_[t]), e
    );
  }
  getKeys() {
    return (this.values_ && Object.keys(this.values_)) || [];
  }
  getProperties() {
    return (this.values_ && Object.assign({}, this.values_)) || {};
  }
  getPropertiesInternal() {
    return this.values_;
  }
  hasProperties() {
    return !!this.values_;
  }
  notify(t, e) {
    let i;
    (i = `change:${t}`),
      this.hasListener(i) && this.dispatchEvent(new va(i, t, e)),
      (i = Hi.PROPERTYCHANGE),
      this.hasListener(i) && this.dispatchEvent(new va(i, t, e));
  }
  addChangeListener(t, e) {
    this.addEventListener(`change:${t}`, e);
  }
  removeChangeListener(t, e) {
    this.removeEventListener(`change:${t}`, e);
  }
  set(t, e, i) {
    const n = this.values_ || (this.values_ = {});
    if (i) n[t] = e;
    else {
      const r = n[t];
      (n[t] = e), r !== e && this.notify(t, r);
    }
  }
  setProperties(t, e) {
    for (const i in t) this.set(i, t[i], e);
  }
  applyProperties(t) {
    t.values_ && Object.assign(this.values_ || (this.values_ = {}), t.values_);
  }
  unset(t, e) {
    if (this.values_ && t in this.values_) {
      const i = this.values_[t];
      delete this.values_[t],
        mi(this.values_) && (this.values_ = null),
        e || this.notify(t, i);
    }
  }
}
const Ia = { LENGTH: "length" };
class es extends Kt {
  constructor(t, e, i) {
    super(t), (this.element = e), (this.index = i);
  }
}
class Xt extends me {
  constructor(t, e) {
    if (
      (super(),
      this.on,
      this.once,
      this.un,
      (e = e || {}),
      (this.unique_ = !!e.unique),
      (this.array_ = t || []),
      this.unique_)
    )
      for (let i = 0, n = this.array_.length; i < n; ++i)
        this.assertUnique_(this.array_[i], i);
    this.updateLength_();
  }
  clear() {
    for (; this.getLength() > 0; ) this.pop();
  }
  extend(t) {
    for (let e = 0, i = t.length; e < i; ++e) this.push(t[e]);
    return this;
  }
  forEach(t) {
    const e = this.array_;
    for (let i = 0, n = e.length; i < n; ++i) t(e[i], i, e);
  }
  getArray() {
    return this.array_;
  }
  item(t) {
    return this.array_[t];
  }
  getLength() {
    return this.get(Ia.LENGTH);
  }
  insertAt(t, e) {
    if (t < 0 || t > this.getLength())
      throw new Error("Index out of bounds: " + t);
    this.unique_ && this.assertUnique_(e),
      this.array_.splice(t, 0, e),
      this.updateLength_(),
      this.dispatchEvent(new es(ft.ADD, e, t));
  }
  pop() {
    return this.removeAt(this.getLength() - 1);
  }
  push(t) {
    this.unique_ && this.assertUnique_(t);
    const e = this.getLength();
    return this.insertAt(e, t), this.getLength();
  }
  remove(t) {
    const e = this.array_;
    for (let i = 0, n = e.length; i < n; ++i)
      if (e[i] === t) return this.removeAt(i);
  }
  removeAt(t) {
    if (t < 0 || t >= this.getLength()) return;
    const e = this.array_[t];
    return (
      this.array_.splice(t, 1),
      this.updateLength_(),
      this.dispatchEvent(new es(ft.REMOVE, e, t)),
      e
    );
  }
  setAt(t, e) {
    const i = this.getLength();
    if (t >= i) {
      this.insertAt(t, e);
      return;
    }
    if (t < 0) throw new Error("Index out of bounds: " + t);
    this.unique_ && this.assertUnique_(e, t);
    const n = this.array_[t];
    (this.array_[t] = e),
      this.dispatchEvent(new es(ft.REMOVE, n, t)),
      this.dispatchEvent(new es(ft.ADD, e, t));
  }
  updateLength_() {
    this.set(Ia.LENGTH, this.array_.length);
  }
  assertUnique_(t, e) {
    for (let i = 0, n = this.array_.length; i < n; ++i)
      if (this.array_[i] === t && i !== e)
        throw new Error("Duplicate item added to a unique collection");
  }
}
function st(s, t) {
  if (!s) throw new Error(t);
}
class Dt extends me {
  constructor(t) {
    if (
      (super(),
      this.on,
      this.once,
      this.un,
      (this.id_ = void 0),
      (this.geometryName_ = "geometry"),
      (this.style_ = null),
      (this.styleFunction_ = void 0),
      (this.geometryChangeKey_ = null),
      this.addChangeListener(this.geometryName_, this.handleGeometryChanged_),
      t)
    )
      if (typeof t.getSimplifiedGeometry == "function") {
        const e = t;
        this.setGeometry(e);
      } else {
        const e = t;
        this.setProperties(e);
      }
  }
  clone() {
    const t = new Dt(this.hasProperties() ? this.getProperties() : null);
    t.setGeometryName(this.getGeometryName());
    const e = this.getGeometry();
    e && t.setGeometry(e.clone());
    const i = this.getStyle();
    return i && t.setStyle(i), t;
  }
  getGeometry() {
    return this.get(this.geometryName_);
  }
  getId() {
    return this.id_;
  }
  getGeometryName() {
    return this.geometryName_;
  }
  getStyle() {
    return this.style_;
  }
  getStyleFunction() {
    return this.styleFunction_;
  }
  handleGeometryChange_() {
    this.changed();
  }
  handleGeometryChanged_() {
    this.geometryChangeKey_ &&
      (lt(this.geometryChangeKey_), (this.geometryChangeKey_ = null));
    const t = this.getGeometry();
    t &&
      (this.geometryChangeKey_ = $(
        t,
        j.CHANGE,
        this.handleGeometryChange_,
        this,
      )),
      this.changed();
  }
  setGeometry(t) {
    this.set(this.geometryName_, t);
  }
  setStyle(t) {
    (this.style_ = t),
      (this.styleFunction_ = t ? xc(t) : void 0),
      this.changed();
  }
  setId(t) {
    (this.id_ = t), this.changed();
  }
  setGeometryName(t) {
    this.removeChangeListener(this.geometryName_, this.handleGeometryChanged_),
      (this.geometryName_ = t),
      this.addChangeListener(this.geometryName_, this.handleGeometryChanged_),
      this.handleGeometryChanged_();
  }
}
function xc(s) {
  if (typeof s == "function") return s;
  let t;
  return (
    Array.isArray(s)
      ? (t = s)
      : (st(
          typeof s.getZIndex == "function",
          "Expected an `ol/style/Style` or an array of `ol/style/Style.js`",
        ),
        (t = [s])),
    function () {
      return t;
    }
  );
}
const Ct = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16,
};
function Et(s) {
  const t = Vt();
  for (let e = 0, i = s.length; e < i; ++e) Rn(t, s[e]);
  return t;
}
function Yn(s, t, e) {
  return e
    ? ((e[0] = s[0] - t),
      (e[1] = s[1] - t),
      (e[2] = s[2] + t),
      (e[3] = s[3] + t),
      e)
    : [s[0] - t, s[1] - t, s[2] + t, s[3] + t];
}
function kl(s, t) {
  return t
    ? ((t[0] = s[0]), (t[1] = s[1]), (t[2] = s[2]), (t[3] = s[3]), t)
    : s.slice();
}
function Ci(s, t, e) {
  let i, n;
  return (
    t < s[0] ? (i = s[0] - t) : s[2] < t ? (i = t - s[2]) : (i = 0),
    e < s[1] ? (n = s[1] - e) : s[3] < e ? (n = e - s[3]) : (n = 0),
    i * i + n * n
  );
}
function qi(s, t) {
  return Co(s, t[0], t[1]);
}
function yn(s, t) {
  return s[0] <= t[0] && t[2] <= s[2] && s[1] <= t[1] && t[3] <= s[3];
}
function Co(s, t, e) {
  return s[0] <= t && t <= s[2] && s[1] <= e && e <= s[3];
}
function Zr(s, t) {
  const e = s[0],
    i = s[1],
    n = s[2],
    r = s[3],
    o = t[0],
    a = t[1];
  let l = Ct.UNKNOWN;
  return (
    o < e ? (l = l | Ct.LEFT) : o > n && (l = l | Ct.RIGHT),
    a < i ? (l = l | Ct.BELOW) : a > r && (l = l | Ct.ABOVE),
    l === Ct.UNKNOWN && (l = Ct.INTERSECTING),
    l
  );
}
function Vt() {
  return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
}
function Oe(s, t, e, i, n) {
  return n ? ((n[0] = s), (n[1] = t), (n[2] = e), (n[3] = i), n) : [s, t, e, i];
}
function Vn(s) {
  return Oe(1 / 0, 1 / 0, -1 / 0, -1 / 0, s);
}
function Tn(s, t) {
  const e = s[0],
    i = s[1];
  return Oe(e, i, e, i, t);
}
function wo(s, t, e, i, n) {
  const r = Vn(n);
  return Nl(r, s, t, e, i);
}
function Pn(s, t) {
  return s[0] == t[0] && s[2] == t[2] && s[1] == t[1] && s[3] == t[3];
}
function Gl(s, t) {
  return (
    t[0] < s[0] && (s[0] = t[0]),
    t[2] > s[2] && (s[2] = t[2]),
    t[1] < s[1] && (s[1] = t[1]),
    t[3] > s[3] && (s[3] = t[3]),
    s
  );
}
function Rn(s, t) {
  t[0] < s[0] && (s[0] = t[0]),
    t[0] > s[2] && (s[2] = t[0]),
    t[1] < s[1] && (s[1] = t[1]),
    t[1] > s[3] && (s[3] = t[1]);
}
function Nl(s, t, e, i, n) {
  for (; e < i; e += n) Ec(s, t[e], t[e + 1]);
  return s;
}
function Ec(s, t, e) {
  (s[0] = Math.min(s[0], t)),
    (s[1] = Math.min(s[1], e)),
    (s[2] = Math.max(s[2], t)),
    (s[3] = Math.max(s[3], e));
}
function So(s, t) {
  let e;
  return (
    (e = t(js(s))),
    e || ((e = t(Ys(s))), e) || ((e = t(Vs(s))), e) || ((e = t(wi(s))), e)
      ? e
      : !1
  );
}
function Hr(s) {
  let t = 0;
  return Ks(s) || (t = at(s) * Ot(s)), t;
}
function js(s) {
  return [s[0], s[1]];
}
function Ys(s) {
  return [s[2], s[1]];
}
function Qe(s) {
  return [(s[0] + s[2]) / 2, (s[1] + s[3]) / 2];
}
function Cc(s, t) {
  let e;
  if (t === "bottom-left") e = js(s);
  else if (t === "bottom-right") e = Ys(s);
  else if (t === "top-left") e = wi(s);
  else if (t === "top-right") e = Vs(s);
  else throw new Error("Invalid corner");
  return e;
}
function qr(s, t, e, i, n) {
  const [r, o, a, l, c, h, u, d] = Bl(s, t, e, i);
  return Oe(
    Math.min(r, a, c, u),
    Math.min(o, l, h, d),
    Math.max(r, a, c, u),
    Math.max(o, l, h, d),
    n,
  );
}
function Bl(s, t, e, i) {
  const n = (t * i[0]) / 2,
    r = (t * i[1]) / 2,
    o = Math.cos(e),
    a = Math.sin(e),
    l = n * o,
    c = n * a,
    h = r * o,
    u = r * a,
    d = s[0],
    f = s[1];
  return [
    d - l + u,
    f - c - h,
    d - l - u,
    f - c + h,
    d + l - u,
    f + c + h,
    d + l + u,
    f + c - h,
    d - l + u,
    f - c - h,
  ];
}
function Ot(s) {
  return s[3] - s[1];
}
function gi(s, t, e) {
  const i = e || Vt();
  return (
    It(s, t)
      ? (s[0] > t[0] ? (i[0] = s[0]) : (i[0] = t[0]),
        s[1] > t[1] ? (i[1] = s[1]) : (i[1] = t[1]),
        s[2] < t[2] ? (i[2] = s[2]) : (i[2] = t[2]),
        s[3] < t[3] ? (i[3] = s[3]) : (i[3] = t[3]))
      : Vn(i),
    i
  );
}
function wi(s) {
  return [s[0], s[3]];
}
function Vs(s) {
  return [s[2], s[3]];
}
function at(s) {
  return s[2] - s[0];
}
function It(s, t) {
  return s[0] <= t[2] && s[2] >= t[0] && s[1] <= t[3] && s[3] >= t[1];
}
function Ks(s) {
  return s[2] < s[0] || s[3] < s[1];
}
function wc(s, t) {
  return t
    ? ((t[0] = s[0]), (t[1] = s[1]), (t[2] = s[2]), (t[3] = s[3]), t)
    : s;
}
function Sc(s, t, e) {
  let i = !1;
  const n = Zr(s, t),
    r = Zr(s, e);
  if (n === Ct.INTERSECTING || r === Ct.INTERSECTING) i = !0;
  else {
    const o = s[0],
      a = s[1],
      l = s[2],
      c = s[3],
      h = t[0],
      u = t[1],
      d = e[0],
      f = e[1],
      g = (f - u) / (d - h);
    let _, m;
    r & Ct.ABOVE &&
      !(n & Ct.ABOVE) &&
      ((_ = d - (f - c) / g), (i = _ >= o && _ <= l)),
      !i &&
        r & Ct.RIGHT &&
        !(n & Ct.RIGHT) &&
        ((m = f - (d - l) * g), (i = m >= a && m <= c)),
      !i &&
        r & Ct.BELOW &&
        !(n & Ct.BELOW) &&
        ((_ = d - (f - a) / g), (i = _ >= o && _ <= l)),
      !i &&
        r & Ct.LEFT &&
        !(n & Ct.LEFT) &&
        ((m = f - (d - o) * g), (i = m >= a && m <= c));
  }
  return i;
}
function zl(s, t) {
  const e = t.getExtent(),
    i = Qe(s);
  if (t.canWrapX() && (i[0] < e[0] || i[0] >= e[2])) {
    const n = at(e),
      o = Math.floor((i[0] - e[0]) / n) * n;
    (s[0] -= o), (s[2] -= o);
  }
  return s;
}
function Xl(s, t, e) {
  if (t.canWrapX()) {
    const i = t.getExtent();
    if (!isFinite(s[0]) || !isFinite(s[2])) return [[i[0], s[1], i[2], s[3]]];
    zl(s, t);
    const n = at(i);
    if (at(s) > n && !e) return [[i[0], s[1], i[2], s[3]]];
    if (s[0] < i[0])
      return [
        [s[0] + n, s[1], i[2], s[3]],
        [i[0], s[1], s[2], s[3]],
      ];
    if (s[2] > i[2])
      return [
        [s[0], s[1], i[2], s[3]],
        [i[0], s[1], s[2] - n, s[3]],
      ];
  }
  return [s];
}
function ct(s, t, e) {
  return Math.min(Math.max(s, t), e);
}
function Tc(s, t, e, i, n, r) {
  const o = n - e,
    a = r - i;
  if (o !== 0 || a !== 0) {
    const l = ((s - e) * o + (t - i) * a) / (o * o + a * a);
    l > 1 ? ((e = n), (i = r)) : l > 0 && ((e += o * l), (i += a * l));
  }
  return Pe(s, t, e, i);
}
function Pe(s, t, e, i) {
  const n = e - s,
    r = i - t;
  return n * n + r * r;
}
function Rc(s) {
  const t = s.length;
  for (let i = 0; i < t; i++) {
    let n = i,
      r = Math.abs(s[i][i]);
    for (let a = i + 1; a < t; a++) {
      const l = Math.abs(s[a][i]);
      l > r && ((r = l), (n = a));
    }
    if (r === 0) return null;
    const o = s[n];
    (s[n] = s[i]), (s[i] = o);
    for (let a = i + 1; a < t; a++) {
      const l = -s[a][i] / s[i][i];
      for (let c = i; c < t + 1; c++)
        i == c ? (s[a][c] = 0) : (s[a][c] += l * s[i][c]);
    }
  }
  const e = new Array(t);
  for (let i = t - 1; i >= 0; i--) {
    e[i] = s[i][t] / s[i][i];
    for (let n = i - 1; n >= 0; n--) s[n][t] -= s[n][i] * e[i];
  }
  return e;
}
function La(s) {
  return (s * 180) / Math.PI;
}
function $e(s) {
  return (s * Math.PI) / 180;
}
function _i(s, t) {
  const e = s % t;
  return e * t < 0 ? e + t : e;
}
function jt(s, t, e) {
  return s + e * (t - s);
}
function Kn(s, t) {
  const e = Math.pow(10, t);
  return Math.round(s * e) / e;
}
function is(s, t) {
  return Math.floor(Kn(s, t));
}
function ns(s, t) {
  return Math.ceil(Kn(s, t));
}
function $r(s, t, e) {
  if (s >= t && s < e) return s;
  const i = e - t;
  return ((((s - t) % i) + i) % i) + t;
}
const vc = 63710088e-1;
function Ma(s, t, e) {
  e = e || vc;
  const i = $e(s[1]),
    n = $e(t[1]),
    r = (n - i) / 2,
    o = $e(t[0] - s[0]) / 2,
    a =
      Math.sin(r) * Math.sin(r) +
      Math.sin(o) * Math.sin(o) * Math.cos(i) * Math.cos(n);
  return 2 * e * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function Wl(...s) {
  console.warn(...s);
}
function Ic(s, t) {
  return (s[0] += +t[0]), (s[1] += +t[1]), s;
}
function Lc(s, t) {
  const e = t.getRadius(),
    i = t.getCenter(),
    n = i[0],
    r = i[1],
    o = s[0],
    a = s[1];
  let l = o - n;
  const c = a - r;
  l === 0 && c === 0 && (l = 1);
  const h = Math.sqrt(l * l + c * c),
    u = n + (e * l) / h,
    d = r + (e * c) / h;
  return [u, d];
}
function To(s, t) {
  const e = s[0],
    i = s[1],
    n = t[0],
    r = t[1],
    o = n[0],
    a = n[1],
    l = r[0],
    c = r[1],
    h = l - o,
    u = c - a,
    d =
      h === 0 && u === 0
        ? 0
        : (h * (e - o) + u * (i - a)) / (h * h + u * u || 0);
  let f, g;
  return (
    d <= 0
      ? ((f = o), (g = a))
      : d >= 1
        ? ((f = l), (g = c))
        : ((f = o + d * h), (g = a + d * u)),
    [f, g]
  );
}
function bt(s, t) {
  let e = !0;
  for (let i = s.length - 1; i >= 0; --i)
    if (s[i] != t[i]) {
      e = !1;
      break;
    }
  return e;
}
function Ro(s, t) {
  const e = Math.cos(t),
    i = Math.sin(t),
    n = s[0] * e - s[1] * i,
    r = s[1] * e + s[0] * i;
  return (s[0] = n), (s[1] = r), s;
}
function Mc(s, t) {
  return (s[0] *= t), (s[1] *= t), s;
}
function Fe(s, t) {
  const e = s[0] - t[0],
    i = s[1] - t[1];
  return e * e + i * i;
}
function Ss(s, t) {
  return Math.sqrt(Fe(s, t));
}
function Pc(s, t) {
  return Fe(s, To(s, t));
}
function jl(s, t) {
  if (t.canWrapX()) {
    const e = at(t.getExtent()),
      i = Fc(s, t, e);
    i && (s[0] -= i * e);
  }
  return s;
}
function Fc(s, t, e) {
  const i = t.getExtent();
  let n = 0;
  return (
    t.canWrapX() &&
      (s[0] < i[0] || s[0] > i[2]) &&
      ((e = e || at(i)), (n = Math.floor((s[0] - i[0]) / e))),
    n
  );
}
const vo = {
  radians: 6370997 / (2 * Math.PI),
  degrees: (2 * Math.PI * 6370997) / 360,
  ft: 0.3048,
  m: 1,
  "us-ft": 1200 / 3937,
};
class Io {
  constructor(t) {
    (this.code_ = t.code),
      (this.units_ = t.units),
      (this.extent_ = t.extent !== void 0 ? t.extent : null),
      (this.worldExtent_ = t.worldExtent !== void 0 ? t.worldExtent : null),
      (this.axisOrientation_ =
        t.axisOrientation !== void 0 ? t.axisOrientation : "enu"),
      (this.global_ = t.global !== void 0 ? t.global : !1),
      (this.canWrapX_ = !!(this.global_ && this.extent_)),
      (this.getPointResolutionFunc_ = t.getPointResolution),
      (this.defaultTileGrid_ = null),
      (this.metersPerUnit_ = t.metersPerUnit);
  }
  canWrapX() {
    return this.canWrapX_;
  }
  getCode() {
    return this.code_;
  }
  getExtent() {
    return this.extent_;
  }
  getUnits() {
    return this.units_;
  }
  getMetersPerUnit() {
    return this.metersPerUnit_ || vo[this.units_];
  }
  getWorldExtent() {
    return this.worldExtent_;
  }
  getAxisOrientation() {
    return this.axisOrientation_;
  }
  isGlobal() {
    return this.global_;
  }
  setGlobal(t) {
    (this.global_ = t), (this.canWrapX_ = !!(t && this.extent_));
  }
  getDefaultTileGrid() {
    return this.defaultTileGrid_;
  }
  setDefaultTileGrid(t) {
    this.defaultTileGrid_ = t;
  }
  setExtent(t) {
    (this.extent_ = t), (this.canWrapX_ = !!(this.global_ && t));
  }
  setWorldExtent(t) {
    this.worldExtent_ = t;
  }
  setGetPointResolution(t) {
    this.getPointResolutionFunc_ = t;
  }
  getPointResolutionFunc() {
    return this.getPointResolutionFunc_;
  }
}
const Un = 6378137,
  Xi = Math.PI * Un,
  bc = [-Xi, -Xi, Xi, Xi],
  Ac = [-180, -85, 180, 85],
  ss = Un * Math.log(Math.tan(Math.PI / 2));
class Ii extends Io {
  constructor(t) {
    super({
      code: t,
      units: "m",
      extent: bc,
      global: !0,
      worldExtent: Ac,
      getPointResolution: function (e, i) {
        return e / Math.cosh(i[1] / Un);
      },
    });
  }
}
const Pa = [
  new Ii("EPSG:3857"),
  new Ii("EPSG:102100"),
  new Ii("EPSG:102113"),
  new Ii("EPSG:900913"),
  new Ii("http://www.opengis.net/def/crs/EPSG/0/3857"),
  new Ii("http://www.opengis.net/gml/srs/epsg.xml#3857"),
];
function Dc(s, t, e, i) {
  const n = s.length;
  (e = e > 1 ? e : 2),
    (i = i ?? e),
    t === void 0 && (e > 2 ? (t = s.slice()) : (t = new Array(n)));
  for (let r = 0; r < n; r += i) {
    t[r] = (Xi * s[r]) / 180;
    let o = Un * Math.log(Math.tan((Math.PI * (+s[r + 1] + 90)) / 360));
    o > ss ? (o = ss) : o < -ss && (o = -ss), (t[r + 1] = o);
  }
  return t;
}
function Oc(s, t, e, i) {
  const n = s.length;
  (e = e > 1 ? e : 2),
    (i = i ?? e),
    t === void 0 && (e > 2 ? (t = s.slice()) : (t = new Array(n)));
  for (let r = 0; r < n; r += i)
    (t[r] = (180 * s[r]) / Xi),
      (t[r + 1] = (360 * Math.atan(Math.exp(s[r + 1] / Un))) / Math.PI - 90);
  return t;
}
const kc = 6378137,
  Fa = [-180, -90, 180, 90],
  Gc = (Math.PI * kc) / 180;
class ai extends Io {
  constructor(t, e) {
    super({
      code: t,
      units: "degrees",
      extent: Fa,
      axisOrientation: e,
      global: !0,
      metersPerUnit: Gc,
      worldExtent: Fa,
    });
  }
}
const ba = [
  new ai("CRS:84"),
  new ai("EPSG:4326", "neu"),
  new ai("urn:ogc:def:crs:OGC:1.3:CRS84"),
  new ai("urn:ogc:def:crs:OGC:2:84"),
  new ai("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),
  new ai("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
  new ai("http://www.opengis.net/def/crs/EPSG/0/4326", "neu"),
];
let Jr = {};
function Nc(s) {
  return (
    Jr[s] ||
    Jr[s.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] ||
    null
  );
}
function Bc(s, t) {
  Jr[s] = t;
}
let Vi = {};
function Fn(s, t, e) {
  const i = s.getCode(),
    n = t.getCode();
  i in Vi || (Vi[i] = {}), (Vi[i][n] = e);
}
function _r(s, t) {
  return s in Vi && t in Vi[s] ? Vi[s][t] : null;
}
const Ts = 0.9996,
  te = 0.00669438,
  Us = te * te,
  Zs = Us * te,
  ci = te / (1 - te),
  Aa = Math.sqrt(1 - te),
  $i = (1 - Aa) / (1 + Aa),
  Yl = $i * $i,
  Lo = Yl * $i,
  Mo = Lo * $i,
  Vl = Mo * $i,
  Kl = 1 - te / 4 - (3 * Us) / 64 - (5 * Zs) / 256,
  zc = (3 * te) / 8 + (3 * Us) / 32 + (45 * Zs) / 1024,
  Xc = (15 * Us) / 256 + (45 * Zs) / 1024,
  Wc = (35 * Zs) / 3072,
  jc = (3 / 2) * $i - (27 / 32) * Lo + (269 / 512) * Vl,
  Yc = (21 / 16) * Yl - (55 / 32) * Mo,
  Vc = (151 / 96) * Lo - (417 / 128) * Vl,
  Kc = (1097 / 512) * Mo,
  Rs = 6378137;
function Uc(s, t, e) {
  const i = s - 5e5,
    o = (e.north ? t : t - 1e7) / Ts / (Rs * Kl),
    a =
      o +
      jc * Math.sin(2 * o) +
      Yc * Math.sin(4 * o) +
      Vc * Math.sin(6 * o) +
      Kc * Math.sin(8 * o),
    l = Math.sin(a),
    c = l * l,
    h = Math.cos(a),
    u = l / h,
    d = u * u,
    f = d * d,
    g = 1 - te * c,
    _ = Math.sqrt(1 - te * c),
    m = Rs / _,
    y = (1 - te) / g,
    p = ci * h ** 2,
    C = p * p,
    x = i / (m * Ts),
    E = x * x,
    R = E * x,
    L = R * x,
    I = L * x,
    M = I * x,
    F =
      a -
      (u / y) * (E / 2 - (L / 24) * (5 + 3 * d + 10 * p - 4 * C - 9 * ci)) +
      (M / 720) * (61 + 90 * d + 298 * p + 45 * f - 252 * ci - 3 * C);
  let z =
    (x -
      (R / 6) * (1 + 2 * d + p) +
      (I / 120) * (5 - 2 * p + 28 * d - 3 * C + 8 * ci + 24 * f)) /
    h;
  return (z = $r(z + $e(Ul(e.number)), -Math.PI, Math.PI)), [La(z), La(F)];
}
const Da = -80,
  Oa = 84,
  Zc = -180,
  Hc = 180;
function qc(s, t, e) {
  (s = $r(s, Zc, Hc)), t < Da ? (t = Da) : t > Oa && (t = Oa);
  const i = $e(t),
    n = Math.sin(i),
    r = Math.cos(i),
    o = n / r,
    a = o * o,
    l = a * a,
    c = $e(s),
    h = Ul(e.number),
    u = $e(h),
    d = Rs / Math.sqrt(1 - te * n ** 2),
    f = ci * r ** 2,
    g = r * $r(c - u, -Math.PI, Math.PI),
    _ = g * g,
    m = _ * g,
    y = m * g,
    p = y * g,
    C = p * g,
    x =
      Rs *
      (Kl * i -
        zc * Math.sin(2 * i) +
        Xc * Math.sin(4 * i) -
        Wc * Math.sin(6 * i)),
    E =
      Ts *
        d *
        (g +
          (m / 6) * (1 - a + f) +
          (p / 120) * (5 - 18 * a + l + 72 * f - 58 * ci)) +
      5e5;
  let R =
    Ts *
    (x +
      d *
        o *
        (_ / 2 +
          (y / 24) * (5 - a + 9 * f + 4 * f ** 2) +
          (C / 720) * (61 - 58 * a + l + 600 * f - 330 * ci)));
  return e.north || (R += 1e7), [E, R];
}
function Ul(s) {
  return (s - 1) * 6 - 180 + 3;
}
const $c = [
  /^EPSG:(\d+)$/,
  /^urn:ogc:def:crs:EPSG::(\d+)$/,
  /^http:\/\/www\.opengis\.net\/def\/crs\/EPSG\/0\/(\d+)$/,
];
function Zl(s) {
  let t = 0;
  for (const n of $c) {
    const r = s.match(n);
    if (r) {
      t = parseInt(r[1]);
      break;
    }
  }
  if (!t) return null;
  let e = 0,
    i = !1;
  return (
    t > 32700 && t < 32761
      ? (e = t - 32700)
      : t > 32600 && t < 32661 && ((i = !0), (e = t - 32600)),
    e ? { number: e, north: i } : null
  );
}
function ka(s, t) {
  return function (e, i, n, r) {
    const o = e.length;
    (n = n > 1 ? n : 2),
      (r = r ?? n),
      i || (n > 2 ? (i = e.slice()) : (i = new Array(o)));
    for (let a = 0; a < o; a += r) {
      const l = e[a],
        c = e[a + 1],
        h = s(l, c, t);
      (i[a] = h[0]), (i[a + 1] = h[1]);
    }
    return i;
  };
}
function Jc(s) {
  return Zl(s) ? new Io({ code: s, units: "m" }) : null;
}
function Qc(s) {
  const t = Zl(s.getCode());
  return t ? { forward: ka(qc, t), inverse: ka(Uc, t) } : null;
}
const tu = [Qc],
  eu = [Jc];
let Qr = !0;
function iu(s) {
  Qr = !1;
}
function Po(s, t) {
  if (t !== void 0) {
    for (let e = 0, i = s.length; e < i; ++e) t[e] = s[e];
    t = t;
  } else t = s.slice();
  return t;
}
function to(s) {
  Bc(s.getCode(), s), Fn(s, s, Po);
}
function nu(s) {
  s.forEach(to);
}
function gt(s) {
  if (typeof s != "string") return s;
  const t = Nc(s);
  if (t) return t;
  for (const e of eu) {
    const i = e(s);
    if (i) return i;
  }
  return null;
}
function Ga(s, t, e, i) {
  s = gt(s);
  let n;
  const r = s.getPointResolutionFunc();
  if (r) n = r(t, e);
  else {
    const o = s.getUnits();
    if (o == "degrees" || i == "degrees") n = t;
    else {
      const a = bo(s, gt("EPSG:4326"));
      if (!a && o !== "degrees") n = t * s.getMetersPerUnit();
      else {
        let c = [
          e[0] - t / 2,
          e[1],
          e[0] + t / 2,
          e[1],
          e[0],
          e[1] - t / 2,
          e[0],
          e[1] + t / 2,
        ];
        c = a(c, c, 2);
        const h = Ma(c.slice(0, 2), c.slice(2, 4)),
          u = Ma(c.slice(4, 6), c.slice(6, 8));
        n = (h + u) / 2;
      }
      const l = s.getMetersPerUnit();
      l !== void 0 && (n /= l);
    }
  }
  return n;
}
function Na(s) {
  nu(s),
    s.forEach(function (t) {
      s.forEach(function (e) {
        t !== e && Fn(t, e, Po);
      });
    });
}
function su(s, t, e, i) {
  s.forEach(function (n) {
    t.forEach(function (r) {
      Fn(n, r, e), Fn(r, n, i);
    });
  });
}
function Fo(s, t) {
  return s ? (typeof s == "string" ? gt(s) : s) : gt(t);
}
function ru(s) {
  return function (t, e, i, n) {
    const r = t.length;
    (i = i !== void 0 ? i : 2),
      (n = n ?? i),
      (e = e !== void 0 ? e : new Array(r));
    for (let o = 0; o < r; o += n) {
      const a = s(t.slice(o, o + i)),
        l = a.length;
      for (let c = 0, h = n; c < h; ++c) e[o + c] = c >= l ? t[o + c] : a[c];
    }
    return e;
  };
}
function Es(s, t) {
  if (s === t) return !0;
  const e = s.getUnits() === t.getUnits();
  return (s.getCode() === t.getCode() || bo(s, t) === Po) && e;
}
function bo(s, t) {
  const e = s.getCode(),
    i = t.getCode();
  let n = _r(e, i);
  if (n) return n;
  let r = null,
    o = null;
  for (const l of tu) r || (r = l(s)), o || (o = l(t));
  if (!r && !o) return null;
  const a = "EPSG:4326";
  if (o)
    if (r) n = mr(r.inverse, o.forward);
    else {
      const l = _r(e, a);
      l && (n = mr(l, o.forward));
    }
  else {
    const l = _r(a, i);
    l && (n = mr(r.inverse, l));
  }
  return n && (to(s), to(t), Fn(s, t, n)), n;
}
function mr(s, t) {
  return function (e, i, n, r) {
    return (i = s(e, i, n, r)), t(i, i, n, r);
  };
}
function bn(s, t) {
  const e = gt(s),
    i = gt(t);
  return bo(e, i);
}
function Hl(s, t, e) {
  const i = bn(t, e);
  if (!i) {
    const n = gt(t).getCode(),
      r = gt(e).getCode();
    throw new Error(`No transform available between ${n} and ${r}`);
  }
  return i(s, void 0, s.length);
}
function ti(s, t) {
  return s;
}
function ht(s, t) {
  return (
    Qr &&
      !bt(s, [0, 0]) &&
      s[0] >= -180 &&
      s[0] <= 180 &&
      s[1] >= -90 &&
      s[1] <= 90 &&
      ((Qr = !1),
      Wl(
        "Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates.",
      )),
    s
  );
}
function Hs(s, t) {
  return s;
}
function Le(s, t) {
  return s;
}
function ou() {
  Na(Pa), Na(ba), su(ba, Pa, Dc, Oc);
}
ou();
new Array(6);
function re() {
  return [1, 0, 0, 1, 0, 0];
}
function au(s, t) {
  return (
    (s[0] = t[0]),
    (s[1] = t[1]),
    (s[2] = t[2]),
    (s[3] = t[3]),
    (s[4] = t[4]),
    (s[5] = t[5]),
    s
  );
}
function wt(s, t) {
  const e = t[0],
    i = t[1];
  return (
    (t[0] = s[0] * e + s[2] * i + s[4]), (t[1] = s[1] * e + s[3] * i + s[5]), t
  );
}
function ke(s, t, e, i, n, r, o, a) {
  const l = Math.sin(r),
    c = Math.cos(r);
  return (
    (s[0] = i * c),
    (s[1] = n * l),
    (s[2] = -i * l),
    (s[3] = n * c),
    (s[4] = o * i * c - a * i * l + t),
    (s[5] = o * n * l + a * n * c + e),
    s
  );
}
function ql(s, t) {
  const e = lu(t);
  st(e !== 0, "Transformation matrix cannot be inverted");
  const i = t[0],
    n = t[1],
    r = t[2],
    o = t[3],
    a = t[4],
    l = t[5];
  return (
    (s[0] = o / e),
    (s[1] = -n / e),
    (s[2] = -r / e),
    (s[3] = i / e),
    (s[4] = (r * l - o * a) / e),
    (s[5] = -(i * l - n * a) / e),
    s
  );
}
function lu(s) {
  return s[0] * s[3] - s[1] * s[2];
}
const hu = [1e5, 1e5, 1e5, 1e5, 2, 2];
function cu(s) {
  return "matrix(" + s.join(", ") + ")";
}
function Ba(s) {
  return s
    .substring(7, s.length - 1)
    .split(",")
    .map(parseFloat);
}
function uu(s, t) {
  const e = Ba(s),
    i = Ba(t);
  for (let n = 0; n < 6; ++n)
    if (Math.round((e[n] - i[n]) * hu[n]) !== 0) return !1;
  return !0;
}
function Je(s, t, e, i, n, r, o) {
  (r = r || []), (o = o || 2);
  let a = 0;
  for (let l = t; l < e; l += i) {
    const c = s[l],
      h = s[l + 1];
    (r[a++] = n[0] * c + n[2] * h + n[4]),
      (r[a++] = n[1] * c + n[3] * h + n[5]);
    for (let u = 2; u < o; u++) r[a++] = s[l + u];
  }
  return r && r.length != a && (r.length = a), r;
}
function Ao(s, t, e, i, n, r, o) {
  o = o || [];
  const a = Math.cos(n),
    l = Math.sin(n),
    c = r[0],
    h = r[1];
  let u = 0;
  for (let d = t; d < e; d += i) {
    const f = s[d] - c,
      g = s[d + 1] - h;
    (o[u++] = c + f * a - g * l), (o[u++] = h + f * l + g * a);
    for (let _ = d + 2; _ < d + i; ++_) o[u++] = s[_];
  }
  return o && o.length != u && (o.length = u), o;
}
function du(s, t, e, i, n, r, o, a) {
  a = a || [];
  const l = o[0],
    c = o[1];
  let h = 0;
  for (let u = t; u < e; u += i) {
    const d = s[u] - l,
      f = s[u + 1] - c;
    (a[h++] = l + n * d), (a[h++] = c + r * f);
    for (let g = u + 2; g < u + i; ++g) a[h++] = s[g];
  }
  return a && a.length != h && (a.length = h), a;
}
function fu(s, t, e, i, n, r, o) {
  o = o || [];
  let a = 0;
  for (let l = t; l < e; l += i) {
    (o[a++] = s[l] + n), (o[a++] = s[l + 1] + r);
    for (let c = l + 2; c < l + i; ++c) o[a++] = s[c];
  }
  return o && o.length != a && (o.length = a), o;
}
const za = re(),
  gu = [NaN, NaN];
class $l extends me {
  constructor() {
    super(),
      (this.extent_ = Vt()),
      (this.extentRevision_ = -1),
      (this.simplifiedGeometryMaxMinSquaredTolerance = 0),
      (this.simplifiedGeometryRevision = 0),
      (this.simplifyTransformedInternal = Ol((t, e, i) => {
        if (!i) return this.getSimplifiedGeometry(e);
        const n = this.clone();
        return n.applyTransform(i), n.getSimplifiedGeometry(e);
      }));
  }
  simplifyTransformed(t, e) {
    return this.simplifyTransformedInternal(this.getRevision(), t, e);
  }
  clone() {
    return Y();
  }
  closestPointXY(t, e, i, n) {
    return Y();
  }
  containsXY(t, e) {
    return this.closestPointXY(t, e, gu, Number.MIN_VALUE) === 0;
  }
  getClosestPoint(t, e) {
    return (e = e || [NaN, NaN]), this.closestPointXY(t[0], t[1], e, 1 / 0), e;
  }
  intersectsCoordinate(t) {
    return this.containsXY(t[0], t[1]);
  }
  computeExtent(t) {
    return Y();
  }
  getExtent(t) {
    if (this.extentRevision_ != this.getRevision()) {
      const e = this.computeExtent(this.extent_);
      (isNaN(e[0]) || isNaN(e[1])) && Vn(e),
        (this.extentRevision_ = this.getRevision());
    }
    return wc(this.extent_, t);
  }
  rotate(t, e) {
    Y();
  }
  scale(t, e, i) {
    Y();
  }
  simplify(t) {
    return this.getSimplifiedGeometry(t * t);
  }
  getSimplifiedGeometry(t) {
    return Y();
  }
  getType() {
    return Y();
  }
  applyTransform(t) {
    Y();
  }
  intersectsExtent(t) {
    return Y();
  }
  translate(t, e) {
    Y();
  }
  transform(t, e) {
    const i = gt(t),
      n =
        i.getUnits() == "tile-pixels"
          ? function (r, o, a) {
              const l = i.getExtent(),
                c = i.getWorldExtent(),
                h = Ot(c) / Ot(l);
              ke(za, c[0], c[3], h, -h, 0, 0, 0);
              const u = Je(r, 0, r.length, a, za, o),
                d = bn(i, e);
              return d ? d(u, u, a) : u;
            }
          : bn(i, e);
    return this.applyTransform(n), this;
  }
}
class ii extends $l {
  constructor() {
    super(), (this.layout = "XY"), (this.stride = 2), this.flatCoordinates;
  }
  computeExtent(t) {
    return wo(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
    );
  }
  getCoordinates() {
    return Y();
  }
  getFirstCoordinate() {
    return this.flatCoordinates.slice(0, this.stride);
  }
  getFlatCoordinates() {
    return this.flatCoordinates;
  }
  getLastCoordinate() {
    return this.flatCoordinates.slice(
      this.flatCoordinates.length - this.stride,
    );
  }
  getLayout() {
    return this.layout;
  }
  getSimplifiedGeometry(t) {
    if (
      (this.simplifiedGeometryRevision !== this.getRevision() &&
        ((this.simplifiedGeometryMaxMinSquaredTolerance = 0),
        (this.simplifiedGeometryRevision = this.getRevision())),
      t < 0 ||
        (this.simplifiedGeometryMaxMinSquaredTolerance !== 0 &&
          t <= this.simplifiedGeometryMaxMinSquaredTolerance))
    )
      return this;
    const e = this.getSimplifiedGeometryInternal(t);
    return e.getFlatCoordinates().length < this.flatCoordinates.length
      ? e
      : ((this.simplifiedGeometryMaxMinSquaredTolerance = t), this);
  }
  getSimplifiedGeometryInternal(t) {
    return this;
  }
  getStride() {
    return this.stride;
  }
  setFlatCoordinates(t, e) {
    (this.stride = vs(t)), (this.layout = t), (this.flatCoordinates = e);
  }
  setCoordinates(t, e) {
    Y();
  }
  setLayout(t, e, i) {
    let n;
    if (t) n = vs(t);
    else {
      for (let r = 0; r < i; ++r) {
        if (e.length === 0) {
          (this.layout = "XY"), (this.stride = 2);
          return;
        }
        e = e[0];
      }
      (n = e.length), (t = Si(n));
    }
    (this.layout = t), (this.stride = n);
  }
  applyTransform(t) {
    this.flatCoordinates &&
      (t(
        this.flatCoordinates,
        this.flatCoordinates,
        this.layout.startsWith("XYZ") ? 3 : 2,
        this.stride,
      ),
      this.changed());
  }
  rotate(t, e) {
    const i = this.getFlatCoordinates();
    if (i) {
      const n = this.getStride();
      Ao(i, 0, i.length, n, t, e, i), this.changed();
    }
  }
  scale(t, e, i) {
    e === void 0 && (e = t), i || (i = Qe(this.getExtent()));
    const n = this.getFlatCoordinates();
    if (n) {
      const r = this.getStride();
      du(n, 0, n.length, r, t, e, i, n), this.changed();
    }
  }
  translate(t, e) {
    const i = this.getFlatCoordinates();
    if (i) {
      const n = this.getStride();
      fu(i, 0, i.length, n, t, e, i), this.changed();
    }
  }
}
function Si(s) {
  let t;
  return s == 2 ? (t = "XY") : s == 3 ? (t = "XYZ") : s == 4 && (t = "XYZM"), t;
}
function vs(s) {
  let t;
  return (
    s == "XY"
      ? (t = 2)
      : s == "XYZ" || s == "XYM"
        ? (t = 3)
        : s == "XYZM" && (t = 4),
    t
  );
}
function _u(s, t, e) {
  const i = s.getFlatCoordinates();
  if (!i) return null;
  const n = s.getStride();
  return Je(i, 0, i.length, n, t, e);
}
function Jl(s, t, e, i) {
  let n = 0;
  const r = s[e - i],
    o = s[e - i + 1];
  let a = 0,
    l = 0;
  for (; t < e; t += i) {
    const c = s[t] - r,
      h = s[t + 1] - o;
    (n += l * c - a * h), (a = c), (l = h);
  }
  return n / 2;
}
function Ql(s, t, e, i) {
  let n = 0;
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    (n += Jl(s, t, a, i)), (t = a);
  }
  return n;
}
function mu(s, t, e, i) {
  let n = 0;
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    (n += Ql(s, t, a, i)), (t = a[a.length - 1]);
  }
  return n;
}
function Xa(s, t, e, i, n, r, o) {
  const a = s[t],
    l = s[t + 1],
    c = s[e] - a,
    h = s[e + 1] - l;
  let u;
  if (c === 0 && h === 0) u = t;
  else {
    const d = ((n - a) * c + (r - l) * h) / (c * c + h * h);
    if (d > 1) u = e;
    else if (d > 0) {
      for (let f = 0; f < i; ++f) o[f] = jt(s[t + f], s[e + f], d);
      o.length = i;
      return;
    } else u = t;
  }
  for (let d = 0; d < i; ++d) o[d] = s[u + d];
  o.length = i;
}
function Do(s, t, e, i, n) {
  let r = s[t],
    o = s[t + 1];
  for (t += i; t < e; t += i) {
    const a = s[t],
      l = s[t + 1],
      c = Pe(r, o, a, l);
    c > n && (n = c), (r = a), (o = l);
  }
  return n;
}
function Oo(s, t, e, i, n) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    (n = Do(s, t, a, i, n)), (t = a);
  }
  return n;
}
function yu(s, t, e, i, n) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    (n = Oo(s, t, a, i, n)), (t = a[a.length - 1]);
  }
  return n;
}
function ko(s, t, e, i, n, r, o, a, l, c, h) {
  if (t == e) return c;
  let u, d;
  if (n === 0) {
    if (((d = Pe(o, a, s[t], s[t + 1])), d < c)) {
      for (u = 0; u < i; ++u) l[u] = s[t + u];
      return (l.length = i), d;
    }
    return c;
  }
  h = h || [NaN, NaN];
  let f = t + i;
  for (; f < e; )
    if ((Xa(s, f - i, f, i, o, a, h), (d = Pe(o, a, h[0], h[1])), d < c)) {
      for (c = d, u = 0; u < i; ++u) l[u] = h[u];
      (l.length = i), (f += i);
    } else f += i * Math.max(((Math.sqrt(d) - Math.sqrt(c)) / n) | 0, 1);
  if (r && (Xa(s, e - i, t, i, o, a, h), (d = Pe(o, a, h[0], h[1])), d < c)) {
    for (c = d, u = 0; u < i; ++u) l[u] = h[u];
    l.length = i;
  }
  return c;
}
function Go(s, t, e, i, n, r, o, a, l, c, h) {
  h = h || [NaN, NaN];
  for (let u = 0, d = e.length; u < d; ++u) {
    const f = e[u];
    (c = ko(s, t, f, i, n, r, o, a, l, c, h)), (t = f);
  }
  return c;
}
function pu(s, t, e, i, n, r, o, a, l, c, h) {
  h = h || [NaN, NaN];
  for (let u = 0, d = e.length; u < d; ++u) {
    const f = e[u];
    (c = Go(s, t, f, i, n, r, o, a, l, c, h)), (t = f[f.length - 1]);
  }
  return c;
}
function th(s, t, e, i) {
  for (let n = 0, r = e.length; n < r; ++n) s[t++] = e[n];
  return t;
}
function qs(s, t, e, i) {
  for (let n = 0, r = e.length; n < r; ++n) {
    const o = e[n];
    for (let a = 0; a < i; ++a) s[t++] = o[a];
  }
  return t;
}
function Zn(s, t, e, i, n) {
  n = n || [];
  let r = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = qs(s, t, e[o], i);
    (n[r++] = l), (t = l);
  }
  return (n.length = r), n;
}
function eh(s, t, e, i, n) {
  n = n || [];
  let r = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = Zn(s, t, e[o], i, n[r]);
    l.length === 0 && (l[0] = t), (n[r++] = l), (t = l[l.length - 1]);
  }
  return (n.length = r), n;
}
function He(s, t, e, i, n) {
  n = n !== void 0 ? n : [];
  let r = 0;
  for (let o = t; o < e; o += i) n[r++] = s.slice(o, o + i);
  return (n.length = r), n;
}
function An(s, t, e, i, n) {
  n = n !== void 0 ? n : [];
  let r = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    (n[r++] = He(s, t, l, i, n[r])), (t = l);
  }
  return (n.length = r), n;
}
function eo(s, t, e, i, n) {
  n = n !== void 0 ? n : [];
  let r = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    (n[r++] = l.length === 1 && l[0] === t ? [] : An(s, t, l, i, n[r])),
      (t = l[l.length - 1]);
  }
  return (n.length = r), n;
}
function $s(s, t, e, i, n, r, o) {
  const a = (e - t) / i;
  if (a < 3) {
    for (; t < e; t += i) (r[o++] = s[t]), (r[o++] = s[t + 1]);
    return o;
  }
  const l = new Array(a);
  (l[0] = 1), (l[a - 1] = 1);
  const c = [t, e - i];
  let h = 0;
  for (; c.length > 0; ) {
    const u = c.pop(),
      d = c.pop();
    let f = 0;
    const g = s[d],
      _ = s[d + 1],
      m = s[u],
      y = s[u + 1];
    for (let p = d + i; p < u; p += i) {
      const C = s[p],
        x = s[p + 1],
        E = Tc(C, x, g, _, m, y);
      E > f && ((h = p), (f = E));
    }
    f > n &&
      ((l[(h - t) / i] = 1),
      d + i < h && c.push(d, h),
      h + i < u && c.push(h, u));
  }
  for (let u = 0; u < a; ++u)
    l[u] && ((r[o++] = s[t + u * i]), (r[o++] = s[t + u * i + 1]));
  return o;
}
function ih(s, t, e, i, n, r, o, a) {
  for (let l = 0, c = e.length; l < c; ++l) {
    const h = e[l];
    (o = $s(s, t, h, i, n, r, o)), a.push(o), (t = h);
  }
  return o;
}
function hi(s, t) {
  return t * Math.round(s / t);
}
function xu(s, t, e, i, n, r, o) {
  if (t == e) return o;
  let a = hi(s[t], n),
    l = hi(s[t + 1], n);
  (t += i), (r[o++] = a), (r[o++] = l);
  let c, h;
  do
    if (((c = hi(s[t], n)), (h = hi(s[t + 1], n)), (t += i), t == e))
      return (r[o++] = c), (r[o++] = h), o;
  while (c == a && h == l);
  for (; t < e; ) {
    const u = hi(s[t], n),
      d = hi(s[t + 1], n);
    if (((t += i), u == c && d == h)) continue;
    const f = c - a,
      g = h - l,
      _ = u - a,
      m = d - l;
    if (
      f * m == g * _ &&
      ((f < 0 && _ < f) || f == _ || (f > 0 && _ > f)) &&
      ((g < 0 && m < g) || g == m || (g > 0 && m > g))
    ) {
      (c = u), (h = d);
      continue;
    }
    (r[o++] = c), (r[o++] = h), (a = c), (l = h), (c = u), (h = d);
  }
  return (r[o++] = c), (r[o++] = h), o;
}
function No(s, t, e, i, n, r, o, a) {
  for (let l = 0, c = e.length; l < c; ++l) {
    const h = e[l];
    (o = xu(s, t, h, i, n, r, o)), a.push(o), (t = h);
  }
  return o;
}
function Eu(s, t, e, i, n, r, o, a) {
  for (let l = 0, c = e.length; l < c; ++l) {
    const h = e[l],
      u = [];
    (o = No(s, t, h, i, n, r, o, u)), a.push(u), (t = h[h.length - 1]);
  }
  return o;
}
class Dn extends ii {
  constructor(t, e) {
    super(),
      (this.maxDelta_ = -1),
      (this.maxDeltaRevision_ = -1),
      e !== void 0 && !Array.isArray(t[0])
        ? this.setFlatCoordinates(e, t)
        : this.setCoordinates(t, e);
  }
  clone() {
    return new Dn(this.flatCoordinates.slice(), this.layout);
  }
  closestPointXY(t, e, i, n) {
    return n < Ci(this.getExtent(), t, e)
      ? n
      : (this.maxDeltaRevision_ != this.getRevision() &&
          ((this.maxDelta_ = Math.sqrt(
            Do(
              this.flatCoordinates,
              0,
              this.flatCoordinates.length,
              this.stride,
              0,
            ),
          )),
          (this.maxDeltaRevision_ = this.getRevision())),
        ko(
          this.flatCoordinates,
          0,
          this.flatCoordinates.length,
          this.stride,
          this.maxDelta_,
          !0,
          t,
          e,
          i,
          n,
        ));
  }
  getArea() {
    return Jl(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
    );
  }
  getCoordinates() {
    return He(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
    );
  }
  getSimplifiedGeometryInternal(t) {
    const e = [];
    return (
      (e.length = $s(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        t,
        e,
        0,
      )),
      new Dn(e, "XY")
    );
  }
  getType() {
    return "LinearRing";
  }
  intersectsExtent(t) {
    return !1;
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 1),
      this.flatCoordinates || (this.flatCoordinates = []),
      (this.flatCoordinates.length = qs(
        this.flatCoordinates,
        0,
        t,
        this.stride,
      )),
      this.changed();
  }
}
class ee extends ii {
  constructor(t, e) {
    super(), this.setCoordinates(t, e);
  }
  clone() {
    const t = new ee(this.flatCoordinates.slice(), this.layout);
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, i, n) {
    const r = this.flatCoordinates,
      o = Pe(t, e, r[0], r[1]);
    if (o < n) {
      const a = this.stride;
      for (let l = 0; l < a; ++l) i[l] = r[l];
      return (i.length = a), o;
    }
    return n;
  }
  getCoordinates() {
    return this.flatCoordinates.slice();
  }
  computeExtent(t) {
    return Tn(this.flatCoordinates, t);
  }
  getType() {
    return "Point";
  }
  intersectsExtent(t) {
    return Co(t, this.flatCoordinates[0], this.flatCoordinates[1]);
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 0),
      this.flatCoordinates || (this.flatCoordinates = []),
      (this.flatCoordinates.length = th(
        this.flatCoordinates,
        0,
        t,
        this.stride,
      )),
      this.changed();
  }
}
function Cu(s, t, e, i, n) {
  return !So(n, function (o) {
    return !ui(s, t, e, i, o[0], o[1]);
  });
}
function ui(s, t, e, i, n, r) {
  let o = 0,
    a = s[e - i],
    l = s[e - i + 1];
  for (; t < e; t += i) {
    const c = s[t],
      h = s[t + 1];
    l <= r
      ? h > r && (c - a) * (r - l) - (n - a) * (h - l) > 0 && o++
      : h <= r && (c - a) * (r - l) - (n - a) * (h - l) < 0 && o--,
      (a = c),
      (l = h);
  }
  return o !== 0;
}
function Bo(s, t, e, i, n, r) {
  if (e.length === 0 || !ui(s, t, e[0], i, n, r)) return !1;
  for (let o = 1, a = e.length; o < a; ++o)
    if (ui(s, e[o - 1], e[o], i, n, r)) return !1;
  return !0;
}
function wu(s, t, e, i, n, r) {
  if (e.length === 0) return !1;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    if (Bo(s, t, l, i, n, r)) return !0;
    t = l[l.length - 1];
  }
  return !1;
}
function zo(s, t, e, i, n, r, o) {
  let a, l, c, h, u, d, f;
  const g = n[r + 1],
    _ = [];
  for (let p = 0, C = e.length; p < C; ++p) {
    const x = e[p];
    for (h = s[x - i], d = s[x - i + 1], a = t; a < x; a += i)
      (u = s[a]),
        (f = s[a + 1]),
        ((g <= d && f <= g) || (d <= g && g <= f)) &&
          ((c = ((g - d) / (f - d)) * (u - h) + h), _.push(c)),
        (h = u),
        (d = f);
  }
  let m = NaN,
    y = -1 / 0;
  for (_.sort(Me), h = _[0], a = 1, l = _.length; a < l; ++a) {
    u = _[a];
    const p = Math.abs(u - h);
    p > y && ((c = (h + u) / 2), Bo(s, t, e, i, c, g) && ((m = c), (y = p))),
      (h = u);
  }
  return isNaN(m) && (m = n[r]), o ? (o.push(m, g, y), o) : [m, g, y];
}
function nh(s, t, e, i, n) {
  let r = [];
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    (r = zo(s, t, l, i, n, 2 * o, r)), (t = l[l.length - 1]);
  }
  return r;
}
function sh(s, t, e, i, n) {
  let r;
  for (t += i; t < e; t += i)
    if (((r = n(s.slice(t - i, t), s.slice(t, t + i))), r)) return r;
  return !1;
}
function Wa(s, t) {
  const [e, i] = s,
    [n, r] = t,
    o =
      ((e[0] - n[0]) * (n[1] - r[1]) - (e[1] - n[1]) * (n[0] - r[0])) /
      ((e[0] - i[0]) * (n[1] - r[1]) - (e[1] - i[1]) * (n[0] - r[0])),
    a =
      ((e[0] - n[0]) * (e[1] - i[1]) - (e[1] - n[1]) * (e[0] - i[0])) /
      ((e[0] - i[0]) * (n[1] - r[1]) - (e[1] - i[1]) * (n[0] - r[0]));
  if (0 <= o && o <= 1 && 0 <= a && a <= 1)
    return [e[0] + o * (i[0] - e[0]), e[1] + o * (i[1] - e[1])];
}
function Js(s, t, e, i, n, r) {
  return (
    (r = r ?? Nl(Vt(), s, t, e, i)),
    It(n, r)
      ? (r[0] >= n[0] && r[2] <= n[2]) || (r[1] >= n[1] && r[3] <= n[3])
        ? !0
        : sh(s, t, e, i, function (o, a) {
            return Sc(n, o, a);
          })
      : !1
  );
}
function Su(s, t, e, i, n) {
  for (let r = 0, o = e.length; r < o; ++r) {
    if (Js(s, t, e[r], i, n)) return !0;
    t = e[r];
  }
  return !1;
}
function rh(s, t, e, i, n) {
  return !!(
    Js(s, t, e, i, n) ||
    ui(s, t, e, i, n[0], n[1]) ||
    ui(s, t, e, i, n[0], n[3]) ||
    ui(s, t, e, i, n[2], n[1]) ||
    ui(s, t, e, i, n[2], n[3])
  );
}
function oh(s, t, e, i, n) {
  if (!rh(s, t, e[0], i, n)) return !1;
  if (e.length === 1) return !0;
  for (let r = 1, o = e.length; r < o; ++r)
    if (Cu(s, e[r - 1], e[r], i, n) && !Js(s, e[r - 1], e[r], i, n)) return !1;
  return !0;
}
function Tu(s, t, e, i, n) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    if (oh(s, t, a, i, n)) return !0;
    t = a[a.length - 1];
  }
  return !1;
}
function Ru(s, t, e, i) {
  for (; t < e - i; ) {
    for (let n = 0; n < i; ++n) {
      const r = s[t + n];
      (s[t + n] = s[e - i + n]), (s[e - i + n] = r);
    }
    (t += i), (e -= i);
  }
}
function Xo(s, t, e, i) {
  let n = 0,
    r = s[e - i],
    o = s[e - i + 1];
  for (; t < e; t += i) {
    const a = s[t],
      l = s[t + 1];
    (n += (a - r) * (l + o)), (r = a), (o = l);
  }
  return n === 0 ? void 0 : n > 0;
}
function Wo(s, t, e, i, n) {
  n = n !== void 0 ? n : !1;
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r],
      l = Xo(s, t, a, i);
    if (r === 0) {
      if ((n && l) || (!n && !l)) return !1;
    } else if ((n && !l) || (!n && l)) return !1;
    t = a;
  }
  return !0;
}
function ah(s, t, e, i, n) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r];
    if (!Wo(s, t, a, i, n)) return !1;
    a.length && (t = a[a.length - 1]);
  }
  return !0;
}
function Is(s, t, e, i, n) {
  n = n !== void 0 ? n : !1;
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r],
      l = Xo(s, t, a, i);
    (r === 0 ? (n && l) || (!n && !l) : (n && !l) || (!n && l)) &&
      Ru(s, t, a, i),
      (t = a);
  }
  return t;
}
function io(s, t, e, i, n) {
  for (let r = 0, o = e.length; r < o; ++r) t = Is(s, t, e[r], i, n);
  return t;
}
function vu(s, t) {
  const e = [];
  let i = 0,
    n = 0,
    r;
  for (let o = 0, a = t.length; o < a; ++o) {
    const l = t[o],
      c = Xo(s, i, l, 2);
    if ((r === void 0 && (r = c), c === r)) e.push(t.slice(n, o + 1));
    else {
      if (e.length === 0) continue;
      e[e.length - 1].push(t[n]);
    }
    (n = o + 1), (i = l);
  }
  return e;
}
class ae extends ii {
  constructor(t, e, i) {
    super(),
      (this.ends_ = []),
      (this.flatInteriorPointRevision_ = -1),
      (this.flatInteriorPoint_ = null),
      (this.maxDelta_ = -1),
      (this.maxDeltaRevision_ = -1),
      (this.orientedRevision_ = -1),
      (this.orientedFlatCoordinates_ = null),
      e !== void 0 && i
        ? (this.setFlatCoordinates(e, t), (this.ends_ = i))
        : this.setCoordinates(t, e);
  }
  appendLinearRing(t) {
    this.flatCoordinates
      ? Qt(this.flatCoordinates, t.getFlatCoordinates())
      : (this.flatCoordinates = t.getFlatCoordinates().slice()),
      this.ends_.push(this.flatCoordinates.length),
      this.changed();
  }
  clone() {
    const t = new ae(
      this.flatCoordinates.slice(),
      this.layout,
      this.ends_.slice(),
    );
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, i, n) {
    return n < Ci(this.getExtent(), t, e)
      ? n
      : (this.maxDeltaRevision_ != this.getRevision() &&
          ((this.maxDelta_ = Math.sqrt(
            Oo(this.flatCoordinates, 0, this.ends_, this.stride, 0),
          )),
          (this.maxDeltaRevision_ = this.getRevision())),
        Go(
          this.flatCoordinates,
          0,
          this.ends_,
          this.stride,
          this.maxDelta_,
          !0,
          t,
          e,
          i,
          n,
        ));
  }
  containsXY(t, e) {
    return Bo(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      t,
      e,
    );
  }
  getArea() {
    return Ql(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride);
  }
  getCoordinates(t) {
    let e;
    return (
      t !== void 0
        ? ((e = this.getOrientedFlatCoordinates().slice()),
          Is(e, 0, this.ends_, this.stride, t))
        : (e = this.flatCoordinates),
      An(e, 0, this.ends_, this.stride)
    );
  }
  getEnds() {
    return this.ends_;
  }
  getFlatInteriorPoint() {
    if (this.flatInteriorPointRevision_ != this.getRevision()) {
      const t = Qe(this.getExtent());
      (this.flatInteriorPoint_ = zo(
        this.getOrientedFlatCoordinates(),
        0,
        this.ends_,
        this.stride,
        t,
        0,
      )),
        (this.flatInteriorPointRevision_ = this.getRevision());
    }
    return this.flatInteriorPoint_;
  }
  getInteriorPoint() {
    return new ee(this.getFlatInteriorPoint(), "XYM");
  }
  getLinearRingCount() {
    return this.ends_.length;
  }
  getLinearRing(t) {
    return t < 0 || this.ends_.length <= t
      ? null
      : new Dn(
          this.flatCoordinates.slice(
            t === 0 ? 0 : this.ends_[t - 1],
            this.ends_[t],
          ),
          this.layout,
        );
  }
  getLinearRings() {
    const t = this.layout,
      e = this.flatCoordinates,
      i = this.ends_,
      n = [];
    let r = 0;
    for (let o = 0, a = i.length; o < a; ++o) {
      const l = i[o],
        c = new Dn(e.slice(r, l), t);
      n.push(c), (r = l);
    }
    return n;
  }
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const t = this.flatCoordinates;
      Wo(t, 0, this.ends_, this.stride)
        ? (this.orientedFlatCoordinates_ = t)
        : ((this.orientedFlatCoordinates_ = t.slice()),
          (this.orientedFlatCoordinates_.length = Is(
            this.orientedFlatCoordinates_,
            0,
            this.ends_,
            this.stride,
          ))),
        (this.orientedRevision_ = this.getRevision());
    }
    return this.orientedFlatCoordinates_;
  }
  getSimplifiedGeometryInternal(t) {
    const e = [],
      i = [];
    return (
      (e.length = No(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        Math.sqrt(t),
        e,
        0,
        i,
      )),
      new ae(e, "XY", i)
    );
  }
  getType() {
    return "Polygon";
  }
  intersectsExtent(t) {
    return oh(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, t);
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 2),
      this.flatCoordinates || (this.flatCoordinates = []);
    const i = Zn(this.flatCoordinates, 0, t, this.stride, this.ends_);
    (this.flatCoordinates.length = i.length === 0 ? 0 : i[i.length - 1]),
      this.changed();
  }
}
function ja(s) {
  if (Ks(s)) throw new Error("Cannot create polygon from empty extent");
  const t = s[0],
    e = s[1],
    i = s[2],
    n = s[3],
    r = [t, e, t, n, i, n, i, e, t, e];
  return new ae(r, "XY", [r.length]);
}
function Iu(s, t, e) {
  t = t || 32;
  const i = s.getStride(),
    n = s.getLayout(),
    r = s.getCenter(),
    o = i * (t + 1),
    a = new Array(o);
  for (let h = 0; h < o; h += i) {
    (a[h] = 0), (a[h + 1] = 0);
    for (let u = 2; u < i; u++) a[h + u] = r[u];
  }
  const l = [a.length],
    c = new ae(a, n, l);
  return Lu(c, r, s.getRadius()), c;
}
function Lu(s, t, e, i) {
  const n = s.getFlatCoordinates(),
    r = s.getStride(),
    o = n.length / r - 1,
    a = 0;
  for (let l = 0; l <= o; ++l) {
    const c = l * r,
      h = a + (_i(l, o) * 2 * Math.PI) / o;
    (n[c] = t[0] + e * Math.cos(h)), (n[c + 1] = t[1] + e * Math.sin(h));
  }
  s.changed();
}
function Ls(s, t, e, i, n, r, o) {
  let a, l;
  const c = (e - t) / i;
  if (c === 1) a = t;
  else if (c === 2) (a = t), (l = n);
  else if (c !== 0) {
    let h = s[t],
      u = s[t + 1],
      d = 0;
    const f = [0];
    for (let m = t + i; m < e; m += i) {
      const y = s[m],
        p = s[m + 1];
      (d += Math.sqrt((y - h) * (y - h) + (p - u) * (p - u))),
        f.push(d),
        (h = y),
        (u = p);
    }
    const g = n * d,
      _ = dc(f, g);
    _ < 0
      ? ((l = (g - f[-_ - 2]) / (f[-_ - 1] - f[-_ - 2])),
        (a = t + (-_ - 2) * i))
      : (a = t + _ * i);
  }
  (o = o > 1 ? o : 2), (r = r || new Array(o));
  for (let h = 0; h < o; ++h)
    r[h] =
      a === void 0
        ? NaN
        : l === void 0
          ? s[a + h]
          : jt(s[a + h], s[a + i + h], l);
  return r;
}
function no(s, t, e, i, n, r) {
  if (e == t) return null;
  let o;
  if (n < s[t + i - 1])
    return r ? ((o = s.slice(t, t + i)), (o[i - 1] = n), o) : null;
  if (s[e - 1] < n)
    return r ? ((o = s.slice(e - i, e)), (o[i - 1] = n), o) : null;
  if (n == s[t + i - 1]) return s.slice(t, t + i);
  let a = t / i,
    l = e / i;
  for (; a < l; ) {
    const d = (a + l) >> 1;
    n < s[(d + 1) * i - 1] ? (l = d) : (a = d + 1);
  }
  const c = s[a * i - 1];
  if (n == c) return s.slice((a - 1) * i, (a - 1) * i + i);
  const h = s[(a + 1) * i - 1],
    u = (n - c) / (h - c);
  o = [];
  for (let d = 0; d < i - 1; ++d)
    o.push(jt(s[(a - 1) * i + d], s[a * i + d], u));
  return o.push(n), o;
}
function Mu(s, t, e, i, n, r, o) {
  if (o) return no(s, t, e[e.length - 1], i, n, r);
  let a;
  if (n < s[i - 1]) return r ? ((a = s.slice(0, i)), (a[i - 1] = n), a) : null;
  if (s[s.length - 1] < n)
    return r ? ((a = s.slice(s.length - i)), (a[i - 1] = n), a) : null;
  for (let l = 0, c = e.length; l < c; ++l) {
    const h = e[l];
    if (t != h) {
      if (n < s[t + i - 1]) return null;
      if (n <= s[h - 1]) return no(s, t, h, i, n, !1);
      t = h;
    }
  }
  return null;
}
function jo(s, t, e, i) {
  let n = s[t],
    r = s[t + 1],
    o = 0;
  for (let a = t + i; a < e; a += i) {
    const l = s[a],
      c = s[a + 1];
    (o += Math.sqrt((l - n) * (l - n) + (c - r) * (c - r))), (n = l), (r = c);
  }
  return o;
}
class oe extends ii {
  constructor(t, e) {
    super(),
      (this.flatMidpoint_ = null),
      (this.flatMidpointRevision_ = -1),
      (this.maxDelta_ = -1),
      (this.maxDeltaRevision_ = -1),
      e !== void 0 && !Array.isArray(t[0])
        ? this.setFlatCoordinates(e, t)
        : this.setCoordinates(t, e);
  }
  appendCoordinate(t) {
    Qt(this.flatCoordinates, t), this.changed();
  }
  clone() {
    const t = new oe(this.flatCoordinates.slice(), this.layout);
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, i, n) {
    return n < Ci(this.getExtent(), t, e)
      ? n
      : (this.maxDeltaRevision_ != this.getRevision() &&
          ((this.maxDelta_ = Math.sqrt(
            Do(
              this.flatCoordinates,
              0,
              this.flatCoordinates.length,
              this.stride,
              0,
            ),
          )),
          (this.maxDeltaRevision_ = this.getRevision())),
        ko(
          this.flatCoordinates,
          0,
          this.flatCoordinates.length,
          this.stride,
          this.maxDelta_,
          !1,
          t,
          e,
          i,
          n,
        ));
  }
  forEachSegment(t) {
    return sh(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
    );
  }
  getCoordinateAtM(t, e) {
    return this.layout != "XYM" && this.layout != "XYZM"
      ? null
      : ((e = e !== void 0 ? e : !1),
        no(
          this.flatCoordinates,
          0,
          this.flatCoordinates.length,
          this.stride,
          t,
          e,
        ));
  }
  getCoordinates() {
    return He(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
    );
  }
  getCoordinateAt(t, e) {
    return Ls(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      e,
      this.stride,
    );
  }
  getLength() {
    return jo(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
    );
  }
  getFlatMidpoint() {
    return (
      this.flatMidpointRevision_ != this.getRevision() &&
        ((this.flatMidpoint_ = this.getCoordinateAt(
          0.5,
          this.flatMidpoint_ ?? void 0,
        )),
        (this.flatMidpointRevision_ = this.getRevision())),
      this.flatMidpoint_
    );
  }
  getSimplifiedGeometryInternal(t) {
    const e = [];
    return (
      (e.length = $s(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        t,
        e,
        0,
      )),
      new oe(e, "XY")
    );
  }
  getType() {
    return "LineString";
  }
  intersectsExtent(t) {
    return Js(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      this.getExtent(),
    );
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 1),
      this.flatCoordinates || (this.flatCoordinates = []),
      (this.flatCoordinates.length = qs(
        this.flatCoordinates,
        0,
        t,
        this.stride,
      )),
      this.changed();
  }
}
const $t = {
    PRERENDER: "prerender",
    POSTRENDER: "postrender",
    PRECOMPOSE: "precompose",
    POSTCOMPOSE: "postcompose",
    RENDERCOMPLETE: "rendercomplete",
  },
  yi =
    typeof navigator < "u" && typeof navigator.userAgent < "u"
      ? navigator.userAgent.toLowerCase()
      : "",
  Pu = yi.includes("safari") && !yi.includes("chrom");
Pu &&
  (yi.includes("version/15.4") ||
    /cpu (os|iphone os) 15_4 like mac os x/.test(yi));
const Fu = yi.includes("webkit") && !yi.includes("edge"),
  lh = yi.includes("macintosh"),
  bu = typeof devicePixelRatio < "u" ? devicePixelRatio : 1,
  hh =
    typeof WorkerGlobalScope < "u" &&
    typeof OffscreenCanvas < "u" &&
    self instanceof WorkerGlobalScope,
  ch = typeof Image < "u" && Image.prototype.decode,
  uh = (function () {
    let s = !1;
    try {
      const t = Object.defineProperty({}, "passive", {
        get: function () {
          s = !0;
        },
      });
      window.addEventListener("_", null, t),
        window.removeEventListener("_", null, t);
    } catch {}
    return s;
  })(),
  q = { IDLE: 0, LOADING: 1, LOADED: 2, ERROR: 3 };
function xt(s, t, e, i) {
  let n;
  return (
    e && e.length
      ? (n = e.shift())
      : hh
        ? (n = new OffscreenCanvas(s || 300, t || 300))
        : (n = document.createElement("canvas")),
    s && (n.width = s),
    t && (n.height = t),
    n.getContext("2d", i)
  );
}
let yr;
function Ms() {
  return yr || (yr = xt(1, 1)), yr;
}
function Qs(s) {
  const t = s.canvas;
  (t.width = 1), (t.height = 1), s.clearRect(0, 0, 1, 1);
}
function Ya(s, t) {
  const e = t.parentNode;
  e && e.replaceChild(s, t);
}
function Au(s) {
  for (; s.lastChild; ) s.lastChild.remove();
}
function Du(s, t) {
  const e = s.childNodes;
  for (let i = 0; ; ++i) {
    const n = e[i],
      r = t[i];
    if (!n && !r) break;
    if (n !== r) {
      if (!n) {
        s.appendChild(r);
        continue;
      }
      if (!r) {
        s.removeChild(n), --i;
        continue;
      }
      s.insertBefore(r, n);
    }
  }
}
const Yo = [NaN, NaN, NaN, 0];
let pr;
function Ou() {
  return (
    pr ||
      (pr = xt(1, 1, void 0, { willReadFrequently: !0, desynchronized: !0 })),
    pr
  );
}
const ku =
    /^rgba?\(\s*(\d+%?)\s+(\d+%?)\s+(\d+%?)(?:\s*\/\s*(\d+%|\d*\.\d+|[01]))?\s*\)$/i,
  Gu =
    /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*(\d+%|\d*\.\d+|[01]))?\s*\)$/i,
  Nu =
    /^rgba?\(\s*(\d+%)\s*,\s*(\d+%)\s*,\s*(\d+%)(?:\s*,\s*(\d+%|\d*\.\d+|[01]))?\s*\)$/i,
  Bu = /^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i;
function rs(s, t) {
  return s.endsWith("%") ? Number(s.substring(0, s.length - 1)) / t : Number(s);
}
function vn(s) {
  throw new Error('failed to parse "' + s + '" as color');
}
function dh(s) {
  if (s.toLowerCase().startsWith("rgb")) {
    const r = s.match(Gu) || s.match(ku) || s.match(Nu);
    if (r) {
      const o = r[4],
        a = 100 / 255;
      return [
        ct((rs(r[1], a) + 0.5) | 0, 0, 255),
        ct((rs(r[2], a) + 0.5) | 0, 0, 255),
        ct((rs(r[3], a) + 0.5) | 0, 0, 255),
        o !== void 0 ? ct(rs(o, 100), 0, 1) : 1,
      ];
    }
    vn(s);
  }
  if (s.startsWith("#")) {
    if (Bu.test(s)) {
      const r = s.substring(1),
        o = r.length <= 4 ? 1 : 2,
        a = [0, 0, 0, 255];
      for (let l = 0, c = r.length; l < c; l += o) {
        let h = parseInt(r.substring(l, l + o), 16);
        o === 1 && (h += h << 4), (a[l / o] = h);
      }
      return (a[3] = a[3] / 255), a;
    }
    vn(s);
  }
  const t = Ou();
  t.fillStyle = "#abcdef";
  let e = t.fillStyle;
  (t.fillStyle = s),
    t.fillStyle === e &&
      ((t.fillStyle = "#fedcba"),
      (e = t.fillStyle),
      (t.fillStyle = s),
      t.fillStyle === e && vn(s));
  const i = t.fillStyle;
  if (i.startsWith("#") || i.startsWith("rgba")) return dh(i);
  t.clearRect(0, 0, 1, 1), t.fillRect(0, 0, 1, 1);
  const n = Array.from(t.getImageData(0, 0, 1, 1).data);
  return (n[3] = Kn(n[3] / 255, 3)), n;
}
function zu(s) {
  return typeof s == "string" ? s : Ko(s);
}
const Xu = 1024,
  fn = {};
let xr = 0;
function Wu(s) {
  if (s.length === 4) return s;
  const t = s.slice();
  return (t[3] = 1), t;
}
function Er(s) {
  return s > 0.0031308 ? Math.pow(s, 1 / 2.4) * 269.025 - 14.025 : s * 3294.6;
}
function Cr(s) {
  return s > 0.2068965 ? Math.pow(s, 3) : (s - 4 / 29) * (108 / 841);
}
function wr(s) {
  return s > 10.314724 ? Math.pow((s + 14.025) / 269.025, 2.4) : s / 3294.6;
}
function Sr(s) {
  return s > 0.0088564 ? Math.pow(s, 1 / 3) : s / (108 / 841) + 4 / 29;
}
function Va(s) {
  const t = wr(s[0]),
    e = wr(s[1]),
    i = wr(s[2]),
    n = Sr(t * 0.222488403 + e * 0.716873169 + i * 0.06060791),
    r = 500 * (Sr(t * 0.452247074 + e * 0.399439023 + i * 0.148375274) - n),
    o = 200 * (n - Sr(t * 0.016863605 + e * 0.117638439 + i * 0.865350722)),
    a = Math.atan2(o, r) * (180 / Math.PI);
  return [116 * n - 16, Math.sqrt(r * r + o * o), a < 0 ? a + 360 : a, s[3]];
}
function ju(s) {
  const t = (s[0] + 16) / 116,
    e = s[1],
    i = (s[2] * Math.PI) / 180,
    n = Cr(t),
    r = Cr(t + (e / 500) * Math.cos(i)),
    o = Cr(t - (e / 200) * Math.sin(i)),
    a = Er(r * 3.021973625 - n * 1.617392459 - o * 0.404875592),
    l = Er(r * -0.943766287 + n * 1.916279586 + o * 0.027607165),
    c = Er(r * 0.069407491 - n * 0.22898585 + o * 1.159737864);
  return [
    ct((a + 0.5) | 0, 0, 255),
    ct((l + 0.5) | 0, 0, 255),
    ct((c + 0.5) | 0, 0, 255),
    s[3],
  ];
}
function Vo(s) {
  if (s === "none") return Yo;
  if (fn.hasOwnProperty(s)) return fn[s];
  if (xr >= Xu) {
    let e = 0;
    for (const i in fn) (e++ & 3) === 0 && (delete fn[i], --xr);
  }
  const t = dh(s);
  t.length !== 4 && vn(s);
  for (const e of t) isNaN(e) && vn(s);
  return (fn[s] = t), ++xr, t;
}
function Ji(s) {
  return Array.isArray(s) ? s : Vo(s);
}
function Ko(s) {
  let t = s[0];
  t != (t | 0) && (t = (t + 0.5) | 0);
  let e = s[1];
  e != (e | 0) && (e = (e + 0.5) | 0);
  let i = s[2];
  i != (i | 0) && (i = (i + 0.5) | 0);
  const n = s[3] === void 0 ? 1 : Math.round(s[3] * 1e3) / 1e3;
  return "rgba(" + t + "," + e + "," + i + "," + n + ")";
}
function Yu(s, t, e) {
  const i = s;
  let n = !0,
    r = !1,
    o = !1;
  const a = [
    ws(i, j.LOAD, function () {
      (o = !0), r || t();
    }),
  ];
  return (
    i.src && ch
      ? ((r = !0),
        i
          .decode()
          .then(function () {
            n && t();
          })
          .catch(function (l) {
            n && (o ? t() : e());
          }))
      : a.push(ws(i, j.ERROR, e)),
    function () {
      (n = !1), a.forEach(lt);
    }
  );
}
function Vu(s, t) {
  return new Promise((e, i) => {
    function n() {
      o(), e(s);
    }
    function r() {
      o(), i(new Error("Image load error"));
    }
    function o() {
      s.removeEventListener("load", n), s.removeEventListener("error", r);
    }
    s.addEventListener("load", n), s.addEventListener("error", r);
  });
}
function Ku(s, t) {
  return (
    t && (s.src = t),
    s.src && ch
      ? new Promise((e, i) =>
          s
            .decode()
            .then(() => e(s))
            .catch((n) => (s.complete && s.width ? e(s) : i(n))),
        )
      : Vu(s)
  );
}
class Uu {
  constructor() {
    (this.cache_ = {}),
      (this.patternCache_ = {}),
      (this.cacheSize_ = 0),
      (this.maxCacheSize_ = 1024);
  }
  clear() {
    (this.cache_ = {}), (this.patternCache_ = {}), (this.cacheSize_ = 0);
  }
  canExpireCache() {
    return this.cacheSize_ > this.maxCacheSize_;
  }
  expire() {
    if (this.canExpireCache()) {
      let t = 0;
      for (const e in this.cache_) {
        const i = this.cache_[e];
        (t++ & 3) === 0 &&
          !i.hasListener() &&
          (delete this.cache_[e],
          delete this.patternCache_[e],
          --this.cacheSize_);
      }
    }
  }
  get(t, e, i) {
    const n = Tr(t, e, i);
    return n in this.cache_ ? this.cache_[n] : null;
  }
  getPattern(t, e, i) {
    const n = Tr(t, e, i);
    return n in this.patternCache_ ? this.patternCache_[n] : null;
  }
  set(t, e, i, n, r) {
    const o = Tr(t, e, i),
      a = o in this.cache_;
    (this.cache_[o] = n),
      r &&
        (n.getImageState() === q.IDLE && n.load(),
        n.getImageState() === q.LOADING
          ? n.ready().then(() => {
              this.patternCache_[o] = Ms().createPattern(
                n.getImage(1),
                "repeat",
              );
            })
          : (this.patternCache_[o] = Ms().createPattern(
              n.getImage(1),
              "repeat",
            ))),
      a || ++this.cacheSize_;
  }
  setSize(t) {
    (this.maxCacheSize_ = t), this.expire();
  }
}
function Tr(s, t, e) {
  const i = e ? Ji(e) : "null";
  return t + ":" + s + ":" + i;
}
const Jt = new Uu();
let gn = null;
class fh extends Ws {
  constructor(t, e, i, n, r) {
    super(),
      (this.hitDetectionImage_ = null),
      (this.image_ = t),
      (this.crossOrigin_ = i),
      (this.canvas_ = {}),
      (this.color_ = r),
      (this.imageState_ = n === void 0 ? q.IDLE : n),
      (this.size_ = t && t.width && t.height ? [t.width, t.height] : null),
      (this.src_ = e),
      this.tainted_,
      (this.ready_ = null);
  }
  initializeImage_() {
    (this.image_ = new Image()),
      this.crossOrigin_ !== null &&
        (this.image_.crossOrigin = this.crossOrigin_);
  }
  isTainted_() {
    if (this.tainted_ === void 0 && this.imageState_ === q.LOADED) {
      gn || (gn = xt(1, 1, void 0, { willReadFrequently: !0 })),
        gn.drawImage(this.image_, 0, 0);
      try {
        gn.getImageData(0, 0, 1, 1), (this.tainted_ = !1);
      } catch {
        (gn = null), (this.tainted_ = !0);
      }
    }
    return this.tainted_ === !0;
  }
  dispatchChangeEvent_() {
    this.dispatchEvent(j.CHANGE);
  }
  handleImageError_() {
    (this.imageState_ = q.ERROR), this.dispatchChangeEvent_();
  }
  handleImageLoad_() {
    (this.imageState_ = q.LOADED),
      (this.size_ = [this.image_.width, this.image_.height]),
      this.dispatchChangeEvent_();
  }
  getImage(t) {
    return (
      this.image_ || this.initializeImage_(),
      this.replaceColor_(t),
      this.canvas_[t] ? this.canvas_[t] : this.image_
    );
  }
  getPixelRatio(t) {
    return this.replaceColor_(t), this.canvas_[t] ? t : 1;
  }
  getImageState() {
    return this.imageState_;
  }
  getHitDetectionImage() {
    if ((this.image_ || this.initializeImage_(), !this.hitDetectionImage_))
      if (this.isTainted_()) {
        const t = this.size_[0],
          e = this.size_[1],
          i = xt(t, e);
        i.fillRect(0, 0, t, e), (this.hitDetectionImage_ = i.canvas);
      } else this.hitDetectionImage_ = this.image_;
    return this.hitDetectionImage_;
  }
  getSize() {
    return this.size_;
  }
  getSrc() {
    return this.src_;
  }
  load() {
    if (this.imageState_ === q.IDLE) {
      this.image_ || this.initializeImage_(), (this.imageState_ = q.LOADING);
      try {
        this.src_ !== void 0 && (this.image_.src = this.src_);
      } catch {
        this.handleImageError_();
      }
      this.image_ instanceof HTMLImageElement &&
        Ku(this.image_, this.src_)
          .then((t) => {
            (this.image_ = t), this.handleImageLoad_();
          })
          .catch(this.handleImageError_.bind(this));
    }
  }
  replaceColor_(t) {
    if (!this.color_ || this.canvas_[t] || this.imageState_ !== q.LOADED)
      return;
    const e = this.image_,
      i = xt(Math.ceil(e.width * t), Math.ceil(e.height * t)),
      n = i.canvas;
    i.scale(t, t),
      i.drawImage(e, 0, 0),
      (i.globalCompositeOperation = "multiply"),
      (i.fillStyle = zu(this.color_)),
      i.fillRect(0, 0, n.width / t, n.height / t),
      (i.globalCompositeOperation = "destination-in"),
      i.drawImage(e, 0, 0),
      (this.canvas_[t] = n);
  }
  ready() {
    return (
      this.ready_ ||
        (this.ready_ = new Promise((t) => {
          if (this.imageState_ === q.LOADED || this.imageState_ === q.ERROR)
            t();
          else {
            const e = () => {
              (this.imageState_ === q.LOADED || this.imageState_ === q.ERROR) &&
                (this.removeEventListener(j.CHANGE, e), t());
            };
            this.addEventListener(j.CHANGE, e);
          }
        })),
      this.ready_
    );
  }
}
function Uo(s, t, e, i, n, r) {
  let o = t === void 0 ? void 0 : Jt.get(t, e, n);
  return (
    o ||
      ((o = new fh(s, s && "src" in s ? s.src || void 0 : t, e, i, n)),
      Jt.set(t, e, n, o, r)),
    r && o && !Jt.getPattern(t, e, n) && Jt.set(t, e, n, o, r),
    o
  );
}
function _e(s) {
  return s
    ? Array.isArray(s)
      ? Ko(s)
      : typeof s == "object" && "src" in s
        ? Zu(s)
        : s
    : null;
}
function Zu(s) {
  if (!s.offset || !s.size) return Jt.getPattern(s.src, "anonymous", s.color);
  const t = s.src + ":" + s.offset,
    e = Jt.getPattern(t, void 0, s.color);
  if (e) return e;
  const i = Jt.get(s.src, "anonymous", null);
  if (i.getImageState() !== q.LOADED) return null;
  const n = xt(s.size[0], s.size[1]);
  return (
    n.drawImage(
      i.getImage(1),
      s.offset[0],
      s.offset[1],
      s.size[0],
      s.size[1],
      0,
      0,
      s.size[0],
      s.size[1],
    ),
    Uo(n.canvas, t, void 0, q.LOADED, s.color, !0),
    Jt.getPattern(t, void 0, s.color)
  );
}
class gh {
  drawCustom(t, e, i, n, r) {}
  drawGeometry(t) {}
  setStyle(t) {}
  drawCircle(t, e, i) {}
  drawFeature(t, e, i) {}
  drawGeometryCollection(t, e, i) {}
  drawLineString(t, e, i) {}
  drawMultiLineString(t, e, i) {}
  drawMultiPoint(t, e, i) {}
  drawMultiPolygon(t, e, i) {}
  drawPoint(t, e, i) {}
  drawPolygon(t, e, i) {}
  drawText(t, e, i) {}
  setFillStrokeStyle(t, e) {}
  setImageStyle(t, e) {}
  setTextStyle(t, e) {}
}
const os = "ol-hidden",
  tr = "ol-unselectable",
  Zo = "ol-control",
  Ka = "ol-collapsed",
  Hu = new RegExp(
    [
      "^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)",
      "(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)",
      "(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)",
      "(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?",
      "(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))",
      "(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))",
      `?\\s*([-,\\"\\'\\sa-z0-9]+?)\\s*$`,
    ].join(""),
    "i",
  ),
  Ua = ["style", "variant", "weight", "size", "lineHeight", "family"],
  _h = function (s) {
    const t = s.match(Hu);
    if (!t) return null;
    const e = {
      lineHeight: "normal",
      size: "1.2em",
      style: "normal",
      weight: "normal",
      variant: "normal",
    };
    for (let i = 0, n = Ua.length; i < n; ++i) {
      const r = t[i + 1];
      r !== void 0 && (e[Ua[i]] = r);
    }
    return (e.families = e.family.split(/,\s?/)), e;
  },
  mh = "10px sans-serif",
  Nt = "#000",
  Qi = "round",
  be = [],
  Ae = 0,
  tn = "round",
  On = 10,
  kn = "#000",
  Gn = "center",
  Ps = "middle",
  di = [0, 0, 0, 0],
  Nn = 1,
  Te = new me();
let Oi = null,
  so;
const ro = {},
  qu = (function () {
    const t = "32px ",
      e = ["monospace", "serif"],
      i = e.length,
      n = "wmytzilWMYTZIL@#/&?$%10";
    let r, o;
    function a(c, h, u) {
      let d = !0;
      for (let f = 0; f < i; ++f) {
        const g = e[f];
        if (((o = Fs(c + " " + h + " " + t + g, n)), u != g)) {
          const _ = Fs(c + " " + h + " " + t + u + "," + g, n);
          d = d && _ != o;
        }
      }
      return !!d;
    }
    function l() {
      let c = !0;
      const h = Te.getKeys();
      for (let u = 0, d = h.length; u < d; ++u) {
        const f = h[u];
        if (Te.get(f) < 100) {
          const [g, _, m] = f.split(`
`);
          a(g, _, m)
            ? (rn(ro), (Oi = null), (so = void 0), Te.set(f, 100))
            : (Te.set(f, Te.get(f) + 1, !0), (c = !1));
        }
      }
      c && (clearInterval(r), (r = void 0));
    }
    return function (c) {
      const h = _h(c);
      if (!h) return;
      const u = h.families;
      for (let d = 0, f = u.length; d < f; ++d) {
        const g = u[d],
          _ =
            h.style +
            `
` +
            h.weight +
            `
` +
            g;
        Te.get(_) === void 0 &&
          (Te.set(_, 100, !0),
          a(h.style, h.weight, g) ||
            (Te.set(_, 0, !0), r === void 0 && (r = setInterval(l, 32))));
      }
    };
  })(),
  $u = (function () {
    let s;
    return function (t) {
      let e = ro[t];
      if (e == null) {
        if (hh) {
          const i = _h(t),
            n = yh(t, "Žg");
          e =
            (isNaN(Number(i.lineHeight)) ? 1.2 : Number(i.lineHeight)) *
            (n.actualBoundingBoxAscent + n.actualBoundingBoxDescent);
        } else
          s ||
            ((s = document.createElement("div")),
            (s.innerHTML = "M"),
            (s.style.minHeight = "0"),
            (s.style.maxHeight = "none"),
            (s.style.height = "auto"),
            (s.style.padding = "0"),
            (s.style.border = "none"),
            (s.style.position = "absolute"),
            (s.style.display = "block"),
            (s.style.left = "-99999px")),
            (s.style.font = t),
            document.body.appendChild(s),
            (e = s.offsetHeight),
            document.body.removeChild(s);
        ro[t] = e;
      }
      return e;
    };
  })();
function yh(s, t) {
  return (
    Oi || (Oi = xt(1, 1)),
    s != so && ((Oi.font = s), (so = Oi.font)),
    Oi.measureText(t)
  );
}
function Fs(s, t) {
  return yh(s, t).width;
}
function Za(s, t, e) {
  if (t in e) return e[t];
  const i = t
    .split(
      `
`,
    )
    .reduce((n, r) => Math.max(n, Fs(s, r)), 0);
  return (e[t] = i), i;
}
function Ju(s, t) {
  const e = [],
    i = [],
    n = [];
  let r = 0,
    o = 0,
    a = 0,
    l = 0;
  for (let c = 0, h = t.length; c <= h; c += 2) {
    const u = t[c];
    if (
      u ===
        `
` ||
      c === h
    ) {
      (r = Math.max(r, o)), n.push(o), (o = 0), (a += l), (l = 0);
      continue;
    }
    const d = t[c + 1] || s.font,
      f = Fs(d, u);
    e.push(f), (o += f);
    const g = $u(d);
    i.push(g), (l = Math.max(l, g));
  }
  return { width: r, height: a, widths: e, heights: i, lineWidths: n };
}
function Qu(s, t, e, i, n, r, o, a, l, c, h) {
  s.save(),
    e !== 1 &&
      (s.globalAlpha === void 0
        ? (s.globalAlpha = (u) => (u.globalAlpha *= e))
        : (s.globalAlpha *= e)),
    t && s.transform.apply(s, t),
    i.contextInstructions
      ? (s.translate(l, c), s.scale(h[0], h[1]), td(i, s))
      : h[0] < 0 || h[1] < 0
        ? (s.translate(l, c),
          s.scale(h[0], h[1]),
          s.drawImage(i, n, r, o, a, 0, 0, o, a))
        : s.drawImage(i, n, r, o, a, l, c, o * h[0], a * h[1]),
    s.restore();
}
function td(s, t) {
  const e = s.contextInstructions;
  for (let i = 0, n = e.length; i < n; i += 2)
    Array.isArray(e[i + 1]) ? t[e[i]].apply(t, e[i + 1]) : (t[e[i]] = e[i + 1]);
}
class ed extends gh {
  constructor(t, e, i, n, r, o, a) {
    super(),
      (this.context_ = t),
      (this.pixelRatio_ = e),
      (this.extent_ = i),
      (this.transform_ = n),
      (this.transformRotation_ = n ? Kn(Math.atan2(n[1], n[0]), 10) : 0),
      (this.viewRotation_ = r),
      (this.squaredTolerance_ = o),
      (this.userTransform_ = a),
      (this.contextFillState_ = null),
      (this.contextStrokeState_ = null),
      (this.contextTextState_ = null),
      (this.fillState_ = null),
      (this.strokeState_ = null),
      (this.image_ = null),
      (this.imageAnchorX_ = 0),
      (this.imageAnchorY_ = 0),
      (this.imageHeight_ = 0),
      (this.imageOpacity_ = 0),
      (this.imageOriginX_ = 0),
      (this.imageOriginY_ = 0),
      (this.imageRotateWithView_ = !1),
      (this.imageRotation_ = 0),
      (this.imageScale_ = [0, 0]),
      (this.imageWidth_ = 0),
      (this.text_ = ""),
      (this.textOffsetX_ = 0),
      (this.textOffsetY_ = 0),
      (this.textRotateWithView_ = !1),
      (this.textRotation_ = 0),
      (this.textScale_ = [0, 0]),
      (this.textFillState_ = null),
      (this.textStrokeState_ = null),
      (this.textState_ = null),
      (this.pixelCoordinates_ = []),
      (this.tmpLocalTransform_ = re());
  }
  drawImages_(t, e, i, n) {
    if (!this.image_) return;
    const r = Je(t, e, i, n, this.transform_, this.pixelCoordinates_),
      o = this.context_,
      a = this.tmpLocalTransform_,
      l = o.globalAlpha;
    this.imageOpacity_ != 1 && (o.globalAlpha = l * this.imageOpacity_);
    let c = this.imageRotation_;
    this.transformRotation_ === 0 && (c -= this.viewRotation_),
      this.imageRotateWithView_ && (c += this.viewRotation_);
    for (let h = 0, u = r.length; h < u; h += 2) {
      const d = r[h] - this.imageAnchorX_,
        f = r[h + 1] - this.imageAnchorY_;
      if (c !== 0 || this.imageScale_[0] != 1 || this.imageScale_[1] != 1) {
        const g = d + this.imageAnchorX_,
          _ = f + this.imageAnchorY_;
        ke(a, g, _, 1, 1, c, -g, -_),
          o.save(),
          o.transform.apply(o, a),
          o.translate(g, _),
          o.scale(this.imageScale_[0], this.imageScale_[1]),
          o.drawImage(
            this.image_,
            this.imageOriginX_,
            this.imageOriginY_,
            this.imageWidth_,
            this.imageHeight_,
            -this.imageAnchorX_,
            -this.imageAnchorY_,
            this.imageWidth_,
            this.imageHeight_,
          ),
          o.restore();
      } else
        o.drawImage(
          this.image_,
          this.imageOriginX_,
          this.imageOriginY_,
          this.imageWidth_,
          this.imageHeight_,
          d,
          f,
          this.imageWidth_,
          this.imageHeight_,
        );
    }
    this.imageOpacity_ != 1 && (o.globalAlpha = l);
  }
  drawText_(t, e, i, n) {
    if (!this.textState_ || this.text_ === "") return;
    this.textFillState_ && this.setContextFillState_(this.textFillState_),
      this.textStrokeState_ &&
        this.setContextStrokeState_(this.textStrokeState_),
      this.setContextTextState_(this.textState_);
    const r = Je(t, e, i, n, this.transform_, this.pixelCoordinates_),
      o = this.context_;
    let a = this.textRotation_;
    for (
      this.transformRotation_ === 0 && (a -= this.viewRotation_),
        this.textRotateWithView_ && (a += this.viewRotation_);
      e < i;
      e += n
    ) {
      const l = r[e] + this.textOffsetX_,
        c = r[e + 1] + this.textOffsetY_;
      a !== 0 || this.textScale_[0] != 1 || this.textScale_[1] != 1
        ? (o.save(),
          o.translate(l - this.textOffsetX_, c - this.textOffsetY_),
          o.rotate(a),
          o.translate(this.textOffsetX_, this.textOffsetY_),
          o.scale(this.textScale_[0], this.textScale_[1]),
          this.textStrokeState_ && o.strokeText(this.text_, 0, 0),
          this.textFillState_ && o.fillText(this.text_, 0, 0),
          o.restore())
        : (this.textStrokeState_ && o.strokeText(this.text_, l, c),
          this.textFillState_ && o.fillText(this.text_, l, c));
    }
  }
  moveToLineTo_(t, e, i, n, r) {
    const o = this.context_,
      a = Je(t, e, i, n, this.transform_, this.pixelCoordinates_);
    o.moveTo(a[0], a[1]);
    let l = a.length;
    r && (l -= 2);
    for (let c = 2; c < l; c += 2) o.lineTo(a[c], a[c + 1]);
    return r && o.closePath(), i;
  }
  drawRings_(t, e, i, n) {
    for (let r = 0, o = i.length; r < o; ++r)
      e = this.moveToLineTo_(t, e, i[r], n, !0);
    return e;
  }
  drawCircle(t) {
    if (
      (this.squaredTolerance_ &&
        (t = t.simplifyTransformed(
          this.squaredTolerance_,
          this.userTransform_,
        )),
      !!It(this.extent_, t.getExtent()))
    ) {
      if (this.fillState_ || this.strokeState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_),
          this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const e = _u(t, this.transform_, this.pixelCoordinates_),
          i = e[2] - e[0],
          n = e[3] - e[1],
          r = Math.sqrt(i * i + n * n),
          o = this.context_;
        o.beginPath(),
          o.arc(e[0], e[1], r, 0, 2 * Math.PI),
          this.fillState_ && o.fill(),
          this.strokeState_ && o.stroke();
      }
      this.text_ !== "" && this.drawText_(t.getCenter(), 0, 2, 2);
    }
  }
  setStyle(t) {
    this.setFillStrokeStyle(t.getFill(), t.getStroke()),
      this.setImageStyle(t.getImage()),
      this.setTextStyle(t.getText());
  }
  setTransform(t) {
    this.transform_ = t;
  }
  drawGeometry(t) {
    switch (t.getType()) {
      case "Point":
        this.drawPoint(t);
        break;
      case "LineString":
        this.drawLineString(t);
        break;
      case "Polygon":
        this.drawPolygon(t);
        break;
      case "MultiPoint":
        this.drawMultiPoint(t);
        break;
      case "MultiLineString":
        this.drawMultiLineString(t);
        break;
      case "MultiPolygon":
        this.drawMultiPolygon(t);
        break;
      case "GeometryCollection":
        this.drawGeometryCollection(t);
        break;
      case "Circle":
        this.drawCircle(t);
        break;
    }
  }
  drawFeature(t, e) {
    const i = e.getGeometryFunction()(t);
    i && (this.setStyle(e), this.drawGeometry(i));
  }
  drawGeometryCollection(t) {
    const e = t.getGeometriesArray();
    for (let i = 0, n = e.length; i < n; ++i) this.drawGeometry(e[i]);
  }
  drawPoint(t) {
    this.squaredTolerance_ &&
      (t = t.simplifyTransformed(this.squaredTolerance_, this.userTransform_));
    const e = t.getFlatCoordinates(),
      i = t.getStride();
    this.image_ && this.drawImages_(e, 0, e.length, i),
      this.text_ !== "" && this.drawText_(e, 0, e.length, i);
  }
  drawMultiPoint(t) {
    this.squaredTolerance_ &&
      (t = t.simplifyTransformed(this.squaredTolerance_, this.userTransform_));
    const e = t.getFlatCoordinates(),
      i = t.getStride();
    this.image_ && this.drawImages_(e, 0, e.length, i),
      this.text_ !== "" && this.drawText_(e, 0, e.length, i);
  }
  drawLineString(t) {
    if (
      (this.squaredTolerance_ &&
        (t = t.simplifyTransformed(
          this.squaredTolerance_,
          this.userTransform_,
        )),
      !!It(this.extent_, t.getExtent()))
    ) {
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        const e = this.context_,
          i = t.getFlatCoordinates();
        e.beginPath(),
          this.moveToLineTo_(i, 0, i.length, t.getStride(), !1),
          e.stroke();
      }
      if (this.text_ !== "") {
        const e = t.getFlatMidpoint();
        this.drawText_(e, 0, 2, 2);
      }
    }
  }
  drawMultiLineString(t) {
    this.squaredTolerance_ &&
      (t = t.simplifyTransformed(this.squaredTolerance_, this.userTransform_));
    const e = t.getExtent();
    if (It(this.extent_, e)) {
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        const i = this.context_,
          n = t.getFlatCoordinates();
        let r = 0;
        const o = t.getEnds(),
          a = t.getStride();
        i.beginPath();
        for (let l = 0, c = o.length; l < c; ++l)
          r = this.moveToLineTo_(n, r, o[l], a, !1);
        i.stroke();
      }
      if (this.text_ !== "") {
        const i = t.getFlatMidpoints();
        this.drawText_(i, 0, i.length, 2);
      }
    }
  }
  drawPolygon(t) {
    if (
      (this.squaredTolerance_ &&
        (t = t.simplifyTransformed(
          this.squaredTolerance_,
          this.userTransform_,
        )),
      !!It(this.extent_, t.getExtent()))
    ) {
      if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_),
          this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const e = this.context_;
        e.beginPath(),
          this.drawRings_(
            t.getOrientedFlatCoordinates(),
            0,
            t.getEnds(),
            t.getStride(),
          ),
          this.fillState_ && e.fill(),
          this.strokeState_ && e.stroke();
      }
      if (this.text_ !== "") {
        const e = t.getFlatInteriorPoint();
        this.drawText_(e, 0, 2, 2);
      }
    }
  }
  drawMultiPolygon(t) {
    if (
      (this.squaredTolerance_ &&
        (t = t.simplifyTransformed(
          this.squaredTolerance_,
          this.userTransform_,
        )),
      !!It(this.extent_, t.getExtent()))
    ) {
      if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_),
          this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        const e = this.context_,
          i = t.getOrientedFlatCoordinates();
        let n = 0;
        const r = t.getEndss(),
          o = t.getStride();
        e.beginPath();
        for (let a = 0, l = r.length; a < l; ++a) {
          const c = r[a];
          n = this.drawRings_(i, n, c, o);
        }
        this.fillState_ && e.fill(), this.strokeState_ && e.stroke();
      }
      if (this.text_ !== "") {
        const e = t.getFlatInteriorPoints();
        this.drawText_(e, 0, e.length, 2);
      }
    }
  }
  setContextFillState_(t) {
    const e = this.context_,
      i = this.contextFillState_;
    i
      ? i.fillStyle != t.fillStyle &&
        ((i.fillStyle = t.fillStyle), (e.fillStyle = t.fillStyle))
      : ((e.fillStyle = t.fillStyle),
        (this.contextFillState_ = { fillStyle: t.fillStyle }));
  }
  setContextStrokeState_(t) {
    const e = this.context_,
      i = this.contextStrokeState_;
    i
      ? (i.lineCap != t.lineCap &&
          ((i.lineCap = t.lineCap), (e.lineCap = t.lineCap)),
        Ne(i.lineDash, t.lineDash) || e.setLineDash((i.lineDash = t.lineDash)),
        i.lineDashOffset != t.lineDashOffset &&
          ((i.lineDashOffset = t.lineDashOffset),
          (e.lineDashOffset = t.lineDashOffset)),
        i.lineJoin != t.lineJoin &&
          ((i.lineJoin = t.lineJoin), (e.lineJoin = t.lineJoin)),
        i.lineWidth != t.lineWidth &&
          ((i.lineWidth = t.lineWidth), (e.lineWidth = t.lineWidth)),
        i.miterLimit != t.miterLimit &&
          ((i.miterLimit = t.miterLimit), (e.miterLimit = t.miterLimit)),
        i.strokeStyle != t.strokeStyle &&
          ((i.strokeStyle = t.strokeStyle), (e.strokeStyle = t.strokeStyle)))
      : ((e.lineCap = t.lineCap),
        e.setLineDash(t.lineDash),
        (e.lineDashOffset = t.lineDashOffset),
        (e.lineJoin = t.lineJoin),
        (e.lineWidth = t.lineWidth),
        (e.miterLimit = t.miterLimit),
        (e.strokeStyle = t.strokeStyle),
        (this.contextStrokeState_ = {
          lineCap: t.lineCap,
          lineDash: t.lineDash,
          lineDashOffset: t.lineDashOffset,
          lineJoin: t.lineJoin,
          lineWidth: t.lineWidth,
          miterLimit: t.miterLimit,
          strokeStyle: t.strokeStyle,
        }));
  }
  setContextTextState_(t) {
    const e = this.context_,
      i = this.contextTextState_,
      n = t.textAlign ? t.textAlign : Gn;
    i
      ? (i.font != t.font && ((i.font = t.font), (e.font = t.font)),
        i.textAlign != n && ((i.textAlign = n), (e.textAlign = n)),
        i.textBaseline != t.textBaseline &&
          ((i.textBaseline = t.textBaseline),
          (e.textBaseline = t.textBaseline)))
      : ((e.font = t.font),
        (e.textAlign = n),
        (e.textBaseline = t.textBaseline),
        (this.contextTextState_ = {
          font: t.font,
          textAlign: n,
          textBaseline: t.textBaseline,
        }));
  }
  setFillStrokeStyle(t, e) {
    if (!t) this.fillState_ = null;
    else {
      const i = t.getColor();
      this.fillState_ = { fillStyle: _e(i || Nt) };
    }
    if (!e) this.strokeState_ = null;
    else {
      const i = e.getColor(),
        n = e.getLineCap(),
        r = e.getLineDash(),
        o = e.getLineDashOffset(),
        a = e.getLineJoin(),
        l = e.getWidth(),
        c = e.getMiterLimit(),
        h = r || be;
      this.strokeState_ = {
        lineCap: n !== void 0 ? n : Qi,
        lineDash:
          this.pixelRatio_ === 1 ? h : h.map((u) => u * this.pixelRatio_),
        lineDashOffset: (o || Ae) * this.pixelRatio_,
        lineJoin: a !== void 0 ? a : tn,
        lineWidth: (l !== void 0 ? l : Nn) * this.pixelRatio_,
        miterLimit: c !== void 0 ? c : On,
        strokeStyle: _e(i || kn),
      };
    }
  }
  setImageStyle(t) {
    let e;
    if (!t || !(e = t.getSize())) {
      this.image_ = null;
      return;
    }
    const i = t.getPixelRatio(this.pixelRatio_),
      n = t.getAnchor(),
      r = t.getOrigin();
    (this.image_ = t.getImage(this.pixelRatio_)),
      (this.imageAnchorX_ = n[0] * i),
      (this.imageAnchorY_ = n[1] * i),
      (this.imageHeight_ = e[1] * i),
      (this.imageOpacity_ = t.getOpacity()),
      (this.imageOriginX_ = r[0]),
      (this.imageOriginY_ = r[1]),
      (this.imageRotateWithView_ = t.getRotateWithView()),
      (this.imageRotation_ = t.getRotation());
    const o = t.getScaleArray();
    (this.imageScale_ = [
      (o[0] * this.pixelRatio_) / i,
      (o[1] * this.pixelRatio_) / i,
    ]),
      (this.imageWidth_ = e[0] * i);
  }
  setTextStyle(t) {
    if (!t) this.text_ = "";
    else {
      const e = t.getFill();
      if (!e) this.textFillState_ = null;
      else {
        const f = e.getColor();
        this.textFillState_ = { fillStyle: _e(f || Nt) };
      }
      const i = t.getStroke();
      if (!i) this.textStrokeState_ = null;
      else {
        const f = i.getColor(),
          g = i.getLineCap(),
          _ = i.getLineDash(),
          m = i.getLineDashOffset(),
          y = i.getLineJoin(),
          p = i.getWidth(),
          C = i.getMiterLimit();
        this.textStrokeState_ = {
          lineCap: g !== void 0 ? g : Qi,
          lineDash: _ || be,
          lineDashOffset: m || Ae,
          lineJoin: y !== void 0 ? y : tn,
          lineWidth: p !== void 0 ? p : Nn,
          miterLimit: C !== void 0 ? C : On,
          strokeStyle: _e(f || kn),
        };
      }
      const n = t.getFont(),
        r = t.getOffsetX(),
        o = t.getOffsetY(),
        a = t.getRotateWithView(),
        l = t.getRotation(),
        c = t.getScaleArray(),
        h = t.getText(),
        u = t.getTextAlign(),
        d = t.getTextBaseline();
      (this.textState_ = {
        font: n !== void 0 ? n : mh,
        textAlign: u !== void 0 ? u : Gn,
        textBaseline: d !== void 0 ? d : Ps,
      }),
        (this.text_ =
          h !== void 0
            ? Array.isArray(h)
              ? h.reduce((f, g, _) => (f += _ % 2 ? " " : g), "")
              : h
            : ""),
        (this.textOffsetX_ = r !== void 0 ? this.pixelRatio_ * r : 0),
        (this.textOffsetY_ = o !== void 0 ? this.pixelRatio_ * o : 0),
        (this.textRotateWithView_ = a !== void 0 ? a : !1),
        (this.textRotation_ = l !== void 0 ? l : 0),
        (this.textScale_ = [this.pixelRatio_ * c[0], this.pixelRatio_ * c[1]]);
    }
  }
}
const id = 0.5,
  ph = {
    Point: cd,
    LineString: ad,
    Polygon: dd,
    MultiPoint: ud,
    MultiLineString: ld,
    MultiPolygon: hd,
    GeometryCollection: od,
    Circle: sd,
  };
function nd(s, t) {
  return parseInt(V(s), 10) - parseInt(V(t), 10);
}
function Ha(s, t) {
  const e = xh(s, t);
  return e * e;
}
function xh(s, t) {
  return (id * s) / t;
}
function sd(s, t, e, i, n) {
  const r = e.getFill(),
    o = e.getStroke();
  if (r || o) {
    const l = s.getBuilder(e.getZIndex(), "Circle");
    l.setFillStrokeStyle(r, o), l.drawCircle(t, i, n);
  }
  const a = e.getText();
  if (a && a.getText()) {
    const l = s.getBuilder(e.getZIndex(), "Text");
    l.setTextStyle(a), l.drawText(t, i);
  }
}
function qa(s, t, e, i, n, r, o, a) {
  const l = [],
    c = e.getImage();
  if (c) {
    let d = !0;
    const f = c.getImageState();
    f == q.LOADED || f == q.ERROR ? (d = !1) : f == q.IDLE && c.load(),
      d && l.push(c.ready());
  }
  const h = e.getFill();
  h && h.loading() && l.push(h.ready());
  const u = l.length > 0;
  return u && Promise.all(l).then(() => n(null)), rd(s, t, e, i, r, o, a), u;
}
function rd(s, t, e, i, n, r, o) {
  const a = e.getGeometryFunction()(t);
  if (!a) return;
  const l = a.simplifyTransformed(i, n);
  if (e.getRenderer()) Eh(s, l, e, t, o);
  else {
    const h = ph[l.getType()];
    h(s, l, e, t, o, r);
  }
}
function Eh(s, t, e, i, n) {
  if (t.getType() == "GeometryCollection") {
    const o = t.getGeometries();
    for (let a = 0, l = o.length; a < l; ++a) Eh(s, o[a], e, i, n);
    return;
  }
  s.getBuilder(e.getZIndex(), "Default").drawCustom(
    t,
    i,
    e.getRenderer(),
    e.getHitDetectionRenderer(),
    n,
  );
}
function od(s, t, e, i, n, r) {
  const o = t.getGeometriesArray();
  let a, l;
  for (a = 0, l = o.length; a < l; ++a) {
    const c = ph[o[a].getType()];
    c(s, o[a], e, i, n, r);
  }
}
function ad(s, t, e, i, n) {
  const r = e.getStroke();
  if (r) {
    const a = s.getBuilder(e.getZIndex(), "LineString");
    a.setFillStrokeStyle(null, r), a.drawLineString(t, i, n);
  }
  const o = e.getText();
  if (o && o.getText()) {
    const a = s.getBuilder(e.getZIndex(), "Text");
    a.setTextStyle(o), a.drawText(t, i, n);
  }
}
function ld(s, t, e, i, n) {
  const r = e.getStroke();
  if (r) {
    const a = s.getBuilder(e.getZIndex(), "LineString");
    a.setFillStrokeStyle(null, r), a.drawMultiLineString(t, i, n);
  }
  const o = e.getText();
  if (o && o.getText()) {
    const a = s.getBuilder(e.getZIndex(), "Text");
    a.setTextStyle(o), a.drawText(t, i, n);
  }
}
function hd(s, t, e, i, n) {
  const r = e.getFill(),
    o = e.getStroke();
  if (o || r) {
    const l = s.getBuilder(e.getZIndex(), "Polygon");
    l.setFillStrokeStyle(r, o), l.drawMultiPolygon(t, i, n);
  }
  const a = e.getText();
  if (a && a.getText()) {
    const l = s.getBuilder(e.getZIndex(), "Text");
    l.setTextStyle(a), l.drawText(t, i, n);
  }
}
function cd(s, t, e, i, n, r) {
  const o = e.getImage(),
    a = e.getText(),
    l = a && a.getText(),
    c = r && o && l ? {} : void 0;
  if (o) {
    if (o.getImageState() != q.LOADED) return;
    const h = s.getBuilder(e.getZIndex(), "Image");
    h.setImageStyle(o, c), h.drawPoint(t, i, n);
  }
  if (l) {
    const h = s.getBuilder(e.getZIndex(), "Text");
    h.setTextStyle(a, c), h.drawText(t, i, n);
  }
}
function ud(s, t, e, i, n, r) {
  const o = e.getImage(),
    a = o && o.getOpacity() !== 0,
    l = e.getText(),
    c = l && l.getText(),
    h = r && a && c ? {} : void 0;
  if (a) {
    if (o.getImageState() != q.LOADED) return;
    const u = s.getBuilder(e.getZIndex(), "Image");
    u.setImageStyle(o, h), u.drawMultiPoint(t, i, n);
  }
  if (c) {
    const u = s.getBuilder(e.getZIndex(), "Text");
    u.setTextStyle(l, h), u.drawText(t, i, n);
  }
}
function dd(s, t, e, i, n) {
  const r = e.getFill(),
    o = e.getStroke();
  if (r || o) {
    const l = s.getBuilder(e.getZIndex(), "Polygon");
    l.setFillStrokeStyle(r, o), l.drawPolygon(t, i, n);
  }
  const a = e.getText();
  if (a && a.getText()) {
    const l = s.getBuilder(e.getZIndex(), "Text");
    l.setTextStyle(a), l.drawText(t, i, n);
  }
}
let fd = !1;
function gd(s, t, e, i, n, r, o) {
  const a = new XMLHttpRequest();
  a.open("GET", typeof s == "function" ? s(e, i, n) : s, !0),
    t.getType() == "arraybuffer" && (a.responseType = "arraybuffer"),
    (a.withCredentials = fd),
    (a.onload = function (l) {
      if (!a.status || (a.status >= 200 && a.status < 300)) {
        const c = t.getType();
        try {
          let h;
          c == "text" || c == "json"
            ? (h = a.responseText)
            : c == "xml"
              ? (h = a.responseXML || a.responseText)
              : c == "arraybuffer" && (h = a.response),
            h
              ? r(
                  t.readFeatures(h, { extent: e, featureProjection: n }),
                  t.readProjection(h),
                )
              : o();
        } catch {
          o();
        }
      } else o();
    }),
    (a.onerror = o),
    a.send();
}
function $a(s, t) {
  return function (e, i, n, r, o) {
    gd(
      s,
      t,
      e,
      i,
      n,
      (a, l) => {
        this.addFeatures(a), r !== void 0 && r(a);
      },
      () => {
        this.changed(), o !== void 0 && o();
      },
    );
  };
}
function _d(s, t) {
  return [[-1 / 0, -1 / 0, 1 / 0, 1 / 0]];
}
function Ch(s, t, e, i) {
  const n = [];
  let r = Vt();
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    (r = wo(s, t, l[0], i)),
      n.push((r[0] + r[2]) / 2, (r[1] + r[3]) / 2),
      (t = l[l.length - 1]);
  }
  return n;
}
class er extends ii {
  constructor(t, e, i) {
    super(),
      i !== void 0 && e === void 0
        ? this.setFlatCoordinates(i, t)
        : ((e = e || 0), this.setCenterAndRadius(t, e, i));
  }
  clone() {
    const t = new er(this.flatCoordinates.slice(), void 0, this.layout);
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, i, n) {
    const r = this.flatCoordinates,
      o = t - r[0],
      a = e - r[1],
      l = o * o + a * a;
    if (l < n) {
      if (l === 0) for (let c = 0; c < this.stride; ++c) i[c] = r[c];
      else {
        const c = this.getRadius() / Math.sqrt(l);
        (i[0] = r[0] + c * o), (i[1] = r[1] + c * a);
        for (let h = 2; h < this.stride; ++h) i[h] = r[h];
      }
      return (i.length = this.stride), l;
    }
    return n;
  }
  containsXY(t, e) {
    const i = this.flatCoordinates,
      n = t - i[0],
      r = e - i[1];
    return n * n + r * r <= this.getRadiusSquared_();
  }
  getCenter() {
    return this.flatCoordinates.slice(0, this.stride);
  }
  computeExtent(t) {
    const e = this.flatCoordinates,
      i = e[this.stride] - e[0];
    return Oe(e[0] - i, e[1] - i, e[0] + i, e[1] + i, t);
  }
  getRadius() {
    return Math.sqrt(this.getRadiusSquared_());
  }
  getRadiusSquared_() {
    const t = this.flatCoordinates[this.stride] - this.flatCoordinates[0],
      e = this.flatCoordinates[this.stride + 1] - this.flatCoordinates[1];
    return t * t + e * e;
  }
  getType() {
    return "Circle";
  }
  intersectsExtent(t) {
    const e = this.getExtent();
    if (It(t, e)) {
      const i = this.getCenter();
      return (t[0] <= i[0] && t[2] >= i[0]) || (t[1] <= i[1] && t[3] >= i[1])
        ? !0
        : So(t, this.intersectsCoordinate.bind(this));
    }
    return !1;
  }
  setCenter(t) {
    const e = this.stride,
      i = this.flatCoordinates[e] - this.flatCoordinates[0],
      n = t.slice();
    n[e] = n[0] + i;
    for (let r = 1; r < e; ++r) n[e + r] = t[r];
    this.setFlatCoordinates(this.layout, n), this.changed();
  }
  setCenterAndRadius(t, e, i) {
    this.setLayout(i, t, 0),
      this.flatCoordinates || (this.flatCoordinates = []);
    const n = this.flatCoordinates;
    let r = th(n, 0, t, this.stride);
    n[r++] = n[0] + e;
    for (let o = 1, a = this.stride; o < a; ++o) n[r++] = n[o];
    (n.length = r), this.changed();
  }
  getCoordinates() {
    return null;
  }
  setCoordinates(t, e) {}
  setRadius(t) {
    (this.flatCoordinates[this.stride] = this.flatCoordinates[0] + t),
      this.changed();
  }
  rotate(t, e) {
    const i = this.getCenter(),
      n = this.getStride();
    this.setCenter(Ao(i, 0, i.length, n, t, e, i)), this.changed();
  }
}
er.prototype.transform;
class Bn extends $l {
  constructor(t) {
    super(),
      (this.geometries_ = t),
      (this.changeEventsKeys_ = []),
      this.listenGeometriesChange_();
  }
  unlistenGeometriesChange_() {
    this.changeEventsKeys_.forEach(lt), (this.changeEventsKeys_.length = 0);
  }
  listenGeometriesChange_() {
    const t = this.geometries_;
    for (let e = 0, i = t.length; e < i; ++e)
      this.changeEventsKeys_.push($(t[e], j.CHANGE, this.changed, this));
  }
  clone() {
    const t = new Bn(Rr(this.geometries_));
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, i, n) {
    if (n < Ci(this.getExtent(), t, e)) return n;
    const r = this.geometries_;
    for (let o = 0, a = r.length; o < a; ++o)
      n = r[o].closestPointXY(t, e, i, n);
    return n;
  }
  containsXY(t, e) {
    const i = this.geometries_;
    for (let n = 0, r = i.length; n < r; ++n)
      if (i[n].containsXY(t, e)) return !0;
    return !1;
  }
  computeExtent(t) {
    Vn(t);
    const e = this.geometries_;
    for (let i = 0, n = e.length; i < n; ++i) Gl(t, e[i].getExtent());
    return t;
  }
  getGeometries() {
    return Rr(this.geometries_);
  }
  getGeometriesArray() {
    return this.geometries_;
  }
  getGeometriesArrayRecursive() {
    let t = [];
    const e = this.geometries_;
    for (let i = 0, n = e.length; i < n; ++i)
      e[i].getType() === this.getType()
        ? (t = t.concat(e[i].getGeometriesArrayRecursive()))
        : t.push(e[i]);
    return t;
  }
  getSimplifiedGeometry(t) {
    if (
      (this.simplifiedGeometryRevision !== this.getRevision() &&
        ((this.simplifiedGeometryMaxMinSquaredTolerance = 0),
        (this.simplifiedGeometryRevision = this.getRevision())),
      t < 0 ||
        (this.simplifiedGeometryMaxMinSquaredTolerance !== 0 &&
          t < this.simplifiedGeometryMaxMinSquaredTolerance))
    )
      return this;
    const e = [],
      i = this.geometries_;
    let n = !1;
    for (let r = 0, o = i.length; r < o; ++r) {
      const a = i[r],
        l = a.getSimplifiedGeometry(t);
      e.push(l), l !== a && (n = !0);
    }
    return n
      ? new Bn(e)
      : ((this.simplifiedGeometryMaxMinSquaredTolerance = t), this);
  }
  getType() {
    return "GeometryCollection";
  }
  intersectsExtent(t) {
    const e = this.geometries_;
    for (let i = 0, n = e.length; i < n; ++i)
      if (e[i].intersectsExtent(t)) return !0;
    return !1;
  }
  isEmpty() {
    return this.geometries_.length === 0;
  }
  rotate(t, e) {
    const i = this.geometries_;
    for (let n = 0, r = i.length; n < r; ++n) i[n].rotate(t, e);
    this.changed();
  }
  scale(t, e, i) {
    i || (i = Qe(this.getExtent()));
    const n = this.geometries_;
    for (let r = 0, o = n.length; r < o; ++r) n[r].scale(t, e, i);
    this.changed();
  }
  setGeometries(t) {
    this.setGeometriesArray(Rr(t));
  }
  setGeometriesArray(t) {
    this.unlistenGeometriesChange_(),
      (this.geometries_ = t),
      this.listenGeometriesChange_(),
      this.changed();
  }
  applyTransform(t) {
    const e = this.geometries_;
    for (let i = 0, n = e.length; i < n; ++i) e[i].applyTransform(t);
    this.changed();
  }
  translate(t, e) {
    const i = this.geometries_;
    for (let n = 0, r = i.length; n < r; ++n) i[n].translate(t, e);
    this.changed();
  }
  disposeInternal() {
    this.unlistenGeometriesChange_(), super.disposeInternal();
  }
}
function Rr(s) {
  return s.map((t) => t.clone());
}
class en extends ii {
  constructor(t, e, i) {
    if (
      (super(),
      (this.ends_ = []),
      (this.maxDelta_ = -1),
      (this.maxDeltaRevision_ = -1),
      Array.isArray(t[0]))
    )
      this.setCoordinates(t, e);
    else if (e !== void 0 && i) this.setFlatCoordinates(e, t), (this.ends_ = i);
    else {
      const n = t,
        r = [],
        o = [];
      for (let l = 0, c = n.length; l < c; ++l) {
        const h = n[l];
        Qt(r, h.getFlatCoordinates()), o.push(r.length);
      }
      const a = n.length === 0 ? this.getLayout() : n[0].getLayout();
      this.setFlatCoordinates(a, r), (this.ends_ = o);
    }
  }
  appendLineString(t) {
    Qt(this.flatCoordinates, t.getFlatCoordinates().slice()),
      this.ends_.push(this.flatCoordinates.length),
      this.changed();
  }
  clone() {
    const t = new en(
      this.flatCoordinates.slice(),
      this.layout,
      this.ends_.slice(),
    );
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, i, n) {
    return n < Ci(this.getExtent(), t, e)
      ? n
      : (this.maxDeltaRevision_ != this.getRevision() &&
          ((this.maxDelta_ = Math.sqrt(
            Oo(this.flatCoordinates, 0, this.ends_, this.stride, 0),
          )),
          (this.maxDeltaRevision_ = this.getRevision())),
        Go(
          this.flatCoordinates,
          0,
          this.ends_,
          this.stride,
          this.maxDelta_,
          !1,
          t,
          e,
          i,
          n,
        ));
  }
  getCoordinateAtM(t, e, i) {
    return (this.layout != "XYM" && this.layout != "XYZM") ||
      this.flatCoordinates.length === 0
      ? null
      : ((e = e !== void 0 ? e : !1),
        (i = i !== void 0 ? i : !1),
        Mu(this.flatCoordinates, 0, this.ends_, this.stride, t, e, i));
  }
  getCoordinates() {
    return An(this.flatCoordinates, 0, this.ends_, this.stride);
  }
  getEnds() {
    return this.ends_;
  }
  getLineString(t) {
    return t < 0 || this.ends_.length <= t
      ? null
      : new oe(
          this.flatCoordinates.slice(
            t === 0 ? 0 : this.ends_[t - 1],
            this.ends_[t],
          ),
          this.layout,
        );
  }
  getLineStrings() {
    const t = this.flatCoordinates,
      e = this.ends_,
      i = this.layout,
      n = [];
    let r = 0;
    for (let o = 0, a = e.length; o < a; ++o) {
      const l = e[o],
        c = new oe(t.slice(r, l), i);
      n.push(c), (r = l);
    }
    return n;
  }
  getLength() {
    const t = this.ends_;
    let e = 0,
      i = 0;
    for (let n = 0, r = t.length; n < r; ++n)
      (i += jo(this.flatCoordinates, e, t[n], this.stride)), (e = t[n]);
    return i;
  }
  getFlatMidpoints() {
    const t = [],
      e = this.flatCoordinates;
    let i = 0;
    const n = this.ends_,
      r = this.stride;
    for (let o = 0, a = n.length; o < a; ++o) {
      const l = n[o],
        c = Ls(e, i, l, r, 0.5);
      Qt(t, c), (i = l);
    }
    return t;
  }
  getSimplifiedGeometryInternal(t) {
    const e = [],
      i = [];
    return (
      (e.length = ih(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        t,
        e,
        0,
        i,
      )),
      new en(e, "XY", i)
    );
  }
  getType() {
    return "MultiLineString";
  }
  intersectsExtent(t) {
    return Su(this.flatCoordinates, 0, this.ends_, this.stride, t);
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 2),
      this.flatCoordinates || (this.flatCoordinates = []);
    const i = Zn(this.flatCoordinates, 0, t, this.stride, this.ends_);
    (this.flatCoordinates.length = i.length === 0 ? 0 : i[i.length - 1]),
      this.changed();
  }
}
class Hn extends ii {
  constructor(t, e) {
    super(),
      e && !Array.isArray(t[0])
        ? this.setFlatCoordinates(e, t)
        : this.setCoordinates(t, e);
  }
  appendPoint(t) {
    Qt(this.flatCoordinates, t.getFlatCoordinates()), this.changed();
  }
  clone() {
    const t = new Hn(this.flatCoordinates.slice(), this.layout);
    return t.applyProperties(this), t;
  }
  closestPointXY(t, e, i, n) {
    if (n < Ci(this.getExtent(), t, e)) return n;
    const r = this.flatCoordinates,
      o = this.stride;
    for (let a = 0, l = r.length; a < l; a += o) {
      const c = Pe(t, e, r[a], r[a + 1]);
      if (c < n) {
        n = c;
        for (let h = 0; h < o; ++h) i[h] = r[a + h];
        i.length = o;
      }
    }
    return n;
  }
  getCoordinates() {
    return He(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
    );
  }
  getPoint(t) {
    const e = this.flatCoordinates.length / this.stride;
    return t < 0 || e <= t
      ? null
      : new ee(
          this.flatCoordinates.slice(t * this.stride, (t + 1) * this.stride),
          this.layout,
        );
  }
  getPoints() {
    const t = this.flatCoordinates,
      e = this.layout,
      i = this.stride,
      n = [];
    for (let r = 0, o = t.length; r < o; r += i) {
      const a = new ee(t.slice(r, r + i), e);
      n.push(a);
    }
    return n;
  }
  getType() {
    return "MultiPoint";
  }
  intersectsExtent(t) {
    const e = this.flatCoordinates,
      i = this.stride;
    for (let n = 0, r = e.length; n < r; n += i) {
      const o = e[n],
        a = e[n + 1];
      if (Co(t, o, a)) return !0;
    }
    return !1;
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 1),
      this.flatCoordinates || (this.flatCoordinates = []),
      (this.flatCoordinates.length = qs(
        this.flatCoordinates,
        0,
        t,
        this.stride,
      )),
      this.changed();
  }
}
class nn extends ii {
  constructor(t, e, i) {
    if (
      (super(),
      (this.endss_ = []),
      (this.flatInteriorPointsRevision_ = -1),
      (this.flatInteriorPoints_ = null),
      (this.maxDelta_ = -1),
      (this.maxDeltaRevision_ = -1),
      (this.orientedRevision_ = -1),
      (this.orientedFlatCoordinates_ = null),
      !i && !Array.isArray(t[0]))
    ) {
      const n = t,
        r = [],
        o = [];
      for (let a = 0, l = n.length; a < l; ++a) {
        const c = n[a],
          h = r.length,
          u = c.getEnds();
        for (let d = 0, f = u.length; d < f; ++d) u[d] += h;
        Qt(r, c.getFlatCoordinates()), o.push(u);
      }
      (e = n.length === 0 ? this.getLayout() : n[0].getLayout()),
        (t = r),
        (i = o);
    }
    e !== void 0 && i
      ? (this.setFlatCoordinates(e, t), (this.endss_ = i))
      : this.setCoordinates(t, e);
  }
  appendPolygon(t) {
    let e;
    if (!this.flatCoordinates)
      (this.flatCoordinates = t.getFlatCoordinates().slice()),
        (e = t.getEnds().slice()),
        this.endss_.push();
    else {
      const i = this.flatCoordinates.length;
      Qt(this.flatCoordinates, t.getFlatCoordinates()),
        (e = t.getEnds().slice());
      for (let n = 0, r = e.length; n < r; ++n) e[n] += i;
    }
    this.endss_.push(e), this.changed();
  }
  clone() {
    const t = this.endss_.length,
      e = new Array(t);
    for (let n = 0; n < t; ++n) e[n] = this.endss_[n].slice();
    const i = new nn(this.flatCoordinates.slice(), this.layout, e);
    return i.applyProperties(this), i;
  }
  closestPointXY(t, e, i, n) {
    return n < Ci(this.getExtent(), t, e)
      ? n
      : (this.maxDeltaRevision_ != this.getRevision() &&
          ((this.maxDelta_ = Math.sqrt(
            yu(this.flatCoordinates, 0, this.endss_, this.stride, 0),
          )),
          (this.maxDeltaRevision_ = this.getRevision())),
        pu(
          this.getOrientedFlatCoordinates(),
          0,
          this.endss_,
          this.stride,
          this.maxDelta_,
          !0,
          t,
          e,
          i,
          n,
        ));
  }
  containsXY(t, e) {
    return wu(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride,
      t,
      e,
    );
  }
  getArea() {
    return mu(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride);
  }
  getCoordinates(t) {
    let e;
    return (
      t !== void 0
        ? ((e = this.getOrientedFlatCoordinates().slice()),
          io(e, 0, this.endss_, this.stride, t))
        : (e = this.flatCoordinates),
      eo(e, 0, this.endss_, this.stride)
    );
  }
  getEndss() {
    return this.endss_;
  }
  getFlatInteriorPoints() {
    if (this.flatInteriorPointsRevision_ != this.getRevision()) {
      const t = Ch(this.flatCoordinates, 0, this.endss_, this.stride);
      (this.flatInteriorPoints_ = nh(
        this.getOrientedFlatCoordinates(),
        0,
        this.endss_,
        this.stride,
        t,
      )),
        (this.flatInteriorPointsRevision_ = this.getRevision());
    }
    return this.flatInteriorPoints_;
  }
  getInteriorPoints() {
    return new Hn(this.getFlatInteriorPoints().slice(), "XYM");
  }
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const t = this.flatCoordinates;
      ah(t, 0, this.endss_, this.stride)
        ? (this.orientedFlatCoordinates_ = t)
        : ((this.orientedFlatCoordinates_ = t.slice()),
          (this.orientedFlatCoordinates_.length = io(
            this.orientedFlatCoordinates_,
            0,
            this.endss_,
            this.stride,
          ))),
        (this.orientedRevision_ = this.getRevision());
    }
    return this.orientedFlatCoordinates_;
  }
  getSimplifiedGeometryInternal(t) {
    const e = [],
      i = [];
    return (
      (e.length = Eu(
        this.flatCoordinates,
        0,
        this.endss_,
        this.stride,
        Math.sqrt(t),
        e,
        0,
        i,
      )),
      new nn(e, "XY", i)
    );
  }
  getPolygon(t) {
    if (t < 0 || this.endss_.length <= t) return null;
    let e;
    if (t === 0) e = 0;
    else {
      const r = this.endss_[t - 1];
      e = r[r.length - 1];
    }
    const i = this.endss_[t].slice(),
      n = i[i.length - 1];
    if (e !== 0) for (let r = 0, o = i.length; r < o; ++r) i[r] -= e;
    return new ae(this.flatCoordinates.slice(e, n), this.layout, i);
  }
  getPolygons() {
    const t = this.layout,
      e = this.flatCoordinates,
      i = this.endss_,
      n = [];
    let r = 0;
    for (let o = 0, a = i.length; o < a; ++o) {
      const l = i[o].slice(),
        c = l[l.length - 1];
      if (r !== 0) for (let u = 0, d = l.length; u < d; ++u) l[u] -= r;
      const h = new ae(e.slice(r, c), t, l);
      n.push(h), (r = c);
    }
    return n;
  }
  getType() {
    return "MultiPolygon";
  }
  intersectsExtent(t) {
    return Tu(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride,
      t,
    );
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 3),
      this.flatCoordinates || (this.flatCoordinates = []);
    const i = eh(this.flatCoordinates, 0, t, this.stride, this.endss_);
    if (i.length === 0) this.flatCoordinates.length = 0;
    else {
      const n = i[i.length - 1];
      this.flatCoordinates.length = n.length === 0 ? 0 : n[n.length - 1];
    }
    this.changed();
  }
}
const Ja = re();
class Yt {
  constructor(t, e, i, n, r, o) {
    this.styleFunction,
      this.extent_,
      (this.id_ = o),
      (this.type_ = t),
      (this.flatCoordinates_ = e),
      (this.flatInteriorPoints_ = null),
      (this.flatMidpoints_ = null),
      (this.ends_ = i || null),
      (this.properties_ = r),
      this.squaredTolerance_,
      (this.stride_ = n),
      this.simplifiedGeometry_;
  }
  get(t) {
    return this.properties_[t];
  }
  getExtent() {
    return (
      this.extent_ ||
        (this.extent_ =
          this.type_ === "Point"
            ? Tn(this.flatCoordinates_)
            : wo(this.flatCoordinates_, 0, this.flatCoordinates_.length, 2)),
      this.extent_
    );
  }
  getFlatInteriorPoint() {
    if (!this.flatInteriorPoints_) {
      const t = Qe(this.getExtent());
      this.flatInteriorPoints_ = zo(
        this.flatCoordinates_,
        0,
        this.ends_,
        2,
        t,
        0,
      );
    }
    return this.flatInteriorPoints_;
  }
  getFlatInteriorPoints() {
    if (!this.flatInteriorPoints_) {
      const t = vu(this.flatCoordinates_, this.ends_),
        e = Ch(this.flatCoordinates_, 0, t, 2);
      this.flatInteriorPoints_ = nh(this.flatCoordinates_, 0, t, 2, e);
    }
    return this.flatInteriorPoints_;
  }
  getFlatMidpoint() {
    return (
      this.flatMidpoints_ ||
        (this.flatMidpoints_ = Ls(
          this.flatCoordinates_,
          0,
          this.flatCoordinates_.length,
          2,
          0.5,
        )),
      this.flatMidpoints_
    );
  }
  getFlatMidpoints() {
    if (!this.flatMidpoints_) {
      this.flatMidpoints_ = [];
      const t = this.flatCoordinates_;
      let e = 0;
      const i = this.ends_;
      for (let n = 0, r = i.length; n < r; ++n) {
        const o = i[n],
          a = Ls(t, e, o, 2, 0.5);
        Qt(this.flatMidpoints_, a), (e = o);
      }
    }
    return this.flatMidpoints_;
  }
  getId() {
    return this.id_;
  }
  getOrientedFlatCoordinates() {
    return this.flatCoordinates_;
  }
  getGeometry() {
    return this;
  }
  getSimplifiedGeometry(t) {
    return this;
  }
  simplifyTransformed(t, e) {
    return this;
  }
  getProperties() {
    return this.properties_;
  }
  getPropertiesInternal() {
    return this.properties_;
  }
  getStride() {
    return this.stride_;
  }
  getStyleFunction() {
    return this.styleFunction;
  }
  getType() {
    return this.type_;
  }
  transform(t) {
    t = gt(t);
    const e = t.getExtent(),
      i = t.getWorldExtent();
    if (e && i) {
      const n = Ot(i) / Ot(e);
      ke(Ja, i[0], i[3], n, -n, 0, 0, 0),
        Je(
          this.flatCoordinates_,
          0,
          this.flatCoordinates_.length,
          2,
          Ja,
          this.flatCoordinates_,
        );
    }
  }
  applyTransform(t) {
    t(this.flatCoordinates_, this.flatCoordinates_, this.stride_);
  }
  clone() {
    var t;
    return new Yt(
      this.type_,
      this.flatCoordinates_.slice(),
      (t = this.ends_) == null ? void 0 : t.slice(),
      this.stride_,
      Object.assign({}, this.properties_),
      this.id_,
    );
  }
  getEnds() {
    return this.ends_;
  }
  enableSimplifyTransformed() {
    return (
      (this.simplifyTransformed = Ol((t, e) => {
        if (t === this.squaredTolerance_) return this.simplifiedGeometry_;
        (this.simplifiedGeometry_ = this.clone()),
          e && this.simplifiedGeometry_.applyTransform(e);
        const i = this.simplifiedGeometry_.getFlatCoordinates();
        let n;
        switch (this.type_) {
          case "LineString":
            (i.length = $s(
              i,
              0,
              this.simplifiedGeometry_.flatCoordinates_.length,
              this.simplifiedGeometry_.stride_,
              t,
              i,
              0,
            )),
              (n = [i.length]);
            break;
          case "MultiLineString":
            (n = []),
              (i.length = ih(
                i,
                0,
                this.simplifiedGeometry_.ends_,
                this.simplifiedGeometry_.stride_,
                t,
                i,
                0,
                n,
              ));
            break;
          case "Polygon":
            (n = []),
              (i.length = No(
                i,
                0,
                this.simplifiedGeometry_.ends_,
                this.simplifiedGeometry_.stride_,
                Math.sqrt(t),
                i,
                0,
                n,
              ));
            break;
        }
        return (
          n &&
            (this.simplifiedGeometry_ = new Yt(
              this.type_,
              i,
              n,
              2,
              this.properties_,
              this.id_,
            )),
          (this.squaredTolerance_ = t),
          this.simplifiedGeometry_
        );
      })),
      this
    );
  }
}
Yt.prototype.getFlatCoordinates = Yt.prototype.getOrientedFlatCoordinates;
function wh(s, t, e = 0, i = s.length - 1, n = md) {
  for (; i > e; ) {
    if (i - e > 600) {
      const l = i - e + 1,
        c = t - e + 1,
        h = Math.log(l),
        u = 0.5 * Math.exp((2 * h) / 3),
        d = 0.5 * Math.sqrt((h * u * (l - u)) / l) * (c - l / 2 < 0 ? -1 : 1),
        f = Math.max(e, Math.floor(t - (c * u) / l + d)),
        g = Math.min(i, Math.floor(t + ((l - c) * u) / l + d));
      wh(s, t, f, g, n);
    }
    const r = s[t];
    let o = e,
      a = i;
    for (_n(s, e, t), n(s[i], r) > 0 && _n(s, e, i); o < a; ) {
      for (_n(s, o, a), o++, a--; n(s[o], r) < 0; ) o++;
      for (; n(s[a], r) > 0; ) a--;
    }
    n(s[e], r) === 0 ? _n(s, e, a) : (a++, _n(s, a, i)),
      a <= t && (e = a + 1),
      t <= a && (i = a - 1);
  }
}
function _n(s, t, e) {
  const i = s[t];
  (s[t] = s[e]), (s[e] = i);
}
function md(s, t) {
  return s < t ? -1 : s > t ? 1 : 0;
}
let Sh = class {
  constructor(t = 9) {
    (this._maxEntries = Math.max(4, t)),
      (this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4))),
      this.clear();
  }
  all() {
    return this._all(this.data, []);
  }
  search(t) {
    let e = this.data;
    const i = [];
    if (!ls(t, e)) return i;
    const n = this.toBBox,
      r = [];
    for (; e; ) {
      for (let o = 0; o < e.children.length; o++) {
        const a = e.children[o],
          l = e.leaf ? n(a) : a;
        ls(t, l) &&
          (e.leaf ? i.push(a) : Ir(t, l) ? this._all(a, i) : r.push(a));
      }
      e = r.pop();
    }
    return i;
  }
  collides(t) {
    let e = this.data;
    if (!ls(t, e)) return !1;
    const i = [];
    for (; e; ) {
      for (let n = 0; n < e.children.length; n++) {
        const r = e.children[n],
          o = e.leaf ? this.toBBox(r) : r;
        if (ls(t, o)) {
          if (e.leaf || Ir(t, o)) return !0;
          i.push(r);
        }
      }
      e = i.pop();
    }
    return !1;
  }
  load(t) {
    if (!(t && t.length)) return this;
    if (t.length < this._minEntries) {
      for (let i = 0; i < t.length; i++) this.insert(t[i]);
      return this;
    }
    let e = this._build(t.slice(), 0, t.length - 1, 0);
    if (!this.data.children.length) this.data = e;
    else if (this.data.height === e.height) this._splitRoot(this.data, e);
    else {
      if (this.data.height < e.height) {
        const i = this.data;
        (this.data = e), (e = i);
      }
      this._insert(e, this.data.height - e.height - 1, !0);
    }
    return this;
  }
  insert(t) {
    return t && this._insert(t, this.data.height - 1), this;
  }
  clear() {
    return (this.data = ki([])), this;
  }
  remove(t, e) {
    if (!t) return this;
    let i = this.data;
    const n = this.toBBox(t),
      r = [],
      o = [];
    let a, l, c;
    for (; i || r.length; ) {
      if (
        (i || ((i = r.pop()), (l = r[r.length - 1]), (a = o.pop()), (c = !0)),
        i.leaf)
      ) {
        const h = yd(t, i.children, e);
        if (h !== -1)
          return i.children.splice(h, 1), r.push(i), this._condense(r), this;
      }
      !c && !i.leaf && Ir(i, n)
        ? (r.push(i), o.push(a), (a = 0), (l = i), (i = i.children[0]))
        : l
          ? (a++, (i = l.children[a]), (c = !1))
          : (i = null);
    }
    return this;
  }
  toBBox(t) {
    return t;
  }
  compareMinX(t, e) {
    return t.minX - e.minX;
  }
  compareMinY(t, e) {
    return t.minY - e.minY;
  }
  toJSON() {
    return this.data;
  }
  fromJSON(t) {
    return (this.data = t), this;
  }
  _all(t, e) {
    const i = [];
    for (; t; )
      t.leaf ? e.push(...t.children) : i.push(...t.children), (t = i.pop());
    return e;
  }
  _build(t, e, i, n) {
    const r = i - e + 1;
    let o = this._maxEntries,
      a;
    if (r <= o) return (a = ki(t.slice(e, i + 1))), Li(a, this.toBBox), a;
    n ||
      ((n = Math.ceil(Math.log(r) / Math.log(o))),
      (o = Math.ceil(r / Math.pow(o, n - 1)))),
      (a = ki([])),
      (a.leaf = !1),
      (a.height = n);
    const l = Math.ceil(r / o),
      c = l * Math.ceil(Math.sqrt(o));
    Qa(t, e, i, c, this.compareMinX);
    for (let h = e; h <= i; h += c) {
      const u = Math.min(h + c - 1, i);
      Qa(t, h, u, l, this.compareMinY);
      for (let d = h; d <= u; d += l) {
        const f = Math.min(d + l - 1, u);
        a.children.push(this._build(t, d, f, n - 1));
      }
    }
    return Li(a, this.toBBox), a;
  }
  _chooseSubtree(t, e, i, n) {
    for (; n.push(e), !(e.leaf || n.length - 1 === i); ) {
      let r = 1 / 0,
        o = 1 / 0,
        a;
      for (let l = 0; l < e.children.length; l++) {
        const c = e.children[l],
          h = vr(c),
          u = Ed(t, c) - h;
        u < o
          ? ((o = u), (r = h < r ? h : r), (a = c))
          : u === o && h < r && ((r = h), (a = c));
      }
      e = a || e.children[0];
    }
    return e;
  }
  _insert(t, e, i) {
    const n = i ? t : this.toBBox(t),
      r = [],
      o = this._chooseSubtree(n, this.data, e, r);
    for (
      o.children.push(t), xn(o, n);
      e >= 0 && r[e].children.length > this._maxEntries;

    )
      this._split(r, e), e--;
    this._adjustParentBBoxes(n, r, e);
  }
  _split(t, e) {
    const i = t[e],
      n = i.children.length,
      r = this._minEntries;
    this._chooseSplitAxis(i, r, n);
    const o = this._chooseSplitIndex(i, r, n),
      a = ki(i.children.splice(o, i.children.length - o));
    (a.height = i.height),
      (a.leaf = i.leaf),
      Li(i, this.toBBox),
      Li(a, this.toBBox),
      e ? t[e - 1].children.push(a) : this._splitRoot(i, a);
  }
  _splitRoot(t, e) {
    (this.data = ki([t, e])),
      (this.data.height = t.height + 1),
      (this.data.leaf = !1),
      Li(this.data, this.toBBox);
  }
  _chooseSplitIndex(t, e, i) {
    let n,
      r = 1 / 0,
      o = 1 / 0;
    for (let a = e; a <= i - e; a++) {
      const l = pn(t, 0, a, this.toBBox),
        c = pn(t, a, i, this.toBBox),
        h = Cd(l, c),
        u = vr(l) + vr(c);
      h < r
        ? ((r = h), (n = a), (o = u < o ? u : o))
        : h === r && u < o && ((o = u), (n = a));
    }
    return n || i - e;
  }
  _chooseSplitAxis(t, e, i) {
    const n = t.leaf ? this.compareMinX : pd,
      r = t.leaf ? this.compareMinY : xd,
      o = this._allDistMargin(t, e, i, n),
      a = this._allDistMargin(t, e, i, r);
    o < a && t.children.sort(n);
  }
  _allDistMargin(t, e, i, n) {
    t.children.sort(n);
    const r = this.toBBox,
      o = pn(t, 0, e, r),
      a = pn(t, i - e, i, r);
    let l = as(o) + as(a);
    for (let c = e; c < i - e; c++) {
      const h = t.children[c];
      xn(o, t.leaf ? r(h) : h), (l += as(o));
    }
    for (let c = i - e - 1; c >= e; c--) {
      const h = t.children[c];
      xn(a, t.leaf ? r(h) : h), (l += as(a));
    }
    return l;
  }
  _adjustParentBBoxes(t, e, i) {
    for (let n = i; n >= 0; n--) xn(e[n], t);
  }
  _condense(t) {
    for (let e = t.length - 1, i; e >= 0; e--)
      t[e].children.length === 0
        ? e > 0
          ? ((i = t[e - 1].children), i.splice(i.indexOf(t[e]), 1))
          : this.clear()
        : Li(t[e], this.toBBox);
  }
};
function yd(s, t, e) {
  if (!e) return t.indexOf(s);
  for (let i = 0; i < t.length; i++) if (e(s, t[i])) return i;
  return -1;
}
function Li(s, t) {
  pn(s, 0, s.children.length, t, s);
}
function pn(s, t, e, i, n) {
  n || (n = ki(null)),
    (n.minX = 1 / 0),
    (n.minY = 1 / 0),
    (n.maxX = -1 / 0),
    (n.maxY = -1 / 0);
  for (let r = t; r < e; r++) {
    const o = s.children[r];
    xn(n, s.leaf ? i(o) : o);
  }
  return n;
}
function xn(s, t) {
  return (
    (s.minX = Math.min(s.minX, t.minX)),
    (s.minY = Math.min(s.minY, t.minY)),
    (s.maxX = Math.max(s.maxX, t.maxX)),
    (s.maxY = Math.max(s.maxY, t.maxY)),
    s
  );
}
function pd(s, t) {
  return s.minX - t.minX;
}
function xd(s, t) {
  return s.minY - t.minY;
}
function vr(s) {
  return (s.maxX - s.minX) * (s.maxY - s.minY);
}
function as(s) {
  return s.maxX - s.minX + (s.maxY - s.minY);
}
function Ed(s, t) {
  return (
    (Math.max(t.maxX, s.maxX) - Math.min(t.minX, s.minX)) *
    (Math.max(t.maxY, s.maxY) - Math.min(t.minY, s.minY))
  );
}
function Cd(s, t) {
  const e = Math.max(s.minX, t.minX),
    i = Math.max(s.minY, t.minY),
    n = Math.min(s.maxX, t.maxX),
    r = Math.min(s.maxY, t.maxY);
  return Math.max(0, n - e) * Math.max(0, r - i);
}
function Ir(s, t) {
  return (
    s.minX <= t.minX && s.minY <= t.minY && t.maxX <= s.maxX && t.maxY <= s.maxY
  );
}
function ls(s, t) {
  return (
    t.minX <= s.maxX && t.minY <= s.maxY && t.maxX >= s.minX && t.maxY >= s.minY
  );
}
function ki(s) {
  return {
    children: s,
    height: 1,
    leaf: !0,
    minX: 1 / 0,
    minY: 1 / 0,
    maxX: -1 / 0,
    maxY: -1 / 0,
  };
}
function Qa(s, t, e, i, n) {
  const r = [t, e];
  for (; r.length; ) {
    if (((e = r.pop()), (t = r.pop()), e - t <= i)) continue;
    const o = t + Math.ceil((e - t) / i / 2) * i;
    wh(s, o, t, e, n), r.push(t, o, o, e);
  }
}
class bs {
  constructor(t) {
    (this.rbush_ = new Sh(t)), (this.items_ = {});
  }
  insert(t, e) {
    const i = { minX: t[0], minY: t[1], maxX: t[2], maxY: t[3], value: e };
    this.rbush_.insert(i), (this.items_[V(e)] = i);
  }
  load(t, e) {
    const i = new Array(e.length);
    for (let n = 0, r = e.length; n < r; n++) {
      const o = t[n],
        a = e[n],
        l = { minX: o[0], minY: o[1], maxX: o[2], maxY: o[3], value: a };
      (i[n] = l), (this.items_[V(a)] = l);
    }
    this.rbush_.load(i);
  }
  remove(t) {
    const e = V(t),
      i = this.items_[e];
    return delete this.items_[e], this.rbush_.remove(i) !== null;
  }
  update(t, e) {
    const i = this.items_[V(e)],
      n = [i.minX, i.minY, i.maxX, i.maxY];
    Pn(n, t) || (this.remove(e), this.insert(t, e));
  }
  getAll() {
    return this.rbush_.all().map(function (e) {
      return e.value;
    });
  }
  getInExtent(t) {
    const e = { minX: t[0], minY: t[1], maxX: t[2], maxY: t[3] };
    return this.rbush_.search(e).map(function (n) {
      return n.value;
    });
  }
  forEach(t) {
    return this.forEach_(this.getAll(), t);
  }
  forEachInExtent(t, e) {
    return this.forEach_(this.getInExtent(t), e);
  }
  forEach_(t, e) {
    let i;
    for (let n = 0, r = t.length; n < r; n++) if (((i = e(t[n])), i)) return i;
    return i;
  }
  isEmpty() {
    return mi(this.items_);
  }
  clear() {
    this.rbush_.clear(), (this.items_ = {});
  }
  getExtent(t) {
    const e = this.rbush_.toJSON();
    return Oe(e.minX, e.minY, e.maxX, e.maxY, t);
  }
  concat(t) {
    this.rbush_.load(t.rbush_.all());
    for (const e in t.items_) this.items_[e] = t.items_[e];
  }
}
class Th extends me {
  constructor(t) {
    super(),
      (this.projection = gt(t.projection)),
      (this.attributions_ = tl(t.attributions)),
      (this.attributionsCollapsible_ = t.attributionsCollapsible ?? !0),
      (this.loading = !1),
      (this.state_ = t.state !== void 0 ? t.state : "ready"),
      (this.wrapX_ = t.wrapX !== void 0 ? t.wrapX : !1),
      (this.interpolate_ = !!t.interpolate),
      (this.viewResolver = null),
      (this.viewRejector = null);
    const e = this;
    this.viewPromise_ = new Promise(function (i, n) {
      (e.viewResolver = i), (e.viewRejector = n);
    });
  }
  getAttributions() {
    return this.attributions_;
  }
  getAttributionsCollapsible() {
    return this.attributionsCollapsible_;
  }
  getProjection() {
    return this.projection;
  }
  getResolutions(t) {
    return null;
  }
  getView() {
    return this.viewPromise_;
  }
  getState() {
    return this.state_;
  }
  getWrapX() {
    return this.wrapX_;
  }
  getInterpolate() {
    return this.interpolate_;
  }
  refresh() {
    this.changed();
  }
  setAttributions(t) {
    (this.attributions_ = tl(t)), this.changed();
  }
  setState(t) {
    (this.state_ = t), this.changed();
  }
}
function tl(s) {
  return s
    ? typeof s == "function"
      ? s
      : (Array.isArray(s) || (s = [s]), (t) => s)
    : null;
}
const Rt = {
  ADDFEATURE: "addfeature",
  CHANGEFEATURE: "changefeature",
  CLEAR: "clear",
  REMOVEFEATURE: "removefeature",
  FEATURESLOADSTART: "featuresloadstart",
  FEATURESLOADEND: "featuresloadend",
  FEATURESLOADERROR: "featuresloaderror",
};
class We extends Kt {
  constructor(t, e, i) {
    super(t), (this.feature = e), (this.features = i);
  }
}
class on extends Th {
  constructor(t) {
    (t = t || {}),
      super({
        attributions: t.attributions,
        interpolate: !0,
        projection: void 0,
        state: "ready",
        wrapX: t.wrapX !== void 0 ? t.wrapX : !0,
      }),
      this.on,
      this.once,
      this.un,
      (this.loader_ = Mn),
      (this.format_ = t.format || null),
      (this.overlaps_ = t.overlaps === void 0 ? !0 : t.overlaps),
      (this.url_ = t.url),
      t.loader !== void 0
        ? (this.loader_ = t.loader)
        : this.url_ !== void 0 &&
          (st(this.format_, "`format` must be set when `url` is set"),
          (this.loader_ = $a(this.url_, this.format_))),
      (this.strategy_ = t.strategy !== void 0 ? t.strategy : _d);
    const e = t.useSpatialIndex !== void 0 ? t.useSpatialIndex : !0;
    (this.featuresRtree_ = e ? new bs() : null),
      (this.loadedExtentsRtree_ = new bs()),
      (this.loadingExtentsCount_ = 0),
      (this.nullGeometryFeatures_ = {}),
      (this.idIndex_ = {}),
      (this.uidIndex_ = {}),
      (this.featureChangeKeys_ = {}),
      (this.featuresCollection_ = null);
    let i, n;
    Array.isArray(t.features)
      ? (n = t.features)
      : t.features && ((i = t.features), (n = i.getArray())),
      !e && i === void 0 && (i = new Xt(n)),
      n !== void 0 && this.addFeaturesInternal(n),
      i !== void 0 && this.bindFeaturesCollection_(i);
  }
  addFeature(t) {
    this.addFeatureInternal(t), this.changed();
  }
  addFeatureInternal(t) {
    const e = V(t);
    if (!this.addToIndex_(e, t)) {
      this.featuresCollection_ && this.featuresCollection_.remove(t);
      return;
    }
    this.setupChangeEvents_(e, t);
    const i = t.getGeometry();
    if (i) {
      const n = i.getExtent();
      this.featuresRtree_ && this.featuresRtree_.insert(n, t);
    } else this.nullGeometryFeatures_[e] = t;
    this.dispatchEvent(new We(Rt.ADDFEATURE, t));
  }
  setupChangeEvents_(t, e) {
    e instanceof Yt ||
      (this.featureChangeKeys_[t] = [
        $(e, j.CHANGE, this.handleFeatureChange_, this),
        $(e, Hi.PROPERTYCHANGE, this.handleFeatureChange_, this),
      ]);
  }
  addToIndex_(t, e) {
    let i = !0;
    if (e.getId() !== void 0) {
      const n = String(e.getId());
      if (!(n in this.idIndex_)) this.idIndex_[n] = e;
      else if (e instanceof Yt) {
        const r = this.idIndex_[n];
        r instanceof Yt
          ? Array.isArray(r)
            ? r.push(e)
            : (this.idIndex_[n] = [r, e])
          : (i = !1);
      } else i = !1;
    }
    return (
      i &&
        (st(
          !(t in this.uidIndex_),
          "The passed `feature` was already added to the source",
        ),
        (this.uidIndex_[t] = e)),
      i
    );
  }
  addFeatures(t) {
    this.addFeaturesInternal(t), this.changed();
  }
  addFeaturesInternal(t) {
    const e = [],
      i = [],
      n = [];
    for (let r = 0, o = t.length; r < o; r++) {
      const a = t[r],
        l = V(a);
      this.addToIndex_(l, a) && i.push(a);
    }
    for (let r = 0, o = i.length; r < o; r++) {
      const a = i[r],
        l = V(a);
      this.setupChangeEvents_(l, a);
      const c = a.getGeometry();
      if (c) {
        const h = c.getExtent();
        e.push(h), n.push(a);
      } else this.nullGeometryFeatures_[l] = a;
    }
    if (
      (this.featuresRtree_ && this.featuresRtree_.load(e, n),
      this.hasListener(Rt.ADDFEATURE))
    )
      for (let r = 0, o = i.length; r < o; r++)
        this.dispatchEvent(new We(Rt.ADDFEATURE, i[r]));
  }
  bindFeaturesCollection_(t) {
    let e = !1;
    this.addEventListener(Rt.ADDFEATURE, function (i) {
      e || ((e = !0), t.push(i.feature), (e = !1));
    }),
      this.addEventListener(Rt.REMOVEFEATURE, function (i) {
        e || ((e = !0), t.remove(i.feature), (e = !1));
      }),
      t.addEventListener(ft.ADD, (i) => {
        e || ((e = !0), this.addFeature(i.element), (e = !1));
      }),
      t.addEventListener(ft.REMOVE, (i) => {
        e || ((e = !0), this.removeFeature(i.element), (e = !1));
      }),
      (this.featuresCollection_ = t);
  }
  clear(t) {
    if (t) {
      for (const i in this.featureChangeKeys_)
        this.featureChangeKeys_[i].forEach(lt);
      this.featuresCollection_ ||
        ((this.featureChangeKeys_ = {}),
        (this.idIndex_ = {}),
        (this.uidIndex_ = {}));
    } else if (this.featuresRtree_) {
      this.featuresRtree_.forEach((i) => {
        this.removeFeatureInternal(i);
      });
      for (const i in this.nullGeometryFeatures_)
        this.removeFeatureInternal(this.nullGeometryFeatures_[i]);
    }
    this.featuresCollection_ && this.featuresCollection_.clear(),
      this.featuresRtree_ && this.featuresRtree_.clear(),
      (this.nullGeometryFeatures_ = {});
    const e = new We(Rt.CLEAR);
    this.dispatchEvent(e), this.changed();
  }
  forEachFeature(t) {
    if (this.featuresRtree_) return this.featuresRtree_.forEach(t);
    this.featuresCollection_ && this.featuresCollection_.forEach(t);
  }
  forEachFeatureAtCoordinateDirect(t, e) {
    const i = [t[0], t[1], t[0], t[1]];
    return this.forEachFeatureInExtent(i, function (n) {
      const r = n.getGeometry();
      if (r instanceof Yt || r.intersectsCoordinate(t)) return e(n);
    });
  }
  forEachFeatureInExtent(t, e) {
    if (this.featuresRtree_) return this.featuresRtree_.forEachInExtent(t, e);
    this.featuresCollection_ && this.featuresCollection_.forEach(e);
  }
  forEachFeatureIntersectingExtent(t, e) {
    return this.forEachFeatureInExtent(t, function (i) {
      const n = i.getGeometry();
      if (n instanceof Yt || n.intersectsExtent(t)) {
        const r = e(i);
        if (r) return r;
      }
    });
  }
  getFeaturesCollection() {
    return this.featuresCollection_;
  }
  getFeatures() {
    let t;
    return (
      this.featuresCollection_
        ? (t = this.featuresCollection_.getArray().slice(0))
        : this.featuresRtree_ &&
          ((t = this.featuresRtree_.getAll()),
          mi(this.nullGeometryFeatures_) ||
            Qt(t, Object.values(this.nullGeometryFeatures_))),
      t
    );
  }
  getFeaturesAtCoordinate(t) {
    const e = [];
    return (
      this.forEachFeatureAtCoordinateDirect(t, function (i) {
        e.push(i);
      }),
      e
    );
  }
  getFeaturesInExtent(t, e) {
    if (this.featuresRtree_) {
      if (!(e && e.canWrapX() && this.getWrapX()))
        return this.featuresRtree_.getInExtent(t);
      const n = Xl(t, e);
      return [].concat(...n.map((r) => this.featuresRtree_.getInExtent(r)));
    }
    return this.featuresCollection_
      ? this.featuresCollection_.getArray().slice(0)
      : [];
  }
  getClosestFeatureToCoordinate(t, e) {
    const i = t[0],
      n = t[1];
    let r = null;
    const o = [NaN, NaN];
    let a = 1 / 0;
    const l = [-1 / 0, -1 / 0, 1 / 0, 1 / 0];
    return (
      (e = e || De),
      this.featuresRtree_.forEachInExtent(l, function (c) {
        if (e(c)) {
          const h = c.getGeometry(),
            u = a;
          if (
            ((a = h instanceof Yt ? 0 : h.closestPointXY(i, n, o, a)), a < u)
          ) {
            r = c;
            const d = Math.sqrt(a);
            (l[0] = i - d), (l[1] = n - d), (l[2] = i + d), (l[3] = n + d);
          }
        }
      }),
      r
    );
  }
  getExtent(t) {
    return this.featuresRtree_.getExtent(t);
  }
  getFeatureById(t) {
    const e = this.idIndex_[t.toString()];
    return e !== void 0 ? e : null;
  }
  getFeatureByUid(t) {
    const e = this.uidIndex_[t];
    return e !== void 0 ? e : null;
  }
  getFormat() {
    return this.format_;
  }
  getOverlaps() {
    return this.overlaps_;
  }
  getUrl() {
    return this.url_;
  }
  handleFeatureChange_(t) {
    const e = t.target,
      i = V(e),
      n = e.getGeometry();
    if (!n)
      i in this.nullGeometryFeatures_ ||
        (this.featuresRtree_ && this.featuresRtree_.remove(e),
        (this.nullGeometryFeatures_[i] = e));
    else {
      const o = n.getExtent();
      i in this.nullGeometryFeatures_
        ? (delete this.nullGeometryFeatures_[i],
          this.featuresRtree_ && this.featuresRtree_.insert(o, e))
        : this.featuresRtree_ && this.featuresRtree_.update(o, e);
    }
    const r = e.getId();
    if (r !== void 0) {
      const o = r.toString();
      this.idIndex_[o] !== e &&
        (this.removeFromIdIndex_(e), (this.idIndex_[o] = e));
    } else this.removeFromIdIndex_(e), (this.uidIndex_[i] = e);
    this.changed(), this.dispatchEvent(new We(Rt.CHANGEFEATURE, e));
  }
  hasFeature(t) {
    const e = t.getId();
    return e !== void 0 ? e in this.idIndex_ : V(t) in this.uidIndex_;
  }
  isEmpty() {
    return this.featuresRtree_
      ? this.featuresRtree_.isEmpty() && mi(this.nullGeometryFeatures_)
      : this.featuresCollection_
        ? this.featuresCollection_.getLength() === 0
        : !0;
  }
  loadFeatures(t, e, i) {
    const n = this.loadedExtentsRtree_,
      r = this.strategy_(t, e, i);
    for (let o = 0, a = r.length; o < a; ++o) {
      const l = r[o];
      n.forEachInExtent(l, function (h) {
        return yn(h.extent, l);
      }) ||
        (++this.loadingExtentsCount_,
        this.dispatchEvent(new We(Rt.FEATURESLOADSTART)),
        this.loader_.call(
          this,
          l,
          e,
          i,
          (h) => {
            --this.loadingExtentsCount_,
              this.dispatchEvent(new We(Rt.FEATURESLOADEND, void 0, h));
          },
          () => {
            --this.loadingExtentsCount_,
              this.dispatchEvent(new We(Rt.FEATURESLOADERROR));
          },
        ),
        n.insert(l, { extent: l.slice() }));
    }
    this.loading = this.loader_.length < 4 ? !1 : this.loadingExtentsCount_ > 0;
  }
  refresh() {
    this.clear(!0), this.loadedExtentsRtree_.clear(), super.refresh();
  }
  removeLoadedExtent(t) {
    const e = this.loadedExtentsRtree_,
      i = e.forEachInExtent(t, function (n) {
        if (Pn(n.extent, t)) return n;
      });
    i && e.remove(i);
  }
  removeFeatures(t) {
    let e = !1;
    for (let i = 0, n = t.length; i < n; ++i)
      e = this.removeFeatureInternal(t[i]) || e;
    e && this.changed();
  }
  removeFeature(t) {
    if (!t) return;
    this.removeFeatureInternal(t) && this.changed();
  }
  removeFeatureInternal(t) {
    const e = V(t);
    if (!(e in this.uidIndex_)) return !1;
    e in this.nullGeometryFeatures_
      ? delete this.nullGeometryFeatures_[e]
      : this.featuresRtree_ && this.featuresRtree_.remove(t);
    const i = this.featureChangeKeys_[e];
    i == null || i.forEach(lt), delete this.featureChangeKeys_[e];
    const n = t.getId();
    if (n !== void 0) {
      const r = n.toString(),
        o = this.idIndex_[r];
      o === t
        ? delete this.idIndex_[r]
        : Array.isArray(o) &&
          (o.splice(o.indexOf(t), 1),
          o.length === 1 && (this.idIndex_[r] = o[0]));
    }
    return (
      delete this.uidIndex_[e],
      this.hasListener(Rt.REMOVEFEATURE) &&
        this.dispatchEvent(new We(Rt.REMOVEFEATURE, t)),
      !0
    );
  }
  removeFromIdIndex_(t) {
    for (const e in this.idIndex_)
      if (this.idIndex_[e] === t) {
        delete this.idIndex_[e];
        break;
      }
  }
  setLoader(t) {
    this.loader_ = t;
  }
  setUrl(t) {
    st(this.format_, "`format` must be set when `url` is set"),
      (this.url_ = t),
      this.setLoader($a(t, this.format_));
  }
  setOverlaps(t) {
    (this.overlaps_ = t), this.changed();
  }
}
class le {
  constructor(t) {
    (t = t || {}),
      (this.patternImage_ = null),
      (this.color_ = null),
      t.color !== void 0 && this.setColor(t.color);
  }
  clone() {
    const t = this.getColor();
    return new le({ color: Array.isArray(t) ? t.slice() : t || void 0 });
  }
  getColor() {
    return this.color_;
  }
  setColor(t) {
    if (t !== null && typeof t == "object" && "src" in t) {
      const e = Uo(
        null,
        t.src,
        "anonymous",
        void 0,
        t.offset ? null : t.color ? t.color : null,
        !(t.offset && t.size),
      );
      e.ready().then(() => {
        this.patternImage_ = null;
      }),
        e.getImageState() === q.IDLE && e.load(),
        e.getImageState() === q.LOADING && (this.patternImage_ = e);
    }
    this.color_ = t;
  }
  getKey() {
    const t = this.getColor();
    return t
      ? t instanceof CanvasPattern || t instanceof CanvasGradient
        ? V(t)
        : typeof t == "object" && "src" in t
          ? t.src + ":" + t.offset
          : Ji(t).toString()
      : "";
  }
  loading() {
    return !!this.patternImage_;
  }
  ready() {
    return this.patternImage_ ? this.patternImage_.ready() : Promise.resolve();
  }
}
class Lt {
  constructor(t) {
    (t = t || {}),
      (this.color_ = t.color !== void 0 ? t.color : null),
      (this.lineCap_ = t.lineCap),
      (this.lineDash_ = t.lineDash !== void 0 ? t.lineDash : null),
      (this.lineDashOffset_ = t.lineDashOffset),
      (this.lineJoin_ = t.lineJoin),
      (this.miterLimit_ = t.miterLimit),
      (this.width_ = t.width);
  }
  clone() {
    const t = this.getColor();
    return new Lt({
      color: Array.isArray(t) ? t.slice() : t || void 0,
      lineCap: this.getLineCap(),
      lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0,
      lineDashOffset: this.getLineDashOffset(),
      lineJoin: this.getLineJoin(),
      miterLimit: this.getMiterLimit(),
      width: this.getWidth(),
    });
  }
  getColor() {
    return this.color_;
  }
  getLineCap() {
    return this.lineCap_;
  }
  getLineDash() {
    return this.lineDash_;
  }
  getLineDashOffset() {
    return this.lineDashOffset_;
  }
  getLineJoin() {
    return this.lineJoin_;
  }
  getMiterLimit() {
    return this.miterLimit_;
  }
  getWidth() {
    return this.width_;
  }
  setColor(t) {
    this.color_ = t;
  }
  setLineCap(t) {
    this.lineCap_ = t;
  }
  setLineDash(t) {
    this.lineDash_ = t;
  }
  setLineDashOffset(t) {
    this.lineDashOffset_ = t;
  }
  setLineJoin(t) {
    this.lineJoin_ = t;
  }
  setMiterLimit(t) {
    this.miterLimit_ = t;
  }
  setWidth(t) {
    this.width_ = t;
  }
}
function el(s) {
  return s[0] > 0 && s[1] > 0;
}
function wd(s, t, e) {
  return (
    e === void 0 && (e = [0, 0]),
    (e[0] = (s[0] * t + 0.5) | 0),
    (e[1] = (s[1] * t + 0.5) | 0),
    e
  );
}
function Wt(s, t) {
  return Array.isArray(s)
    ? s
    : (t === void 0 ? (t = [s, s]) : ((t[0] = s), (t[1] = s)), t);
}
class ir {
  constructor(t) {
    (this.opacity_ = t.opacity),
      (this.rotateWithView_ = t.rotateWithView),
      (this.rotation_ = t.rotation),
      (this.scale_ = t.scale),
      (this.scaleArray_ = Wt(t.scale)),
      (this.displacement_ = t.displacement),
      (this.declutterMode_ = t.declutterMode);
  }
  clone() {
    const t = this.getScale();
    return new ir({
      opacity: this.getOpacity(),
      scale: Array.isArray(t) ? t.slice() : t,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode(),
    });
  }
  getOpacity() {
    return this.opacity_;
  }
  getRotateWithView() {
    return this.rotateWithView_;
  }
  getRotation() {
    return this.rotation_;
  }
  getScale() {
    return this.scale_;
  }
  getScaleArray() {
    return this.scaleArray_;
  }
  getDisplacement() {
    return this.displacement_;
  }
  getDeclutterMode() {
    return this.declutterMode_;
  }
  getAnchor() {
    return Y();
  }
  getImage(t) {
    return Y();
  }
  getHitDetectionImage() {
    return Y();
  }
  getPixelRatio(t) {
    return 1;
  }
  getImageState() {
    return Y();
  }
  getImageSize() {
    return Y();
  }
  getOrigin() {
    return Y();
  }
  getSize() {
    return Y();
  }
  setDisplacement(t) {
    this.displacement_ = t;
  }
  setOpacity(t) {
    this.opacity_ = t;
  }
  setRotateWithView(t) {
    this.rotateWithView_ = t;
  }
  setRotation(t) {
    this.rotation_ = t;
  }
  setScale(t) {
    (this.scale_ = t), (this.scaleArray_ = Wt(t));
  }
  listenImageChange(t) {
    Y();
  }
  load() {
    Y();
  }
  unlistenImageChange(t) {
    Y();
  }
  ready() {
    return Promise.resolve();
  }
}
class nr extends ir {
  constructor(t) {
    super({
      opacity: 1,
      rotateWithView: t.rotateWithView !== void 0 ? t.rotateWithView : !1,
      rotation: t.rotation !== void 0 ? t.rotation : 0,
      scale: t.scale !== void 0 ? t.scale : 1,
      displacement: t.displacement !== void 0 ? t.displacement : [0, 0],
      declutterMode: t.declutterMode,
    }),
      (this.hitDetectionCanvas_ = null),
      (this.fill_ = t.fill !== void 0 ? t.fill : null),
      (this.origin_ = [0, 0]),
      (this.points_ = t.points),
      (this.radius = t.radius),
      (this.radius2_ = t.radius2),
      (this.angle_ = t.angle !== void 0 ? t.angle : 0),
      (this.stroke_ = t.stroke !== void 0 ? t.stroke : null),
      this.size_,
      this.renderOptions_,
      (this.imageState_ =
        this.fill_ && this.fill_.loading() ? q.LOADING : q.LOADED),
      this.imageState_ === q.LOADING &&
        this.ready().then(() => (this.imageState_ = q.LOADED)),
      this.render();
  }
  clone() {
    const t = this.getScale(),
      e = new nr({
        fill: this.getFill() ? this.getFill().clone() : void 0,
        points: this.getPoints(),
        radius: this.getRadius(),
        radius2: this.getRadius2(),
        angle: this.getAngle(),
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        rotation: this.getRotation(),
        rotateWithView: this.getRotateWithView(),
        scale: Array.isArray(t) ? t.slice() : t,
        displacement: this.getDisplacement().slice(),
        declutterMode: this.getDeclutterMode(),
      });
    return e.setOpacity(this.getOpacity()), e;
  }
  getAnchor() {
    const t = this.size_,
      e = this.getDisplacement(),
      i = this.getScaleArray();
    return [t[0] / 2 - e[0] / i[0], t[1] / 2 + e[1] / i[1]];
  }
  getAngle() {
    return this.angle_;
  }
  getFill() {
    return this.fill_;
  }
  setFill(t) {
    (this.fill_ = t), this.render();
  }
  getHitDetectionImage() {
    return (
      this.hitDetectionCanvas_ ||
        (this.hitDetectionCanvas_ = this.createHitDetectionCanvas_(
          this.renderOptions_,
        )),
      this.hitDetectionCanvas_
    );
  }
  getImage(t) {
    var r, o;
    const e = (r = this.fill_) == null ? void 0 : r.getKey(),
      i =
        `${t},${this.angle_},${this.radius},${this.radius2_},${this.points_},${e}` +
        Object.values(this.renderOptions_).join(",");
    let n = (o = Jt.get(i, null, null)) == null ? void 0 : o.getImage(1);
    if (!n) {
      const a = this.renderOptions_,
        l = Math.ceil(a.size * t),
        c = xt(l, l);
      this.draw_(a, c, t),
        (n = c.canvas),
        Jt.set(i, null, null, new fh(n, void 0, null, q.LOADED, null));
    }
    return n;
  }
  getPixelRatio(t) {
    return t;
  }
  getImageSize() {
    return this.size_;
  }
  getImageState() {
    return this.imageState_;
  }
  getOrigin() {
    return this.origin_;
  }
  getPoints() {
    return this.points_;
  }
  getRadius() {
    return this.radius;
  }
  getRadius2() {
    return this.radius2_;
  }
  getSize() {
    return this.size_;
  }
  getStroke() {
    return this.stroke_;
  }
  setStroke(t) {
    (this.stroke_ = t), this.render();
  }
  listenImageChange(t) {}
  load() {}
  unlistenImageChange(t) {}
  calculateLineJoinSize_(t, e, i) {
    if (e === 0 || this.points_ === 1 / 0 || (t !== "bevel" && t !== "miter"))
      return e;
    let n = this.radius,
      r = this.radius2_ === void 0 ? n : this.radius2_;
    if (n < r) {
      const R = n;
      (n = r), (r = R);
    }
    const o = this.radius2_ === void 0 ? this.points_ : this.points_ * 2,
      a = (2 * Math.PI) / o,
      l = r * Math.sin(a),
      c = Math.sqrt(r * r - l * l),
      h = n - c,
      u = Math.sqrt(l * l + h * h),
      d = u / l;
    if (t === "miter" && d <= i) return d * e;
    const f = e / 2 / d,
      g = (e / 2) * (h / u),
      m = Math.sqrt((n + f) * (n + f) + g * g) - n;
    if (this.radius2_ === void 0 || t === "bevel") return m * 2;
    const y = n * Math.sin(a),
      p = Math.sqrt(n * n - y * y),
      C = r - p,
      E = Math.sqrt(y * y + C * C) / y;
    if (E <= i) {
      const R = (E * e) / 2 - r - n;
      return 2 * Math.max(m, R);
    }
    return m * 2;
  }
  createRenderOptions() {
    let t = Qi,
      e = tn,
      i = 0,
      n = null,
      r = 0,
      o,
      a = 0;
    this.stroke_ &&
      ((o = _e(this.stroke_.getColor() ?? kn)),
      (a = this.stroke_.getWidth() ?? Nn),
      (n = this.stroke_.getLineDash()),
      (r = this.stroke_.getLineDashOffset() ?? 0),
      (e = this.stroke_.getLineJoin() ?? tn),
      (t = this.stroke_.getLineCap() ?? Qi),
      (i = this.stroke_.getMiterLimit() ?? On));
    const l = this.calculateLineJoinSize_(e, a, i),
      c = Math.max(this.radius, this.radius2_ || 0),
      h = Math.ceil(2 * c + l);
    return {
      strokeStyle: o,
      strokeWidth: a,
      size: h,
      lineCap: t,
      lineDash: n,
      lineDashOffset: r,
      lineJoin: e,
      miterLimit: i,
    };
  }
  render() {
    this.renderOptions_ = this.createRenderOptions();
    const t = this.renderOptions_.size;
    (this.hitDetectionCanvas_ = null), (this.size_ = [t, t]);
  }
  draw_(t, e, i) {
    if (
      (e.scale(i, i),
      e.translate(t.size / 2, t.size / 2),
      this.createPath_(e),
      this.fill_)
    ) {
      let n = this.fill_.getColor();
      n === null && (n = Nt), (e.fillStyle = _e(n)), e.fill();
    }
    t.strokeStyle &&
      ((e.strokeStyle = t.strokeStyle),
      (e.lineWidth = t.strokeWidth),
      t.lineDash &&
        (e.setLineDash(t.lineDash), (e.lineDashOffset = t.lineDashOffset)),
      (e.lineCap = t.lineCap),
      (e.lineJoin = t.lineJoin),
      (e.miterLimit = t.miterLimit),
      e.stroke());
  }
  createHitDetectionCanvas_(t) {
    let e;
    if (this.fill_) {
      let i = this.fill_.getColor(),
        n = 0;
      typeof i == "string" && (i = Ji(i)),
        i === null
          ? (n = 1)
          : Array.isArray(i) && (n = i.length === 4 ? i[3] : 1),
        n === 0 &&
          ((e = xt(t.size, t.size)), this.drawHitDetectionCanvas_(t, e));
    }
    return e ? e.canvas : this.getImage(1);
  }
  createPath_(t) {
    let e = this.points_;
    const i = this.radius;
    if (e === 1 / 0) t.arc(0, 0, i, 0, 2 * Math.PI);
    else {
      const n = this.radius2_ === void 0 ? i : this.radius2_;
      this.radius2_ !== void 0 && (e *= 2);
      const r = this.angle_ - Math.PI / 2,
        o = (2 * Math.PI) / e;
      for (let a = 0; a < e; a++) {
        const l = r + a * o,
          c = a % 2 === 0 ? i : n;
        t.lineTo(c * Math.cos(l), c * Math.sin(l));
      }
      t.closePath();
    }
  }
  drawHitDetectionCanvas_(t, e) {
    e.translate(t.size / 2, t.size / 2),
      this.createPath_(e),
      (e.fillStyle = Nt),
      e.fill(),
      t.strokeStyle &&
        ((e.strokeStyle = t.strokeStyle),
        (e.lineWidth = t.strokeWidth),
        t.lineDash &&
          (e.setLineDash(t.lineDash), (e.lineDashOffset = t.lineDashOffset)),
        (e.lineJoin = t.lineJoin),
        (e.miterLimit = t.miterLimit),
        e.stroke());
  }
  ready() {
    return this.fill_ ? this.fill_.ready() : Promise.resolve();
  }
}
class ei extends nr {
  constructor(t) {
    (t = t || { radius: 5 }),
      super({
        points: 1 / 0,
        fill: t.fill,
        radius: t.radius,
        stroke: t.stroke,
        scale: t.scale !== void 0 ? t.scale : 1,
        rotation: t.rotation !== void 0 ? t.rotation : 0,
        rotateWithView: t.rotateWithView !== void 0 ? t.rotateWithView : !1,
        displacement: t.displacement !== void 0 ? t.displacement : [0, 0],
        declutterMode: t.declutterMode,
      });
  }
  clone() {
    const t = this.getScale(),
      e = new ei({
        fill: this.getFill() ? this.getFill().clone() : void 0,
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        radius: this.getRadius(),
        scale: Array.isArray(t) ? t.slice() : t,
        rotation: this.getRotation(),
        rotateWithView: this.getRotateWithView(),
        displacement: this.getDisplacement().slice(),
        declutterMode: this.getDeclutterMode(),
      });
    return e.setOpacity(this.getOpacity()), e;
  }
  setRadius(t) {
    (this.radius = t), this.render();
  }
}
class mt {
  constructor(t) {
    (t = t || {}),
      (this.geometry_ = null),
      (this.geometryFunction_ = il),
      t.geometry !== void 0 && this.setGeometry(t.geometry),
      (this.fill_ = t.fill !== void 0 ? t.fill : null),
      (this.image_ = t.image !== void 0 ? t.image : null),
      (this.renderer_ = t.renderer !== void 0 ? t.renderer : null),
      (this.hitDetectionRenderer_ =
        t.hitDetectionRenderer !== void 0 ? t.hitDetectionRenderer : null),
      (this.stroke_ = t.stroke !== void 0 ? t.stroke : null),
      (this.text_ = t.text !== void 0 ? t.text : null),
      (this.zIndex_ = t.zIndex);
  }
  clone() {
    let t = this.getGeometry();
    return (
      t && typeof t == "object" && (t = t.clone()),
      new mt({
        geometry: t ?? void 0,
        fill: this.getFill() ? this.getFill().clone() : void 0,
        image: this.getImage() ? this.getImage().clone() : void 0,
        renderer: this.getRenderer() ?? void 0,
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        text: this.getText() ? this.getText().clone() : void 0,
        zIndex: this.getZIndex(),
      })
    );
  }
  getRenderer() {
    return this.renderer_;
  }
  setRenderer(t) {
    this.renderer_ = t;
  }
  setHitDetectionRenderer(t) {
    this.hitDetectionRenderer_ = t;
  }
  getHitDetectionRenderer() {
    return this.hitDetectionRenderer_;
  }
  getGeometry() {
    return this.geometry_;
  }
  getGeometryFunction() {
    return this.geometryFunction_;
  }
  getFill() {
    return this.fill_;
  }
  setFill(t) {
    this.fill_ = t;
  }
  getImage() {
    return this.image_;
  }
  setImage(t) {
    this.image_ = t;
  }
  getStroke() {
    return this.stroke_;
  }
  setStroke(t) {
    this.stroke_ = t;
  }
  getText() {
    return this.text_;
  }
  setText(t) {
    this.text_ = t;
  }
  getZIndex() {
    return this.zIndex_;
  }
  setGeometry(t) {
    typeof t == "function"
      ? (this.geometryFunction_ = t)
      : typeof t == "string"
        ? (this.geometryFunction_ = function (e) {
            return e.get(t);
          })
        : t
          ? t !== void 0 &&
            (this.geometryFunction_ = function () {
              return t;
            })
          : (this.geometryFunction_ = il),
      (this.geometry_ = t);
  }
  setZIndex(t) {
    this.zIndex_ = t;
  }
}
function Sd(s) {
  let t;
  if (typeof s == "function") t = s;
  else {
    let e;
    Array.isArray(s)
      ? (e = s)
      : (st(
          typeof s.getZIndex == "function",
          "Expected an `Style` or an array of `Style`",
        ),
        (e = [s])),
      (t = function () {
        return e;
      });
  }
  return t;
}
let Lr = null;
function Rh(s, t) {
  if (!Lr) {
    const e = new le({ color: "rgba(255,255,255,0.4)" }),
      i = new Lt({ color: "#3399CC", width: 1.25 });
    Lr = [
      new mt({
        image: new ei({ fill: e, stroke: i, radius: 5 }),
        fill: e,
        stroke: i,
      }),
    ];
  }
  return Lr;
}
function Ho() {
  const s = {},
    t = [255, 255, 255, 1],
    e = [0, 153, 255, 1],
    i = 3;
  return (
    (s.Polygon = [new mt({ fill: new le({ color: [255, 255, 255, 0.5] }) })]),
    (s.MultiPolygon = s.Polygon),
    (s.LineString = [
      new mt({ stroke: new Lt({ color: t, width: i + 2 }) }),
      new mt({ stroke: new Lt({ color: e, width: i }) }),
    ]),
    (s.MultiLineString = s.LineString),
    (s.Circle = s.Polygon.concat(s.LineString)),
    (s.Point = [
      new mt({
        image: new ei({
          radius: i * 2,
          fill: new le({ color: e }),
          stroke: new Lt({ color: t, width: i / 2 }),
        }),
        zIndex: 1 / 0,
      }),
    ]),
    (s.MultiPoint = s.Point),
    (s.GeometryCollection = s.Polygon.concat(s.LineString, s.Point)),
    s
  );
}
function il(s) {
  return s.getGeometry();
}
const Td = "#333";
class sr {
  constructor(t) {
    (t = t || {}),
      (this.font_ = t.font),
      (this.rotation_ = t.rotation),
      (this.rotateWithView_ = t.rotateWithView),
      (this.keepUpright_ = t.keepUpright),
      (this.scale_ = t.scale),
      (this.scaleArray_ = Wt(t.scale !== void 0 ? t.scale : 1)),
      (this.text_ = t.text),
      (this.textAlign_ = t.textAlign),
      (this.justify_ = t.justify),
      (this.repeat_ = t.repeat),
      (this.textBaseline_ = t.textBaseline),
      (this.fill_ = t.fill !== void 0 ? t.fill : new le({ color: Td })),
      (this.maxAngle_ = t.maxAngle !== void 0 ? t.maxAngle : Math.PI / 4),
      (this.placement_ = t.placement !== void 0 ? t.placement : "point"),
      (this.overflow_ = !!t.overflow),
      (this.stroke_ = t.stroke !== void 0 ? t.stroke : null),
      (this.offsetX_ = t.offsetX !== void 0 ? t.offsetX : 0),
      (this.offsetY_ = t.offsetY !== void 0 ? t.offsetY : 0),
      (this.backgroundFill_ = t.backgroundFill ? t.backgroundFill : null),
      (this.backgroundStroke_ = t.backgroundStroke ? t.backgroundStroke : null),
      (this.padding_ = t.padding === void 0 ? null : t.padding),
      (this.declutterMode_ = t.declutterMode);
  }
  clone() {
    const t = this.getScale();
    return new sr({
      font: this.getFont(),
      placement: this.getPlacement(),
      repeat: this.getRepeat(),
      maxAngle: this.getMaxAngle(),
      overflow: this.getOverflow(),
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      keepUpright: this.getKeepUpright(),
      scale: Array.isArray(t) ? t.slice() : t,
      text: this.getText(),
      textAlign: this.getTextAlign(),
      justify: this.getJustify(),
      textBaseline: this.getTextBaseline(),
      fill: this.getFill() ? this.getFill().clone() : void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      offsetX: this.getOffsetX(),
      offsetY: this.getOffsetY(),
      backgroundFill: this.getBackgroundFill()
        ? this.getBackgroundFill().clone()
        : void 0,
      backgroundStroke: this.getBackgroundStroke()
        ? this.getBackgroundStroke().clone()
        : void 0,
      padding: this.getPadding() || void 0,
      declutterMode: this.getDeclutterMode(),
    });
  }
  getOverflow() {
    return this.overflow_;
  }
  getFont() {
    return this.font_;
  }
  getMaxAngle() {
    return this.maxAngle_;
  }
  getPlacement() {
    return this.placement_;
  }
  getRepeat() {
    return this.repeat_;
  }
  getOffsetX() {
    return this.offsetX_;
  }
  getOffsetY() {
    return this.offsetY_;
  }
  getFill() {
    return this.fill_;
  }
  getRotateWithView() {
    return this.rotateWithView_;
  }
  getKeepUpright() {
    return this.keepUpright_;
  }
  getRotation() {
    return this.rotation_;
  }
  getScale() {
    return this.scale_;
  }
  getScaleArray() {
    return this.scaleArray_;
  }
  getStroke() {
    return this.stroke_;
  }
  getText() {
    return this.text_;
  }
  getTextAlign() {
    return this.textAlign_;
  }
  getJustify() {
    return this.justify_;
  }
  getTextBaseline() {
    return this.textBaseline_;
  }
  getBackgroundFill() {
    return this.backgroundFill_;
  }
  getBackgroundStroke() {
    return this.backgroundStroke_;
  }
  getPadding() {
    return this.padding_;
  }
  getDeclutterMode() {
    return this.declutterMode_;
  }
  setOverflow(t) {
    this.overflow_ = t;
  }
  setFont(t) {
    this.font_ = t;
  }
  setMaxAngle(t) {
    this.maxAngle_ = t;
  }
  setOffsetX(t) {
    this.offsetX_ = t;
  }
  setOffsetY(t) {
    this.offsetY_ = t;
  }
  setPlacement(t) {
    this.placement_ = t;
  }
  setRepeat(t) {
    this.repeat_ = t;
  }
  setRotateWithView(t) {
    this.rotateWithView_ = t;
  }
  setKeepUpright(t) {
    this.keepUpright_ = t;
  }
  setFill(t) {
    this.fill_ = t;
  }
  setRotation(t) {
    this.rotation_ = t;
  }
  setScale(t) {
    (this.scale_ = t), (this.scaleArray_ = Wt(t !== void 0 ? t : 1));
  }
  setStroke(t) {
    this.stroke_ = t;
  }
  setText(t) {
    this.text_ = t;
  }
  setTextAlign(t) {
    this.textAlign_ = t;
  }
  setJustify(t) {
    this.justify_ = t;
  }
  setTextBaseline(t) {
    this.textBaseline_ = t;
  }
  setBackgroundFill(t) {
    this.backgroundFill_ = t;
  }
  setBackgroundStroke(t) {
    this.backgroundStroke_ = t;
  }
  setPadding(t) {
    this.padding_ = t;
  }
}
const vt = { ANIMATING: 0, INTERACTING: 1 },
  G = {
    BEGIN_GEOMETRY: 0,
    BEGIN_PATH: 1,
    CIRCLE: 2,
    CLOSE_PATH: 3,
    CUSTOM: 4,
    DRAW_CHARS: 5,
    DRAW_IMAGE: 6,
    END_GEOMETRY: 7,
    FILL: 8,
    MOVE_TO_LINE_TO: 9,
    SET_FILL_STYLE: 10,
    SET_STROKE_STYLE: 11,
    STROKE: 12,
  },
  hs = [G.FILL],
  qe = [G.STROKE],
  fi = [G.BEGIN_PATH],
  nl = [G.CLOSE_PATH];
class qn extends gh {
  constructor(t, e, i, n) {
    super(),
      (this.tolerance = t),
      (this.maxExtent = e),
      (this.pixelRatio = n),
      (this.maxLineWidth = 0),
      (this.resolution = i),
      (this.beginGeometryInstruction1_ = null),
      (this.beginGeometryInstruction2_ = null),
      (this.bufferedMaxExtent_ = null),
      (this.instructions = []),
      (this.coordinates = []),
      (this.tmpCoordinate_ = []),
      (this.hitDetectionInstructions = []),
      (this.state = {});
  }
  applyPixelRatio(t) {
    const e = this.pixelRatio;
    return e == 1
      ? t
      : t.map(function (i) {
          return i * e;
        });
  }
  appendFlatPointCoordinates(t, e) {
    const i = this.getBufferedMaxExtent(),
      n = this.tmpCoordinate_,
      r = this.coordinates;
    let o = r.length;
    for (let a = 0, l = t.length; a < l; a += e)
      (n[0] = t[a]),
        (n[1] = t[a + 1]),
        qi(i, n) && ((r[o++] = n[0]), (r[o++] = n[1]));
    return o;
  }
  appendFlatLineCoordinates(t, e, i, n, r, o) {
    const a = this.coordinates;
    let l = a.length;
    const c = this.getBufferedMaxExtent();
    o && (e += n);
    let h = t[e],
      u = t[e + 1];
    const d = this.tmpCoordinate_;
    let f = !0,
      g,
      _,
      m;
    for (g = e + n; g < i; g += n)
      (d[0] = t[g]),
        (d[1] = t[g + 1]),
        (m = Zr(c, d)),
        m !== _
          ? (f && ((a[l++] = h), (a[l++] = u), (f = !1)),
            (a[l++] = d[0]),
            (a[l++] = d[1]))
          : m === Ct.INTERSECTING
            ? ((a[l++] = d[0]), (a[l++] = d[1]), (f = !1))
            : (f = !0),
        (h = d[0]),
        (u = d[1]),
        (_ = m);
    return ((r && f) || g === e + n) && ((a[l++] = h), (a[l++] = u)), l;
  }
  drawCustomCoordinates_(t, e, i, n, r) {
    for (let o = 0, a = i.length; o < a; ++o) {
      const l = i[o],
        c = this.appendFlatLineCoordinates(t, e, l, n, !1, !1);
      r.push(c), (e = l);
    }
    return e;
  }
  drawCustom(t, e, i, n, r) {
    this.beginGeometry(t, e, r);
    const o = t.getType(),
      a = t.getStride(),
      l = this.coordinates.length;
    let c, h, u, d, f;
    switch (o) {
      case "MultiPolygon":
        (c = t.getOrientedFlatCoordinates()), (d = []);
        const g = t.getEndss();
        f = 0;
        for (let _ = 0, m = g.length; _ < m; ++_) {
          const y = [];
          (f = this.drawCustomCoordinates_(c, f, g[_], a, y)), d.push(y);
        }
        this.instructions.push([G.CUSTOM, l, d, t, i, eo, r]),
          this.hitDetectionInstructions.push([
            G.CUSTOM,
            l,
            d,
            t,
            n || i,
            eo,
            r,
          ]);
        break;
      case "Polygon":
      case "MultiLineString":
        (u = []),
          (c =
            o == "Polygon"
              ? t.getOrientedFlatCoordinates()
              : t.getFlatCoordinates()),
          (f = this.drawCustomCoordinates_(c, 0, t.getEnds(), a, u)),
          this.instructions.push([G.CUSTOM, l, u, t, i, An, r]),
          this.hitDetectionInstructions.push([
            G.CUSTOM,
            l,
            u,
            t,
            n || i,
            An,
            r,
          ]);
        break;
      case "LineString":
      case "Circle":
        (c = t.getFlatCoordinates()),
          (h = this.appendFlatLineCoordinates(c, 0, c.length, a, !1, !1)),
          this.instructions.push([G.CUSTOM, l, h, t, i, He, r]),
          this.hitDetectionInstructions.push([
            G.CUSTOM,
            l,
            h,
            t,
            n || i,
            He,
            r,
          ]);
        break;
      case "MultiPoint":
        (c = t.getFlatCoordinates()),
          (h = this.appendFlatPointCoordinates(c, a)),
          h > l &&
            (this.instructions.push([G.CUSTOM, l, h, t, i, He, r]),
            this.hitDetectionInstructions.push([
              G.CUSTOM,
              l,
              h,
              t,
              n || i,
              He,
              r,
            ]));
        break;
      case "Point":
        (c = t.getFlatCoordinates()),
          this.coordinates.push(c[0], c[1]),
          (h = this.coordinates.length),
          this.instructions.push([G.CUSTOM, l, h, t, i, void 0, r]),
          this.hitDetectionInstructions.push([
            G.CUSTOM,
            l,
            h,
            t,
            n || i,
            void 0,
            r,
          ]);
        break;
    }
    this.endGeometry(e);
  }
  beginGeometry(t, e, i) {
    (this.beginGeometryInstruction1_ = [G.BEGIN_GEOMETRY, e, 0, t, i]),
      this.instructions.push(this.beginGeometryInstruction1_),
      (this.beginGeometryInstruction2_ = [G.BEGIN_GEOMETRY, e, 0, t, i]),
      this.hitDetectionInstructions.push(this.beginGeometryInstruction2_);
  }
  finish() {
    return {
      instructions: this.instructions,
      hitDetectionInstructions: this.hitDetectionInstructions,
      coordinates: this.coordinates,
    };
  }
  reverseHitDetectionInstructions() {
    const t = this.hitDetectionInstructions;
    t.reverse();
    let e;
    const i = t.length;
    let n,
      r,
      o = -1;
    for (e = 0; e < i; ++e)
      (n = t[e]),
        (r = n[0]),
        r == G.END_GEOMETRY
          ? (o = e)
          : r == G.BEGIN_GEOMETRY &&
            ((n[2] = e), gc(this.hitDetectionInstructions, o, e), (o = -1));
  }
  fillStyleToState(t, e = {}) {
    if (t) {
      const i = t.getColor();
      (e.fillPatternScale =
        i && typeof i == "object" && "src" in i ? this.pixelRatio : 1),
        (e.fillStyle = _e(i || Nt));
    } else e.fillStyle = void 0;
    return e;
  }
  strokeStyleToState(t, e = {}) {
    if (t) {
      const i = t.getColor();
      e.strokeStyle = _e(i || kn);
      const n = t.getLineCap();
      e.lineCap = n !== void 0 ? n : Qi;
      const r = t.getLineDash();
      e.lineDash = r ? r.slice() : be;
      const o = t.getLineDashOffset();
      e.lineDashOffset = o || Ae;
      const a = t.getLineJoin();
      e.lineJoin = a !== void 0 ? a : tn;
      const l = t.getWidth();
      e.lineWidth = l !== void 0 ? l : Nn;
      const c = t.getMiterLimit();
      (e.miterLimit = c !== void 0 ? c : On),
        e.lineWidth > this.maxLineWidth &&
          ((this.maxLineWidth = e.lineWidth), (this.bufferedMaxExtent_ = null));
    } else
      (e.strokeStyle = void 0),
        (e.lineCap = void 0),
        (e.lineDash = null),
        (e.lineDashOffset = void 0),
        (e.lineJoin = void 0),
        (e.lineWidth = void 0),
        (e.miterLimit = void 0);
    return e;
  }
  setFillStrokeStyle(t, e) {
    const i = this.state;
    this.fillStyleToState(t, i), this.strokeStyleToState(e, i);
  }
  createFill(t) {
    const e = t.fillStyle,
      i = [G.SET_FILL_STYLE, e];
    return typeof e != "string" && i.push(t.fillPatternScale), i;
  }
  applyStroke(t) {
    this.instructions.push(this.createStroke(t));
  }
  createStroke(t) {
    return [
      G.SET_STROKE_STYLE,
      t.strokeStyle,
      t.lineWidth * this.pixelRatio,
      t.lineCap,
      t.lineJoin,
      t.miterLimit,
      t.lineDash ? this.applyPixelRatio(t.lineDash) : null,
      t.lineDashOffset * this.pixelRatio,
    ];
  }
  updateFillStyle(t, e) {
    const i = t.fillStyle;
    (typeof i != "string" || t.currentFillStyle != i) &&
      (i !== void 0 && this.instructions.push(e.call(this, t)),
      (t.currentFillStyle = i));
  }
  updateStrokeStyle(t, e) {
    const i = t.strokeStyle,
      n = t.lineCap,
      r = t.lineDash,
      o = t.lineDashOffset,
      a = t.lineJoin,
      l = t.lineWidth,
      c = t.miterLimit;
    (t.currentStrokeStyle != i ||
      t.currentLineCap != n ||
      (r != t.currentLineDash && !Ne(t.currentLineDash, r)) ||
      t.currentLineDashOffset != o ||
      t.currentLineJoin != a ||
      t.currentLineWidth != l ||
      t.currentMiterLimit != c) &&
      (i !== void 0 && e.call(this, t),
      (t.currentStrokeStyle = i),
      (t.currentLineCap = n),
      (t.currentLineDash = r),
      (t.currentLineDashOffset = o),
      (t.currentLineJoin = a),
      (t.currentLineWidth = l),
      (t.currentMiterLimit = c));
  }
  endGeometry(t) {
    (this.beginGeometryInstruction1_[2] = this.instructions.length),
      (this.beginGeometryInstruction1_ = null),
      (this.beginGeometryInstruction2_[2] =
        this.hitDetectionInstructions.length),
      (this.beginGeometryInstruction2_ = null);
    const e = [G.END_GEOMETRY, t];
    this.instructions.push(e), this.hitDetectionInstructions.push(e);
  }
  getBufferedMaxExtent() {
    if (
      !this.bufferedMaxExtent_ &&
      ((this.bufferedMaxExtent_ = kl(this.maxExtent)), this.maxLineWidth > 0)
    ) {
      const t = (this.resolution * (this.maxLineWidth + 1)) / 2;
      Yn(this.bufferedMaxExtent_, t, this.bufferedMaxExtent_);
    }
    return this.bufferedMaxExtent_;
  }
}
class Rd extends qn {
  constructor(t, e, i, n) {
    super(t, e, i, n),
      (this.hitDetectionImage_ = null),
      (this.image_ = null),
      (this.imagePixelRatio_ = void 0),
      (this.anchorX_ = void 0),
      (this.anchorY_ = void 0),
      (this.height_ = void 0),
      (this.opacity_ = void 0),
      (this.originX_ = void 0),
      (this.originY_ = void 0),
      (this.rotateWithView_ = void 0),
      (this.rotation_ = void 0),
      (this.scale_ = void 0),
      (this.width_ = void 0),
      (this.declutterMode_ = void 0),
      (this.declutterImageWithText_ = void 0);
  }
  drawPoint(t, e, i) {
    if (
      !this.image_ ||
      (this.maxExtent && !qi(this.maxExtent, t.getFlatCoordinates()))
    )
      return;
    this.beginGeometry(t, e, i);
    const n = t.getFlatCoordinates(),
      r = t.getStride(),
      o = this.coordinates.length,
      a = this.appendFlatPointCoordinates(n, r);
    this.instructions.push([
      G.DRAW_IMAGE,
      o,
      a,
      this.image_,
      this.anchorX_ * this.imagePixelRatio_,
      this.anchorY_ * this.imagePixelRatio_,
      Math.ceil(this.height_ * this.imagePixelRatio_),
      this.opacity_,
      this.originX_ * this.imagePixelRatio_,
      this.originY_ * this.imagePixelRatio_,
      this.rotateWithView_,
      this.rotation_,
      [
        (this.scale_[0] * this.pixelRatio) / this.imagePixelRatio_,
        (this.scale_[1] * this.pixelRatio) / this.imagePixelRatio_,
      ],
      Math.ceil(this.width_ * this.imagePixelRatio_),
      this.declutterMode_,
      this.declutterImageWithText_,
    ]),
      this.hitDetectionInstructions.push([
        G.DRAW_IMAGE,
        o,
        a,
        this.hitDetectionImage_,
        this.anchorX_,
        this.anchorY_,
        this.height_,
        1,
        this.originX_,
        this.originY_,
        this.rotateWithView_,
        this.rotation_,
        this.scale_,
        this.width_,
        this.declutterMode_,
        this.declutterImageWithText_,
      ]),
      this.endGeometry(e);
  }
  drawMultiPoint(t, e, i) {
    if (!this.image_) return;
    this.beginGeometry(t, e, i);
    const n = t.getFlatCoordinates(),
      r = [];
    for (let l = 0, c = n.length; l < c; l += t.getStride())
      (!this.maxExtent || qi(this.maxExtent, n.slice(l, l + 2))) &&
        r.push(n[l], n[l + 1]);
    const o = this.coordinates.length,
      a = this.appendFlatPointCoordinates(r, 2);
    this.instructions.push([
      G.DRAW_IMAGE,
      o,
      a,
      this.image_,
      this.anchorX_ * this.imagePixelRatio_,
      this.anchorY_ * this.imagePixelRatio_,
      Math.ceil(this.height_ * this.imagePixelRatio_),
      this.opacity_,
      this.originX_ * this.imagePixelRatio_,
      this.originY_ * this.imagePixelRatio_,
      this.rotateWithView_,
      this.rotation_,
      [
        (this.scale_[0] * this.pixelRatio) / this.imagePixelRatio_,
        (this.scale_[1] * this.pixelRatio) / this.imagePixelRatio_,
      ],
      Math.ceil(this.width_ * this.imagePixelRatio_),
      this.declutterMode_,
      this.declutterImageWithText_,
    ]),
      this.hitDetectionInstructions.push([
        G.DRAW_IMAGE,
        o,
        a,
        this.hitDetectionImage_,
        this.anchorX_,
        this.anchorY_,
        this.height_,
        1,
        this.originX_,
        this.originY_,
        this.rotateWithView_,
        this.rotation_,
        this.scale_,
        this.width_,
        this.declutterMode_,
        this.declutterImageWithText_,
      ]),
      this.endGeometry(e);
  }
  finish() {
    return (
      this.reverseHitDetectionInstructions(),
      (this.anchorX_ = void 0),
      (this.anchorY_ = void 0),
      (this.hitDetectionImage_ = null),
      (this.image_ = null),
      (this.imagePixelRatio_ = void 0),
      (this.height_ = void 0),
      (this.scale_ = void 0),
      (this.opacity_ = void 0),
      (this.originX_ = void 0),
      (this.originY_ = void 0),
      (this.rotateWithView_ = void 0),
      (this.rotation_ = void 0),
      (this.width_ = void 0),
      super.finish()
    );
  }
  setImageStyle(t, e) {
    const i = t.getAnchor(),
      n = t.getSize(),
      r = t.getOrigin();
    (this.imagePixelRatio_ = t.getPixelRatio(this.pixelRatio)),
      (this.anchorX_ = i[0]),
      (this.anchorY_ = i[1]),
      (this.hitDetectionImage_ = t.getHitDetectionImage()),
      (this.image_ = t.getImage(this.pixelRatio)),
      (this.height_ = n[1]),
      (this.opacity_ = t.getOpacity()),
      (this.originX_ = r[0]),
      (this.originY_ = r[1]),
      (this.rotateWithView_ = t.getRotateWithView()),
      (this.rotation_ = t.getRotation()),
      (this.scale_ = t.getScaleArray()),
      (this.width_ = n[0]),
      (this.declutterMode_ = t.getDeclutterMode()),
      (this.declutterImageWithText_ = e);
  }
}
class vd extends qn {
  constructor(t, e, i, n) {
    super(t, e, i, n);
  }
  drawFlatCoordinates_(t, e, i, n) {
    const r = this.coordinates.length,
      o = this.appendFlatLineCoordinates(t, e, i, n, !1, !1),
      a = [G.MOVE_TO_LINE_TO, r, o];
    return this.instructions.push(a), this.hitDetectionInstructions.push(a), i;
  }
  drawLineString(t, e, i) {
    const n = this.state,
      r = n.strokeStyle,
      o = n.lineWidth;
    if (r === void 0 || o === void 0) return;
    this.updateStrokeStyle(n, this.applyStroke),
      this.beginGeometry(t, e, i),
      this.hitDetectionInstructions.push(
        [
          G.SET_STROKE_STYLE,
          n.strokeStyle,
          n.lineWidth,
          n.lineCap,
          n.lineJoin,
          n.miterLimit,
          be,
          Ae,
        ],
        fi,
      );
    const a = t.getFlatCoordinates(),
      l = t.getStride();
    this.drawFlatCoordinates_(a, 0, a.length, l),
      this.hitDetectionInstructions.push(qe),
      this.endGeometry(e);
  }
  drawMultiLineString(t, e, i) {
    const n = this.state,
      r = n.strokeStyle,
      o = n.lineWidth;
    if (r === void 0 || o === void 0) return;
    this.updateStrokeStyle(n, this.applyStroke),
      this.beginGeometry(t, e, i),
      this.hitDetectionInstructions.push(
        [
          G.SET_STROKE_STYLE,
          n.strokeStyle,
          n.lineWidth,
          n.lineCap,
          n.lineJoin,
          n.miterLimit,
          be,
          Ae,
        ],
        fi,
      );
    const a = t.getEnds(),
      l = t.getFlatCoordinates(),
      c = t.getStride();
    let h = 0;
    for (let u = 0, d = a.length; u < d; ++u)
      h = this.drawFlatCoordinates_(l, h, a[u], c);
    this.hitDetectionInstructions.push(qe), this.endGeometry(e);
  }
  finish() {
    const t = this.state;
    return (
      t.lastStroke != null &&
        t.lastStroke != this.coordinates.length &&
        this.instructions.push(qe),
      this.reverseHitDetectionInstructions(),
      (this.state = null),
      super.finish()
    );
  }
  applyStroke(t) {
    t.lastStroke != null &&
      t.lastStroke != this.coordinates.length &&
      (this.instructions.push(qe), (t.lastStroke = this.coordinates.length)),
      (t.lastStroke = 0),
      super.applyStroke(t),
      this.instructions.push(fi);
  }
}
class sl extends qn {
  constructor(t, e, i, n) {
    super(t, e, i, n);
  }
  drawFlatCoordinatess_(t, e, i, n) {
    const r = this.state,
      o = r.fillStyle !== void 0,
      a = r.strokeStyle !== void 0,
      l = i.length;
    this.instructions.push(fi), this.hitDetectionInstructions.push(fi);
    for (let c = 0; c < l; ++c) {
      const h = i[c],
        u = this.coordinates.length,
        d = this.appendFlatLineCoordinates(t, e, h, n, !0, !a),
        f = [G.MOVE_TO_LINE_TO, u, d];
      this.instructions.push(f),
        this.hitDetectionInstructions.push(f),
        a &&
          (this.instructions.push(nl), this.hitDetectionInstructions.push(nl)),
        (e = h);
    }
    return (
      o && (this.instructions.push(hs), this.hitDetectionInstructions.push(hs)),
      a && (this.instructions.push(qe), this.hitDetectionInstructions.push(qe)),
      e
    );
  }
  drawCircle(t, e, i) {
    const n = this.state,
      r = n.fillStyle,
      o = n.strokeStyle;
    if (r === void 0 && o === void 0) return;
    this.setFillStrokeStyles_(),
      this.beginGeometry(t, e, i),
      n.fillStyle !== void 0 &&
        this.hitDetectionInstructions.push([G.SET_FILL_STYLE, Nt]),
      n.strokeStyle !== void 0 &&
        this.hitDetectionInstructions.push([
          G.SET_STROKE_STYLE,
          n.strokeStyle,
          n.lineWidth,
          n.lineCap,
          n.lineJoin,
          n.miterLimit,
          be,
          Ae,
        ]);
    const a = t.getFlatCoordinates(),
      l = t.getStride(),
      c = this.coordinates.length;
    this.appendFlatLineCoordinates(a, 0, a.length, l, !1, !1);
    const h = [G.CIRCLE, c];
    this.instructions.push(fi, h),
      this.hitDetectionInstructions.push(fi, h),
      n.fillStyle !== void 0 &&
        (this.instructions.push(hs), this.hitDetectionInstructions.push(hs)),
      n.strokeStyle !== void 0 &&
        (this.instructions.push(qe), this.hitDetectionInstructions.push(qe)),
      this.endGeometry(e);
  }
  drawPolygon(t, e, i) {
    const n = this.state,
      r = n.fillStyle,
      o = n.strokeStyle;
    if (r === void 0 && o === void 0) return;
    this.setFillStrokeStyles_(),
      this.beginGeometry(t, e, i),
      n.fillStyle !== void 0 &&
        this.hitDetectionInstructions.push([G.SET_FILL_STYLE, Nt]),
      n.strokeStyle !== void 0 &&
        this.hitDetectionInstructions.push([
          G.SET_STROKE_STYLE,
          n.strokeStyle,
          n.lineWidth,
          n.lineCap,
          n.lineJoin,
          n.miterLimit,
          be,
          Ae,
        ]);
    const a = t.getEnds(),
      l = t.getOrientedFlatCoordinates(),
      c = t.getStride();
    this.drawFlatCoordinatess_(l, 0, a, c), this.endGeometry(e);
  }
  drawMultiPolygon(t, e, i) {
    const n = this.state,
      r = n.fillStyle,
      o = n.strokeStyle;
    if (r === void 0 && o === void 0) return;
    this.setFillStrokeStyles_(),
      this.beginGeometry(t, e, i),
      n.fillStyle !== void 0 &&
        this.hitDetectionInstructions.push([G.SET_FILL_STYLE, Nt]),
      n.strokeStyle !== void 0 &&
        this.hitDetectionInstructions.push([
          G.SET_STROKE_STYLE,
          n.strokeStyle,
          n.lineWidth,
          n.lineCap,
          n.lineJoin,
          n.miterLimit,
          be,
          Ae,
        ]);
    const a = t.getEndss(),
      l = t.getOrientedFlatCoordinates(),
      c = t.getStride();
    let h = 0;
    for (let u = 0, d = a.length; u < d; ++u)
      h = this.drawFlatCoordinatess_(l, h, a[u], c);
    this.endGeometry(e);
  }
  finish() {
    this.reverseHitDetectionInstructions(), (this.state = null);
    const t = this.tolerance;
    if (t !== 0) {
      const e = this.coordinates;
      for (let i = 0, n = e.length; i < n; ++i) e[i] = hi(e[i], t);
    }
    return super.finish();
  }
  setFillStrokeStyles_() {
    const t = this.state;
    t.fillStyle !== void 0 && this.updateFillStyle(t, this.createFill),
      t.strokeStyle !== void 0 && this.updateStrokeStyle(t, this.applyStroke);
  }
}
function Id(s, t, e, i, n) {
  const r = [];
  let o = e,
    a = 0,
    l = t.slice(e, 2);
  for (; a < s && o + n < i; ) {
    const [c, h] = l.slice(-2),
      u = t[o + n],
      d = t[o + n + 1],
      f = Math.sqrt((u - c) * (u - c) + (d - h) * (d - h));
    if (((a += f), a >= s)) {
      const g = (s - a + f) / f,
        _ = jt(c, u, g),
        m = jt(h, d, g);
      l.push(_, m), r.push(l), (l = [_, m]), a == s && (o += n), (a = 0);
    } else if (a < s) l.push(t[o + n], t[o + n + 1]), (o += n);
    else {
      const g = f - a,
        _ = jt(c, u, g / f),
        m = jt(h, d, g / f);
      l.push(_, m), r.push(l), (l = [_, m]), (a = 0), (o += n);
    }
  }
  return a > 0 && r.push(l), r;
}
function Ld(s, t, e, i, n) {
  let r = e,
    o = e,
    a = 0,
    l = 0,
    c = e,
    h,
    u,
    d,
    f,
    g,
    _,
    m,
    y,
    p,
    C;
  for (u = e; u < i; u += n) {
    const x = t[u],
      E = t[u + 1];
    g !== void 0 &&
      ((p = x - g),
      (C = E - _),
      (f = Math.sqrt(p * p + C * C)),
      m !== void 0 &&
        ((l += d),
        (h = Math.acos((m * p + y * C) / (d * f))),
        h > s && (l > a && ((a = l), (r = c), (o = u)), (l = 0), (c = u - n))),
      (d = f),
      (m = p),
      (y = C)),
      (g = x),
      (_ = E);
  }
  return (l += f), l > a ? [c, u] : [r, o];
}
const As = {
  left: 0,
  center: 0.5,
  right: 1,
  top: 0,
  middle: 0.5,
  hanging: 0.2,
  alphabetic: 0.8,
  ideographic: 0.8,
  bottom: 1,
};
class Md extends qn {
  constructor(t, e, i, n) {
    super(t, e, i, n),
      (this.labels_ = null),
      (this.text_ = ""),
      (this.textOffsetX_ = 0),
      (this.textOffsetY_ = 0),
      (this.textRotateWithView_ = void 0),
      (this.textKeepUpright_ = void 0),
      (this.textRotation_ = 0),
      (this.textFillState_ = null),
      (this.fillStates = {}),
      (this.fillStates[Nt] = { fillStyle: Nt }),
      (this.textStrokeState_ = null),
      (this.strokeStates = {}),
      (this.textState_ = {}),
      (this.textStates = {}),
      (this.textKey_ = ""),
      (this.fillKey_ = ""),
      (this.strokeKey_ = ""),
      (this.declutterMode_ = void 0),
      (this.declutterImageWithText_ = void 0);
  }
  finish() {
    const t = super.finish();
    return (
      (t.textStates = this.textStates),
      (t.fillStates = this.fillStates),
      (t.strokeStates = this.strokeStates),
      t
    );
  }
  drawText(t, e, i) {
    const n = this.textFillState_,
      r = this.textStrokeState_,
      o = this.textState_;
    if (this.text_ === "" || !o || (!n && !r)) return;
    const a = this.coordinates;
    let l = a.length;
    const c = t.getType();
    let h = null,
      u = t.getStride();
    if (
      o.placement === "line" &&
      (c == "LineString" ||
        c == "MultiLineString" ||
        c == "Polygon" ||
        c == "MultiPolygon")
    ) {
      if (!It(this.maxExtent, t.getExtent())) return;
      let d;
      if (((h = t.getFlatCoordinates()), c == "LineString")) d = [h.length];
      else if (c == "MultiLineString") d = t.getEnds();
      else if (c == "Polygon") d = t.getEnds().slice(0, 1);
      else if (c == "MultiPolygon") {
        const m = t.getEndss();
        d = [];
        for (let y = 0, p = m.length; y < p; ++y) d.push(m[y][0]);
      }
      this.beginGeometry(t, e, i);
      const f = o.repeat,
        g = f ? void 0 : o.textAlign;
      let _ = 0;
      for (let m = 0, y = d.length; m < y; ++m) {
        let p;
        f
          ? (p = Id(f * this.resolution, h, _, d[m], u))
          : (p = [h.slice(_, d[m])]);
        for (let C = 0, x = p.length; C < x; ++C) {
          const E = p[C];
          let R = 0,
            L = E.length;
          if (g == null) {
            const M = Ld(o.maxAngle, E, 0, E.length, 2);
            (R = M[0]), (L = M[1]);
          }
          for (let M = R; M < L; M += u) a.push(E[M], E[M + 1]);
          const I = a.length;
          (_ = d[m]), this.drawChars_(l, I), (l = I);
        }
      }
      this.endGeometry(e);
    } else {
      let d = o.overflow ? null : [];
      switch (c) {
        case "Point":
        case "MultiPoint":
          h = t.getFlatCoordinates();
          break;
        case "LineString":
          h = t.getFlatMidpoint();
          break;
        case "Circle":
          h = t.getCenter();
          break;
        case "MultiLineString":
          (h = t.getFlatMidpoints()), (u = 2);
          break;
        case "Polygon":
          (h = t.getFlatInteriorPoint()),
            o.overflow || d.push(h[2] / this.resolution),
            (u = 3);
          break;
        case "MultiPolygon":
          const x = t.getFlatInteriorPoints();
          h = [];
          for (let E = 0, R = x.length; E < R; E += 3)
            o.overflow || d.push(x[E + 2] / this.resolution),
              h.push(x[E], x[E + 1]);
          if (h.length === 0) return;
          u = 2;
          break;
      }
      const f = this.appendFlatPointCoordinates(h, u);
      if (f === l) return;
      if (d && (f - l) / 2 !== h.length / u) {
        let x = l / 2;
        d = d.filter((E, R) => {
          const L =
            a[(x + R) * 2] === h[R * u] && a[(x + R) * 2 + 1] === h[R * u + 1];
          return L || --x, L;
        });
      }
      this.saveTextStates_();
      const g = o.backgroundFill
          ? this.createFill(this.fillStyleToState(o.backgroundFill))
          : null,
        _ = o.backgroundStroke
          ? this.createStroke(this.strokeStyleToState(o.backgroundStroke))
          : null;
      this.beginGeometry(t, e, i);
      let m = o.padding;
      if (m != di && (o.scale[0] < 0 || o.scale[1] < 0)) {
        let x = o.padding[0],
          E = o.padding[1],
          R = o.padding[2],
          L = o.padding[3];
        o.scale[0] < 0 && ((E = -E), (L = -L)),
          o.scale[1] < 0 && ((x = -x), (R = -R)),
          (m = [x, E, R, L]);
      }
      const y = this.pixelRatio;
      this.instructions.push([
        G.DRAW_IMAGE,
        l,
        f,
        null,
        NaN,
        NaN,
        NaN,
        1,
        0,
        0,
        this.textRotateWithView_,
        this.textRotation_,
        [1, 1],
        NaN,
        this.declutterMode_,
        this.declutterImageWithText_,
        m == di
          ? di
          : m.map(function (x) {
              return x * y;
            }),
        g,
        _,
        this.text_,
        this.textKey_,
        this.strokeKey_,
        this.fillKey_,
        this.textOffsetX_,
        this.textOffsetY_,
        d,
      ]);
      const p = 1 / y,
        C = g ? g.slice(0) : null;
      C && (C[1] = Nt),
        this.hitDetectionInstructions.push([
          G.DRAW_IMAGE,
          l,
          f,
          null,
          NaN,
          NaN,
          NaN,
          1,
          0,
          0,
          this.textRotateWithView_,
          this.textRotation_,
          [p, p],
          NaN,
          this.declutterMode_,
          this.declutterImageWithText_,
          m,
          C,
          _,
          this.text_,
          this.textKey_,
          this.strokeKey_,
          this.fillKey_ ? Nt : this.fillKey_,
          this.textOffsetX_,
          this.textOffsetY_,
          d,
        ]),
        this.endGeometry(e);
    }
  }
  saveTextStates_() {
    const t = this.textStrokeState_,
      e = this.textState_,
      i = this.textFillState_,
      n = this.strokeKey_;
    t &&
      (n in this.strokeStates ||
        (this.strokeStates[n] = {
          strokeStyle: t.strokeStyle,
          lineCap: t.lineCap,
          lineDashOffset: t.lineDashOffset,
          lineWidth: t.lineWidth,
          lineJoin: t.lineJoin,
          miterLimit: t.miterLimit,
          lineDash: t.lineDash,
        }));
    const r = this.textKey_;
    r in this.textStates ||
      (this.textStates[r] = {
        font: e.font,
        textAlign: e.textAlign || Gn,
        justify: e.justify,
        textBaseline: e.textBaseline || Ps,
        scale: e.scale,
      });
    const o = this.fillKey_;
    i &&
      (o in this.fillStates ||
        (this.fillStates[o] = { fillStyle: i.fillStyle }));
  }
  drawChars_(t, e) {
    const i = this.textStrokeState_,
      n = this.textState_,
      r = this.strokeKey_,
      o = this.textKey_,
      a = this.fillKey_;
    this.saveTextStates_();
    const l = this.pixelRatio,
      c = As[n.textBaseline],
      h = this.textOffsetY_ * l,
      u = this.text_,
      d = i ? (i.lineWidth * Math.abs(n.scale[0])) / 2 : 0;
    this.instructions.push([
      G.DRAW_CHARS,
      t,
      e,
      c,
      n.overflow,
      a,
      n.maxAngle,
      l,
      h,
      r,
      d * l,
      u,
      o,
      1,
      this.declutterMode_,
      this.textKeepUpright_,
    ]),
      this.hitDetectionInstructions.push([
        G.DRAW_CHARS,
        t,
        e,
        c,
        n.overflow,
        a && Nt,
        n.maxAngle,
        l,
        h,
        r,
        d * l,
        u,
        o,
        1 / l,
        this.declutterMode_,
        this.textKeepUpright_,
      ]);
  }
  setTextStyle(t, e) {
    let i, n, r;
    if (!t) this.text_ = "";
    else {
      const o = t.getFill();
      o
        ? ((n = this.textFillState_),
          n || ((n = {}), (this.textFillState_ = n)),
          (n.fillStyle = _e(o.getColor() || Nt)))
        : ((n = null), (this.textFillState_ = n));
      const a = t.getStroke();
      if (!a) (r = null), (this.textStrokeState_ = r);
      else {
        (r = this.textStrokeState_),
          r || ((r = {}), (this.textStrokeState_ = r));
        const _ = a.getLineDash(),
          m = a.getLineDashOffset(),
          y = a.getWidth(),
          p = a.getMiterLimit();
        (r.lineCap = a.getLineCap() || Qi),
          (r.lineDash = _ ? _.slice() : be),
          (r.lineDashOffset = m === void 0 ? Ae : m),
          (r.lineJoin = a.getLineJoin() || tn),
          (r.lineWidth = y === void 0 ? Nn : y),
          (r.miterLimit = p === void 0 ? On : p),
          (r.strokeStyle = _e(a.getColor() || kn));
      }
      i = this.textState_;
      const l = t.getFont() || mh;
      qu(l);
      const c = t.getScaleArray();
      (i.overflow = t.getOverflow()),
        (i.font = l),
        (i.maxAngle = t.getMaxAngle()),
        (i.placement = t.getPlacement()),
        (i.textAlign = t.getTextAlign()),
        (i.repeat = t.getRepeat()),
        (i.justify = t.getJustify()),
        (i.textBaseline = t.getTextBaseline() || Ps),
        (i.backgroundFill = t.getBackgroundFill()),
        (i.backgroundStroke = t.getBackgroundStroke()),
        (i.padding = t.getPadding() || di),
        (i.scale = c === void 0 ? [1, 1] : c);
      const h = t.getOffsetX(),
        u = t.getOffsetY(),
        d = t.getRotateWithView(),
        f = t.getKeepUpright(),
        g = t.getRotation();
      (this.text_ = t.getText() || ""),
        (this.textOffsetX_ = h === void 0 ? 0 : h),
        (this.textOffsetY_ = u === void 0 ? 0 : u),
        (this.textRotateWithView_ = d === void 0 ? !1 : d),
        (this.textKeepUpright_ = f === void 0 ? !0 : f),
        (this.textRotation_ = g === void 0 ? 0 : g),
        (this.strokeKey_ = r
          ? (typeof r.strokeStyle == "string"
              ? r.strokeStyle
              : V(r.strokeStyle)) +
            r.lineCap +
            r.lineDashOffset +
            "|" +
            r.lineWidth +
            r.lineJoin +
            r.miterLimit +
            "[" +
            r.lineDash.join() +
            "]"
          : ""),
        (this.textKey_ =
          i.font +
          i.scale +
          (i.textAlign || "?") +
          (i.repeat || "?") +
          (i.justify || "?") +
          (i.textBaseline || "?")),
        (this.fillKey_ =
          n && n.fillStyle
            ? typeof n.fillStyle == "string"
              ? n.fillStyle
              : "|" + V(n.fillStyle)
            : "");
    }
    (this.declutterMode_ = t.getDeclutterMode()),
      (this.declutterImageWithText_ = e);
  }
}
const Pd = {
  Circle: sl,
  Default: qn,
  Image: Rd,
  LineString: vd,
  Polygon: sl,
  Text: Md,
};
class Fd {
  constructor(t, e, i, n) {
    (this.tolerance_ = t),
      (this.maxExtent_ = e),
      (this.pixelRatio_ = n),
      (this.resolution_ = i),
      (this.buildersByZIndex_ = {});
  }
  finish() {
    const t = {};
    for (const e in this.buildersByZIndex_) {
      t[e] = t[e] || {};
      const i = this.buildersByZIndex_[e];
      for (const n in i) {
        const r = i[n].finish();
        t[e][n] = r;
      }
    }
    return t;
  }
  getBuilder(t, e) {
    const i = t !== void 0 ? t.toString() : "0";
    let n = this.buildersByZIndex_[i];
    n === void 0 && ((n = {}), (this.buildersByZIndex_[i] = n));
    let r = n[e];
    if (r === void 0) {
      const o = Pd[e];
      (r = new o(
        this.tolerance_,
        this.maxExtent_,
        this.resolution_,
        this.pixelRatio_,
      )),
        (n[e] = r);
    }
    return r;
  }
}
function bd(s, t, e, i, n, r, o, a, l, c, h, u, d = !0) {
  let f = s[t],
    g = s[t + 1],
    _ = 0,
    m = 0,
    y = 0,
    p = 0;
  function C() {
    (_ = f),
      (m = g),
      (t += i),
      (f = s[t]),
      (g = s[t + 1]),
      (p += y),
      (y = Math.sqrt((f - _) * (f - _) + (g - m) * (g - m)));
  }
  do C();
  while (t < e - i && p + y < r);
  let x = y === 0 ? 0 : (r - p) / y;
  const E = jt(_, f, x),
    R = jt(m, g, x),
    L = t - i,
    I = p,
    M = r + a * l(c, n, h);
  for (; t < e - i && p + y < M; ) C();
  x = y === 0 ? 0 : (M - p) / y;
  const F = jt(_, f, x),
    z = jt(m, g, x);
  let k = !1;
  if (d)
    if (u) {
      const T = [E, R, F, z];
      Ao(T, 0, 4, 2, u, T, T), (k = T[0] > T[2]);
    } else k = E > F;
  const b = Math.PI,
    A = [],
    U = L + i === t;
  (t = L), (y = 0), (p = I), (f = s[t]), (g = s[t + 1]);
  let N;
  if (U) {
    C(), (N = Math.atan2(g - m, f - _)), k && (N += N > 0 ? -b : b);
    const T = (F + E) / 2,
      S = (z + R) / 2;
    return (A[0] = [T, S, (M - r) / 2, N, n]), A;
  }
  n = n.replace(/\n/g, " ");
  for (let T = 0, S = n.length; T < S; ) {
    C();
    let P = Math.atan2(g - m, f - _);
    if ((k && (P += P > 0 ? -b : b), N !== void 0)) {
      let O = P - N;
      if (((O += O > b ? -2 * b : O < -b ? 2 * b : 0), Math.abs(O) > o))
        return null;
    }
    N = P;
    const D = T;
    let X = 0;
    for (; T < S; ++T) {
      const O = k ? S - T - 1 : T,
        tt = a * l(c, n[O], h);
      if (t + i < e && p + y < r + X + tt / 2) break;
      X += tt;
    }
    if (T === D) continue;
    const v = k ? n.substring(S - D, S - T) : n.substring(D, T);
    x = y === 0 ? 0 : (r + X / 2 - p) / y;
    const J = jt(_, f, x),
      Z = jt(m, g, x);
    A.push([J, Z, X / 2, P, v]), (r += X);
  }
  return A;
}
class vh {
  constructor() {
    Ra(this, "pushMethodArgs_", (...t) => (this.push_(t), this));
    (this.instructions_ = []),
      (this.zIndex = 0),
      (this.offset_ = 0),
      (this.context_ = new Proxy(Ms(), {
        get: (t, e) => {
          if (typeof Ms()[e] == "function")
            return this.push_(e), this.pushMethodArgs_;
        },
        set: (t, e, i) => (this.push_(e, i), !0),
      }));
  }
  push_(...t) {
    const e = this.instructions_,
      i = this.zIndex + this.offset_;
    e[i] || (e[i] = []), e[i].push(...t);
  }
  pushFunction(t) {
    this.push_(t);
  }
  getContext() {
    return this.context_;
  }
  draw(t) {
    this.instructions_.forEach((e) => {
      for (let i = 0, n = e.length; i < n; ++i) {
        const r = e[i];
        if (typeof r == "function") {
          r(t);
          continue;
        }
        const o = e[++i];
        if (typeof t[r] == "function") t[r](...o);
        else {
          if (typeof o == "function") {
            t[r] = o(t);
            continue;
          }
          t[r] = o;
        }
      }
    });
  }
  clear() {
    (this.instructions_.length = 0), (this.zIndex = 0), (this.offset_ = 0);
  }
  offset() {
    (this.offset_ = this.instructions_.length), (this.zIndex = 0);
  }
}
const Mi = Vt(),
  je = [],
  Ce = [],
  we = [],
  Ye = [];
function rl(s) {
  return s[3].declutterBox;
}
const ol = new RegExp("[֑-ࣿיִ-﷿ﹰ-ﻼࠀ-࿿-]");
function Mr(s, t) {
  return (
    t === "start"
      ? (t = ol.test(s) ? "right" : "left")
      : t === "end" && (t = ol.test(s) ? "left" : "right"),
    As[t]
  );
}
function Ad(s, t, e) {
  return (
    e > 0 &&
      s.push(
        `
`,
        "",
      ),
    s.push(t, ""),
    s
  );
}
function Dd(s, t, e) {
  return e % 2 === 0 && (s += t), s;
}
class Od {
  constructor(t, e, i, n, r) {
    (this.overlaps = i),
      (this.pixelRatio = e),
      (this.resolution = t),
      this.alignAndScaleFill_,
      (this.instructions = n.instructions),
      (this.coordinates = n.coordinates),
      (this.coordinateCache_ = {}),
      (this.renderedTransform_ = re()),
      (this.hitDetectionInstructions = n.hitDetectionInstructions),
      (this.pixelCoordinates_ = null),
      (this.viewRotation_ = 0),
      (this.fillStates = n.fillStates || {}),
      (this.strokeStates = n.strokeStates || {}),
      (this.textStates = n.textStates || {}),
      (this.widths_ = {}),
      (this.labels_ = {}),
      (this.zIndexContext_ = r ? new vh() : null);
  }
  getZIndexContext() {
    return this.zIndexContext_;
  }
  createLabel(t, e, i, n) {
    const r = t + e + i + n;
    if (this.labels_[r]) return this.labels_[r];
    const o = n ? this.strokeStates[n] : null,
      a = i ? this.fillStates[i] : null,
      l = this.textStates[e],
      c = this.pixelRatio,
      h = [l.scale[0] * c, l.scale[1] * c],
      u = l.justify
        ? As[l.justify]
        : Mr(Array.isArray(t) ? t[0] : t, l.textAlign || Gn),
      d = n && o.lineWidth ? o.lineWidth : 0,
      f = Array.isArray(t)
        ? t
        : String(t)
            .split(
              `
`,
            )
            .reduce(Ad, []),
      { width: g, height: _, widths: m, heights: y, lineWidths: p } = Ju(l, f),
      C = g + d,
      x = [],
      E = (C + 2) * h[0],
      R = (_ + d) * h[1],
      L = {
        width: E < 0 ? Math.floor(E) : Math.ceil(E),
        height: R < 0 ? Math.floor(R) : Math.ceil(R),
        contextInstructions: x,
      };
    (h[0] != 1 || h[1] != 1) && x.push("scale", h),
      n &&
        (x.push("strokeStyle", o.strokeStyle),
        x.push("lineWidth", d),
        x.push("lineCap", o.lineCap),
        x.push("lineJoin", o.lineJoin),
        x.push("miterLimit", o.miterLimit),
        x.push("setLineDash", [o.lineDash]),
        x.push("lineDashOffset", o.lineDashOffset)),
      i && x.push("fillStyle", a.fillStyle),
      x.push("textBaseline", "middle"),
      x.push("textAlign", "center");
    const I = 0.5 - u;
    let M = u * C + I * d;
    const F = [],
      z = [];
    let k = 0,
      b = 0,
      A = 0,
      U = 0,
      N;
    for (let T = 0, S = f.length; T < S; T += 2) {
      const P = f[T];
      if (
        P ===
        `
`
      ) {
        (b += k), (k = 0), (M = u * C + I * d), ++U;
        continue;
      }
      const D = f[T + 1] || l.font;
      D !== N && (n && F.push("font", D), i && z.push("font", D), (N = D)),
        (k = Math.max(k, y[A]));
      const X = [P, M + I * m[A] + u * (m[A] - p[U]), 0.5 * (d + k) + b];
      (M += m[A]),
        n && F.push("strokeText", X),
        i && z.push("fillText", X),
        ++A;
    }
    return (
      Array.prototype.push.apply(x, F),
      Array.prototype.push.apply(x, z),
      (this.labels_[r] = L),
      L
    );
  }
  replayTextBackground_(t, e, i, n, r, o, a) {
    t.beginPath(),
      t.moveTo.apply(t, e),
      t.lineTo.apply(t, i),
      t.lineTo.apply(t, n),
      t.lineTo.apply(t, r),
      t.lineTo.apply(t, e),
      o &&
        ((this.alignAndScaleFill_ = o[2]), (t.fillStyle = o[1]), this.fill_(t)),
      a && (this.setStrokeStyle_(t, a), t.stroke());
  }
  calculateImageOrLabelDimensions_(
    t,
    e,
    i,
    n,
    r,
    o,
    a,
    l,
    c,
    h,
    u,
    d,
    f,
    g,
    _,
    m,
  ) {
    (a *= d[0]), (l *= d[1]);
    let y = i - a,
      p = n - l;
    const C = r + c > t ? t - c : r,
      x = o + h > e ? e - h : o,
      E = g[3] + C * d[0] + g[1],
      R = g[0] + x * d[1] + g[2],
      L = y - g[3],
      I = p - g[0];
    (_ || u !== 0) &&
      ((je[0] = L),
      (Ye[0] = L),
      (je[1] = I),
      (Ce[1] = I),
      (Ce[0] = L + E),
      (we[0] = Ce[0]),
      (we[1] = I + R),
      (Ye[1] = we[1]));
    let M;
    return (
      u !== 0
        ? ((M = ke(re(), i, n, 1, 1, u, -i, -n)),
          wt(M, je),
          wt(M, Ce),
          wt(M, we),
          wt(M, Ye),
          Oe(
            Math.min(je[0], Ce[0], we[0], Ye[0]),
            Math.min(je[1], Ce[1], we[1], Ye[1]),
            Math.max(je[0], Ce[0], we[0], Ye[0]),
            Math.max(je[1], Ce[1], we[1], Ye[1]),
            Mi,
          ))
        : Oe(
            Math.min(L, L + E),
            Math.min(I, I + R),
            Math.max(L, L + E),
            Math.max(I, I + R),
            Mi,
          ),
      f && ((y = Math.round(y)), (p = Math.round(p))),
      {
        drawImageX: y,
        drawImageY: p,
        drawImageW: C,
        drawImageH: x,
        originX: c,
        originY: h,
        declutterBox: {
          minX: Mi[0],
          minY: Mi[1],
          maxX: Mi[2],
          maxY: Mi[3],
          value: m,
        },
        canvasTransform: M,
        scale: d,
      }
    );
  }
  replayImageOrLabel_(t, e, i, n, r, o, a) {
    const l = !!(o || a),
      c = n.declutterBox,
      h = a ? (a[2] * n.scale[0]) / 2 : 0;
    return (
      c.minX - h <= e[0] &&
        c.maxX + h >= 0 &&
        c.minY - h <= e[1] &&
        c.maxY + h >= 0 &&
        (l && this.replayTextBackground_(t, je, Ce, we, Ye, o, a),
        Qu(
          t,
          n.canvasTransform,
          r,
          i,
          n.originX,
          n.originY,
          n.drawImageW,
          n.drawImageH,
          n.drawImageX,
          n.drawImageY,
          n.scale,
        )),
      !0
    );
  }
  fill_(t) {
    const e = this.alignAndScaleFill_;
    if (e) {
      const i = wt(this.renderedTransform_, [0, 0]),
        n = 512 * this.pixelRatio;
      t.save(),
        t.translate(i[0] % n, i[1] % n),
        e !== 1 && t.scale(e, e),
        t.rotate(this.viewRotation_);
    }
    t.fill(), e && t.restore();
  }
  setStrokeStyle_(t, e) {
    (t.strokeStyle = e[1]),
      (t.lineWidth = e[2]),
      (t.lineCap = e[3]),
      (t.lineJoin = e[4]),
      (t.miterLimit = e[5]),
      (t.lineDashOffset = e[7]),
      t.setLineDash(e[6]);
  }
  drawLabelWithPointPlacement_(t, e, i, n) {
    const r = this.textStates[e],
      o = this.createLabel(t, e, n, i),
      a = this.strokeStates[i],
      l = this.pixelRatio,
      c = Mr(Array.isArray(t) ? t[0] : t, r.textAlign || Gn),
      h = As[r.textBaseline || Ps],
      u = a && a.lineWidth ? a.lineWidth : 0,
      d = o.width / l - 2 * r.scale[0],
      f = c * d + 2 * (0.5 - c) * u,
      g = (h * o.height) / l + 2 * (0.5 - h) * u;
    return { label: o, anchorX: f, anchorY: g };
  }
  execute_(t, e, i, n, r, o, a, l) {
    const c = this.zIndexContext_;
    let h;
    this.pixelCoordinates_ && Ne(i, this.renderedTransform_)
      ? (h = this.pixelCoordinates_)
      : (this.pixelCoordinates_ || (this.pixelCoordinates_ = []),
        (h = Je(
          this.coordinates,
          0,
          this.coordinates.length,
          2,
          i,
          this.pixelCoordinates_,
        )),
        au(this.renderedTransform_, i));
    let u = 0;
    const d = n.length;
    let f = 0,
      g,
      _,
      m,
      y,
      p,
      C,
      x,
      E,
      R,
      L,
      I,
      M,
      F,
      z = 0,
      k = 0;
    const b = this.coordinateCache_,
      A = this.viewRotation_,
      U = Math.round(Math.atan2(-i[1], i[0]) * 1e12) / 1e12,
      N = {
        context: t,
        pixelRatio: this.pixelRatio,
        resolution: this.resolution,
        rotation: A,
      },
      T = this.instructions != n || this.overlaps ? 0 : 200;
    let S, P, D, X;
    for (; u < d; ) {
      const v = n[u];
      switch (v[0]) {
        case G.BEGIN_GEOMETRY:
          (S = v[1]),
            (X = v[3]),
            S.getGeometry()
              ? a !== void 0 && !It(a, X.getExtent())
                ? (u = v[2] + 1)
                : ++u
              : (u = v[2]),
            c && (c.zIndex = v[4]);
          break;
        case G.BEGIN_PATH:
          z > T && (this.fill_(t), (z = 0)),
            k > T && (t.stroke(), (k = 0)),
            !z && !k && (t.beginPath(), (p = NaN), (C = NaN)),
            ++u;
          break;
        case G.CIRCLE:
          f = v[1];
          const Z = h[f],
            O = h[f + 1],
            tt = h[f + 2],
            K = h[f + 3],
            rt = tt - Z,
            nt = K - O,
            ut = Math.sqrt(rt * rt + nt * nt);
          t.moveTo(Z + ut, O), t.arc(Z, O, ut, 0, 2 * Math.PI, !0), ++u;
          break;
        case G.CLOSE_PATH:
          t.closePath(), ++u;
          break;
        case G.CUSTOM:
          (f = v[1]), (g = v[2]);
          const Mt = v[3],
            hn = v[4],
            Ut = v[5];
          (N.geometry = Mt), (N.feature = S), u in b || (b[u] = []);
          const ye = b[u];
          Ut
            ? Ut(h, f, g, 2, ye)
            : ((ye[0] = h[f]), (ye[1] = h[f + 1]), (ye.length = 2)),
            c && (c.zIndex = v[6]),
            hn(ye, N),
            ++u;
          break;
        case G.DRAW_IMAGE:
          (f = v[1]), (g = v[2]), (R = v[3]), (_ = v[4]), (m = v[5]);
          let Pt = v[6];
          const kt = v[7],
            ri = v[8],
            ce = v[9],
            vi = v[10];
          let ue = v[11];
          const ze = v[12];
          let Xe = v[13];
          y = v[14] || "declutter";
          const _t = v[15];
          if (!R && v.length >= 20) {
            (L = v[19]), (I = v[20]), (M = v[21]), (F = v[22]);
            const Zt = this.drawLabelWithPointPlacement_(L, I, M, F);
            (R = Zt.label), (v[3] = R);
            const oi = v[23];
            (_ = (Zt.anchorX - oi) * this.pixelRatio), (v[4] = _);
            const Ht = v[24];
            (m = (Zt.anchorY - Ht) * this.pixelRatio),
              (v[5] = m),
              (Pt = R.height),
              (v[6] = Pt),
              (Xe = R.width),
              (v[13] = Xe);
          }
          let cr;
          v.length > 25 && (cr = v[25]);
          let ur, Qn, ts;
          v.length > 17
            ? ((ur = v[16]), (Qn = v[17]), (ts = v[18]))
            : ((ur = di), (Qn = null), (ts = null)),
            vi && U ? (ue += A) : !vi && !U && (ue -= A);
          let rc = 0;
          for (; f < g; f += 2) {
            if (cr && cr[rc++] < Xe / this.pixelRatio) continue;
            const Zt = this.calculateImageOrLabelDimensions_(
                R.width,
                R.height,
                h[f],
                h[f + 1],
                Xe,
                Pt,
                _,
                m,
                ri,
                ce,
                ue,
                ze,
                r,
                ur,
                !!Qn || !!ts,
                S,
              ),
              oi = [t, e, R, Zt, kt, Qn, ts];
            if (l) {
              let Ht, de, qt;
              if (_t) {
                const dt = g - f;
                if (!_t[dt]) {
                  _t[dt] = { args: oi, declutterMode: y };
                  continue;
                }
                const Ft = _t[dt];
                (Ht = Ft.args),
                  (de = Ft.declutterMode),
                  delete _t[dt],
                  (qt = rl(Ht));
              }
              let pe, xe;
              if (
                (Ht && (de !== "declutter" || !l.collides(qt)) && (pe = !0),
                (y !== "declutter" || !l.collides(Zt.declutterBox)) &&
                  (xe = !0),
                de === "declutter" && y === "declutter")
              ) {
                const dt = pe && xe;
                (pe = dt), (xe = dt);
              }
              pe &&
                (de !== "none" && l.insert(qt),
                this.replayImageOrLabel_.apply(this, Ht)),
                xe &&
                  (y !== "none" && l.insert(Zt.declutterBox),
                  this.replayImageOrLabel_.apply(this, oi));
            } else this.replayImageOrLabel_.apply(this, oi);
          }
          ++u;
          break;
        case G.DRAW_CHARS:
          const pa = v[1],
            xa = v[2],
            dr = v[3],
            oc = v[4];
          F = v[5];
          const ac = v[6],
            Ea = v[7],
            Ca = v[8];
          M = v[9];
          const fr = v[10];
          (L = v[11]), Array.isArray(L) && (L = L.reduce(Dd, "")), (I = v[12]);
          const wa = [v[13], v[13]];
          y = v[14] || "declutter";
          const lc = v[15],
            gr = this.textStates[I],
            cn = gr.font,
            un = [gr.scale[0] * Ea, gr.scale[1] * Ea];
          let dn;
          cn in this.widths_
            ? (dn = this.widths_[cn])
            : ((dn = {}), (this.widths_[cn] = dn));
          const Sa = jo(h, pa, xa, 2),
            Ta = Math.abs(un[0]) * Za(cn, L, dn);
          if (oc || Ta <= Sa) {
            const Zt = this.textStates[I].textAlign,
              oi = (Sa - Ta) * Mr(L, Zt),
              Ht = bd(
                h,
                pa,
                xa,
                2,
                L,
                oi,
                ac,
                Math.abs(un[0]),
                Za,
                cn,
                dn,
                U ? 0 : this.viewRotation_,
                lc,
              );
            t: if (Ht) {
              const de = [];
              let qt, pe, xe, dt, Ft;
              if (M)
                for (qt = 0, pe = Ht.length; qt < pe; ++qt) {
                  (Ft = Ht[qt]),
                    (xe = Ft[4]),
                    (dt = this.createLabel(xe, I, "", M)),
                    (_ = Ft[2] + (un[0] < 0 ? -fr : fr)),
                    (m =
                      dr * dt.height +
                      ((0.5 - dr) * 2 * fr * un[1]) / un[0] -
                      Ca);
                  const Ee = this.calculateImageOrLabelDimensions_(
                    dt.width,
                    dt.height,
                    Ft[0],
                    Ft[1],
                    dt.width,
                    dt.height,
                    _,
                    m,
                    0,
                    0,
                    Ft[3],
                    wa,
                    !1,
                    di,
                    !1,
                    S,
                  );
                  if (l && y === "declutter" && l.collides(Ee.declutterBox))
                    break t;
                  de.push([t, e, dt, Ee, 1, null, null]);
                }
              if (F)
                for (qt = 0, pe = Ht.length; qt < pe; ++qt) {
                  (Ft = Ht[qt]),
                    (xe = Ft[4]),
                    (dt = this.createLabel(xe, I, F, "")),
                    (_ = Ft[2]),
                    (m = dr * dt.height - Ca);
                  const Ee = this.calculateImageOrLabelDimensions_(
                    dt.width,
                    dt.height,
                    Ft[0],
                    Ft[1],
                    dt.width,
                    dt.height,
                    _,
                    m,
                    0,
                    0,
                    Ft[3],
                    wa,
                    !1,
                    di,
                    !1,
                    S,
                  );
                  if (l && y === "declutter" && l.collides(Ee.declutterBox))
                    break t;
                  de.push([t, e, dt, Ee, 1, null, null]);
                }
              l && y !== "none" && l.load(de.map(rl));
              for (let Ee = 0, hc = de.length; Ee < hc; ++Ee)
                this.replayImageOrLabel_.apply(this, de[Ee]);
            }
          }
          ++u;
          break;
        case G.END_GEOMETRY:
          if (o !== void 0) {
            S = v[1];
            const Zt = o(S, X, y);
            if (Zt) return Zt;
          }
          ++u;
          break;
        case G.FILL:
          T ? z++ : this.fill_(t), ++u;
          break;
        case G.MOVE_TO_LINE_TO:
          for (
            f = v[1],
              g = v[2],
              P = h[f],
              D = h[f + 1],
              t.moveTo(P, D),
              p = (P + 0.5) | 0,
              C = (D + 0.5) | 0,
              f += 2;
            f < g;
            f += 2
          )
            (P = h[f]),
              (D = h[f + 1]),
              (x = (P + 0.5) | 0),
              (E = (D + 0.5) | 0),
              (f == g - 2 || x !== p || E !== C) &&
                (t.lineTo(P, D), (p = x), (C = E));
          ++u;
          break;
        case G.SET_FILL_STYLE:
          (this.alignAndScaleFill_ = v[2]),
            z && (this.fill_(t), (z = 0), k && (t.stroke(), (k = 0))),
            (t.fillStyle = v[1]),
            ++u;
          break;
        case G.SET_STROKE_STYLE:
          k && (t.stroke(), (k = 0)), this.setStrokeStyle_(t, v), ++u;
          break;
        case G.STROKE:
          T ? k++ : t.stroke(), ++u;
          break;
        default:
          ++u;
          break;
      }
    }
    z && this.fill_(t), k && t.stroke();
  }
  execute(t, e, i, n, r, o) {
    (this.viewRotation_ = n),
      this.execute_(t, e, i, this.instructions, r, void 0, void 0, o);
  }
  executeHitDetection(t, e, i, n, r) {
    return (
      (this.viewRotation_ = i),
      this.execute_(
        t,
        [t.canvas.width, t.canvas.height],
        e,
        this.hitDetectionInstructions,
        !0,
        n,
        r,
      )
    );
  }
}
const Wi = ["Polygon", "Circle", "LineString", "Image", "Text", "Default"],
  Ih = ["Image", "Text"],
  kd = Wi.filter((s) => !Ih.includes(s));
class Gd {
  constructor(t, e, i, n, r, o, a) {
    (this.maxExtent_ = t),
      (this.overlaps_ = n),
      (this.pixelRatio_ = i),
      (this.resolution_ = e),
      (this.renderBuffer_ = o),
      (this.executorsByZIndex_ = {}),
      (this.hitDetectionContext_ = null),
      (this.hitDetectionTransform_ = re()),
      (this.renderedContext_ = null),
      (this.deferredZIndexContexts_ = {}),
      this.createExecutors_(r, a);
  }
  clip(t, e) {
    const i = this.getClipCoords(e);
    t.beginPath(),
      t.moveTo(i[0], i[1]),
      t.lineTo(i[2], i[3]),
      t.lineTo(i[4], i[5]),
      t.lineTo(i[6], i[7]),
      t.clip();
  }
  createExecutors_(t, e) {
    for (const i in t) {
      let n = this.executorsByZIndex_[i];
      n === void 0 && ((n = {}), (this.executorsByZIndex_[i] = n));
      const r = t[i];
      for (const o in r) {
        const a = r[o];
        n[o] = new Od(this.resolution_, this.pixelRatio_, this.overlaps_, a, e);
      }
    }
  }
  hasExecutors(t) {
    for (const e in this.executorsByZIndex_) {
      const i = this.executorsByZIndex_[e];
      for (let n = 0, r = t.length; n < r; ++n) if (t[n] in i) return !0;
    }
    return !1;
  }
  forEachFeatureAtCoordinate(t, e, i, n, r, o) {
    n = Math.round(n);
    const a = n * 2 + 1,
      l = ke(
        this.hitDetectionTransform_,
        n + 0.5,
        n + 0.5,
        1 / e,
        -1 / e,
        -i,
        -t[0],
        -t[1],
      ),
      c = !this.hitDetectionContext_;
    c && (this.hitDetectionContext_ = xt(a, a));
    const h = this.hitDetectionContext_;
    h.canvas.width !== a || h.canvas.height !== a
      ? ((h.canvas.width = a), (h.canvas.height = a))
      : c || h.clearRect(0, 0, a, a);
    let u;
    this.renderBuffer_ !== void 0 &&
      ((u = Vt()), Rn(u, t), Yn(u, e * (this.renderBuffer_ + n), u));
    const d = Nd(n);
    let f;
    function g(E, R, L) {
      const I = h.getImageData(0, 0, a, a).data;
      for (let M = 0, F = d.length; M < F; M++)
        if (I[d[M]] > 0) {
          if (
            !o ||
            L === "none" ||
            (f !== "Image" && f !== "Text") ||
            o.includes(E)
          ) {
            const z = (d[M] - 3) / 4,
              k = n - (z % a),
              b = n - ((z / a) | 0),
              A = r(E, R, k * k + b * b);
            if (A) return A;
          }
          h.clearRect(0, 0, a, a);
          break;
        }
    }
    const _ = Object.keys(this.executorsByZIndex_).map(Number);
    _.sort(Me);
    let m, y, p, C, x;
    for (m = _.length - 1; m >= 0; --m) {
      const E = _[m].toString();
      for (p = this.executorsByZIndex_[E], y = Wi.length - 1; y >= 0; --y)
        if (
          ((f = Wi[y]),
          (C = p[f]),
          C !== void 0 && ((x = C.executeHitDetection(h, l, i, g, u)), x))
        )
          return x;
    }
  }
  getClipCoords(t) {
    const e = this.maxExtent_;
    if (!e) return null;
    const i = e[0],
      n = e[1],
      r = e[2],
      o = e[3],
      a = [i, n, i, o, r, o, r, n];
    return Je(a, 0, 8, 2, t, a), a;
  }
  isEmpty() {
    return mi(this.executorsByZIndex_);
  }
  execute(t, e, i, n, r, o, a) {
    const l = Object.keys(this.executorsByZIndex_).map(Number);
    l.sort(a ? fc : Me), (o = o || Wi);
    const c = Wi.length;
    for (let h = 0, u = l.length; h < u; ++h) {
      const d = l[h].toString(),
        f = this.executorsByZIndex_[d];
      for (let g = 0, _ = o.length; g < _; ++g) {
        const m = o[g],
          y = f[m];
        if (y !== void 0) {
          const p = a === null ? void 0 : y.getZIndexContext(),
            C = p ? p.getContext() : t,
            x = this.maxExtent_ && m !== "Image" && m !== "Text";
          if (
            (x && (C.save(), this.clip(C, i)),
            !p || m === "Text" || m === "Image"
              ? y.execute(C, e, i, n, r, a)
              : p.pushFunction((E) => y.execute(E, e, i, n, r, a)),
            x && C.restore(),
            p)
          ) {
            p.offset();
            const E = l[h] * c + g;
            this.deferredZIndexContexts_[E] ||
              (this.deferredZIndexContexts_[E] = []),
              this.deferredZIndexContexts_[E].push(p);
          }
        }
      }
    }
    this.renderedContext_ = t;
  }
  getDeferredZIndexContexts() {
    return this.deferredZIndexContexts_;
  }
  getRenderedContext() {
    return this.renderedContext_;
  }
  renderDeferred() {
    const t = this.deferredZIndexContexts_,
      e = Object.keys(t).map(Number).sort(Me);
    for (let i = 0, n = e.length; i < n; ++i)
      t[e[i]].forEach((r) => {
        r.draw(this.renderedContext_), r.clear();
      }),
        (t[e[i]].length = 0);
  }
}
const Pr = {};
function Nd(s) {
  if (Pr[s] !== void 0) return Pr[s];
  const t = s * 2 + 1,
    e = s * s,
    i = new Array(e + 1);
  for (let r = 0; r <= s; ++r)
    for (let o = 0; o <= s; ++o) {
      const a = r * r + o * o;
      if (a > e) break;
      let l = i[a];
      l || ((l = []), (i[a] = l)),
        l.push(((s + r) * t + (s + o)) * 4 + 3),
        r > 0 && l.push(((s - r) * t + (s + o)) * 4 + 3),
        o > 0 &&
          (l.push(((s + r) * t + (s - o)) * 4 + 3),
          r > 0 && l.push(((s - r) * t + (s - o)) * 4 + 3));
    }
  const n = [];
  for (let r = 0, o = i.length; r < o; ++r) i[r] && n.push(...i[r]);
  return (Pr[s] = n), n;
}
function al(s, t, e, i) {
  return e !== void 0 && i !== void 0
    ? [e / s, i / t]
    : e !== void 0
      ? e / s
      : i !== void 0
        ? i / t
        : 1;
}
class $n extends ir {
  constructor(t) {
    t = t || {};
    const e = t.opacity !== void 0 ? t.opacity : 1,
      i = t.rotation !== void 0 ? t.rotation : 0,
      n = t.scale !== void 0 ? t.scale : 1,
      r = t.rotateWithView !== void 0 ? t.rotateWithView : !1;
    super({
      opacity: e,
      rotation: i,
      scale: n,
      displacement: t.displacement !== void 0 ? t.displacement : [0, 0],
      rotateWithView: r,
      declutterMode: t.declutterMode,
    }),
      (this.anchor_ = t.anchor !== void 0 ? t.anchor : [0.5, 0.5]),
      (this.normalizedAnchor_ = null),
      (this.anchorOrigin_ =
        t.anchorOrigin !== void 0 ? t.anchorOrigin : "top-left"),
      (this.anchorXUnits_ =
        t.anchorXUnits !== void 0 ? t.anchorXUnits : "fraction"),
      (this.anchorYUnits_ =
        t.anchorYUnits !== void 0 ? t.anchorYUnits : "fraction"),
      (this.crossOrigin_ = t.crossOrigin !== void 0 ? t.crossOrigin : null);
    const o = t.img !== void 0 ? t.img : null;
    let a = t.src;
    st(
      !(a !== void 0 && o),
      "`image` and `src` cannot be provided at the same time",
    ),
      (a === void 0 || a.length === 0) && o && (a = o.src || V(o)),
      st(
        a !== void 0 && a.length > 0,
        "A defined and non-empty `src` or `image` must be provided",
      ),
      st(
        !((t.width !== void 0 || t.height !== void 0) && t.scale !== void 0),
        "`width` or `height` cannot be provided together with `scale`",
      );
    let l;
    if (
      (t.src !== void 0
        ? (l = q.IDLE)
        : o !== void 0 &&
          ("complete" in o
            ? o.complete
              ? (l = o.src ? q.LOADED : q.IDLE)
              : (l = q.LOADING)
            : (l = q.LOADED)),
      (this.color_ = t.color !== void 0 ? Ji(t.color) : null),
      (this.iconImage_ = Uo(o, a, this.crossOrigin_, l, this.color_)),
      (this.offset_ = t.offset !== void 0 ? t.offset : [0, 0]),
      (this.offsetOrigin_ =
        t.offsetOrigin !== void 0 ? t.offsetOrigin : "top-left"),
      (this.origin_ = null),
      (this.size_ = t.size !== void 0 ? t.size : null),
      this.initialOptions_,
      t.width !== void 0 || t.height !== void 0)
    ) {
      let c, h;
      if (t.size) [c, h] = t.size;
      else {
        const u = this.getImage(1);
        if (u.width && u.height) (c = u.width), (h = u.height);
        else if (u instanceof HTMLImageElement) {
          this.initialOptions_ = t;
          const d = () => {
            if ((this.unlistenImageChange(d), !this.initialOptions_)) return;
            const f = this.iconImage_.getSize();
            this.setScale(al(f[0], f[1], t.width, t.height));
          };
          this.listenImageChange(d);
          return;
        }
      }
      c !== void 0 && this.setScale(al(c, h, t.width, t.height));
    }
  }
  clone() {
    let t, e, i;
    return (
      this.initialOptions_
        ? ((e = this.initialOptions_.width), (i = this.initialOptions_.height))
        : ((t = this.getScale()), (t = Array.isArray(t) ? t.slice() : t)),
      new $n({
        anchor: this.anchor_.slice(),
        anchorOrigin: this.anchorOrigin_,
        anchorXUnits: this.anchorXUnits_,
        anchorYUnits: this.anchorYUnits_,
        color:
          this.color_ && this.color_.slice
            ? this.color_.slice()
            : this.color_ || void 0,
        crossOrigin: this.crossOrigin_,
        offset: this.offset_.slice(),
        offsetOrigin: this.offsetOrigin_,
        opacity: this.getOpacity(),
        rotateWithView: this.getRotateWithView(),
        rotation: this.getRotation(),
        scale: t,
        width: e,
        height: i,
        size: this.size_ !== null ? this.size_.slice() : void 0,
        src: this.getSrc(),
        displacement: this.getDisplacement().slice(),
        declutterMode: this.getDeclutterMode(),
      })
    );
  }
  getAnchor() {
    let t = this.normalizedAnchor_;
    if (!t) {
      t = this.anchor_;
      const n = this.getSize();
      if (
        this.anchorXUnits_ == "fraction" ||
        this.anchorYUnits_ == "fraction"
      ) {
        if (!n) return null;
        (t = this.anchor_.slice()),
          this.anchorXUnits_ == "fraction" && (t[0] *= n[0]),
          this.anchorYUnits_ == "fraction" && (t[1] *= n[1]);
      }
      if (this.anchorOrigin_ != "top-left") {
        if (!n) return null;
        t === this.anchor_ && (t = this.anchor_.slice()),
          (this.anchorOrigin_ == "top-right" ||
            this.anchorOrigin_ == "bottom-right") &&
            (t[0] = -t[0] + n[0]),
          (this.anchorOrigin_ == "bottom-left" ||
            this.anchorOrigin_ == "bottom-right") &&
            (t[1] = -t[1] + n[1]);
      }
      this.normalizedAnchor_ = t;
    }
    const e = this.getDisplacement(),
      i = this.getScaleArray();
    return [t[0] - e[0] / i[0], t[1] + e[1] / i[1]];
  }
  setAnchor(t) {
    (this.anchor_ = t), (this.normalizedAnchor_ = null);
  }
  getColor() {
    return this.color_;
  }
  getImage(t) {
    return this.iconImage_.getImage(t);
  }
  getPixelRatio(t) {
    return this.iconImage_.getPixelRatio(t);
  }
  getImageSize() {
    return this.iconImage_.getSize();
  }
  getImageState() {
    return this.iconImage_.getImageState();
  }
  getHitDetectionImage() {
    return this.iconImage_.getHitDetectionImage();
  }
  getOrigin() {
    if (this.origin_) return this.origin_;
    let t = this.offset_;
    if (this.offsetOrigin_ != "top-left") {
      const e = this.getSize(),
        i = this.iconImage_.getSize();
      if (!e || !i) return null;
      (t = t.slice()),
        (this.offsetOrigin_ == "top-right" ||
          this.offsetOrigin_ == "bottom-right") &&
          (t[0] = i[0] - e[0] - t[0]),
        (this.offsetOrigin_ == "bottom-left" ||
          this.offsetOrigin_ == "bottom-right") &&
          (t[1] = i[1] - e[1] - t[1]);
    }
    return (this.origin_ = t), this.origin_;
  }
  getSrc() {
    return this.iconImage_.getSrc();
  }
  getSize() {
    return this.size_ ? this.size_ : this.iconImage_.getSize();
  }
  getWidth() {
    const t = this.getScaleArray();
    if (this.size_) return this.size_[0] * t[0];
    if (this.iconImage_.getImageState() == q.LOADED)
      return this.iconImage_.getSize()[0] * t[0];
  }
  getHeight() {
    const t = this.getScaleArray();
    if (this.size_) return this.size_[1] * t[1];
    if (this.iconImage_.getImageState() == q.LOADED)
      return this.iconImage_.getSize()[1] * t[1];
  }
  setScale(t) {
    delete this.initialOptions_, super.setScale(t);
  }
  listenImageChange(t) {
    this.iconImage_.addEventListener(j.CHANGE, t);
  }
  load() {
    this.iconImage_.load();
  }
  unlistenImageChange(t) {
    this.iconImage_.removeEventListener(j.CHANGE, t);
  }
  ready() {
    return this.iconImage_.ready();
  }
}
const fe = 0.5;
function Bd(s, t, e, i, n, r, o, a, l) {
  const c = n,
    h = s[0] * fe,
    u = s[1] * fe,
    d = xt(h, u);
  d.imageSmoothingEnabled = !1;
  const f = d.canvas,
    g = new ed(d, fe, n, null, o, a, null),
    _ = e.length,
    m = Math.floor((256 * 256 * 256 - 1) / _),
    y = {};
  for (let C = 1; C <= _; ++C) {
    const x = e[C - 1],
      E = x.getStyleFunction() || i;
    if (!E) continue;
    let R = E(x, r);
    if (!R) continue;
    Array.isArray(R) || (R = [R]);
    const I = (C * m).toString(16).padStart(7, "#00000");
    for (let M = 0, F = R.length; M < F; ++M) {
      const z = R[M],
        k = z.getGeometryFunction()(x);
      if (!k || !It(c, k.getExtent())) continue;
      const b = z.clone(),
        A = b.getFill();
      A && A.setColor(I);
      const U = b.getStroke();
      U && (U.setColor(I), U.setLineDash(null)), b.setText(void 0);
      const N = z.getImage();
      if (N) {
        const D = N.getImageSize();
        if (!D) continue;
        const X = xt(D[0], D[1], void 0, { alpha: !1 }),
          v = X.canvas;
        (X.fillStyle = I),
          X.fillRect(0, 0, v.width, v.height),
          b.setImage(
            new $n({
              img: v,
              anchor: N.getAnchor(),
              anchorXUnits: "pixels",
              anchorYUnits: "pixels",
              offset: N.getOrigin(),
              opacity: 1,
              size: N.getSize(),
              scale: N.getScale(),
              rotation: N.getRotation(),
              rotateWithView: N.getRotateWithView(),
            }),
          );
      }
      const T = b.getZIndex() || 0;
      let S = y[T];
      S ||
        ((S = {}),
        (y[T] = S),
        (S.Polygon = []),
        (S.Circle = []),
        (S.LineString = []),
        (S.Point = []));
      const P = k.getType();
      if (P === "GeometryCollection") {
        const D = k.getGeometriesArrayRecursive();
        for (let X = 0, v = D.length; X < v; ++X) {
          const J = D[X];
          S[J.getType().replace("Multi", "")].push(J, b);
        }
      } else S[P.replace("Multi", "")].push(k, b);
    }
  }
  const p = Object.keys(y).map(Number).sort(Me);
  for (let C = 0, x = p.length; C < x; ++C) {
    const E = y[p[C]];
    for (const R in E) {
      const L = E[R];
      for (let I = 0, M = L.length; I < M; I += 2) {
        g.setStyle(L[I + 1]);
        for (let F = 0, z = t.length; F < z; ++F)
          g.setTransform(t[F]), g.drawGeometry(L[I]);
      }
    }
  }
  return d.getImageData(0, 0, f.width, f.height);
}
function zd(s, t, e) {
  const i = [];
  if (e) {
    const n = Math.floor(Math.round(s[0]) * fe),
      r = Math.floor(Math.round(s[1]) * fe),
      o = (ct(n, 0, e.width - 1) + ct(r, 0, e.height - 1) * e.width) * 4,
      a = e.data[o],
      l = e.data[o + 1],
      h = e.data[o + 2] + 256 * (l + 256 * a),
      u = Math.floor((256 * 256 * 256 - 1) / t.length);
    h && h % u === 0 && i.push(t[h / u - 1]);
  }
  return i;
}
class Lh extends Kt {
  constructor(t, e, i, n) {
    super(t),
      (this.inversePixelTransform = e),
      (this.frameState = i),
      (this.context = n);
  }
}
const Xd = 5;
class Wd extends jn {
  constructor(t) {
    super(),
      (this.ready = !0),
      (this.boundHandleImageChange_ = this.handleImageChange_.bind(this)),
      (this.layer_ = t),
      (this.staleKeys_ = new Array()),
      (this.maxStaleKeys = Xd);
  }
  getStaleKeys() {
    return this.staleKeys_;
  }
  prependStaleKey(t) {
    this.staleKeys_.unshift(t),
      this.staleKeys_.length > this.maxStaleKeys &&
        (this.staleKeys_.length = this.maxStaleKeys);
  }
  getFeatures(t) {
    return Y();
  }
  getData(t) {
    return null;
  }
  prepareFrame(t) {
    return Y();
  }
  renderFrame(t, e) {
    return Y();
  }
  forEachFeatureAtCoordinate(t, e, i, n, r) {}
  getLayer() {
    return this.layer_;
  }
  handleFontsChanged() {}
  handleImageChange_(t) {
    const e = t.target;
    (e.getState() === q.LOADED || e.getState() === q.ERROR) &&
      this.renderIfReadyAndVisible();
  }
  loadImage(t) {
    let e = t.getState();
    return (
      e != q.LOADED &&
        e != q.ERROR &&
        t.addEventListener(j.CHANGE, this.boundHandleImageChange_),
      e == q.IDLE && (t.load(), (e = t.getState())),
      e == q.LOADED
    );
  }
  renderIfReadyAndVisible() {
    const t = this.getLayer();
    t && t.getVisible() && t.getSourceState() === "ready" && t.changed();
  }
  renderDeferred(t) {}
  disposeInternal() {
    delete this.layer_, super.disposeInternal();
  }
}
const ll = [];
let Gi = null;
function jd() {
  Gi = xt(1, 1, void 0, { willReadFrequently: !0 });
}
class Mh extends Wd {
  constructor(t) {
    super(t),
      (this.container = null),
      this.renderedResolution,
      (this.tempTransform = re()),
      (this.pixelTransform = re()),
      (this.inversePixelTransform = re()),
      (this.context = null),
      (this.deferredContext_ = null),
      (this.containerReused = !1),
      (this.frameState = null);
  }
  getImageData(t, e, i) {
    Gi || jd(), Gi.clearRect(0, 0, 1, 1);
    let n;
    try {
      Gi.drawImage(t, e, i, 1, 1, 0, 0, 1, 1),
        (n = Gi.getImageData(0, 0, 1, 1).data);
    } catch {
      return (Gi = null), null;
    }
    return n;
  }
  getBackground(t) {
    let i = this.getLayer().getBackground();
    return (
      typeof i == "function" && (i = i(t.viewState.resolution)), i || void 0
    );
  }
  useContainer(t, e, i) {
    const n = this.getLayer().getClassName();
    let r, o;
    if (
      t &&
      t.className === n &&
      (!i ||
        (t &&
          t.style.backgroundColor &&
          Ne(Ji(t.style.backgroundColor), Ji(i))))
    ) {
      const a = t.firstElementChild;
      a instanceof HTMLCanvasElement && (o = a.getContext("2d"));
    }
    if (
      (o && uu(o.canvas.style.transform, e)
        ? ((this.container = t),
          (this.context = o),
          (this.containerReused = !0))
        : this.containerReused
          ? ((this.container = null),
            (this.context = null),
            (this.containerReused = !1))
          : this.container && (this.container.style.backgroundColor = null),
      !this.container)
    ) {
      (r = document.createElement("div")), (r.className = n);
      let a = r.style;
      (a.position = "absolute"),
        (a.width = "100%"),
        (a.height = "100%"),
        (o = xt());
      const l = o.canvas;
      r.appendChild(l),
        (a = l.style),
        (a.position = "absolute"),
        (a.left = "0"),
        (a.transformOrigin = "top left"),
        (this.container = r),
        (this.context = o);
    }
    !this.containerReused &&
      i &&
      !this.container.style.backgroundColor &&
      (this.container.style.backgroundColor = i);
  }
  clipUnrotated(t, e, i) {
    const n = wi(i),
      r = Vs(i),
      o = Ys(i),
      a = js(i);
    wt(e.coordinateToPixelTransform, n),
      wt(e.coordinateToPixelTransform, r),
      wt(e.coordinateToPixelTransform, o),
      wt(e.coordinateToPixelTransform, a);
    const l = this.inversePixelTransform;
    wt(l, n),
      wt(l, r),
      wt(l, o),
      wt(l, a),
      t.save(),
      t.beginPath(),
      t.moveTo(Math.round(n[0]), Math.round(n[1])),
      t.lineTo(Math.round(r[0]), Math.round(r[1])),
      t.lineTo(Math.round(o[0]), Math.round(o[1])),
      t.lineTo(Math.round(a[0]), Math.round(a[1])),
      t.clip();
  }
  prepareContainer(t, e) {
    const i = t.extent,
      n = t.viewState.resolution,
      r = t.viewState.rotation,
      o = t.pixelRatio,
      a = Math.round((at(i) / n) * o),
      l = Math.round((Ot(i) / n) * o);
    ke(
      this.pixelTransform,
      t.size[0] / 2,
      t.size[1] / 2,
      1 / o,
      1 / o,
      r,
      -a / 2,
      -l / 2,
    ),
      ql(this.inversePixelTransform, this.pixelTransform);
    const c = cu(this.pixelTransform);
    if (
      (this.useContainer(e, c, this.getBackground(t)), !this.containerReused)
    ) {
      const h = this.context.canvas;
      h.width != a || h.height != l
        ? ((h.width = a), (h.height = l))
        : this.context.clearRect(0, 0, a, l),
        c !== h.style.transform && (h.style.transform = c);
    }
  }
  dispatchRenderEvent_(t, e, i) {
    const n = this.getLayer();
    if (n.hasListener(t)) {
      const r = new Lh(t, this.inversePixelTransform, i, e);
      n.dispatchEvent(r);
    }
  }
  preRender(t, e) {
    (this.frameState = e),
      !e.declutter && this.dispatchRenderEvent_($t.PRERENDER, t, e);
  }
  postRender(t, e) {
    e.declutter || this.dispatchRenderEvent_($t.POSTRENDER, t, e);
  }
  renderDeferredInternal(t) {}
  getRenderContext(t) {
    return (
      t.declutter &&
        !this.deferredContext_ &&
        (this.deferredContext_ = new vh()),
      t.declutter ? this.deferredContext_.getContext() : this.context
    );
  }
  renderDeferred(t) {
    t.declutter &&
      (this.dispatchRenderEvent_($t.PRERENDER, this.context, t),
      t.declutter &&
        this.deferredContext_ &&
        (this.deferredContext_.draw(this.context),
        this.deferredContext_.clear()),
      this.renderDeferredInternal(t),
      this.dispatchRenderEvent_($t.POSTRENDER, this.context, t));
  }
  getRenderTransform(t, e, i, n, r, o, a) {
    const l = r / 2,
      c = o / 2,
      h = n / e,
      u = -h,
      d = -t[0] + a,
      f = -t[1];
    return ke(this.tempTransform, l, c, h, u, -i, d, f);
  }
  disposeInternal() {
    delete this.frameState, super.disposeInternal();
  }
}
class Yd extends Mh {
  constructor(t) {
    super(t),
      (this.boundHandleStyleImageChange_ =
        this.handleStyleImageChange_.bind(this)),
      this.animatingOrInteracting_,
      (this.hitDetectionImageData_ = null),
      (this.clipped_ = !1),
      (this.renderedFeatures_ = null),
      (this.renderedRevision_ = -1),
      (this.renderedResolution_ = NaN),
      (this.renderedExtent_ = Vt()),
      (this.wrappedRenderedExtent_ = Vt()),
      this.renderedRotation_,
      (this.renderedCenter_ = null),
      (this.renderedProjection_ = null),
      (this.renderedPixelRatio_ = 1),
      (this.renderedRenderOrder_ = null),
      this.renderedFrameDeclutter_,
      (this.replayGroup_ = null),
      (this.replayGroupChanged = !0),
      (this.clipping = !0),
      (this.targetContext_ = null),
      (this.opacity_ = 1);
  }
  renderWorlds(t, e, i) {
    const n = e.extent,
      r = e.viewState,
      o = r.center,
      a = r.resolution,
      l = r.projection,
      c = r.rotation,
      h = l.getExtent(),
      u = this.getLayer().getSource(),
      d = this.getLayer().getDeclutter(),
      f = e.pixelRatio,
      g = e.viewHints,
      _ = !(g[vt.ANIMATING] || g[vt.INTERACTING]),
      m = this.context,
      y = Math.round((at(n) / a) * f),
      p = Math.round((Ot(n) / a) * f),
      C = u.getWrapX() && l.canWrapX(),
      x = C ? at(h) : null,
      E = C ? Math.ceil((n[2] - h[2]) / x) + 1 : 1;
    let R = C ? Math.floor((n[0] - h[0]) / x) : 0;
    do {
      let L = this.getRenderTransform(o, a, 0, f, y, p, R * x);
      e.declutter && (L = L.slice(0)),
        t.execute(
          m,
          [m.canvas.width, m.canvas.height],
          L,
          c,
          _,
          i === void 0 ? Wi : i ? Ih : kd,
          i ? d && e.declutter[d] : void 0,
        );
    } while (++R < E);
  }
  setDrawContext_() {
    this.opacity_ !== 1 &&
      ((this.targetContext_ = this.context),
      (this.context = xt(
        this.context.canvas.width,
        this.context.canvas.height,
        ll,
      )));
  }
  resetDrawContext_() {
    if (this.opacity_ !== 1) {
      const t = this.targetContext_.globalAlpha;
      (this.targetContext_.globalAlpha = this.opacity_),
        this.targetContext_.drawImage(this.context.canvas, 0, 0),
        (this.targetContext_.globalAlpha = t),
        Qs(this.context),
        ll.push(this.context.canvas),
        (this.context = this.targetContext_),
        (this.targetContext_ = null);
    }
  }
  renderDeclutter(t) {
    !this.replayGroup_ ||
      !this.getLayer().getDeclutter() ||
      this.renderWorlds(this.replayGroup_, t, !0);
  }
  renderDeferredInternal(t) {
    this.replayGroup_ &&
      (this.replayGroup_.renderDeferred(),
      this.clipped_ && this.context.restore(),
      this.resetDrawContext_());
  }
  renderFrame(t, e) {
    const i = t.layerStatesArray[t.layerIndex];
    this.opacity_ = i.opacity;
    const n = t.viewState;
    this.prepareContainer(t, e);
    const r = this.context,
      o = this.replayGroup_;
    let a = o && !o.isEmpty();
    if (
      !a &&
      !(
        this.getLayer().hasListener($t.PRERENDER) ||
        this.getLayer().hasListener($t.POSTRENDER)
      )
    )
      return this.container;
    if (
      (this.setDrawContext_(),
      this.preRender(r, t),
      n.projection,
      (this.clipped_ = !1),
      a && i.extent && this.clipping)
    ) {
      const l = Le(i.extent);
      (a = It(l, t.extent)),
        (this.clipped_ = a && !yn(l, t.extent)),
        this.clipped_ && this.clipUnrotated(r, t, l);
    }
    return (
      a &&
        this.renderWorlds(o, t, this.getLayer().getDeclutter() ? !1 : void 0),
      !t.declutter && this.clipped_ && r.restore(),
      this.postRender(r, t),
      this.renderedRotation_ !== n.rotation &&
        ((this.renderedRotation_ = n.rotation),
        (this.hitDetectionImageData_ = null)),
      t.declutter || this.resetDrawContext_(),
      this.container
    );
  }
  getFeatures(t) {
    return new Promise((e) => {
      if (
        this.frameState &&
        !this.hitDetectionImageData_ &&
        !this.animatingOrInteracting_
      ) {
        const i = this.frameState.size.slice(),
          n = this.renderedCenter_,
          r = this.renderedResolution_,
          o = this.renderedRotation_,
          a = this.renderedProjection_,
          l = this.wrappedRenderedExtent_,
          c = this.getLayer(),
          h = [],
          u = i[0] * fe,
          d = i[1] * fe;
        h.push(this.getRenderTransform(n, r, o, fe, u, d, 0).slice());
        const f = c.getSource(),
          g = a.getExtent();
        if (f.getWrapX() && a.canWrapX() && !yn(g, l)) {
          let _ = l[0];
          const m = at(g);
          let y = 0,
            p;
          for (; _ < g[0]; )
            --y,
              (p = m * y),
              h.push(this.getRenderTransform(n, r, o, fe, u, d, p).slice()),
              (_ += m);
          for (y = 0, _ = l[2]; _ > g[2]; )
            ++y,
              (p = m * y),
              h.push(this.getRenderTransform(n, r, o, fe, u, d, p).slice()),
              (_ -= m);
        }
        this.hitDetectionImageData_ = Bd(
          i,
          h,
          this.renderedFeatures_,
          c.getStyleFunction(),
          l,
          r,
          o,
          Ha(r, this.renderedPixelRatio_),
        );
      }
      e(zd(t, this.renderedFeatures_, this.hitDetectionImageData_));
    });
  }
  forEachFeatureAtCoordinate(t, e, i, n, r) {
    var d, f;
    if (!this.replayGroup_) return;
    const o = e.viewState.resolution,
      a = e.viewState.rotation,
      l = this.getLayer(),
      c = {},
      h = function (g, _, m) {
        const y = V(g),
          p = c[y];
        if (p) {
          if (p !== !0 && m < p.distanceSq) {
            if (m === 0)
              return (c[y] = !0), r.splice(r.lastIndexOf(p), 1), n(g, l, _);
            (p.geometry = _), (p.distanceSq = m);
          }
        } else {
          if (m === 0) return (c[y] = !0), n(g, l, _);
          r.push(
            (c[y] = {
              feature: g,
              layer: l,
              geometry: _,
              distanceSq: m,
              callback: n,
            }),
          );
        }
      },
      u = this.getLayer().getDeclutter();
    return this.replayGroup_.forEachFeatureAtCoordinate(
      t,
      o,
      a,
      i,
      h,
      u
        ? (f = (d = e.declutter) == null ? void 0 : d[u]) == null
          ? void 0
          : f.all().map((g) => g.value)
        : null,
    );
  }
  handleFontsChanged() {
    const t = this.getLayer();
    t.getVisible() && this.replayGroup_ && t.changed();
  }
  handleStyleImageChange_(t) {
    this.renderIfReadyAndVisible();
  }
  prepareFrame(t) {
    const e = this.getLayer(),
      i = e.getSource();
    if (!i) return !1;
    const n = t.viewHints[vt.ANIMATING],
      r = t.viewHints[vt.INTERACTING],
      o = e.getUpdateWhileAnimating(),
      a = e.getUpdateWhileInteracting();
    if ((this.ready && !o && n) || (!a && r))
      return (this.animatingOrInteracting_ = !0), !0;
    this.animatingOrInteracting_ = !1;
    const l = t.extent,
      c = t.viewState,
      h = c.projection,
      u = c.resolution,
      d = t.pixelRatio,
      f = e.getRevision(),
      g = e.getRenderBuffer();
    let _ = e.getRenderOrder();
    _ === void 0 && (_ = nd);
    const m = c.center.slice(),
      y = Yn(l, g * u),
      p = y.slice(),
      C = [y.slice()],
      x = h.getExtent();
    if (i.getWrapX() && h.canWrapX() && !yn(x, t.extent)) {
      const A = at(x),
        U = Math.max(at(y) / 2, A);
      (y[0] = x[0] - U), (y[2] = x[2] + U), jl(m, h);
      const N = zl(C[0], h);
      N[0] < x[0] && N[2] < x[2]
        ? C.push([N[0] + A, N[1], N[2] + A, N[3]])
        : N[0] > x[0] &&
          N[2] > x[2] &&
          C.push([N[0] - A, N[1], N[2] - A, N[3]]);
    }
    if (
      this.ready &&
      this.renderedResolution_ == u &&
      this.renderedRevision_ == f &&
      this.renderedRenderOrder_ == _ &&
      this.renderedFrameDeclutter_ === !!t.declutter &&
      yn(this.wrappedRenderedExtent_, y)
    )
      return (
        Ne(this.renderedExtent_, p) ||
          ((this.hitDetectionImageData_ = null), (this.renderedExtent_ = p)),
        (this.renderedCenter_ = m),
        (this.replayGroupChanged = !1),
        !0
      );
    this.replayGroup_ = null;
    const E = new Fd(xh(u, d), y, u, d);
    let R;
    for (let A = 0, U = C.length; A < U; ++A) i.loadFeatures(C[A], u, h);
    const L = Ha(u, d);
    let I = !0;
    const M = (A, U) => {
        let N;
        const T = A.getStyleFunction() || e.getStyleFunction();
        if ((T && (N = T(A, u)), N)) {
          const S = this.renderFeature(
            A,
            L,
            N,
            E,
            R,
            this.getLayer().getDeclutter(),
            U,
          );
          I = I && !S;
        }
      },
      F = Hs(y),
      z = i.getFeaturesInExtent(F);
    _ && z.sort(_);
    for (let A = 0, U = z.length; A < U; ++A) M(z[A], A);
    (this.renderedFeatures_ = z), (this.ready = I);
    const k = E.finish(),
      b = new Gd(
        y,
        u,
        d,
        i.getOverlaps(),
        k,
        e.getRenderBuffer(),
        !!t.declutter,
      );
    return (
      (this.renderedResolution_ = u),
      (this.renderedRevision_ = f),
      (this.renderedRenderOrder_ = _),
      (this.renderedFrameDeclutter_ = !!t.declutter),
      (this.renderedExtent_ = p),
      (this.wrappedRenderedExtent_ = y),
      (this.renderedCenter_ = m),
      (this.renderedProjection_ = h),
      (this.renderedPixelRatio_ = d),
      (this.replayGroup_ = b),
      (this.hitDetectionImageData_ = null),
      (this.replayGroupChanged = !0),
      !0
    );
  }
  renderFeature(t, e, i, n, r, o, a) {
    if (!i) return !1;
    let l = !1;
    if (Array.isArray(i))
      for (let c = 0, h = i.length; c < h; ++c)
        l = qa(n, t, i[c], e, this.boundHandleStyleImageChange_, r, o, a) || l;
    else l = qa(n, t, i, e, this.boundHandleStyleImageChange_, r, o, a);
    return l;
  }
}
let Ti = 0;
const At = 1 << Ti++,
  et = 1 << Ti++,
  Bt = 1 << Ti++,
  se = 1 << Ti++,
  pi = 1 << Ti++,
  En = 1 << Ti++,
  cs = Math.pow(2, Ti) - 1,
  qo = {
    [At]: "boolean",
    [et]: "number",
    [Bt]: "string",
    [se]: "color",
    [pi]: "number[]",
    [En]: "size",
  },
  Vd = Object.keys(qo).map(Number).sort(Me);
function Kd(s) {
  return s in qo;
}
function Cn(s) {
  const t = [];
  for (const e of Vd) wn(s, e) && t.push(qo[e]);
  return t.length === 0
    ? "untyped"
    : t.length < 3
      ? t.join(" or ")
      : t.slice(0, -1).join(", ") + ", or " + t[t.length - 1];
}
function wn(s, t) {
  return (s & t) === t;
}
function Ve(s, t) {
  return s === t;
}
class yt {
  constructor(t, e) {
    if (!Kd(t))
      throw new Error(
        `literal expressions must have a specific type, got ${Cn(t)}`,
      );
    (this.type = t), (this.value = e);
  }
}
class Ud {
  constructor(t, e, ...i) {
    (this.type = t), (this.operator = e), (this.args = i);
  }
}
function Ph() {
  return {
    variables: new Set(),
    properties: new Set(),
    featureId: !1,
    geometryType: !1,
    mapState: !1,
  };
}
function St(s, t, e) {
  switch (typeof s) {
    case "boolean": {
      if (Ve(t, Bt)) return new yt(Bt, s ? "true" : "false");
      if (!wn(t, At)) throw new Error(`got a boolean, but expected ${Cn(t)}`);
      return new yt(At, s);
    }
    case "number": {
      if (Ve(t, En)) return new yt(En, Wt(s));
      if (Ve(t, At)) return new yt(At, !!s);
      if (Ve(t, Bt)) return new yt(Bt, s.toString());
      if (!wn(t, et)) throw new Error(`got a number, but expected ${Cn(t)}`);
      return new yt(et, s);
    }
    case "string": {
      if (Ve(t, se)) return new yt(se, Vo(s));
      if (Ve(t, At)) return new yt(At, !!s);
      if (!wn(t, Bt)) throw new Error(`got a string, but expected ${Cn(t)}`);
      return new yt(Bt, s);
    }
  }
  if (!Array.isArray(s))
    throw new Error("expression must be an array or a primitive value");
  if (s.length === 0) throw new Error("empty expression");
  if (typeof s[0] == "string") return rf(s, t, e);
  for (const i of s)
    if (typeof i != "number") throw new Error("expected an array of numbers");
  if (Ve(t, En)) {
    if (s.length !== 2)
      throw new Error(
        `expected an array of two values for a size, got ${s.length}`,
      );
    return new yt(En, s);
  }
  if (Ve(t, se)) {
    if (s.length === 3) return new yt(se, [...s, 1]);
    if (s.length === 4) return new yt(se, s);
    throw new Error(
      `expected an array of 3 or 4 values for a color, got ${s.length}`,
    );
  }
  if (!wn(t, pi))
    throw new Error(`got an array of numbers, but expected ${Cn(t)}`);
  return new yt(pi, s);
}
const w = {
    Get: "get",
    Var: "var",
    Concat: "concat",
    GeometryType: "geometry-type",
    LineMetric: "line-metric",
    Any: "any",
    All: "all",
    Not: "!",
    Resolution: "resolution",
    Zoom: "zoom",
    Time: "time",
    Equal: "==",
    NotEqual: "!=",
    GreaterThan: ">",
    GreaterThanOrEqualTo: ">=",
    LessThan: "<",
    LessThanOrEqualTo: "<=",
    Multiply: "*",
    Divide: "/",
    Add: "+",
    Subtract: "-",
    Clamp: "clamp",
    Mod: "%",
    Pow: "^",
    Abs: "abs",
    Floor: "floor",
    Ceil: "ceil",
    Round: "round",
    Sin: "sin",
    Cos: "cos",
    Atan: "atan",
    Sqrt: "sqrt",
    Match: "match",
    Between: "between",
    Interpolate: "interpolate",
    Coalesce: "coalesce",
    Case: "case",
    In: "in",
    Number: "number",
    String: "string",
    Array: "array",
    Color: "color",
    Id: "id",
    Band: "band",
    Palette: "palette",
    ToString: "to-string",
    Has: "has",
  },
  Zd = {
    [w.Get]: W(H(1, 1 / 0), hl),
    [w.Var]: W(H(1, 1), Hd),
    [w.Has]: W(H(1, 1 / 0), hl),
    [w.Id]: W(qd, Pi),
    [w.Concat]: W(H(2, 1 / 0), it(Bt)),
    [w.GeometryType]: W($d, Pi),
    [w.LineMetric]: W(Pi),
    [w.Resolution]: W(Fr, Pi),
    [w.Zoom]: W(Fr, Pi),
    [w.Time]: W(Fr, Pi),
    [w.Any]: W(H(2, 1 / 0), it(At)),
    [w.All]: W(H(2, 1 / 0), it(At)),
    [w.Not]: W(H(1, 1), it(At)),
    [w.Equal]: W(H(2, 2), it(cs)),
    [w.NotEqual]: W(H(2, 2), it(cs)),
    [w.GreaterThan]: W(H(2, 2), it(et)),
    [w.GreaterThanOrEqualTo]: W(H(2, 2), it(et)),
    [w.LessThan]: W(H(2, 2), it(et)),
    [w.LessThanOrEqualTo]: W(H(2, 2), it(et)),
    [w.Multiply]: W(H(2, 1 / 0), cl),
    [w.Coalesce]: W(H(2, 1 / 0), cl),
    [w.Divide]: W(H(2, 2), it(et)),
    [w.Add]: W(H(2, 1 / 0), it(et)),
    [w.Subtract]: W(H(2, 2), it(et)),
    [w.Clamp]: W(H(3, 3), it(et)),
    [w.Mod]: W(H(2, 2), it(et)),
    [w.Pow]: W(H(2, 2), it(et)),
    [w.Abs]: W(H(1, 1), it(et)),
    [w.Floor]: W(H(1, 1), it(et)),
    [w.Ceil]: W(H(1, 1), it(et)),
    [w.Round]: W(H(1, 1), it(et)),
    [w.Sin]: W(H(1, 1), it(et)),
    [w.Cos]: W(H(1, 1), it(et)),
    [w.Atan]: W(H(1, 2), it(et)),
    [w.Sqrt]: W(H(1, 1), it(et)),
    [w.Match]: W(H(4, 1 / 0), ul, Qd),
    [w.Between]: W(H(3, 3), it(et)),
    [w.Interpolate]: W(H(6, 1 / 0), ul, tf),
    [w.Case]: W(H(3, 1 / 0), Jd, ef),
    [w.In]: W(H(2, 2), nf),
    [w.Number]: W(H(1, 1 / 0), it(cs)),
    [w.String]: W(H(1, 1 / 0), it(cs)),
    [w.Array]: W(H(1, 1 / 0), it(et)),
    [w.Color]: W(H(1, 4), it(et)),
    [w.Band]: W(H(1, 3), it(et)),
    [w.Palette]: W(H(2, 2), sf),
    [w.ToString]: W(H(1, 1), it(At | et | Bt | se)),
  };
function hl(s, t, e) {
  const i = s.length - 1,
    n = new Array(i);
  for (let r = 0; r < i; ++r) {
    const o = s[r + 1];
    switch (typeof o) {
      case "number": {
        n[r] = new yt(et, o);
        break;
      }
      case "string": {
        n[r] = new yt(Bt, o);
        break;
      }
      default:
        throw new Error(
          `expected a string key or numeric array index for a get operation, got ${o}`,
        );
    }
    r === 0 && e.properties.add(String(o));
  }
  return n;
}
function Hd(s, t, e) {
  const i = s[1];
  if (typeof i != "string")
    throw new Error("expected a string argument for var operation");
  return e.variables.add(i), [new yt(Bt, i)];
}
function qd(s, t, e) {
  e.featureId = !0;
}
function $d(s, t, e) {
  e.geometryType = !0;
}
function Fr(s, t, e) {
  e.mapState = !0;
}
function Pi(s, t, e) {
  const i = s[0];
  if (s.length !== 1)
    throw new Error(`expected no arguments for ${i} operation`);
  return [];
}
function H(s, t) {
  return function (e, i, n) {
    const r = e[0],
      o = e.length - 1;
    if (s === t) {
      if (o !== s) {
        const a = s === 1 ? "" : "s";
        throw new Error(`expected ${s} argument${a} for ${r}, got ${o}`);
      }
    } else if (o < s || o > t) {
      const a = t === 1 / 0 ? `${s} or more` : `${s} to ${t}`;
      throw new Error(`expected ${a} arguments for ${r}, got ${o}`);
    }
  };
}
function cl(s, t, e) {
  const i = s.length - 1,
    n = new Array(i);
  for (let r = 0; r < i; ++r) {
    const o = St(s[r + 1], t, e);
    n[r] = o;
  }
  return n;
}
function it(s) {
  return function (t, e, i) {
    const n = t.length - 1,
      r = new Array(n);
    for (let o = 0; o < n; ++o) {
      const a = St(t[o + 1], s, i);
      r[o] = a;
    }
    return r;
  };
}
function Jd(s, t, e) {
  const i = s[0],
    n = s.length - 1;
  if (n % 2 === 0)
    throw new Error(
      `expected an odd number of arguments for ${i}, got ${n} instead`,
    );
}
function ul(s, t, e) {
  const i = s[0],
    n = s.length - 1;
  if (n % 2 === 1)
    throw new Error(
      `expected an even number of arguments for operation ${i}, got ${n} instead`,
    );
}
function Qd(s, t, e) {
  const i = s.length - 1,
    n = Bt | et | At,
    r = St(s[1], n, e),
    o = St(s[s.length - 1], t, e),
    a = new Array(i - 2);
  for (let l = 0; l < i - 2; l += 2) {
    try {
      const c = St(s[l + 2], r.type, e);
      a[l] = c;
    } catch (c) {
      throw new Error(
        `failed to parse argument ${l + 1} of match expression: ${c.message}`,
      );
    }
    try {
      const c = St(s[l + 3], o.type, e);
      a[l + 1] = c;
    } catch (c) {
      throw new Error(
        `failed to parse argument ${l + 2} of match expression: ${c.message}`,
      );
    }
  }
  return [r, ...a, o];
}
function tf(s, t, e) {
  const i = s[1];
  let n;
  switch (i[0]) {
    case "linear":
      n = 1;
      break;
    case "exponential":
      const l = i[1];
      if (typeof l != "number" || l <= 0)
        throw new Error(
          `expected a number base for exponential interpolation, got ${JSON.stringify(l)} instead`,
        );
      n = l;
      break;
    default:
      throw new Error(`invalid interpolation type: ${JSON.stringify(i)}`);
  }
  const r = new yt(et, n);
  let o;
  try {
    o = St(s[2], et, e);
  } catch (l) {
    throw new Error(
      `failed to parse argument 1 in interpolate expression: ${l.message}`,
    );
  }
  const a = new Array(s.length - 3);
  for (let l = 0; l < a.length; l += 2) {
    try {
      const c = St(s[l + 3], et, e);
      a[l] = c;
    } catch (c) {
      throw new Error(
        `failed to parse argument ${l + 2} for interpolate expression: ${c.message}`,
      );
    }
    try {
      const c = St(s[l + 4], t, e);
      a[l + 1] = c;
    } catch (c) {
      throw new Error(
        `failed to parse argument ${l + 3} for interpolate expression: ${c.message}`,
      );
    }
  }
  return [r, o, ...a];
}
function ef(s, t, e) {
  const i = St(s[s.length - 1], t, e),
    n = new Array(s.length - 1);
  for (let r = 0; r < n.length - 1; r += 2) {
    try {
      const o = St(s[r + 1], At, e);
      n[r] = o;
    } catch (o) {
      throw new Error(
        `failed to parse argument ${r} of case expression: ${o.message}`,
      );
    }
    try {
      const o = St(s[r + 2], i.type, e);
      n[r + 1] = o;
    } catch (o) {
      throw new Error(
        `failed to parse argument ${r + 1} of case expression: ${o.message}`,
      );
    }
  }
  return (n[n.length - 1] = i), n;
}
function nf(s, t, e) {
  let i = s[2];
  if (!Array.isArray(i))
    throw new Error(
      'the second argument for the "in" operator must be an array',
    );
  let n;
  if (typeof i[0] == "string") {
    if (i[0] !== "literal")
      throw new Error(
        'for the "in" operator, a string array should be wrapped in a "literal" operator to disambiguate from expressions',
      );
    if (!Array.isArray(i[1]))
      throw new Error(
        'failed to parse "in" expression: the literal operator must be followed by an array',
      );
    (i = i[1]), (n = Bt);
  } else n = et;
  const r = new Array(i.length);
  for (let a = 0; a < r.length; a++)
    try {
      const l = St(i[a], n, e);
      r[a] = l;
    } catch (l) {
      throw new Error(
        `failed to parse haystack item ${a} for "in" expression: ${l.message}`,
      );
    }
  return [St(s[1], n, e), ...r];
}
function sf(s, t, e) {
  let i;
  try {
    i = St(s[1], et, e);
  } catch (o) {
    throw new Error(
      `failed to parse first argument in palette expression: ${o.message}`,
    );
  }
  const n = s[2];
  if (!Array.isArray(n))
    throw new Error("the second argument of palette must be an array");
  const r = new Array(n.length);
  for (let o = 0; o < r.length; o++) {
    let a;
    try {
      a = St(n[o], se, e);
    } catch (l) {
      throw new Error(
        `failed to parse color at index ${o} in palette expression: ${l.message}`,
      );
    }
    if (!(a instanceof yt))
      throw new Error(
        `the palette color at index ${o} must be a literal value`,
      );
    r[o] = a;
  }
  return [i, ...r];
}
function W(...s) {
  return function (t, e, i) {
    const n = t[0];
    let r;
    for (let o = 0; o < s.length; o++) {
      const a = s[o](t, e, i);
      if (o == s.length - 1) {
        if (!a)
          throw new Error(
            "expected last argument validator to return the parsed args",
          );
        r = a;
      }
    }
    return new Ud(e, n, ...r);
  };
}
function rf(s, t, e) {
  const i = s[0],
    n = Zd[i];
  if (!n) throw new Error(`unknown operator: ${i}`);
  return n(s, t, e);
}
function Fh(s) {
  if (!s) return "";
  const t = s.getType();
  switch (t) {
    case "Point":
    case "LineString":
    case "Polygon":
      return t;
    case "MultiPoint":
    case "MultiLineString":
    case "MultiPolygon":
      return t.substring(5);
    case "Circle":
      return "Polygon";
    case "GeometryCollection":
      return Fh(s.getGeometries()[0]);
    default:
      return "";
  }
}
function bh() {
  return {
    variables: {},
    properties: {},
    resolution: NaN,
    featureId: null,
    geometryType: "",
  };
}
function Be(s, t, e) {
  const i = St(s, t, e);
  return he(i);
}
function he(s, t) {
  if (s instanceof yt) {
    if (s.type === se && typeof s.value == "string") {
      const i = Vo(s.value);
      return function () {
        return i;
      };
    }
    return function () {
      return s.value;
    };
  }
  const e = s.operator;
  switch (e) {
    case w.Number:
    case w.String:
    case w.Coalesce:
      return of(s);
    case w.Get:
    case w.Var:
    case w.Has:
      return af(s);
    case w.Id:
      return (i) => i.featureId;
    case w.GeometryType:
      return (i) => i.geometryType;
    case w.Concat: {
      const i = s.args.map((n) => he(n));
      return (n) => "".concat(...i.map((r) => r(n).toString()));
    }
    case w.Resolution:
      return (i) => i.resolution;
    case w.Any:
    case w.All:
    case w.Between:
    case w.In:
    case w.Not:
      return hf(s);
    case w.Equal:
    case w.NotEqual:
    case w.LessThan:
    case w.LessThanOrEqualTo:
    case w.GreaterThan:
    case w.GreaterThanOrEqualTo:
      return lf(s);
    case w.Multiply:
    case w.Divide:
    case w.Add:
    case w.Subtract:
    case w.Clamp:
    case w.Mod:
    case w.Pow:
    case w.Abs:
    case w.Floor:
    case w.Ceil:
    case w.Round:
    case w.Sin:
    case w.Cos:
    case w.Atan:
    case w.Sqrt:
      return cf(s);
    case w.Case:
      return uf(s);
    case w.Match:
      return df(s);
    case w.Interpolate:
      return ff(s);
    case w.ToString:
      return gf(s);
    default:
      throw new Error(`Unsupported operator ${e}`);
  }
}
function of(s, t) {
  const e = s.operator,
    i = s.args.length,
    n = new Array(i);
  for (let r = 0; r < i; ++r) n[r] = he(s.args[r]);
  switch (e) {
    case w.Coalesce:
      return (r) => {
        for (let o = 0; o < i; ++o) {
          const a = n[o](r);
          if (typeof a < "u" && a !== null) return a;
        }
        throw new Error("Expected one of the values to be non-null");
      };
    case w.Number:
    case w.String:
      return (r) => {
        for (let o = 0; o < i; ++o) {
          const a = n[o](r);
          if (typeof a === e) return a;
        }
        throw new Error(`Expected one of the values to be a ${e}`);
      };
    default:
      throw new Error(`Unsupported assertion operator ${e}`);
  }
}
function af(s, t) {
  const i = s.args[0].value;
  switch (s.operator) {
    case w.Get:
      return (n) => {
        const r = s.args;
        let o = n.properties[i];
        for (let a = 1, l = r.length; a < l; ++a) {
          const h = r[a].value;
          o = o[h];
        }
        return o;
      };
    case w.Var:
      return (n) => n.variables[i];
    case w.Has:
      return (n) => {
        const r = s.args;
        if (!(i in n.properties)) return !1;
        let o = n.properties[i];
        for (let a = 1, l = r.length; a < l; ++a) {
          const h = r[a].value;
          if (!o || !Object.hasOwn(o, h)) return !1;
          o = o[h];
        }
        return !0;
      };
    default:
      throw new Error(`Unsupported accessor operator ${s.operator}`);
  }
}
function lf(s, t) {
  const e = s.operator,
    i = he(s.args[0]),
    n = he(s.args[1]);
  switch (e) {
    case w.Equal:
      return (r) => i(r) === n(r);
    case w.NotEqual:
      return (r) => i(r) !== n(r);
    case w.LessThan:
      return (r) => i(r) < n(r);
    case w.LessThanOrEqualTo:
      return (r) => i(r) <= n(r);
    case w.GreaterThan:
      return (r) => i(r) > n(r);
    case w.GreaterThanOrEqualTo:
      return (r) => i(r) >= n(r);
    default:
      throw new Error(`Unsupported comparison operator ${e}`);
  }
}
function hf(s, t) {
  const e = s.operator,
    i = s.args.length,
    n = new Array(i);
  for (let r = 0; r < i; ++r) n[r] = he(s.args[r]);
  switch (e) {
    case w.Any:
      return (r) => {
        for (let o = 0; o < i; ++o) if (n[o](r)) return !0;
        return !1;
      };
    case w.All:
      return (r) => {
        for (let o = 0; o < i; ++o) if (!n[o](r)) return !1;
        return !0;
      };
    case w.Between:
      return (r) => {
        const o = n[0](r),
          a = n[1](r),
          l = n[2](r);
        return o >= a && o <= l;
      };
    case w.In:
      return (r) => {
        const o = n[0](r);
        for (let a = 1; a < i; ++a) if (o === n[a](r)) return !0;
        return !1;
      };
    case w.Not:
      return (r) => !n[0](r);
    default:
      throw new Error(`Unsupported logical operator ${e}`);
  }
}
function cf(s, t) {
  const e = s.operator,
    i = s.args.length,
    n = new Array(i);
  for (let r = 0; r < i; ++r) n[r] = he(s.args[r]);
  switch (e) {
    case w.Multiply:
      return (r) => {
        let o = 1;
        for (let a = 0; a < i; ++a) o *= n[a](r);
        return o;
      };
    case w.Divide:
      return (r) => n[0](r) / n[1](r);
    case w.Add:
      return (r) => {
        let o = 0;
        for (let a = 0; a < i; ++a) o += n[a](r);
        return o;
      };
    case w.Subtract:
      return (r) => n[0](r) - n[1](r);
    case w.Clamp:
      return (r) => {
        const o = n[0](r),
          a = n[1](r);
        if (o < a) return a;
        const l = n[2](r);
        return o > l ? l : o;
      };
    case w.Mod:
      return (r) => n[0](r) % n[1](r);
    case w.Pow:
      return (r) => Math.pow(n[0](r), n[1](r));
    case w.Abs:
      return (r) => Math.abs(n[0](r));
    case w.Floor:
      return (r) => Math.floor(n[0](r));
    case w.Ceil:
      return (r) => Math.ceil(n[0](r));
    case w.Round:
      return (r) => Math.round(n[0](r));
    case w.Sin:
      return (r) => Math.sin(n[0](r));
    case w.Cos:
      return (r) => Math.cos(n[0](r));
    case w.Atan:
      return i === 2
        ? (r) => Math.atan2(n[0](r), n[1](r))
        : (r) => Math.atan(n[0](r));
    case w.Sqrt:
      return (r) => Math.sqrt(n[0](r));
    default:
      throw new Error(`Unsupported numeric operator ${e}`);
  }
}
function uf(s, t) {
  const e = s.args.length,
    i = new Array(e);
  for (let n = 0; n < e; ++n) i[n] = he(s.args[n]);
  return (n) => {
    for (let r = 0; r < e - 1; r += 2) if (i[r](n)) return i[r + 1](n);
    return i[e - 1](n);
  };
}
function df(s, t) {
  const e = s.args.length,
    i = new Array(e);
  for (let n = 0; n < e; ++n) i[n] = he(s.args[n]);
  return (n) => {
    const r = i[0](n);
    for (let o = 1; o < e - 1; o += 2) if (r === i[o](n)) return i[o + 1](n);
    return i[e - 1](n);
  };
}
function ff(s, t) {
  const e = s.args.length,
    i = new Array(e);
  for (let n = 0; n < e; ++n) i[n] = he(s.args[n]);
  return (n) => {
    const r = i[0](n),
      o = i[1](n);
    let a, l;
    for (let c = 2; c < e; c += 2) {
      const h = i[c](n);
      let u = i[c + 1](n);
      const d = Array.isArray(u);
      if ((d && (u = Wu(u)), h >= o))
        return c === 2 ? u : d ? _f(r, o, a, l, h, u) : Sn(r, o, a, l, h, u);
      (a = h), (l = u);
    }
    return l;
  };
}
function gf(s, t) {
  const e = s.operator,
    i = s.args.length,
    n = new Array(i);
  for (let r = 0; r < i; ++r) n[r] = he(s.args[r]);
  switch (e) {
    case w.ToString:
      return (r) => {
        const o = n[0](r);
        return s.args[0].type === se ? Ko(o) : o.toString();
      };
    default:
      throw new Error(`Unsupported convert operator ${e}`);
  }
}
function Sn(s, t, e, i, n, r) {
  const o = n - e;
  if (o === 0) return i;
  const a = t - e,
    l = s === 1 ? a / o : (Math.pow(s, a) - 1) / (Math.pow(s, o) - 1);
  return i + l * (r - i);
}
function _f(s, t, e, i, n, r) {
  if (n - e === 0) return i;
  const a = Va(i),
    l = Va(r);
  let c = l[2] - a[2];
  c > 180 ? (c -= 360) : c < -180 && (c += 360);
  const h = [
    Sn(s, t, e, a[0], n, l[0]),
    Sn(s, t, e, a[1], n, l[1]),
    a[2] + Sn(s, t, e, 0, n, c),
    Sn(s, t, e, i[3], n, r[3]),
  ];
  return ju(h);
}
function mf(s) {
  return !0;
}
function yf(s) {
  const t = Ph(),
    e = pf(s, t),
    i = bh();
  return function (n, r) {
    if (
      ((i.properties = n.getPropertiesInternal()),
      (i.resolution = r),
      t.featureId)
    ) {
      const o = n.getId();
      o !== void 0 ? (i.featureId = o) : (i.featureId = null);
    }
    return t.geometryType && (i.geometryType = Fh(n.getGeometry())), e(i);
  };
}
function dl(s) {
  const t = Ph(),
    e = s.length,
    i = new Array(e);
  for (let o = 0; o < e; ++o) i[o] = oo(s[o], t);
  const n = bh(),
    r = new Array(e);
  return function (o, a) {
    if (
      ((n.properties = o.getPropertiesInternal()),
      (n.resolution = a),
      t.featureId)
    ) {
      const c = o.getId();
      c !== void 0 ? (n.featureId = c) : (n.featureId = null);
    }
    let l = 0;
    for (let c = 0; c < e; ++c) {
      const h = i[c](n);
      h && ((r[l] = h), (l += 1));
    }
    return (r.length = l), r;
  };
}
function pf(s, t) {
  const e = s.length,
    i = new Array(e);
  for (let n = 0; n < e; ++n) {
    const r = s[n],
      o = "filter" in r ? Be(r.filter, At, t) : mf;
    let a;
    if (Array.isArray(r.style)) {
      const l = r.style.length;
      a = new Array(l);
      for (let c = 0; c < l; ++c) a[c] = oo(r.style[c], t);
    } else a = [oo(r.style, t)];
    i[n] = { filter: o, styles: a };
  }
  return function (n) {
    const r = [];
    let o = !1;
    for (let a = 0; a < e; ++a) {
      const l = i[a].filter;
      if (l(n) && !(s[a].else && o)) {
        o = !0;
        for (const c of i[a].styles) {
          const h = c(n);
          h && r.push(h);
        }
      }
    }
    return r;
  };
}
function oo(s, t) {
  const e = zn(s, "", t),
    i = Xn(s, "", t),
    n = xf(s, t),
    r = Ef(s, t),
    o = zt(s, "z-index", t);
  if (!e && !i && !n && !r && !mi(s))
    throw new Error(
      "No fill, stroke, point, or text symbolizer properties in style: " +
        JSON.stringify(s),
    );
  const a = new mt();
  return function (l) {
    let c = !0;
    if (e) {
      const h = e(l);
      h && (c = !1), a.setFill(h);
    }
    if (i) {
      const h = i(l);
      h && (c = !1), a.setStroke(h);
    }
    if (n) {
      const h = n(l);
      h && (c = !1), a.setText(h);
    }
    if (r) {
      const h = r(l);
      h && (c = !1), a.setImage(h);
    }
    return o && a.setZIndex(o(l)), c ? null : a;
  };
}
function zn(s, t, e) {
  let i;
  if (t + "fill-pattern-src" in s) i = Tf(s, t + "fill-", e);
  else {
    if (s[t + "fill-color"] === "none") return (r) => null;
    i = $o(s, t + "fill-color", e);
  }
  if (!i) return null;
  const n = new le();
  return function (r) {
    const o = i(r);
    return o === Yo ? null : (n.setColor(o), n);
  };
}
function Xn(s, t, e) {
  const i = zt(s, t + "stroke-width", e),
    n = $o(s, t + "stroke-color", e);
  if (!i && !n) return null;
  const r = Ie(s, t + "stroke-line-cap", e),
    o = Ie(s, t + "stroke-line-join", e),
    a = Ah(s, t + "stroke-line-dash", e),
    l = zt(s, t + "stroke-line-dash-offset", e),
    c = zt(s, t + "stroke-miter-limit", e),
    h = new Lt();
  return function (u) {
    if (n) {
      const d = n(u);
      if (d === Yo) return null;
      h.setColor(d);
    }
    if ((i && h.setWidth(i(u)), r)) {
      const d = r(u);
      if (d !== "butt" && d !== "round" && d !== "square")
        throw new Error("Expected butt, round, or square line cap");
      h.setLineCap(d);
    }
    if (o) {
      const d = o(u);
      if (d !== "bevel" && d !== "round" && d !== "miter")
        throw new Error("Expected bevel, round, or miter line join");
      h.setLineJoin(d);
    }
    return (
      a && h.setLineDash(a(u)),
      l && h.setLineDashOffset(l(u)),
      c && h.setMiterLimit(c(u)),
      h
    );
  };
}
function xf(s, t) {
  const e = "text-",
    i = Ie(s, e + "value", t);
  if (!i) return null;
  const n = zn(s, e, t),
    r = zn(s, e + "background-", t),
    o = Xn(s, e, t),
    a = Xn(s, e + "background-", t),
    l = Ie(s, e + "font", t),
    c = zt(s, e + "max-angle", t),
    h = zt(s, e + "offset-x", t),
    u = zt(s, e + "offset-y", t),
    d = Ki(s, e + "overflow", t),
    f = Ie(s, e + "placement", t),
    g = zt(s, e + "repeat", t),
    _ = rr(s, e + "scale", t),
    m = Ki(s, e + "rotate-with-view", t),
    y = zt(s, e + "rotation", t),
    p = Ie(s, e + "align", t),
    C = Ie(s, e + "justify", t),
    x = Ie(s, e + "baseline", t),
    E = Ki(s, e + "keep-upright", t),
    R = Ah(s, e + "padding", t),
    L = or(s, e + "declutter-mode"),
    I = new sr({ declutterMode: L });
  return function (M) {
    if (
      (I.setText(i(M)),
      n && I.setFill(n(M)),
      r && I.setBackgroundFill(r(M)),
      o && I.setStroke(o(M)),
      a && I.setBackgroundStroke(a(M)),
      l && I.setFont(l(M)),
      c && I.setMaxAngle(c(M)),
      h && I.setOffsetX(h(M)),
      u && I.setOffsetY(u(M)),
      d && I.setOverflow(d(M)),
      f)
    ) {
      const F = f(M);
      if (F !== "point" && F !== "line")
        throw new Error("Expected point or line for text-placement");
      I.setPlacement(F);
    }
    if (
      (g && I.setRepeat(g(M)),
      _ && I.setScale(_(M)),
      m && I.setRotateWithView(m(M)),
      y && I.setRotation(y(M)),
      p)
    ) {
      const F = p(M);
      if (
        F !== "left" &&
        F !== "center" &&
        F !== "right" &&
        F !== "end" &&
        F !== "start"
      )
        throw new Error(
          "Expected left, right, center, start, or end for text-align",
        );
      I.setTextAlign(F);
    }
    if (C) {
      const F = C(M);
      if (F !== "left" && F !== "right" && F !== "center")
        throw new Error("Expected left, right, or center for text-justify");
      I.setJustify(F);
    }
    if (x) {
      const F = x(M);
      if (
        F !== "bottom" &&
        F !== "top" &&
        F !== "middle" &&
        F !== "alphabetic" &&
        F !== "hanging"
      )
        throw new Error(
          "Expected bottom, top, middle, alphabetic, or hanging for text-baseline",
        );
      I.setTextBaseline(F);
    }
    return R && I.setPadding(R(M)), E && I.setKeepUpright(E(M)), I;
  };
}
function Ef(s, t) {
  return "icon-src" in s
    ? Cf(s, t)
    : "shape-points" in s
      ? wf(s, t)
      : "circle-radius" in s
        ? Sf(s, t)
        : null;
}
function Cf(s, t) {
  const e = "icon-",
    i = e + "src",
    n = Dh(s[i], i),
    r = Ds(s, e + "anchor", t),
    o = rr(s, e + "scale", t),
    a = zt(s, e + "opacity", t),
    l = Ds(s, e + "displacement", t),
    c = zt(s, e + "rotation", t),
    h = Ki(s, e + "rotate-with-view", t),
    u = gl(s, e + "anchor-origin"),
    d = _l(s, e + "anchor-x-units"),
    f = _l(s, e + "anchor-y-units"),
    g = Lf(s, e + "color"),
    _ = vf(s, e + "cross-origin"),
    m = If(s, e + "offset"),
    y = gl(s, e + "offset-origin"),
    p = Os(s, e + "width"),
    C = Os(s, e + "height"),
    x = Rf(s, e + "size"),
    E = or(s, e + "declutter-mode"),
    R = new $n({
      src: n,
      anchorOrigin: u,
      anchorXUnits: d,
      anchorYUnits: f,
      color: g,
      crossOrigin: _,
      offset: m,
      offsetOrigin: y,
      height: C,
      width: p,
      size: x,
      declutterMode: E,
    });
  return function (L) {
    return (
      a && R.setOpacity(a(L)),
      l && R.setDisplacement(l(L)),
      c && R.setRotation(c(L)),
      h && R.setRotateWithView(h(L)),
      o && R.setScale(o(L)),
      r && R.setAnchor(r(L)),
      R
    );
  };
}
function wf(s, t) {
  const e = "shape-",
    i = e + "points",
    n = e + "radius",
    r = ao(s[i], i),
    o = ao(s[n], n),
    a = zn(s, e, t),
    l = Xn(s, e, t),
    c = rr(s, e + "scale", t),
    h = Ds(s, e + "displacement", t),
    u = zt(s, e + "rotation", t),
    d = Ki(s, e + "rotate-with-view", t),
    f = Os(s, e + "radius2"),
    g = Os(s, e + "angle"),
    _ = or(s, e + "declutter-mode"),
    m = new nr({
      points: r,
      radius: o,
      radius2: f,
      angle: g,
      declutterMode: _,
    });
  return function (y) {
    return (
      a && m.setFill(a(y)),
      l && m.setStroke(l(y)),
      h && m.setDisplacement(h(y)),
      u && m.setRotation(u(y)),
      d && m.setRotateWithView(d(y)),
      c && m.setScale(c(y)),
      m
    );
  };
}
function Sf(s, t) {
  const e = "circle-",
    i = zn(s, e, t),
    n = Xn(s, e, t),
    r = zt(s, e + "radius", t),
    o = rr(s, e + "scale", t),
    a = Ds(s, e + "displacement", t),
    l = zt(s, e + "rotation", t),
    c = Ki(s, e + "rotate-with-view", t),
    h = or(s, e + "declutter-mode"),
    u = new ei({ radius: 5, declutterMode: h });
  return function (d) {
    return (
      r && u.setRadius(r(d)),
      i && u.setFill(i(d)),
      n && u.setStroke(n(d)),
      a && u.setDisplacement(a(d)),
      l && u.setRotation(l(d)),
      c && u.setRotateWithView(c(d)),
      o && u.setScale(o(d)),
      u
    );
  };
}
function zt(s, t, e) {
  if (!(t in s)) return;
  const i = Be(s[t], et, e);
  return function (n) {
    return ao(i(n), t);
  };
}
function Ie(s, t, e) {
  if (!(t in s)) return null;
  const i = Be(s[t], Bt, e);
  return function (n) {
    return Dh(i(n), t);
  };
}
function Tf(s, t, e) {
  const i = Ie(s, t + "pattern-src", e),
    n = fl(s, t + "pattern-offset", e),
    r = fl(s, t + "pattern-size", e),
    o = $o(s, t + "color", e);
  return function (a) {
    return { src: i(a), offset: n && n(a), size: r && r(a), color: o && o(a) };
  };
}
function Ki(s, t, e) {
  if (!(t in s)) return null;
  const i = Be(s[t], At, e);
  return function (n) {
    const r = i(n);
    if (typeof r != "boolean") throw new Error(`Expected a boolean for ${t}`);
    return r;
  };
}
function $o(s, t, e) {
  if (!(t in s)) return null;
  const i = Be(s[t], se, e);
  return function (n) {
    return Oh(i(n), t);
  };
}
function Ah(s, t, e) {
  if (!(t in s)) return null;
  const i = Be(s[t], pi, e);
  return function (n) {
    return Jn(i(n), t);
  };
}
function Ds(s, t, e) {
  if (!(t in s)) return null;
  const i = Be(s[t], pi, e);
  return function (n) {
    const r = Jn(i(n), t);
    if (r.length !== 2) throw new Error(`Expected two numbers for ${t}`);
    return r;
  };
}
function fl(s, t, e) {
  if (!(t in s)) return null;
  const i = Be(s[t], pi, e);
  return function (n) {
    return kh(i(n), t);
  };
}
function rr(s, t, e) {
  if (!(t in s)) return null;
  const i = Be(s[t], pi | et, e);
  return function (n) {
    return Mf(i(n), t);
  };
}
function Os(s, t) {
  const e = s[t];
  if (e !== void 0) {
    if (typeof e != "number") throw new Error(`Expected a number for ${t}`);
    return e;
  }
}
function Rf(s, t) {
  const e = s[t];
  if (e !== void 0) {
    if (typeof e == "number") return Wt(e);
    if (!Array.isArray(e))
      throw new Error(`Expected a number or size array for ${t}`);
    if (e.length !== 2 || typeof e[0] != "number" || typeof e[1] != "number")
      throw new Error(`Expected a number or size array for ${t}`);
    return e;
  }
}
function vf(s, t) {
  const e = s[t];
  if (e !== void 0) {
    if (typeof e != "string") throw new Error(`Expected a string for ${t}`);
    return e;
  }
}
function gl(s, t) {
  const e = s[t];
  if (e !== void 0) {
    if (
      e !== "bottom-left" &&
      e !== "bottom-right" &&
      e !== "top-left" &&
      e !== "top-right"
    )
      throw new Error(
        `Expected bottom-left, bottom-right, top-left, or top-right for ${t}`,
      );
    return e;
  }
}
function _l(s, t) {
  const e = s[t];
  if (e !== void 0) {
    if (e !== "pixels" && e !== "fraction")
      throw new Error(`Expected pixels or fraction for ${t}`);
    return e;
  }
}
function If(s, t) {
  const e = s[t];
  if (e !== void 0) return Jn(e, t);
}
function or(s, t) {
  const e = s[t];
  if (e !== void 0) {
    if (typeof e != "string") throw new Error(`Expected a string for ${t}`);
    if (e !== "declutter" && e !== "obstacle" && e !== "none")
      throw new Error(`Expected declutter, obstacle, or none for ${t}`);
    return e;
  }
}
function Lf(s, t) {
  const e = s[t];
  if (e !== void 0) return Oh(e, t);
}
function Jn(s, t) {
  if (!Array.isArray(s)) throw new Error(`Expected an array for ${t}`);
  const e = s.length;
  for (let i = 0; i < e; ++i)
    if (typeof s[i] != "number")
      throw new Error(`Expected an array of numbers for ${t}`);
  return s;
}
function Dh(s, t) {
  if (typeof s != "string") throw new Error(`Expected a string for ${t}`);
  return s;
}
function ao(s, t) {
  if (typeof s != "number") throw new Error(`Expected a number for ${t}`);
  return s;
}
function Oh(s, t) {
  if (typeof s == "string") return s;
  const e = Jn(s, t),
    i = e.length;
  if (i < 3 || i > 4)
    throw new Error(`Expected a color with 3 or 4 values for ${t}`);
  return e;
}
function kh(s, t) {
  const e = Jn(s, t);
  if (e.length !== 2)
    throw new Error(`Expected an array of two numbers for ${t}`);
  return e;
}
function Mf(s, t) {
  return typeof s == "number" ? s : kh(s, t);
}
const ne = { CENTER: "center", RESOLUTION: "resolution", ROTATION: "rotation" };
function ml(s, t, e) {
  return function (i, n, r, o, a) {
    if (!i) return;
    if (!n && !t) return i;
    const l = t ? 0 : r[0] * n,
      c = t ? 0 : r[1] * n,
      h = a ? a[0] : 0,
      u = a ? a[1] : 0;
    let d = s[0] + l / 2 + h,
      f = s[2] - l / 2 + h,
      g = s[1] + c / 2 + u,
      _ = s[3] - c / 2 + u;
    d > f && ((d = (f + d) / 2), (f = d)),
      g > _ && ((g = (_ + g) / 2), (_ = g));
    let m = ct(i[0], d, f),
      y = ct(i[1], g, _);
    if (o && e && n) {
      const p = 30 * n;
      (m +=
        -p * Math.log(1 + Math.max(0, d - i[0]) / p) +
        p * Math.log(1 + Math.max(0, i[0] - f) / p)),
        (y +=
          -p * Math.log(1 + Math.max(0, g - i[1]) / p) +
          p * Math.log(1 + Math.max(0, i[1] - _) / p));
    }
    return [m, y];
  };
}
function Pf(s) {
  return s;
}
function Gh(s) {
  return Math.pow(s, 3);
}
function an(s) {
  return 1 - Gh(1 - s);
}
function Ff(s) {
  return 3 * s * s - 2 * s * s * s;
}
function bf(s) {
  return s;
}
function Jo(s, t, e, i) {
  const n = at(t) / e[0],
    r = Ot(t) / e[1];
  return i ? Math.min(s, Math.max(n, r)) : Math.min(s, Math.min(n, r));
}
function Qo(s, t, e) {
  let i = Math.min(s, t);
  const n = 50;
  return (
    (i *= Math.log(1 + n * Math.max(0, s / t - 1)) / n + 1),
    e &&
      ((i = Math.max(i, e)),
      (i /= Math.log(1 + n * Math.max(0, e / s - 1)) / n + 1)),
    ct(i, e / 2, t * 2)
  );
}
function Af(s, t, e, i) {
  return (
    (t = t !== void 0 ? t : !0),
    function (n, r, o, a) {
      if (n !== void 0) {
        const l = s[0],
          c = s[s.length - 1],
          h = e ? Jo(l, e, o, i) : l;
        if (a) return t ? Qo(n, h, c) : ct(n, c, h);
        const u = Math.min(h, n),
          d = Math.floor(Eo(s, u, r));
        return s[d] > h && d < s.length - 1 ? s[d + 1] : s[d];
      }
    }
  );
}
function Df(s, t, e, i, n, r) {
  return (
    (i = i !== void 0 ? i : !0),
    (e = e !== void 0 ? e : 0),
    function (o, a, l, c) {
      if (o !== void 0) {
        const h = n ? Jo(t, n, l, r) : t;
        if (c) return i ? Qo(o, h, e) : ct(o, e, h);
        const u = 1e-9,
          d = Math.ceil(Math.log(t / h) / Math.log(s) - u),
          f = -a * (0.5 - u) + 0.5,
          g = Math.min(h, o),
          _ = Math.floor(Math.log(t / g) / Math.log(s) + f),
          m = Math.max(d, _),
          y = t / Math.pow(s, m);
        return ct(y, e, h);
      }
    }
  );
}
function yl(s, t, e, i, n) {
  return (
    (e = e !== void 0 ? e : !0),
    function (r, o, a, l) {
      if (r !== void 0) {
        const c = i ? Jo(s, i, a, n) : s;
        return !e || !l ? ct(r, t, c) : Qo(r, c, t);
      }
    }
  );
}
function ta(s) {
  if (s !== void 0) return 0;
}
function pl(s) {
  if (s !== void 0) return s;
}
function Of(s) {
  const t = (2 * Math.PI) / s;
  return function (e, i) {
    if (i) return e;
    if (e !== void 0) return (e = Math.floor(e / t + 0.5) * t), e;
  };
}
function kf(s) {
  const t = $e(5);
  return function (e, i) {
    return i || e === void 0 ? e : Math.abs(e) <= t ? 0 : e;
  };
}
const Gf = 42,
  ea = 256,
  br = 0;
class ge extends me {
  constructor(t) {
    super(),
      this.on,
      this.once,
      this.un,
      (t = Object.assign({}, t)),
      (this.hints_ = [0, 0]),
      (this.animations_ = []),
      this.updateAnimationKey_,
      (this.projection_ = Fo(t.projection, "EPSG:3857")),
      (this.viewportSize_ = [100, 100]),
      (this.targetCenter_ = null),
      this.targetResolution_,
      this.targetRotation_,
      (this.nextCenter_ = null),
      this.nextResolution_,
      this.nextRotation_,
      (this.cancelAnchor_ = void 0),
      t.projection && iu(),
      t.center && (t.center = ht(t.center, this.projection_)),
      t.extent && (t.extent = Le(t.extent, this.projection_)),
      this.applyOptions_(t);
  }
  applyOptions_(t) {
    const e = Object.assign({}, t);
    for (const a in ne) delete e[a];
    this.setProperties(e, !0);
    const i = Bf(t);
    (this.maxResolution_ = i.maxResolution),
      (this.minResolution_ = i.minResolution),
      (this.zoomFactor_ = i.zoomFactor),
      (this.resolutions_ = t.resolutions),
      (this.padding_ = t.padding),
      (this.minZoom_ = i.minZoom);
    const n = Nf(t),
      r = i.constraint,
      o = zf(t);
    (this.constraints_ = { center: n, resolution: r, rotation: o }),
      this.setRotation(t.rotation !== void 0 ? t.rotation : 0),
      this.setCenterInternal(t.center !== void 0 ? t.center : null),
      t.resolution !== void 0
        ? this.setResolution(t.resolution)
        : t.zoom !== void 0 && this.setZoom(t.zoom);
  }
  get padding() {
    return this.padding_;
  }
  set padding(t) {
    let e = this.padding_;
    this.padding_ = t;
    const i = this.getCenterInternal();
    if (i) {
      const n = t || [0, 0, 0, 0];
      e = e || [0, 0, 0, 0];
      const r = this.getResolution(),
        o = (r / 2) * (n[3] - e[3] + e[1] - n[1]),
        a = (r / 2) * (n[0] - e[0] + e[2] - n[2]);
      this.setCenterInternal([i[0] + o, i[1] - a]);
    }
  }
  getUpdatedOptions_(t) {
    const e = this.getProperties();
    return (
      e.resolution !== void 0
        ? (e.resolution = this.getResolution())
        : (e.zoom = this.getZoom()),
      (e.center = this.getCenterInternal()),
      (e.rotation = this.getRotation()),
      Object.assign({}, e, t)
    );
  }
  animate(t) {
    this.isDef() && !this.getAnimating() && this.resolveConstraints(0);
    const e = new Array(arguments.length);
    for (let i = 0; i < e.length; ++i) {
      let n = arguments[i];
      n.center &&
        ((n = Object.assign({}, n)),
        (n.center = ht(n.center, this.getProjection()))),
        n.anchor &&
          ((n = Object.assign({}, n)),
          (n.anchor = ht(n.anchor, this.getProjection()))),
        (e[i] = n);
    }
    this.animateInternal.apply(this, e);
  }
  animateInternal(t) {
    let e = arguments.length,
      i;
    e > 1 &&
      typeof arguments[e - 1] == "function" &&
      ((i = arguments[e - 1]), --e);
    let n = 0;
    for (; n < e && !this.isDef(); ++n) {
      const h = arguments[n];
      h.center && this.setCenterInternal(h.center),
        h.zoom !== void 0
          ? this.setZoom(h.zoom)
          : h.resolution && this.setResolution(h.resolution),
        h.rotation !== void 0 && this.setRotation(h.rotation);
    }
    if (n === e) {
      i && us(i, !0);
      return;
    }
    let r = Date.now(),
      o = this.targetCenter_.slice(),
      a = this.targetResolution_,
      l = this.targetRotation_;
    const c = [];
    for (; n < e; ++n) {
      const h = arguments[n],
        u = {
          start: r,
          complete: !1,
          anchor: h.anchor,
          duration: h.duration !== void 0 ? h.duration : 1e3,
          easing: h.easing || Ff,
          callback: i,
        };
      if (
        (h.center &&
          ((u.sourceCenter = o),
          (u.targetCenter = h.center.slice()),
          (o = u.targetCenter)),
        h.zoom !== void 0
          ? ((u.sourceResolution = a),
            (u.targetResolution = this.getResolutionForZoom(h.zoom)),
            (a = u.targetResolution))
          : h.resolution &&
            ((u.sourceResolution = a),
            (u.targetResolution = h.resolution),
            (a = u.targetResolution)),
        h.rotation !== void 0)
      ) {
        u.sourceRotation = l;
        const d = _i(h.rotation - l + Math.PI, 2 * Math.PI) - Math.PI;
        (u.targetRotation = l + d), (l = u.targetRotation);
      }
      Xf(u) ? (u.complete = !0) : (r += u.duration), c.push(u);
    }
    this.animations_.push(c),
      this.setHint(vt.ANIMATING, 1),
      this.updateAnimations_();
  }
  getAnimating() {
    return this.hints_[vt.ANIMATING] > 0;
  }
  getInteracting() {
    return this.hints_[vt.INTERACTING] > 0;
  }
  cancelAnimations() {
    this.setHint(vt.ANIMATING, -this.hints_[vt.ANIMATING]);
    let t;
    for (let e = 0, i = this.animations_.length; e < i; ++e) {
      const n = this.animations_[e];
      if ((n[0].callback && us(n[0].callback, !1), !t))
        for (let r = 0, o = n.length; r < o; ++r) {
          const a = n[r];
          if (!a.complete) {
            t = a.anchor;
            break;
          }
        }
    }
    (this.animations_.length = 0),
      (this.cancelAnchor_ = t),
      (this.nextCenter_ = null),
      (this.nextResolution_ = NaN),
      (this.nextRotation_ = NaN);
  }
  updateAnimations_() {
    if (
      (this.updateAnimationKey_ !== void 0 &&
        (cancelAnimationFrame(this.updateAnimationKey_),
        (this.updateAnimationKey_ = void 0)),
      !this.getAnimating())
    )
      return;
    const t = Date.now();
    let e = !1;
    for (let i = this.animations_.length - 1; i >= 0; --i) {
      const n = this.animations_[i];
      let r = !0;
      for (let o = 0, a = n.length; o < a; ++o) {
        const l = n[o];
        if (l.complete) continue;
        const c = t - l.start;
        let h = l.duration > 0 ? c / l.duration : 1;
        h >= 1 ? ((l.complete = !0), (h = 1)) : (r = !1);
        const u = l.easing(h);
        if (l.sourceCenter) {
          const d = l.sourceCenter[0],
            f = l.sourceCenter[1],
            g = l.targetCenter[0],
            _ = l.targetCenter[1];
          this.nextCenter_ = l.targetCenter;
          const m = d + u * (g - d),
            y = f + u * (_ - f);
          this.targetCenter_ = [m, y];
        }
        if (l.sourceResolution && l.targetResolution) {
          const d =
            u === 1
              ? l.targetResolution
              : l.sourceResolution +
                u * (l.targetResolution - l.sourceResolution);
          if (l.anchor) {
            const f = this.getViewportSize_(this.getRotation()),
              g = this.constraints_.resolution(d, 0, f, !0);
            this.targetCenter_ = this.calculateCenterZoom(g, l.anchor);
          }
          (this.nextResolution_ = l.targetResolution),
            (this.targetResolution_ = d),
            this.applyTargetState_(!0);
        }
        if (l.sourceRotation !== void 0 && l.targetRotation !== void 0) {
          const d =
            u === 1
              ? _i(l.targetRotation + Math.PI, 2 * Math.PI) - Math.PI
              : l.sourceRotation + u * (l.targetRotation - l.sourceRotation);
          if (l.anchor) {
            const f = this.constraints_.rotation(d, !0);
            this.targetCenter_ = this.calculateCenterRotate(f, l.anchor);
          }
          (this.nextRotation_ = l.targetRotation), (this.targetRotation_ = d);
        }
        if ((this.applyTargetState_(!0), (e = !0), !l.complete)) break;
      }
      if (r) {
        (this.animations_[i] = null),
          this.setHint(vt.ANIMATING, -1),
          (this.nextCenter_ = null),
          (this.nextResolution_ = NaN),
          (this.nextRotation_ = NaN);
        const o = n[0].callback;
        o && us(o, !0);
      }
    }
    (this.animations_ = this.animations_.filter(Boolean)),
      e &&
        this.updateAnimationKey_ === void 0 &&
        (this.updateAnimationKey_ = requestAnimationFrame(
          this.updateAnimations_.bind(this),
        ));
  }
  calculateCenterRotate(t, e) {
    let i;
    const n = this.getCenterInternal();
    return (
      n !== void 0 &&
        ((i = [n[0] - e[0], n[1] - e[1]]),
        Ro(i, t - this.getRotation()),
        Ic(i, e)),
      i
    );
  }
  calculateCenterZoom(t, e) {
    let i;
    const n = this.getCenterInternal(),
      r = this.getResolution();
    if (n !== void 0 && r !== void 0) {
      const o = e[0] - (t * (e[0] - n[0])) / r,
        a = e[1] - (t * (e[1] - n[1])) / r;
      i = [o, a];
    }
    return i;
  }
  getViewportSize_(t) {
    const e = this.viewportSize_;
    if (t) {
      const i = e[0],
        n = e[1];
      return [
        Math.abs(i * Math.cos(t)) + Math.abs(n * Math.sin(t)),
        Math.abs(i * Math.sin(t)) + Math.abs(n * Math.cos(t)),
      ];
    }
    return e;
  }
  setViewportSize(t) {
    (this.viewportSize_ = Array.isArray(t) ? t.slice() : [100, 100]),
      this.getAnimating() || this.resolveConstraints(0);
  }
  getCenter() {
    const t = this.getCenterInternal();
    return t && ti(t, this.getProjection());
  }
  getCenterInternal() {
    return this.get(ne.CENTER);
  }
  getConstraints() {
    return this.constraints_;
  }
  getConstrainResolution() {
    return this.get("constrainResolution");
  }
  getHints(t) {
    return t !== void 0
      ? ((t[0] = this.hints_[0]), (t[1] = this.hints_[1]), t)
      : this.hints_.slice();
  }
  calculateExtent(t) {
    const e = this.calculateExtentInternal(t);
    return Hs(e, this.getProjection());
  }
  calculateExtentInternal(t) {
    t = t || this.getViewportSizeMinusPadding_();
    const e = this.getCenterInternal();
    st(e, "The view center is not defined");
    const i = this.getResolution();
    st(i !== void 0, "The view resolution is not defined");
    const n = this.getRotation();
    return st(n !== void 0, "The view rotation is not defined"), qr(e, i, n, t);
  }
  getMaxResolution() {
    return this.maxResolution_;
  }
  getMinResolution() {
    return this.minResolution_;
  }
  getMaxZoom() {
    return this.getZoomForResolution(this.minResolution_);
  }
  setMaxZoom(t) {
    this.applyOptions_(this.getUpdatedOptions_({ maxZoom: t }));
  }
  getMinZoom() {
    return this.getZoomForResolution(this.maxResolution_);
  }
  setMinZoom(t) {
    this.applyOptions_(this.getUpdatedOptions_({ minZoom: t }));
  }
  setConstrainResolution(t) {
    this.applyOptions_(this.getUpdatedOptions_({ constrainResolution: t }));
  }
  getProjection() {
    return this.projection_;
  }
  getResolution() {
    return this.get(ne.RESOLUTION);
  }
  getResolutions() {
    return this.resolutions_;
  }
  getResolutionForExtent(t, e) {
    return this.getResolutionForExtentInternal(Le(t, this.getProjection()), e);
  }
  getResolutionForExtentInternal(t, e) {
    e = e || this.getViewportSizeMinusPadding_();
    const i = at(t) / e[0],
      n = Ot(t) / e[1];
    return Math.max(i, n);
  }
  getResolutionForValueFunction(t) {
    t = t || 2;
    const e = this.getConstrainedResolution(this.maxResolution_),
      i = this.minResolution_,
      n = Math.log(e / i) / Math.log(t);
    return function (r) {
      return e / Math.pow(t, r * n);
    };
  }
  getRotation() {
    return this.get(ne.ROTATION);
  }
  getValueForResolutionFunction(t) {
    const e = Math.log(t || 2),
      i = this.getConstrainedResolution(this.maxResolution_),
      n = this.minResolution_,
      r = Math.log(i / n) / e;
    return function (o) {
      return Math.log(i / o) / e / r;
    };
  }
  getViewportSizeMinusPadding_(t) {
    let e = this.getViewportSize_(t);
    const i = this.padding_;
    return i && (e = [e[0] - i[1] - i[3], e[1] - i[0] - i[2]]), e;
  }
  getState() {
    const t = this.getProjection(),
      e = this.getResolution(),
      i = this.getRotation();
    let n = this.getCenterInternal();
    const r = this.padding_;
    if (r) {
      const o = this.getViewportSizeMinusPadding_();
      n = Ar(
        n,
        this.getViewportSize_(),
        [o[0] / 2 + r[3], o[1] / 2 + r[0]],
        e,
        i,
      );
    }
    return {
      center: n.slice(0),
      projection: t !== void 0 ? t : null,
      resolution: e,
      nextCenter: this.nextCenter_,
      nextResolution: this.nextResolution_,
      nextRotation: this.nextRotation_,
      rotation: i,
      zoom: this.getZoom(),
    };
  }
  getViewStateAndExtent() {
    return { viewState: this.getState(), extent: this.calculateExtent() };
  }
  getZoom() {
    let t;
    const e = this.getResolution();
    return e !== void 0 && (t = this.getZoomForResolution(e)), t;
  }
  getZoomForResolution(t) {
    let e = this.minZoom_ || 0,
      i,
      n;
    if (this.resolutions_) {
      const r = Eo(this.resolutions_, t, 1);
      (e = r),
        (i = this.resolutions_[r]),
        r == this.resolutions_.length - 1
          ? (n = 2)
          : (n = i / this.resolutions_[r + 1]);
    } else (i = this.maxResolution_), (n = this.zoomFactor_);
    return e + Math.log(i / t) / Math.log(n);
  }
  getResolutionForZoom(t) {
    var e;
    if ((e = this.resolutions_) != null && e.length) {
      if (this.resolutions_.length === 1) return this.resolutions_[0];
      const i = ct(Math.floor(t), 0, this.resolutions_.length - 2),
        n = this.resolutions_[i] / this.resolutions_[i + 1];
      return this.resolutions_[i] / Math.pow(n, ct(t - i, 0, 1));
    }
    return this.maxResolution_ / Math.pow(this.zoomFactor_, t - this.minZoom_);
  }
  fit(t, e) {
    let i;
    if (
      (st(
        Array.isArray(t) || typeof t.getSimplifiedGeometry == "function",
        "Invalid extent or geometry provided as `geometry`",
      ),
      Array.isArray(t))
    ) {
      st(!Ks(t), "Cannot fit empty extent provided as `geometry`");
      const n = Le(t, this.getProjection());
      i = ja(n);
    } else if (t.getType() === "Circle") {
      const n = Le(t.getExtent(), this.getProjection());
      (i = ja(n)), i.rotate(this.getRotation(), Qe(n));
    } else i = t;
    this.fitInternal(i, e);
  }
  rotatedExtentForGeometry(t) {
    const e = this.getRotation(),
      i = Math.cos(e),
      n = Math.sin(-e),
      r = t.getFlatCoordinates(),
      o = t.getStride();
    let a = 1 / 0,
      l = 1 / 0,
      c = -1 / 0,
      h = -1 / 0;
    for (let u = 0, d = r.length; u < d; u += o) {
      const f = r[u] * i - r[u + 1] * n,
        g = r[u] * n + r[u + 1] * i;
      (a = Math.min(a, f)),
        (l = Math.min(l, g)),
        (c = Math.max(c, f)),
        (h = Math.max(h, g));
    }
    return [a, l, c, h];
  }
  fitInternal(t, e) {
    e = e || {};
    let i = e.size;
    i || (i = this.getViewportSizeMinusPadding_());
    const n = e.padding !== void 0 ? e.padding : [0, 0, 0, 0],
      r = e.nearest !== void 0 ? e.nearest : !1;
    let o;
    e.minResolution !== void 0
      ? (o = e.minResolution)
      : e.maxZoom !== void 0
        ? (o = this.getResolutionForZoom(e.maxZoom))
        : (o = 0);
    const a = this.rotatedExtentForGeometry(t);
    let l = this.getResolutionForExtentInternal(a, [
      i[0] - n[1] - n[3],
      i[1] - n[0] - n[2],
    ]);
    (l = isNaN(l) ? o : Math.max(l, o)),
      (l = this.getConstrainedResolution(l, r ? 0 : 1));
    const c = this.getRotation(),
      h = Math.sin(c),
      u = Math.cos(c),
      d = Qe(a);
    (d[0] += ((n[1] - n[3]) / 2) * l), (d[1] += ((n[0] - n[2]) / 2) * l);
    const f = d[0] * u - d[1] * h,
      g = d[1] * u + d[0] * h,
      _ = this.getConstrainedCenter([f, g], l),
      m = e.callback ? e.callback : Mn;
    e.duration !== void 0
      ? this.animateInternal(
          { resolution: l, center: _, duration: e.duration, easing: e.easing },
          m,
        )
      : ((this.targetResolution_ = l),
        (this.targetCenter_ = _),
        this.applyTargetState_(!1, !0),
        us(m, !0));
  }
  centerOn(t, e, i) {
    this.centerOnInternal(ht(t, this.getProjection()), e, i);
  }
  centerOnInternal(t, e, i) {
    this.setCenterInternal(
      Ar(t, e, i, this.getResolution(), this.getRotation()),
    );
  }
  calculateCenterShift(t, e, i, n) {
    let r;
    const o = this.padding_;
    if (o && t) {
      const a = this.getViewportSizeMinusPadding_(-i),
        l = Ar(t, n, [a[0] / 2 + o[3], a[1] / 2 + o[0]], e, i);
      r = [t[0] - l[0], t[1] - l[1]];
    }
    return r;
  }
  isDef() {
    return !!this.getCenterInternal() && this.getResolution() !== void 0;
  }
  adjustCenter(t) {
    const e = ti(this.targetCenter_, this.getProjection());
    this.setCenter([e[0] + t[0], e[1] + t[1]]);
  }
  adjustCenterInternal(t) {
    const e = this.targetCenter_;
    this.setCenterInternal([e[0] + t[0], e[1] + t[1]]);
  }
  adjustResolution(t, e) {
    (e = e && ht(e, this.getProjection())), this.adjustResolutionInternal(t, e);
  }
  adjustResolutionInternal(t, e) {
    const i = this.getAnimating() || this.getInteracting(),
      n = this.getViewportSize_(this.getRotation()),
      r = this.constraints_.resolution(this.targetResolution_ * t, 0, n, i);
    e && (this.targetCenter_ = this.calculateCenterZoom(r, e)),
      (this.targetResolution_ *= t),
      this.applyTargetState_();
  }
  adjustZoom(t, e) {
    this.adjustResolution(Math.pow(this.zoomFactor_, -t), e);
  }
  adjustRotation(t, e) {
    e && (e = ht(e, this.getProjection())), this.adjustRotationInternal(t, e);
  }
  adjustRotationInternal(t, e) {
    const i = this.getAnimating() || this.getInteracting(),
      n = this.constraints_.rotation(this.targetRotation_ + t, i);
    e && (this.targetCenter_ = this.calculateCenterRotate(n, e)),
      (this.targetRotation_ += t),
      this.applyTargetState_();
  }
  setCenter(t) {
    this.setCenterInternal(t && ht(t, this.getProjection()));
  }
  setCenterInternal(t) {
    (this.targetCenter_ = t), this.applyTargetState_();
  }
  setHint(t, e) {
    return (this.hints_[t] += e), this.changed(), this.hints_[t];
  }
  setResolution(t) {
    (this.targetResolution_ = t), this.applyTargetState_();
  }
  setRotation(t) {
    (this.targetRotation_ = t), this.applyTargetState_();
  }
  setZoom(t) {
    this.setResolution(this.getResolutionForZoom(t));
  }
  applyTargetState_(t, e) {
    const i = this.getAnimating() || this.getInteracting() || e,
      n = this.constraints_.rotation(this.targetRotation_, i),
      r = this.getViewportSize_(n),
      o = this.constraints_.resolution(this.targetResolution_, 0, r, i),
      a = this.constraints_.center(
        this.targetCenter_,
        o,
        r,
        i,
        this.calculateCenterShift(this.targetCenter_, o, n, r),
      );
    this.get(ne.ROTATION) !== n && this.set(ne.ROTATION, n),
      this.get(ne.RESOLUTION) !== o &&
        (this.set(ne.RESOLUTION, o), this.set("zoom", this.getZoom(), !0)),
      (!a || !this.get(ne.CENTER) || !bt(this.get(ne.CENTER), a)) &&
        this.set(ne.CENTER, a),
      this.getAnimating() && !t && this.cancelAnimations(),
      (this.cancelAnchor_ = void 0);
  }
  resolveConstraints(t, e, i) {
    t = t !== void 0 ? t : 200;
    const n = e || 0,
      r = this.constraints_.rotation(this.targetRotation_),
      o = this.getViewportSize_(r),
      a = this.constraints_.resolution(this.targetResolution_, n, o),
      l = this.constraints_.center(
        this.targetCenter_,
        a,
        o,
        !1,
        this.calculateCenterShift(this.targetCenter_, a, r, o),
      );
    if (t === 0 && !this.cancelAnchor_) {
      (this.targetResolution_ = a),
        (this.targetRotation_ = r),
        (this.targetCenter_ = l),
        this.applyTargetState_();
      return;
    }
    (i = i || (t === 0 ? this.cancelAnchor_ : void 0)),
      (this.cancelAnchor_ = void 0),
      (this.getResolution() !== a ||
        this.getRotation() !== r ||
        !this.getCenterInternal() ||
        !bt(this.getCenterInternal(), l)) &&
        (this.getAnimating() && this.cancelAnimations(),
        this.animateInternal({
          rotation: r,
          center: l,
          resolution: a,
          duration: t,
          easing: an,
          anchor: i,
        }));
  }
  beginInteraction() {
    this.resolveConstraints(0), this.setHint(vt.INTERACTING, 1);
  }
  endInteraction(t, e, i) {
    (i = i && ht(i, this.getProjection())),
      this.endInteractionInternal(t, e, i);
  }
  endInteractionInternal(t, e, i) {
    this.getInteracting() &&
      (this.setHint(vt.INTERACTING, -1), this.resolveConstraints(t, e, i));
  }
  getConstrainedCenter(t, e) {
    const i = this.getViewportSize_(this.getRotation());
    return this.constraints_.center(t, e || this.getResolution(), i);
  }
  getConstrainedZoom(t, e) {
    const i = this.getResolutionForZoom(t);
    return this.getZoomForResolution(this.getConstrainedResolution(i, e));
  }
  getConstrainedResolution(t, e) {
    e = e || 0;
    const i = this.getViewportSize_(this.getRotation());
    return this.constraints_.resolution(t, e, i);
  }
}
function us(s, t) {
  setTimeout(function () {
    s(t);
  }, 0);
}
function Nf(s) {
  if (s.extent !== void 0) {
    const e =
      s.smoothExtentConstraint !== void 0 ? s.smoothExtentConstraint : !0;
    return ml(s.extent, s.constrainOnlyCenter, e);
  }
  const t = Fo(s.projection, "EPSG:3857");
  if (s.multiWorld !== !0 && t.isGlobal()) {
    const e = t.getExtent().slice();
    return (e[0] = -1 / 0), (e[2] = 1 / 0), ml(e, !1, !1);
  }
  return Pf;
}
function Bf(s) {
  let t,
    e,
    i,
    o = s.minZoom !== void 0 ? s.minZoom : br,
    a = s.maxZoom !== void 0 ? s.maxZoom : 28;
  const l = s.zoomFactor !== void 0 ? s.zoomFactor : 2,
    c = s.multiWorld !== void 0 ? s.multiWorld : !1,
    h =
      s.smoothResolutionConstraint !== void 0
        ? s.smoothResolutionConstraint
        : !0,
    u = s.showFullExtent !== void 0 ? s.showFullExtent : !1,
    d = Fo(s.projection, "EPSG:3857"),
    f = d.getExtent();
  let g = s.constrainOnlyCenter,
    _ = s.extent;
  if (
    (!c && !_ && d.isGlobal() && ((g = !1), (_ = f)), s.resolutions !== void 0)
  ) {
    const m = s.resolutions;
    (e = m[o]),
      (i = m[a] !== void 0 ? m[a] : m[m.length - 1]),
      s.constrainResolution
        ? (t = Af(m, h, !g && _, u))
        : (t = yl(e, i, h, !g && _, u));
  } else {
    const y =
        (f
          ? Math.max(at(f), Ot(f))
          : (360 * vo.degrees) / d.getMetersPerUnit()) /
        ea /
        Math.pow(2, br),
      p = y / Math.pow(2, 28 - br);
    (e = s.maxResolution),
      e !== void 0 ? (o = 0) : (e = y / Math.pow(l, o)),
      (i = s.minResolution),
      i === void 0 &&
        (s.maxZoom !== void 0
          ? s.maxResolution !== void 0
            ? (i = e / Math.pow(l, a))
            : (i = y / Math.pow(l, a))
          : (i = p)),
      (a = o + Math.floor(Math.log(e / i) / Math.log(l))),
      (i = e / Math.pow(l, a - o)),
      s.constrainResolution
        ? (t = Df(l, e, i, h, !g && _, u))
        : (t = yl(e, i, h, !g && _, u));
  }
  return {
    constraint: t,
    maxResolution: e,
    minResolution: i,
    minZoom: o,
    zoomFactor: l,
  };
}
function zf(s) {
  if (s.enableRotation !== void 0 ? s.enableRotation : !0) {
    const e = s.constrainRotation;
    return e === void 0 || e === !0
      ? kf()
      : e === !1
        ? pl
        : typeof e == "number"
          ? Of(e)
          : pl;
  }
  return ta;
}
function Xf(s) {
  return !(
    (s.sourceCenter && s.targetCenter && !bt(s.sourceCenter, s.targetCenter)) ||
    s.sourceResolution !== s.targetResolution ||
    s.sourceRotation !== s.targetRotation
  );
}
function Ar(s, t, e, i, n) {
  const r = Math.cos(-n);
  let o = Math.sin(-n),
    a = s[0] * r - s[1] * o,
    l = s[1] * r + s[0] * o;
  (a += (t[0] / 2 - e[0]) * i), (l += (e[1] - t[1] / 2) * i), (o = -o);
  const c = a * r - l * o,
    h = l * r + a * o;
  return [c, h];
}
const ot = {
  OPACITY: "opacity",
  VISIBLE: "visible",
  EXTENT: "extent",
  Z_INDEX: "zIndex",
  MAX_RESOLUTION: "maxResolution",
  MIN_RESOLUTION: "minResolution",
  MAX_ZOOM: "maxZoom",
  MIN_ZOOM: "minZoom",
  SOURCE: "source",
  MAP: "map",
};
class Nh extends me {
  constructor(t) {
    super(), this.on, this.once, this.un, (this.background_ = t.background);
    const e = Object.assign({}, t);
    typeof t.properties == "object" &&
      (delete e.properties, Object.assign(e, t.properties)),
      (e[ot.OPACITY] = t.opacity !== void 0 ? t.opacity : 1),
      st(typeof e[ot.OPACITY] == "number", "Layer opacity must be a number"),
      (e[ot.VISIBLE] = t.visible !== void 0 ? t.visible : !0),
      (e[ot.Z_INDEX] = t.zIndex),
      (e[ot.MAX_RESOLUTION] =
        t.maxResolution !== void 0 ? t.maxResolution : 1 / 0),
      (e[ot.MIN_RESOLUTION] = t.minResolution !== void 0 ? t.minResolution : 0),
      (e[ot.MIN_ZOOM] = t.minZoom !== void 0 ? t.minZoom : -1 / 0),
      (e[ot.MAX_ZOOM] = t.maxZoom !== void 0 ? t.maxZoom : 1 / 0),
      (this.className_ = e.className !== void 0 ? e.className : "ol-layer"),
      delete e.className,
      this.setProperties(e),
      (this.state_ = null);
  }
  getBackground() {
    return this.background_;
  }
  getClassName() {
    return this.className_;
  }
  getLayerState(t) {
    const e = this.state_ || { layer: this, managed: t === void 0 ? !0 : t },
      i = this.getZIndex();
    return (
      (e.opacity = ct(Math.round(this.getOpacity() * 100) / 100, 0, 1)),
      (e.visible = this.getVisible()),
      (e.extent = this.getExtent()),
      (e.zIndex = i === void 0 && !e.managed ? 1 / 0 : i),
      (e.maxResolution = this.getMaxResolution()),
      (e.minResolution = Math.max(this.getMinResolution(), 0)),
      (e.minZoom = this.getMinZoom()),
      (e.maxZoom = this.getMaxZoom()),
      (this.state_ = e),
      e
    );
  }
  getLayersArray(t) {
    return Y();
  }
  getLayerStatesArray(t) {
    return Y();
  }
  getExtent() {
    return this.get(ot.EXTENT);
  }
  getMaxResolution() {
    return this.get(ot.MAX_RESOLUTION);
  }
  getMinResolution() {
    return this.get(ot.MIN_RESOLUTION);
  }
  getMinZoom() {
    return this.get(ot.MIN_ZOOM);
  }
  getMaxZoom() {
    return this.get(ot.MAX_ZOOM);
  }
  getOpacity() {
    return this.get(ot.OPACITY);
  }
  getSourceState() {
    return Y();
  }
  getVisible() {
    return this.get(ot.VISIBLE);
  }
  getZIndex() {
    return this.get(ot.Z_INDEX);
  }
  setBackground(t) {
    (this.background_ = t), this.changed();
  }
  setExtent(t) {
    this.set(ot.EXTENT, t);
  }
  setMaxResolution(t) {
    this.set(ot.MAX_RESOLUTION, t);
  }
  setMinResolution(t) {
    this.set(ot.MIN_RESOLUTION, t);
  }
  setMaxZoom(t) {
    this.set(ot.MAX_ZOOM, t);
  }
  setMinZoom(t) {
    this.set(ot.MIN_ZOOM, t);
  }
  setOpacity(t) {
    st(typeof t == "number", "Layer opacity must be a number"),
      this.set(ot.OPACITY, t);
  }
  setVisible(t) {
    this.set(ot.VISIBLE, t);
  }
  setZIndex(t) {
    this.set(ot.Z_INDEX, t);
  }
  disposeInternal() {
    this.state_ && ((this.state_.layer = null), (this.state_ = null)),
      super.disposeInternal();
  }
}
class ar extends Nh {
  constructor(t) {
    const e = Object.assign({}, t);
    delete e.source,
      super(e),
      this.on,
      this.once,
      this.un,
      (this.mapPrecomposeKey_ = null),
      (this.mapRenderKey_ = null),
      (this.sourceChangeKey_ = null),
      (this.renderer_ = null),
      (this.sourceReady_ = !1),
      (this.rendered = !1),
      t.render && (this.render = t.render),
      t.map && this.setMap(t.map),
      this.addChangeListener(ot.SOURCE, this.handleSourcePropertyChange_);
    const i = t.source ? t.source : null;
    this.setSource(i);
  }
  getLayersArray(t) {
    return (t = t || []), t.push(this), t;
  }
  getLayerStatesArray(t) {
    return (t = t || []), t.push(this.getLayerState()), t;
  }
  getSource() {
    return this.get(ot.SOURCE) || null;
  }
  getRenderSource() {
    return this.getSource();
  }
  getSourceState() {
    const t = this.getSource();
    return t ? t.getState() : "undefined";
  }
  handleSourceChange_() {
    this.changed(),
      !(this.sourceReady_ || this.getSource().getState() !== "ready") &&
        ((this.sourceReady_ = !0), this.dispatchEvent("sourceready"));
  }
  handleSourcePropertyChange_() {
    this.sourceChangeKey_ &&
      (lt(this.sourceChangeKey_), (this.sourceChangeKey_ = null)),
      (this.sourceReady_ = !1);
    const t = this.getSource();
    t &&
      ((this.sourceChangeKey_ = $(t, j.CHANGE, this.handleSourceChange_, this)),
      t.getState() === "ready" &&
        ((this.sourceReady_ = !0),
        setTimeout(() => {
          this.dispatchEvent("sourceready");
        }, 0)),
      this.clearRenderer()),
      this.changed();
  }
  getFeatures(t) {
    return this.renderer_ ? this.renderer_.getFeatures(t) : Promise.resolve([]);
  }
  getData(t) {
    return !this.renderer_ || !this.rendered ? null : this.renderer_.getData(t);
  }
  isVisible(t) {
    let e;
    const i = this.getMapInternal();
    !t && i && (t = i.getView()),
      t instanceof ge
        ? (e = { viewState: t.getState(), extent: t.calculateExtent() })
        : (e = t),
      !e.layerStatesArray &&
        i &&
        (e.layerStatesArray = i.getLayerGroup().getLayerStatesArray());
    let n;
    if (e.layerStatesArray) {
      if (((n = e.layerStatesArray.find((o) => o.layer === this)), !n))
        return !1;
    } else n = this.getLayerState();
    const r = this.getExtent();
    return ia(n, e.viewState) && (!r || It(r, e.extent));
  }
  getAttributions(t) {
    var r;
    if (!this.isVisible(t)) return [];
    const e = (r = this.getSource()) == null ? void 0 : r.getAttributions();
    if (!e) return [];
    const i = t instanceof ge ? t.getViewStateAndExtent() : t;
    let n = e(i);
    return Array.isArray(n) || (n = [n]), n;
  }
  render(t, e) {
    const i = this.getRenderer();
    return i.prepareFrame(t)
      ? ((this.rendered = !0), i.renderFrame(t, e))
      : null;
  }
  unrender() {
    this.rendered = !1;
  }
  getDeclutter() {}
  renderDeclutter(t, e) {}
  renderDeferred(t) {
    const e = this.getRenderer();
    e && e.renderDeferred(t);
  }
  setMapInternal(t) {
    t || this.unrender(), this.set(ot.MAP, t);
  }
  getMapInternal() {
    return this.get(ot.MAP);
  }
  setMap(t) {
    this.mapPrecomposeKey_ &&
      (lt(this.mapPrecomposeKey_), (this.mapPrecomposeKey_ = null)),
      t || this.changed(),
      this.mapRenderKey_ &&
        (lt(this.mapRenderKey_), (this.mapRenderKey_ = null)),
      t &&
        ((this.mapPrecomposeKey_ = $(
          t,
          $t.PRECOMPOSE,
          this.handlePrecompose_,
          this,
        )),
        (this.mapRenderKey_ = $(this, j.CHANGE, t.render, t)),
        this.changed());
  }
  handlePrecompose_(t) {
    const e = t.frameState.layerStatesArray,
      i = this.getLayerState(!1);
    st(
      !e.some((n) => n.layer === i.layer),
      "A layer can only be added to the map once. Use either `layer.setMap()` or `map.addLayer()`, not both.",
    ),
      e.push(i);
  }
  setSource(t) {
    this.set(ot.SOURCE, t);
  }
  getRenderer() {
    return (
      this.renderer_ || (this.renderer_ = this.createRenderer()), this.renderer_
    );
  }
  hasRenderer() {
    return !!this.renderer_;
  }
  createRenderer() {
    return null;
  }
  clearRenderer() {
    this.renderer_ && (this.renderer_.dispose(), delete this.renderer_);
  }
  disposeInternal() {
    this.clearRenderer(), this.setSource(null), super.disposeInternal();
  }
}
function ia(s, t) {
  if (!s.visible) return !1;
  const e = t.resolution;
  if (e < s.minResolution || e >= s.maxResolution) return !1;
  const i = t.zoom;
  return i > s.minZoom && i <= s.maxZoom;
}
const xl = { RENDER_ORDER: "renderOrder" };
class Bh extends ar {
  constructor(t) {
    t = t || {};
    const e = Object.assign({}, t);
    delete e.style,
      delete e.renderBuffer,
      delete e.updateWhileAnimating,
      delete e.updateWhileInteracting,
      super(e),
      (this.declutter_ = t.declutter ? String(t.declutter) : void 0),
      (this.renderBuffer_ = t.renderBuffer !== void 0 ? t.renderBuffer : 100),
      (this.style_ = null),
      (this.styleFunction_ = void 0),
      this.setStyle(t.style),
      (this.updateWhileAnimating_ =
        t.updateWhileAnimating !== void 0 ? t.updateWhileAnimating : !1),
      (this.updateWhileInteracting_ =
        t.updateWhileInteracting !== void 0 ? t.updateWhileInteracting : !1);
  }
  getDeclutter() {
    return this.declutter_;
  }
  getFeatures(t) {
    return super.getFeatures(t);
  }
  getRenderBuffer() {
    return this.renderBuffer_;
  }
  getRenderOrder() {
    return this.get(xl.RENDER_ORDER);
  }
  getStyle() {
    return this.style_;
  }
  getStyleFunction() {
    return this.styleFunction_;
  }
  getUpdateWhileAnimating() {
    return this.updateWhileAnimating_;
  }
  getUpdateWhileInteracting() {
    return this.updateWhileInteracting_;
  }
  renderDeclutter(t, e) {
    const i = this.getDeclutter();
    i in t.declutter || (t.declutter[i] = new Sh(9)),
      this.getRenderer().renderDeclutter(t, e);
  }
  setRenderOrder(t) {
    this.set(xl.RENDER_ORDER, t);
  }
  setStyle(t) {
    this.style_ = t === void 0 ? Rh : t;
    const e = Wf(t);
    (this.styleFunction_ = t === null ? void 0 : Sd(e)), this.changed();
  }
  setDeclutter(t) {
    (this.declutter_ = t ? String(t) : void 0), this.changed();
  }
}
function Wf(s) {
  if (s === void 0) return Rh;
  if (!s) return null;
  if (typeof s == "function" || s instanceof mt) return s;
  if (!Array.isArray(s)) return dl([s]);
  if (s.length === 0) return [];
  const t = s.length,
    e = s[0];
  if (e instanceof mt) {
    const n = new Array(t);
    for (let r = 0; r < t; ++r) {
      const o = s[r];
      if (!(o instanceof mt))
        throw new Error("Expected a list of style instances");
      n[r] = o;
    }
    return n;
  }
  if ("style" in e) {
    const n = new Array(t);
    for (let r = 0; r < t; ++r) {
      const o = s[r];
      if (!("style" in o))
        throw new Error("Expected a list of rules with a style property");
      n[r] = o;
    }
    return yf(n);
  }
  return dl(s);
}
class Ri extends Bh {
  constructor(t) {
    super(t);
  }
  createRenderer() {
    return new Yd(this);
  }
}
const B = { IDLE: 0, LOADING: 1, LOADED: 2, ERROR: 3, EMPTY: 4 };
class na extends Ws {
  constructor(t, e, i) {
    super(),
      (i = i || {}),
      (this.tileCoord = t),
      (this.state = e),
      (this.key = ""),
      (this.transition_ = i.transition === void 0 ? 250 : i.transition),
      (this.transitionStarts_ = {}),
      (this.interpolate = !!i.interpolate);
  }
  changed() {
    this.dispatchEvent(j.CHANGE);
  }
  release() {
    this.setState(B.EMPTY);
  }
  getKey() {
    return this.key + "/" + this.tileCoord;
  }
  getTileCoord() {
    return this.tileCoord;
  }
  getState() {
    return this.state;
  }
  setState(t) {
    if (this.state !== B.EMPTY) {
      if (this.state !== B.ERROR && this.state > t)
        throw new Error("Tile load sequence violation");
      (this.state = t), this.changed();
    }
  }
  load() {
    Y();
  }
  getAlpha(t, e) {
    if (!this.transition_) return 1;
    let i = this.transitionStarts_[t];
    if (!i) (i = e), (this.transitionStarts_[t] = i);
    else if (i === -1) return 1;
    const n = e - i + 1e3 / 60;
    return n >= this.transition_ ? 1 : Gh(n / this.transition_);
  }
  inTransition(t) {
    return this.transition_ ? this.transitionStarts_[t] !== -1 : !1;
  }
  endTransition(t) {
    this.transition_ && (this.transitionStarts_[t] = -1);
  }
  disposeInternal() {
    this.release(), super.disposeInternal();
  }
}
class zh extends na {
  constructor(t, e, i, n, r, o) {
    super(t, e, o),
      (this.crossOrigin_ = n),
      (this.src_ = i),
      (this.key = i),
      (this.image_ = new Image()),
      n !== null && (this.image_.crossOrigin = n),
      (this.unlisten_ = null),
      (this.tileLoadFunction_ = r);
  }
  getImage() {
    return this.image_;
  }
  setImage(t) {
    (this.image_ = t),
      (this.state = B.LOADED),
      this.unlistenImage_(),
      this.changed();
  }
  handleImageError_() {
    (this.state = B.ERROR),
      this.unlistenImage_(),
      (this.image_ = jf()),
      this.changed();
  }
  handleImageLoad_() {
    const t = this.image_;
    t.naturalWidth && t.naturalHeight
      ? (this.state = B.LOADED)
      : (this.state = B.EMPTY),
      this.unlistenImage_(),
      this.changed();
  }
  load() {
    this.state == B.ERROR &&
      ((this.state = B.IDLE),
      (this.image_ = new Image()),
      this.crossOrigin_ !== null &&
        (this.image_.crossOrigin = this.crossOrigin_)),
      this.state == B.IDLE &&
        ((this.state = B.LOADING),
        this.changed(),
        this.tileLoadFunction_(this, this.src_),
        (this.unlisten_ = Yu(
          this.image_,
          this.handleImageLoad_.bind(this),
          this.handleImageError_.bind(this),
        )));
  }
  unlistenImage_() {
    this.unlisten_ && (this.unlisten_(), (this.unlisten_ = null));
  }
  disposeInternal() {
    this.unlistenImage_(), (this.image_ = null), super.disposeInternal();
  }
}
function jf() {
  const s = xt(1, 1);
  return (s.fillStyle = "rgba(0,0,0,0)"), s.fillRect(0, 0, 1, 1), s.canvas;
}
class Yf {
  constructor(t, e, i) {
    (this.decay_ = t),
      (this.minVelocity_ = e),
      (this.delay_ = i),
      (this.points_ = []),
      (this.angle_ = 0),
      (this.initialVelocity_ = 0);
  }
  begin() {
    (this.points_.length = 0), (this.angle_ = 0), (this.initialVelocity_ = 0);
  }
  update(t, e) {
    this.points_.push(t, e, Date.now());
  }
  end() {
    if (this.points_.length < 6) return !1;
    const t = Date.now() - this.delay_,
      e = this.points_.length - 3;
    if (this.points_[e + 2] < t) return !1;
    let i = e - 3;
    for (; i > 0 && this.points_[i + 2] > t; ) i -= 3;
    const n = this.points_[e + 2] - this.points_[i + 2];
    if (n < 1e3 / 60) return !1;
    const r = this.points_[e] - this.points_[i],
      o = this.points_[e + 1] - this.points_[i + 1];
    return (
      (this.angle_ = Math.atan2(o, r)),
      (this.initialVelocity_ = Math.sqrt(r * r + o * o) / n),
      this.initialVelocity_ > this.minVelocity_
    );
  }
  getDistance() {
    return (this.minVelocity_ - this.initialVelocity_) / this.decay_;
  }
  getAngle() {
    return this.angle_;
  }
}
class Ni extends Kt {
  constructor(t, e, i) {
    super(t), (this.map = e), (this.frameState = i !== void 0 ? i : null);
  }
}
class Re extends Ni {
  constructor(t, e, i, n, r, o) {
    super(t, e, r),
      (this.originalEvent = i),
      (this.pixel_ = null),
      (this.coordinate_ = null),
      (this.dragging = n !== void 0 ? n : !1),
      (this.activePointers = o);
  }
  get pixel() {
    return (
      this.pixel_ || (this.pixel_ = this.map.getEventPixel(this.originalEvent)),
      this.pixel_
    );
  }
  set pixel(t) {
    this.pixel_ = t;
  }
  get coordinate() {
    return (
      this.coordinate_ ||
        (this.coordinate_ = this.map.getCoordinateFromPixel(this.pixel)),
      this.coordinate_
    );
  }
  set coordinate(t) {
    this.coordinate_ = t;
  }
  preventDefault() {
    super.preventDefault(),
      "preventDefault" in this.originalEvent &&
        this.originalEvent.preventDefault();
  }
  stopPropagation() {
    super.stopPropagation(),
      "stopPropagation" in this.originalEvent &&
        this.originalEvent.stopPropagation();
  }
}
const Q = {
    SINGLECLICK: "singleclick",
    CLICK: j.CLICK,
    DBLCLICK: j.DBLCLICK,
    POINTERDRAG: "pointerdrag",
    POINTERMOVE: "pointermove",
    POINTERDOWN: "pointerdown",
    POINTERUP: "pointerup",
    POINTEROVER: "pointerover",
    POINTEROUT: "pointerout",
    POINTERENTER: "pointerenter",
    POINTERLEAVE: "pointerleave",
    POINTERCANCEL: "pointercancel",
  },
  lo = { POINTERMOVE: "pointermove", POINTERDOWN: "pointerdown" };
class Vf extends Ws {
  constructor(t, e) {
    super(t),
      (this.map_ = t),
      this.clickTimeoutId_,
      (this.emulateClicks_ = !1),
      (this.dragging_ = !1),
      (this.dragListenerKeys_ = []),
      (this.moveTolerance_ = e === void 0 ? 1 : e),
      (this.down_ = null);
    const i = this.map_.getViewport();
    (this.activePointers_ = []),
      (this.trackedTouches_ = {}),
      (this.element_ = i),
      (this.pointerdownListenerKey_ = $(
        i,
        lo.POINTERDOWN,
        this.handlePointerDown_,
        this,
      )),
      this.originalPointerMoveEvent_,
      (this.relayedListenerKey_ = $(
        i,
        lo.POINTERMOVE,
        this.relayMoveEvent_,
        this,
      )),
      (this.boundHandleTouchMove_ = this.handleTouchMove_.bind(this)),
      this.element_.addEventListener(
        j.TOUCHMOVE,
        this.boundHandleTouchMove_,
        uh ? { passive: !1 } : !1,
      );
  }
  emulateClick_(t) {
    let e = new Re(Q.CLICK, this.map_, t);
    this.dispatchEvent(e),
      this.clickTimeoutId_ !== void 0
        ? (clearTimeout(this.clickTimeoutId_),
          (this.clickTimeoutId_ = void 0),
          (e = new Re(Q.DBLCLICK, this.map_, t)),
          this.dispatchEvent(e))
        : (this.clickTimeoutId_ = setTimeout(() => {
            this.clickTimeoutId_ = void 0;
            const i = new Re(Q.SINGLECLICK, this.map_, t);
            this.dispatchEvent(i);
          }, 250));
  }
  updateActivePointers_(t) {
    const e = t,
      i = e.pointerId;
    if (e.type == Q.POINTERUP || e.type == Q.POINTERCANCEL) {
      delete this.trackedTouches_[i];
      for (const n in this.trackedTouches_)
        if (this.trackedTouches_[n].target !== e.target) {
          delete this.trackedTouches_[n];
          break;
        }
    } else
      (e.type == Q.POINTERDOWN || e.type == Q.POINTERMOVE) &&
        (this.trackedTouches_[i] = e);
    this.activePointers_ = Object.values(this.trackedTouches_);
  }
  handlePointerUp_(t) {
    this.updateActivePointers_(t);
    const e = new Re(
      Q.POINTERUP,
      this.map_,
      t,
      void 0,
      void 0,
      this.activePointers_,
    );
    this.dispatchEvent(e),
      this.emulateClicks_ &&
        !e.defaultPrevented &&
        !this.dragging_ &&
        this.isMouseActionButton_(t) &&
        this.emulateClick_(this.down_),
      this.activePointers_.length === 0 &&
        (this.dragListenerKeys_.forEach(lt),
        (this.dragListenerKeys_.length = 0),
        (this.dragging_ = !1),
        (this.down_ = null));
  }
  isMouseActionButton_(t) {
    return t.button === 0;
  }
  handlePointerDown_(t) {
    (this.emulateClicks_ = this.activePointers_.length === 0),
      this.updateActivePointers_(t);
    const e = new Re(
      Q.POINTERDOWN,
      this.map_,
      t,
      void 0,
      void 0,
      this.activePointers_,
    );
    if (
      (this.dispatchEvent(e),
      (this.down_ = new PointerEvent(t.type, t)),
      Object.defineProperty(this.down_, "target", {
        writable: !1,
        value: t.target,
      }),
      this.dragListenerKeys_.length === 0)
    ) {
      const i = this.map_.getOwnerDocument();
      this.dragListenerKeys_.push(
        $(i, Q.POINTERMOVE, this.handlePointerMove_, this),
        $(i, Q.POINTERUP, this.handlePointerUp_, this),
        $(this.element_, Q.POINTERCANCEL, this.handlePointerUp_, this),
      ),
        this.element_.getRootNode &&
          this.element_.getRootNode() !== i &&
          this.dragListenerKeys_.push(
            $(
              this.element_.getRootNode(),
              Q.POINTERUP,
              this.handlePointerUp_,
              this,
            ),
          );
    }
  }
  handlePointerMove_(t) {
    if (this.isMoving_(t)) {
      this.updateActivePointers_(t), (this.dragging_ = !0);
      const e = new Re(
        Q.POINTERDRAG,
        this.map_,
        t,
        this.dragging_,
        void 0,
        this.activePointers_,
      );
      this.dispatchEvent(e);
    }
  }
  relayMoveEvent_(t) {
    this.originalPointerMoveEvent_ = t;
    const e = !!(this.down_ && this.isMoving_(t));
    this.dispatchEvent(new Re(Q.POINTERMOVE, this.map_, t, e));
  }
  handleTouchMove_(t) {
    const e = this.originalPointerMoveEvent_;
    (!e || e.defaultPrevented) &&
      (typeof t.cancelable != "boolean" || t.cancelable === !0) &&
      t.preventDefault();
  }
  isMoving_(t) {
    return (
      this.dragging_ ||
      Math.abs(t.clientX - this.down_.clientX) > this.moveTolerance_ ||
      Math.abs(t.clientY - this.down_.clientY) > this.moveTolerance_
    );
  }
  disposeInternal() {
    this.relayedListenerKey_ &&
      (lt(this.relayedListenerKey_), (this.relayedListenerKey_ = null)),
      this.element_.removeEventListener(
        j.TOUCHMOVE,
        this.boundHandleTouchMove_,
      ),
      this.pointerdownListenerKey_ &&
        (lt(this.pointerdownListenerKey_),
        (this.pointerdownListenerKey_ = null)),
      this.dragListenerKeys_.forEach(lt),
      (this.dragListenerKeys_.length = 0),
      (this.element_ = null),
      super.disposeInternal();
  }
}
const Ue = {
    POSTRENDER: "postrender",
    MOVESTART: "movestart",
    MOVEEND: "moveend",
    LOADSTART: "loadstart",
    LOADEND: "loadend",
  },
  Tt = {
    LAYERGROUP: "layergroup",
    SIZE: "size",
    TARGET: "target",
    VIEW: "view",
  },
  ks = 1 / 0;
class Kf {
  constructor(t, e) {
    (this.priorityFunction_ = t),
      (this.keyFunction_ = e),
      (this.elements_ = []),
      (this.priorities_ = []),
      (this.queuedElements_ = {});
  }
  clear() {
    (this.elements_.length = 0),
      (this.priorities_.length = 0),
      rn(this.queuedElements_);
  }
  dequeue() {
    const t = this.elements_,
      e = this.priorities_,
      i = t[0];
    t.length == 1
      ? ((t.length = 0), (e.length = 0))
      : ((t[0] = t.pop()), (e[0] = e.pop()), this.siftUp_(0));
    const n = this.keyFunction_(i);
    return delete this.queuedElements_[n], i;
  }
  enqueue(t) {
    st(
      !(this.keyFunction_(t) in this.queuedElements_),
      "Tried to enqueue an `element` that was already added to the queue",
    );
    const e = this.priorityFunction_(t);
    return e != ks
      ? (this.elements_.push(t),
        this.priorities_.push(e),
        (this.queuedElements_[this.keyFunction_(t)] = !0),
        this.siftDown_(0, this.elements_.length - 1),
        !0)
      : !1;
  }
  getCount() {
    return this.elements_.length;
  }
  getLeftChildIndex_(t) {
    return t * 2 + 1;
  }
  getRightChildIndex_(t) {
    return t * 2 + 2;
  }
  getParentIndex_(t) {
    return (t - 1) >> 1;
  }
  heapify_() {
    let t;
    for (t = (this.elements_.length >> 1) - 1; t >= 0; t--) this.siftUp_(t);
  }
  isEmpty() {
    return this.elements_.length === 0;
  }
  isKeyQueued(t) {
    return t in this.queuedElements_;
  }
  isQueued(t) {
    return this.isKeyQueued(this.keyFunction_(t));
  }
  siftUp_(t) {
    const e = this.elements_,
      i = this.priorities_,
      n = e.length,
      r = e[t],
      o = i[t],
      a = t;
    for (; t < n >> 1; ) {
      const l = this.getLeftChildIndex_(t),
        c = this.getRightChildIndex_(t),
        h = c < n && i[c] < i[l] ? c : l;
      (e[t] = e[h]), (i[t] = i[h]), (t = h);
    }
    (e[t] = r), (i[t] = o), this.siftDown_(a, t);
  }
  siftDown_(t, e) {
    const i = this.elements_,
      n = this.priorities_,
      r = i[e],
      o = n[e];
    for (; e > t; ) {
      const a = this.getParentIndex_(e);
      if (n[a] > o) (i[e] = i[a]), (n[e] = n[a]), (e = a);
      else break;
    }
    (i[e] = r), (n[e] = o);
  }
  reprioritize() {
    const t = this.priorityFunction_,
      e = this.elements_,
      i = this.priorities_;
    let n = 0;
    const r = e.length;
    let o, a, l;
    for (a = 0; a < r; ++a)
      (o = e[a]),
        (l = t(o)),
        l == ks
          ? delete this.queuedElements_[this.keyFunction_(o)]
          : ((i[n] = l), (e[n++] = o));
    (e.length = n), (i.length = n), this.heapify_();
  }
}
class Uf extends Kf {
  constructor(t, e) {
    super(
      (i) => t.apply(null, i),
      (i) => i[0].getKey(),
    ),
      (this.boundHandleTileChange_ = this.handleTileChange.bind(this)),
      (this.tileChangeCallback_ = e),
      (this.tilesLoading_ = 0),
      (this.tilesLoadingKeys_ = {});
  }
  enqueue(t) {
    const e = super.enqueue(t);
    return e && t[0].addEventListener(j.CHANGE, this.boundHandleTileChange_), e;
  }
  getTilesLoading() {
    return this.tilesLoading_;
  }
  handleTileChange(t) {
    const e = t.target,
      i = e.getState();
    if (i === B.LOADED || i === B.ERROR || i === B.EMPTY) {
      i !== B.ERROR &&
        e.removeEventListener(j.CHANGE, this.boundHandleTileChange_);
      const n = e.getKey();
      n in this.tilesLoadingKeys_ &&
        (delete this.tilesLoadingKeys_[n], --this.tilesLoading_),
        this.tileChangeCallback_();
    }
  }
  loadMoreTiles(t, e) {
    let i = 0;
    for (; this.tilesLoading_ < t && i < e && this.getCount() > 0; ) {
      const n = this.dequeue()[0],
        r = n.getKey();
      n.getState() === B.IDLE &&
        !(r in this.tilesLoadingKeys_) &&
        ((this.tilesLoadingKeys_[r] = !0), ++this.tilesLoading_, ++i, n.load());
    }
  }
}
function Zf(s, t, e, i, n) {
  if (!s || !(e in s.wantedTiles) || !s.wantedTiles[e][t.getKey()]) return ks;
  const r = s.viewState.center,
    o = i[0] - r[0],
    a = i[1] - r[1];
  return 65536 * Math.log(n) + Math.sqrt(o * o + a * a) / n;
}
class sa extends me {
  constructor(t) {
    super();
    const e = t.element;
    e &&
      !t.target &&
      !e.style.pointerEvents &&
      (e.style.pointerEvents = "auto"),
      (this.element = e || null),
      (this.target_ = null),
      (this.map_ = null),
      (this.listenerKeys = []),
      t.render && (this.render = t.render),
      t.target && this.setTarget(t.target);
  }
  disposeInternal() {
    var t;
    (t = this.element) == null || t.remove(), super.disposeInternal();
  }
  getMap() {
    return this.map_;
  }
  setMap(t) {
    var e;
    this.map_ && ((e = this.element) == null || e.remove());
    for (let i = 0, n = this.listenerKeys.length; i < n; ++i)
      lt(this.listenerKeys[i]);
    if (((this.listenerKeys.length = 0), (this.map_ = t), t)) {
      const i = this.target_ ?? t.getOverlayContainerStopEvent();
      this.element && i.appendChild(this.element),
        this.render !== Mn &&
          this.listenerKeys.push($(t, Ue.POSTRENDER, this.render, this)),
        t.render();
    }
  }
  render(t) {}
  setTarget(t) {
    this.target_ = typeof t == "string" ? document.getElementById(t) : t;
  }
}
class Hf extends sa {
  constructor(t) {
    (t = t || {}),
      super({
        element: document.createElement("div"),
        render: t.render,
        target: t.target,
      }),
      (this.ulElement_ = document.createElement("ul")),
      (this.collapsed_ = t.collapsed !== void 0 ? t.collapsed : !0),
      (this.userCollapsed_ = this.collapsed_),
      (this.overrideCollapsible_ = t.collapsible !== void 0),
      (this.collapsible_ = t.collapsible !== void 0 ? t.collapsible : !0),
      this.collapsible_ || (this.collapsed_ = !1),
      (this.attributions_ = t.attributions);
    const e = t.className !== void 0 ? t.className : "ol-attribution",
      i = t.tipLabel !== void 0 ? t.tipLabel : "Attributions",
      n = t.expandClassName !== void 0 ? t.expandClassName : e + "-expand",
      r = t.collapseLabel !== void 0 ? t.collapseLabel : "›",
      o =
        t.collapseClassName !== void 0 ? t.collapseClassName : e + "-collapse";
    typeof r == "string"
      ? ((this.collapseLabel_ = document.createElement("span")),
        (this.collapseLabel_.textContent = r),
        (this.collapseLabel_.className = o))
      : (this.collapseLabel_ = r);
    const a = t.label !== void 0 ? t.label : "i";
    typeof a == "string"
      ? ((this.label_ = document.createElement("span")),
        (this.label_.textContent = a),
        (this.label_.className = n))
      : (this.label_ = a);
    const l =
      this.collapsible_ && !this.collapsed_ ? this.collapseLabel_ : this.label_;
    (this.toggleButton_ = document.createElement("button")),
      this.toggleButton_.setAttribute("type", "button"),
      this.toggleButton_.setAttribute(
        "aria-expanded",
        String(!this.collapsed_),
      ),
      (this.toggleButton_.title = i),
      this.toggleButton_.appendChild(l),
      this.toggleButton_.addEventListener(
        j.CLICK,
        this.handleClick_.bind(this),
        !1,
      );
    const c =
        e +
        " " +
        tr +
        " " +
        Zo +
        (this.collapsed_ && this.collapsible_ ? " " + Ka : "") +
        (this.collapsible_ ? "" : " ol-uncollapsible"),
      h = this.element;
    (h.className = c),
      h.appendChild(this.toggleButton_),
      h.appendChild(this.ulElement_),
      (this.renderedAttributions_ = []),
      (this.renderedVisible_ = !0);
  }
  collectSourceAttributions_(t) {
    const e = this.getMap().getAllLayers(),
      i = new Set(e.flatMap((n) => n.getAttributions(t)));
    if (
      (this.attributions_ !== void 0 &&
        (Array.isArray(this.attributions_)
          ? this.attributions_.forEach((n) => i.add(n))
          : i.add(this.attributions_)),
      !this.overrideCollapsible_)
    ) {
      const n = !e.some((r) => {
        var o;
        return (
          ((o = r.getSource()) == null
            ? void 0
            : o.getAttributionsCollapsible()) === !1
        );
      });
      this.setCollapsible(n);
    }
    return Array.from(i);
  }
  async updateElement_(t) {
    if (!t) {
      this.renderedVisible_ &&
        ((this.element.style.display = "none"), (this.renderedVisible_ = !1));
      return;
    }
    const e = await Promise.all(
        this.collectSourceAttributions_(t).map((n) => mc(() => n)),
      ),
      i = e.length > 0;
    if (
      (this.renderedVisible_ != i &&
        ((this.element.style.display = i ? "" : "none"),
        (this.renderedVisible_ = i)),
      !Ne(e, this.renderedAttributions_))
    ) {
      Au(this.ulElement_);
      for (let n = 0, r = e.length; n < r; ++n) {
        const o = document.createElement("li");
        (o.innerHTML = e[n]), this.ulElement_.appendChild(o);
      }
      this.renderedAttributions_ = e;
    }
  }
  handleClick_(t) {
    t.preventDefault(),
      this.handleToggle_(),
      (this.userCollapsed_ = this.collapsed_);
  }
  handleToggle_() {
    this.element.classList.toggle(Ka),
      this.collapsed_
        ? Ya(this.collapseLabel_, this.label_)
        : Ya(this.label_, this.collapseLabel_),
      (this.collapsed_ = !this.collapsed_),
      this.toggleButton_.setAttribute(
        "aria-expanded",
        String(!this.collapsed_),
      );
  }
  getCollapsible() {
    return this.collapsible_;
  }
  setCollapsible(t) {
    this.collapsible_ !== t &&
      ((this.collapsible_ = t),
      this.element.classList.toggle("ol-uncollapsible"),
      this.userCollapsed_ && this.handleToggle_());
  }
  setCollapsed(t) {
    (this.userCollapsed_ = t),
      !(!this.collapsible_ || this.collapsed_ === t) && this.handleToggle_();
  }
  getCollapsed() {
    return this.collapsed_;
  }
  render(t) {
    this.updateElement_(t.frameState);
  }
}
class qf extends sa {
  constructor(t) {
    (t = t || {}),
      super({
        element: document.createElement("div"),
        render: t.render,
        target: t.target,
      });
    const e = t.className !== void 0 ? t.className : "ol-rotate",
      i = t.label !== void 0 ? t.label : "⇧",
      n = t.compassClassName !== void 0 ? t.compassClassName : "ol-compass";
    (this.label_ = null),
      typeof i == "string"
        ? ((this.label_ = document.createElement("span")),
          (this.label_.className = n),
          (this.label_.textContent = i))
        : ((this.label_ = i), this.label_.classList.add(n));
    const r = t.tipLabel ? t.tipLabel : "Reset rotation",
      o = document.createElement("button");
    (o.className = e + "-reset"),
      o.setAttribute("type", "button"),
      (o.title = r),
      o.appendChild(this.label_),
      o.addEventListener(j.CLICK, this.handleClick_.bind(this), !1);
    const a = e + " " + tr + " " + Zo,
      l = this.element;
    (l.className = a),
      l.appendChild(o),
      (this.callResetNorth_ = t.resetNorth ? t.resetNorth : void 0),
      (this.duration_ = t.duration !== void 0 ? t.duration : 250),
      (this.autoHide_ = t.autoHide !== void 0 ? t.autoHide : !0),
      (this.rotation_ = void 0),
      this.autoHide_ && this.element.classList.add(os);
  }
  handleClick_(t) {
    t.preventDefault(),
      this.callResetNorth_ !== void 0
        ? this.callResetNorth_()
        : this.resetNorth_();
  }
  resetNorth_() {
    const e = this.getMap().getView();
    if (!e) return;
    const i = e.getRotation();
    i !== void 0 &&
      (this.duration_ > 0 && i % (2 * Math.PI) !== 0
        ? e.animate({ rotation: 0, duration: this.duration_, easing: an })
        : e.setRotation(0));
  }
  render(t) {
    const e = t.frameState;
    if (!e) return;
    const i = e.viewState.rotation;
    if (i != this.rotation_) {
      const n = "rotate(" + i + "rad)";
      if (this.autoHide_) {
        const r = this.element.classList.contains(os);
        !r && i === 0
          ? this.element.classList.add(os)
          : r && i !== 0 && this.element.classList.remove(os);
      }
      this.label_.style.transform = n;
    }
    this.rotation_ = i;
  }
}
class $f extends sa {
  constructor(t) {
    (t = t || {}),
      super({ element: document.createElement("div"), target: t.target });
    const e = t.className !== void 0 ? t.className : "ol-zoom",
      i = t.delta !== void 0 ? t.delta : 1,
      n = t.zoomInClassName !== void 0 ? t.zoomInClassName : e + "-in",
      r = t.zoomOutClassName !== void 0 ? t.zoomOutClassName : e + "-out",
      o = t.zoomInLabel !== void 0 ? t.zoomInLabel : "+",
      a = t.zoomOutLabel !== void 0 ? t.zoomOutLabel : "–",
      l = t.zoomInTipLabel !== void 0 ? t.zoomInTipLabel : "Zoom in",
      c = t.zoomOutTipLabel !== void 0 ? t.zoomOutTipLabel : "Zoom out",
      h = document.createElement("button");
    (h.className = n),
      h.setAttribute("type", "button"),
      (h.title = l),
      h.appendChild(typeof o == "string" ? document.createTextNode(o) : o),
      h.addEventListener(j.CLICK, this.handleClick_.bind(this, i), !1);
    const u = document.createElement("button");
    (u.className = r),
      u.setAttribute("type", "button"),
      (u.title = c),
      u.appendChild(typeof a == "string" ? document.createTextNode(a) : a),
      u.addEventListener(j.CLICK, this.handleClick_.bind(this, -i), !1);
    const d = e + " " + tr + " " + Zo,
      f = this.element;
    (f.className = d),
      f.appendChild(h),
      f.appendChild(u),
      (this.duration_ = t.duration !== void 0 ? t.duration : 250);
  }
  handleClick_(t, e) {
    e.preventDefault(), this.zoomByDelta_(t);
  }
  zoomByDelta_(t) {
    const i = this.getMap().getView();
    if (!i) return;
    const n = i.getZoom();
    if (n !== void 0) {
      const r = i.getConstrainedZoom(n + t);
      this.duration_ > 0
        ? (i.getAnimating() && i.cancelAnimations(),
          i.animate({ zoom: r, duration: this.duration_, easing: an }))
        : i.setZoom(r);
    }
  }
}
function Jf(s) {
  s = s || {};
  const t = new Xt();
  return (
    (s.zoom !== void 0 ? s.zoom : !0) && t.push(new $f(s.zoomOptions)),
    (s.rotate !== void 0 ? s.rotate : !0) && t.push(new qf(s.rotateOptions)),
    (s.attribution !== void 0 ? s.attribution : !0) &&
      t.push(new Hf(s.attributionOptions)),
    t
  );
}
const ho = { ACTIVE: "active" };
class ln extends me {
  constructor(t) {
    super(),
      this.on,
      this.once,
      this.un,
      t && t.handleEvent && (this.handleEvent = t.handleEvent),
      (this.map_ = null),
      this.setActive(!0);
  }
  getActive() {
    return this.get(ho.ACTIVE);
  }
  getMap() {
    return this.map_;
  }
  handleEvent(t) {
    return !0;
  }
  setActive(t) {
    this.set(ho.ACTIVE, t);
  }
  setMap(t) {
    this.map_ = t;
  }
}
function Qf(s, t, e) {
  const i = s.getCenterInternal();
  if (i) {
    const n = [i[0] + t[0], i[1] + t[1]];
    s.animateInternal({
      duration: e !== void 0 ? e : 250,
      easing: bf,
      center: s.getConstrainedCenter(n),
    });
  }
}
function ra(s, t, e, i) {
  const n = s.getZoom();
  if (n === void 0) return;
  const r = s.getConstrainedZoom(n + t),
    o = s.getResolutionForZoom(r);
  s.getAnimating() && s.cancelAnimations(),
    s.animate({
      resolution: o,
      anchor: e,
      duration: i !== void 0 ? i : 250,
      easing: an,
    });
}
class tg extends ln {
  constructor(t) {
    super(),
      (t = t || {}),
      (this.delta_ = t.delta ? t.delta : 1),
      (this.duration_ = t.duration !== void 0 ? t.duration : 250);
  }
  handleEvent(t) {
    let e = !1;
    if (t.type == Q.DBLCLICK) {
      const i = t.originalEvent,
        n = t.map,
        r = t.coordinate,
        o = i.shiftKey ? -this.delta_ : this.delta_,
        a = n.getView();
      ra(a, o, r, this.duration_), i.preventDefault(), (e = !0);
    }
    return !e;
  }
}
function co(s) {
  const t = arguments;
  return function (e) {
    let i = !0;
    for (let n = 0, r = t.length; n < r && ((i = i && t[n](e)), !!i); ++n);
    return i;
  };
}
const eg = function (s) {
    const t = s.originalEvent;
    return t.altKey && !(t.metaKey || t.ctrlKey) && !t.shiftKey;
  },
  ig = function (s) {
    const t = s.originalEvent;
    return t.altKey && !(t.metaKey || t.ctrlKey) && t.shiftKey;
  },
  ng = function (s) {
    const t = s.map.getTargetElement(),
      e = t.getRootNode(),
      i = s.map.getOwnerDocument().activeElement;
    return e instanceof ShadowRoot ? e.host.contains(i) : t.contains(i);
  },
  Xh = function (s) {
    const t = s.map.getTargetElement(),
      e = t.getRootNode();
    return (e instanceof ShadowRoot ? e.host : t).hasAttribute("tabindex")
      ? ng(s)
      : !0;
  },
  Gs = De,
  sg = function (s) {
    return s.type == Q.CLICK;
  },
  Wh = function (s) {
    const t = s.originalEvent;
    return (
      t instanceof PointerEvent && t.button == 0 && !(Fu && lh && t.ctrlKey)
    );
  },
  uo = Ei,
  rg = function (s) {
    return s.type == "pointermove";
  },
  jh = function (s) {
    return s.type == Q.SINGLECLICK;
  },
  oa = function (s) {
    const t = s.originalEvent;
    return !t.altKey && !(t.metaKey || t.ctrlKey) && !t.shiftKey;
  },
  og = function (s) {
    const t = s.originalEvent;
    return lh ? t.metaKey : t.ctrlKey;
  },
  aa = function (s) {
    const t = s.originalEvent;
    return !t.altKey && !(t.metaKey || t.ctrlKey) && t.shiftKey;
  },
  Yh = function (s) {
    const t = s.originalEvent,
      e = t.target.tagName;
    return (
      e !== "INPUT" &&
      e !== "SELECT" &&
      e !== "TEXTAREA" &&
      !t.target.isContentEditable
    );
  },
  Dr = function (s) {
    const t = s.originalEvent;
    return t instanceof PointerEvent && t.pointerType == "mouse";
  },
  Vh = function (s) {
    const t = s.originalEvent;
    return t instanceof PointerEvent && t.isPrimary && t.button === 0;
  };
class ni extends ln {
  constructor(t) {
    (t = t || {}),
      super(t),
      t.handleDownEvent && (this.handleDownEvent = t.handleDownEvent),
      t.handleDragEvent && (this.handleDragEvent = t.handleDragEvent),
      t.handleMoveEvent && (this.handleMoveEvent = t.handleMoveEvent),
      t.handleUpEvent && (this.handleUpEvent = t.handleUpEvent),
      t.stopDown && (this.stopDown = t.stopDown),
      (this.handlingDownUpSequence = !1),
      (this.targetPointers = []);
  }
  getPointerCount() {
    return this.targetPointers.length;
  }
  handleDownEvent(t) {
    return !1;
  }
  handleDragEvent(t) {}
  handleEvent(t) {
    if (!t.originalEvent) return !0;
    let e = !1;
    if ((this.updateTrackedPointers_(t), this.handlingDownUpSequence)) {
      if (t.type == Q.POINTERDRAG)
        this.handleDragEvent(t), t.originalEvent.preventDefault();
      else if (t.type == Q.POINTERUP) {
        const i = this.handleUpEvent(t);
        this.handlingDownUpSequence = i && this.targetPointers.length > 0;
      }
    } else if (t.type == Q.POINTERDOWN) {
      const i = this.handleDownEvent(t);
      (this.handlingDownUpSequence = i), (e = this.stopDown(i));
    } else t.type == Q.POINTERMOVE && this.handleMoveEvent(t);
    return !e;
  }
  handleMoveEvent(t) {}
  handleUpEvent(t) {
    return !1;
  }
  stopDown(t) {
    return t;
  }
  updateTrackedPointers_(t) {
    t.activePointers && (this.targetPointers = t.activePointers);
  }
}
function la(s) {
  const t = s.length;
  let e = 0,
    i = 0;
  for (let n = 0; n < t; n++) (e += s[n].clientX), (i += s[n].clientY);
  return { clientX: e / t, clientY: i / t };
}
class ag extends ni {
  constructor(t) {
    super({ stopDown: Ei }),
      (t = t || {}),
      (this.kinetic_ = t.kinetic),
      (this.lastCentroid = null),
      this.lastPointersCount_,
      (this.panning_ = !1);
    const e = t.condition ? t.condition : co(oa, Vh);
    (this.condition_ = t.onFocusOnly ? co(Xh, e) : e), (this.noKinetic_ = !1);
  }
  handleDragEvent(t) {
    const e = t.map;
    this.panning_ || ((this.panning_ = !0), e.getView().beginInteraction());
    const i = this.targetPointers,
      n = e.getEventPixel(la(i));
    if (i.length == this.lastPointersCount_) {
      if (
        (this.kinetic_ && this.kinetic_.update(n[0], n[1]), this.lastCentroid)
      ) {
        const r = [this.lastCentroid[0] - n[0], n[1] - this.lastCentroid[1]],
          a = t.map.getView();
        Mc(r, a.getResolution()),
          Ro(r, a.getRotation()),
          a.adjustCenterInternal(r);
      }
    } else this.kinetic_ && this.kinetic_.begin();
    (this.lastCentroid = n),
      (this.lastPointersCount_ = i.length),
      t.originalEvent.preventDefault();
  }
  handleUpEvent(t) {
    const e = t.map,
      i = e.getView();
    if (this.targetPointers.length === 0) {
      if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
        const n = this.kinetic_.getDistance(),
          r = this.kinetic_.getAngle(),
          o = i.getCenterInternal(),
          a = e.getPixelFromCoordinateInternal(o),
          l = e.getCoordinateFromPixelInternal([
            a[0] - n * Math.cos(r),
            a[1] - n * Math.sin(r),
          ]);
        i.animateInternal({
          center: i.getConstrainedCenter(l),
          duration: 500,
          easing: an,
        });
      }
      return this.panning_ && ((this.panning_ = !1), i.endInteraction()), !1;
    }
    return (
      this.kinetic_ && this.kinetic_.begin(), (this.lastCentroid = null), !0
    );
  }
  handleDownEvent(t) {
    if (this.targetPointers.length > 0 && this.condition_(t)) {
      const i = t.map.getView();
      return (
        (this.lastCentroid = null),
        i.getAnimating() && i.cancelAnimations(),
        this.kinetic_ && this.kinetic_.begin(),
        (this.noKinetic_ = this.targetPointers.length > 1),
        !0
      );
    }
    return !1;
  }
}
class lg extends ni {
  constructor(t) {
    (t = t || {}),
      super({ stopDown: Ei }),
      (this.condition_ = t.condition ? t.condition : ig),
      (this.lastAngle_ = void 0),
      (this.duration_ = t.duration !== void 0 ? t.duration : 250);
  }
  handleDragEvent(t) {
    if (!Dr(t)) return;
    const e = t.map,
      i = e.getView();
    if (i.getConstraints().rotation === ta) return;
    const n = e.getSize(),
      r = t.pixel,
      o = Math.atan2(n[1] / 2 - r[1], r[0] - n[0] / 2);
    if (this.lastAngle_ !== void 0) {
      const a = o - this.lastAngle_;
      i.adjustRotationInternal(-a);
    }
    this.lastAngle_ = o;
  }
  handleUpEvent(t) {
    return Dr(t) ? (t.map.getView().endInteraction(this.duration_), !1) : !0;
  }
  handleDownEvent(t) {
    return Dr(t) && Wh(t) && this.condition_(t)
      ? (t.map.getView().beginInteraction(), (this.lastAngle_ = void 0), !0)
      : !1;
  }
}
class hg extends Xs {
  constructor(t) {
    super(),
      (this.geometry_ = null),
      (this.element_ = document.createElement("div")),
      (this.element_.style.position = "absolute"),
      (this.element_.style.pointerEvents = "auto"),
      (this.element_.className = "ol-box " + t),
      (this.map_ = null),
      (this.startPixel_ = null),
      (this.endPixel_ = null);
  }
  disposeInternal() {
    this.setMap(null);
  }
  render_() {
    const t = this.startPixel_,
      e = this.endPixel_,
      i = "px",
      n = this.element_.style;
    (n.left = Math.min(t[0], e[0]) + i),
      (n.top = Math.min(t[1], e[1]) + i),
      (n.width = Math.abs(e[0] - t[0]) + i),
      (n.height = Math.abs(e[1] - t[1]) + i);
  }
  setMap(t) {
    if (this.map_) {
      this.map_.getOverlayContainer().removeChild(this.element_);
      const e = this.element_.style;
      (e.left = "inherit"),
        (e.top = "inherit"),
        (e.width = "inherit"),
        (e.height = "inherit");
    }
    (this.map_ = t),
      this.map_ && this.map_.getOverlayContainer().appendChild(this.element_);
  }
  setPixels(t, e) {
    (this.startPixel_ = t),
      (this.endPixel_ = e),
      this.createOrUpdateGeometry(),
      this.render_();
  }
  createOrUpdateGeometry() {
    if (!this.map_) return;
    const t = this.startPixel_,
      e = this.endPixel_,
      n = [t, [t[0], e[1]], e, [e[0], t[1]]].map(
        this.map_.getCoordinateFromPixelInternal,
        this.map_,
      );
    (n[4] = n[0].slice()),
      this.geometry_
        ? this.geometry_.setCoordinates([n])
        : (this.geometry_ = new ae([n]));
  }
  getGeometry() {
    return this.geometry_;
  }
}
const Fi = {
  BOXSTART: "boxstart",
  BOXDRAG: "boxdrag",
  BOXEND: "boxend",
  BOXCANCEL: "boxcancel",
};
class mn extends Kt {
  constructor(t, e, i) {
    super(t), (this.coordinate = e), (this.mapBrowserEvent = i);
  }
}
class cg extends ni {
  constructor(t) {
    super(),
      this.on,
      this.once,
      this.un,
      (t = t ?? {}),
      (this.box_ = new hg(t.className || "ol-dragbox")),
      (this.minArea_ = t.minArea ?? 64),
      t.onBoxEnd && (this.onBoxEnd = t.onBoxEnd),
      (this.startPixel_ = null),
      (this.condition_ = t.condition ?? Wh),
      (this.boxEndCondition_ =
        t.boxEndCondition ?? this.defaultBoxEndCondition);
  }
  defaultBoxEndCondition(t, e, i) {
    const n = i[0] - e[0],
      r = i[1] - e[1];
    return n * n + r * r >= this.minArea_;
  }
  getGeometry() {
    return this.box_.getGeometry();
  }
  handleDragEvent(t) {
    this.startPixel_ &&
      (this.box_.setPixels(this.startPixel_, t.pixel),
      this.dispatchEvent(new mn(Fi.BOXDRAG, t.coordinate, t)));
  }
  handleUpEvent(t) {
    if (!this.startPixel_) return !1;
    const e = this.boxEndCondition_(t, this.startPixel_, t.pixel);
    return (
      e && this.onBoxEnd(t),
      this.dispatchEvent(new mn(e ? Fi.BOXEND : Fi.BOXCANCEL, t.coordinate, t)),
      this.box_.setMap(null),
      (this.startPixel_ = null),
      !1
    );
  }
  handleDownEvent(t) {
    return this.condition_(t)
      ? ((this.startPixel_ = t.pixel),
        this.box_.setMap(t.map),
        this.box_.setPixels(this.startPixel_, this.startPixel_),
        this.dispatchEvent(new mn(Fi.BOXSTART, t.coordinate, t)),
        !0)
      : !1;
  }
  onBoxEnd(t) {}
  setActive(t) {
    t ||
      (this.box_.setMap(null),
      this.startPixel_ &&
        (this.dispatchEvent(new mn(Fi.BOXCANCEL, this.startPixel_, null)),
        (this.startPixel_ = null))),
      super.setActive(t);
  }
  setMap(t) {
    this.getMap() &&
      (this.box_.setMap(null),
      this.startPixel_ &&
        (this.dispatchEvent(new mn(Fi.BOXCANCEL, this.startPixel_, null)),
        (this.startPixel_ = null))),
      super.setMap(t);
  }
}
class ug extends cg {
  constructor(t) {
    t = t || {};
    const e = t.condition ? t.condition : aa;
    super({
      condition: e,
      className: t.className || "ol-dragzoom",
      minArea: t.minArea,
    }),
      (this.duration_ = t.duration !== void 0 ? t.duration : 200),
      (this.out_ = t.out !== void 0 ? t.out : !1);
  }
  onBoxEnd(t) {
    const i = this.getMap().getView();
    let n = this.getGeometry();
    if (this.out_) {
      const r = i.rotatedExtentForGeometry(n),
        o = i.getResolutionForExtentInternal(r),
        a = i.getResolution() / o;
      (n = n.clone()), n.scale(a * a);
    }
    i.fitInternal(n, { duration: this.duration_, easing: an });
  }
}
const li = {
  LEFT: "ArrowLeft",
  UP: "ArrowUp",
  RIGHT: "ArrowRight",
  DOWN: "ArrowDown",
};
class dg extends ln {
  constructor(t) {
    super(),
      (t = t || {}),
      (this.defaultCondition_ = function (e) {
        return oa(e) && Yh(e);
      }),
      (this.condition_ =
        t.condition !== void 0 ? t.condition : this.defaultCondition_),
      (this.duration_ = t.duration !== void 0 ? t.duration : 100),
      (this.pixelDelta_ = t.pixelDelta !== void 0 ? t.pixelDelta : 128);
  }
  handleEvent(t) {
    let e = !1;
    if (t.type == j.KEYDOWN) {
      const i = t.originalEvent,
        n = i.key;
      if (
        this.condition_(t) &&
        (n == li.DOWN || n == li.LEFT || n == li.RIGHT || n == li.UP)
      ) {
        const o = t.map.getView(),
          a = o.getResolution() * this.pixelDelta_;
        let l = 0,
          c = 0;
        n == li.DOWN
          ? (c = -a)
          : n == li.LEFT
            ? (l = -a)
            : n == li.RIGHT
              ? (l = a)
              : (c = a);
        const h = [l, c];
        Ro(h, o.getRotation()),
          Qf(o, h, this.duration_),
          i.preventDefault(),
          (e = !0);
      }
    }
    return !e;
  }
}
class fg extends ln {
  constructor(t) {
    super(),
      (t = t || {}),
      (this.condition_ = t.condition
        ? t.condition
        : function (e) {
            return !og(e) && Yh(e);
          }),
      (this.delta_ = t.delta ? t.delta : 1),
      (this.duration_ = t.duration !== void 0 ? t.duration : 100);
  }
  handleEvent(t) {
    let e = !1;
    if (t.type == j.KEYDOWN || t.type == j.KEYPRESS) {
      const i = t.originalEvent,
        n = i.key;
      if (this.condition_(t) && (n === "+" || n === "-")) {
        const r = t.map,
          o = n === "+" ? this.delta_ : -this.delta_,
          a = r.getView();
        ra(a, o, void 0, this.duration_), i.preventDefault(), (e = !0);
      }
    }
    return !e;
  }
}
class gg extends ln {
  constructor(t) {
    (t = t || {}),
      super(t),
      (this.totalDelta_ = 0),
      (this.lastDelta_ = 0),
      (this.maxDelta_ = t.maxDelta !== void 0 ? t.maxDelta : 1),
      (this.duration_ = t.duration !== void 0 ? t.duration : 250),
      (this.timeout_ = t.timeout !== void 0 ? t.timeout : 80),
      (this.useAnchor_ = t.useAnchor !== void 0 ? t.useAnchor : !0),
      (this.constrainResolution_ =
        t.constrainResolution !== void 0 ? t.constrainResolution : !1);
    const e = t.condition ? t.condition : Gs;
    (this.condition_ = t.onFocusOnly ? co(Xh, e) : e),
      (this.lastAnchor_ = null),
      (this.startTime_ = void 0),
      this.timeoutId_,
      (this.mode_ = void 0),
      (this.trackpadEventGap_ = 400),
      this.trackpadTimeoutId_,
      (this.deltaPerZoom_ = 300);
  }
  endInteraction_() {
    this.trackpadTimeoutId_ = void 0;
    const t = this.getMap();
    if (!t) return;
    t.getView().endInteraction(
      void 0,
      this.lastDelta_ ? (this.lastDelta_ > 0 ? 1 : -1) : 0,
      this.lastAnchor_ ? t.getCoordinateFromPixel(this.lastAnchor_) : null,
    );
  }
  handleEvent(t) {
    if (!this.condition_(t) || t.type !== j.WHEEL) return !0;
    const i = t.map,
      n = t.originalEvent;
    n.preventDefault(), this.useAnchor_ && (this.lastAnchor_ = t.pixel);
    let r;
    if (
      (t.type == j.WHEEL &&
        ((r = n.deltaY),
        n.deltaMode === WheelEvent.DOM_DELTA_LINE && (r *= 40)),
      r === 0)
    )
      return !1;
    this.lastDelta_ = r;
    const o = Date.now();
    this.startTime_ === void 0 && (this.startTime_ = o),
      (!this.mode_ || o - this.startTime_ > this.trackpadEventGap_) &&
        (this.mode_ = Math.abs(r) < 4 ? "trackpad" : "wheel");
    const a = i.getView();
    if (
      this.mode_ === "trackpad" &&
      !(a.getConstrainResolution() || this.constrainResolution_)
    )
      return (
        this.trackpadTimeoutId_
          ? clearTimeout(this.trackpadTimeoutId_)
          : (a.getAnimating() && a.cancelAnimations(), a.beginInteraction()),
        (this.trackpadTimeoutId_ = setTimeout(
          this.endInteraction_.bind(this),
          this.timeout_,
        )),
        a.adjustZoom(
          -r / this.deltaPerZoom_,
          this.lastAnchor_ ? i.getCoordinateFromPixel(this.lastAnchor_) : null,
        ),
        (this.startTime_ = o),
        !1
      );
    this.totalDelta_ += r;
    const l = Math.max(this.timeout_ - (o - this.startTime_), 0);
    return (
      clearTimeout(this.timeoutId_),
      (this.timeoutId_ = setTimeout(this.handleWheelZoom_.bind(this, i), l)),
      !1
    );
  }
  handleWheelZoom_(t) {
    const e = t.getView();
    e.getAnimating() && e.cancelAnimations();
    let i =
      -ct(
        this.totalDelta_,
        -this.maxDelta_ * this.deltaPerZoom_,
        this.maxDelta_ * this.deltaPerZoom_,
      ) / this.deltaPerZoom_;
    (e.getConstrainResolution() || this.constrainResolution_) &&
      (i = i ? (i > 0 ? 1 : -1) : 0),
      ra(
        e,
        i,
        this.lastAnchor_ ? t.getCoordinateFromPixel(this.lastAnchor_) : null,
        this.duration_,
      ),
      (this.mode_ = void 0),
      (this.totalDelta_ = 0),
      (this.lastAnchor_ = null),
      (this.startTime_ = void 0),
      (this.timeoutId_ = void 0);
  }
  setMouseAnchor(t) {
    (this.useAnchor_ = t), t || (this.lastAnchor_ = null);
  }
}
class _g extends ni {
  constructor(t) {
    t = t || {};
    const e = t;
    e.stopDown || (e.stopDown = Ei),
      super(e),
      (this.anchor_ = null),
      (this.lastAngle_ = void 0),
      (this.rotating_ = !1),
      (this.rotationDelta_ = 0),
      (this.threshold_ = t.threshold !== void 0 ? t.threshold : 0.3),
      (this.duration_ = t.duration !== void 0 ? t.duration : 250);
  }
  handleDragEvent(t) {
    let e = 0;
    const i = this.targetPointers[0],
      n = this.targetPointers[1],
      r = Math.atan2(n.clientY - i.clientY, n.clientX - i.clientX);
    if (this.lastAngle_ !== void 0) {
      const l = r - this.lastAngle_;
      (this.rotationDelta_ += l),
        !this.rotating_ &&
          Math.abs(this.rotationDelta_) > this.threshold_ &&
          (this.rotating_ = !0),
        (e = l);
    }
    this.lastAngle_ = r;
    const o = t.map,
      a = o.getView();
    a.getConstraints().rotation !== ta &&
      ((this.anchor_ = o.getCoordinateFromPixelInternal(
        o.getEventPixel(la(this.targetPointers)),
      )),
      this.rotating_ &&
        (o.render(), a.adjustRotationInternal(e, this.anchor_)));
  }
  handleUpEvent(t) {
    return this.targetPointers.length < 2
      ? (t.map.getView().endInteraction(this.duration_), !1)
      : !0;
  }
  handleDownEvent(t) {
    if (this.targetPointers.length >= 2) {
      const e = t.map;
      return (
        (this.anchor_ = null),
        (this.lastAngle_ = void 0),
        (this.rotating_ = !1),
        (this.rotationDelta_ = 0),
        this.handlingDownUpSequence || e.getView().beginInteraction(),
        !0
      );
    }
    return !1;
  }
}
class mg extends ni {
  constructor(t) {
    t = t || {};
    const e = t;
    e.stopDown || (e.stopDown = Ei),
      super(e),
      (this.anchor_ = null),
      (this.duration_ = t.duration !== void 0 ? t.duration : 400),
      (this.lastDistance_ = void 0),
      (this.lastScaleDelta_ = 1);
  }
  handleDragEvent(t) {
    let e = 1;
    const i = this.targetPointers[0],
      n = this.targetPointers[1],
      r = i.clientX - n.clientX,
      o = i.clientY - n.clientY,
      a = Math.sqrt(r * r + o * o);
    this.lastDistance_ !== void 0 && (e = this.lastDistance_ / a),
      (this.lastDistance_ = a);
    const l = t.map,
      c = l.getView();
    e != 1 && (this.lastScaleDelta_ = e),
      (this.anchor_ = l.getCoordinateFromPixelInternal(
        l.getEventPixel(la(this.targetPointers)),
      )),
      l.render(),
      c.adjustResolutionInternal(e, this.anchor_);
  }
  handleUpEvent(t) {
    if (this.targetPointers.length < 2) {
      const i = t.map.getView(),
        n = this.lastScaleDelta_ > 1 ? 1 : -1;
      return i.endInteraction(this.duration_, n), !1;
    }
    return !0;
  }
  handleDownEvent(t) {
    if (this.targetPointers.length >= 2) {
      const e = t.map;
      return (
        (this.anchor_ = null),
        (this.lastDistance_ = void 0),
        (this.lastScaleDelta_ = 1),
        this.handlingDownUpSequence || e.getView().beginInteraction(),
        !0
      );
    }
    return !1;
  }
}
function yg(s) {
  s = s || {};
  const t = new Xt(),
    e = new Yf(-0.005, 0.05, 100);
  return (
    (s.altShiftDragRotate !== void 0 ? s.altShiftDragRotate : !0) &&
      t.push(new lg()),
    (s.doubleClickZoom !== void 0 ? s.doubleClickZoom : !0) &&
      t.push(new tg({ delta: s.zoomDelta, duration: s.zoomDuration })),
    (s.dragPan !== void 0 ? s.dragPan : !0) &&
      t.push(new ag({ onFocusOnly: s.onFocusOnly, kinetic: e })),
    (s.pinchRotate !== void 0 ? s.pinchRotate : !0) && t.push(new _g()),
    (s.pinchZoom !== void 0 ? s.pinchZoom : !0) &&
      t.push(new mg({ duration: s.zoomDuration })),
    (s.keyboard !== void 0 ? s.keyboard : !0) &&
      (t.push(new dg()),
      t.push(new fg({ delta: s.zoomDelta, duration: s.zoomDuration }))),
    (s.mouseWheelZoom !== void 0 ? s.mouseWheelZoom : !0) &&
      t.push(new gg({ onFocusOnly: s.onFocusOnly, duration: s.zoomDuration })),
    (s.shiftDragZoom !== void 0 ? s.shiftDragZoom : !0) &&
      t.push(new ug({ duration: s.zoomDuration })),
    t
  );
}
class Ze extends Kt {
  constructor(t, e) {
    super(t), (this.layer = e);
  }
}
const Or = { LAYERS: "layers" };
class si extends Nh {
  constructor(t) {
    t = t || {};
    const e = Object.assign({}, t);
    delete e.layers;
    let i = t.layers;
    super(e),
      this.on,
      this.once,
      this.un,
      (this.layersListenerKeys_ = []),
      (this.listenerKeys_ = {}),
      this.addChangeListener(Or.LAYERS, this.handleLayersChanged_),
      i
        ? Array.isArray(i)
          ? (i = new Xt(i.slice(), { unique: !0 }))
          : st(
              typeof i.getArray == "function",
              "Expected `layers` to be an array or a `Collection`",
            )
        : (i = new Xt(void 0, { unique: !0 })),
      this.setLayers(i);
  }
  handleLayerChange_() {
    this.changed();
  }
  handleLayersChanged_() {
    this.layersListenerKeys_.forEach(lt), (this.layersListenerKeys_.length = 0);
    const t = this.getLayers();
    this.layersListenerKeys_.push(
      $(t, ft.ADD, this.handleLayersAdd_, this),
      $(t, ft.REMOVE, this.handleLayersRemove_, this),
    );
    for (const i in this.listenerKeys_) this.listenerKeys_[i].forEach(lt);
    rn(this.listenerKeys_);
    const e = t.getArray();
    for (let i = 0, n = e.length; i < n; i++) {
      const r = e[i];
      this.registerLayerListeners_(r),
        this.dispatchEvent(new Ze("addlayer", r));
    }
    this.changed();
  }
  registerLayerListeners_(t) {
    const e = [
      $(t, Hi.PROPERTYCHANGE, this.handleLayerChange_, this),
      $(t, j.CHANGE, this.handleLayerChange_, this),
    ];
    t instanceof si &&
      e.push(
        $(t, "addlayer", this.handleLayerGroupAdd_, this),
        $(t, "removelayer", this.handleLayerGroupRemove_, this),
      ),
      (this.listenerKeys_[V(t)] = e);
  }
  handleLayerGroupAdd_(t) {
    this.dispatchEvent(new Ze("addlayer", t.layer));
  }
  handleLayerGroupRemove_(t) {
    this.dispatchEvent(new Ze("removelayer", t.layer));
  }
  handleLayersAdd_(t) {
    const e = t.element;
    this.registerLayerListeners_(e),
      this.dispatchEvent(new Ze("addlayer", e)),
      this.changed();
  }
  handleLayersRemove_(t) {
    const e = t.element,
      i = V(e);
    this.listenerKeys_[i].forEach(lt),
      delete this.listenerKeys_[i],
      this.dispatchEvent(new Ze("removelayer", e)),
      this.changed();
  }
  getLayers() {
    return this.get(Or.LAYERS);
  }
  setLayers(t) {
    const e = this.getLayers();
    if (e) {
      const i = e.getArray();
      for (let n = 0, r = i.length; n < r; ++n)
        this.dispatchEvent(new Ze("removelayer", i[n]));
    }
    this.set(Or.LAYERS, t);
  }
  getLayersArray(t) {
    return (
      (t = t !== void 0 ? t : []),
      this.getLayers().forEach(function (e) {
        e.getLayersArray(t);
      }),
      t
    );
  }
  getLayerStatesArray(t) {
    const e = t !== void 0 ? t : [],
      i = e.length;
    this.getLayers().forEach(function (o) {
      o.getLayerStatesArray(e);
    });
    const n = this.getLayerState();
    let r = n.zIndex;
    !t && n.zIndex === void 0 && (r = 0);
    for (let o = i, a = e.length; o < a; o++) {
      const l = e[o];
      (l.opacity *= n.opacity),
        (l.visible = l.visible && n.visible),
        (l.maxResolution = Math.min(l.maxResolution, n.maxResolution)),
        (l.minResolution = Math.max(l.minResolution, n.minResolution)),
        (l.minZoom = Math.max(l.minZoom, n.minZoom)),
        (l.maxZoom = Math.min(l.maxZoom, n.maxZoom)),
        n.extent !== void 0 &&
          (l.extent !== void 0
            ? (l.extent = gi(l.extent, n.extent))
            : (l.extent = n.extent)),
        l.zIndex === void 0 && (l.zIndex = r);
    }
    return e;
  }
  getSourceState() {
    return "ready";
  }
}
class pg extends Xs {
  constructor(t) {
    super(), (this.map_ = t);
  }
  dispatchRenderEvent(t, e) {
    Y();
  }
  calculateMatrices2D(t) {
    const e = t.viewState,
      i = t.coordinateToPixelTransform,
      n = t.pixelToCoordinateTransform;
    ke(
      i,
      t.size[0] / 2,
      t.size[1] / 2,
      1 / e.resolution,
      -1 / e.resolution,
      -e.rotation,
      -e.center[0],
      -e.center[1],
    ),
      ql(n, i);
  }
  forEachFeatureAtCoordinate(t, e, i, n, r, o, a, l) {
    let c;
    const h = e.viewState;
    function u(x, E, R, L) {
      return r.call(o, E, x ? R : null, L);
    }
    const d = h.projection,
      f = jl(t.slice(), d),
      g = [[0, 0]];
    if (d.canWrapX() && n) {
      const x = d.getExtent(),
        E = at(x);
      g.push([-E, 0], [E, 0]);
    }
    const _ = e.layerStatesArray,
      m = _.length,
      y = [],
      p = [];
    for (let x = 0; x < g.length; x++)
      for (let E = m - 1; E >= 0; --E) {
        const R = _[E],
          L = R.layer;
        if (L.hasRenderer() && ia(R, h) && a.call(l, L)) {
          const I = L.getRenderer(),
            M = L.getSource();
          if (I && M) {
            const F = M.getWrapX() ? f : t,
              z = u.bind(null, R.managed);
            (p[0] = F[0] + g[x][0]),
              (p[1] = F[1] + g[x][1]),
              (c = I.forEachFeatureAtCoordinate(p, e, i, z, y));
          }
          if (c) return c;
        }
      }
    if (y.length === 0) return;
    const C = 1 / y.length;
    return (
      y.forEach((x, E) => (x.distanceSq += E * C)),
      y.sort((x, E) => x.distanceSq - E.distanceSq),
      y.some((x) => (c = x.callback(x.feature, x.layer, x.geometry))),
      c
    );
  }
  hasFeatureAtCoordinate(t, e, i, n, r, o) {
    return (
      this.forEachFeatureAtCoordinate(t, e, i, n, De, this, r, o) !== void 0
    );
  }
  getMap() {
    return this.map_;
  }
  renderFrame(t) {
    Y();
  }
  scheduleExpireIconCache(t) {
    Jt.canExpireCache() && t.postRenderFunctions.push(xg);
  }
}
function xg(s, t) {
  Jt.expire();
}
class Eg extends pg {
  constructor(t) {
    super(t),
      (this.fontChangeListenerKey_ = $(Te, Hi.PROPERTYCHANGE, t.redrawText, t)),
      (this.element_ = document.createElement("div"));
    const e = this.element_.style;
    (e.position = "absolute"),
      (e.width = "100%"),
      (e.height = "100%"),
      (e.zIndex = "0"),
      (this.element_.className = tr + " ol-layers");
    const i = t.getViewport();
    i.insertBefore(this.element_, i.firstChild || null),
      (this.children_ = []),
      (this.renderedVisible_ = !0);
  }
  dispatchRenderEvent(t, e) {
    const i = this.getMap();
    if (i.hasListener(t)) {
      const n = new Lh(t, void 0, e);
      i.dispatchEvent(n);
    }
  }
  disposeInternal() {
    lt(this.fontChangeListenerKey_),
      this.element_.remove(),
      super.disposeInternal();
  }
  renderFrame(t) {
    if (!t) {
      this.renderedVisible_ &&
        ((this.element_.style.display = "none"), (this.renderedVisible_ = !1));
      return;
    }
    this.calculateMatrices2D(t), this.dispatchRenderEvent($t.PRECOMPOSE, t);
    const e = t.layerStatesArray.sort((a, l) => a.zIndex - l.zIndex);
    e.some((a) => a.layer instanceof Bh && a.layer.getDeclutter()) &&
      (t.declutter = {});
    const n = t.viewState;
    this.children_.length = 0;
    const r = [];
    let o = null;
    for (let a = 0, l = e.length; a < l; ++a) {
      const c = e[a];
      t.layerIndex = a;
      const h = c.layer,
        u = h.getSourceState();
      if (!ia(c, n) || (u != "ready" && u != "undefined")) {
        h.unrender();
        continue;
      }
      const d = h.render(t, o);
      d && (d !== o && (this.children_.push(d), (o = d)), r.push(c));
    }
    this.declutter(t, r),
      Du(this.element_, this.children_),
      this.dispatchRenderEvent($t.POSTCOMPOSE, t),
      this.renderedVisible_ ||
        ((this.element_.style.display = ""), (this.renderedVisible_ = !0)),
      this.scheduleExpireIconCache(t);
  }
  declutter(t, e) {
    if (t.declutter) {
      for (let i = e.length - 1; i >= 0; --i) {
        const n = e[i],
          r = n.layer;
        r.getDeclutter() && r.renderDeclutter(t, n);
      }
      e.forEach((i) => i.layer.renderDeferred(t));
    }
  }
}
function Kh(s) {
  if (s instanceof ar) {
    s.setMapInternal(null);
    return;
  }
  s instanceof si && s.getLayers().forEach(Kh);
}
function Uh(s, t) {
  if (s instanceof ar) {
    s.setMapInternal(t);
    return;
  }
  if (s instanceof si) {
    const e = s.getLayers().getArray();
    for (let i = 0, n = e.length; i < n; ++i) Uh(e[i], t);
  }
}
class Zh extends me {
  constructor(t) {
    super(), (t = t || {}), this.on, this.once, this.un;
    const e = Cg(t);
    (this.renderComplete_ = !1),
      (this.loaded_ = !0),
      (this.boundHandleBrowserEvent_ = this.handleBrowserEvent.bind(this)),
      (this.maxTilesLoading_ =
        t.maxTilesLoading !== void 0 ? t.maxTilesLoading : 16),
      (this.pixelRatio_ = t.pixelRatio !== void 0 ? t.pixelRatio : bu),
      this.postRenderTimeoutHandle_,
      this.animationDelayKey_,
      (this.animationDelay_ = this.animationDelay_.bind(this)),
      (this.coordinateToPixelTransform_ = re()),
      (this.pixelToCoordinateTransform_ = re()),
      (this.frameIndex_ = 0),
      (this.frameState_ = null),
      (this.previousExtent_ = null),
      (this.viewPropertyListenerKey_ = null),
      (this.viewChangeListenerKey_ = null),
      (this.layerGroupPropertyListenerKeys_ = null),
      (this.viewport_ = document.createElement("div")),
      (this.viewport_.className =
        "ol-viewport" + ("ontouchstart" in window ? " ol-touch" : "")),
      (this.viewport_.style.position = "relative"),
      (this.viewport_.style.overflow = "hidden"),
      (this.viewport_.style.width = "100%"),
      (this.viewport_.style.height = "100%"),
      (this.overlayContainer_ = document.createElement("div")),
      (this.overlayContainer_.style.position = "absolute"),
      (this.overlayContainer_.style.zIndex = "0"),
      (this.overlayContainer_.style.width = "100%"),
      (this.overlayContainer_.style.height = "100%"),
      (this.overlayContainer_.style.pointerEvents = "none"),
      (this.overlayContainer_.className = "ol-overlaycontainer"),
      this.viewport_.appendChild(this.overlayContainer_),
      (this.overlayContainerStopEvent_ = document.createElement("div")),
      (this.overlayContainerStopEvent_.style.position = "absolute"),
      (this.overlayContainerStopEvent_.style.zIndex = "0"),
      (this.overlayContainerStopEvent_.style.width = "100%"),
      (this.overlayContainerStopEvent_.style.height = "100%"),
      (this.overlayContainerStopEvent_.style.pointerEvents = "none"),
      (this.overlayContainerStopEvent_.className =
        "ol-overlaycontainer-stopevent"),
      this.viewport_.appendChild(this.overlayContainerStopEvent_),
      (this.mapBrowserEventHandler_ = null),
      (this.moveTolerance_ = t.moveTolerance),
      (this.keyboardEventTarget_ = e.keyboardEventTarget),
      (this.targetChangeHandlerKeys_ = null),
      (this.targetElement_ = null),
      (this.resizeObserver_ = new ResizeObserver(() => this.updateSize())),
      (this.controls = e.controls || Jf()),
      (this.interactions = e.interactions || yg({ onFocusOnly: !0 })),
      (this.overlays_ = e.overlays),
      (this.overlayIdIndex_ = {}),
      (this.renderer_ = null),
      (this.postRenderFunctions_ = []),
      (this.tileQueue_ = new Uf(
        this.getTilePriority.bind(this),
        this.handleTileChange_.bind(this),
      )),
      this.addChangeListener(Tt.LAYERGROUP, this.handleLayerGroupChanged_),
      this.addChangeListener(Tt.VIEW, this.handleViewChanged_),
      this.addChangeListener(Tt.SIZE, this.handleSizeChanged_),
      this.addChangeListener(Tt.TARGET, this.handleTargetChanged_),
      this.setProperties(e.values);
    const i = this;
    t.view &&
      !(t.view instanceof ge) &&
      t.view.then(function (n) {
        i.setView(new ge(n));
      }),
      this.controls.addEventListener(ft.ADD, (n) => {
        n.element.setMap(this);
      }),
      this.controls.addEventListener(ft.REMOVE, (n) => {
        n.element.setMap(null);
      }),
      this.interactions.addEventListener(ft.ADD, (n) => {
        n.element.setMap(this);
      }),
      this.interactions.addEventListener(ft.REMOVE, (n) => {
        n.element.setMap(null);
      }),
      this.overlays_.addEventListener(ft.ADD, (n) => {
        this.addOverlayInternal_(n.element);
      }),
      this.overlays_.addEventListener(ft.REMOVE, (n) => {
        const r = n.element.getId();
        r !== void 0 && delete this.overlayIdIndex_[r.toString()],
          n.element.setMap(null);
      }),
      this.controls.forEach((n) => {
        n.setMap(this);
      }),
      this.interactions.forEach((n) => {
        n.setMap(this);
      }),
      this.overlays_.forEach(this.addOverlayInternal_.bind(this));
  }
  addControl(t) {
    this.getControls().push(t);
  }
  addInteraction(t) {
    this.getInteractions().push(t);
  }
  addLayer(t) {
    this.getLayerGroup().getLayers().push(t);
  }
  handleLayerAdd_(t) {
    Uh(t.layer, this);
  }
  addOverlay(t) {
    this.getOverlays().push(t);
  }
  addOverlayInternal_(t) {
    const e = t.getId();
    e !== void 0 && (this.overlayIdIndex_[e.toString()] = t), t.setMap(this);
  }
  disposeInternal() {
    this.controls.clear(),
      this.interactions.clear(),
      this.overlays_.clear(),
      this.resizeObserver_.disconnect(),
      this.setTarget(null),
      super.disposeInternal();
  }
  forEachFeatureAtPixel(t, e, i) {
    if (!this.frameState_ || !this.renderer_) return;
    const n = this.getCoordinateFromPixelInternal(t);
    i = i !== void 0 ? i : {};
    const r = i.hitTolerance !== void 0 ? i.hitTolerance : 0,
      o = i.layerFilter !== void 0 ? i.layerFilter : De,
      a = i.checkWrapped !== !1;
    return this.renderer_.forEachFeatureAtCoordinate(
      n,
      this.frameState_,
      r,
      a,
      e,
      null,
      o,
      null,
    );
  }
  getFeaturesAtPixel(t, e) {
    const i = [];
    return (
      this.forEachFeatureAtPixel(
        t,
        function (n) {
          i.push(n);
        },
        e,
      ),
      i
    );
  }
  getAllLayers() {
    const t = [];
    function e(i) {
      i.forEach(function (n) {
        n instanceof si ? e(n.getLayers()) : t.push(n);
      });
    }
    return e(this.getLayers()), t;
  }
  hasFeatureAtPixel(t, e) {
    if (!this.frameState_ || !this.renderer_) return !1;
    const i = this.getCoordinateFromPixelInternal(t);
    e = e !== void 0 ? e : {};
    const n = e.layerFilter !== void 0 ? e.layerFilter : De,
      r = e.hitTolerance !== void 0 ? e.hitTolerance : 0,
      o = e.checkWrapped !== !1;
    return this.renderer_.hasFeatureAtCoordinate(
      i,
      this.frameState_,
      r,
      o,
      n,
      null,
    );
  }
  getEventCoordinate(t) {
    return this.getCoordinateFromPixel(this.getEventPixel(t));
  }
  getEventCoordinateInternal(t) {
    return this.getCoordinateFromPixelInternal(this.getEventPixel(t));
  }
  getEventPixel(t) {
    const i = this.viewport_.getBoundingClientRect(),
      n = this.getSize(),
      r = i.width / n[0],
      o = i.height / n[1],
      a = "changedTouches" in t ? t.changedTouches[0] : t;
    return [(a.clientX - i.left) / r, (a.clientY - i.top) / o];
  }
  getTarget() {
    return this.get(Tt.TARGET);
  }
  getTargetElement() {
    return this.targetElement_;
  }
  getCoordinateFromPixel(t) {
    return ti(
      this.getCoordinateFromPixelInternal(t),
      this.getView().getProjection(),
    );
  }
  getCoordinateFromPixelInternal(t) {
    const e = this.frameState_;
    return e ? wt(e.pixelToCoordinateTransform, t.slice()) : null;
  }
  getControls() {
    return this.controls;
  }
  getOverlays() {
    return this.overlays_;
  }
  getOverlayById(t) {
    const e = this.overlayIdIndex_[t.toString()];
    return e !== void 0 ? e : null;
  }
  getInteractions() {
    return this.interactions;
  }
  getLayerGroup() {
    return this.get(Tt.LAYERGROUP);
  }
  setLayers(t) {
    const e = this.getLayerGroup();
    if (t instanceof Xt) {
      e.setLayers(t);
      return;
    }
    const i = e.getLayers();
    i.clear(), i.extend(t);
  }
  getLayers() {
    return this.getLayerGroup().getLayers();
  }
  getLoadingOrNotReady() {
    const t = this.getLayerGroup().getLayerStatesArray();
    for (let e = 0, i = t.length; e < i; ++e) {
      const n = t[e];
      if (!n.visible) continue;
      const r = n.layer.getRenderer();
      if (r && !r.ready) return !0;
      const o = n.layer.getSource();
      if (o && o.loading) return !0;
    }
    return !1;
  }
  getPixelFromCoordinate(t) {
    const e = ht(t, this.getView().getProjection());
    return this.getPixelFromCoordinateInternal(e);
  }
  getPixelFromCoordinateInternal(t) {
    const e = this.frameState_;
    return e ? wt(e.coordinateToPixelTransform, t.slice(0, 2)) : null;
  }
  getRenderer() {
    return this.renderer_;
  }
  getSize() {
    return this.get(Tt.SIZE);
  }
  getView() {
    return this.get(Tt.VIEW);
  }
  getViewport() {
    return this.viewport_;
  }
  getOverlayContainer() {
    return this.overlayContainer_;
  }
  getOverlayContainerStopEvent() {
    return this.overlayContainerStopEvent_;
  }
  getOwnerDocument() {
    const t = this.getTargetElement();
    return t ? t.ownerDocument : document;
  }
  getTilePriority(t, e, i, n) {
    return Zf(this.frameState_, t, e, i, n);
  }
  handleBrowserEvent(t, e) {
    e = e || t.type;
    const i = new Re(e, this, t);
    this.handleMapBrowserEvent(i);
  }
  handleMapBrowserEvent(t) {
    if (!this.frameState_) return;
    const e = t.originalEvent,
      i = e.type;
    if (i === lo.POINTERDOWN || i === j.WHEEL || i === j.KEYDOWN) {
      const n = this.getOwnerDocument(),
        r = this.viewport_.getRootNode ? this.viewport_.getRootNode() : n,
        o = e.target,
        a =
          r instanceof ShadowRoot
            ? r.host === o
              ? r.host.ownerDocument
              : r
            : r === n
              ? n.documentElement
              : r;
      if (this.overlayContainerStopEvent_.contains(o) || !a.contains(o)) return;
    }
    if (((t.frameState = this.frameState_), this.dispatchEvent(t) !== !1)) {
      const n = this.getInteractions().getArray().slice();
      for (let r = n.length - 1; r >= 0; r--) {
        const o = n[r];
        if (o.getMap() !== this || !o.getActive() || !this.getTargetElement())
          continue;
        if (!o.handleEvent(t) || t.propagationStopped) break;
      }
    }
  }
  handlePostRender() {
    const t = this.frameState_,
      e = this.tileQueue_;
    if (!e.isEmpty()) {
      let n = this.maxTilesLoading_,
        r = n;
      if (t) {
        const o = t.viewHints;
        if (o[vt.ANIMATING] || o[vt.INTERACTING]) {
          const a = Date.now() - t.time > 8;
          (n = a ? 0 : 8), (r = a ? 0 : 2);
        }
      }
      e.getTilesLoading() < n && (e.reprioritize(), e.loadMoreTiles(n, r));
    }
    t &&
      this.renderer_ &&
      !t.animate &&
      (this.renderComplete_
        ? (this.hasListener($t.RENDERCOMPLETE) &&
            this.renderer_.dispatchRenderEvent($t.RENDERCOMPLETE, t),
          this.loaded_ === !1 &&
            ((this.loaded_ = !0),
            this.dispatchEvent(new Ni(Ue.LOADEND, this, t))))
        : this.loaded_ === !0 &&
          ((this.loaded_ = !1),
          this.dispatchEvent(new Ni(Ue.LOADSTART, this, t))));
    const i = this.postRenderFunctions_;
    if (t) for (let n = 0, r = i.length; n < r; ++n) i[n](this, t);
    i.length = 0;
  }
  handleSizeChanged_() {
    this.getView() &&
      !this.getView().getAnimating() &&
      this.getView().resolveConstraints(0),
      this.render();
  }
  handleTargetChanged_() {
    if (this.mapBrowserEventHandler_) {
      for (let i = 0, n = this.targetChangeHandlerKeys_.length; i < n; ++i)
        lt(this.targetChangeHandlerKeys_[i]);
      (this.targetChangeHandlerKeys_ = null),
        this.viewport_.removeEventListener(
          j.CONTEXTMENU,
          this.boundHandleBrowserEvent_,
        ),
        this.viewport_.removeEventListener(
          j.WHEEL,
          this.boundHandleBrowserEvent_,
        ),
        this.mapBrowserEventHandler_.dispose(),
        (this.mapBrowserEventHandler_ = null),
        this.viewport_.remove();
    }
    if (this.targetElement_) {
      this.resizeObserver_.unobserve(this.targetElement_);
      const i = this.targetElement_.getRootNode();
      i instanceof ShadowRoot && this.resizeObserver_.unobserve(i.host),
        this.setSize(void 0);
    }
    const t = this.getTarget(),
      e = typeof t == "string" ? document.getElementById(t) : t;
    if (((this.targetElement_ = e), !e))
      this.renderer_ &&
        (clearTimeout(this.postRenderTimeoutHandle_),
        (this.postRenderTimeoutHandle_ = void 0),
        (this.postRenderFunctions_.length = 0),
        this.renderer_.dispose(),
        (this.renderer_ = null)),
        this.animationDelayKey_ &&
          (cancelAnimationFrame(this.animationDelayKey_),
          (this.animationDelayKey_ = void 0));
    else {
      e.appendChild(this.viewport_),
        this.renderer_ || (this.renderer_ = new Eg(this)),
        (this.mapBrowserEventHandler_ = new Vf(this, this.moveTolerance_));
      for (const r in Q)
        this.mapBrowserEventHandler_.addEventListener(
          Q[r],
          this.handleMapBrowserEvent.bind(this),
        );
      this.viewport_.addEventListener(
        j.CONTEXTMENU,
        this.boundHandleBrowserEvent_,
        !1,
      ),
        this.viewport_.addEventListener(
          j.WHEEL,
          this.boundHandleBrowserEvent_,
          uh ? { passive: !1 } : !1,
        );
      let i;
      if (this.keyboardEventTarget_) i = this.keyboardEventTarget_;
      else {
        const r = e.getRootNode();
        i = r instanceof ShadowRoot ? r.host : e;
      }
      this.targetChangeHandlerKeys_ = [
        $(i, j.KEYDOWN, this.handleBrowserEvent, this),
        $(i, j.KEYPRESS, this.handleBrowserEvent, this),
      ];
      const n = e.getRootNode();
      n instanceof ShadowRoot && this.resizeObserver_.observe(n.host),
        this.resizeObserver_.observe(e);
    }
    this.updateSize();
  }
  handleTileChange_() {
    this.render();
  }
  handleViewPropertyChanged_() {
    this.render();
  }
  handleViewChanged_() {
    this.viewPropertyListenerKey_ &&
      (lt(this.viewPropertyListenerKey_),
      (this.viewPropertyListenerKey_ = null)),
      this.viewChangeListenerKey_ &&
        (lt(this.viewChangeListenerKey_), (this.viewChangeListenerKey_ = null));
    const t = this.getView();
    t &&
      (this.updateViewportSize_(this.getSize()),
      (this.viewPropertyListenerKey_ = $(
        t,
        Hi.PROPERTYCHANGE,
        this.handleViewPropertyChanged_,
        this,
      )),
      (this.viewChangeListenerKey_ = $(
        t,
        j.CHANGE,
        this.handleViewPropertyChanged_,
        this,
      )),
      t.resolveConstraints(0)),
      this.render();
  }
  handleLayerGroupChanged_() {
    this.layerGroupPropertyListenerKeys_ &&
      (this.layerGroupPropertyListenerKeys_.forEach(lt),
      (this.layerGroupPropertyListenerKeys_ = null));
    const t = this.getLayerGroup();
    t &&
      (this.handleLayerAdd_(new Ze("addlayer", t)),
      (this.layerGroupPropertyListenerKeys_ = [
        $(t, Hi.PROPERTYCHANGE, this.render, this),
        $(t, j.CHANGE, this.render, this),
        $(t, "addlayer", this.handleLayerAdd_, this),
        $(t, "removelayer", this.handleLayerRemove_, this),
      ])),
      this.render();
  }
  isRendered() {
    return !!this.frameState_;
  }
  animationDelay_() {
    (this.animationDelayKey_ = void 0), this.renderFrame_(Date.now());
  }
  renderSync() {
    this.animationDelayKey_ && cancelAnimationFrame(this.animationDelayKey_),
      this.animationDelay_();
  }
  redrawText() {
    const t = this.getLayerGroup().getLayerStatesArray();
    for (let e = 0, i = t.length; e < i; ++e) {
      const n = t[e].layer;
      n.hasRenderer() && n.getRenderer().handleFontsChanged();
    }
  }
  render() {
    this.renderer_ &&
      this.animationDelayKey_ === void 0 &&
      (this.animationDelayKey_ = requestAnimationFrame(this.animationDelay_));
  }
  removeControl(t) {
    return this.getControls().remove(t);
  }
  removeInteraction(t) {
    return this.getInteractions().remove(t);
  }
  removeLayer(t) {
    return this.getLayerGroup().getLayers().remove(t);
  }
  handleLayerRemove_(t) {
    Kh(t.layer);
  }
  removeOverlay(t) {
    return this.getOverlays().remove(t);
  }
  renderFrame_(t) {
    const e = this.getSize(),
      i = this.getView(),
      n = this.frameState_;
    let r = null;
    if (e !== void 0 && el(e) && i && i.isDef()) {
      const o = i.getHints(
          this.frameState_ ? this.frameState_.viewHints : void 0,
        ),
        a = i.getState();
      if (
        ((r = {
          animate: !1,
          coordinateToPixelTransform: this.coordinateToPixelTransform_,
          declutter: null,
          extent: qr(a.center, a.resolution, a.rotation, e),
          index: this.frameIndex_++,
          layerIndex: 0,
          layerStatesArray: this.getLayerGroup().getLayerStatesArray(),
          pixelRatio: this.pixelRatio_,
          pixelToCoordinateTransform: this.pixelToCoordinateTransform_,
          postRenderFunctions: [],
          size: e,
          tileQueue: this.tileQueue_,
          time: t,
          usedTiles: {},
          viewState: a,
          viewHints: o,
          wantedTiles: {},
          mapId: V(this),
          renderTargets: {},
        }),
        a.nextCenter && a.nextResolution)
      ) {
        const l = isNaN(a.nextRotation) ? a.rotation : a.nextRotation;
        r.nextExtent = qr(a.nextCenter, a.nextResolution, l, e);
      }
    }
    (this.frameState_ = r),
      this.renderer_.renderFrame(r),
      r &&
        (r.animate && this.render(),
        Array.prototype.push.apply(
          this.postRenderFunctions_,
          r.postRenderFunctions,
        ),
        n &&
          (!this.previousExtent_ ||
            (!Ks(this.previousExtent_) &&
              !Pn(r.extent, this.previousExtent_))) &&
          (this.dispatchEvent(new Ni(Ue.MOVESTART, this, n)),
          (this.previousExtent_ = Vn(this.previousExtent_))),
        this.previousExtent_ &&
          !r.viewHints[vt.ANIMATING] &&
          !r.viewHints[vt.INTERACTING] &&
          !Pn(r.extent, this.previousExtent_) &&
          (this.dispatchEvent(new Ni(Ue.MOVEEND, this, r)),
          kl(r.extent, this.previousExtent_))),
      this.dispatchEvent(new Ni(Ue.POSTRENDER, this, r)),
      (this.renderComplete_ =
        (this.hasListener(Ue.LOADSTART) ||
          this.hasListener(Ue.LOADEND) ||
          this.hasListener($t.RENDERCOMPLETE)) &&
        !this.tileQueue_.getTilesLoading() &&
        !this.tileQueue_.getCount() &&
        !this.getLoadingOrNotReady()),
      this.postRenderTimeoutHandle_ ||
        (this.postRenderTimeoutHandle_ = setTimeout(() => {
          (this.postRenderTimeoutHandle_ = void 0), this.handlePostRender();
        }, 0));
  }
  setLayerGroup(t) {
    const e = this.getLayerGroup();
    e && this.handleLayerRemove_(new Ze("removelayer", e)),
      this.set(Tt.LAYERGROUP, t);
  }
  setSize(t) {
    this.set(Tt.SIZE, t);
  }
  setTarget(t) {
    this.set(Tt.TARGET, t);
  }
  setView(t) {
    if (!t || t instanceof ge) {
      this.set(Tt.VIEW, t);
      return;
    }
    this.set(Tt.VIEW, new ge());
    const e = this;
    t.then(function (i) {
      e.setView(new ge(i));
    });
  }
  updateSize() {
    const t = this.getTargetElement();
    let e;
    if (t) {
      const n = getComputedStyle(t),
        r =
          t.offsetWidth -
          parseFloat(n.borderLeftWidth) -
          parseFloat(n.paddingLeft) -
          parseFloat(n.paddingRight) -
          parseFloat(n.borderRightWidth),
        o =
          t.offsetHeight -
          parseFloat(n.borderTopWidth) -
          parseFloat(n.paddingTop) -
          parseFloat(n.paddingBottom) -
          parseFloat(n.borderBottomWidth);
      !isNaN(r) &&
        !isNaN(o) &&
        ((e = [Math.max(0, r), Math.max(0, o)]),
        !el(e) &&
          (t.offsetWidth || t.offsetHeight || t.getClientRects().length) &&
          Wl(
            "No map visible because the map container's width or height are 0.",
          ));
    }
    const i = this.getSize();
    e && (!i || !Ne(e, i)) && (this.setSize(e), this.updateViewportSize_(e));
  }
  updateViewportSize_(t) {
    const e = this.getView();
    e && e.setViewportSize(t);
  }
}
function Cg(s) {
  let t = null;
  s.keyboardEventTarget !== void 0 &&
    (t =
      typeof s.keyboardEventTarget == "string"
        ? document.getElementById(s.keyboardEventTarget)
        : s.keyboardEventTarget);
  const e = {},
    i =
      s.layers && typeof s.layers.getLayers == "function"
        ? s.layers
        : new si({ layers: s.layers });
  (e[Tt.LAYERGROUP] = i),
    (e[Tt.TARGET] = s.target),
    (e[Tt.VIEW] = s.view instanceof ge ? s.view : new ge());
  let n;
  s.controls !== void 0 &&
    (Array.isArray(s.controls)
      ? (n = new Xt(s.controls.slice()))
      : (st(
          typeof s.controls.getArray == "function",
          "Expected `controls` to be an array or an `ol/Collection.js`",
        ),
        (n = s.controls)));
  let r;
  s.interactions !== void 0 &&
    (Array.isArray(s.interactions)
      ? (r = new Xt(s.interactions.slice()))
      : (st(
          typeof s.interactions.getArray == "function",
          "Expected `interactions` to be an array or an `ol/Collection.js`",
        ),
        (r = s.interactions)));
  let o;
  return (
    s.overlays !== void 0
      ? Array.isArray(s.overlays)
        ? (o = new Xt(s.overlays.slice()))
        : (st(
            typeof s.overlays.getArray == "function",
            "Expected `overlays` to be an array or an `ol/Collection.js`",
          ),
          (o = s.overlays))
      : (o = new Xt()),
    {
      controls: n,
      interactions: r,
      keyboardEventTarget: t,
      overlays: o,
      values: e,
    }
  );
}
class ha {
  constructor(t, e, i, n) {
    (this.minX = t), (this.maxX = e), (this.minY = i), (this.maxY = n);
  }
  contains(t) {
    return this.containsXY(t[1], t[2]);
  }
  containsTileRange(t) {
    return (
      this.minX <= t.minX &&
      t.maxX <= this.maxX &&
      this.minY <= t.minY &&
      t.maxY <= this.maxY
    );
  }
  containsXY(t, e) {
    return this.minX <= t && t <= this.maxX && this.minY <= e && e <= this.maxY;
  }
  equals(t) {
    return (
      this.minX == t.minX &&
      this.minY == t.minY &&
      this.maxX == t.maxX &&
      this.maxY == t.maxY
    );
  }
  extend(t) {
    t.minX < this.minX && (this.minX = t.minX),
      t.maxX > this.maxX && (this.maxX = t.maxX),
      t.minY < this.minY && (this.minY = t.minY),
      t.maxY > this.maxY && (this.maxY = t.maxY);
  }
  getHeight() {
    return this.maxY - this.minY + 1;
  }
  getSize() {
    return [this.getWidth(), this.getHeight()];
  }
  getWidth() {
    return this.maxX - this.minX + 1;
  }
  intersects(t) {
    return (
      this.minX <= t.maxX &&
      this.maxX >= t.minX &&
      this.minY <= t.maxY &&
      this.maxY >= t.minY
    );
  }
}
function bi(s, t, e, i, n) {
  return n !== void 0
    ? ((n.minX = s), (n.maxX = t), (n.minY = e), (n.maxY = i), n)
    : new ha(s, t, e, i);
}
function fo(s) {
  return s instanceof Image ||
    s instanceof HTMLCanvasElement ||
    s instanceof HTMLVideoElement ||
    s instanceof ImageBitmap
    ? s
    : null;
}
const wg = new Error("disposed"),
  Sg = [256, 256];
class El extends na {
  constructor(t) {
    const e = B.IDLE;
    super(t.tileCoord, e, {
      transition: t.transition,
      interpolate: t.interpolate,
    }),
      (this.loader_ = t.loader),
      (this.data_ = null),
      (this.error_ = null),
      (this.size_ = t.size || null),
      (this.controller_ = t.controller || null);
  }
  getSize() {
    if (this.size_) return this.size_;
    const t = fo(this.data_);
    return t ? [t.width, t.height] : Sg;
  }
  getData() {
    return this.data_;
  }
  getError() {
    return this.error_;
  }
  load() {
    if (this.state !== B.IDLE && this.state !== B.ERROR) return;
    (this.state = B.LOADING), this.changed();
    const t = this;
    this.loader_()
      .then(function (e) {
        (t.data_ = e), (t.state = B.LOADED), t.changed();
      })
      .catch(function (e) {
        (t.error_ = e), (t.state = B.ERROR), t.changed();
      });
  }
  disposeInternal() {
    this.controller_ && (this.controller_.abort(wg), (this.controller_ = null)),
      super.disposeInternal();
  }
}
let kr;
const Ui = [];
function Cl(s, t, e, i, n) {
  s.beginPath(),
    s.moveTo(0, 0),
    s.lineTo(t, e),
    s.lineTo(i, n),
    s.closePath(),
    s.save(),
    s.clip(),
    s.fillRect(0, 0, Math.max(t, i) + 1, Math.max(e, n)),
    s.restore();
}
function Gr(s, t) {
  return (
    Math.abs(s[t * 4] - 210) > 2 || Math.abs(s[t * 4 + 3] - 0.75 * 255) > 2
  );
}
function Tg() {
  if (kr === void 0) {
    const s = xt(6, 6, Ui);
    (s.globalCompositeOperation = "lighter"),
      (s.fillStyle = "rgba(210, 0, 0, 0.75)"),
      Cl(s, 4, 5, 4, 0),
      Cl(s, 4, 5, 0, 5);
    const t = s.getImageData(0, 0, 3, 3).data;
    (kr = Gr(t, 0) || Gr(t, 4) || Gr(t, 8)), Qs(s), Ui.push(s.canvas);
  }
  return kr;
}
function wl(s, t, e, i) {
  const n = Hl(e, t, s);
  let r = Ga(t, i, e);
  const o = t.getMetersPerUnit();
  o !== void 0 && (r *= o);
  const a = s.getMetersPerUnit();
  a !== void 0 && (r /= a);
  const l = s.getExtent();
  if (!l || qi(l, n)) {
    const c = Ga(s, r, n) / r;
    isFinite(c) && c > 0 && (r /= c);
  }
  return r;
}
function Rg(s, t, e, i) {
  const n = Qe(e);
  let r = wl(s, t, n, i);
  return (
    (!isFinite(r) || r <= 0) &&
      So(e, function (o) {
        return (r = wl(s, t, o, i)), isFinite(r) && r > 0;
      }),
    r
  );
}
function vg(s, t, e, i, n, r, o, a, l, c, h, u, d, f) {
  const g = xt(Math.round(e * s), Math.round(e * t), Ui);
  if ((u || (g.imageSmoothingEnabled = !1), l.length === 0)) return g.canvas;
  g.scale(e, e);
  function _(E) {
    return Math.round(E * e) / e;
  }
  g.globalCompositeOperation = "lighter";
  const m = Vt();
  l.forEach(function (E, R, L) {
    Gl(m, E.extent);
  });
  let y;
  const p = e / i,
    C = (u ? 1 : 1 + Math.pow(2, -24)) / p;
  (y = xt(Math.round(at(m) * p), Math.round(Ot(m) * p), Ui)),
    u || (y.imageSmoothingEnabled = !1),
    l.forEach(function (E, R, L) {
      if (E.image.width > 0 && E.image.height > 0) {
        if (E.clipExtent) {
          y.save();
          const k = (E.clipExtent[0] - m[0]) * p,
            b = -(E.clipExtent[3] - m[3]) * p,
            A = at(E.clipExtent) * p,
            U = Ot(E.clipExtent) * p;
          y.rect(
            u ? k : Math.round(k),
            u ? b : Math.round(b),
            u ? A : Math.round(k + A) - Math.round(k),
            u ? U : Math.round(b + U) - Math.round(b),
          ),
            y.clip();
        }
        const I = (E.extent[0] - m[0]) * p,
          M = -(E.extent[3] - m[3]) * p,
          F = at(E.extent) * p,
          z = Ot(E.extent) * p;
        y.drawImage(
          E.image,
          c,
          c,
          E.image.width - 2 * c,
          E.image.height - 2 * c,
          u ? I : Math.round(I),
          u ? M : Math.round(M),
          u ? F : Math.round(I + F) - Math.round(I),
          u ? z : Math.round(M + z) - Math.round(M),
        ),
          E.clipExtent && y.restore();
      }
    });
  const x = wi(o);
  return (
    a.getTriangles().forEach(function (E, R, L) {
      const I = E.source,
        M = E.target;
      let F = I[0][0],
        z = I[0][1],
        k = I[1][0],
        b = I[1][1],
        A = I[2][0],
        U = I[2][1];
      const N = _((M[0][0] - x[0]) / r),
        T = _(-(M[0][1] - x[1]) / r),
        S = _((M[1][0] - x[0]) / r),
        P = _(-(M[1][1] - x[1]) / r),
        D = _((M[2][0] - x[0]) / r),
        X = _(-(M[2][1] - x[1]) / r),
        v = F,
        J = z;
      (F = 0), (z = 0), (k -= v), (b -= J), (A -= v), (U -= J);
      const Z = [
          [k, b, 0, 0, S - N],
          [A, U, 0, 0, D - N],
          [0, 0, k, b, P - T],
          [0, 0, A, U, X - T],
        ],
        O = Rc(Z);
      if (!O) return;
      if ((g.save(), g.beginPath(), Tg() || !u)) {
        g.moveTo(S, P);
        const K = 4,
          rt = N - S,
          nt = T - P;
        for (let ut = 0; ut < K; ut++)
          g.lineTo(S + _(((ut + 1) * rt) / K), P + _((ut * nt) / (K - 1))),
            ut != K - 1 &&
              g.lineTo(
                S + _(((ut + 1) * rt) / K),
                P + _(((ut + 1) * nt) / (K - 1)),
              );
        g.lineTo(D, X);
      } else g.moveTo(S, P), g.lineTo(N, T), g.lineTo(D, X);
      g.clip(),
        g.transform(O[0], O[2], O[1], O[3], N, T),
        g.translate(m[0] - v, m[3] - J);
      let tt;
      if (y) (tt = y.canvas), g.scale(C, -C);
      else {
        const K = l[0],
          rt = K.extent;
        (tt = K.image), g.scale(at(rt) / tt.width, -Ot(rt) / tt.height);
      }
      g.drawImage(tt, 0, 0), g.restore();
    }),
    y && (Qs(y), Ui.push(y.canvas)),
    h &&
      (g.save(),
      (g.globalCompositeOperation = "source-over"),
      (g.strokeStyle = "black"),
      (g.lineWidth = 1),
      a.getTriangles().forEach(function (E, R, L) {
        const I = E.target,
          M = (I[0][0] - x[0]) / r,
          F = -(I[0][1] - x[1]) / r,
          z = (I[1][0] - x[0]) / r,
          k = -(I[1][1] - x[1]) / r,
          b = (I[2][0] - x[0]) / r,
          A = -(I[2][1] - x[1]) / r;
        g.beginPath(),
          g.moveTo(z, k),
          g.lineTo(M, F),
          g.lineTo(b, A),
          g.closePath(),
          g.stroke();
      }),
      g.restore()),
    g.canvas
  );
}
const Ig = 10,
  Sl = 0.25;
class Lg {
  constructor(t, e, i, n, r, o, a) {
    (this.sourceProj_ = t), (this.targetProj_ = e);
    let l = {};
    const c = a
      ? ru((C) => wt(a, Hl(C, this.targetProj_, this.sourceProj_)))
      : bn(this.targetProj_, this.sourceProj_);
    (this.transformInv_ = function (C) {
      const x = C[0] + "/" + C[1];
      return l[x] || (l[x] = c(C)), l[x];
    }),
      (this.maxSourceExtent_ = n),
      (this.errorThresholdSquared_ = r * r),
      (this.triangles_ = []),
      (this.wrapsXInSource_ = !1),
      (this.canWrapXInSource_ =
        this.sourceProj_.canWrapX() &&
        !!n &&
        !!this.sourceProj_.getExtent() &&
        at(n) >= at(this.sourceProj_.getExtent())),
      (this.sourceWorldWidth_ = this.sourceProj_.getExtent()
        ? at(this.sourceProj_.getExtent())
        : null),
      (this.targetWorldWidth_ = this.targetProj_.getExtent()
        ? at(this.targetProj_.getExtent())
        : null);
    const h = wi(i),
      u = Vs(i),
      d = Ys(i),
      f = js(i),
      g = this.transformInv_(h),
      _ = this.transformInv_(u),
      m = this.transformInv_(d),
      y = this.transformInv_(f),
      p =
        Ig +
        (o
          ? Math.max(0, Math.ceil(Math.log2(Hr(i) / (o * o * 256 * 256))))
          : 0);
    if ((this.addQuad_(h, u, d, f, g, _, m, y, p), this.wrapsXInSource_)) {
      let C = 1 / 0;
      this.triangles_.forEach(function (x, E, R) {
        C = Math.min(C, x.source[0][0], x.source[1][0], x.source[2][0]);
      }),
        this.triangles_.forEach((x) => {
          if (
            Math.max(x.source[0][0], x.source[1][0], x.source[2][0]) - C >
            this.sourceWorldWidth_ / 2
          ) {
            const E = [
              [x.source[0][0], x.source[0][1]],
              [x.source[1][0], x.source[1][1]],
              [x.source[2][0], x.source[2][1]],
            ];
            E[0][0] - C > this.sourceWorldWidth_ / 2 &&
              (E[0][0] -= this.sourceWorldWidth_),
              E[1][0] - C > this.sourceWorldWidth_ / 2 &&
                (E[1][0] -= this.sourceWorldWidth_),
              E[2][0] - C > this.sourceWorldWidth_ / 2 &&
                (E[2][0] -= this.sourceWorldWidth_);
            const R = Math.min(E[0][0], E[1][0], E[2][0]);
            Math.max(E[0][0], E[1][0], E[2][0]) - R <
              this.sourceWorldWidth_ / 2 && (x.source = E);
          }
        });
    }
    l = {};
  }
  addTriangle_(t, e, i, n, r, o) {
    this.triangles_.push({ source: [n, r, o], target: [t, e, i] });
  }
  addQuad_(t, e, i, n, r, o, a, l, c) {
    const h = Et([r, o, a, l]),
      u = this.sourceWorldWidth_ ? at(h) / this.sourceWorldWidth_ : null,
      d = this.sourceWorldWidth_,
      f = this.sourceProj_.canWrapX() && u > 0.5 && u < 1;
    let g = !1;
    if (c > 0) {
      if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
        const m = Et([t, e, i, n]);
        g = at(m) / this.targetWorldWidth_ > Sl || g;
      }
      !f && this.sourceProj_.isGlobal() && u && (g = u > Sl || g);
    }
    if (
      !g &&
      this.maxSourceExtent_ &&
      isFinite(h[0]) &&
      isFinite(h[1]) &&
      isFinite(h[2]) &&
      isFinite(h[3]) &&
      !It(h, this.maxSourceExtent_)
    )
      return;
    let _ = 0;
    if (
      !g &&
      (!isFinite(r[0]) ||
        !isFinite(r[1]) ||
        !isFinite(o[0]) ||
        !isFinite(o[1]) ||
        !isFinite(a[0]) ||
        !isFinite(a[1]) ||
        !isFinite(l[0]) ||
        !isFinite(l[1]))
    ) {
      if (c > 0) g = !0;
      else if (
        ((_ =
          (!isFinite(r[0]) || !isFinite(r[1]) ? 8 : 0) +
          (!isFinite(o[0]) || !isFinite(o[1]) ? 4 : 0) +
          (!isFinite(a[0]) || !isFinite(a[1]) ? 2 : 0) +
          (!isFinite(l[0]) || !isFinite(l[1]) ? 1 : 0)),
        _ != 1 && _ != 2 && _ != 4 && _ != 8)
      )
        return;
    }
    if (c > 0) {
      if (!g) {
        const m = [(t[0] + i[0]) / 2, (t[1] + i[1]) / 2],
          y = this.transformInv_(m);
        let p;
        f
          ? (p = (_i(r[0], d) + _i(a[0], d)) / 2 - _i(y[0], d))
          : (p = (r[0] + a[0]) / 2 - y[0]);
        const C = (r[1] + a[1]) / 2 - y[1];
        g = p * p + C * C > this.errorThresholdSquared_;
      }
      if (g) {
        if (Math.abs(t[0] - i[0]) <= Math.abs(t[1] - i[1])) {
          const m = [(e[0] + i[0]) / 2, (e[1] + i[1]) / 2],
            y = this.transformInv_(m),
            p = [(n[0] + t[0]) / 2, (n[1] + t[1]) / 2],
            C = this.transformInv_(p);
          this.addQuad_(t, e, m, p, r, o, y, C, c - 1),
            this.addQuad_(p, m, i, n, C, y, a, l, c - 1);
        } else {
          const m = [(t[0] + e[0]) / 2, (t[1] + e[1]) / 2],
            y = this.transformInv_(m),
            p = [(i[0] + n[0]) / 2, (i[1] + n[1]) / 2],
            C = this.transformInv_(p);
          this.addQuad_(t, m, p, n, r, y, C, l, c - 1),
            this.addQuad_(m, e, i, p, y, o, a, C, c - 1);
        }
        return;
      }
    }
    if (f) {
      if (!this.canWrapXInSource_) return;
      this.wrapsXInSource_ = !0;
    }
    (_ & 11) == 0 && this.addTriangle_(t, i, n, r, a, l),
      (_ & 14) == 0 && this.addTriangle_(t, i, e, r, a, o),
      _ &&
        ((_ & 13) == 0 && this.addTriangle_(e, n, t, o, l, r),
        (_ & 7) == 0 && this.addTriangle_(e, n, i, o, l, a));
  }
  calculateSourceExtent() {
    const t = Vt();
    return (
      this.triangles_.forEach(function (e, i, n) {
        const r = e.source;
        Rn(t, r[0]), Rn(t, r[1]), Rn(t, r[2]);
      }),
      t
    );
  }
  getTriangles() {
    return this.triangles_;
  }
}
const Mg = 0.5;
class Hh extends na {
  constructor(t, e, i, n, r, o, a, l, c, h, u, d) {
    super(r, B.IDLE, d),
      (this.renderEdges_ = u !== void 0 ? u : !1),
      (this.pixelRatio_ = a),
      (this.gutter_ = l),
      (this.canvas_ = null),
      (this.sourceTileGrid_ = e),
      (this.targetTileGrid_ = n),
      (this.wrappedTileCoord_ = o || r),
      (this.sourceTiles_ = []),
      (this.sourcesListenerKeys_ = null),
      (this.sourceZ_ = 0),
      (this.clipExtent_ = t.canWrapX() ? t.getExtent() : void 0);
    const f = n.getTileCoordExtent(this.wrappedTileCoord_),
      g = this.targetTileGrid_.getExtent();
    let _ = this.sourceTileGrid_.getExtent();
    const m = g ? gi(f, g) : f;
    if (Hr(m) === 0) {
      this.state = B.EMPTY;
      return;
    }
    const y = t.getExtent();
    y && (_ ? (_ = gi(_, y)) : (_ = y));
    const p = n.getResolution(this.wrappedTileCoord_[0]),
      C = Rg(t, i, m, p);
    if (!isFinite(C) || C <= 0) {
      this.state = B.EMPTY;
      return;
    }
    const x = h !== void 0 ? h : Mg;
    if (
      ((this.triangulation_ = new Lg(t, i, m, _, C * x, p)),
      this.triangulation_.getTriangles().length === 0)
    ) {
      this.state = B.EMPTY;
      return;
    }
    this.sourceZ_ = e.getZForResolution(C);
    let E = this.triangulation_.calculateSourceExtent();
    if (
      (_ &&
        (t.canWrapX()
          ? ((E[1] = ct(E[1], _[1], _[3])), (E[3] = ct(E[3], _[1], _[3])))
          : (E = gi(E, _))),
      !Hr(E))
    )
      this.state = B.EMPTY;
    else {
      let R = 0,
        L = 0;
      t.canWrapX() && ((R = at(y)), (L = Math.floor((E[0] - y[0]) / R))),
        Xl(E.slice(), t, !0).forEach((M) => {
          const F = e.getTileRangeForExtentAndZ(M, this.sourceZ_);
          for (let z = F.minX; z <= F.maxX; z++)
            for (let k = F.minY; k <= F.maxY; k++) {
              const b = c(this.sourceZ_, z, k, a);
              if (b) {
                const A = L * R;
                this.sourceTiles_.push({ tile: b, offset: A });
              }
            }
          ++L;
        }),
        this.sourceTiles_.length === 0 && (this.state = B.EMPTY);
    }
  }
  getImage() {
    return this.canvas_;
  }
  reproject_() {
    const t = [];
    if (
      (this.sourceTiles_.forEach((e) => {
        var n;
        const i = e.tile;
        if (i && i.getState() == B.LOADED) {
          const r = this.sourceTileGrid_.getTileCoordExtent(i.tileCoord);
          (r[0] += e.offset), (r[2] += e.offset);
          const o = (n = this.clipExtent_) == null ? void 0 : n.slice();
          o && ((o[0] += e.offset), (o[2] += e.offset)),
            t.push({ extent: r, clipExtent: o, image: i.getImage() });
        }
      }),
      (this.sourceTiles_.length = 0),
      t.length === 0)
    )
      this.state = B.ERROR;
    else {
      const e = this.wrappedTileCoord_[0],
        i = this.targetTileGrid_.getTileSize(e),
        n = typeof i == "number" ? i : i[0],
        r = typeof i == "number" ? i : i[1],
        o = this.targetTileGrid_.getResolution(e),
        a = this.sourceTileGrid_.getResolution(this.sourceZ_),
        l = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
      (this.canvas_ = vg(
        n,
        r,
        this.pixelRatio_,
        a,
        this.sourceTileGrid_.getExtent(),
        o,
        l,
        this.triangulation_,
        t,
        this.gutter_,
        this.renderEdges_,
        this.interpolate,
      )),
        (this.state = B.LOADED);
    }
    this.changed();
  }
  load() {
    if (this.state == B.IDLE) {
      (this.state = B.LOADING), this.changed();
      let t = 0;
      (this.sourcesListenerKeys_ = []),
        this.sourceTiles_.forEach(({ tile: e }) => {
          const i = e.getState();
          if (i == B.IDLE || i == B.LOADING) {
            t++;
            const n = $(e, j.CHANGE, (r) => {
              const o = e.getState();
              (o == B.LOADED || o == B.ERROR || o == B.EMPTY) &&
                (lt(n),
                t--,
                t === 0 && (this.unlistenSources_(), this.reproject_()));
            });
            this.sourcesListenerKeys_.push(n);
          }
        }),
        t === 0
          ? setTimeout(this.reproject_.bind(this), 0)
          : this.sourceTiles_.forEach(function ({ tile: e }, i, n) {
              e.getState() == B.IDLE && e.load();
            });
    }
  }
  unlistenSources_() {
    this.sourcesListenerKeys_.forEach(lt), (this.sourcesListenerKeys_ = null);
  }
  release() {
    this.canvas_ &&
      (Qs(this.canvas_.getContext("2d")),
      Ui.push(this.canvas_),
      (this.canvas_ = null)),
      super.release();
  }
}
class Pg {
  constructor(t) {
    (this.highWaterMark = t !== void 0 ? t : 2048),
      (this.count_ = 0),
      (this.entries_ = {}),
      (this.oldest_ = null),
      (this.newest_ = null);
  }
  deleteOldest() {
    const t = this.pop();
    t instanceof Xs && t.dispose();
  }
  canExpireCache() {
    return this.highWaterMark > 0 && this.getCount() > this.highWaterMark;
  }
  expireCache(t) {
    for (; this.canExpireCache(); ) this.deleteOldest();
  }
  clear() {
    for (; this.oldest_; ) this.deleteOldest();
  }
  containsKey(t) {
    return this.entries_.hasOwnProperty(t);
  }
  forEach(t) {
    let e = this.oldest_;
    for (; e; ) t(e.value_, e.key_, this), (e = e.newer);
  }
  get(t, e) {
    const i = this.entries_[t];
    return (
      st(
        i !== void 0,
        "Tried to get a value for a key that does not exist in the cache",
      ),
      i === this.newest_ ||
        (i === this.oldest_
          ? ((this.oldest_ = this.oldest_.newer), (this.oldest_.older = null))
          : ((i.newer.older = i.older), (i.older.newer = i.newer)),
        (i.newer = null),
        (i.older = this.newest_),
        (this.newest_.newer = i),
        (this.newest_ = i)),
      i.value_
    );
  }
  remove(t) {
    const e = this.entries_[t];
    return (
      st(
        e !== void 0,
        "Tried to get a value for a key that does not exist in the cache",
      ),
      e === this.newest_
        ? ((this.newest_ = e.older),
          this.newest_ && (this.newest_.newer = null))
        : e === this.oldest_
          ? ((this.oldest_ = e.newer),
            this.oldest_ && (this.oldest_.older = null))
          : ((e.newer.older = e.older), (e.older.newer = e.newer)),
      delete this.entries_[t],
      --this.count_,
      e.value_
    );
  }
  getCount() {
    return this.count_;
  }
  getKeys() {
    const t = new Array(this.count_);
    let e = 0,
      i;
    for (i = this.newest_; i; i = i.older) t[e++] = i.key_;
    return t;
  }
  getValues() {
    const t = new Array(this.count_);
    let e = 0,
      i;
    for (i = this.newest_; i; i = i.older) t[e++] = i.value_;
    return t;
  }
  peekLast() {
    return this.oldest_.value_;
  }
  peekLastKey() {
    return this.oldest_.key_;
  }
  peekFirstKey() {
    return this.newest_.key_;
  }
  peek(t) {
    var e;
    return (e = this.entries_[t]) == null ? void 0 : e.value_;
  }
  pop() {
    const t = this.oldest_;
    return (
      delete this.entries_[t.key_],
      t.newer && (t.newer.older = null),
      (this.oldest_ = t.newer),
      this.oldest_ || (this.newest_ = null),
      --this.count_,
      t.value_
    );
  }
  replace(t, e) {
    this.get(t), (this.entries_[t].value_ = e);
  }
  set(t, e) {
    st(
      !(t in this.entries_),
      "Tried to set a value for a key that is used already",
    );
    const i = { key_: t, newer: null, older: this.newest_, value_: e };
    this.newest_ ? (this.newest_.newer = i) : (this.oldest_ = i),
      (this.newest_ = i),
      (this.entries_[t] = i),
      ++this.count_;
  }
  setSize(t) {
    this.highWaterMark = t;
  }
}
function Ns(s, t, e, i) {
  return i !== void 0 ? ((i[0] = s), (i[1] = t), (i[2] = e), i) : [s, t, e];
}
function Fg(s, t, e) {
  return s + "/" + t + "/" + e;
}
function bg(s) {
  return Ag(s[0], s[1], s[2]);
}
function Ag(s, t, e) {
  return (t << s) + e;
}
function Dg(s, t) {
  const e = s[0],
    i = s[1],
    n = s[2];
  if (t.getMinZoom() > e || e > t.getMaxZoom()) return !1;
  const r = t.getFullTileRange(e);
  return r ? r.containsXY(i, n) : !0;
}
function Nr(s, t, e, i) {
  return `${s},${Fg(t, e, i)}`;
}
function Br(s, t, e) {
  if (!(e in s)) return (s[e] = new Set([t])), !0;
  const i = s[e],
    n = i.has(t);
  return n || i.add(t), !n;
}
function Og(s, t, e) {
  const i = s[e];
  return i ? i.delete(t) : !1;
}
function Tl(s, t) {
  const e = s.layerStatesArray[s.layerIndex];
  e.extent && (t = gi(t, Le(e.extent, s.viewState.projection)));
  const i = e.layer.getRenderSource();
  if (!i.getWrapX()) {
    const n = i.getTileGridForProjection(s.viewState.projection).getExtent();
    n && (t = gi(t, n));
  }
  return t;
}
class kg extends Mh {
  constructor(t, e) {
    super(t),
      (e = e || {}),
      (this.extentChanged = !0),
      (this.renderComplete = !1),
      (this.renderedExtent_ = null),
      this.renderedPixelRatio,
      (this.renderedProjection = null),
      this.renderedRevision_,
      (this.renderedTiles = []),
      this.renderedSourceKey_,
      this.renderedSourceRevision_,
      (this.tempExtent = Vt()),
      (this.tempTileRange_ = new ha(0, 0, 0, 0)),
      (this.tempTileCoord_ = Ns(0, 0, 0));
    const i = e.cacheSize !== void 0 ? e.cacheSize : 512;
    (this.tileCache_ = new Pg(i)), (this.maxStaleKeys = i * 0.5);
  }
  getTileCache() {
    return this.tileCache_;
  }
  getOrCreateTile(t, e, i, n) {
    const r = this.tileCache_,
      a = this.getLayer().getSource(),
      l = Nr(a.getKey(), t, e, i);
    let c;
    if (r.containsKey(l)) c = r.get(l);
    else {
      if (((c = a.getTile(t, e, i, n.pixelRatio, n.viewState.projection)), !c))
        return null;
      r.set(l, c);
    }
    return c;
  }
  getTile(t, e, i, n) {
    const r = this.getOrCreateTile(t, e, i, n);
    return r || null;
  }
  getData(t) {
    const e = this.frameState;
    if (!e) return null;
    const i = this.getLayer(),
      n = wt(e.pixelToCoordinateTransform, t.slice()),
      r = i.getExtent();
    if (r && !qi(r, n)) return null;
    const o = e.viewState,
      a = i.getRenderSource(),
      l = a.getTileGridForProjection(o.projection),
      c = a.getTilePixelRatio(e.pixelRatio);
    for (let h = l.getZForResolution(o.resolution); h >= l.getMinZoom(); --h) {
      const u = l.getTileCoordForCoordAndZ(n, h),
        d = this.getTile(h, u[1], u[2], e);
      if (!d || d.getState() !== B.LOADED) continue;
      const f = l.getOrigin(h),
        g = Wt(l.getTileSize(h)),
        _ = l.getResolution(h);
      let m;
      if (d instanceof zh || d instanceof Hh) m = d.getImage();
      else if (d instanceof El) {
        if (((m = fo(d.getData())), !m)) continue;
      } else continue;
      const y = Math.floor(c * ((n[0] - f[0]) / _ - u[1] * g[0])),
        p = Math.floor(c * ((f[1] - n[1]) / _ - u[2] * g[1])),
        C = Math.round(c * a.getGutterForProjection(o.projection));
      return this.getImageData(m, y + C, p + C);
    }
    return null;
  }
  prepareFrame(t) {
    this.renderedProjection
      ? t.viewState.projection !== this.renderedProjection &&
        (this.tileCache_.clear(),
        (this.renderedProjection = t.viewState.projection))
      : (this.renderedProjection = t.viewState.projection);
    const e = this.getLayer().getSource();
    if (!e) return !1;
    const i = e.getRevision();
    return (
      this.renderedRevision_
        ? this.renderedRevision_ !== i &&
          ((this.renderedRevision_ = i),
          this.renderedSourceKey_ === e.getKey() && this.tileCache_.clear())
        : (this.renderedRevision_ = i),
      !0
    );
  }
  enqueueTiles(t, e, i, n, r) {
    const o = t.viewState,
      a = this.getLayer(),
      l = a.getRenderSource(),
      c = l.getTileGridForProjection(o.projection),
      h = V(l);
    h in t.wantedTiles || (t.wantedTiles[h] = {});
    const u = t.wantedTiles[h],
      d = a.getMapInternal(),
      f = Math.max(
        i - r,
        c.getMinZoom(),
        c.getZForResolution(
          Math.min(
            a.getMaxResolution(),
            d
              ? d.getView().getResolutionForZoom(Math.max(a.getMinZoom(), 0))
              : c.getResolution(0),
          ),
          l.zDirection,
        ),
      ),
      g = o.rotation,
      _ = g ? Bl(o.center, o.resolution, g, t.size) : void 0;
    for (let m = i; m >= f; --m) {
      const y = c.getTileRangeForExtentAndZ(e, m, this.tempTileRange_),
        p = c.getResolution(m);
      for (let C = y.minX; C <= y.maxX; ++C)
        for (let x = y.minY; x <= y.maxY; ++x) {
          if (g && !c.tileCoordIntersectsViewport([m, C, x], _)) continue;
          const E = this.getTile(m, C, x, t);
          if (!E || !Br(n, E, m)) continue;
          const L = E.getKey();
          if (
            ((u[L] = !0),
            E.getState() === B.IDLE && !t.tileQueue.isKeyQueued(L))
          ) {
            const I = Ns(m, C, x, this.tempTileCoord_);
            t.tileQueue.enqueue([E, h, c.getTileCoordCenter(I), p]);
          }
        }
    }
  }
  findStaleTile_(t, e) {
    const i = this.tileCache_,
      n = t[0],
      r = t[1],
      o = t[2],
      a = this.getStaleKeys();
    for (let l = 0; l < a.length; ++l) {
      const c = Nr(a[l], n, r, o);
      if (i.containsKey(c)) {
        const h = i.peek(c);
        if (h.getState() === B.LOADED)
          return h.endTransition(V(this)), Br(e, h, n), !0;
      }
    }
    return !1;
  }
  findAltTiles_(t, e, i, n) {
    const r = t.getTileRangeForTileCoordAndZ(e, i, this.tempTileRange_);
    if (!r) return !1;
    let o = !0;
    const a = this.tileCache_,
      c = this.getLayer().getRenderSource().getKey();
    for (let h = r.minX; h <= r.maxX; ++h)
      for (let u = r.minY; u <= r.maxY; ++u) {
        const d = Nr(c, i, h, u);
        let f = !1;
        if (a.containsKey(d)) {
          const g = a.peek(d);
          g.getState() === B.LOADED && (Br(n, g, i), (f = !0));
        }
        f || (o = !1);
      }
    return o;
  }
  renderFrame(t, e) {
    this.renderComplete = !0;
    const i = t.layerStatesArray[t.layerIndex],
      n = t.viewState,
      r = n.projection,
      o = n.resolution,
      a = n.center,
      l = t.pixelRatio,
      c = this.getLayer(),
      h = c.getSource(),
      u = h.getTileGridForProjection(r),
      d = u.getZForResolution(o, h.zDirection),
      f = u.getResolution(d),
      g = h.getKey();
    this.renderedSourceKey_
      ? this.renderedSourceKey_ !== g &&
        (this.prependStaleKey(this.renderedSourceKey_),
        (this.renderedSourceKey_ = g))
      : (this.renderedSourceKey_ = g);
    let _ = t.extent;
    const m = h.getTilePixelRatio(l);
    this.prepareContainer(t, e);
    const y = this.context.canvas.width,
      p = this.context.canvas.height,
      C = i.extent && Le(i.extent);
    C && (_ = gi(_, Le(i.extent)));
    const x = (f * y) / 2 / m,
      E = (f * p) / 2 / m,
      R = [a[0] - x, a[1] - E, a[0] + x, a[1] + E],
      L = {};
    this.renderedTiles.length = 0;
    const I = c.getPreload();
    if (t.nextExtent) {
      const S = u.getZForResolution(n.nextResolution, h.zDirection),
        P = Tl(t, t.nextExtent);
      this.enqueueTiles(t, P, S, L, I);
    }
    const M = Tl(t, _);
    if (
      (this.enqueueTiles(t, M, d, L, 0),
      I > 0 &&
        setTimeout(() => {
          this.enqueueTiles(t, M, d - 1, L, I - 1);
        }, 0),
      !(d in L))
    )
      return this.container;
    const F = V(this),
      z = t.time;
    for (const S of L[d]) {
      const P = S.getState();
      if (P === B.EMPTY) continue;
      const D = S.tileCoord;
      if (P === B.LOADED && S.getAlpha(F, z) === 1) {
        S.endTransition(F);
        continue;
      }
      if (
        (P !== B.ERROR && (this.renderComplete = !1), this.findStaleTile_(D, L))
      ) {
        Og(L, S, d), (t.animate = !0);
        continue;
      }
      if (this.findAltTiles_(u, D, d + 1, L)) continue;
      const J = u.getMinZoom();
      for (let Z = d - 1; Z >= J && !this.findAltTiles_(u, D, Z, L); --Z);
    }
    const k = ((f / o) * l) / m,
      b = this.getRenderContext(t);
    ke(this.tempTransform, y / 2, p / 2, k, k, 0, -y / 2, -p / 2),
      i.extent && this.clipUnrotated(b, t, C),
      h.getInterpolate() || (b.imageSmoothingEnabled = !1),
      this.preRender(b, t);
    const A = Object.keys(L).map(Number);
    A.sort(Me);
    let U;
    const N = [],
      T = [];
    for (let S = A.length - 1; S >= 0; --S) {
      const P = A[S],
        D = h.getTilePixelSize(P, l, r),
        v = u.getResolution(P) / f,
        J = D[0] * v * k,
        Z = D[1] * v * k,
        O = u.getTileCoordForCoordAndZ(wi(R), P),
        tt = u.getTileCoordExtent(O),
        K = wt(this.tempTransform, [
          (m * (tt[0] - R[0])) / f,
          (m * (R[3] - tt[3])) / f,
        ]),
        rt = m * h.getGutterForProjection(r);
      for (const nt of L[P]) {
        if (nt.getState() !== B.LOADED) continue;
        const ut = nt.tileCoord,
          Mt = O[1] - ut[1],
          hn = Math.round(K[0] - (Mt - 1) * J),
          Ut = O[2] - ut[2],
          ye = Math.round(K[1] - (Ut - 1) * Z),
          Pt = Math.round(K[0] - Mt * J),
          kt = Math.round(K[1] - Ut * Z),
          ri = hn - Pt,
          ce = ye - kt,
          vi = A.length === 1;
        let ue = !1;
        U = [Pt, kt, Pt + ri, kt, Pt + ri, kt + ce, Pt, kt + ce];
        for (let ze = 0, Xe = N.length; ze < Xe; ++ze)
          if (!vi && P < T[ze]) {
            const _t = N[ze];
            It([Pt, kt, Pt + ri, kt + ce], [_t[0], _t[3], _t[4], _t[7]]) &&
              (ue || (b.save(), (ue = !0)),
              b.beginPath(),
              b.moveTo(U[0], U[1]),
              b.lineTo(U[2], U[3]),
              b.lineTo(U[4], U[5]),
              b.lineTo(U[6], U[7]),
              b.moveTo(_t[6], _t[7]),
              b.lineTo(_t[4], _t[5]),
              b.lineTo(_t[2], _t[3]),
              b.lineTo(_t[0], _t[1]),
              b.clip());
          }
        N.push(U),
          T.push(P),
          this.drawTile(nt, t, Pt, kt, ri, ce, rt, vi),
          ue && b.restore(),
          this.renderedTiles.unshift(nt),
          this.updateUsedTiles(t.usedTiles, h, nt);
      }
    }
    if (
      ((this.renderedResolution = f),
      (this.extentChanged =
        !this.renderedExtent_ || !Pn(this.renderedExtent_, R)),
      (this.renderedExtent_ = R),
      (this.renderedPixelRatio = l),
      this.postRender(this.context, t),
      i.extent && b.restore(),
      (b.imageSmoothingEnabled = !0),
      this.renderComplete)
    ) {
      const S = (P, D) => {
        const X = V(h),
          v = D.wantedTiles[X],
          J = v ? Object.keys(v).length : 0;
        this.updateCacheSize(J), this.tileCache_.expireCache();
      };
      t.postRenderFunctions.push(S);
    }
    return this.container;
  }
  updateCacheSize(t) {
    this.tileCache_.highWaterMark = Math.max(
      this.tileCache_.highWaterMark,
      t * 2,
    );
  }
  drawTile(t, e, i, n, r, o, a, l) {
    let c;
    if (t instanceof El) {
      if (((c = fo(t.getData())), !c))
        throw new Error("Rendering array data is not yet supported");
    } else c = this.getTileImage(t);
    if (!c) return;
    const h = this.getRenderContext(e),
      u = V(this),
      d = e.layerStatesArray[e.layerIndex],
      f = d.opacity * (l ? t.getAlpha(u, e.time) : 1),
      g = f !== h.globalAlpha;
    g && (h.save(), (h.globalAlpha = f)),
      h.drawImage(c, a, a, c.width - 2 * a, c.height - 2 * a, i, n, r, o),
      g && h.restore(),
      f !== d.opacity ? (e.animate = !0) : l && t.endTransition(u);
  }
  getImage() {
    const t = this.context;
    return t ? t.canvas : null;
  }
  getTileImage(t) {
    return t.getImage();
  }
  updateUsedTiles(t, e, i) {
    const n = V(e);
    n in t || (t[n] = {}), (t[n][i.getKey()] = !0);
  }
}
const ds = {
  PRELOAD: "preload",
  USE_INTERIM_TILES_ON_ERROR: "useInterimTilesOnError",
};
class Gg extends ar {
  constructor(t) {
    t = t || {};
    const e = Object.assign({}, t),
      i = t.cacheSize;
    delete t.cacheSize,
      delete e.preload,
      delete e.useInterimTilesOnError,
      super(e),
      this.on,
      this.once,
      this.un,
      (this.cacheSize_ = i),
      this.setPreload(t.preload !== void 0 ? t.preload : 0),
      this.setUseInterimTilesOnError(
        t.useInterimTilesOnError !== void 0 ? t.useInterimTilesOnError : !0,
      );
  }
  getCacheSize() {
    return this.cacheSize_;
  }
  getPreload() {
    return this.get(ds.PRELOAD);
  }
  setPreload(t) {
    this.set(ds.PRELOAD, t);
  }
  getUseInterimTilesOnError() {
    return this.get(ds.USE_INTERIM_TILES_ON_ERROR);
  }
  setUseInterimTilesOnError(t) {
    this.set(ds.USE_INTERIM_TILES_ON_ERROR, t);
  }
  getData(t) {
    return super.getData(t);
  }
}
class Ng extends Gg {
  constructor(t) {
    super(t);
  }
  createRenderer() {
    return new kg(this, { cacheSize: this.getCacheSize() });
  }
}
const Ai = [0, 0, 0],
  Ke = 5;
class qh {
  constructor(t) {
    (this.minZoom = t.minZoom !== void 0 ? t.minZoom : 0),
      (this.resolutions_ = t.resolutions),
      st(
        _c(this.resolutions_, (n, r) => r - n),
        "`resolutions` must be sorted in descending order",
      );
    let e;
    if (!t.origins) {
      for (let n = 0, r = this.resolutions_.length - 1; n < r; ++n)
        if (!e) e = this.resolutions_[n] / this.resolutions_[n + 1];
        else if (this.resolutions_[n] / this.resolutions_[n + 1] !== e) {
          e = void 0;
          break;
        }
    }
    (this.zoomFactor_ = e),
      (this.maxZoom = this.resolutions_.length - 1),
      (this.origin_ = t.origin !== void 0 ? t.origin : null),
      (this.origins_ = null),
      t.origins !== void 0 &&
        ((this.origins_ = t.origins),
        st(
          this.origins_.length == this.resolutions_.length,
          "Number of `origins` and `resolutions` must be equal",
        ));
    const i = t.extent;
    i !== void 0 && !this.origin_ && !this.origins_ && (this.origin_ = wi(i)),
      st(
        (!this.origin_ && this.origins_) || (this.origin_ && !this.origins_),
        "Either `origin` or `origins` must be configured, never both",
      ),
      (this.tileSizes_ = null),
      t.tileSizes !== void 0 &&
        ((this.tileSizes_ = t.tileSizes),
        st(
          this.tileSizes_.length == this.resolutions_.length,
          "Number of `tileSizes` and `resolutions` must be equal",
        )),
      (this.tileSize_ =
        t.tileSize !== void 0 ? t.tileSize : this.tileSizes_ ? null : ea),
      st(
        (!this.tileSize_ && this.tileSizes_) ||
          (this.tileSize_ && !this.tileSizes_),
        "Either `tileSize` or `tileSizes` must be configured, never both",
      ),
      (this.extent_ = i !== void 0 ? i : null),
      (this.fullTileRanges_ = null),
      (this.tmpSize_ = [0, 0]),
      (this.tmpExtent_ = [0, 0, 0, 0]),
      t.sizes !== void 0
        ? (this.fullTileRanges_ = t.sizes.map((n, r) => {
            const o = new ha(
              Math.min(0, n[0]),
              Math.max(n[0] - 1, -1),
              Math.min(0, n[1]),
              Math.max(n[1] - 1, -1),
            );
            if (i) {
              const a = this.getTileRangeForExtentAndZ(i, r);
              (o.minX = Math.max(a.minX, o.minX)),
                (o.maxX = Math.min(a.maxX, o.maxX)),
                (o.minY = Math.max(a.minY, o.minY)),
                (o.maxY = Math.min(a.maxY, o.maxY));
            }
            return o;
          }))
        : i && this.calculateTileRanges_(i);
  }
  forEachTileCoord(t, e, i) {
    const n = this.getTileRangeForExtentAndZ(t, e);
    for (let r = n.minX, o = n.maxX; r <= o; ++r)
      for (let a = n.minY, l = n.maxY; a <= l; ++a) i([e, r, a]);
  }
  forEachTileCoordParentTileRange(t, e, i, n) {
    let r,
      o,
      a,
      l = null,
      c = t[0] - 1;
    for (
      this.zoomFactor_ === 2
        ? ((o = t[1]), (a = t[2]))
        : (l = this.getTileCoordExtent(t, n));
      c >= this.minZoom;

    ) {
      if (
        (o !== void 0 && a !== void 0
          ? ((o = Math.floor(o / 2)),
            (a = Math.floor(a / 2)),
            (r = bi(o, o, a, a, i)))
          : (r = this.getTileRangeForExtentAndZ(l, c, i)),
        e(c, r))
      )
        return !0;
      --c;
    }
    return !1;
  }
  getExtent() {
    return this.extent_;
  }
  getMaxZoom() {
    return this.maxZoom;
  }
  getMinZoom() {
    return this.minZoom;
  }
  getOrigin(t) {
    return this.origin_ ? this.origin_ : this.origins_[t];
  }
  getResolution(t) {
    return this.resolutions_[t];
  }
  getResolutions() {
    return this.resolutions_;
  }
  getTileCoordChildTileRange(t, e, i) {
    if (t[0] < this.maxZoom) {
      if (this.zoomFactor_ === 2) {
        const r = t[1] * 2,
          o = t[2] * 2;
        return bi(r, r + 1, o, o + 1, e);
      }
      const n = this.getTileCoordExtent(t, i || this.tmpExtent_);
      return this.getTileRangeForExtentAndZ(n, t[0] + 1, e);
    }
    return null;
  }
  getTileRangeForTileCoordAndZ(t, e, i) {
    if (e > this.maxZoom || e < this.minZoom) return null;
    const n = t[0],
      r = t[1],
      o = t[2];
    if (e === n) return bi(r, o, r, o, i);
    if (this.zoomFactor_) {
      const l = Math.pow(this.zoomFactor_, e - n),
        c = Math.floor(r * l),
        h = Math.floor(o * l);
      if (e < n) return bi(c, c, h, h, i);
      const u = Math.floor(l * (r + 1)) - 1,
        d = Math.floor(l * (o + 1)) - 1;
      return bi(c, u, h, d, i);
    }
    const a = this.getTileCoordExtent(t, this.tmpExtent_);
    return this.getTileRangeForExtentAndZ(a, e, i);
  }
  getTileRangeForExtentAndZ(t, e, i) {
    this.getTileCoordForXYAndZ_(t[0], t[3], e, !1, Ai);
    const n = Ai[1],
      r = Ai[2];
    this.getTileCoordForXYAndZ_(t[2], t[1], e, !0, Ai);
    const o = Ai[1],
      a = Ai[2];
    return bi(n, o, r, a, i);
  }
  getTileCoordCenter(t) {
    const e = this.getOrigin(t[0]),
      i = this.getResolution(t[0]),
      n = Wt(this.getTileSize(t[0]), this.tmpSize_);
    return [e[0] + (t[1] + 0.5) * n[0] * i, e[1] - (t[2] + 0.5) * n[1] * i];
  }
  getTileCoordExtent(t, e) {
    const i = this.getOrigin(t[0]),
      n = this.getResolution(t[0]),
      r = Wt(this.getTileSize(t[0]), this.tmpSize_),
      o = i[0] + t[1] * r[0] * n,
      a = i[1] - (t[2] + 1) * r[1] * n,
      l = o + r[0] * n,
      c = a + r[1] * n;
    return Oe(o, a, l, c, e);
  }
  getTileCoordForCoordAndResolution(t, e, i) {
    return this.getTileCoordForXYAndResolution_(t[0], t[1], e, !1, i);
  }
  getTileCoordForXYAndResolution_(t, e, i, n, r) {
    const o = this.getZForResolution(i),
      a = i / this.getResolution(o),
      l = this.getOrigin(o),
      c = Wt(this.getTileSize(o), this.tmpSize_);
    let h = (a * (t - l[0])) / i / c[0],
      u = (a * (l[1] - e)) / i / c[1];
    return (
      n
        ? ((h = ns(h, Ke) - 1), (u = ns(u, Ke) - 1))
        : ((h = is(h, Ke)), (u = is(u, Ke))),
      Ns(o, h, u, r)
    );
  }
  getTileCoordForXYAndZ_(t, e, i, n, r) {
    const o = this.getOrigin(i),
      a = this.getResolution(i),
      l = Wt(this.getTileSize(i), this.tmpSize_);
    let c = (t - o[0]) / a / l[0],
      h = (o[1] - e) / a / l[1];
    return (
      n
        ? ((c = ns(c, Ke) - 1), (h = ns(h, Ke) - 1))
        : ((c = is(c, Ke)), (h = is(h, Ke))),
      Ns(i, c, h, r)
    );
  }
  getTileCoordForCoordAndZ(t, e, i) {
    return this.getTileCoordForXYAndZ_(t[0], t[1], e, !1, i);
  }
  getTileCoordResolution(t) {
    return this.resolutions_[t[0]];
  }
  getTileSize(t) {
    return this.tileSize_ ? this.tileSize_ : this.tileSizes_[t];
  }
  getFullTileRange(t) {
    return this.fullTileRanges_
      ? this.fullTileRanges_[t]
      : this.extent_
        ? this.getTileRangeForExtentAndZ(this.extent_, t)
        : null;
  }
  getZForResolution(t, e) {
    const i = Eo(this.resolutions_, t, e || 0);
    return ct(i, this.minZoom, this.maxZoom);
  }
  tileCoordIntersectsViewport(t, e) {
    return rh(e, 0, e.length, 2, this.getTileCoordExtent(t));
  }
  calculateTileRanges_(t) {
    const e = this.resolutions_.length,
      i = new Array(e);
    for (let n = this.minZoom; n < e; ++n)
      i[n] = this.getTileRangeForExtentAndZ(t, n);
    this.fullTileRanges_ = i;
  }
}
function $h(s) {
  let t = s.getDefaultTileGrid();
  return t || ((t = Wg(s)), s.setDefaultTileGrid(t)), t;
}
function Bg(s, t, e) {
  const i = t[0],
    n = s.getTileCoordCenter(t),
    r = ca(e);
  if (!qi(r, n)) {
    const o = at(r),
      a = Math.ceil((r[0] - n[0]) / o);
    return (n[0] += o * a), s.getTileCoordForCoordAndZ(n, i);
  }
  return t;
}
function zg(s, t, e, i) {
  i = i !== void 0 ? i : "top-left";
  const n = Jh(s, t, e);
  return new qh({ extent: s, origin: Cc(s, i), resolutions: n, tileSize: e });
}
function Xg(s) {
  const t = s || {},
    e = t.extent || gt("EPSG:3857").getExtent(),
    i = {
      extent: e,
      minZoom: t.minZoom,
      tileSize: t.tileSize,
      resolutions: Jh(e, t.maxZoom, t.tileSize, t.maxResolution),
    };
  return new qh(i);
}
function Jh(s, t, e, i) {
  (t = t !== void 0 ? t : Gf), (e = Wt(e !== void 0 ? e : ea));
  const n = Ot(s),
    r = at(s);
  i = i > 0 ? i : Math.max(r / e[0], n / e[1]);
  const o = t + 1,
    a = new Array(o);
  for (let l = 0; l < o; ++l) a[l] = i / Math.pow(2, l);
  return a;
}
function Wg(s, t, e, i) {
  const n = ca(s);
  return zg(n, t, e, i);
}
function ca(s) {
  s = gt(s);
  let t = s.getExtent();
  if (!t) {
    const e = (180 * vo.degrees) / s.getMetersPerUnit();
    t = Oe(-e, -e, e, e);
  }
  return t;
}
const jg = /\{z\}/g,
  Yg = /\{x\}/g,
  Vg = /\{y\}/g,
  Kg = /\{-y\}/g;
function Ug(s, t, e, i, n) {
  return s
    .replace(jg, t.toString())
    .replace(Yg, e.toString())
    .replace(Vg, i.toString())
    .replace(Kg, function () {
      if (n === void 0)
        throw new Error(
          "If the URL template has a {-y} placeholder, the grid extent must be known",
        );
      return (n - i).toString();
    });
}
function Zg(s) {
  const t = [];
  let e = /\{([a-z])-([a-z])\}/.exec(s);
  if (e) {
    const i = e[1].charCodeAt(0),
      n = e[2].charCodeAt(0);
    let r;
    for (r = i; r <= n; ++r) t.push(s.replace(e[0], String.fromCharCode(r)));
    return t;
  }
  if (((e = /\{(\d+)-(\d+)\}/.exec(s)), e)) {
    const i = parseInt(e[2], 10);
    for (let n = parseInt(e[1], 10); n <= i; n++)
      t.push(s.replace(e[0], n.toString()));
    return t;
  }
  return t.push(s), t;
}
function Hg(s, t) {
  return function (e, i, n) {
    if (!e) return;
    let r;
    const o = e[0];
    if (t) {
      const a = t.getFullTileRange(o);
      a && (r = a.getHeight() - 1);
    }
    return Ug(s, o, e[1], e[2], r);
  };
}
function qg(s, t) {
  const e = s.length,
    i = new Array(e);
  for (let n = 0; n < e; ++n) i[n] = Hg(s[n], t);
  return $g(i);
}
function $g(s) {
  return s.length === 1
    ? s[0]
    : function (t, e, i) {
        if (!t) return;
        const n = bg(t),
          r = _i(n, s.length);
        return s[r](t, e, i);
      };
}
class Jg extends Th {
  constructor(t) {
    super({
      attributions: t.attributions,
      attributionsCollapsible: t.attributionsCollapsible,
      projection: t.projection,
      state: t.state,
      wrapX: t.wrapX,
      interpolate: t.interpolate,
    }),
      this.on,
      this.once,
      this.un,
      (this.tilePixelRatio_ =
        t.tilePixelRatio !== void 0 ? t.tilePixelRatio : 1),
      (this.tileGrid = t.tileGrid !== void 0 ? t.tileGrid : null);
    const e = [256, 256];
    this.tileGrid &&
      Wt(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()), e),
      (this.tmpSize = [0, 0]),
      (this.key_ = t.key || V(this)),
      (this.tileOptions = {
        transition: t.transition,
        interpolate: t.interpolate,
      }),
      (this.zDirection = t.zDirection ? t.zDirection : 0);
  }
  getGutterForProjection(t) {
    return 0;
  }
  getKey() {
    return this.key_;
  }
  setKey(t) {
    this.key_ !== t && ((this.key_ = t), this.changed());
  }
  getResolutions(t) {
    const e = t ? this.getTileGridForProjection(t) : this.tileGrid;
    return e ? e.getResolutions() : null;
  }
  getTile(t, e, i, n, r) {
    return Y();
  }
  getTileGrid() {
    return this.tileGrid;
  }
  getTileGridForProjection(t) {
    return this.tileGrid ? this.tileGrid : $h(t);
  }
  getTilePixelRatio(t) {
    return this.tilePixelRatio_;
  }
  getTilePixelSize(t, e, i) {
    const n = this.getTileGridForProjection(i),
      r = this.getTilePixelRatio(e),
      o = Wt(n.getTileSize(t), this.tmpSize);
    return r == 1 ? o : wd(o, r, this.tmpSize);
  }
  getTileCoordForTileUrlFunction(t, e) {
    const i = e !== void 0 ? e : this.getProjection(),
      n =
        e !== void 0
          ? this.getTileGridForProjection(i)
          : this.tileGrid || this.getTileGridForProjection(i);
    return (
      this.getWrapX() && i.isGlobal() && (t = Bg(n, t, i)), Dg(t, n) ? t : null
    );
  }
  clear() {}
  refresh() {
    this.clear(), super.refresh();
  }
}
class Qg extends Kt {
  constructor(t, e) {
    super(t), (this.tile = e);
  }
}
const zr = {
  TILELOADSTART: "tileloadstart",
  TILELOADEND: "tileloadend",
  TILELOADERROR: "tileloaderror",
};
class ua extends Jg {
  constructor(t) {
    super({
      attributions: t.attributions,
      cacheSize: t.cacheSize,
      projection: t.projection,
      state: t.state,
      tileGrid: t.tileGrid,
      tilePixelRatio: t.tilePixelRatio,
      wrapX: t.wrapX,
      transition: t.transition,
      interpolate: t.interpolate,
      key: t.key,
      attributionsCollapsible: t.attributionsCollapsible,
      zDirection: t.zDirection,
    }),
      (this.generateTileUrlFunction_ =
        this.tileUrlFunction === ua.prototype.tileUrlFunction),
      (this.tileLoadFunction = t.tileLoadFunction),
      t.tileUrlFunction && (this.tileUrlFunction = t.tileUrlFunction),
      (this.urls = null),
      t.urls ? this.setUrls(t.urls) : t.url && this.setUrl(t.url),
      (this.tileLoadingKeys_ = {});
  }
  getTileLoadFunction() {
    return this.tileLoadFunction;
  }
  getTileUrlFunction() {
    return Object.getPrototypeOf(this).tileUrlFunction === this.tileUrlFunction
      ? this.tileUrlFunction.bind(this)
      : this.tileUrlFunction;
  }
  getUrls() {
    return this.urls;
  }
  handleTileChange(t) {
    const e = t.target,
      i = V(e),
      n = e.getState();
    let r;
    n == B.LOADING
      ? ((this.tileLoadingKeys_[i] = !0), (r = zr.TILELOADSTART))
      : i in this.tileLoadingKeys_ &&
        (delete this.tileLoadingKeys_[i],
        (r =
          n == B.ERROR
            ? zr.TILELOADERROR
            : n == B.LOADED
              ? zr.TILELOADEND
              : void 0)),
      r != null && this.dispatchEvent(new Qg(r, e));
  }
  setTileLoadFunction(t) {
    (this.tileLoadFunction = t), this.changed();
  }
  setTileUrlFunction(t, e) {
    (this.tileUrlFunction = t),
      typeof e < "u" ? this.setKey(e) : this.changed();
  }
  setUrl(t) {
    const e = Zg(t);
    (this.urls = e), this.setUrls(e);
  }
  setUrls(t) {
    this.urls = t;
    const e = t.join(`
`);
    this.generateTileUrlFunction_
      ? this.setTileUrlFunction(qg(t, this.tileGrid), e)
      : this.setKey(e);
  }
  tileUrlFunction(t, e, i) {}
}
class t_ extends ua {
  constructor(t) {
    super({
      attributions: t.attributions,
      cacheSize: t.cacheSize,
      projection: t.projection,
      state: t.state,
      tileGrid: t.tileGrid,
      tileLoadFunction: t.tileLoadFunction ? t.tileLoadFunction : e_,
      tilePixelRatio: t.tilePixelRatio,
      tileUrlFunction: t.tileUrlFunction,
      url: t.url,
      urls: t.urls,
      wrapX: t.wrapX,
      transition: t.transition,
      interpolate: t.interpolate !== void 0 ? t.interpolate : !0,
      key: t.key,
      attributionsCollapsible: t.attributionsCollapsible,
      zDirection: t.zDirection,
    }),
      (this.crossOrigin = t.crossOrigin !== void 0 ? t.crossOrigin : null),
      (this.tileClass = t.tileClass !== void 0 ? t.tileClass : zh),
      (this.tileGridForProjection = {}),
      (this.reprojectionErrorThreshold_ = t.reprojectionErrorThreshold),
      (this.renderReprojectionEdges_ = !1);
  }
  getGutterForProjection(t) {
    return this.getProjection() && t && !Es(this.getProjection(), t)
      ? 0
      : this.getGutter();
  }
  getGutter() {
    return 0;
  }
  getKey() {
    let t = super.getKey();
    return this.getInterpolate() || (t += ":disable-interpolation"), t;
  }
  getTileGridForProjection(t) {
    const e = this.getProjection();
    if (this.tileGrid && (!e || Es(e, t))) return this.tileGrid;
    const i = V(t);
    return (
      i in this.tileGridForProjection ||
        (this.tileGridForProjection[i] = $h(t)),
      this.tileGridForProjection[i]
    );
  }
  createTile_(t, e, i, n, r, o) {
    const a = [t, e, i],
      l = this.getTileCoordForTileUrlFunction(a, r),
      c = l ? this.tileUrlFunction(l, n, r) : void 0,
      h = new this.tileClass(
        a,
        c !== void 0 ? B.IDLE : B.EMPTY,
        c !== void 0 ? c : "",
        this.crossOrigin,
        this.tileLoadFunction,
        this.tileOptions,
      );
    return (
      (h.key = o),
      h.addEventListener(j.CHANGE, this.handleTileChange.bind(this)),
      h
    );
  }
  getTile(t, e, i, n, r) {
    const o = this.getProjection();
    if (!o || !r || Es(o, r)) return this.getTileInternal(t, e, i, n, o || r);
    const a = [t, e, i],
      l = this.getKey(),
      c = this.getTileGridForProjection(o),
      h = this.getTileGridForProjection(r),
      u = this.getTileCoordForTileUrlFunction(a, r),
      d = new Hh(
        o,
        c,
        r,
        h,
        a,
        u,
        this.getTilePixelRatio(n),
        this.getGutter(),
        (f, g, _, m) => this.getTileInternal(f, g, _, m, o),
        this.reprojectionErrorThreshold_,
        this.renderReprojectionEdges_,
        this.tileOptions,
      );
    return (d.key = l), d;
  }
  getTileInternal(t, e, i, n, r) {
    const o = this.getKey();
    return this.createTile_(t, e, i, n, r, o);
  }
  setRenderReprojectionEdges(t) {
    this.renderReprojectionEdges_ != t &&
      ((this.renderReprojectionEdges_ = t), this.changed());
  }
  setTileGridForProjection(t, e) {
    const i = gt(t);
    if (i) {
      const n = V(i);
      n in this.tileGridForProjection || (this.tileGridForProjection[n] = e);
    }
  }
}
function e_(s, t) {
  s.getImage().src = t;
}
class i_ extends t_ {
  constructor(t) {
    t = t || {};
    const e = t.projection !== void 0 ? t.projection : "EPSG:3857",
      i =
        t.tileGrid !== void 0
          ? t.tileGrid
          : Xg({
              extent: ca(e),
              maxResolution: t.maxResolution,
              maxZoom: t.maxZoom,
              minZoom: t.minZoom,
              tileSize: t.tileSize,
            });
    super({
      attributions: t.attributions,
      cacheSize: t.cacheSize,
      crossOrigin: t.crossOrigin,
      interpolate: t.interpolate,
      projection: e,
      reprojectionErrorThreshold: t.reprojectionErrorThreshold,
      tileGrid: i,
      tileLoadFunction: t.tileLoadFunction,
      tilePixelRatio: t.tilePixelRatio,
      tileUrlFunction: t.tileUrlFunction,
      url: t.url,
      urls: t.urls,
      wrapX: t.wrapX !== void 0 ? t.wrapX : !0,
      transition: t.transition,
      attributionsCollapsible: t.attributionsCollapsible,
      zDirection: t.zDirection,
    }),
      (this.gutter_ = t.gutter !== void 0 ? t.gutter : 0);
  }
  getGutter() {
    return this.gutter_;
  }
}
const n_ =
  '&#169; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors.';
class s_ extends i_ {
  constructor(t) {
    t = t || {};
    let e;
    t.attributions !== void 0 ? (e = t.attributions) : (e = [n_]);
    const i = t.crossOrigin !== void 0 ? t.crossOrigin : "anonymous",
      n =
        t.url !== void 0
          ? t.url
          : "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    super({
      attributions: e,
      attributionsCollapsible: !1,
      cacheSize: t.cacheSize,
      crossOrigin: i,
      interpolate: t.interpolate,
      maxZoom: t.maxZoom !== void 0 ? t.maxZoom : 19,
      reprojectionErrorThreshold: t.reprojectionErrorThreshold,
      tileLoadFunction: t.tileLoadFunction,
      transition: t.transition,
      url: n,
      wrapX: t.wrapX,
      zDirection: t.zDirection,
    });
  }
}
class r_ {
  constructor() {
    (this.dataProjection = void 0),
      (this.defaultFeatureProjection = void 0),
      (this.featureClass = Dt),
      (this.supportedMediaTypes = null);
  }
  getReadOptions(t, e) {
    if (e) {
      let i = e.dataProjection ? gt(e.dataProjection) : this.readProjection(t);
      e.extent &&
        i &&
        i.getUnits() === "tile-pixels" &&
        ((i = gt(i)), i.setWorldExtent(e.extent)),
        (e = { dataProjection: i, featureProjection: e.featureProjection });
    }
    return this.adaptOptions(e);
  }
  adaptOptions(t) {
    return Object.assign(
      {
        dataProjection: this.dataProjection,
        featureProjection: this.defaultFeatureProjection,
        featureClass: this.featureClass,
      },
      t,
    );
  }
  getType() {
    return Y();
  }
  readFeature(t, e) {
    return Y();
  }
  readFeatures(t, e) {
    return Y();
  }
  readGeometry(t, e) {
    return Y();
  }
  readProjection(t) {
    return Y();
  }
  writeFeature(t, e) {
    return Y();
  }
  writeFeatures(t, e) {
    return Y();
  }
  writeGeometry(t, e) {
    return Y();
  }
}
function da(s, t, e) {
  const i = e ? gt(e.featureProjection) : null,
    n = e ? gt(e.dataProjection) : null;
  let r = s;
  if (i && n && !Es(i, n)) {
    t && (r = s.clone());
    const o = t ? i : n,
      a = t ? n : i;
    o.getUnits() === "tile-pixels"
      ? r.transform(o, a)
      : r.applyTransform(bn(o, a));
  }
  if (t && e && e.decimals !== void 0) {
    const o = Math.pow(10, e.decimals),
      a = function (l) {
        for (let c = 0, h = l.length; c < h; ++c)
          l[c] = Math.round(l[c] * o) / o;
        return l;
      };
    r === s && (r = s.clone()), r.applyTransform(a);
  }
  return r;
}
const o_ = {
  Point: ee,
  LineString: oe,
  Polygon: ae,
  MultiPoint: Hn,
  MultiLineString: en,
  MultiPolygon: nn,
};
function a_(s, t, e) {
  return Array.isArray(t[0])
    ? (ah(s, 0, t, e) || ((s = s.slice()), io(s, 0, t, e)), s)
    : (Wo(s, 0, t, e) || ((s = s.slice()), Is(s, 0, t, e)), s);
}
function Qh(s, t) {
  var r;
  const e = s.geometry;
  if (!e) return [];
  if (Array.isArray(e)) return e.map((o) => Qh({ ...s, geometry: o })).flat();
  const i = e.type === "MultiPolygon" ? "Polygon" : e.type;
  if (i === "GeometryCollection" || i === "Circle")
    throw new Error("Unsupported geometry type: " + i);
  const n = e.layout.length;
  return da(
    new Yt(
      i,
      i === "Polygon" ? a_(e.flatCoordinates, e.ends, n) : e.flatCoordinates,
      (r = e.ends) == null ? void 0 : r.flat(),
      n,
      s.properties || {},
      s.id,
    ).enableSimplifyTransformed(),
    !1,
    t,
  );
}
function fa(s, t) {
  if (!s) return null;
  if (Array.isArray(s)) {
    const i = s.map((n) => fa(n, t));
    return new Bn(i);
  }
  const e = o_[s.type];
  return da(new e(s.flatCoordinates, s.layout || "XY", s.ends), !1, t);
}
class l_ extends r_ {
  constructor() {
    super();
  }
  getType() {
    return "json";
  }
  readFeature(t, e) {
    return this.readFeatureFromObject(fs(t), this.getReadOptions(t, e));
  }
  readFeatures(t, e) {
    return this.readFeaturesFromObject(fs(t), this.getReadOptions(t, e));
  }
  readFeatureFromObject(t, e) {
    return Y();
  }
  readFeaturesFromObject(t, e) {
    return Y();
  }
  readGeometry(t, e) {
    return this.readGeometryFromObject(fs(t), this.getReadOptions(t, e));
  }
  readGeometryFromObject(t, e) {
    return Y();
  }
  readProjection(t) {
    return this.readProjectionFromObject(fs(t));
  }
  readProjectionFromObject(t) {
    return Y();
  }
  writeFeature(t, e) {
    return JSON.stringify(this.writeFeatureObject(t, e));
  }
  writeFeatureObject(t, e) {
    return Y();
  }
  writeFeatures(t, e) {
    return JSON.stringify(this.writeFeaturesObject(t, e));
  }
  writeFeaturesObject(t, e) {
    return Y();
  }
  writeGeometry(t, e) {
    return JSON.stringify(this.writeGeometryObject(t, e));
  }
  writeGeometryObject(t, e) {
    return Y();
  }
}
function fs(s) {
  if (typeof s == "string") {
    const t = JSON.parse(s);
    return t || null;
  }
  return s !== null ? s : null;
}
class ga extends l_ {
  constructor(t) {
    (t = t || {}),
      super(),
      (this.dataProjection = gt(
        t.dataProjection ? t.dataProjection : "EPSG:4326",
      )),
      t.featureProjection &&
        (this.defaultFeatureProjection = gt(t.featureProjection)),
      t.featureClass && (this.featureClass = t.featureClass),
      (this.geometryName_ = t.geometryName),
      (this.extractGeometryName_ = t.extractGeometryName),
      (this.supportedMediaTypes = [
        "application/geo+json",
        "application/vnd.geo+json",
      ]);
  }
  readFeatureFromObject(t, e) {
    let i = null;
    t.type === "Feature"
      ? (i = t)
      : (i = { type: "Feature", geometry: t, properties: null });
    const n = _a(i.geometry);
    if (this.featureClass === Yt)
      return Qh({ geometry: n, id: i.id, properties: i.properties }, e);
    const r = new Dt();
    return (
      this.geometryName_
        ? r.setGeometryName(this.geometryName_)
        : this.extractGeometryName_ &&
          i.geometry_name &&
          r.setGeometryName(i.geometry_name),
      r.setGeometry(fa(n, e)),
      "id" in i && r.setId(i.id),
      i.properties && r.setProperties(i.properties, !0),
      r
    );
  }
  readFeaturesFromObject(t, e) {
    const i = t;
    let n = null;
    if (i.type === "FeatureCollection") {
      const r = t;
      n = [];
      const o = r.features;
      for (let a = 0, l = o.length; a < l; ++a) {
        const c = this.readFeatureFromObject(o[a], e);
        c && n.push(c);
      }
    } else n = [this.readFeatureFromObject(t, e)];
    return n.flat();
  }
  readGeometryFromObject(t, e) {
    return h_(t, e);
  }
  readProjectionFromObject(t) {
    const e = t.crs;
    let i;
    if (e)
      if (e.type == "name") i = gt(e.properties.name);
      else if (e.type === "EPSG") i = gt("EPSG:" + e.properties.code);
      else throw new Error("Unknown SRS type");
    else i = this.dataProjection;
    return i;
  }
  writeFeatureObject(t, e) {
    e = this.adaptOptions(e);
    const i = { type: "Feature", geometry: null, properties: null },
      n = t.getId();
    if ((n !== void 0 && (i.id = n), !t.hasProperties())) return i;
    const r = t.getProperties(),
      o = t.getGeometry();
    return (
      o && ((i.geometry = go(o, e)), delete r[t.getGeometryName()]),
      mi(r) || (i.properties = r),
      i
    );
  }
  writeFeaturesObject(t, e) {
    e = this.adaptOptions(e);
    const i = [];
    for (let n = 0, r = t.length; n < r; ++n)
      i.push(this.writeFeatureObject(t[n], e));
    return { type: "FeatureCollection", features: i };
  }
  writeGeometryObject(t, e) {
    return go(t, this.adaptOptions(e));
  }
}
function _a(s, t) {
  if (!s) return null;
  let e;
  switch (s.type) {
    case "Point": {
      e = u_(s);
      break;
    }
    case "LineString": {
      e = d_(s);
      break;
    }
    case "Polygon": {
      e = m_(s);
      break;
    }
    case "MultiPoint": {
      e = g_(s);
      break;
    }
    case "MultiLineString": {
      e = f_(s);
      break;
    }
    case "MultiPolygon": {
      e = __(s);
      break;
    }
    case "GeometryCollection": {
      e = c_(s);
      break;
    }
    default:
      throw new Error("Unsupported GeoJSON type: " + s.type);
  }
  return e;
}
function h_(s, t) {
  const e = _a(s);
  return fa(e, t);
}
function c_(s, t) {
  return s.geometries.map(function (i) {
    return _a(i);
  });
}
function u_(s) {
  const t = s.coordinates;
  return { type: "Point", flatCoordinates: t, layout: Si(t.length) };
}
function d_(s) {
  var i;
  const t = s.coordinates,
    e = t.flat();
  return {
    type: "LineString",
    flatCoordinates: e,
    ends: [e.length],
    layout: Si(((i = t[0]) == null ? void 0 : i.length) || 2),
  };
}
function f_(s) {
  var r, o;
  const t = s.coordinates,
    e =
      ((o = (r = t[0]) == null ? void 0 : r[0]) == null ? void 0 : o.length) ||
      2,
    i = [],
    n = Zn(i, 0, t, e);
  return {
    type: "MultiLineString",
    flatCoordinates: i,
    ends: n,
    layout: Si(e),
  };
}
function g_(s) {
  var e;
  const t = s.coordinates;
  return {
    type: "MultiPoint",
    flatCoordinates: t.flat(),
    layout: Si(((e = t[0]) == null ? void 0 : e.length) || 2),
  };
}
function __(s) {
  var r, o;
  const t = s.coordinates,
    e = [],
    i =
      ((o = (r = t[0]) == null ? void 0 : r[0]) == null
        ? void 0
        : o[0].length) || 2,
    n = eh(e, 0, t, i);
  return { type: "MultiPolygon", flatCoordinates: e, ends: n, layout: Si(i) };
}
function m_(s) {
  var r, o;
  const t = s.coordinates,
    e = [],
    i = (o = (r = t[0]) == null ? void 0 : r[0]) == null ? void 0 : o.length,
    n = Zn(e, 0, t, i);
  return { type: "Polygon", flatCoordinates: e, ends: n, layout: Si(i) };
}
function go(s, t) {
  s = da(s, !0, t);
  const e = s.getType();
  let i;
  switch (e) {
    case "Point": {
      i = w_(s);
      break;
    }
    case "LineString": {
      i = p_(s);
      break;
    }
    case "Polygon": {
      i = S_(s, t);
      break;
    }
    case "MultiPoint": {
      i = E_(s);
      break;
    }
    case "MultiLineString": {
      i = x_(s);
      break;
    }
    case "MultiPolygon": {
      i = C_(s, t);
      break;
    }
    case "GeometryCollection": {
      i = y_(s, t);
      break;
    }
    case "Circle": {
      i = { type: "GeometryCollection", geometries: [] };
      break;
    }
    default:
      throw new Error("Unsupported geometry type: " + e);
  }
  return i;
}
function y_(s, t) {
  return (
    (t = Object.assign({}, t)),
    delete t.featureProjection,
    {
      type: "GeometryCollection",
      geometries: s.getGeometriesArray().map(function (i) {
        return go(i, t);
      }),
    }
  );
}
function p_(s, t) {
  return { type: "LineString", coordinates: s.getCoordinates() };
}
function x_(s, t) {
  return { type: "MultiLineString", coordinates: s.getCoordinates() };
}
function E_(s, t) {
  return { type: "MultiPoint", coordinates: s.getCoordinates() };
}
function C_(s, t) {
  let e;
  return (
    t && (e = t.rightHanded),
    { type: "MultiPolygon", coordinates: s.getCoordinates(e) }
  );
}
function w_(s, t) {
  return { type: "Point", coordinates: s.getCoordinates() };
}
function S_(s, t) {
  let e;
  return (
    t && (e = t.rightHanded),
    { type: "Polygon", coordinates: s.getCoordinates(e) }
  );
}
const gs = {
  DRAWSTART: "drawstart",
  DRAWEND: "drawend",
  DRAWABORT: "drawabort",
};
class _s extends Kt {
  constructor(t, e) {
    super(t), (this.feature = e);
  }
}
function T_(s, t) {
  const e = [];
  for (let i = 0; i < t.length; ++i) {
    const r = t[i].getGeometry();
    tc(s, r, e);
  }
  return e;
}
function ms(s, t) {
  return Pe(s[0], s[1], t[0], t[1]);
}
function ji(s, t) {
  const e = s.length;
  return t < 0 ? s[t + e] : t >= e ? s[t - e] : s[t];
}
function ys(s, t, e) {
  let i, n;
  t < e ? ((i = t), (n = e)) : ((i = e), (n = t));
  const r = Math.ceil(i),
    o = Math.floor(n);
  if (r > o) {
    const l = Yi(s, i),
      c = Yi(s, n);
    return ms(l, c);
  }
  let a = 0;
  if (i < r) {
    const l = Yi(s, i),
      c = ji(s, r);
    a += ms(l, c);
  }
  if (o < n) {
    const l = ji(s, o),
      c = Yi(s, n);
    a += ms(l, c);
  }
  for (let l = r; l < o - 1; ++l) {
    const c = ji(s, l),
      h = ji(s, l + 1);
    a += ms(c, h);
  }
  return a;
}
function tc(s, t, e) {
  if (t instanceof oe) {
    ps(s, t.getCoordinates(), !1, e);
    return;
  }
  if (t instanceof en) {
    const i = t.getCoordinates();
    for (let n = 0, r = i.length; n < r; ++n) ps(s, i[n], !1, e);
    return;
  }
  if (t instanceof ae) {
    const i = t.getCoordinates();
    for (let n = 0, r = i.length; n < r; ++n) ps(s, i[n], !0, e);
    return;
  }
  if (t instanceof nn) {
    const i = t.getCoordinates();
    for (let n = 0, r = i.length; n < r; ++n) {
      const o = i[n];
      for (let a = 0, l = o.length; a < l; ++a) ps(s, o[a], !0, e);
    }
    return;
  }
  if (t instanceof Bn) {
    const i = t.getGeometries();
    for (let n = 0; n < i.length; ++n) tc(s, i[n], e);
    return;
  }
}
const Xr = { index: -1, endIndex: NaN };
function R_(s, t, e, i) {
  const n = s[0],
    r = s[1];
  let o = 1 / 0,
    a = -1,
    l = NaN;
  for (let u = 0; u < t.targets.length; ++u) {
    const d = t.targets[u],
      f = d.coordinates;
    let g = 1 / 0,
      _;
    for (let m = 0; m < f.length - 1; ++m) {
      const y = f[m],
        p = f[m + 1],
        C = ec(n, r, y, p);
      C.squaredDistance < g && ((g = C.squaredDistance), (_ = m + C.along));
    }
    g < o &&
      ((o = g),
      d.ring &&
        t.targetIndex === u &&
        (d.endIndex > d.startIndex
          ? _ < d.startIndex && (_ += f.length)
          : d.endIndex < d.startIndex && _ > d.startIndex && (_ -= f.length)),
      (l = _),
      (a = u));
  }
  const c = t.targets[a];
  let h = c.ring;
  if (t.targetIndex === a && h) {
    const u = Yi(c.coordinates, l),
      d = e.getPixelFromCoordinate(u);
    Ss(d, t.startPx) > i && (h = !1);
  }
  if (h) {
    const u = c.coordinates,
      d = u.length,
      f = c.startIndex,
      g = l;
    if (f < g) {
      const _ = ys(u, f, g);
      ys(u, f, g - d) < _ && (l -= d);
    } else {
      const _ = ys(u, f, g);
      ys(u, f, g + d) < _ && (l += d);
    }
  }
  return (Xr.index = a), (Xr.endIndex = l), Xr;
}
function ps(s, t, e, i) {
  const n = s[0],
    r = s[1];
  for (let o = 0, a = t.length - 1; o < a; ++o) {
    const l = t[o],
      c = t[o + 1],
      h = ec(n, r, l, c);
    if (h.squaredDistance === 0) {
      const u = o + h.along;
      i.push({ coordinates: t, ring: e, startIndex: u, endIndex: u });
      return;
    }
  }
}
const Wr = { along: 0, squaredDistance: 0 };
function ec(s, t, e, i) {
  const n = e[0],
    r = e[1],
    o = i[0],
    a = i[1],
    l = o - n,
    c = a - r;
  let h = 0,
    u = n,
    d = r;
  return (
    (l !== 0 || c !== 0) &&
      ((h = ct(((s - n) * l + (t - r) * c) / (l * l + c * c), 0, 1)),
      (u += l * h),
      (d += c * h)),
    (Wr.along = h),
    (Wr.squaredDistance = Kn(Pe(s, t, u, d), 10)),
    Wr
  );
}
function Yi(s, t) {
  const e = s.length;
  let i = Math.floor(t);
  const n = t - i;
  i >= e ? (i -= e) : i < 0 && (i += e);
  let r = i + 1;
  r >= e && (r -= e);
  const o = s[i],
    a = o[0],
    l = o[1],
    c = s[r],
    h = c[0] - a,
    u = c[1] - l;
  return [a + h * n, l + u * n];
}
class v_ extends ni {
  constructor(t) {
    const e = t;
    e.stopDown || (e.stopDown = Ei),
      super(e),
      this.on,
      this.once,
      this.un,
      (this.shouldHandle_ = !1),
      (this.downPx_ = null),
      this.downTimeout_,
      this.lastDragTime_,
      this.pointerType_,
      (this.freehand_ = !1),
      (this.source_ = t.source ? t.source : null),
      (this.features_ = t.features ? t.features : null),
      (this.snapTolerance_ = t.snapTolerance ? t.snapTolerance : 12),
      (this.type_ = t.type),
      (this.mode_ = L_(this.type_)),
      (this.stopClick_ = !!t.stopClick),
      (this.minPoints_ = t.minPoints
        ? t.minPoints
        : this.mode_ === "Polygon"
          ? 3
          : 2),
      (this.maxPoints_ =
        this.mode_ === "Circle" ? 2 : t.maxPoints ? t.maxPoints : 1 / 0),
      (this.finishCondition_ = t.finishCondition ? t.finishCondition : De),
      (this.geometryLayout_ = t.geometryLayout ? t.geometryLayout : "XY");
    let i = t.geometryFunction;
    if (!i) {
      const n = this.mode_;
      if (n === "Circle")
        i = (r, o, a) => {
          const l = o || new er([NaN, NaN]),
            c = ht(r[0]),
            h = Fe(c, ht(r[r.length - 1]));
          return l.setCenterAndRadius(c, Math.sqrt(h), this.geometryLayout_), l;
        };
      else {
        let r;
        n === "Point"
          ? (r = ee)
          : n === "LineString"
            ? (r = oe)
            : n === "Polygon" && (r = ae),
          (i = (o, a, l) => (
            a
              ? n === "Polygon"
                ? o[0].length
                  ? a.setCoordinates(
                      [o[0].concat([o[0][0]])],
                      this.geometryLayout_,
                    )
                  : a.setCoordinates([], this.geometryLayout_)
                : a.setCoordinates(o, this.geometryLayout_)
              : (a = new r(o, this.geometryLayout_)),
            a
          ));
      }
    }
    (this.geometryFunction_ = i),
      (this.dragVertexDelay_ =
        t.dragVertexDelay !== void 0 ? t.dragVertexDelay : 500),
      (this.finishCoordinate_ = null),
      (this.sketchFeature_ = null),
      (this.sketchPoint_ = null),
      (this.sketchCoords_ = null),
      (this.sketchLine_ = null),
      (this.sketchLineCoords_ = null),
      (this.squaredClickTolerance_ = t.clickTolerance
        ? t.clickTolerance * t.clickTolerance
        : 36),
      (this.overlay_ = new Ri({
        source: new on({ useSpatialIndex: !1, wrapX: t.wrapX ? t.wrapX : !1 }),
        style: t.style ? t.style : I_(),
        updateWhileInteracting: !0,
      })),
      (this.geometryName_ = t.geometryName),
      (this.condition_ = t.condition ? t.condition : oa),
      this.freehandCondition_,
      t.freehand
        ? (this.freehandCondition_ = Gs)
        : (this.freehandCondition_ = t.freehandCondition
            ? t.freehandCondition
            : aa),
      this.traceCondition_,
      this.setTrace(t.trace || !1),
      (this.traceState_ = { active: !1 }),
      (this.traceSource_ = t.traceSource || t.source || null),
      this.addChangeListener(ho.ACTIVE, this.updateState_);
  }
  setTrace(t) {
    let e;
    t ? (t === !0 ? (e = Gs) : (e = t)) : (e = uo), (this.traceCondition_ = e);
  }
  setMap(t) {
    super.setMap(t), this.updateState_();
  }
  getOverlay() {
    return this.overlay_;
  }
  handleEvent(t) {
    t.originalEvent.type === j.CONTEXTMENU && t.originalEvent.preventDefault(),
      (this.freehand_ = this.mode_ !== "Point" && this.freehandCondition_(t));
    let e = t.type === Q.POINTERMOVE,
      i = !0;
    return (
      !this.freehand_ &&
        this.lastDragTime_ &&
        t.type === Q.POINTERDRAG &&
        (Date.now() - this.lastDragTime_ >= this.dragVertexDelay_
          ? ((this.downPx_ = t.pixel),
            (this.shouldHandle_ = !this.freehand_),
            (e = !0))
          : (this.lastDragTime_ = void 0),
        this.shouldHandle_ &&
          this.downTimeout_ !== void 0 &&
          (clearTimeout(this.downTimeout_), (this.downTimeout_ = void 0))),
      this.freehand_ && t.type === Q.POINTERDRAG && this.sketchFeature_ !== null
        ? (this.addToDrawing_(t.coordinate), (i = !1))
        : this.freehand_ && t.type === Q.POINTERDOWN
          ? (i = !1)
          : e && this.getPointerCount() < 2
            ? ((i = t.type === Q.POINTERMOVE),
              i && this.freehand_
                ? (this.handlePointerMove_(t),
                  this.shouldHandle_ && t.originalEvent.preventDefault())
                : (t.originalEvent.pointerType === "mouse" ||
                    (t.type === Q.POINTERDRAG &&
                      this.downTimeout_ === void 0)) &&
                  this.handlePointerMove_(t))
            : t.type === Q.DBLCLICK && (i = !1),
      super.handleEvent(t) && i
    );
  }
  handleDownEvent(t) {
    return (
      (this.shouldHandle_ = !this.freehand_),
      this.freehand_
        ? ((this.downPx_ = t.pixel),
          this.finishCoordinate_ || this.startDrawing_(t.coordinate),
          !0)
        : this.condition_(t)
          ? ((this.lastDragTime_ = Date.now()),
            (this.downTimeout_ = setTimeout(() => {
              this.handlePointerMove_(
                new Re(Q.POINTERMOVE, t.map, t.originalEvent, !1, t.frameState),
              );
            }, this.dragVertexDelay_)),
            (this.downPx_ = t.pixel),
            !0)
          : ((this.lastDragTime_ = void 0), !1)
    );
  }
  deactivateTrace_() {
    this.traceState_ = { active: !1 };
  }
  toggleTraceState_(t) {
    if (!this.traceSource_ || !this.traceCondition_(t)) return;
    if (this.traceState_.active) {
      this.deactivateTrace_();
      return;
    }
    const e = this.getMap(),
      i = e.getCoordinateFromPixel([
        t.pixel[0] - this.snapTolerance_,
        t.pixel[1] + this.snapTolerance_,
      ]),
      n = e.getCoordinateFromPixel([
        t.pixel[0] + this.snapTolerance_,
        t.pixel[1] - this.snapTolerance_,
      ]),
      r = Et([i, n]),
      o = this.traceSource_.getFeaturesInExtent(r);
    if (o.length === 0) return;
    const a = T_(t.coordinate, o);
    a.length &&
      (this.traceState_ = {
        active: !0,
        startPx: t.pixel.slice(),
        targets: a,
        targetIndex: -1,
      });
  }
  addOrRemoveTracedCoordinates_(t, e) {
    const i = t.startIndex <= t.endIndex,
      n = t.startIndex <= e;
    i === n
      ? (i && e > t.endIndex) || (!i && e < t.endIndex)
        ? this.addTracedCoordinates_(t, t.endIndex, e)
        : ((i && e < t.endIndex) || (!i && e > t.endIndex)) &&
          this.removeTracedCoordinates_(e, t.endIndex)
      : (this.removeTracedCoordinates_(t.startIndex, t.endIndex),
        this.addTracedCoordinates_(t, t.startIndex, e));
  }
  removeTracedCoordinates_(t, e) {
    if (t === e) return;
    let i = 0;
    if (t < e) {
      const n = Math.ceil(t);
      let r = Math.floor(e);
      r === e && (r -= 1), (i = r - n + 1);
    } else {
      const n = Math.floor(t);
      let r = Math.ceil(e);
      r === e && (r += 1), (i = n - r + 1);
    }
    i > 0 && this.removeLastPoints_(i);
  }
  addTracedCoordinates_(t, e, i) {
    if (e === i) return;
    const n = [];
    if (e < i) {
      const r = Math.ceil(e);
      let o = Math.floor(i);
      o === i && (o -= 1);
      for (let a = r; a <= o; ++a) n.push(ji(t.coordinates, a));
    } else {
      const r = Math.floor(e);
      let o = Math.ceil(i);
      o === i && (o += 1);
      for (let a = r; a >= o; --a) n.push(ji(t.coordinates, a));
    }
    n.length && this.appendCoordinates(n);
  }
  updateTrace_(t) {
    const e = this.traceState_;
    if (
      !e.active ||
      (e.targetIndex === -1 && Ss(e.startPx, t.pixel) < this.snapTolerance_)
    )
      return;
    const i = R_(t.coordinate, e, this.getMap(), this.snapTolerance_);
    if (e.targetIndex !== i.index) {
      if (e.targetIndex !== -1) {
        const l = e.targets[e.targetIndex];
        this.removeTracedCoordinates_(l.startIndex, l.endIndex);
      }
      const a = e.targets[i.index];
      this.addTracedCoordinates_(a, a.startIndex, i.endIndex);
    } else {
      const a = e.targets[e.targetIndex];
      this.addOrRemoveTracedCoordinates_(a, i.endIndex);
    }
    e.targetIndex = i.index;
    const n = e.targets[e.targetIndex];
    n.endIndex = i.endIndex;
    const r = Yi(n.coordinates, n.endIndex),
      o = this.getMap().getPixelFromCoordinate(r);
    (t.coordinate = r), (t.pixel = [Math.round(o[0]), Math.round(o[1])]);
  }
  handleUpEvent(t) {
    let e = !0;
    if (this.getPointerCount() === 0) {
      this.downTimeout_ &&
        (clearTimeout(this.downTimeout_), (this.downTimeout_ = void 0)),
        this.handlePointerMove_(t);
      const i = this.traceState_.active;
      if ((this.toggleTraceState_(t), this.shouldHandle_)) {
        const n = !this.finishCoordinate_;
        n && this.startDrawing_(t.coordinate),
          !n && this.freehand_
            ? this.finishDrawing()
            : !this.freehand_ &&
              (!n || this.mode_ === "Point") &&
              (this.atFinish_(t.pixel, i)
                ? this.finishCondition_(t) && this.finishDrawing()
                : this.addToDrawing_(t.coordinate)),
          (e = !1);
      } else this.freehand_ && this.abortDrawing();
    }
    return !e && this.stopClick_ && t.preventDefault(), e;
  }
  handlePointerMove_(t) {
    if (
      ((this.pointerType_ = t.originalEvent.pointerType),
      this.downPx_ &&
        ((!this.freehand_ && this.shouldHandle_) ||
          (this.freehand_ && !this.shouldHandle_)))
    ) {
      const e = this.downPx_,
        i = t.pixel,
        n = e[0] - i[0],
        r = e[1] - i[1],
        o = n * n + r * r;
      if (
        ((this.shouldHandle_ = this.freehand_
          ? o > this.squaredClickTolerance_
          : o <= this.squaredClickTolerance_),
        !this.shouldHandle_)
      )
        return;
    }
    if (!this.finishCoordinate_) {
      this.createOrUpdateSketchPoint_(t.coordinate.slice());
      return;
    }
    this.updateTrace_(t), this.modifyDrawing_(t.coordinate);
  }
  atFinish_(t, e) {
    let i = !1;
    if (this.sketchFeature_) {
      let n = !1,
        r = [this.finishCoordinate_];
      const o = this.mode_;
      if (o === "Point") i = !0;
      else if (o === "Circle") i = this.sketchCoords_.length === 2;
      else if (o === "LineString")
        n = !e && this.sketchCoords_.length > this.minPoints_;
      else if (o === "Polygon") {
        const a = this.sketchCoords_;
        (n = a[0].length > this.minPoints_),
          (r = [a[0][0], a[0][a[0].length - 2]]),
          e ? (r = [a[0][0]]) : (r = [a[0][0], a[0][a[0].length - 2]]);
      }
      if (n) {
        const a = this.getMap();
        for (let l = 0, c = r.length; l < c; l++) {
          const h = r[l],
            u = a.getPixelFromCoordinate(h),
            d = t[0] - u[0],
            f = t[1] - u[1],
            g = this.freehand_ ? 1 : this.snapTolerance_;
          if (((i = Math.sqrt(d * d + f * f) <= g), i)) {
            this.finishCoordinate_ = h;
            break;
          }
        }
      }
    }
    return i;
  }
  createOrUpdateSketchPoint_(t) {
    this.sketchPoint_
      ? this.sketchPoint_.getGeometry().setCoordinates(t)
      : ((this.sketchPoint_ = new Dt(new ee(t))), this.updateSketchFeatures_());
  }
  createOrUpdateCustomSketchLine_(t) {
    this.sketchLine_ || (this.sketchLine_ = new Dt());
    const e = t.getLinearRing(0);
    let i = this.sketchLine_.getGeometry();
    i
      ? (i.setFlatCoordinates(e.getLayout(), e.getFlatCoordinates()),
        i.changed())
      : ((i = new oe(e.getFlatCoordinates(), e.getLayout())),
        this.sketchLine_.setGeometry(i));
  }
  startDrawing_(t) {
    const e = this.getMap().getView().getProjection(),
      i = vs(this.geometryLayout_);
    for (; t.length < i; ) t.push(0);
    (this.finishCoordinate_ = t),
      this.mode_ === "Point"
        ? (this.sketchCoords_ = t.slice())
        : this.mode_ === "Polygon"
          ? ((this.sketchCoords_ = [[t.slice(), t.slice()]]),
            (this.sketchLineCoords_ = this.sketchCoords_[0]))
          : (this.sketchCoords_ = [t.slice(), t.slice()]),
      this.sketchLineCoords_ &&
        (this.sketchLine_ = new Dt(new oe(this.sketchLineCoords_)));
    const n = this.geometryFunction_(this.sketchCoords_, void 0, e);
    (this.sketchFeature_ = new Dt()),
      this.geometryName_ &&
        this.sketchFeature_.setGeometryName(this.geometryName_),
      this.sketchFeature_.setGeometry(n),
      this.updateSketchFeatures_(),
      this.dispatchEvent(new _s(gs.DRAWSTART, this.sketchFeature_));
  }
  modifyDrawing_(t) {
    const e = this.getMap(),
      i = this.sketchFeature_.getGeometry(),
      n = e.getView().getProjection(),
      r = vs(this.geometryLayout_);
    let o, a;
    for (; t.length < r; ) t.push(0);
    this.mode_ === "Point"
      ? (a = this.sketchCoords_)
      : this.mode_ === "Polygon"
        ? ((o = this.sketchCoords_[0]),
          (a = o[o.length - 1]),
          this.atFinish_(e.getPixelFromCoordinate(t)) &&
            (t = this.finishCoordinate_.slice()))
        : ((o = this.sketchCoords_), (a = o[o.length - 1])),
      (a[0] = t[0]),
      (a[1] = t[1]),
      this.geometryFunction_(this.sketchCoords_, i, n),
      this.sketchPoint_ && this.sketchPoint_.getGeometry().setCoordinates(t),
      i.getType() === "Polygon" && this.mode_ !== "Polygon"
        ? this.createOrUpdateCustomSketchLine_(i)
        : this.sketchLineCoords_ &&
          this.sketchLine_.getGeometry().setCoordinates(this.sketchLineCoords_),
      this.updateSketchFeatures_();
  }
  addToDrawing_(t) {
    const e = this.sketchFeature_.getGeometry(),
      i = this.getMap().getView().getProjection();
    let n, r;
    const o = this.mode_;
    return (
      o === "LineString" || o === "Circle"
        ? ((this.finishCoordinate_ = t.slice()),
          (r = this.sketchCoords_),
          r.length >= this.maxPoints_ && (this.freehand_ ? r.pop() : (n = !0)),
          r.push(t.slice()),
          this.geometryFunction_(r, e, i))
        : o === "Polygon" &&
          ((r = this.sketchCoords_[0]),
          r.length >= this.maxPoints_ && (this.freehand_ ? r.pop() : (n = !0)),
          r.push(t.slice()),
          n && (this.finishCoordinate_ = r[0]),
          this.geometryFunction_(this.sketchCoords_, e, i)),
      this.createOrUpdateSketchPoint_(t.slice()),
      this.updateSketchFeatures_(),
      n ? this.finishDrawing() : this.sketchFeature_
    );
  }
  removeLastPoints_(t) {
    if (!this.sketchFeature_) return;
    const e = this.sketchFeature_.getGeometry(),
      i = this.getMap().getView().getProjection(),
      n = this.mode_;
    for (let r = 0; r < t; ++r) {
      let o;
      if (n === "LineString" || n === "Circle") {
        if (((o = this.sketchCoords_), o.splice(-2, 1), o.length >= 2)) {
          this.finishCoordinate_ = o[o.length - 2].slice();
          const a = this.finishCoordinate_.slice();
          (o[o.length - 1] = a), this.createOrUpdateSketchPoint_(a);
        }
        this.geometryFunction_(o, e, i),
          e.getType() === "Polygon" &&
            this.sketchLine_ &&
            this.createOrUpdateCustomSketchLine_(e);
      } else if (n === "Polygon") {
        (o = this.sketchCoords_[0]), o.splice(-2, 1);
        const a = this.sketchLine_.getGeometry();
        if (o.length >= 2) {
          const l = o[o.length - 2].slice();
          (o[o.length - 1] = l), this.createOrUpdateSketchPoint_(l);
        }
        a.setCoordinates(o), this.geometryFunction_(this.sketchCoords_, e, i);
      }
      if (o.length === 1) {
        this.abortDrawing();
        break;
      }
    }
    this.updateSketchFeatures_();
  }
  removeLastPoint() {
    this.removeLastPoints_(1);
  }
  finishDrawing() {
    const t = this.abortDrawing_();
    if (!t) return null;
    let e = this.sketchCoords_;
    const i = t.getGeometry(),
      n = this.getMap().getView().getProjection();
    return (
      this.mode_ === "LineString"
        ? (e.pop(), this.geometryFunction_(e, i, n))
        : this.mode_ === "Polygon" &&
          (e[0].pop(),
          this.geometryFunction_(e, i, n),
          (e = i.getCoordinates())),
      this.type_ === "MultiPoint"
        ? t.setGeometry(new Hn([e]))
        : this.type_ === "MultiLineString"
          ? t.setGeometry(new en([e]))
          : this.type_ === "MultiPolygon" && t.setGeometry(new nn([e])),
      this.dispatchEvent(new _s(gs.DRAWEND, t)),
      this.features_ && this.features_.push(t),
      this.source_ && this.source_.addFeature(t),
      t
    );
  }
  abortDrawing_() {
    this.finishCoordinate_ = null;
    const t = this.sketchFeature_;
    return (
      (this.sketchFeature_ = null),
      (this.sketchPoint_ = null),
      (this.sketchLine_ = null),
      this.overlay_.getSource().clear(!0),
      this.deactivateTrace_(),
      t
    );
  }
  abortDrawing() {
    const t = this.abortDrawing_();
    t && this.dispatchEvent(new _s(gs.DRAWABORT, t));
  }
  appendCoordinates(t) {
    const e = this.mode_,
      i = !this.sketchFeature_;
    i && this.startDrawing_(t[0]);
    let n;
    if (e === "LineString" || e === "Circle") n = this.sketchCoords_;
    else if (e === "Polygon")
      n =
        this.sketchCoords_ && this.sketchCoords_.length
          ? this.sketchCoords_[0]
          : [];
    else return;
    i && n.shift(), n.pop();
    for (let o = 0; o < t.length; o++) this.addToDrawing_(t[o]);
    const r = t[t.length - 1];
    (this.sketchFeature_ = this.addToDrawing_(r)), this.modifyDrawing_(r);
  }
  extend(t) {
    const i = t.getGeometry();
    (this.sketchFeature_ = t), (this.sketchCoords_ = i.getCoordinates());
    const n = this.sketchCoords_[this.sketchCoords_.length - 1];
    (this.finishCoordinate_ = n.slice()),
      this.sketchCoords_.push(n.slice()),
      (this.sketchPoint_ = new Dt(new ee(n))),
      this.updateSketchFeatures_(),
      this.dispatchEvent(new _s(gs.DRAWSTART, this.sketchFeature_));
  }
  updateSketchFeatures_() {
    const t = [];
    this.sketchFeature_ && t.push(this.sketchFeature_),
      this.sketchLine_ && t.push(this.sketchLine_),
      this.sketchPoint_ && t.push(this.sketchPoint_);
    const e = this.overlay_.getSource();
    e.clear(!0), e.addFeatures(t);
  }
  updateState_() {
    const t = this.getMap(),
      e = this.getActive();
    (!t || !e) && this.abortDrawing(), this.overlay_.setMap(e ? t : null);
  }
}
function I_() {
  const s = Ho();
  return function (t, e) {
    return s[t.getGeometry().getType()];
  };
}
function L_(s) {
  switch (s) {
    case "Point":
    case "MultiPoint":
      return "Point";
    case "LineString":
    case "MultiLineString":
      return "LineString";
    case "Polygon":
    case "MultiPolygon":
      return "Polygon";
    case "Circle":
      return "Circle";
    default:
      throw new Error("Invalid type: " + s);
  }
}
const jr = { SNAP: "snap", UNSNAP: "unsnap" };
class Yr extends Kt {
  constructor(t, e) {
    super(t),
      (this.vertex = e.vertex),
      (this.vertexPixel = e.vertexPixel),
      (this.feature = e.feature),
      (this.segment = e.segment);
  }
}
const _o = {
  Circle(s, t) {
    const i = Iu(s);
    return _o.Polygon(i);
  },
  GeometryCollection(s, t) {
    const e = [],
      i = s.getGeometriesArray();
    for (let n = 0; n < i.length; ++n) {
      const r = _o[i[n].getType()];
      r && e.push(r(i[n], t));
    }
    return e.flat();
  },
  LineString(s) {
    const t = [],
      e = s.getFlatCoordinates(),
      i = s.getStride();
    for (let n = 0, r = e.length - i; n < r; n += i)
      t.push([e.slice(n, n + 2), e.slice(n + i, n + i + 2)]);
    return t;
  },
  MultiLineString(s) {
    const t = [],
      e = s.getFlatCoordinates(),
      i = s.getStride(),
      n = s.getEnds();
    let r = 0;
    for (let o = 0, a = n.length; o < a; ++o) {
      const l = n[o];
      for (let c = r, h = l - i; c < h; c += i)
        t.push([e.slice(c, c + 2), e.slice(c + i, c + i + 2)]);
      r = l;
    }
    return t;
  },
  MultiPoint(s) {
    const t = [],
      e = s.getFlatCoordinates(),
      i = s.getStride();
    for (let n = 0, r = e.length - i; n < r; n += i)
      t.push([e.slice(n, n + 2)]);
    return t;
  },
  MultiPolygon(s) {
    const t = [],
      e = s.getFlatCoordinates(),
      i = s.getStride(),
      n = s.getEndss();
    let r = 0;
    for (let o = 0, a = n.length; o < a; ++o) {
      const l = n[o];
      for (let c = 0, h = l.length; c < h; ++c) {
        const u = l[c];
        for (let d = r, f = u - i; d < f; d += i)
          t.push([e.slice(d, d + 2), e.slice(d + i, d + i + 2)]);
        r = u;
      }
    }
    return t;
  },
  Point(s) {
    return [[s.getFlatCoordinates().slice(0, 2)]];
  },
  Polygon(s) {
    const t = [],
      e = s.getFlatCoordinates(),
      i = s.getStride(),
      n = s.getEnds();
    let r = 0;
    for (let o = 0, a = n.length; o < a; ++o) {
      const l = n[o];
      for (let c = r, h = l - i; c < h; c += i)
        t.push([e.slice(c, c + 2), e.slice(c + i, c + i + 2)]);
      r = l;
    }
    return t;
  },
};
function Rl(s) {
  return s.feature ? s.feature : s.element ? s.element : null;
}
const Vr = [],
  Se = [],
  Di = [];
class vl extends ni {
  constructor(t) {
    t = t || {};
    const e = t;
    e.handleDownEvent || (e.handleDownEvent = De),
      e.stopDown || (e.stopDown = Ei),
      super(e),
      this.on,
      this.once,
      this.un,
      (this.source_ = t.source ? t.source : null),
      (this.vertex_ = t.vertex !== void 0 ? t.vertex : !0),
      (this.edge_ = t.edge !== void 0 ? t.edge : !0),
      (this.intersection_ = t.intersection !== void 0 ? t.intersection : !1),
      (this.features_ = t.features ? t.features : null),
      (this.featuresListenerKeys_ = []),
      (this.featureChangeListenerKeys_ = {}),
      (this.indexedFeaturesExtents_ = {}),
      (this.pendingFeatures_ = {}),
      (this.pixelTolerance_ =
        t.pixelTolerance !== void 0 ? t.pixelTolerance : 10),
      (this.rBush_ = new bs()),
      (this.snapped_ = null),
      (this.segmenters_ = Object.assign({}, _o, t.segmenters));
  }
  addFeature(t, e) {
    e = e !== void 0 ? e : !0;
    const i = V(t),
      n = t.getGeometry();
    if (n) {
      const r = this.segmenters_[n.getType()];
      if (r) {
        this.indexedFeaturesExtents_[i] = n.getExtent(Vt());
        const o = r(n, this.getMap().getView().getProjection());
        let a = o.length;
        for (let l = 0; l < a; ++l) {
          const c = o[l];
          (Se[l] = Et(c)), (Di[l] = { feature: t, segment: c });
        }
        if (((Se.length = a), (Di.length = a), this.intersection_))
          for (let l = 0, c = o.length; l < c; ++l) {
            const h = o[l];
            if (h.length === 1) continue;
            const u = Se[l];
            for (let f = 0, g = o.length; f < g; ++f) {
              if (l === f || l - 1 === f || l + 1 === f) continue;
              const _ = o[f];
              if (!It(u, Se[f])) continue;
              const m = Wa(h, _);
              if (!m) continue;
              const y = [m];
              (Se[a] = Et(y)),
                (Di[a++] = { feature: t, segment: y, isIntersection: !0 });
            }
            const d = this.rBush_.getInExtent(Se[l]);
            for (const { segment: f } of d) {
              if (f.length === 1) continue;
              const g = Wa(h, f);
              if (!g) continue;
              const _ = [g];
              (Se[a] = Et(_)),
                (Di[a++] = { feature: t, segment: _, isIntersection: !0 });
            }
          }
        a === 1 ? this.rBush_.insert(Se[0], Di[0]) : this.rBush_.load(Se, Di);
      }
    }
    e &&
      (this.featureChangeListenerKeys_[i] = $(
        t,
        j.CHANGE,
        this.handleFeatureChange_,
        this,
      ));
  }
  getFeatures_() {
    let t;
    return (
      this.features_
        ? (t = this.features_)
        : this.source_ && (t = this.source_.getFeatures()),
      t
    );
  }
  areSnapDataEqual_(t, e) {
    return t.segment === e.segment && t.feature === e.feature;
  }
  handleEvent(t) {
    const e = this.snapTo(t.pixel, t.coordinate, t.map);
    return (
      e
        ? ((t.coordinate = e.vertex.slice(0, 2)),
          (t.pixel = e.vertexPixel),
          this.snapped_ &&
            !this.areSnapDataEqual_(this.snapped_, e) &&
            this.dispatchEvent(new Yr(jr.UNSNAP, this.snapped_)),
          (this.snapped_ = {
            vertex: t.coordinate,
            vertexPixel: t.pixel,
            feature: e.feature,
            segment: e.segment,
          }),
          this.dispatchEvent(new Yr(jr.SNAP, this.snapped_)))
        : this.snapped_ &&
          (this.dispatchEvent(new Yr(jr.UNSNAP, this.snapped_)),
          (this.snapped_ = null)),
      super.handleEvent(t)
    );
  }
  handleFeatureAdd_(t) {
    const e = Rl(t);
    e && this.addFeature(e);
  }
  handleFeatureRemove_(t) {
    const e = Rl(t);
    e && this.removeFeature(e);
  }
  handleFeatureChange_(t) {
    const e = t.target;
    if (this.handlingDownUpSequence) {
      const i = V(e);
      i in this.pendingFeatures_ || (this.pendingFeatures_[i] = e);
    } else this.updateFeature_(e);
  }
  handleUpEvent(t) {
    const e = Object.values(this.pendingFeatures_);
    if (e.length) for (const i of e) this.updateFeature_(i);
    return !1;
  }
  removeFeature(t, e) {
    const i = e !== void 0 ? e : !0,
      n = V(t),
      r = this.indexedFeaturesExtents_[n];
    if (r) {
      const o = this.rBush_,
        a = [];
      o.forEachInExtent(r, function (l) {
        t === l.feature && a.push(l);
      });
      for (let l = a.length - 1; l >= 0; --l) o.remove(a[l]);
    }
    i &&
      (lt(this.featureChangeListenerKeys_[n]),
      delete this.featureChangeListenerKeys_[n]);
  }
  setMap(t) {
    const e = this.getMap(),
      i = this.featuresListenerKeys_;
    let n = this.getFeatures_();
    if (
      (Array.isArray(n) || (n = n.getArray()),
      e &&
        (i.forEach(lt),
        (i.length = 0),
        this.rBush_.clear(),
        Object.values(this.featureChangeListenerKeys_).forEach(lt),
        (this.featureChangeListenerKeys_ = {})),
      super.setMap(t),
      t)
    ) {
      this.features_
        ? i.push(
            $(this.features_, ft.ADD, this.handleFeatureAdd_, this),
            $(this.features_, ft.REMOVE, this.handleFeatureRemove_, this),
          )
        : this.source_ &&
          i.push(
            $(this.source_, Rt.ADDFEATURE, this.handleFeatureAdd_, this),
            $(this.source_, Rt.REMOVEFEATURE, this.handleFeatureRemove_, this),
          );
      for (const r of n) this.addFeature(r);
    }
  }
  snapTo(t, e, i) {
    i.getView().getProjection();
    const n = ht(e),
      r = Hs(Yn(Et([n]), i.getView().getResolution() * this.pixelTolerance_)),
      o = this.rBush_.getInExtent(r),
      a = o.length;
    if (a === 0) return null;
    let l,
      c = 1 / 0,
      h,
      u = null,
      d;
    const f = this.pixelTolerance_ * this.pixelTolerance_,
      g = () => {
        if (l) {
          const _ = i.getPixelFromCoordinate(l);
          if (
            Fe(t, _) <= f &&
            ((d && this.intersection_) || (!d && (this.vertex_ || this.edge_)))
          )
            return {
              vertex: l,
              vertexPixel: [Math.round(_[0]), Math.round(_[1])],
              feature: h,
              segment: u,
            };
        }
        return null;
      };
    if (this.vertex_ || this.intersection_) {
      for (let m = 0; m < a; ++m) {
        const y = o[m];
        if (y.feature.getGeometry().getType() !== "Circle")
          for (const p of y.segment) {
            const C = ht(p),
              x = Fe(n, C);
            x < c &&
              ((l = p), (c = x), (h = y.feature), (d = y.isIntersection));
          }
      }
      const _ = g();
      if (_) return _;
    }
    if (this.edge_) {
      for (let m = 0; m < a; ++m) {
        let y = null;
        const p = o[m];
        if (p.feature.getGeometry().getType() === "Circle") {
          let C = p.feature.getGeometry();
          y = Lc(n, C);
        } else {
          const [C, x] = p.segment;
          x && ((Vr[0] = ht(C)), (Vr[1] = ht(x)), (y = To(n, Vr)));
        }
        if (y) {
          const C = Fe(n, y);
          C < c &&
            ((l = ti(y)),
            (u =
              p.feature.getGeometry().getType() === "Circle"
                ? null
                : p.segment),
            (c = C),
            (h = p.feature));
        }
      }
      const _ = g();
      if (_) return _;
    }
    return null;
  }
  updateFeature_(t) {
    this.removeFeature(t, !1), this.addFeature(t, !1);
  }
}
const Il = 0,
  In = 1,
  Ll = [0, 0, 0, 0],
  Zi = [],
  Kr = { MODIFYSTART: "modifystart", MODIFYEND: "modifyend" };
class Ur extends Kt {
  constructor(t, e, i) {
    super(t), (this.features = e), (this.mapBrowserEvent = i);
  }
}
class M_ extends ni {
  constructor(t) {
    super(t),
      this.on,
      this.once,
      this.un,
      (this.boundHandleFeatureChange_ = this.handleFeatureChange_.bind(this)),
      (this.condition_ = t.condition ? t.condition : Vh),
      (this.defaultDeleteCondition_ = function (i) {
        return eg(i) && jh(i);
      }),
      (this.deleteCondition_ = t.deleteCondition
        ? t.deleteCondition
        : this.defaultDeleteCondition_),
      (this.insertVertexCondition_ = t.insertVertexCondition
        ? t.insertVertexCondition
        : Gs),
      (this.vertexFeature_ = null),
      (this.vertexSegments_ = null),
      (this.lastPixel_ = [0, 0]),
      (this.ignoreNextSingleClick_ = !1),
      (this.featuresBeingModified_ = null),
      (this.rBush_ = new bs()),
      (this.pixelTolerance_ =
        t.pixelTolerance !== void 0 ? t.pixelTolerance : 10),
      (this.snappedToVertex_ = !1),
      (this.changingFeature_ = !1),
      (this.dragSegments_ = []),
      (this.overlay_ = new Ri({
        source: new on({ useSpatialIndex: !1, wrapX: !!t.wrapX }),
        style: t.style ? t.style : F_(),
        updateWhileAnimating: !0,
        updateWhileInteracting: !0,
      })),
      (this.SEGMENT_WRITERS_ = {
        Point: this.writePointGeometry_.bind(this),
        LineString: this.writeLineStringGeometry_.bind(this),
        LinearRing: this.writeLineStringGeometry_.bind(this),
        Polygon: this.writePolygonGeometry_.bind(this),
        MultiPoint: this.writeMultiPointGeometry_.bind(this),
        MultiLineString: this.writeMultiLineStringGeometry_.bind(this),
        MultiPolygon: this.writeMultiPolygonGeometry_.bind(this),
        Circle: this.writeCircleGeometry_.bind(this),
        GeometryCollection: this.writeGeometryCollectionGeometry_.bind(this),
      }),
      (this.source_ = null),
      (this.hitDetection_ = null);
    let e;
    if (
      (t.features
        ? (e = t.features)
        : t.source &&
          ((this.source_ = t.source),
          (e = new Xt(this.source_.getFeatures())),
          this.source_.addEventListener(
            Rt.ADDFEATURE,
            this.handleSourceAdd_.bind(this),
          ),
          this.source_.addEventListener(
            Rt.REMOVEFEATURE,
            this.handleSourceRemove_.bind(this),
          )),
      !e)
    )
      throw new Error(
        "The modify interaction requires features, a source or a layer",
      );
    t.hitDetection && (this.hitDetection_ = t.hitDetection),
      (this.features_ = e),
      this.features_.forEach(this.addFeature_.bind(this)),
      this.features_.addEventListener(
        ft.ADD,
        this.handleFeatureAdd_.bind(this),
      ),
      this.features_.addEventListener(
        ft.REMOVE,
        this.handleFeatureRemove_.bind(this),
      ),
      (this.lastPointerEvent_ = null),
      (this.delta_ = [0, 0]),
      (this.snapToPointer_ =
        t.snapToPointer === void 0 ? !this.hitDetection_ : t.snapToPointer);
  }
  addFeature_(t) {
    const e = t.getGeometry();
    if (e) {
      const n = this.SEGMENT_WRITERS_[e.getType()];
      n && n(t, e);
    }
    const i = this.getMap();
    i &&
      i.isRendered() &&
      this.getActive() &&
      this.handlePointerAtPixel_(i.getCoordinateFromPixel(this.lastPixel_)),
      t.addEventListener(j.CHANGE, this.boundHandleFeatureChange_);
  }
  willModifyFeatures_(t, e) {
    if (!this.featuresBeingModified_) {
      this.featuresBeingModified_ = new Xt();
      const i = this.featuresBeingModified_.getArray();
      for (let n = 0, r = e.length; n < r; ++n) {
        const o = e[n].feature;
        o && !i.includes(o) && this.featuresBeingModified_.push(o);
      }
      this.featuresBeingModified_.getLength() === 0
        ? (this.featuresBeingModified_ = null)
        : this.dispatchEvent(
            new Ur(Kr.MODIFYSTART, this.featuresBeingModified_, t),
          );
    }
  }
  removeFeature_(t) {
    this.removeFeatureSegmentData_(t),
      this.vertexFeature_ &&
        this.features_.getLength() === 0 &&
        (this.overlay_.getSource().removeFeature(this.vertexFeature_),
        (this.vertexFeature_ = null)),
      t.removeEventListener(j.CHANGE, this.boundHandleFeatureChange_);
  }
  removeFeatureSegmentData_(t) {
    const e = this.rBush_,
      i = [];
    e.forEach(function (n) {
      t === n.feature && i.push(n);
    });
    for (let n = i.length - 1; n >= 0; --n) {
      const r = i[n];
      for (let o = this.dragSegments_.length - 1; o >= 0; --o)
        this.dragSegments_[o][0] === r && this.dragSegments_.splice(o, 1);
      e.remove(r);
    }
  }
  setActive(t) {
    this.vertexFeature_ &&
      !t &&
      (this.overlay_.getSource().removeFeature(this.vertexFeature_),
      (this.vertexFeature_ = null)),
      super.setActive(t);
  }
  setMap(t) {
    this.overlay_.setMap(t), super.setMap(t);
  }
  getOverlay() {
    return this.overlay_;
  }
  handleSourceAdd_(t) {
    t.feature && this.features_.push(t.feature);
  }
  handleSourceRemove_(t) {
    t.feature && this.features_.remove(t.feature);
  }
  handleFeatureAdd_(t) {
    this.addFeature_(t.element);
  }
  handleFeatureChange_(t) {
    if (!this.changingFeature_) {
      const e = t.target;
      this.removeFeature_(e), this.addFeature_(e);
    }
  }
  handleFeatureRemove_(t) {
    this.removeFeature_(t.element);
  }
  writePointGeometry_(t, e) {
    const i = e.getCoordinates(),
      n = { feature: t, geometry: e, segment: [i, i] };
    this.rBush_.insert(e.getExtent(), n);
  }
  writeMultiPointGeometry_(t, e) {
    const i = e.getCoordinates();
    for (let n = 0, r = i.length; n < r; ++n) {
      const o = i[n],
        a = { feature: t, geometry: e, depth: [n], index: n, segment: [o, o] };
      this.rBush_.insert(e.getExtent(), a);
    }
  }
  writeLineStringGeometry_(t, e) {
    const i = e.getCoordinates();
    for (let n = 0, r = i.length - 1; n < r; ++n) {
      const o = i.slice(n, n + 2),
        a = { feature: t, geometry: e, index: n, segment: o };
      this.rBush_.insert(Et(o), a);
    }
  }
  writeMultiLineStringGeometry_(t, e) {
    const i = e.getCoordinates();
    for (let n = 0, r = i.length; n < r; ++n) {
      const o = i[n];
      for (let a = 0, l = o.length - 1; a < l; ++a) {
        const c = o.slice(a, a + 2),
          h = { feature: t, geometry: e, depth: [n], index: a, segment: c };
        this.rBush_.insert(Et(c), h);
      }
    }
  }
  writePolygonGeometry_(t, e) {
    const i = e.getCoordinates();
    for (let n = 0, r = i.length; n < r; ++n) {
      const o = i[n];
      for (let a = 0, l = o.length - 1; a < l; ++a) {
        const c = o.slice(a, a + 2),
          h = { feature: t, geometry: e, depth: [n], index: a, segment: c };
        this.rBush_.insert(Et(c), h);
      }
    }
  }
  writeMultiPolygonGeometry_(t, e) {
    const i = e.getCoordinates();
    for (let n = 0, r = i.length; n < r; ++n) {
      const o = i[n];
      for (let a = 0, l = o.length; a < l; ++a) {
        const c = o[a];
        for (let h = 0, u = c.length - 1; h < u; ++h) {
          const d = c.slice(h, h + 2),
            f = {
              feature: t,
              geometry: e,
              depth: [a, n],
              index: h,
              segment: d,
            };
          this.rBush_.insert(Et(d), f);
        }
      }
    }
  }
  writeCircleGeometry_(t, e) {
    const i = e.getCenter(),
      n = { feature: t, geometry: e, index: Il, segment: [i, i] },
      r = { feature: t, geometry: e, index: In, segment: [i, i] },
      o = [n, r];
    (n.featureSegments = o),
      (r.featureSegments = o),
      this.rBush_.insert(Tn(i), n);
    let a = e;
    this.rBush_.insert(a.getExtent(), r);
  }
  writeGeometryCollectionGeometry_(t, e) {
    const i = e.getGeometriesArray();
    for (let n = 0; n < i.length; ++n) {
      const r = i[n],
        o = this.SEGMENT_WRITERS_[r.getType()];
      o(t, r);
    }
  }
  createOrUpdateVertexFeature_(t, e, i, n) {
    let r = this.vertexFeature_;
    return (
      r
        ? r.getGeometry().setCoordinates(t)
        : ((r = new Dt(new ee(t))),
          (this.vertexFeature_ = r),
          this.overlay_.getSource().addFeature(r)),
      r.set("features", e),
      r.set("geometries", i),
      r.set("existing", n),
      r
    );
  }
  handleEvent(t) {
    if (!t.originalEvent) return !0;
    this.lastPointerEvent_ = t;
    let e;
    return (
      !t.map.getView().getInteracting() &&
        t.type == Q.POINTERMOVE &&
        !this.handlingDownUpSequence &&
        this.handlePointerMove_(t),
      this.vertexFeature_ &&
        this.deleteCondition_(t) &&
        (t.type != Q.SINGLECLICK || !this.ignoreNextSingleClick_
          ? (e = this.removePoint())
          : (e = !0)),
      t.type == Q.SINGLECLICK && (this.ignoreNextSingleClick_ = !1),
      super.handleEvent(t) && !e
    );
  }
  findInsertVerticesAndUpdateDragSegments_(t) {
    this.handlePointerAtPixel_(t),
      (this.dragSegments_.length = 0),
      (this.featuresBeingModified_ = null);
    const e = this.vertexFeature_;
    if (!e) return;
    this.getMap().getView().getProjection();
    const i = [],
      n = e.getGeometry().getCoordinates(),
      r = Et([n]),
      o = this.rBush_.getInExtent(r),
      a = {};
    o.sort(P_);
    for (let l = 0, c = o.length; l < c; ++l) {
      const h = o[l],
        u = h.segment;
      let d = V(h.geometry);
      const f = h.depth;
      if (
        (f && (d += "-" + f.join("-")),
        a[d] || (a[d] = new Array(2)),
        h.geometry.getType() === "Circle" && h.index === In)
      ) {
        const g = Pl(t, h);
        bt(g, n) &&
          !a[d][0] &&
          (this.dragSegments_.push([h, 0]), (a[d][0] = h));
        continue;
      }
      if (bt(u[0], n) && !a[d][0]) {
        this.dragSegments_.push([h, 0]), (a[d][0] = h);
        continue;
      }
      if (bt(u[1], n) && !a[d][1]) {
        if (a[d][0] && a[d][0].index === 0) {
          let g = h.geometry.getCoordinates();
          switch (h.geometry.getType()) {
            case "LineString":
            case "MultiLineString":
              continue;
            case "MultiPolygon":
              g = g[f[1]];
            case "Polygon":
              if (h.index !== g[f[0]].length - 2) continue;
              break;
          }
        }
        this.dragSegments_.push([h, 1]), (a[d][1] = h);
        continue;
      }
      V(u) in this.vertexSegments_ && !a[d][0] && !a[d][1] && i.push(h);
    }
    return i;
  }
  handleDragEvent(t) {
    (this.ignoreNextSingleClick_ = !1),
      this.willModifyFeatures_(
        t,
        this.dragSegments_.map(([r]) => r),
      );
    const e = [
        t.coordinate[0] + this.delta_[0],
        t.coordinate[1] + this.delta_[1],
      ],
      i = [],
      n = [];
    for (let r = 0, o = this.dragSegments_.length; r < o; ++r) {
      const a = this.dragSegments_[r],
        l = a[0],
        c = l.feature;
      i.includes(c) || i.push(c);
      const h = l.geometry;
      n.includes(h) || n.push(h);
      const u = l.depth;
      let d;
      const f = l.segment,
        g = a[1];
      for (; e.length < h.getStride(); ) e.push(f[g][e.length]);
      switch (h.getType()) {
        case "Point":
          (d = e), (f[0] = e), (f[1] = e);
          break;
        case "MultiPoint":
          (d = h.getCoordinates()), (d[l.index] = e), (f[0] = e), (f[1] = e);
          break;
        case "LineString":
          (d = h.getCoordinates()), (d[l.index + g] = e), (f[g] = e);
          break;
        case "MultiLineString":
          (d = h.getCoordinates()), (d[u[0]][l.index + g] = e), (f[g] = e);
          break;
        case "Polygon":
          (d = h.getCoordinates()), (d[u[0]][l.index + g] = e), (f[g] = e);
          break;
        case "MultiPolygon":
          (d = h.getCoordinates()),
            (d[u[1]][u[0]][l.index + g] = e),
            (f[g] = e);
          break;
        case "Circle":
          const _ = h;
          if (((f[0] = e), (f[1] = e), l.index === Il))
            (this.changingFeature_ = !0),
              _.setCenter(e),
              (this.changingFeature_ = !1);
          else {
            (this.changingFeature_ = !0), t.map.getView().getProjection();
            let m = Ss(ht(_.getCenter()), ht(e));
            _.setRadius(m), (this.changingFeature_ = !1);
          }
          break;
      }
      d && this.setGeometryCoordinates_(h, d);
    }
    this.createOrUpdateVertexFeature_(e, i, n, !0);
  }
  handleDownEvent(t) {
    if (!this.condition_(t)) return !1;
    const e = t.coordinate,
      i = this.findInsertVerticesAndUpdateDragSegments_(e);
    if (
      i != null &&
      i.length &&
      this.insertVertexCondition_(t) &&
      (this.willModifyFeatures_(t, i), this.vertexFeature_)
    ) {
      const n = this.vertexFeature_.getGeometry().getCoordinates();
      for (let r = i.length - 1; r >= 0; --r) this.insertVertex_(i[r], n);
      this.ignoreNextSingleClick_ = !0;
    }
    return !!this.vertexFeature_;
  }
  handleUpEvent(t) {
    for (let e = this.dragSegments_.length - 1; e >= 0; --e) {
      const i = this.dragSegments_[e][0],
        n = i.geometry;
      if (n.getType() === "Circle") {
        const r = n,
          o = r.getCenter(),
          a = i.featureSegments[0],
          l = i.featureSegments[1];
        (a.segment[0] = o),
          (a.segment[1] = o),
          (l.segment[0] = o),
          (l.segment[1] = o),
          this.rBush_.update(Tn(o), a);
        let c = r;
        this.rBush_.update(c.getExtent(), l);
      } else this.rBush_.update(Et(i.segment), i);
    }
    return (
      this.featuresBeingModified_ &&
        (this.dispatchEvent(
          new Ur(Kr.MODIFYEND, this.featuresBeingModified_, t),
        ),
        (this.featuresBeingModified_ = null)),
      !1
    );
  }
  handlePointerMove_(t) {
    (this.lastPixel_ = t.pixel), this.handlePointerAtPixel_(t.coordinate);
  }
  handlePointerAtPixel_(t) {
    const e = this.getMap(),
      i = e.getPixelFromCoordinate(t);
    e.getView().getProjection();
    const n = function (a, l) {
      return Ml(t, a) - Ml(t, l);
    };
    let r, o;
    if (this.hitDetection_) {
      const a =
        typeof this.hitDetection_ == "object"
          ? (l) => l === this.hitDetection_
          : void 0;
      e.forEachFeatureAtPixel(
        i,
        (l, c, h) => {
          h && h.getType() === "Point" && (h = new ee(ti(h.getCoordinates())));
          const u = h || l.getGeometry();
          if (
            u &&
            u.getType() === "Point" &&
            l instanceof Dt &&
            this.features_.getArray().includes(l)
          ) {
            o = u;
            const d = l.getGeometry().getFlatCoordinates().slice(0, 2);
            r = [{ feature: l, geometry: o, segment: [d, d] }];
          }
          return !0;
        },
        { layerFilter: a },
      );
    }
    if (!r) {
      const a = Le(Tn(t, Ll)),
        l = e.getView().getResolution() * this.pixelTolerance_,
        c = Hs(Yn(a, l, Ll));
      r = this.rBush_.getInExtent(c);
    }
    if (r && r.length > 0) {
      const a = r.sort(n)[0],
        l = a.segment;
      let c = Pl(t, a);
      const h = e.getPixelFromCoordinate(c);
      let u = Ss(i, h);
      if (o || u <= this.pixelTolerance_) {
        const d = {};
        if (
          ((d[V(l)] = !0),
          this.snapToPointer_ ||
            ((this.delta_[0] = c[0] - t[0]), (this.delta_[1] = c[1] - t[1])),
          a.geometry.getType() === "Circle" && a.index === In)
        )
          (this.snappedToVertex_ = !0),
            this.createOrUpdateVertexFeature_(
              c,
              [a.feature],
              [a.geometry],
              this.snappedToVertex_,
            );
        else {
          const f = e.getPixelFromCoordinate(l[0]),
            g = e.getPixelFromCoordinate(l[1]),
            _ = Fe(h, f),
            m = Fe(h, g);
          if (
            ((u = Math.sqrt(Math.min(_, m))),
            (this.snappedToVertex_ = u <= this.pixelTolerance_),
            !this.snappedToVertex_ &&
              !this.insertVertexCondition_(this.lastPointerEvent_))
          ) {
            this.vertexFeature_ &&
              (this.overlay_.getSource().removeFeature(this.vertexFeature_),
              (this.vertexFeature_ = null));
            return;
          }
          this.snappedToVertex_ && (c = _ > m ? l[1] : l[0]),
            this.createOrUpdateVertexFeature_(
              c,
              [a.feature],
              [a.geometry],
              this.snappedToVertex_,
            );
          const y = {};
          y[V(a.geometry)] = !0;
          for (let p = 1, C = r.length; p < C; ++p) {
            const x = r[p].segment;
            if (
              (bt(l[0], x[0]) && bt(l[1], x[1])) ||
              (bt(l[0], x[1]) && bt(l[1], x[0]))
            ) {
              const E = V(r[p].geometry);
              E in y || ((y[E] = !0), (d[V(x)] = !0));
            } else break;
          }
        }
        this.vertexSegments_ = d;
        return;
      }
    }
    this.vertexFeature_ &&
      (this.overlay_.getSource().removeFeature(this.vertexFeature_),
      (this.vertexFeature_ = null));
  }
  insertVertex_(t, e) {
    const i = t.segment,
      n = t.feature,
      r = t.geometry,
      o = t.depth,
      a = t.index;
    let l;
    for (; e.length < r.getStride(); ) e.push(0);
    switch (r.getType()) {
      case "MultiLineString":
        (l = r.getCoordinates()), l[o[0]].splice(a + 1, 0, e);
        break;
      case "Polygon":
        (l = r.getCoordinates()), l[o[0]].splice(a + 1, 0, e);
        break;
      case "MultiPolygon":
        (l = r.getCoordinates()), l[o[1]][o[0]].splice(a + 1, 0, e);
        break;
      case "LineString":
        (l = r.getCoordinates()), l.splice(a + 1, 0, e);
        break;
      default:
        return !1;
    }
    this.setGeometryCoordinates_(r, l);
    const c = this.rBush_;
    c.remove(t), this.updateSegmentIndices_(r, a, o, 1);
    const h = {
      segment: [i[0], e],
      feature: n,
      geometry: r,
      depth: o,
      index: a,
    };
    c.insert(Et(h.segment), h), this.dragSegments_.push([h, 1]);
    const u = {
      segment: [e, i[1]],
      feature: n,
      geometry: r,
      depth: o,
      index: a + 1,
    };
    return c.insert(Et(u.segment), u), this.dragSegments_.push([u, 0]), !0;
  }
  updatePointer_(t) {
    var e;
    return (
      t && this.findInsertVerticesAndUpdateDragSegments_(t),
      (e = this.vertexFeature_) == null
        ? void 0
        : e.getGeometry().getCoordinates()
    );
  }
  getPoint() {
    var e;
    const t =
      (e = this.vertexFeature_) == null
        ? void 0
        : e.getGeometry().getCoordinates();
    return t ? ti(t, this.getMap().getView().getProjection()) : null;
  }
  canRemovePoint() {
    if (
      !this.vertexFeature_ ||
      this.vertexFeature_
        .get("geometries")
        .every((i) => i.getType() === "Circle" || i.getType().endsWith("Point"))
    )
      return !1;
    const t = this.vertexFeature_.getGeometry().getCoordinates();
    return this.rBush_
      .getInExtent(Et([t]))
      .some(({ segment: i }) => bt(i[0], t) || bt(i[1], t));
  }
  removePoint(t) {
    if (
      (t &&
        ((t = ht(t, this.getMap().getView().getProjection())),
        this.updatePointer_(t)),
      !this.lastPointerEvent_ ||
        (this.lastPointerEvent_ &&
          this.lastPointerEvent_.type != Q.POINTERDRAG))
    ) {
      const e = this.lastPointerEvent_;
      this.willModifyFeatures_(
        e,
        this.dragSegments_.map(([n]) => n),
      );
      const i = this.removeVertex_();
      return (
        this.featuresBeingModified_ &&
          this.dispatchEvent(
            new Ur(Kr.MODIFYEND, this.featuresBeingModified_, e),
          ),
        (this.featuresBeingModified_ = null),
        i
      );
    }
    return !1;
  }
  removeVertex_() {
    const t = this.dragSegments_,
      e = {};
    let i = !1,
      n,
      r,
      o,
      a,
      l,
      c,
      h,
      u,
      d,
      f,
      g;
    for (l = t.length - 1; l >= 0; --l)
      (o = t[l]),
        (f = o[0]),
        (g = V(f.feature)),
        f.depth && (g += "-" + f.depth.join("-")),
        g in e || (e[g] = {}),
        o[1] === 0
          ? ((e[g].right = f), (e[g].index = f.index))
          : o[1] == 1 && ((e[g].left = f), (e[g].index = f.index + 1));
    for (g in e) {
      switch (
        ((d = e[g].right),
        (h = e[g].left),
        (c = e[g].index),
        (u = c - 1),
        h !== void 0 ? (f = h) : (f = d),
        u < 0 && (u = 0),
        (a = f.geometry),
        (r = a.getCoordinates()),
        (n = r),
        (i = !1),
        a.getType())
      ) {
        case "MultiLineString":
          r[f.depth[0]].length > 2 && (r[f.depth[0]].splice(c, 1), (i = !0));
          break;
        case "LineString":
          r.length > 2 && (r.splice(c, 1), (i = !0));
          break;
        case "MultiPolygon":
          n = n[f.depth[1]];
        case "Polygon":
          (n = n[f.depth[0]]),
            n.length > 4 &&
              (c == n.length - 1 && (c = 0),
              n.splice(c, 1),
              (i = !0),
              c === 0 && (n.pop(), n.push(n[0]), (u = n.length - 1)));
          break;
      }
      if (i) {
        this.setGeometryCoordinates_(a, r);
        const _ = [];
        if (
          (h !== void 0 && (this.rBush_.remove(h), _.push(h.segment[0])),
          d !== void 0 && (this.rBush_.remove(d), _.push(d.segment[1])),
          h !== void 0 && d !== void 0)
        ) {
          const m = {
            depth: f.depth,
            feature: f.feature,
            geometry: f.geometry,
            index: u,
            segment: _,
          };
          this.rBush_.insert(Et(m.segment), m);
        }
        this.updateSegmentIndices_(a, c, f.depth, -1),
          this.vertexFeature_ &&
            (this.overlay_.getSource().removeFeature(this.vertexFeature_),
            (this.vertexFeature_ = null)),
          (t.length = 0);
      }
    }
    return i;
  }
  canInsertPoint() {
    if (
      !this.vertexFeature_ ||
      this.vertexFeature_
        .get("geometries")
        .every((i) => i.getType() === "Circle" || i.getType().endsWith("Point"))
    )
      return !1;
    const t = this.vertexFeature_.getGeometry().getCoordinates();
    return this.rBush_
      .getInExtent(Et([t]))
      .some(({ segment: i }) => !(bt(i[0], t) || bt(i[1], t)));
  }
  insertPoint(t) {
    var n;
    const e = t
      ? ht(t, this.getMap().getView().getProjection())
      : (n = this.vertexFeature_) == null
        ? void 0
        : n.getGeometry().getCoordinates();
    return e
      ? this.findInsertVerticesAndUpdateDragSegments_(e).reduce(
          (r, o) => r || this.insertVertex_(o, e),
          !1,
        )
      : !1;
  }
  setGeometryCoordinates_(t, e) {
    (this.changingFeature_ = !0),
      t.setCoordinates(e),
      (this.changingFeature_ = !1);
  }
  updateSegmentIndices_(t, e, i, n) {
    this.rBush_.forEachInExtent(t.getExtent(), function (r) {
      r.geometry === t &&
        (i === void 0 || r.depth === void 0 || Ne(r.depth, i)) &&
        r.index > e &&
        (r.index += n);
    });
  }
}
function P_(s, t) {
  return s.index - t.index;
}
function Ml(s, t, e) {
  const i = t.geometry;
  if (i.getType() === "Circle") {
    let r = i;
    if (t.index === In) {
      const o = Fe(r.getCenter(), ht(s)),
        a = Math.sqrt(o) - r.getRadius();
      return a * a;
    }
  }
  const n = ht(s);
  return (Zi[0] = ht(t.segment[0])), (Zi[1] = ht(t.segment[1])), Pc(n, Zi);
}
function Pl(s, t, e) {
  const i = t.geometry;
  if (i.getType() === "Circle" && t.index === In)
    return ti(i.getClosestPoint(ht(s)));
  const n = ht(s);
  return (Zi[0] = ht(t.segment[0])), (Zi[1] = ht(t.segment[1])), ti(To(n, Zi));
}
function F_() {
  const s = Ho();
  return function (t, e) {
    return s.Point;
  };
}
const b_ = { SELECT: "select" };
class A_ extends Kt {
  constructor(t, e, i, n) {
    super(t),
      (this.selected = e),
      (this.deselected = i),
      (this.mapBrowserEvent = n);
  }
}
const xs = {};
class Bs extends ln {
  constructor(t) {
    super(),
      this.on,
      this.once,
      this.un,
      (t = t || {}),
      (this.boundAddFeature_ = this.addFeature_.bind(this)),
      (this.boundRemoveFeature_ = this.removeFeature_.bind(this)),
      (this.condition_ = t.condition ? t.condition : jh),
      (this.addCondition_ = t.addCondition ? t.addCondition : uo),
      (this.removeCondition_ = t.removeCondition ? t.removeCondition : uo),
      (this.toggleCondition_ = t.toggleCondition ? t.toggleCondition : aa),
      (this.multi_ = t.multi ? t.multi : !1),
      (this.filter_ = t.filter ? t.filter : De),
      (this.hitTolerance_ = t.hitTolerance ? t.hitTolerance : 0),
      (this.style_ = t.style !== void 0 ? t.style : D_()),
      (this.features_ = t.features || new Xt());
    let e;
    if (t.layers)
      if (typeof t.layers == "function") e = t.layers;
      else {
        const i = t.layers;
        e = function (n) {
          return i.includes(n);
        };
      }
    else e = De;
    (this.layerFilter_ = e), (this.featureLayerAssociation_ = {});
  }
  addFeatureLayerAssociation_(t, e) {
    this.featureLayerAssociation_[V(t)] = e;
  }
  getFeatures() {
    return this.features_;
  }
  getHitTolerance() {
    return this.hitTolerance_;
  }
  getLayer(t) {
    return this.featureLayerAssociation_[V(t)];
  }
  setHitTolerance(t) {
    this.hitTolerance_ = t;
  }
  setMap(t) {
    this.getMap() &&
      this.style_ &&
      this.features_.forEach(this.restorePreviousStyle_.bind(this)),
      super.setMap(t),
      t
        ? (this.features_.addEventListener(ft.ADD, this.boundAddFeature_),
          this.features_.addEventListener(ft.REMOVE, this.boundRemoveFeature_),
          this.style_ &&
            this.features_.forEach(this.applySelectedStyle_.bind(this)))
        : (this.features_.removeEventListener(ft.ADD, this.boundAddFeature_),
          this.features_.removeEventListener(
            ft.REMOVE,
            this.boundRemoveFeature_,
          ));
  }
  addFeature_(t) {
    const e = t.element;
    if ((this.style_ && this.applySelectedStyle_(e), !this.getLayer(e))) {
      const i = this.getMap()
        .getAllLayers()
        .find(function (n) {
          if (n instanceof Ri && n.getSource() && n.getSource().hasFeature(e))
            return n;
        });
      i && this.addFeatureLayerAssociation_(e, i);
    }
  }
  removeFeature_(t) {
    this.style_ && this.restorePreviousStyle_(t.element);
  }
  getStyle() {
    return this.style_;
  }
  applySelectedStyle_(t) {
    const e = V(t);
    e in xs || (xs[e] = t.getStyle()), t.setStyle(this.style_);
  }
  restorePreviousStyle_(t) {
    const e = this.getMap().getInteractions().getArray();
    for (let n = e.length - 1; n >= 0; --n) {
      const r = e[n];
      if (
        r !== this &&
        r instanceof Bs &&
        r.getStyle() &&
        r.getFeatures().getArray().lastIndexOf(t) !== -1
      ) {
        t.setStyle(r.getStyle());
        return;
      }
    }
    const i = V(t);
    t.setStyle(xs[i]), delete xs[i];
  }
  removeFeatureLayerAssociation_(t) {
    delete this.featureLayerAssociation_[V(t)];
  }
  handleEvent(t) {
    if (!this.condition_(t)) return !0;
    const e = this.addCondition_(t),
      i = this.removeCondition_(t),
      n = this.toggleCondition_(t),
      r = !e && !i && !n,
      o = t.map,
      a = this.getFeatures(),
      l = [],
      c = [];
    if (r) {
      rn(this.featureLayerAssociation_),
        o.forEachFeatureAtPixel(
          t.pixel,
          (h, u) => {
            if (!(!(h instanceof Dt) || !this.filter_(h, u)))
              return (
                this.addFeatureLayerAssociation_(h, u), c.push(h), !this.multi_
              );
          },
          { layerFilter: this.layerFilter_, hitTolerance: this.hitTolerance_ },
        );
      for (let h = a.getLength() - 1; h >= 0; --h) {
        const u = a.item(h),
          d = c.indexOf(u);
        d > -1 ? c.splice(d, 1) : (a.remove(u), l.push(u));
      }
      c.length !== 0 && a.extend(c);
    } else {
      o.forEachFeatureAtPixel(
        t.pixel,
        (h, u) => {
          if (!(!(h instanceof Dt) || !this.filter_(h, u)))
            return (
              (e || n) && !a.getArray().includes(h)
                ? (this.addFeatureLayerAssociation_(h, u), c.push(h))
                : (i || n) &&
                  a.getArray().includes(h) &&
                  (l.push(h), this.removeFeatureLayerAssociation_(h)),
              !this.multi_
            );
        },
        { layerFilter: this.layerFilter_, hitTolerance: this.hitTolerance_ },
      );
      for (let h = l.length - 1; h >= 0; --h) a.remove(l[h]);
      a.extend(c);
    }
    return (
      (c.length > 0 || l.length > 0) &&
        this.dispatchEvent(new A_(b_.SELECT, c, l, t)),
      !0
    );
  }
}
function D_() {
  const s = Ho();
  return (
    Qt(s.Polygon, s.LineString),
    Qt(s.GeometryCollection, s.LineString),
    function (t) {
      return t.getGeometry() ? s[t.getGeometry().getType()] : null;
    }
  );
}
const O_ = new ge({ center: [260494143828e-5, 5260974341612e-6], zoom: 15 }),
  mo = new Ng({ title: "OSM", visible: !0, source: new s_() }),
  k_ = new si({ layers: [mo] }),
  zs = new Ri({
    source: new on({
      url: "./data/druzhba_1_borders.geojson",
      format: new ga(),
    }),
    style: new mt({ stroke: new Lt({ color: "#FF0000", width: 3 }) }),
  }),
  yo = new on(),
  sn = new Ri({
    source: yo,
    visible: !1,
    style: new mt({ stroke: new Lt({ color: "#aaa", width: 1 }) }),
  }),
  po = {};
Promise.all([
  fetch("./data/pedestrian_network_druzhba1_densified1.geojson").then((s) =>
    s.json(),
  ),
  fetch("./data/pedestrian_network_druzhba1_densified_osm.geojson").then((s) =>
    s.json(),
  ),
]).then(([s, t]) => {
  (po.network1 = s), (po.network2 = t), ic("network1");
});
function ic(s) {
  const t = po[s];
  if (!t) return;
  yo.clear();
  const e = new ga().readFeatures(t);
  yo.addFeatures(e), nc(e), pt && (ie.removeLayer(pt), (pt = null)), (Wn = !1);
}
document.getElementById("networkSelect").addEventListener("change", (s) => {
  const t = s.target.value;
  ic(t);
});
const lr = new on(),
  xi = new Ri({ source: lr });
let pt = null;
const G_ = new si({ layers: [zs, sn] }),
  ie = new Zh({ target: "map", layers: [k_, G_, xi], view: O_ });
let ve = {},
  Ln = [],
  Gt = [],
  Ge = [],
  Wn = !1;
function Fl(s) {
  return s[0].toFixed(6) + "," + s[1].toFixed(6);
}
function ma(s, t) {
  const e = s[0] - t[0],
    i = s[1] - t[1];
  return Math.sqrt(e * e + i * i);
}
function nc(s) {
  (ve = {}), (Ln = []);
  for (const t of s) {
    const e = t.getGeometry(),
      i =
        e.getType() === "MultiLineString"
          ? e.getCoordinates()
          : [e.getCoordinates()];
    for (const n of i)
      for (let r = 0; r < n.length - 1; r++) {
        const o = n[r],
          a = n[r + 1],
          l = Fl(o),
          c = Fl(a);
        ve[l] || ((ve[l] = []), Ln.push({ coord: o, key: l })),
          ve[c] || ((ve[c] = []), Ln.push({ coord: a, key: c }));
        const h = ma(o, a);
        ve[l].push({ node: c, weight: h }), ve[c].push({ node: l, weight: h });
      }
  }
}
function sc(s) {
  let t = 1 / 0,
    e = null;
  for (const i of Ln) {
    const n = ma(s, i.coord);
    n < t && ((t = n), (e = i));
  }
  return e;
}
function xo(s, t = new Set()) {
  const e = {},
    i = {},
    n = new Set();
  for (const r of Object.keys(ve)) t.has(r) || ((e[r] = 1 / 0), n.add(r));
  if (!e.hasOwnProperty(s)) return { dist: {}, prev: {} };
  for (e[s] = 0; n.size; ) {
    let r = null,
      o = 1 / 0;
    for (const a of n) e[a] < o && ((o = e[a]), (r = a));
    if (!r) break;
    n.delete(r);
    for (const a of ve[r]) {
      if (t.has(a.node)) continue;
      const l = e[r] + a.weight;
      l < e[a.node] && ((e[a.node] = l), (i[a.node] = r));
    }
  }
  return { dist: e, prev: i };
}
function bl(s, t) {
  const e = [];
  let i = t;
  for (; i && s[i]; ) e.unshift(i), (i = s[i]);
  return i && e.unshift(i), e.map((n) => Ln.find((r) => r.key === n).coord);
}
function N_(s) {
  const t = [],
    e = {};
  for (let d = 0; d < s.length; d++) {
    const f = s[d],
      { dist: g, prev: _ } = xo(f.snapKey);
    t[d] = [];
    for (let m = 0; m < s.length; m++) {
      const y = s[m];
      (t[d][m] = g[y.snapKey]), (e[`${d}-${m}`] = bl(_, y.snapKey));
    }
  }
  const i = new Set(),
    n = [0];
  i.add(0);
  let r = 0;
  for (; i.size < s.length; ) {
    let d = -1,
      f = 1 / 0;
    for (let g = 0; g < s.length; g++)
      !i.has(g) && t[r][g] < f && ((f = t[r][g]), (d = g));
    d !== -1 && (n.push(d), i.add(d), (r = d));
  }
  let o = [];
  for (let d = 0; d < n.length - 1; d++) {
    const f = n[d],
      g = n[d + 1],
      _ = e[`${f}-${g}`];
    o = o.concat(_.slice(1));
  }
  const a = n[n.length - 1],
    l = n[0],
    c = new Set(s.map((d) => d.snapKey));
  c.delete(s[a].snapKey), c.delete(s[l].snapKey);
  const { prev: h } = xo(s[a].snapKey, c),
    u = bl(h, s[l].snapKey);
  return u && u.length > 1 && (o = o.concat(u.slice(1))), o;
}
function B_(s) {
  pt && ie.removeLayer(pt);
  const t = s.reduce((n, r, o, a) => (o === 0 ? 0 : n + ma(a[o - 1], r)), 0),
    e = new Dt({
      geometry: new oe(s),
      name: "Маршрут",
      distance_m: Math.round(t),
      created_at: new Date().toISOString(),
    }),
    i = new on({ features: [e] });
  (pt = new Ri({
    source: i,
    style: new mt({ stroke: new Lt({ color: "#0048ff", width: 3 }) }),
  })),
    ie.addLayer(pt),
    hr({ map: ie, layer: pt, source: pt.getSource(), layerId: "route" });
}
function z_() {
  const s = xi.getSource().getFeatures();
  if (s.length !== Ge.length) return Al(s), !0;
  for (let t = 0; t < s.length; t++) {
    const e = s[t],
      i = e.get("__lastCoord"),
      n = e.getGeometry().getCoordinates();
    if (!i || n[0] !== i[0] || n[1] !== i[1]) return Al(s), !0;
  }
  return !1;
}
function Al(s) {
  (Ge = [...s]),
    (Gt = s.map((t) => {
      const e = t.getGeometry().getCoordinates(),
        i = sc(e);
      return { clicked: e, snapKey: i.key };
    }));
}
function X_() {
  if ((z_(), Gt.length >= 2)) {
    const s = N_(Gt);
    B_(s);
    const t = [],
      e = new Set();
    let i = 0;
    t.push(i), e.add(i);
    const n = [];
    for (let r = 0; r < Gt.length; r++) {
      const { dist: o } = xo(Gt[r].snapKey);
      n[r] = [];
      for (let a = 0; a < Gt.length; a++) n[r][a] = o[Gt[a].snapKey];
    }
    for (; t.length < Gt.length; ) {
      let r = 1 / 0,
        o = null;
      for (let a = 0; a < Gt.length; a++)
        !e.has(a) && n[i][a] < r && ((r = n[i][a]), (o = a));
      o !== null && (t.push(o), e.add(o), (i = o)),
        (document.getElementById("poiLayer").disabled = !1),
        (document.getElementById("points-openAttributesBtn").disabled = !1),
        (document.getElementById("points-toggleSelectBtn").disabled = !1),
        (document.getElementById("exportPOIBtn").disabled = !1),
        (document.getElementById("routeLayer").disabled = !1),
        (document.getElementById("route-openAttributesBtn").disabled = !1),
        (document.getElementById("route-toggleSelectBtn").disabled = !1),
        (document.getElementById("exportRouteBtn").disabled = !1);
    }
    for (let r = 0; r < t.length; r++) {
      const o = t[r];
      Ge[o].set("route_order", r + 1);
    }
    Wn = !0;
  } else alert("Please add at least two points.");
}
function W_() {
  (Gt = []),
    Ge.forEach((s) => lr.removeFeature(s)),
    (Ge = []),
    pt && (ie.removeLayer(pt), (pt = null)),
    (Wn = !1),
    (document.getElementById("poiLayer").disabled = !0),
    (document.getElementById("points-openAttributesBtn").disabled = !0),
    (document.getElementById("points-toggleSelectBtn").disabled = !0),
    (document.getElementById("routeLayer").disabled = !0),
    (document.getElementById("route-openAttributesBtn").disabled = !0),
    (document.getElementById("route-toggleSelectBtn").disabled = !0);
}
function j_() {
  if (Gt.length > 0) {
    Gt.pop();
    const s = Ge.pop();
    lr.removeFeature(s), pt && ie.removeLayer(pt);
  }
}
let Bi = !1,
  zi = !1,
  Cs = !1;
function hr({ map: s, layer: t, source: e, layerId: i, options: n = {} }) {
  const {
    enableDrawing: r = !1,
    geometryType: o = "LineString",
    filterDropdownField: a = null,
  } = n;
  let l = null,
    c = null,
    h = !1,
    u = null,
    d = null,
    f = null,
    g = null,
    _ = null;
  const m = new Zh();
  let y = !1,
    p = [],
    C = !1,
    x = {};
  function E(T) {
    const S = T.getGeometry().getType();
    return S === "Point"
      ? new mt({
          image: new ei({
            radius: 8,
            fill: new le({ color: "#FFFF00" }),
            stroke: new Lt({ color: "#000", width: 2 }),
          }),
        })
      : S === "LineString" ||
          S === "MultiLineString" ||
          S === "Polygon" ||
          S === "MultiPolygon"
        ? new mt({ stroke: new Lt({ color: "#FFFF00", width: 5 }) })
        : null;
  }
  const R = new Bs({ condition: sg, layers: [t], style: E }),
    L = new Bs({
      condition: rg,
      layers: [t],
      style: (T) => {
        const S = T.getGeometry().getType();
        return S === "Point"
          ? new mt({
              image: new ei({
                radius: 8,
                fill: new le({ color: "#00FFFF" }),
                stroke: new Lt({ color: "#000", width: 2 }),
              }),
            })
          : S === "LineString" ||
              S === "MultiLineString" ||
              S === "Polygon" ||
              S === "MultiPolygon"
            ? new mt({ stroke: new Lt({ color: "#00FFFF", width: 4 }) })
            : null;
      },
    }),
    I = document.getElementById(`${i}-toggleSelectBtn`);
  I.addEventListener("click", () => {
    if (Cs) {
      if (
        (s.removeInteraction(R),
        s.removeInteraction(L),
        (I.textContent = "Enable Map Selection"),
        (Cs = !1),
        l && (l.setStyle(null), (l = null)),
        c)
      ) {
        const T = e.getFeatures().find((S) => S.ol_uid === c);
        T && (T.setStyle(E), (l = T));
      }
    } else if (
      (s.addInteraction(R),
      s.addInteraction(L),
      (I.textContent = "Disable Map Selection"),
      (Cs = !0),
      c)
    ) {
      const T = e.getFeatures().find((S) => S.ol_uid === c);
      T && (R.getFeatures().clear(), R.getFeatures().push(T));
    }
  });
  function M(T) {
    if ((l && l.setStyle(null), T)) {
      T.setStyle(E), (l = T);
      const S = T.getGeometry().getExtent();
      s.getView().fit(S, {
        duration: 300,
        padding: [50, 50, 50, 50],
        maxZoom: 18,
      });
    }
    (c = T == null ? void 0 : T.ol_uid),
      (y = !0),
      document
        .querySelectorAll(`#${i}-attributeTable tbody tr`)
        .forEach((S) => {
          S.classList.remove("selected-row"),
            S.dataset.featureId === c &&
              (S.classList.add("selected-row"),
              S.scrollIntoView({ behavior: "smooth", block: "center" }));
        }),
      (document.getElementById(`${i}-selectedFeatureWarning`).style.display = T
        ? "block"
        : "none"),
      (document.getElementById(`${i}-deleteFeatureBtn`).disabled = !T),
      (document.getElementById(`${i}-modifyGeometryBtn`).disabled = !T),
      (document.getElementById(`${i}-clearSelectionBtn`).disabled = !1);
  }
  R.on("select", (T) => {
    const S = T.selected[0];
    if (h) {
      R.getFeatures().clear();
      return;
    }
    M(S);
  }),
    document
      .getElementById(`${i}-clearSelectionBtn`)
      .addEventListener("click", () => {
        l && (l.setStyle(null), (l = null)),
          (c = null),
          R.getFeatures().clear(),
          document
            .querySelectorAll(`#${i}-attributeTable tbody tr`)
            .forEach((T) => T.classList.remove("selected-row")),
          (document.getElementById(
            `${i}-selectedFeatureWarning`,
          ).style.display = "none"),
          (document.getElementById(`${i}-deleteFeatureBtn`).disabled = !0),
          (document.getElementById(`${i}-modifyGeometryBtn`).disabled = !0),
          (document.getElementById(`${i}-clearSelectionBtn`).disabled = !0),
          zi &&
            (s.removeInteraction(f),
            s.removeInteraction(g),
            (f = null),
            (g = null),
            (zi = !1),
            (document.getElementById(`${i}-modifyGeometryBtn`).textContent =
              "Start Modifying Geometry"));
      });
  function F() {
    const T = e.getFeatures();
    if (!T.length) {
      alert("No features loaded.");
      return;
    }
    const S = T[0].getProperties();
    delete S.geometry, (p = Object.keys(S));
    const P = T[0].getProperties();
    for (const Z of p) {
      const O = P[Z];
      x[Z] = typeof O;
    }
    const D = document.getElementById(`${i}-attributeHeader`),
      X = document.getElementById(`${i}-attributeFilters`),
      v = document.querySelector(`#${i}-attributeTable tbody`);
    (D.innerHTML = ""), (X.innerHTML = ""), (v.innerHTML = "");
    const J = n.filterDropdownField || null;
    p.forEach((Z) => {
      const O = document.createElement("th");
      (O.textContent = Z),
        (O.style.cursor = "pointer"),
        (O.dataset.field = Z),
        (O.dataset.sortDirection = ""),
        O.addEventListener("click", () => z(Z, O)),
        D.appendChild(O);
      const tt = document.createElement("th");
      if (Z === J) {
        const K = document.createElement("select");
        K.dataset.field = Z;
        const rt = document.createElement("option");
        (rt.value = ""), (rt.textContent = "Категория"), K.appendChild(rt);
        const nt = new Set();
        T.forEach((ut) => {
          const Mt = ut.get(Z);
          Mt != null && nt.add(Mt);
        }),
          Array.from(nt)
            .sort()
            .forEach((ut) => {
              const Mt = document.createElement("option");
              (Mt.value = ut), (Mt.textContent = ut), K.appendChild(Mt);
            }),
          K.addEventListener("change", () => k(p)),
          tt.appendChild(K);
      } else {
        const K = document.createElement("input");
        (K.type = "text"),
          (K.placeholder = "Filter..."),
          (K.dataset.field = Z),
          (K.style.width = "95%"),
          K.addEventListener("input", () => k(p)),
          tt.appendChild(K);
      }
      X.appendChild(tt);
    }),
      T.forEach((Z) => {
        const O = document.createElement("tr"),
          tt = Z.ol_uid;
        O.dataset.featureId = tt;
        const K = Z.getProperties();
        delete K.geometry,
          m.set(tt, { ...K }),
          h && O.classList.add("editing-row"),
          p.forEach((rt) => {
            const nt = document.createElement("td");
            (nt.contentEditable = h),
              (nt.textContent = K[rt] ?? ""),
              (nt.dataset.field = rt),
              nt.addEventListener("input", () => {
                const ut = nt.textContent.trim(),
                  Mt = nt.dataset.field,
                  hn = O.dataset.featureId,
                  Ut = m.get(hn),
                  ye = (Ut == null ? void 0 : Ut[Mt]) ?? "",
                  Pt = x[Mt];
                let kt = !0;
                Pt === "number"
                  ? (kt = !isNaN(Number(ut)))
                  : Pt === "boolean" &&
                    (kt =
                      ut.toLowerCase() === "true" ||
                      ut.toLowerCase() === "false"),
                  (nt.style.backgroundColor = kt ? "" : "#fdd"),
                  ut !== String(ye).trim()
                    ? ((O.dataset.edited = "true"), (C = !0))
                    : ((O.dataset.edited = ""),
                      Array.from(O.cells).some((ue) => {
                        const ze = ue.dataset.field,
                          Xe = ue.textContent.trim(),
                          _t = (Ut == null ? void 0 : Ut[ze]) ?? "";
                        return Xe !== String(_t).trim();
                      }) || (O.dataset.edited = ""));
                const ce = document.querySelector(
                  `#${i}-attributeTable tbody tr[data-edited="true"]`,
                );
                (C = !!ce),
                  (document.getElementById(`${i}-saveChangesBtn`).disabled =
                    !ce),
                  (document.getElementById(`${i}-undoChangesBtn`).disabled =
                    !ce);
              }),
              O.appendChild(nt);
          }),
          O.addEventListener("click", () => {
            if (h) return;
            const rt = e
              .getFeatures()
              .find((nt) => nt.ol_uid == O.dataset.featureId);
            rt && (R.getFeatures().clear(), R.getFeatures().push(rt), M(rt));
          }),
          v.appendChild(O),
          O.dataset.featureId === c &&
            (O.classList.add("selected-row"),
            y &&
              (setTimeout(
                () => O.scrollIntoView({ behavior: "smooth", block: "center" }),
                0,
              ),
              (y = !1)));
      }),
      (document.getElementById(`${i}-attributeModal`).style.display = "block");
  }
  function z(T, S) {
    const P = document.querySelector(`#${i}-attributeTable tbody`),
      X = document.querySelector(`#${i}-attributeTable thead`).rows[0],
      v = Array.from(P.rows);
    let J = S.dataset.sortDirection;
    (J = J === "asc" ? "desc" : "asc"),
      X.querySelectorAll("th").forEach((tt) => {
        tt.dataset.sortDirection = "";
      }),
      (S.dataset.sortDirection = J),
      (S.textContent = T + (J === "asc" ? " ↑" : " ↓"));
    const Z = x[T] || "string",
      O = (tt) =>
        Z === "number"
          ? parseFloat(tt) || 0
          : Z === "boolean"
            ? tt.toLowerCase() === "true"
            : tt.toLowerCase();
    v.sort((tt, K) => {
      const rt = O(tt.querySelector(`[data-field="${T}"]`).textContent),
        nt = O(K.querySelector(`[data-field="${T}"]`).textContent);
      return J === "asc"
        ? rt > nt
          ? 1
          : rt < nt
            ? -1
            : 0
        : rt < nt
          ? 1
          : rt > nt
            ? -1
            : 0;
    }),
      v.forEach((tt) => P.appendChild(tt));
  }
  function k(T) {
    const S = document.querySelector(`#${i}-attributeTable tbody`),
      P = Array.from(S.rows),
      D = {};
    T.forEach((X) => {
      var J;
      const v = document.querySelector(`[data-field="${X}"]`);
      (J = v == null ? void 0 : v.value) != null &&
        J.trim() &&
        (D[X] = v.value.toLowerCase());
    }),
      P.forEach((X) => {
        const v = Array.from(X.cells),
          J = T.every((Z, O) => {
            var rt;
            const tt = document.querySelector(`[data-field="${Z}"]`);
            if (!D[Z]) return !0;
            const K =
              ((rt = v[O].textContent) == null ? void 0 : rt.toLowerCase()) ||
              "";
            return tt.tagName === "SELECT"
              ? D[Z] === "" || K === D[Z]
              : K.includes(D[Z]);
          });
        X.style.display = J ? "" : "none";
      });
  }
  document
    .getElementById(`${i}-openAttributesBtn`)
    .addEventListener("click", F),
    document
      .getElementById(`${i}-toggleEditBtn`)
      .addEventListener("click", () => {
        (h &&
          C &&
          !confirm(
            "Имате незапазени промени в атрибутивната таблица. Сигурни ли сте, че искате да спрете редактирането преди да сте запазили промените?",
          )) ||
          ((h = !h),
          (document.getElementById(`${i}-toggleEditBtn`).textContent = h
            ? "Спри редактирането"
            : "✏️"),
          h || (C = !1),
          F());
      }),
    document
      .getElementById(`${i}-saveChangesBtn`)
      .addEventListener("click", () => {
        const T = document.querySelectorAll(`#${i}-attributeTable tbody tr`);
        let S = !1;
        if (
          (T.forEach((P) => {
            if (P.dataset.edited !== "true") return;
            const D = P.dataset.featureId,
              X = e.getFeatures().find((J) => J.ol_uid == D);
            if (!X) return;
            const v = P.querySelectorAll("td");
            for (const J of v) {
              const Z = J.dataset.field,
                O = J.textContent.trim(),
                tt = x[Z];
              let K = O;
              if (tt === "number") {
                if (((K = Number(O)), isNaN(K))) {
                  (S = !0), (J.style.backgroundColor = "#fdd");
                  continue;
                }
              } else if (tt === "boolean")
                if (O.toLowerCase() === "true" || O.toLowerCase() === "false")
                  K = O.toLowerCase() === "true";
                else {
                  (S = !0), (J.style.backgroundColor = "#fdd");
                  continue;
                }
              X.set(Z, K), (J.style.backgroundColor = "");
            }
            P.dataset.edited = "";
          }),
          S)
        ) {
          alert("Some values are invalid. Please correct them before saving.");
          return;
        }
        alert("Changes saved to vector source."),
          (C = !1),
          (document.getElementById(`${i}-saveChangesBtn`).disabled = !0),
          (document.getElementById(`${i}-undoChangesBtn`).disabled = !0),
          (document.getElementById(`${i}-downloadGeoJSONBtn`).disabled = !1);
      }),
    document
      .getElementById(`${i}-undoChangesBtn`)
      .addEventListener("click", () => {
        document
          .querySelectorAll(`#${i}-attributeTable tbody tr`)
          .forEach((S) => {
            const P = S.dataset.featureId,
              D = m.get(P);
            D &&
              (S.querySelectorAll("td").forEach((X) => {
                const v = X.dataset.field;
                X.textContent = D[v] ?? "";
              }),
              (S.dataset.edited = "false"));
          }),
          (C = !1),
          (document.getElementById(`${i}-saveChangesBtn`).disabled = !0),
          (document.getElementById(`${i}-undoChangesBtn`).disabled = !0),
          (document.getElementById(`${i}-downloadGeoJSONBtn`).disabled = !0);
      }),
    r &&
      (document
        .getElementById(`${i}-toggleDrawBtn`)
        .addEventListener("click", () => {
          Bi
            ? (s.removeInteraction(d),
              s.removeInteraction(g),
              (d = null),
              (Bi = !1),
              (document.getElementById(`${i}-toggleDrawBtn`).textContent =
                "Start Drawing"))
            : ((d = new v_({ source: e, type: o })),
              (g = new vl({ source: e })),
              d.on("drawend", (T) => {
                u = T.feature;
                const S = b(e);
                A(S);
              }),
              s.addInteraction(d),
              s.addInteraction(g),
              (Bi = !0),
              (document.getElementById(`${i}-toggleDrawBtn`).textContent =
                "Stop Drawing"));
        }),
      document.getElementById("saveAttrBtn").addEventListener("click", () => {
        const T = document.getElementById("attributeForm"),
          S = new FormData(T),
          P = {};
        for (const [D, X] of S.entries()) P[D] = X;
        u && (u.setProperties(P), (u = null)),
          (document.getElementById("attributeInputModal").style.display =
            "none"),
          s.removeInteraction(d),
          s.removeInteraction(g),
          (d = null),
          (Bi = !1),
          (document.getElementById(`${i}-toggleDrawBtn`).textContent =
            "Start Drawing");
      }),
      document.getElementById("cancelAttrBtn").addEventListener("click", () => {
        u && (e.removeFeature(u), (u = null)),
          (document.getElementById("attributeInputModal").style.display =
            "none"),
          s.removeInteraction(d),
          s.removeInteraction(g),
          (d = null),
          (Bi = !1),
          (document.getElementById(`${i}-toggleDrawBtn`).textContent =
            "Start Drawing");
      })),
    document
      .getElementById(`${i}-modifyGeometryBtn`)
      .addEventListener("click", () => {
        if (l)
          if (
            ((document.getElementById(`${i}-attributeModal`).style.display =
              "none"),
            !zi)
          )
            (_ = l.getGeometry().clone()),
              (f = new M_({ features: new Xt([l]) })),
              (g = new vl({ source: e })),
              s.addInteraction(f),
              s.addInteraction(g),
              L && L.setActive(!1),
              (zi = !0),
              (document.getElementById(`${i}-modifyGeometryBtn`).textContent =
                "Save/Undo Modifying Geometry...");
          else {
            const T = l.getGeometry();
            N(_, T) ||
              (confirm("Do you want to save the geometry edits?")
                ? alert("Geometry changes saved.")
                : (l.setGeometry(_),
                  alert("Geometry changes were discarded."))),
              s.removeInteraction(f),
              s.removeInteraction(g),
              (f = null),
              (g = null),
              L && L.setActive(!0),
              (zi = !1),
              (document.getElementById(`${i}-modifyGeometryBtn`).textContent =
                "Modify Geometry");
          }
      }),
    document
      .getElementById(`${i}-deleteFeatureBtn`)
      .addEventListener("click", () => {
        if (l) {
          if (confirm("Are you sure you want to delete this feature?")) {
            const S = l.ol_uid;
            e.removeFeature(l);
            const P = document.querySelector(
              `#${i}-attributeTable tbody tr[data-feature-id="${S}"]`,
            );
            P && P.remove(),
              (l = null),
              (c = null),
              document
                .querySelectorAll(`#${i}-attributeTable tbody tr`)
                .forEach((D) => D.classList.remove("selected-row")),
              (document.getElementById(
                `${i}-selectedFeatureWarning`,
              ).style.display = "none"),
              (document.getElementById(`${i}-deleteFeatureBtn`).disabled = !0),
              (document.getElementById(`${i}-modifyGeometryBtn`).disabled = !0),
              (document.getElementById(`${i}-clearSelectionBtn`).disabled = !0),
              R.getFeatures().clear(),
              F();
          }
        } else alert("No feature is selected for deletion.");
      }),
    document
      .getElementById(`${i}-downloadGeoJSONBtn`)
      .addEventListener("click", () => {
        ya(t, `${i}_edited.geojson`);
      });
  function b(T) {
    const S = T.getFeatures();
    if (!S.length) return [];
    const P = S[0].getProperties();
    return delete P.geometry, Object.keys(P);
  }
  function A(T) {
    const S = document.getElementById("attributeForm");
    (S.innerHTML = ""),
      T.forEach((P) => {
        const D = document.createElement("label");
        (D.innerHTML = `${P}: <input type="text" name="${P}" /><br>`),
          S.appendChild(D);
      }),
      (document.getElementById("attributeInputModal").style.display = "block");
  }
  function U(T, S) {
    if (T.length !== S.length) return !1;
    for (let P = 0; P < T.length; P++)
      if (Array.isArray(T[P]) && Array.isArray(S[P])) {
        if (!U(T[P], S[P])) return !1;
      } else if (T[P] !== S[P]) return !1;
    return !0;
  }
  function N(T, S) {
    return !T || !S || T.getType() !== S.getType()
      ? !1
      : U(T.getCoordinates(), S.getCoordinates());
  }
}
function ya(s, t = "layer.geojson") {
  if (!s || !s.getSource) {
    alert("Layer not available.");
    return;
  }
  const e = s.getSource();
  if (!e || e.getFeatures().length === 0) {
    alert("No features to export.");
    return;
  }
  const n = new ga().writeFeatures(e.getFeatures(), {
      featureProjection: ie.getView().getProjection(),
    }),
    r = new Blob([n], { type: "application/vnd.geo+json" }),
    o = URL.createObjectURL(r),
    a = document.createElement("a");
  (a.href = o),
    (a.download = t),
    document.body.appendChild(a),
    a.click(),
    document.body.removeChild(a),
    URL.revokeObjectURL(o);
}
hr({
  map: ie,
  layer: sn,
  source: sn.getSource(),
  layerId: "pedestrian",
  options: {
    enableDrawing: !0,
    geometryType: "LineString",
    filterDropdownField: "type",
  },
});
hr({ map: ie, layer: zs, source: zs.getSource(), layerId: "druzhba" });
ie.on("click", (s) => {
  if (Bi || zi || Cs) return;
  Wn &&
    (pt && (ie.removeLayer(pt), (pt = null)),
    Ge.forEach((r) => {
      const o = r.getStyle();
      if (o instanceof mt) {
        const a = o.clone();
        a.setText(null), r.setStyle(a);
      }
    }),
    (Wn = !1));
  const t = s.coordinate,
    e = sc(t);
  if (!e) {
    alert("No nearby node found.");
    return;
  }
  const i = Gt.length === 0;
  Gt.push({ clicked: t, snapKey: e.key });
  const n = new Dt({
    geometry: new ee(t),
    name: i ? "Начална точка" : "Точка на интерес",
  });
  lr.addFeature(n), Ge.push(n);
});
window.calculateTSP = X_;
window.resetApp = W_;
window.undoLastPoint = j_;
sn.getSource().on("featuresloadend", () => {
  const s = sn.getSource().getFeatures();
  nc(s);
});
xi.setStyle((s) => {
  const t = s.get("route_order"),
    e = t === 1 || (t == null && s === Ge[0]);
  return new mt({
    image: e
      ? new ei({
          radius: 7,
          fill: new le({ color: "#28821e" }),
          stroke: new Lt({ color: "#fff", width: 1 }),
        })
      : new $n({ src: "./icons/pin.png", scale: 0.012 }),
    text: t
      ? new sr({
          text: t.toString(),
          font: "bold 12px Arial",
          fill: new le({ color: "#000" }),
          stroke: new Lt({ color: "#fff", width: 2 }),
          offsetY: -15,
        })
      : null,
  });
});
hr({ map: ie, layer: xi, source: xi.getSource(), layerId: "points" });
const Dl = {
  pedestrianNetwork: sn,
  druzhbaBorder: zs,
  poiLayer: xi,
  routeLayer: pt,
};
document
  .querySelectorAll("input.form-check-input[type=checkbox]")
  .forEach((s) => {
    s.addEventListener("change", (t) => {
      const e = t.target.id,
        i = t.target.checked;
      Dl[e]
        ? Dl[e].setVisible(i)
        : console.warn(`Layer for ${e} not found or not yet initialized.`);
    });
  });
document.getElementById("osm").addEventListener("change", (s) => {
  mo && mo.setVisible(s.target.checked);
});
document.getElementById("exportPOIBtn").addEventListener("click", () => {
  ya(xi, "POIs.geojson");
});
document.getElementById("exportRouteBtn").addEventListener("click", () => {
  ya(pt, "Route.geojson");
});
