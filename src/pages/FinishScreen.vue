<template>
    <div >
    <f2-apple-watch :percent="this.porcent()" />
        <q-form
          @submit="onSubmit"
          class="relative-position q-px-xl"
        >
          
          <q-input
            filled
            v-model="name"
            label="Name of doc *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

        <p>Pontuação atingida: {{this.hit()}}</p> 
        <p>Pontuação Máxima: {{this.found.pontuacao_max}}</p> 
        <p>Tempo Despendido: {{this.found.time_spent}}  minutos</p> 
          <div class="confirm">
            <q-btn class="q-ma-lg" label="Ok" type="submit" color="primary"/>
          </div>
        </q-form>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import F2AppleWatch from '../components/dashboards/SpeedDash'
export default {
  name:'Finish',
  components: {
    F2AppleWatch
  },
  data () {
    return {
      name:''
    }
  },
  computed: {
  ...mapGetters({
      tracks: 'lyrics/lyric'
    }),
    found: function(){
      return Object.values(this.tracks).find(el => el.id == this.$route.params.id)
    }
  },
  methods:{
    onSubmit(){
      let id = this.found.id
      this.$db.modifyItem.apply(this,[id,'nome',this.name])
      this.$db.modifyItem.apply(this,[id,'status','completo'])
      this.$router.push('/lyrics')
    },
    hit(){
      return this.found.score_g.reduce((a, b) => a + b, 0)
    },
    porcent(){
      let atingida = this.found.score_g.reduce((a, b) => a + b, 0)
      let max = this.found.pontuacao_max

      let total = Math.trunc(((atingida/max)*100))
      return total
    }
  }
}
</script>

<style >
.confirm {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

