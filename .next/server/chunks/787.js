exports.id = 787;
exports.ids = [787];
exports.modules = {

/***/ 49273:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 31232, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 52987, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 50831, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 56926, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 44282, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 16505, 23))

/***/ }),

/***/ 99543:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 10317));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 10345));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 79536, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 43872));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 74147, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 33987, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 20807))

/***/ }),

/***/ 10317:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ ThemeRegistry)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/styles/index.js
var styles = __webpack_require__(83476);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/CssBaseline/index.js
var CssBaseline = __webpack_require__(98331);
// EXTERNAL MODULE: ./node_modules/@emotion/cache/dist/emotion-cache.esm.js + 7 modules
var emotion_cache_esm = __webpack_require__(68941);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(57114);
// EXTERNAL MODULE: ./node_modules/@emotion/react/dist/emotion-element-6bdfffb2.esm.js + 1 modules
var emotion_element_6bdfffb2_esm = __webpack_require__(7904);
;// CONCATENATED MODULE: ./src/components/ThemeRegistry/EmotionCache.js
/* __next_internal_client_entry_do_not_use__ default auto */ 




// Adapted from https://github.com/garronej/tss-react/blob/main/src/next/appDir.tsx
function NextAppDirEmotionCacheProvider(props) {
    const { options, CacheProvider = emotion_element_6bdfffb2_esm.C, children } = props;
    const [registry] = react_.useState(()=>{
        const cache = (0,emotion_cache_esm["default"])(options);
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted = [];
        cache.insert = (...args)=>{
            const [selector, serialized] = args;
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push({
                    name: serialized.name,
                    isGlobal: !selector
                });
            }
            return prevInsert(...args);
        };
        const flush = ()=>{
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return {
            cache,
            flush
        };
    });
    (0,navigation.useServerInsertedHTML)(()=>{
        const inserted = registry.flush();
        if (inserted.length === 0) {
            return null;
        }
        let styles = "";
        let dataEmotionAttribute = registry.cache.key;
        const globals = [];
        inserted.forEach(({ name, isGlobal })=>{
            const style = registry.cache.inserted[name];
            if (typeof style !== "boolean") {
                if (isGlobal) {
                    globals.push({
                        name,
                        style
                    });
                } else {
                    styles += style;
                    dataEmotionAttribute += ` ${name}`;
                }
            }
        });
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Fragment, {
            children: [
                globals.map(({ name, style })=>/*#__PURE__*/ jsx_runtime_.jsx("style", {
                        "data-emotion": `${registry.cache.key}-global ${name}`,
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML: {
                            __html: style
                        }
                    }, name)),
                styles && /*#__PURE__*/ jsx_runtime_.jsx("style", {
                    "data-emotion": dataEmotionAttribute,
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML: {
                        __html: styles
                    }
                })
            ]
        });
    });
    return /*#__PURE__*/ jsx_runtime_.jsx(CacheProvider, {
        value: registry.cache,
        children: children
    });
}

// EXTERNAL MODULE: ./node_modules/next/font/google/target.css?{"path":"src/components/ThemeRegistry/theme.js","import":"Roboto","arguments":[{"weight":["300","400","500","700"],"subsets":["latin"],"display":"swap"}],"variableName":"roboto"}
var theme_js_import_Roboto_arguments_weight_300_400_500_700_subsets_latin_display_swap_variableName_roboto_ = __webpack_require__(66421);
var theme_js_import_Roboto_arguments_weight_300_400_500_700_subsets_latin_display_swap_variableName_roboto_default = /*#__PURE__*/__webpack_require__.n(theme_js_import_Roboto_arguments_weight_300_400_500_700_subsets_latin_display_swap_variableName_roboto_);
;// CONCATENATED MODULE: ./src/components/ThemeRegistry/theme.js


const theme = (0,styles.createTheme)({
    palette: {
        mode: "light"
    },
    typography: {
        fontFamily: (theme_js_import_Roboto_arguments_weight_300_400_500_700_subsets_latin_display_swap_variableName_roboto_default()).style.fontFamily
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                root: ({ ownerState })=>({
                        ...ownerState.severity === "info" && {
                            backgroundColor: "#60a5fa"
                        }
                    })
            }
        }
    }
});
/* harmony default export */ const ThemeRegistry_theme = (theme);

