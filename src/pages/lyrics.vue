<template>
   <div class="q-gutter-md" style="max-width: 100%">
    <q-input
      label="Origin"
      color="pink-2"
      class="q-pa-sm"
      outlined
      v-model="text"
      type="textarea"
      rows="13"
      @paste.native="paste"
      :readonly="control"
    />
    <q-input
      ref="translated"
      label="Translated"
      color="pink-2"
      class="q-pa-sm"
      outlined
      v-model="translated"
      type="textarea"
      rows="13"
      @paste.native="paste"
      :readonly="!control"
    />
  </div>
</template>
<script>
export default {
    name:'lyrics',
  data () {
    return {
      id: '',
      tracks:[],
      text: '',
      translated: '',
      control:false,
      score:0,
      music: {
          id: '',
          nome:'',
          idUser:'',
          original:[],
          traducao: [],
          pontuacao_max: 0,
          pontuacao_atingida:0,
          status:'pendente',
          idioma: [],
          ciclo:0     
      }
    }
  },
  async mounted(){
   await this.loadmusic()
  },
  methods:{
    focoBusca(){
    //this.ListarTodos();  
    //this.search = false;
    },
    paste(e) {
      var lyrics = [];
      var arr = [];
      var _self = this;
      var conunter = 0
      if(this.text == ''){
        let paste = e.clipboardData.getData('text')
          setTimeout(async() => {
            _self.music.score_g = [];
              arr = paste.split("\n");
              arr.forEach(element => {
                conunter+=this.wordCount(element)
              });
              _self.id = this.$uuid.v1()
              _self.prepareMusic(
                {
                  'id': this.id,
                  'pontuacao_max' : conunter,
                  'original': arr
                },false
              );
              _self.control = true;
              _self.$refs.translated.$el.focus();
              if(_self.translated !== ''){
                _self.$router.push('/lyrics');
              }
          }, 1000);
      }else{
        let paste = e.clipboardData.getData('text')
        arr = [];
                  setTimeout(async() => {
              arr = paste.split("\n");
              _self.prepareMusic(
                {
                  'id': this.id,
                  'traducao': arr
                },true
              );
              if(this.translated !== ''){
                this.$router.push('/lyrics');
              }
          }, 1000);

      }
        
    },
    wordCount(str) { 
      return str.split(" ").length;
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
        if(value.oring.length == 0){
          _self.text = "Cole sua música aqui!"
        }else{
            _self.music.oring = value.oring;
            _self.active = true;
        }
      }).catch(function(err) {
          console.log(err);
      });
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
    },
    prepareMusic(array,save){
      var _self = this;
      Object.keys(array).forEach(function(x,y){
        _self.music[x] = Object.values(array)[y];
      })
      if(save){
        this.$db.setLyric.apply(this,[this.music]);
      }
    }
}
}
</script>