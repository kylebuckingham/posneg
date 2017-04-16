<style lang='scss' scoped>

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
    transition: all 0.5s ease;
    position: absolute;
    top: 0;
    bottom: 0;
    height: auto;
    font-size: 725%;
    color: rgba(44, 62, 80, 1);
    text-shadow: 0px 2px 3px #555;
  }

  #neg {
    background: $control-buttons-l;
    left: 0;
    right: 50%;
    &:hover,
    &:active {
      color: #fff;
      background: lighten($control-buttons-l, 5%);
    }
    &.clicked {
      right: 100%;
    }
  }

  #pos {
    right: 0;
    left: 50%;
    background: $control-buttons-r;
    &:hover,
    &:active {
      background: lighten($control-buttons-r, 5%);
      color: #fff;
    }
    &.clicked {
      left: 100%;
    }
  }

  .mapboxgl-ctrl-logo {
    display: none;
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

</style>

<template>

  <div class='main'>
    <div id='map'></div>
    <div id='neg' v-bind:class="{'clicked': clicked}" class='math' v-on:click='storeEvent(0)'></div>
    <div id='pos' v-bind:class="{'clicked': clicked}" class='math' v-on:click='storeEvent(1)'></div>
  </div>

</template>

<script>
  import mapboxgl from 'mapbox-gl'
  import resources from '../api/resources'

  export default {
    name: 'main',
    data () {
      return {
        geo: [],
        exp: new Date().getTime(),
        clicked: false,
        map: {}
      }
    },
    mounted () {
      this.createMap()
    },
    methods: {
      getUser: function () {
        var id = localStorage.getItem('posneg')
        if (!id) {
          id = this.guid()
          localStorage.setItem('posneg', id)
        }
        return id
      },
      getLocation: function (cb) {
        var s = this
        if (s.geo.length > 0 && new Date().getTime() - s.exp < 200000) {
          return cb(s.geo)
        } else {
          navigator.geolocation.getCurrentPosition(function (pos) {
            s.geo = [pos.coords.latitude, pos.coords.longitude]
            s.exp = new Date().getTime()
            return cb(s.geo)
          })
        }
      },
      storeEvent: function (val) {

        var s = this
        s.clicked = true
        s.getLocation(function (geo) {
          resources.sendData({
            id: s.guid(),
            user: s.getUser(),
            time: new Date().getTime(),
            geo: geo,
            value: val
          })
          s.map.panTo([geo[1], geo[0]]);
          s.addDataToMap()
        })
      },
      guid: function () {
        function s4 () {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4()
      },
      JSONtoGeo: function (d) {
        var n = [
          [],
          []
        ]
        for (var i in d) {
          n[d[i].value].push({
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [d[i].geo[1], d[i].geo[0]]
            }
          })
        }
        return n
      },
      createMap: function () {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYnVja2lua2IiLCJhIjoiY2oxZDU3Mm9wMDBlYjMxbXB4Y2t4am5mbyJ9.gl_2wlSPKP9K9AqFLpQsGQ'

        var s = this
        // init the map
        s.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/light-v9',
          minzoom: 1.3,
          center: [-122.3317778, 47.6357572], // Seattle
          zoom: 13
        })
        s.map.on('load', function (e) {
          s.addDataToMap()
        })
      },
      addDataToMap: function () {
        var s = this
        resources.getData().then(function (d) {
          var data = s.JSONtoGeo(d)
          for (var i in data) {
            var layer = s.map.getLayer('points' + i)
            if (!layer){
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
              })
            } else {
              s.map.getSource('points' + i).setData({
                'type': 'FeatureCollection',
                'features': data[i]
              })
            }
          }
        })
      }
    }
  }
</script>
