import { jsx as c, jsxs as lt, Fragment as Mt } from "react/jsx-runtime";
import l from "react";
import Ct from "@mui/material/Button";
import { styled as E } from "@mui/material/styles";
import At from "@mui/material/Popover";
import dt from "@mui/material/Slider";
import U from "@mui/material/Box";
import kt from "@mui/material/TextField";
import Rt from "@mui/material/InputAdornment";
const Ht =
    "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(135deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(135deg, transparent 75%, #ccc 75%) /*! @noflip */",
  It =
    "linear-gradient(to top, #000000, transparent), linear-gradient(to right, #ffffff, transparent) /*! @noflip */",
  Pt = {
    Button: E(Ct)(() => ({
      backgroundSize: "8px 8px",
      backgroundPosition: "0 0, 4px 0, 4px -4px, 0px 4px",
      transition: "none",
      boxShadow:
        "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
      border: 0,
      borderRadius: 4,
      width: "24px",
      aspectRatio: "1 / 1",
      height: "24px",
      minWidth: 0,
    })),
  },
  Tt = (e) => {
    const {
      bgColor: t,
      className: r,
      disablePopover: n,
      isBgColorValid: a,
      ...o
    } = e;
    return /* @__PURE__ */ c(Pt.Button, {
      disableTouchRipple: !0,
      style: {
        backgroundColor: a ? t : void 0,
        backgroundImage: a ? void 0 : Ht,
        cursor: n ? "default" : void 0,
      },
      className: `MuiColorInput-Button ${r || ""}`,
      ...o,
    });
  },
  Bt = {
    Container: E("div")(() => ({
      width: 300,
      padding: 8,
    })),
  },
  Ft = ({ children: e, className: t, position: r = "start", ...n }) =>
    /* @__PURE__ */ c(At, {
      className: `MuiColorInput-Popover ${t || ""}`,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: r === "start" ? "left" : "right",
      },
      transformOrigin: {
        vertical: "top",
        horizontal: r === "start" ? "left" : "right",
      },
      ...n,
      children: /* @__PURE__ */ c(Bt.Container, { children: e }),
    }),
  Et = {
    Slider: E(dt, {
      shouldForwardProp: (e) => e !== "$rgbaFrom" && e !== "$rgbaTo",
    })(() => ({
      height: 8,
      "& .MuiSlider-rail": {
        opacity: 1,
        // TODO: find better way for perf
        background:
          "linear-gradient(to right, rgba(var(--rgb-r), var(--rgb-g), var(--rgb-b), 0) 0%, rgba(var(--rgb-r), var(--rgb-g), var(--rgb-b), 1) 100%)",
      },
      "& .MuiSlider-track": {
        color: "transparent",
        border: 0,
      },
      "& .MuiSlider-thumb": {
        backgroundColor: "#ffffff",
        border: "3px solid currentColor",
      },
    })),
  },
  Vt = (e) => {
    const { rgbColor: t, style: r, className: n, ...a } = e,
      o = {
        "--rgb-r": t.r,
        "--rgb-g": t.g,
        "--rgb-b": t.b,
        ...r,
      };
    return /* @__PURE__ */ c(Et.Slider, {
      className: `MuiColorInput-AlphaSlider ${n || ""}`,
      style: o,
      ...a,
    });
  },
  D = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
  },
  Nt = {
    ArrowUp: {
      type: "hsvV",
      value: 1,
    },
    ArrowDown: {
      type: "hsvV",
      value: -1,
    },
    ArrowLeft: {
      type: "hsvS",
      value: -1,
    },
    ArrowRight: {
      type: "hsvS",
      value: 1,
    },
  };
