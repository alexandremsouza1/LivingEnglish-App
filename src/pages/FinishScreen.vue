<template>
    <div >
    <transition name="slide-fade">
        <img
        :src="'../../img/stars.svg'"
        />
    </transition>
        <q-form
          @submit="onSubmit"
          class="fixed-center"
        >
          <q-input
            filled
            v-model="name"
            label="Name of doc *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

        <p>Pontuação atingida:</p> 
        <p>Pontuação Máxima:</p> 
        <p>Porcentagem:</p> 
          <q-linear-progress size="50px" :value="0.9" color="green" class="q-mt-sm">
            <div class="absolute-full flex flex-center">
                <q-badge color="white" text-color="accent" label="90%" />
            </div>
            </q-linear-progress>
          <div>
            <q-btn label="Ok" type="submit" color="primary"/>
          </div>
        </q-form>

    </div>
</template>

<script>
export default {
  name:'Finish',
  data () {
    return {
      name:''
    }
  },
  methods:{
 
  }
}
</script>

<style >
</style>

