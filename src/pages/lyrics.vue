<template>
  <div>
    <div >
    <q-input
      v-model="text"
      type="textarea"
      :max-height="100" 
      rows="100"
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
  }
}
</script>