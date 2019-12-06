<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column">
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section>
        <div class="text-h6">Traduza a frase abaixo: </div>
        <center> {{word}} : {{traduzido.word}} </center>
      </q-card-section>

      <q-card-section class="row">
         <q-input v-model="text" autogrow>
           <template v-slot:append>
             <q-icon name="volume_up" @click="falar(text)"/>
            </template> 
         </q-input>
      </q-card-section>
      <!-- <q-btn round color="amber" class="float-right" glossy text-color="black" icon="volume_up" /> -->
      <q-card-section class="row">
          <q-input rounded outlined v-model="resposta" autogrow>
            <template v-slot:append>
             <q-icon :name="iconConclusao" @click.stop="show(iconConclusao)"/>
            </template>
          </q-input>
      </q-card-section>
      <!-- <q-btn round color="amber" class="float-right" glossy text-color="black" icon="refresh" /> -->

      <q-card-section>
          <q-rating
            v-model="score"
            size="3.5em"
            color="yellow"
            readonly
            :color-selected="ratingColors"
          />
      </q-card-section>
    </q-card>
    </div>
  </div>
</template>
<script>

var apiKey = 'AIzaSyBgsTE6JQ5wsgERpi6m2xBY-9pCn2I5zcA';
var options = {

};
import googleTranslate from 'google-translate';
export default {
  props: ['text','word'],
  data () {
    return {
      ratingModel: 4,
      ratingColors: ['yellow', 'light-yellow-6', 'yellow', 'yellow-9', 'yellow-10'],
      sourceLanguage :'en',
      targetLanguage : 'pt',
      frase: '',
      resposta: '',
      traduzido: {
        text:'',
        word:''
      },
      score: 0,
      iconConclusao:'done'
    }
  },
  watch: {
    text: {
      handler (val) {
        this.show('done');
      }
    }
  },
  mounted: function () {
  
  },
  methods:{
    async t(txt){
      return new Promise((resolve, reject) => {
       googleTranslate('AIzaSyBHt947aSFRXbo1wgQGxmam9iRB7wHNkco').translate(txt, 'pt', (err, translation) => {
          err 
              ? (reject(err), logger.log('error', err))
              : resolve(translation.translatedText)
          });
      });
    },
    async initTraducoes(){
        var self = this
        await Object.keys(this.$props).forEach(async function(x,y){
            await self.t(self.$props[x]).then(function(result){
            let pos = x; 
            self.traduzido[pos] = ''; 
            self.traduzido[pos] = result;
        })
      })
    },
     async show(iconConclusao){
       debugger;
      await this.initTraducoes();
      if(iconConclusao == 'done'){
          var s1 = this.traduzido['text'];
          var s2 = this.resposta;

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
          this.frase = s1;
          this.score = Math.trunc(5 * (this.score / s1Parts.length));
          if(this.resposta != ''){
              this.iconConclusao = 'refresh';
          }else{
            this.iconConclusao = 'done';
          }
      }else{
          this.iconConclusao = 'done';
          this.$emit('getOther');
          this.frase = '';
          this.resposta = '';
      }
    
    },
    falar(text){
      var setup = new SpeechSynthesisUtterance(text);
      setup.lang = 'en-US';
      setup.rate = 0.5;
      speechSynthesis.speak(setup)
    }
}
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 100%
</style>