<template>
    <div >
    <transition name="slide-fade">
        <q-img
        src="~assets/stars.svg"
        spinner-color="white"
        />
    </transition>


    <q-table class="q-pa-md"
      grid
      title="Pontuação"
      :data="data"
      :columns="columns"
      row-key="name"
      hide-header
      hide-pagination
    >
        <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card>
            <q-card-section class="text-center">
              Calories for
              <br>
              <q-linear-progress size="50px" :value="0.9" color="green" class="q-mt-sm">
                <div class="absolute-full flex flex-center">
                    <q-badge color="white" text-color="accent" label="90%" />
                </div>
                </q-linear-progress>
              <strong>{{ props.row.name }}</strong>
            </q-card-section>

          </q-card>
        </div>
      </template>
    </q-table>

    </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],

      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        }
      ]
    }
  }
}
</script>

<style >
</style>

