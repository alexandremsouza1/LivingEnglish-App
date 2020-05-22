<template>
  <div>
    <q-input
      v-model="busca"
      filled
      label="Search Lyrics"
      v-if="true" 
      @blur="focoBusca" 
      @keydown="filteredItems" 
      autofocus
    >
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
    <div >
    <track-item v-for="track in tracks" :key="track.track.track_id" :track="track">
    </track-item>
    <q-input
      v-model="text"
      type="textarea"
      :max-height="100" 
      rows="31"
      @select.native="logSelectionWithinInput($event)"
      @paste.native="paste"
    />
    <card-letra 
    :all_frases="this.music.vet"
    :active="this.active"
    ></card-letra>
    </div>
    <!-- <q-btn
      round
      color="black"
      @click="loadmusic"
      class="fixed"
      icon="refresh"
      style="right: 18px; bottom: 72px"
    />
    <q-btn
      round
      color="primary"
      @click="add"
      class="fixed"
      icon="add"
      style="right: 18px; bottom: 18px"
    /> -->
  </div>
</template>
<script>
import axios from 'axios';
import TrackItem from 'src/components/trackitem'
import cardLetra  from "src/components/card-letra";
import {t,falar} from 'src/plugins/translate.js'
export default {
    components:{
      cardLetra,TrackItem
  },
  data () {
    return {
      tracks:[],
      busca:'',
      text: '',
      score:0,
      active: false,
      music: {
        name : '',
        vet: [],
        score_g: false      
      }
    }
  },
  mounted(){
   //this.loadmusic()
  },
  methods:{
    focoBusca(){
    //this.ListarTodos();  
    //this.search = false;
    },
    async filteredItems() {
      var _self = this;
      this.$q.loading.show();
      await axios.get('https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track='+this.busca+'&page_size=12&page=1&s_track_rating=desc&apikey=4b7f42e95eff356453a45073f87f0954')
      .then(res =>{
          _self.tracks = res.data.message.body.track_list
          _self.$q.loading.hide();
          if(!_self.tracks){
            _self.$q.notify('No information was found!');
          }
      })
      .catch(error => console.log(error)
      )
    },
    paste(e) {
        let paste = e.clipboardData.getData('text')
        var lyrics = [];
        var arr = [];
        var _self = this;
        setTimeout(async() => {
            arr = paste.split("\n");
            await _self.setToVet(arr)
            if(this.music.vet.length !== 0){
              this.active =  true;
              this.$setItem('music', this.music);
            }
        }, 1000);
        
    },
    setToVet(arr){
        var _self = this;
         return new Promise(function(resolve,reject){
            arr.forEach((val)=>{
              _self.music.vet.push( 
                  {
                    orig: val,
                    trad: '',
                    score: 0
                  }
              )
            });
            resolve(_self.music);
        })
    },
    add(){
      //  var __self = this;
       var arr = [];
       arr = this.text.split("\n");
        // arr.forEach(async function(x,y){
        //   if (!(y % 2 == 0) && ( x.trim() != '')){
        //     try{
        //       await t(arr[y-1]).then(function(result){
        //         __self.pontuacao(arr[y],result)
        //         console.log(__self.score);
        //         arr[y] = result
        //         __self.text = arr.join("\n");
        //       })
        //     //falar(arr[y-1])
        //     }catch(err){
        //       console.log(err);
        //     }
        //   }
        // })
        this.$setItem('music', arr)
    },
    loadmusic(){
      var _self = this;
      this.$getItem('music').then(function(value) {
        if(value.score == 0){
          _self.$removeItem('music');
          return false;
        }
        _self.music.vet = value.vet;
        if(_self.music.vet.length == 0){
            _self.text = "Cole sua música aqui!"
        }else{
            _self.active =  true;
        }
      }).catch(function(err) {
          console.log(err);
      });
    },
    async logSelectionWithinInput(e) {
      var selection = await e.target.value.substring(
        e.target.selectionStart,
        e.target.selectionEnd
      );
      falar(selection);
    },
    pontuacao(s1,s2){
        var s1Parts= s1.split(' ');
        var s2Parts= s2.split(' ');

        this.score = 0;

        for(var i = 0; i<s1Parts.length; i++)
        {
            try{
              if(s1Parts[i].toLowerCase() === s2Parts[i].toLowerCase())
                  this.score++;   
            }catch(err){
                  console.log(err);
            }
        }
        this.score = Math.trunc(5 * (this.score / s1Parts.length));
    }
}
}
</script>