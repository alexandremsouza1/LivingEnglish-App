<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 100%">
    <find-song> </find-song>
  <track-item v-for="track in validTracks" :key="track.id" :track="track">
  </track-item>
     <q-btn
        round
        color="red"
        to='/paste'
        class="fixed"
        icon="add"
        style="right: 18px; bottom: 70px"
      />
      <q-tabs
        v-model="tab"
        inline-label
        :breakpoint="0"
        align="center"
        class="bg-purple text-white shadow-2 fixed-bottom"
      >
        <q-tab name="pendente" label="Pending" icon="history" />
        <q-separator vertical inset class="bg-dark-separator"/>
        <q-tab name="completo" label="Completed" icon="check" />
      </q-tabs>
    </div>
  </div>
</template>
<script>
import TrackItem from 'src/components/trackitem'
import findSong from 'src/components/findSong'
import { mapGetters } from 'vuex'
import FindSong from '../components/findSong.vue';
export default {
  name: "Musics",
  components:{
    TrackItem,
    findSong
  },
  data () {
    return {
      tab: 'pendente',
      busca:'',
    }
  },
  computed: {
  ...mapGetters({
      tracks: 'lyrics/lyric'
    }),
    validTracks: function () {
      return Object.values(this.tracks).filter(i => i !== null && i.id !== '' && i.status == this.tab);
    }
  }
}
</script>