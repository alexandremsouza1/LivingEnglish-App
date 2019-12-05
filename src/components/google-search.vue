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
             <q-icon name="volume_up"/>
            </template> 
         </q-input>
      </q-card-section>
      <!-- <q-btn round color="amber" class="float-right" glossy text-color="black" icon="volume_up" /> -->
      <q-card-section class="row">
          <q-input rounded outlined v-model="frase" :value="frase" autogrow>
            <template v-slot:append>
             <q-icon :name="iconConclusao" @click.stop="show(text)"/>
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
      traduzido: {
        text:'',
        word:''
      },
      score: 0,
      iconConclusao:'done'
    }
  },
  mounted: function () {
  
  },
  methods:{
    t(txt){
      return new Promise((resolve, reject) => {
       googleTranslate('AIzaSyBHt947aSFRXbo1wgQGxmam9iRB7wHNkco').translate(txt, 'pt', (err, translation) => {
          err 
              ? (reject(err), logger.log('error', err))
              : resolve(translation.translatedText)
          });
      });
    },
    async show(){
      var self = this
          Object.keys(this.$props).forEach(function(x,y){
              self.t(self.$props[x]).then(function(result){
              let pos = x;  
              self.traduzido[pos] = result;
          })
        })
        var s1 = this.traduzido['text'];
        var s2 = this.frase;

        var s1Parts= s1.split(' ');
        var s2Parts= s2.split(' ');

        this.score = 0;

        for(var i = 0; i<s1Parts.length; i++)
        {
            if(s1Parts[i] === s2Parts[i])
                 this.score++;   
        }
        this.frase = s1;
        this.score = Math.trunc(5 * (this.score / s1Parts.length));
        this.iconConclusao = 'refresh';
        //aqui deve ter um emit para o pai para chamar outra frase
    
    }
}
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 100%
</style>