<template>
  <div>
    <div >
    <q-input
      v-model="text"
      type="textarea"
      :max-height="100" 
      rows="31"
      @select.native="logSelectionWithinInput($event)"
      @paste.native="paste"
    />
    <card-letra 
    :all_frases="this.vet"
    :active="this.active"
    ></card-letra>
    </div>
    <!-- <q-btn
      round
      color="black"
      @click="loadmusic"
      class="fixed"
      icon="refresh"
      style="right: 18px; bottom: 72px"
    />
    <q-btn
      round
      color="primary"
      @click="add"
      class="fixed"
      icon="add"
      style="right: 18px; bottom: 18px"
    /> -->
  </div>
</template>
<script>
import cardLetra  from "src/components/card-letra";
import {t,falar} from 'src/plugins/translate.js'
export default {
    components:{
      cardLetra
  },
  data () {
    return {
      text: '',
      score:0,
      vet: [],
      active: false
    }
  },
  mounted(){
   this.loadmusic()
  },
  methods:{
    paste(e) {
        let paste = e.clipboardData.getData('text')
        var lyrics = [];
        var arr = [];
        setTimeout(() => {
            arr = paste.split("\n");
            this.vet = arr;
            if(this.vet.length !== 0){
              this.active =  true;
              this.$setItem('music', this.vet);
            }
        }, 1000);
        
    },
    add(){
      //  var __self = this;
       var arr = [];
       arr = this.text.split("\n");
        // arr.forEach(async function(x,y){
        //   if (!(y % 2 == 0) && ( x.trim() != '')){
        //     try{
        //       await t(arr[y-1]).then(function(result){
        //         __self.pontuacao(arr[y],result)
        //         console.log(__self.score);
        //         arr[y] = result
        //         __self.text = arr.join("\n");
        //       })
        //     //falar(arr[y-1])
        //     }catch(err){
        //       console.log(err);
        //     }
        //   }
        // })
        this.$setItem('music', arr)
    },
    loadmusic(){
      var _self = this;
      this.$getItem('music').then(function(value) {
        _self.vet = value;
        if(_self.vet.length == 0){
            _self.text = "Cole sua música aqui!"
        }else{
            _self.active =  true;
        }
      }).catch(function(err) {
          console.log(err);
      });
    },
    async logSelectionWithinInput(e) {
      var selection = await e.target.value.substring(
        e.target.selectionStart,
        e.target.selectionEnd
      );
      falar(selection);
    },
    pontuacao(s1,s2){
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
        this.score = Math.trunc(5 * (this.score / s1Parts.length));
    }
}
}
</script>