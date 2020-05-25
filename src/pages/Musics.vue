<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 100%">
    <q-input
      v-model="busca"
      filled
      label="Search Lyrics"
      v-if="true"
      autofocus
    >
    <template v-slot:append>
      <q-icon name="search" />
    </template>
    </q-input>
     <q-btn
        round
        color="red"
        to='/paste'
        class="fixed"
        icon="add"
        style="right: 18px; bottom: 70px"
      />
      <q-tabs
        v-model="tab"
        inline-label
        :breakpoint="0"
        align="center"
        class="bg-purple text-white shadow-2 fixed-bottom"
      >
        <q-tab name="pending" label="Pending" icon="history" />
        <q-separator vertical inset class="bg-dark-separator"/>
        <q-tab name="complete" label="Completed" icon="check" />
      </q-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "Musics",
  data () {
    return {
      tab: 'pending',
      busca:'',
    }
  }
}
</script>