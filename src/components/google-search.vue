<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column">
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section>
        <div class="text-h6">Traduza a frase abaixo: </div>
        <center> {{word}}</center>
      </q-card-section>

      <q-card-section>
         <q-input v-model="text" :dense="true" autogrow/> 
      </q-card-section>

      <q-card-section>
          <q-input rounded outlined v-model="traduzido[0]" autogrow>
            <template v-slot:append>
             <q-icon name="done" @click.stop="show(text)"/>
            </template>
          </q-input>
      </q-card-section>

      <q-card-section>
          <q-rating
            v-model="ratingModel"
            size="3.5em"
            color="grey"
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
      ratingColors: ['green', 'light-green-6', 'green', 'green-9', 'green-10'],
      sourceLanguage :'en',
      targetLanguage : 'pt',
      traduzido: []
    }
  },
  computed: {
    // traduzido: function () {
    //   return this.show(this.text)
    // }

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
    show(text){
      var self = this
      this.t(text).then(function(result){
        self.traduzido.push(result)
      })
    }
}
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 100%
</style>