function Ot(e) {
  return e === D.up || e === D.down || e === D.left || e === D.right;
}
function G(e, t, r) {
  return Math.max(t, Math.min(e, r));
}
function nt(e) {
  return typeof e == "number";
}
function at(e, t, r) {
  const n = e.toLocaleString("en", {
    useGrouping: !1,
    minimumFractionDigits: t,
    maximumFractionDigits: r,
  });
  return Number(n);
}
function $t(e, t, r) {
  const n = e.getBoundingClientRect(),
    a = t - n.left,
    o = r - n.top;
  return {
    x: G(a / n.width, 0, 1),
    y: G(1 - o / n.height, 0, 1),
  };
}
function Lt(e) {
  const t = l.useRef();
  return (t.current = e), l.useCallback((...r) => t.current?.(...r), []);
}
const ot = {
    Space: E("div")(() => ({
      width: "100%",
      height: "180px",
      boxSizing: "border-box",
      outline: 0,
      position: "relative",
      backgroundImage: It,
    })),
    Thumb: E("div")(() => ({
      position: "absolute",
      border: "3px solid #ffffff",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
      marginLeft: "-10px /*! @noflip */",
      marginBottom: "-10px /*! @noflip */",
      outline: 0,
      boxSizing: "border-box",
      willChange: "left, bottom",
      transition: "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      "&:hover": {
        boxShadow: "0px 0px 0px 4px rgba(255 255 255 / 0.16)",
      },
      "&.MuiColorInput-Thumb-active": {
        boxShadow: "0px 0px 0px 8px rgba(255 255 255 / 0.16)",
      },
      "@media (hover: none)": {
        boxShadow: "none",
      },
    })),
  },
  Dt = (e) => {
    const { hsv: t, onChange: r, currentHue: n } = e,
      a = l.useRef(!1),
      o = l.useRef(null),
      [i, s] = l.useState(!1),
      h = Lt((p, k) => {
        if (!o.current) return;
        const { x: R, y: H } = $t(o.current, p, k);
        r({
          s: R,
          v: H,
        }),
          o.current &&
            document.activeElement !== o.current &&
            o.current.focus();
      }),
      x = l.useCallback(() => {
        a.current && ((a.current = !1), s(!1));
      }, []),
      g = l.useCallback((p) => {
        a.current && h(p.clientX, p.clientY);
      }, []);
    l.useEffect(
      () => (
        document.addEventListener("pointermove", g, !1),
        document.addEventListener("pointerup", x, !1),
        () => {
          document.removeEventListener("pointermove", g, !1),
            document.removeEventListener("pointerup", x, !1);
        }
      ),
      [x, g],
    );
    const b = (p) => {
        if (p.cancelable) {
          p.preventDefault(), (a.current = !0), h(p.clientX, p.clientY), s(!0);
        }
      },
      y = (p) => {
        if (Ot(p.key) && p.cancelable) {
          p.preventDefault();
          const { type: k, value: R } = Nt[p.key],
            H = p.shiftKey ? 10 : 1,
            O = k === "hsvS" ? t.s : t.v,
            I = G(O + R * H * 0.01, 0, 1);
          s(!0),
            r({
              s: k === "hsvS" ? I : t.s,
              v: k === "hsvV" ? I : t.v,
            });
        }
      },
      S = t.s * 100,
      A = t.v * 100;
    return /* @__PURE__ */ c(ot.Space, {
      onPointerDown: b,
      ref: o,
      className: "MuiColorInput-ColorSpace",
      style: {
        backgroundColor: `hsl(${n} 100% 50%)`,
        touchAction: "none",
      },
      role: "slider",
      "aria-valuetext": `Saturation ${at(S, 0, 0)}%, Brightness ${at(
        A,
        0,
        0,
      )}%`,
      onKeyDown: y,
      tabIndex: 0,
      children: /* @__PURE__ */ c(ot.Thumb, {
        "aria-label": "Color space thumb",
        className: i ? "MuiColorInput-Thumb-active" : "",
        style: {
          left: `${S}%`,
          bottom: `${A}%`,
        },
      }),
    });
  },
  _t = {
    Slider: E(dt)(() => ({
      height: 8,
      "& .MuiSlider-rail": {
        opacity: 1,
        background:
          "linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%) /*! @noflip */",
      },
      "& .MuiSlider-track": {
        color: "transparent",
        border: 0,
      },
      "& .MuiSlider-thumb": {
        backgroundColor: "#ffffff",
        border: "3px solid currentColor",
      },
    })),
  },
  jt = (e) => {
    const { className: t, ...r } = e;
    return /* @__PURE__ */ c(_t.Slider, {
      className: `MuiColorInput-HueSlider ${t || ""}`,
      ...r,
    });
  };
