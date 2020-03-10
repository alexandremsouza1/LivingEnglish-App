<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Carousel" color="primary" @click="carousel = true" />
    <q-btn label="Card" color="primary" @click="card = true" />
    <q-btn label="Sliders" color="primary" @click="sliders = true" />

    <q-dialog v-model="carousel">
      <q-card
        color="primary"
      >
        <q-card-section>
          <div class="q-mt-md text-center">
            <q-icon name="g_translate" color="primary" size="56px"/>
          </div>
          <div class="q-mt-md text-center">
            <div class="text-h6">Traduza a frase abaixo: </div>
            <q-card-section>
                <q-input  autogrow>
                    <template v-slot:append>
                        <q-icon name="volume_up" />
                    </template> 
                </q-input>
            </q-card-section>    
                <q-input rounded outlined autogrow>
                    <template v-slot:append>
                        <q-icon name="check_circle" />
                    </template>
                </q-input>
            </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="card">
      <q-card class="my-card">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              Cafe Basilico
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <q-icon name="place" />
              250 ft
            </div>
          </div>

          <q-rating v-model="stars" :max="5" size="32px" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            $・Italian, Cafe
          </div>
          <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Reserve" />
          <q-btn v-close-popup flat color="primary" round icon="event" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="sliders">
      <q-card style="width: 300px" class="q-px-sm q-pb-md">
        <q-card-section>
          <div class="text-h6">Volumes</div>
        </q-card-section>

        <q-item-label header>Media volume</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="volume_up" />
          </q-item-section>
          <q-item-section>
            <q-slider color="teal" v-model="slideVol" :step="0" />
          </q-item-section>
        </q-item>

        <q-item-label header>Alarm volume</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="alarm" />
          </q-item-section>
          <q-item-section>
            <q-slider color="teal" v-model="slideAlarm" :step="0" />
          </q-item-section>
        </q-item>

        <q-item-label header>Ring volume</q-item-label>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="vibration" />
          </q-item-section>
          <q-item-section>
            <q-slider color="teal" v-model="slideVibration" :step="0" />
          </q-item-section>
        </q-item>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      carousel: false,
      card: false,
      sliders: false,

      slide: 1,
      lorem: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!',

      stars: 3,

      slideVol: 39,
      slideAlarm: 56,
      slideVibration: 63
    }
  }
}
</script>