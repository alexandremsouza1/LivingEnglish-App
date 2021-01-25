<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    async saveMusic (aux) {
      const storeMusic = this.$setItem('music', aux);
      const bdMusic = this.$store.dispatch('lyrics/replaceAll', {
                ...aux
      })
      this.saveFireStore(aux)
      const promises = [storeMusic,bdMusic]
      await Promise.allSettled(promises)
    },
    saveFireStore(aux){
      var _self = this
      this.$getItem('config').then(function(value) {
        if(!value || !value.doc){
          const fire = _self.$firestore.collection("collection").add({...aux})
          .then(function(docRef) {
            _self.$setItem('config',{
              'doc': docRef.id
            });
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });
        }else{
          var obj = _self.$firestore.collection("collection").doc(value.doc)
          obj.update({...aux})
          .then(function() {
              console.log("Document successfully updated!");
          })
          .catch(function(error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
          });
        }
      }).catch(function(err) {
          console.log(err);
      });
    }
  },
  events: {
    save: 'saveMusic',
  }
}
</script>
