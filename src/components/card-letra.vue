<template>
  <div>
    <q-dialog v-model="activated" @hide="closeDialog" @show="openDialog">
      <q-carousel
        animated
        v-model="slide"
        @transition="finishLetra"
        control-color="primary"
        arrows
        padding
        ref="carousel"
        height="auto"
        class="bg-white shadow-1 rounded-borders"
      >
        <q-carousel-slide v-for="(item,index) in all_frases.original" v-bind:key="index-1" :name="index" class="column no-wrap flex-center">
            <q-card-section>
                <div class="q-mt-md text-center">
                    <q-icon name="g_translate" color="primary" size="56px"/>
                </div>
                <div class="q-mt-md text-center">
                <div class="text-h6">Traduza a frase abaixo: </div>
                <q-card-section>
                      <q-input :value="item" autogrow>
                          <template v-slot:append>
                              <q-icon name="volume_up" @click="listen(item)"/>
                          </template> 
                      </q-input>
                </q-card-section>    
                      <q-input v-model="answer" rounded outlined autogrow> 
                          <template v-slot:append>
                              <q-icon name="check_circle" @click="verify(index,item)"/>
                          </template>
                      </q-input>
                      <q-card-section>
                        <div v-html="p"></div>.
                        <div class="q-mt-md text-center">
                          <p><i>Página {{index + 1}} de {{all_frases.original.length}}</i></p>
                        </div>
                      </q-card-section>
                 </div>
          </q-card-section>
        </q-carousel-slide>
  
        <!-- <q-carousel-slide :name="2" class="column no-wrap flex-center">
          <q-icon name="live_tv" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="column no-wrap flex-center">
          <q-icon name="layers" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="4" class="column no-wrap flex-center">
          <q-icon name="terrain" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide> -->
      </q-carousel>
    </q-dialog>
  </div>
</template>
<script>
import googleTranslate from 'google-translate';

export default {
  name:'card',
  props: ['all_frases','active'],
  data () {
    return {
      answer: '',
      p: '',
      card: false,
      sliders: false,
      slide: 0,
      score: 0,
      finish:false,
      lorem: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!',
      lastPosBlock:0,
      answerVerify: [],
      stars: 3,
      slideVol: 39,
      slideAlarm: 56,
      slideVibration: 63,
      controlTimer:0
    }
  },
  computed:{
    activated: {
           get(){
             return this.active
           },
           set(active){
             this.$emit("update-active", false);
           } 
        }
  },
  watch:{
    'slide': function (val) {
       this.clearValues()
    }
  }, 
  methods:{
    loadSlideValue(){
      if(this.all_frases.savePage){
        this.slide = this.all_frases.savePage;
      }
    },
    closeDialog(){
     this.addDiffTime()
    },
    addDiffTime(){
      this.controlTimer = this.diff_minutes(this.controlTimer,new Date())
      if(this.all_frases.time_spent){
        this.all_frases.time_spent+=this.controlTimer
      }else{
        this.all_frases.time_spent = this.controlTimer
      }
    },
    openDialog(){
      this.controlTimer = new Date()
    },
    diff_minutes(dt1,dt2){
      var diff =(dt2.getTime() - dt1.getTime()) / 1000;
      diff /= 60;
      return Math.abs(diff.toFixed(2));
    },
    finishLetra(n,o){
      const found = this.answerVerify.some(element => element == o);
      if(o < n){
        if(this.lastPosBlock == o){
          if(!found){
            this.slide = o
            this.triggerNegative('Clique no icone de verificação')
          }
        }
      }
      this.lastPosBlock = n
      this.$db.modifyItem.apply(this,[this.all_frases.id,'savePage',o])
      //TODO - CARREGAR O LYRICS CORRETAMENTE DO VUEX
      //this.$db.setLyric(all_frases);
      console.log(o)
      console.log(n)
      if((this.all_frases.original.length - 1)  == this.slide){
        this.finish = true;
      }
    },
    clearValues(){
      this.p = '';
      this.answer = '';
    },
    listen(text){
      TTS.speak({
            text: text,
            locale: 'en-US',
            rate: 0.5
        }, function () {
        console.log('success');
      }, function (reason) {
        console.log('error', reason);
      });
    },
    t(txt){
      return new Promise((resolve, reject) => {
       googleTranslate('AIzaSyBHt947aSFRXbo1wgQGxmam9iRB7wHNkco').translate(txt, 'pt', (err, translation) => {
          err 
              ? (reject(err), console.log(err))
              : resolve(translation.translatedText)
          });
      });
    },
    printErros(traduzida,index){
      let score = 0;
      var s1 = traduzida;
      var s2 = this.answer;
      var p = [];
      var s1Parts= s1.split(' ');
      var s2Parts= s2.split(' ');

      for(var i = 0; i<s1Parts.length; i++){
          try{
            debugger
            if(/[,|.|;|:|?|!|-]/.test(s1Parts[i])){
              p.push(s1Parts[i]);
              score = 0;
              continue;
            }
            if(s1Parts[i].toLowerCase() === s2Parts[i].toLowerCase()){
              p.push(s1Parts[i]);
              score = 0;
            }else{
              score++;
              p.push('<mark>'+s1Parts[i]+'</mark>');
            }
          }catch(err){
                score++;
                p.push('<mark>'+s1Parts[i]+'</mark>');
                console.log(err);
          }
      }
      this.somarPontosByIndex(s1Parts.length - score,index);
      this.p = p.join(' ');
    },
    async verify(index,txt){    
      var traduzida = '';
      var _self = this;  
      traduzida = typeof this.all_frases.traducao[index] !== 'undefined' ? this.all_frases.traducao[index] : '';
      if(traduzida === ""){
        await this.t(txt).then(async function(result){
                traduzida = result;
                
        })
      this.$db.modifyItem.apply(this,[this.all_frases.id,'traducao',traduzida])
      }
      this.printErros(traduzida,index)
      //this.somarPontosObtidos(s1Parts.length - this.score);
      this.$db.modifyItem.apply(this,[this.all_frases.id,'score_g',this.all_frases.score_g])
      //
      this.answerVerify.push(index)
      this.lastPosBlock = index;
      if(this.finish){
        this.addDiffTime()
        this.$db.modifyItem.apply(this,[this.all_frases.id,'time_spent',this.all_frases.time_spent])
        setTimeout(() => {
          const id = this.all_frases.id
         this.$router.push({ name: 'finish', params: { id } }) 
        }, 1000);
        this.finish = false;
      }
    },
    somarPontosByIndex(num,index){
      try{
        this.all_frases.score_g[index] = num
      }catch(e){
        console.log(e)
      }
      let atingida = this.all_frases.score_g.reduce((a, b) => a + b, 0)
      let max = this.all_frases.pontuacao_max

      let total = Math.trunc((atingida/max) * 5)
      this.all_frases.pontuacao_atingida = total;
    },
    triggerNegative (m) {
      this.$q.notify({
        type: 'negative',
        message: m
      })
    },
  },
  mounted: function () {
    this.activated =  this.active;
    this.loadSlideValue();
   console.log(this.all_frases)
  }
}
</script>