<template>
  <q-page class="flex flex-center">
    <!-- <phrase>
    </phrase> -->
    <googleSearch :text="this.translation" :word="this.word">
    </googleSearch>
      <!-- <button @click="translate(getRandonKey())">
        {{ translation }} 
      </button> -->
      <!-- {{ translate(getRandonKey())}} -->
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import json from 'assets/words_dictionary.json';
import axios from 'axios';
import phrase  from "src/components/item-phrase";
import googleSearch  from "src/components/google-search";
export default {
  name: 'PageIndex',
  components:{
      phrase,googleSearch
  },
  data () {
    return {
      translation : '',
      word:''
    }
  },
  computed: {
  ...mapGetters({
      jsonContent: 'dictionary/json'
    }),
  },
  mounted: function () {
  this.$store.dispatch('dictionary/saveJson', {
    json: json
  })
    this.translate(this.getRandonKey())
  },
 methods: {
   getRandonKey(){
     const key = Object.keys(this.jsonContent)[Math.floor(Math.random() * Object.keys(this.jsonContent).length)];
     if(typeof key  != 'undefined'){
       return key;
     }
   },
   longest(arr){
     return arr.reduce(function (a, b) { return a.length > b.length ? a : b; });
   },
   translate(txt){
     console.log(txt);
     this.word = txt;
     if (txt == '' || typeof txt == 'undefined'){
       return false;
     }
      let url =  `https://wordsapiv1.p.mashape.com/words/${txt}/examples`;
            axios.get(url,{
                headers: {
                  'X-Mashape-Key': 'XbG1PmNfMLmsh36XgJ4N0c2pVYmop1dLc41jsnEZChwK4idHQG',
                  'Accept': 'application/json'
                }
              })
              .then(response => {
                try{
                  if(response.data.examples){
                    this.translation = this.longest(response.data.examples);
                  }else{
                    this.translation = '';
                  }
                } catch (err) {
                  this.translate(this.getRandonKey())
                }
              })
              .catch(e => {
                // this.errors.push(e)
                 console.log(e)
                 this.translate(this.getRandonKey())
              })
    }
 }
}
</script>
