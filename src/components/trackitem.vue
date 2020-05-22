<template>
<div class="q-pa-md" @click="choiseSong(track)">
    <q-list bordered class="rounded-borders" style="max-width: 100%">
      <q-item>
        <q-item-section avatar>
          <q-icon name="queue_music" color="black" size="34px" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">
            <span class="text-weight-medium">{{ track.track.track_name}}</span>
            <span class="text-grey-8"> - {{ track.track.artist_name }}</span>
          </q-item-label>
          <q-item-label caption lines="1">
            {{ track.track.album_name }}
          </q-item-label>
          <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
              <router-link :to="{ name: 'lyrics', params: {id: track.track.track_id } }"> </router-link>
          </q-item-label>
        </q-item-section>

  
      </q-item>
      <q-separator spaced />

    </q-list>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'track-item',
    props: {
        track: {
            type: Object,
            required: true,
        }
    },
    methods:{
      choiseSong(track){
        this.getSong(track.track.track_id);
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

