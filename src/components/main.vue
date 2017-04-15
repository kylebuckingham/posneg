<style lang="scss" scoped>

  // COLORS
  $control-buttons-l: #b30707;
  $control-buttons-r: #0ea541;

  .main {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
  }

  .math {
    position: absolute;
    top: 25%;
    height: auto;
    font-size: 725%;
    color: rgba(44,62,80,1);
    text-shadow: 0px 2px 3px #555;
  }
  #neg {
    left: 25%;
    background: $control-buttons-l;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    margin: .25em;
    // border-top: .05em solid lighten($control-buttons-l, 40%);
    border-bottom: .05em solid darken($control-buttons-l, 20%);
    &:hover, &:active {
      color: #fff;
      background: lighten($control-buttons-l, 5%);
    }
    .label {
      width: 300px;
      height: 300px;
      bottom: -3em;
    }
  }
  #pos {
    right: 25%;
    background: $control-buttons-r;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    margin: .25em;
    // border-top: .05em solid lighten($control-buttons-r, 40%);
    border-bottom: .05em solid darken($control-buttons-r, 20%);
    &:hover, &:active {
      background: lighten($control-buttons-r, 5%);
      color: #fff;
    }
    .label {
      bottom: -3em;
    }
  }


  #map {
    text-align: left;
    position: absolute;
    top: 0px;
    left: 0px !important;
    bottom: 0px;
    right: 0px;
    width: 100%;
  }

  // @media (max-width:1080px){
  //   #pos {
  //     right: 50%;
  //     left: 50%;
  //     top: 25%;
  //     bottom: 75%;
  //   }
  //   #neg {
  //     right: 50%;
  //     left: 50%;
  //     top: 75%;
  //     bottom: 25%;
  //   }
  // }

</style>

<template>

  <div class="main">
    <div id='map'></div>
    <div id="neg" class="math" v-on:click="storeEvent(0)"><span class="label">-</span></div>
    <div id="pos" class="math" v-on:click="storeEvent(1)"><span class="label">+</span></div>

  </div>

</template>

<script>

import mapboxgl from 'mapbox-gl'
import resources from '../api/resources'

export default {
  name: 'main',
  data() {
    return {
      geo: [],
      exp: new Date().getTime()
    }
  },
  mounted () {
    var self = this;
    self.createMap()
  },
  methods: {
    getUser: function(){
      var id = localStorage.getItem('posneg')
      if (!id){
        id = this.guid()
        localStorage.setItem('posneg', id)
      }
      return id
    },
    getLocation: function(cb){
      var s = this
      if (s.geo.length > 0 && new Date().getTime() - s.exp < 200000 ){
        return cb(s.geo)
      } else {
        navigator.geolocation.getCurrentPosition(function(pos){
          s.geo = [pos.coords.latitude, pos.coords.longitude]
          s.exp = new Date().getTime()
          return cb(s.geo)
        })
      }
    },
    storeEvent: function(val){
      var s = this
      s.getLocation(function(geo){
        resources.sendData({
          user: s.getUser(),
          time: new Date().getTime(),
          geo: geo,
          value: val
        }).then(function(d){
          // s.createMap()
        })
      })

    },
    guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    },
    JSONtoGeo: function(d){
      var n = [[],[]]
      for (var i in d){
        n[d[i].value].push({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [d[i].geo[1], d[i].geo[0]]
            }
        })
      }
      return n
    },
    createMap: function () {
      mapboxgl.accessToken = 'pk.eyJ1IjoiYnVja2lua2IiLCJhIjoiY2oxZDU3Mm9wMDBlYjMxbXB4Y2t4am5mbyJ9.gl_2wlSPKP9K9AqFLpQsGQ'

      var self = this;
      var map = self.map;

      // init the map
      map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v9',
        minzoom: 1.3,
        center: [-122.3317778, 47.6357572], // Seattle
        zoom: 13
      })

      var events = []
      resources.getData().then(function(d){
        events = d
        map.on('load', function (e) {

          var data = self.JSONtoGeo(d)

          for (var i in data){
            map.addLayer({
                'id': 'points' + i,
                'type': 'circle',
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": data[i]
                    }
                },
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'circle-radius': 8,
                    'circle-color': Number(i) > 0 ? '#b30707' : '#0ea541'
                }
            });
          }
        });
      })
    }
  },
}
</script>