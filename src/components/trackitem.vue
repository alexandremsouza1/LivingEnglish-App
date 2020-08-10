<template>
<div class="q-pa-md" @click="choiseSong(track)">
    <card-letra 
    :all_frases="this.track"
    :active="this.active"
    @update-active="update"
    ></card-letra>
    <q-list bordered class="rounded-borders" style="max-width: 100%">
      <q-item>
        <q-item-section avatar>
          <q-icon name="queue_music" color="black" size="34px" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">
            <span class="text-weight-medium">{{ track.nome}}</span>
            <!--<span class="text-grey-8"> - {{ track.pontuacao_atingida }}</span> -->
          </q-item-label>
          <q-item-label caption lines="1">
            <!-- {{ track.track.album_name }} -->
          </q-item-label>
          <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
              <router-link :to="{ name: 'lyrics', params: {id: track.id } }"> </router-link>
          </q-item-label>
        </q-item-section>

  
      </q-item>
      <q-separator spaced />
      <div class="q-gutter-y-md column q-mx-md">
      <q-rating
          v-model="track.pontuacao_atingida"
          size="2em"
          color="yellow"
          readonly
        />
      </div>
    </q-list>
  </div>
</template>

<script>
import cardLetra  from "src/components/card-letra";
import axios from 'axios';
export default {
    name:'track-item',
     components:{
      cardLetra
  },
    props: {
        track: {
            type: Object,
            required: true,
        }
    },
    data () {
     return {
      music: {},
      active:false
     }
    },
    methods:{
      update(state){
        this.active = state
      },
      choiseSong(track){
        this.music = track;
        this.active = true;
        //this.getSong(track.track.track_id);
      },
      async getSong(id) {
        var _self = this;
        this.$q.loading.show();
        await axios.get('https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id='+id+'&apikey=4b7f42e95eff356453a45073f87f0954')
        .then(res =>{
          try{
          setTimeout(async() => {
              let arr = res.data.message.body.lyrics.lyrics_body.split("\n");
              let music = {
                orig : arr,
                vet : arr
              }
              this.$setItem('music', music);
              this.$emit('loadMusic')
    
        }, 1000);
          }catch(err){
            console.log(err)
          }
           _self.$q.loading.hide();
        })
        .catch(error => console.log(error))
      }
    }
}
</script>

