<template>
  <div>
    <q-dialog v-model="activated" @hide="closeDialog">
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

    <!-- <q-dialog v-model="card">
      <q-card class="my-card">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              Cafe Basilico
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <q-icon name="place" />
              250 ft
            </div>
          </div>

          <q-rating v-model="stars" :max="5" size="32px" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            $・Italian, Cafe
          </div>
          <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Reserve" />
          <q-btn v-close-popup flat color="primary" round icon="event" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="sliders">
      <q-card style="width: 300px" class="q-px-sm q-pb-md">
        <q-card-section>
          <div class="text-h6">Volumes</div>
        </q-card-section>

        <q-item-label header>Media volume</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="volume_up" />
          </q-item-section>
          <q-item-section>
            <q-slider color="teal" v-model="slideVol" :step="0" />
          </q-item-section>
        </q-item>

        <q-item-label header>Alarm volume</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="alarm" />
          </q-item-section>
          <q-item-section>
            <q-slider color="teal" v-model="slideAlarm" :step="0" />
          </q-item-section>
        </q-item>

        <q-item-label header>Ring volume</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="vibration" />
          </q-item-section>
          <q-item-section>
            <q-slider color="teal" v-model="slideVibration" :step="0" />
          </q-item-section>
        </q-item>
      </q-card>
    </q-dialog> -->
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
      lorem: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!',
      lastPosBlock:0,
      answerVerify: [],
      stars: 3,
      slideVol: 39,
      slideAlarm: 56,
      slideVibration: 63
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
    closeDialog(){
      
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
      //TODO - CARREGAR O LYRICS CORRETAMENTE DO VUEX
      //this.$db.setLyric(all_frases);
      console.log(o)
      console.log(n)
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
              ? (reject(err), logger.log('error', err))
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
      debugger
      this.somarPontosByIndex(s1Parts.length - score,index);
      this.p = p.join(' ');
    },
    async verify(index,txt){
      console.log('caraloio')
      var traduzida = '';
      var _self = this;  
      traduzida = typeof this.all_frases.traducao[index] !== 'undefined' ? this.all_frases.traducao[index] : '';
      if(traduzida === ""){
        await this.t(txt).then(async function(result){
                traduzida = result;
                _self.$db.modifyItem.apply(_self,[_self.all_frases.id,'traducao',traduzida])
        })
      }
     this.printErros(traduzida,index)
      //this.somarPontosObtidos(s1Parts.length - this.score);
      //this.$db.modifyItem.apply(_self,[_self.all_frases.id,'score_g',this.score])
      //
      this.answerVerify.push(index)
      this.lastPosBlock = index;
    },
    somarPontosByIndex(num,index){
      if(typeof this.all_frases.score_g[index] == 'undefined'){
        this.$db.modifyItem.apply(this,[this.all_frases.id,'score_g',num])
      }
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
   console.log(this.all_frases)
  }
}
</script>