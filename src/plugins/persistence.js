import Vue from 'vue'
import _ from 'lodash'
var db = class Persistence extends Vue{
    insert( index, item ) {
        this.splice( index, 0, item );
    };
    modifyItem(id,attr,value){
        return new Promise( (resolve, reject) => {
            var _self = this;
            let aux = _.cloneDeep(this.$store.getters['lyrics/lyric'])
            aux = aux.filter(i => i !== null && i.id !== '');
            var indice = aux.findIndex(element => element.id ==  id);
            if(Array.isArray(aux[indice][attr])){
                aux[indice][attr].push(value);
            }else if(Number.isInteger(aux[indice][attr])){
                aux[indice][attr] = value;
            }else{
                aux[indice][attr] = value;
            }    
        this.$setItem('music', aux).then(function () {
            _self.$store.dispatch('lyrics/replaceAll', {
                ...aux
            }).then(() => {
                resolve
            }).catch(function (err) {
                reject(err)
            });
        }).catch(function (err) {
            reject(err)
        });
      })
    }

    setLyric(lyric){
        this.$store.dispatch('lyrics/saveLyric', {
            ...lyric
        })
        let aux = this.$store.getters['lyrics/lyric']
        aux = aux.filter(i => i !== null && i.id !== '');
        this.$setItem('music', aux);
    }

    removeLyric(id){
        return new Promise( (resolve, reject) => {
            var _self = this;
            let aux = _.cloneDeep(this.$store.getters['lyrics/lyric'])
            aux = aux.filter(i => i !== null && i.id !== '');
            var indice = aux.findIndex(element => element.id ==  id);
            aux.splice(indice,1)
            this.$setItem('music', aux).then(function () {
                _self.$store.dispatch('lyrics/replaceAll', {
                    ...aux
                })
                resolve
            }).catch(function (err) {
                reject(err)
            });

        })

    }

}


export default new db;

