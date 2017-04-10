<style lang="scss">

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
    border-top: .05em solid lighten($control-buttons-l, 40%);
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
    border-top: .05em solid lighten($control-buttons-r, 40%);
    border-bottom: .05em solid darken($control-buttons-r, 20%);
    &:hover, &:active {
      background: lighten($control-buttons-r, 5%);
      color: #fff;
    }
    .label {
      bottom: -3em;
    }
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
    <gmap-map
      style="width: 100%; height: 100%; position: absolute; left:0; top:0"
      :center="{lat:47.6328519, lng:-122.3231665}"
      :zoom="15"
      map-type-id="roadmap"
    ></gmap-map>
    <div id="neg" class="math" v-on:click="storeEvent(true)"><span class="label">-</span></div>
    <div id="pos" class="math" v-on:click="storeEvent(false)"><span class="label">+</span></div>
  </div>
</template>

<script>

import resources from '../api/resources'

export default {
  name: 'main',
  data() {
    return {
      position: {}
    }
  },
  methods: {
    getEvents: function(){
      var data = resources.getData().then(function(d){
        // console.log(d)
      })
    },
    storeEvent: function(pos){
      console.log(this.position.latitude)
      var data = resources.storeEvent().then(function(d){
        console.log(d)
      })
    }
  },
  mounted: function() {
    var self = this;
    if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position){
        self.position = position.coords;
      })
    }
  }
}
</script>