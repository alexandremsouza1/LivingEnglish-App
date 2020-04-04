import Vue from 'vue'
var db = class Persistence extends Vue{
    
    modifyItem(idx,name,index,value){
        var _self = this;
        this.$getItem(idx).then(function (item) {
        var keys = Object.keys(item)
            keys.forEach(function(x,y){
                if(x == name){
                    item[keys[y]][index].trad = value;
                    _self.$setItem(idx, item );
                }
            })
        })
    }

}


export default new db;
