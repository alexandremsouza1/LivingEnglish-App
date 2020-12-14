<template>
  <div class="q-gutter-y-md bg-grey-2" style="max-width: 100%" >
    <q-expansion-item
      icon="search"
      label="Custom Search"
    >
     <q-input 
        label="Author"
        v-model="author"
     >
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>

      <q-input 
        label="Song"
        v-model="song"
      >
        <template v-slot:prepend>
          <q-icon name="audiotrack" />
          </template>
      </q-input>
      <div class="text-center q-pa-md">
       <q-btn size="sm" label="Go" stack glossy color="green" @click="busca"/>
     </div>
    </q-expansion-item>
  </div>
</template>
<script>
import { getLyricsByPiece } from "src/plugins/lyrics";
export default {
  name: 'findSong',
  data () {
    return {
      author: '',
      song:''
    }
  },
  methods:{
    async busca(){
        if(this.author.length > 0 && this.song.length > 0){
          const dataRec = await getLyricsByPiece(this.author,this.song);
          if(dataRec.status == "Sucess"){
            this.$router.push({name: 'lyrics', params: {obj:dataRec}});
          }else{
              this.$q.notify({
                  type: 'warning',
                  message: dataRec.message
              })
          }
        }
    }  
  }
}
</script>