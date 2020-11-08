<template>
    <div >
    <transition name="slide-fade">
        <img
        :src="'../statics/stars.svg'"
        />
    </transition>
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
        <p>Pontuação Máxima:{{this.found.pontuacao_max}}</p> 
        <p>Porcentagem:</p> 
          <q-linear-progress size="50px" :value="this.porcent()" color="green" class="q-mt-sm">
            <div class="absolute-full flex flex-center">
                <q-badge color="white" text-color="accent" :label="this.porcent()+'%'" />
            </div>
            </q-linear-progress>
          <div class="confirm">
            <q-btn class="q-ma-lg" label="Ok" type="submit" color="primary"/>
          </div>
        </q-form>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name:'Finish',
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

