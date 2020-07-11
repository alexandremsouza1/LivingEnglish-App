import Vue from 'vue'
import _ from 'lodash'
var db = class Persistence extends Vue{
    insert( index, item ) {
        this.splice( index, 0, item );
    };
    modifyItem(id,attr,value){
        let aux = _.cloneDeep(this.$store.getters['lyrics/lyric'])
        aux = aux.filter(i => i !== null && i.id !== '');
        var indice = aux.findIndex(element => element.id ==  id);
        if(Array.isArray(aux[indice][attr])){
            aux[indice][attr].push(value);
        }else if(Number.isInteger(aux[indice][attr])){
            aux[indice][attr]+= value;
        }else{
            aux[indice][attr] = value;
        }
       
        this.$setItem('music', aux).then(function () {
            
        }).catch(function (err) {
            throw err
        });
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