;// CONCATENATED MODULE: ./src/components/ThemeRegistry/ThemeRegistry.js
/* __next_internal_client_entry_do_not_use__ default auto */ 





function ThemeRegistry({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(NextAppDirEmotionCacheProvider, {
        options: {
            key: "mui"
        },
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(styles.ThemeProvider, {
            theme: ThemeRegistry_theme,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(CssBaseline["default"], {}),
                children
            ]
        })
    });
}


/***/ }),

/***/ 9439:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/react.shared-subset.js
var react_shared_subset = __webpack_require__(62947);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/AppBar/index.js
var AppBar = __webpack_require__(40881);
var AppBar_default = /*#__PURE__*/__webpack_require__.n(AppBar);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Box/index.js
var Box = __webpack_require__(58811);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Toolbar/index.js
var Toolbar = __webpack_require__(87117);
var Toolbar_default = /*#__PURE__*/__webpack_require__.n(Toolbar);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Typography/index.js
var Typography = __webpack_require__(48476);
var Typography_default = /*#__PURE__*/__webpack_require__.n(Typography);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/Dashboard.js
var Dashboard = __webpack_require__(85989);
var Dashboard_default = /*#__PURE__*/__webpack_require__.n(Dashboard);
// EXTERNAL MODULE: ./node_modules/react-hot-toast/dist/index.mjs
var dist = __webpack_require__(86014);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(61363);
;// CONCATENATED MODULE: ./src/components/ThemeRegistry/ThemeRegistry.js

const proxy = (0,module_proxy.createProxy)(String.raw`/media/com/a11db4f2-966b-4307-b5ef-52f8059a5aa3/work/harinderpreet/frontend/src/components/ThemeRegistry/ThemeRegistry.js`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const ThemeRegistry = (__default__);
;// CONCATENATED MODULE: ./src/app/layout.js


// import Link from 'next/link';


// import Drawer from '@mui/material/Drawer';


// import Divider from '@mui/material/Divider';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';

// import HomeIcon from '@mui/icons-material/Home';
// import StarIcon from '@mui/icons-material/Star';
// import ChecklistIcon from '@mui/icons-material/Checklist';
// import SettingsIcon from '@mui/icons-material/Settings';
// import SupportIcon from '@mui/icons-material/Support';
// import LogoutIcon from '@mui/icons-material/Logout';


const metadata = {
    title: "Next.js App Router + Material UI v5",
    description: "Next.js App Router + Material UI v5"
};
const DRAWER_WIDTH = 240;
// const LINKS = [
//   { text: 'Home', href: '/', icon: HomeIcon },
//   { text: 'Starred', href: '/starred', icon: StarIcon },
//   { text: 'Tasks', href: '/tasks', icon: ChecklistIcon },
// ];
// const PLACEHOLDER_LINKS = [
//   { text: 'Settings', icon: SettingsIcon },
//   { text: 'Support', icon: SupportIcon },
//   { text: 'Logout', icon: LogoutIcon },
// ];
function RootLayout({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ jsx_runtime_.jsx("body", {
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ThemeRegistry, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((AppBar_default()), {
                        position: "fixed",
                        sx: {
                            zIndex: 2000
                        },
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Toolbar_default()), {
                            sx: {
                                backgroundColor: "background.paper"
                            },
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx((Dashboard_default()), {
                                    sx: {
                                        color: "#444",
                                        mr: 2,
                                        transform: "translateY(-2px)"
                                    }
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx((Typography_default()), {
                                    variant: "h6",
                                    noWrap: true,
                                    component: "div",
                                    color: "black",
                                    children: "Align"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(dist/* Toaster */.x7, {
                        position: "top-center"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx((Box_default()), {
                        component: "main",
                        sx: {
                            flexGrow: 1,
                            bgcolor: "background.default",
                            mt: [
                                "48px",
                                "56px",
                                "64px"
                            ],
                            p: 3
                        },
                        children: children
                    })
                ]
            })
        })
    });
}


/***/ }),

/***/ 73881:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80085);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"16x16"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ })

};
;