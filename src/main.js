// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
load: {
  key: 'AIzaSyBZxaYnVIj-L0rSw3us_ICOYO5Lr05c6Zs'
  // v: 'OPTIONAL VERSION NUMBER',
  // libraries: 'places', //// If you need to use place input 
}
});

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
