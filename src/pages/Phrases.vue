<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column">
      <q-rating
        v-model="ratingModel"
        size="3.5em"
        color="grey"
        :color-selected="ratingColors"
      />
    </div>
  </div>
</template>