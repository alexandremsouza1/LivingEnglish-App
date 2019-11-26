<template>
  <div class="google-search">
    <button @click="search(text)">
      <i class="fa fa-search"></i>
    </button>
    <input ref="input"
           title="Site Search"
           v-on:keyup.13="search(text)"
           v-model="text" />
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    name: 'googleSearch',
    props: [
      'site'
    ],
    data() {
      return {
        text: ''
      }
    },
    methods: {
      search(str) {
        if (str) {
      
        } else {
          this.$refs.input.focus();
        }
      }
    }
  }
</script>