function d(e, t) {
  Gt(e) && (e = "100%");
  var r = Wt(e);
  return (
    (e = t === 360 ? e : Math.min(t, Math.max(0, parseFloat(e)))),
    r && (e = parseInt(String(e * t), 10) / 100),
    Math.abs(e - t) < 1e-6
      ? 1
      : (t === 360
          ? (e = (e < 0 ? (e % t) + t : e % t) / parseFloat(String(t)))
          : (e = (e % t) / parseFloat(String(t))),
        e)
  );
}
function _(e) {
  return Math.min(1, Math.max(0, e));
}
function Gt(e) {
  return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
}
function Wt(e) {
  return typeof e == "string" && e.indexOf("%") !== -1;
}
function gt(e) {
  return (e = parseFloat(e)), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function j(e) {
  return e <= 1 ? "".concat(Number(e) * 100, "%") : e;
}
function P(e) {
  return e.length === 1 ? "0" + e : String(e);
}
function Kt(e, t, r) {
  return {
    r: d(e, 255) * 255,
    g: d(t, 255) * 255,
    b: d(r, 255) * 255,
  };
}
function it(e, t, r) {
  (e = d(e, 255)), (t = d(t, 255)), (r = d(r, 255));
  var n = Math.max(e, t, r),
    a = Math.min(e, t, r),
    o = 0,
    i = 0,
    s = (n + a) / 2;
  if (n === a) (i = 0), (o = 0);
  else {
    var h = n - a;
    switch (((i = s > 0.5 ? h / (2 - n - a) : h / (n + a)), n)) {
      case e:
        o = (t - r) / h + (t < r ? 6 : 0);
        break;
      case t:
        o = (r - e) / h + 2;
        break;
      case r:
        o = (e - t) / h + 4;
        break;
    }
    o /= 6;
  }
  return { h: o, s: i, l: s };
}
function q(e, t, r) {
  return (
    r < 0 && (r += 1),
    r > 1 && (r -= 1),
    r < 1 / 6
      ? e + (t - e) * (6 * r)
      : r < 1 / 2
      ? t
      : r < 2 / 3
      ? e + (t - e) * (2 / 3 - r) * 6
      : e
  );
}
function Ut(e, t, r) {
  var n, a, o;
  if (((e = d(e, 360)), (t = d(t, 100)), (r = d(r, 100)), t === 0))
    (a = r), (o = r), (n = r);
  else {
    var i = r < 0.5 ? r * (1 + t) : r + t - r * t,
      s = 2 * r - i;
    (n = q(s, i, e + 1 / 3)), (a = q(s, i, e)), (o = q(s, i, e - 1 / 3));
  }
  return { r: n * 255, g: a * 255, b: o * 255 };
}
function st(e, t, r) {
  (e = d(e, 255)), (t = d(t, 255)), (r = d(r, 255));
  var n = Math.max(e, t, r),
    a = Math.min(e, t, r),
    o = 0,
    i = n,
    s = n - a,
    h = n === 0 ? 0 : s / n;
  if (n === a) o = 0;
  else {
    switch (n) {
      case e:
        o = (t - r) / s + (t < r ? 6 : 0);
        break;
      case t:
        o = (r - e) / s + 2;
        break;
      case r:
        o = (e - t) / s + 4;
        break;
    }
    o /= 6;
  }
  return { h: o, s: h, v: i };
}
function qt(e, t, r) {
  (e = d(e, 360) * 6), (t = d(t, 100)), (r = d(r, 100));
  var n = Math.floor(e),
    a = e - n,
    o = r * (1 - t),
    i = r * (1 - a * t),
    s = r * (1 - (1 - a) * t),
    h = n % 6,
    x = [r, i, o, o, s, r][h],
    g = [s, r, r, i, o, o][h],
    b = [o, o, s, r, r, i][h];
  return { r: x * 255, g: g * 255, b: b * 255 };
}
function ft(e, t, r, n) {
  var a = [
    P(Math.round(e).toString(16)),
    P(Math.round(t).toString(16)),
    P(Math.round(r).toString(16)),
  ];
  return n &&
    a[0].startsWith(a[0].charAt(1)) &&
    a[1].startsWith(a[1].charAt(1)) &&
    a[2].startsWith(a[2].charAt(1))
    ? a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0)
    : a.join("");
}
function zt(e, t, r, n, a) {
  var o = [
    P(Math.round(e).toString(16)),
    P(Math.round(t).toString(16)),
    P(Math.round(r).toString(16)),
    P(Yt(n)),
  ];
  return a &&
    o[0].startsWith(o[0].charAt(1)) &&
    o[1].startsWith(o[1].charAt(1)) &&
    o[2].startsWith(o[2].charAt(1)) &&
    o[3].startsWith(o[3].charAt(1))
    ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0) + o[3].charAt(0)
    : o.join("");
}
function Yt(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function ut(e) {
  return v(e) / 255;
}
function v(e) {
  return parseInt(e, 16);
}
function Xt(e) {
  return {
    r: e >> 16,
    g: (e & 65280) >> 8,
    b: e & 255,
  };
}
var X = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32",
};
function Zt(e) {
  var t = { r: 0, g: 0, b: 0 },
    r = 1,
    n = null,
    a = null,
    o = null,
    i = !1,
    s = !1;
  return (
    typeof e == "string" && (e = te(e)),
    typeof e == "object" &&
      (w(e.r) && w(e.g) && w(e.b)
        ? ((t = Kt(e.r, e.g, e.b)),
          (i = !0),
          (s = String(e.r).substr(-1) === "%" ? "prgb" : "rgb"))
        : w(e.h) && w(e.s) && w(e.v)
        ? ((n = j(e.s)),
          (a = j(e.v)),
          (t = qt(e.h, n, a)),
          (i = !0),
          (s = "hsv"))
        : w(e.h) &&
          w(e.s) &&
          w(e.l) &&
          ((n = j(e.s)),
          (o = j(e.l)),
          (t = Ut(e.h, n, o)),
          (i = !0),
          (s = "hsl")),
      Object.prototype.hasOwnProperty.call(e, "a") && (r = e.a)),
    (r = gt(r)),
    {
      ok: i,
      format: e.format || s,
      r: Math.min(255, Math.max(t.r, 0)),
      g: Math.min(255, Math.max(t.g, 0)),
      b: Math.min(255, Math.max(t.b, 0)),
      a: r,
    }
  );
}
var Jt = "[-\\+]?\\d+%?",
  Qt = "[-\\+]?\\d*\\.\\d+%?",
  C = "(?:".concat(Qt, ")|(?:").concat(Jt, ")"),
  z = "[\\s|\\(]+("
    .concat(C, ")[,|\\s]+(")
    .concat(C, ")[,|\\s]+(")
    .concat(C, ")\\s*\\)?"),
  Y = "[\\s|\\(]+("
    .concat(C, ")[,|\\s]+(")
    .concat(C, ")[,|\\s]+(")
    .concat(C, ")[,|\\s]+(")
    .concat(C, ")\\s*\\)?"),
  m = {
    CSS_UNIT: new RegExp(C),
    rgb: new RegExp("rgb" + z),
    rgba: new RegExp("rgba" + Y),
    hsl: new RegExp("hsl" + z),
    hsla: new RegExp("hsla" + Y),
    hsv: new RegExp("hsv" + z),
    hsva: new RegExp("hsva" + Y),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  };
