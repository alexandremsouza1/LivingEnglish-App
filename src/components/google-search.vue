<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column">
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section>
        <div class="text-h6">Traduza a frase abaixo:</div>
      </q-card-section>

      <q-card-section>
         <q-input v-model="text" :dense="dense" /> 
      </q-card-section>

      <q-card-section>
          <q-input rounded outlined v-model="text">
            <template v-slot:append>
             <q-icon name="event" />
            </template>
          </q-input>
      </q-card-section>

      <q-card-section>
          <q-rating
            v-model="ratingModel"
            size="3.5em"
            color="grey"
            :color-selected="ratingColors"
          />
      </q-card-section>
    </q-card>
    </div>
  </div>
</template>
<script>
export default {
  props: ['text'],
  data () {
    return {
      ratingModel: 4,
      ratingColors: ['green', 'light-green-6', 'green', 'green-9', 'green-10']
    }
  }
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 100%
</style>