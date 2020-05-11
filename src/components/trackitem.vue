<template>
<div class="q-pa-md" style="max-width: 350px">
    <q-list bordered class="rounded-borders" style="max-width: 360px">
      <q-item>
        <q-item-section avatar>
          <q-icon name="account_tree" color="black" size="34px" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">
            <span class="text-weight-medium">{{ track.track.track_name}}</span>
            <span class="text-grey-8"> - {{ track.track.artist_name }}</span>
          </q-item-label>
          <q-item-label caption lines="1">
            {{ track.track.album_name }}
          </q-item-label>
          <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
              <router-link :to="{ name: 'lyrics', params: {id: track.track.track_id } }"> </router-link>
          </q-item-label>
        </q-item-section>

  
      </q-item>
      <q-separator spaced />

    </q-list>
  </div>
</template>

<script>
export default {
    name:'track-item',
    props: {
        track: {
            type: Object,
            required: true,
        }
    }
}
</script>