function te(e) {
  if (((e = e.trim().toLowerCase()), e.length === 0)) return !1;
  var t = !1;
  if (X[e]) (e = X[e]), (t = !0);
  else if (e === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var r = m.rgb.exec(e);
  return r
    ? { r: r[1], g: r[2], b: r[3] }
    : ((r = m.rgba.exec(e)),
      r
        ? { r: r[1], g: r[2], b: r[3], a: r[4] }
        : ((r = m.hsl.exec(e)),
          r
            ? { h: r[1], s: r[2], l: r[3] }
            : ((r = m.hsla.exec(e)),
              r
                ? { h: r[1], s: r[2], l: r[3], a: r[4] }
                : ((r = m.hsv.exec(e)),
                  r
                    ? { h: r[1], s: r[2], v: r[3] }
                    : ((r = m.hsva.exec(e)),
                      r
                        ? { h: r[1], s: r[2], v: r[3], a: r[4] }
                        : ((r = m.hex8.exec(e)),
                          r
                            ? {
                                r: v(r[1]),
                                g: v(r[2]),
                                b: v(r[3]),
                                a: ut(r[4]),
                                format: t ? "name" : "hex8",
                              }
                            : ((r = m.hex6.exec(e)),
                              r
                                ? {
                                    r: v(r[1]),
                                    g: v(r[2]),
                                    b: v(r[3]),
                                    format: t ? "name" : "hex",
                                  }
                                : ((r = m.hex4.exec(e)),
                                  r
                                    ? {
                                        r: v(r[1] + r[1]),
                                        g: v(r[2] + r[2]),
                                        b: v(r[3] + r[3]),
                                        a: ut(r[4] + r[4]),
                                        format: t ? "name" : "hex8",
                                      }
                                    : ((r = m.hex3.exec(e)),
                                      r
                                        ? {
                                            r: v(r[1] + r[1]),
                                            g: v(r[2] + r[2]),
                                            b: v(r[3] + r[3]),
                                            format: t ? "name" : "hex",
                                          }
                                        : !1)))))))));
}
function w(e) {
  return !!m.CSS_UNIT.exec(String(e));
}
var M =
  /** @class */
  (function () {
    function e(t, r) {
      t === void 0 && (t = ""), r === void 0 && (r = {});
      var n;
      if (t instanceof e) return t;
      typeof t == "number" && (t = Xt(t)), (this.originalInput = t);
      var a = Zt(t);
      (this.originalInput = t),
        (this.r = a.r),
        (this.g = a.g),
        (this.b = a.b),
        (this.a = a.a),
        (this.roundA = Math.round(100 * this.a) / 100),
        (this.format = (n = r.format) !== null && n !== void 0 ? n : a.format),
        (this.gradientType = r.gradientType),
        this.r < 1 && (this.r = Math.round(this.r)),
        this.g < 1 && (this.g = Math.round(this.g)),
        this.b < 1 && (this.b = Math.round(this.b)),
        (this.isValid = a.ok);
    }
    return (
      (e.prototype.isDark = function () {
        return this.getBrightness() < 128;
      }),
      (e.prototype.isLight = function () {
        return !this.isDark();
      }),
      (e.prototype.getBrightness = function () {
        var t = this.toRgb();
        return (t.r * 299 + t.g * 587 + t.b * 114) / 1e3;
      }),
      (e.prototype.getLuminance = function () {
        var t = this.toRgb(),
          r,
          n,
          a,
          o = t.r / 255,
          i = t.g / 255,
          s = t.b / 255;
        return (
          o <= 0.03928
            ? (r = o / 12.92)
            : (r = Math.pow((o + 0.055) / 1.055, 2.4)),
          i <= 0.03928
            ? (n = i / 12.92)
            : (n = Math.pow((i + 0.055) / 1.055, 2.4)),
          s <= 0.03928
            ? (a = s / 12.92)
            : (a = Math.pow((s + 0.055) / 1.055, 2.4)),
          0.2126 * r + 0.7152 * n + 0.0722 * a
        );
      }),
      (e.prototype.getAlpha = function () {
        return this.a;
      }),
      (e.prototype.setAlpha = function (t) {
        return (
          (this.a = gt(t)), (this.roundA = Math.round(100 * this.a) / 100), this
        );
      }),
      (e.prototype.isMonochrome = function () {
        var t = this.toHsl().s;
        return t === 0;
      }),
      (e.prototype.toHsv = function () {
        var t = st(this.r, this.g, this.b);
        return { h: t.h * 360, s: t.s, v: t.v, a: this.a };
      }),
      (e.prototype.toHsvString = function () {
        var t = st(this.r, this.g, this.b),
          r = Math.round(t.h * 360),
          n = Math.round(t.s * 100),
          a = Math.round(t.v * 100);
        return this.a === 1
          ? "hsv(".concat(r, ", ").concat(n, "%, ").concat(a, "%)")
          : "hsva("
              .concat(r, ", ")
              .concat(n, "%, ")
              .concat(a, "%, ")
              .concat(this.roundA, ")");
      }),
      (e.prototype.toHsl = function () {
        var t = it(this.r, this.g, this.b);
        return { h: t.h * 360, s: t.s, l: t.l, a: this.a };
      }),
      (e.prototype.toHslString = function () {
        var t = it(this.r, this.g, this.b),
          r = Math.round(t.h * 360),
          n = Math.round(t.s * 100),
          a = Math.round(t.l * 100);
        return this.a === 1
          ? "hsl(".concat(r, ", ").concat(n, "%, ").concat(a, "%)")
          : "hsla("
              .concat(r, ", ")
              .concat(n, "%, ")
              .concat(a, "%, ")
              .concat(this.roundA, ")");
      }),
      (e.prototype.toHex = function (t) {
        return t === void 0 && (t = !1), ft(this.r, this.g, this.b, t);
      }),
      (e.prototype.toHexString = function (t) {
        return t === void 0 && (t = !1), "#" + this.toHex(t);
      }),
      (e.prototype.toHex8 = function (t) {
        return t === void 0 && (t = !1), zt(this.r, this.g, this.b, this.a, t);
      }),
      (e.prototype.toHex8String = function (t) {
        return t === void 0 && (t = !1), "#" + this.toHex8(t);
      }),
      (e.prototype.toHexShortString = function (t) {
        return (
          t === void 0 && (t = !1),
          this.a === 1 ? this.toHexString(t) : this.toHex8String(t)
        );
      }),
      (e.prototype.toRgb = function () {
        return {
          r: Math.round(this.r),
          g: Math.round(this.g),
          b: Math.round(this.b),
          a: this.a,
        };
      }),
      (e.prototype.toRgbString = function () {
        var t = Math.round(this.r),
          r = Math.round(this.g),
          n = Math.round(this.b);
        return this.a === 1
          ? "rgb(".concat(t, ", ").concat(r, ", ").concat(n, ")")
          : "rgba("
              .concat(t, ", ")
              .concat(r, ", ")
              .concat(n, ", ")
              .concat(this.roundA, ")");
      }),
      (e.prototype.toPercentageRgb = function () {
        var t = function (r) {
          return "".concat(Math.round(d(r, 255) * 100), "%");
        };
        return {
          r: t(this.r),
          g: t(this.g),
          b: t(this.b),
          a: this.a,
        };
      }),
      (e.prototype.toPercentageRgbString = function () {
        var t = function (r) {
          return Math.round(d(r, 255) * 100);
        };
        return this.a === 1
          ? "rgb("
              .concat(t(this.r), "%, ")
              .concat(t(this.g), "%, ")
              .concat(t(this.b), "%)")
          : "rgba("
              .concat(t(this.r), "%, ")
              .concat(t(this.g), "%, ")
              .concat(t(this.b), "%, ")
              .concat(this.roundA, ")");
      }),
      (e.prototype.toName = function () {
        if (this.a === 0) return "transparent";
        if (this.a < 1) return !1;
        for (
          var t = "#" + ft(this.r, this.g, this.b, !1),
            r = 0,
            n = Object.entries(X);
          r < n.length;
          r++
        ) {
          var a = n[r],
            o = a[0],
            i = a[1];
          if (t === i) return o;
        }
        return !1;
      }),
      (e.prototype.toString = function (t) {
        var r = !!t;
        t = t ?? this.format;
        var n = !1,
          a = this.a < 1 && this.a >= 0,
          o = !r && a && (t.startsWith("hex") || t === "name");
        return o
          ? t === "name" && this.a === 0
            ? this.toName()
            : this.toRgbString()
          : (t === "rgb" && (n = this.toRgbString()),
            t === "prgb" && (n = this.toPercentageRgbString()),
            (t === "hex" || t === "hex6") && (n = this.toHexString()),
            t === "hex3" && (n = this.toHexString(!0)),
            t === "hex4" && (n = this.toHex8String(!0)),
            t === "hex8" && (n = this.toHex8String()),
            t === "name" && (n = this.toName()),
            t === "hsl" && (n = this.toHslString()),
            t === "hsv" && (n = this.toHsvString()),
            n || this.toHexString());
      }),
      (e.prototype.toNumber = function () {
        return (
          (Math.round(this.r) << 16) +
          (Math.round(this.g) << 8) +
          Math.round(this.b)
        );
      }),
      (e.prototype.clone = function () {
        return new e(this.toString());
      }),
      (e.prototype.lighten = function (t) {
        t === void 0 && (t = 10);
        var r = this.toHsl();
        return (r.l += t / 100), (r.l = _(r.l)), new e(r);
      }),
      (e.prototype.brighten = function (t) {
        t === void 0 && (t = 10);
        var r = this.toRgb();
        return (
          (r.r = Math.max(
            0,
            Math.min(255, r.r - Math.round(255 * -(t / 100))),
          )),
          (r.g = Math.max(
            0,
            Math.min(255, r.g - Math.round(255 * -(t / 100))),
          )),
          (r.b = Math.max(
            0,
            Math.min(255, r.b - Math.round(255 * -(t / 100))),
          )),
          new e(r)
        );
      }),
      (e.prototype.darken = function (t) {
        t === void 0 && (t = 10);
        var r = this.toHsl();
        return (r.l -= t / 100), (r.l = _(r.l)), new e(r);
      }),
      (e.prototype.tint = function (t) {
        return t === void 0 && (t = 10), this.mix("white", t);
      }),
      (e.prototype.shade = function (t) {
        return t === void 0 && (t = 10), this.mix("black", t);
      }),
      (e.prototype.desaturate = function (t) {
        t === void 0 && (t = 10);
        var r = this.toHsl();
        return (r.s -= t / 100), (r.s = _(r.s)), new e(r);
      }),
      (e.prototype.saturate = function (t) {
        t === void 0 && (t = 10);
        var r = this.toHsl();
        return (r.s += t / 100), (r.s = _(r.s)), new e(r);
      }),
      (e.prototype.greyscale = function () {
        return this.desaturate(100);
      }),
      (e.prototype.spin = function (t) {
        var r = this.toHsl(),
          n = (r.h + t) % 360;
        return (r.h = n < 0 ? 360 + n : n), new e(r);
      }),
      (e.prototype.mix = function (t, r) {
        r === void 0 && (r = 50);
        var n = this.toRgb(),
          a = new e(t).toRgb(),
          o = r / 100,
          i = {
            r: (a.r - n.r) * o + n.r,
            g: (a.g - n.g) * o + n.g,
            b: (a.b - n.b) * o + n.b,
            a: (a.a - n.a) * o + n.a,
          };
        return new e(i);
      }),
      (e.prototype.analogous = function (t, r) {
        t === void 0 && (t = 6), r === void 0 && (r = 30);
        var n = this.toHsl(),
          a = 360 / r,
          o = [this];
        for (n.h = (n.h - ((a * t) >> 1) + 720) % 360; --t; )
          (n.h = (n.h + a) % 360), o.push(new e(n));
        return o;
      }),
      (e.prototype.complement = function () {
        var t = this.toHsl();
        return (t.h = (t.h + 180) % 360), new e(t);
      }),
      (e.prototype.monochromatic = function (t) {
        t === void 0 && (t = 6);
        for (
          var r = this.toHsv(), n = r.h, a = r.s, o = r.v, i = [], s = 1 / t;
          t--;

        )
          i.push(new e({ h: n, s: a, v: o })), (o = (o + s) % 1);
        return i;
      }),
      (e.prototype.splitcomplement = function () {
        var t = this.toHsl(),
          r = t.h;
        return [
          this,
          new e({ h: (r + 72) % 360, s: t.s, l: t.l }),
          new e({ h: (r + 216) % 360, s: t.s, l: t.l }),
        ];
      }),
      (e.prototype.onBackground = function (t) {
        var r = this.toRgb(),
          n = new e(t).toRgb(),
          a = r.a + n.a * (1 - r.a);
        return new e({
          r: (r.r * r.a + n.r * n.a * (1 - r.a)) / a,
          g: (r.g * r.a + n.g * n.a * (1 - r.a)) / a,
          b: (r.b * r.a + n.b * n.a * (1 - r.a)) / a,
          a,
        });
      }),
      (e.prototype.triad = function () {
        return this.polyad(3);
      }),
      (e.prototype.tetrad = function () {
        return this.polyad(4);
      }),
      (e.prototype.polyad = function (t) {
        for (
          var r = this.toHsl(), n = r.h, a = [this], o = 360 / t, i = 1;
          i < t;
          i++
        )
          a.push(new e({ h: (n + i * o) % 360, s: r.s, l: r.l }));
        return a;
      }),
      (e.prototype.equals = function (t) {
        return this.toRgbString() === new e(t).toRgbString();
      }),
      e
    );
  })();
function ee(e) {
  return typeof e == "string";
}
function F(e, t) {
  return e.toString(t);
}
function ht(e, t, r) {
  return new M(e, r);
}
function re(e) {
  return ee(e) ? e : new M(e).toString();
}
const ne = (e) => {
    const { currentColor: t, format: r, onChange: n, isAlphaHidden: a } = e,
      [o, i] = l.useState(t.toHsv()),
      s = (g, b) => {
        if (!nt(b)) return;
        const y = G((360 * b) / 100, 0, 359);
        i((A) => ({
          ...A,
          h: y,
        }));
        const S = new M({
          ...o,
          a: t.toHsv().a,
          h: y,
        });
        n?.(F(S, r));
      },
      h = (g, b) => {
        if (!nt(b)) return;
        const y = t.clone().setAlpha(b);
        n?.(F(y, r));
      },
      x = ({ s: g, v: b }) => {
        const y = new M({
          h: o.h,
          a: t.toHsv().a,
          s: g,
          v: b,
        });
        i((S) => ({
          ...S,
          s: g,
          v: b,
        })),
          n?.(F(y, r));
      };
    return /* @__PURE__ */ lt(U, {
      className: "MuiColorInput-PopoverBody",
      children: [
        /* @__PURE__ */ c(Dt, {
          currentHue: o.h,
          hsv: o,
          onChange: x,
        }),
        /* @__PURE__ */ c(U, {
          mt: "10px",
          px: "3px",
          children: /* @__PURE__ */ c(jt, {
            min: 0,
            max: 100,
            step: 1,
            onChange: s,
            "aria-label": "hue",
            value: (o.h * 100) / 360,
          }),
        }),
        a
          ? null
          : /* @__PURE__ */ c(U, {
              mt: "10px",
              px: "3px",
              children: /* @__PURE__ */ c(Vt, {
                min: 0,
                max: 1,
                step: 0.01,
                "aria-label": "alpha",
                rgbColor: t.toRgb(),
                onChange: h,
                value: t.getAlpha(),
              }),
            }),
      ],
    });
  },
  ae = l.forwardRef((e, t) => {
    const { className: r, ...n } = e;
    return /* @__PURE__ */ c(kt, {
      className: `MuiColorInput-TextField ${r || ""}`,
      ref: t,
      ...n,
    });
  }),
  oe = "black",
  ie = "rgb";
function se(e) {
  return typeof e == "object" && !Array.isArray(e) && e !== null;
}
function ct(e, t) {
  typeof t == "function"
    ? t(e)
    : t && se(t) && "current" in t && (t.current = e);
}
function ve(e) {
  return new M(e).isValid;
}
const me = l.forwardRef((e, t) => {
  const {
      value: r,
      format: n,
      onChange: a,
      adornmentPosition: o = "start",
      PopoverProps: i,
      Adornment: s = Tt,
      fallbackValue: h,
      isAlphaHidden: x,
      disablePopover: g,
      ...b
    } = e,
    { onBlur: y, InputProps: S, ...A } = b,
    { onClose: p, ...k } = i || {},
    R = h || oe,
    H = A.disabled || S?.disabled || !1,
    O = l.useRef(null),
    I = l.useRef(null),
    [Z, J] = l.useState(null),
    T = n || ie,
    W = ht(r, R, {
      format: T,
    }),
    [$, V] = l.useState(r),
    [Q, N] = l.useState(r),
    pt = (f) => {
      if (f.cancelable) {
        f.preventDefault(), f.stopPropagation(), !H && !g && J(O.current);
      }
    },
    L = (f) => {
      const u = new M(f);
      a?.(f, {
        hex: u.isValid ? u.toHexString() : "",
        hsv: u.isValid ? u.toHsvString() : "",
        hsl: u.isValid ? u.toHslString() : "",
        rgb: u.isValid ? u.toRgbString() : "",
        hex8: u.isValid ? u.toHex8String() : "",
      });
    },
    bt = (f) => {
      const u = f.target.value;
      if ((V(u), u === "")) N(""), L("");
      else {
        const K = new M(u),
          B = F(K, T);
        N(B), L(B);
      }
    },
    vt = (...f) => {
      p?.(...f),
        J(null),
        queueMicrotask(() => {
          I.current?.focus();
        });
    },
    mt = (f) => {
      y?.(f);
      const u = new M($);
      if (u.isValid) u.format !== T && V(F(u, T));
      else {
        if ($ === "") return;
        const K = new M(R),
          B = F(K, T);
        V(B), N(B), L(B);
      }
    };
  l.useEffect(() => {
    if (r !== Q) {
      const u = ht(r).originalInput;
      N(u), V(u);
    }
  }, [r, Q, R]);
  const yt = (f) => {
      V(f), N(f), L(f);
    },
    xt = (f) => {
      (O.current = f), t && ct(f, t);
    },
    St = (f) => {
      (I.current = f), I && ct(f, I);
    },
    tt = !!Z,
    et = tt ? "color-popover" : void 0,
    rt = /* @__PURE__ */ c(Rt, {
      position: o,
      children: /* @__PURE__ */ c(s, {
        disabled: H,
        "aria-describedby": et,
        disablePopover: g || !1,
        component: g ? "span" : void 0,
        bgColor: W.toString(),
        isBgColorValid: !!($ !== "" && W.isValid),
        onClick: g ? void 0 : pt,
      }),
    }),
    wt =
      o === "start"
        ? {
            startAdornment: rt,
          }
        : {
            endAdornment: rt,
          };
  return /* @__PURE__ */ lt(Mt, {
    children: [
      /* @__PURE__ */ c(ae, {
        ref: xt,
        spellCheck: "false",
        type: "text",
        autoComplete: "off",
        onChange: bt,
        value: re($),
        onBlur: mt,
        inputRef: St,
        disabled: H,
        InputProps: {
          ...wt,
          ...S,
        },
        ...A,
      }),
      g
        ? null
        : /* @__PURE__ */ c(Ft, {
            id: et,
            open: tt,
            position: o,
            anchorEl: Z,
            onClose: vt,
            ...k,
            children: /* @__PURE__ */ c(ne, {
              onChange: yt,
              currentColor: W,
              format: T,
              isAlphaHidden: x,
            }),
          }),
    ],
  });
});
export { me as MuiColorInput, ve as matchIsValidColor };
