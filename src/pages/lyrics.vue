<template>
   <div>
    <textarea 
      v-if="compare_state" 
      rows="30"
      class="lined"
      v-model="complete_compare"
    >
    </textarea>
    <div v-else>
      <q-input
        label="Origin"
        color="pink-2"
        class="q-pa-sm"
        outlined
        v-model="text"
        type="textarea"
        rows="12"
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
        rows="12"
        :readonly="control"
      />
    </div>
    <div class="q-pb-md q-mr-xs q-gutter-sm text-center fixed-bottom">
      <q-btn round color="red" @click="close" icon="clear" size="sm"/>
      <q-btn round color="blue" @click="enable" :icon="iconEnable" size="sm"/>
      <q-btn round color="green" @click="confirm" icon="done" size="sm"/>
      <q-btn round color="orange" @click="compare" icon="compare_arrows" size="sm"/>
    </div>
  </div>
</template>
<script>
export default {
    name:'lyrics',
    props: {
      obj: {
        type: Object,
        required: false
      },
    },
  data () {
    return {
      id: '',
      tracks:[],
      text: '',
      translated: '',
      control:false,
      score:0,
      iconEnable: 'edit',
      compare_state: false,
      complete_compare:'',
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
    if(this.$route.params.hasOwnProperty('obj')){
      const objeto = this.$route.params.obj
      this.text = objeto.orig
      this.translated = objeto.tran
      this.control = true
    }
   await this.loadmusic()
  },
  methods:{
    close(){
      this.$router.push('/lyrics');
    },
    enable() {
      !this.control ? this.iconEnable = 'edit' : this.iconEnable = 'block'
      this.control = !this.control 
    },
    focoBusca(){
    //this.ListarTodos();  
    //this.search = false;
    },
    confirm() {
      var lyrics = [];
      var arr_t = [];
      var arr_o = [];
      var _self = this;
      var conunter = 0
      if(this.compare_state || (this.this.text != '' && this.translated != '')){
        let paste_o = this.text
        let paste_t = this.translated
          setTimeout(async() => {
            _self.music.score_g = [];
            if(this.compare_state){
                let all = this.complete_compare.split("\n");
                for (var i=0;i<all.length;i++){
                    if ((i+2)%2==0) {
                        arr_o.push(all[i]);
                    }
                    else {
                        arr_t.push(all[i]);
                    }
                }
            }else{
              arr_o = paste_o.split("\n");
              arr_t = paste_t.split("\n");
            }
              arr_o.forEach(element => {
                conunter+=this.wordCount(element)
              });
              if(arr_o.length != arr_t.length){
                 this.$q.notify({
                  type: 'warning',
                  message: 'A quantidade de linhas não conferem'
                })
                return false
              } 
              _self.id = this.$uuid.v1()
              _self.prepareMusic(
                {
                  'id': this.id,
                  'pontuacao_max' : conunter,
                  'original': arr_o,
                  'traducao': arr_t
                },true
              );
              _self.control = true;
              //_self.$refs.translated.$el.focus();
              if(this.compare_state || _self.translated !== ''){
                _self.$router.push('/lyrics');
              }
          }, 1000);
      } 
    },
    getArrays(){
      return {}
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
    compare(){
      var all = []
      this.compare_state = !this.compare_state
      let paste_o = this.text
      let paste_t = this.translated
      let arr_o = paste_o.split("\n");
      let arr_t = paste_t.split("\n");
      for (let index = 0; index < arr_o.length; index++) {
        all.push(arr_o[index]+"\n");
        if(typeof arr_t[index] == "undefined"){
          all.push(" "+"\n")
        }else{
          all.push(arr_t[index]+"\n");
        }
      };
      this.complete_compare = all.join("")
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
<style>
.lined {
  width: 100%;
  max-width: 100%;
  background: url(http://i.imgur.com/2cOaJ.png);
  background-attachment: local;
  background-repeat: no-repeat;
  padding-left: 35px;
  padding-top: 10px;
      border-color:#ccc;
}
</style>