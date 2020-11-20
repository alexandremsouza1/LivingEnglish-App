<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 100%">
    <q-input
      v-model="busca"
      debounce="1000"
      filled
      label="Search Lyrics"
      v-if="true"
      autofocus
    >
    <template v-slot:append>
      <q-icon name="search" />
    </template>
    </q-input>
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
import { getLyricsByPiece } from "src/plugins/lyrics";
import { mapGetters } from 'vuex'
export default {
  name: "Musics",
  components:{
    TrackItem
  },
  data () {
    return {
      tab: 'pendente',
      busca:'',
    }
  },
  watch:{
    'busca': {
      handler: async function(val) {
        debugger
        let todo = this.busca.split(';')
        if(todo.length > 1){
          const dataRec = await getLyricsByPiece(todo[0],todo[1]);
          console.log(dataRec)
          this.$router.push({name: 'lyrics', params: {obj:dataRec}});
        }
      }
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