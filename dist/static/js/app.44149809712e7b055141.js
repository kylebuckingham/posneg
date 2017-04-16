webpackJsonp([1],{

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_main__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_main___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_main__);




__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{
    path: '/',
    name: 'main',
    component: __WEBPACK_IMPORTED_MODULE_2__components_main___default.a
  }]
}));

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(37)

var Component = __webpack_require__(10)(
  /* script */
  __webpack_require__(34),
  /* template */
  __webpack_require__(44),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);


var request = {
  headers: {
    'x-api-key': 'cMapyJwfgt2bqGIbV4uMd1rN08g2ILek1WNtgeT3'
  },
  url: 'https://nygtvwgteg.execute-api.us-west-2.amazonaws.com/prod/posneg'
};

var handleError = function handleError(err) {
  if (String(err).indexOf('401') !== -1) {
    console.log('errror' + err);
  }
};

/* harmony default export */ __webpack_exports__["a"] = ({
  getData: function getData() {
    request.method = 'GET';
    request.params = {
      'TableName': 'posneg'
    };
    return __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].axios.request(request).then(function (response) {
      return response.data.Items;
    }).catch(function (err) {
      handleError(err);
    });
  },
  sendData: function sendData(d) {
    request.params = {};
    request.method = 'POST';
    request.data = {
      TableName: 'posneg',
      Item: d
    };
    __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].axios.request(request).then(function (response) {
      return response.data.Items;
    }).catch(function (err) {
      handleError(err);
    });
  }
});

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_axios__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue_axios__);








__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_4_vue_axios___default.a, __WEBPACK_IMPORTED_MODULE_3_axios___default.a);

new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app'
});

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mapbox_gl__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mapbox_gl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mapbox_gl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_resources__ = __webpack_require__(32);





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'main',
  data: function data() {
    return {
      geo: [],
      exp: new Date().getTime(),
      clicked: false,
      map: {}
    };
  },
  mounted: function mounted() {
    this.createMap();
  },

  methods: {
    getUser: function getUser() {
      var id = localStorage.getItem('posneg');
      if (!id) {
        id = this.guid();
        localStorage.setItem('posneg', id);
      }
      return id;
    },
    getLocation: function getLocation(cb) {
      var s = this;
      if (s.geo.length > 0 && new Date().getTime() - s.exp < 200000) {
        return cb(s.geo);
      } else {
        navigator.geolocation.getCurrentPosition(function (pos) {
          s.geo = [pos.coords.latitude, pos.coords.longitude];
          s.exp = new Date().getTime();
          return cb(s.geo);
        });
      }
    },
    storeEvent: function storeEvent(val) {

      var s = this;
      s.clicked = true;
      s.getLocation(function (geo) {
        __WEBPACK_IMPORTED_MODULE_1__api_resources__["a" /* default */].sendData({
          id: s.guid(),
          user: s.getUser(),
          time: new Date().getTime(),
          geo: geo,
          value: val
        });
        s.map.panTo([geo[1], geo[0]]);
        s.addDataToMap();
      });
    },
    guid: function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    JSONtoGeo: function JSONtoGeo(d) {
      var n = [[], []];
      for (var i in d) {
        n[d[i].value].push({
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [d[i].geo[1], d[i].geo[0]]
          }
        });
      }
      return n;
    },
    createMap: function createMap() {
      __WEBPACK_IMPORTED_MODULE_0_mapbox_gl___default.a.accessToken = 'pk.eyJ1IjoiYnVja2lua2IiLCJhIjoiY2oxZDU3Mm9wMDBlYjMxbXB4Y2t4am5mbyJ9.gl_2wlSPKP9K9AqFLpQsGQ';

      var s = this;

      s.map = new __WEBPACK_IMPORTED_MODULE_0_mapbox_gl___default.a.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v9',
        minzoom: 1.3,
        center: [-122.3317778, 47.6357572],
        zoom: 13
      });
      s.map.on('load', function (e) {
        s.addDataToMap();
      });
    },
    addDataToMap: function addDataToMap() {
      var s = this;
      __WEBPACK_IMPORTED_MODULE_1__api_resources__["a" /* default */].getData().then(function (d) {
        var data = s.JSONtoGeo(d);
        for (var i in data) {
          var layer = s.map.getLayer('points' + i);
          if (!layer) {
            s.map.addLayer({
              'id': 'points' + i,
              'type': 'circle',
              'source': {
                'type': 'geojson',
                'data': {
                  'type': 'FeatureCollection',
                  'features': data[i]
                }
              },
              'layout': {
                'visibility': 'visible'
              },
              'paint': {
                'circle-radius': 8,
                'circle-color': Number(i) > 0 ? '#0ea541' : '#b30707'
              }
            });
          } else {
            s.map.getSource('points' + i).setData({
              'type': 'FeatureCollection',
              'features': data[i]
            });
          }
        }
      });
    }
  }
});

/***/ }),

/***/ 37:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 38:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(38)

var Component = __webpack_require__(10)(
  /* script */
  __webpack_require__(35),
  /* template */
  __webpack_require__(45),
  /* scopeId */
  "data-v-4a01d122",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 44:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),

/***/ 45:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main"
  }, [_c('div', {
    attrs: {
      "id": "map"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "math",
    class: {
      'clicked': _vm.clicked
    },
    attrs: {
      "id": "neg"
    },
    on: {
      "click": function($event) {
        _vm.storeEvent(0)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "math",
    class: {
      'clicked': _vm.clicked
    },
    attrs: {
      "id": "pos"
    },
    on: {
      "click": function($event) {
        _vm.storeEvent(1)
      }
    }
  })])
},staticRenderFns: []}

/***/ })

},[33]);
//# sourceMappingURL=app.44149809712e7b055141.js.map