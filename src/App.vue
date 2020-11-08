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
      const promises = [storeMusic,bdMusic]
      await Promise.allSettled(promises)
    }
  },
  events: {
    save: 'saveMusic',
  }
}
</script>
