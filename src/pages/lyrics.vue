<template>
  <div>
    <div >
    <q-input
      v-model="text"
      type="textarea"
      :max-height="100" 
      rows="100"
      @paste.native="paste"
    />
    </div>
    <q-btn
      round
      color="primary"
      @click="verify"
      class="fixed"
      icon="add"
      style="right: 18px; bottom: 18px"
    />
  </div>
</template>
<script>
import {t,falar} from 'src/plugins/translate.js'
export default {
  data () {
    return {
      text: ''
    }
  },
  methods:{
    paste(e) {
        let paste = e.clipboardData.getData('text')
        var lyrics = [];
        setTimeout(() => {
            var arr = [];
            arr = paste.split("\n");
            arr.forEach(function(x,y){
                if (y % 2 == 0){
                  lyrics.push(x)
                }else{
                  lyrics.push("\n\n");
                }
            })
            this.text = lyrics.join(" ");
        }, 1000);
    },
    verify(){
       var __self = this;
       var arr = [];
       arr = this.text.split("\n");
        arr.forEach(async function(x,y){
          debugger
          if (!(y % 2 == 0) && ( x.trim() != '')){
            try{
              await t(arr[y-1]).then(function(result){
                arr[y] = result
                __self.text = arr.join("\n");
              })
            falar(arr[y-1])
            }catch(err){
              console.log(err);
            }
          }
        })
        
    }
  }
}
</script>