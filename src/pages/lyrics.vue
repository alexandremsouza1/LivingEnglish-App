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
  </div>
</template>
<script>
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
      }
    }
}
</script>