import Vue from 'vue'
var db = class Persistence extends Vue{
    
    modifyItem(id,attr,value){
        let aux = this.$store.getters['lyrics/lyric']
        aux = aux.filter(i => i !== null && i.id !== '');
        var indice = aux.findIndex(element => element.id ==  id);
        if(Array.isArray(aux[indice][attr])){
            aux[indice][attr].push(value);
        }else{
            aux[indice][attr] = value;
        }
       
        this.$setItem('music', aux );
    }

    setLyric(lyric){
        this.$store.dispatch('lyrics/saveLyric', {
            ...lyric
        })
        let aux = this.$store.getters['lyrics/lyric']
        aux = aux.filter(i => i !== null && i.id !== '');
        this.$setItem('music', aux);
    }

}


export default new db;

