<template>
  <div>
     <div v-for="(item,index) in copy" v-bind:key="index">
        <q-input outlined  v-model="copy[index]" @change="updateComplete">
          <template v-slot:prepend>
            <span>{{formatOdd(index+1)}}</span>
          </template>
        </q-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpreadTextarea',
  props: {
    complete: {
      type: String,
      required: false
    },
  },
  data () {
    return {
      copy: []
    }
  },
  mounted: function () {
    this.copy =  this.complete.split('\n');
  },
  methods:{
    updateComplete(){
      let complete = this.copy.join('\n');
      this.$emit('updateComplete',complete)
    },
    formatOdd(num){
      let mod = num % 2
      if (mod){
         return Math.trunc((num+1) / 2)
      }
      return Math.trunc(num / 2)
    }
  }
}
</script>
