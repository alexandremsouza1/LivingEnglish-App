<template>
  <q-layout view="lHh Lpr lFf">
    <q-pull-to-refresh @refresh="refresh">
    <q-header elevated class="bg-purple-6">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title

        >
          Living English
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
     
      <q-list bordered padding class="rounded-borders text-primary">
      <q-item-label header>Menu</q-item-label>
      <q-item-section>
      <q-item to='/login'> 
        <!-- icon="account_circle" -->
        <!-- src="https://cdn.quasar.dev/img/avatar.png" -->
          <q-avatar class="q-mx-xs" size="50px" >
            <img v-if="true" :src="require('src/assets/account_circle.svg')">
            <!-- <img :src="require( `../assets/${this.user.picture}.svg`)"/> -->
            <!-- <q-badge floating color="teal">new</q-badge> -->
          </q-avatar>
        <q-item-section>
          <q-item-label>{{this.user.name}}</q-item-label>
        </q-item-section>
        <q-item-section side class="absolute-bottom q-mr-xs">
           <q-item-label caption>Seen 3 seconds ago</q-item-label>
          <q-item-label caption class="q-mr-xs">Level : {{this.user.level}}</q-item-label>
        </q-item-section>
      </q-item>
      </q-item-section>
      <q-separator spaced />
      <q-item
        clickable
        v-ripple
        to='/lyrics'
        :active="link === 'inbox'"
        @click="link = 'inbox'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="library_music" class="text-purple"/>
        </q-item-section>

        <q-item-section class="text-purple">Music</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'outbox'"
        @click="link = 'outbox'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="send" class="text-purple"/>
        </q-item-section>

        <q-item-section class="text-purple">Outbox</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'trash'"
        @click="link = 'trash'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="delete" class="text-purple"/>
        </q-item-section>

        <q-item-section class="text-purple">Trash</q-item-section>
      </q-item>
      <q-separator spaced />
      
     
      <q-item
        clickable
        v-ripple
        :active="link === 'settings'"
        @click="link = 'settings'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="settings" class="text-purple"/>
        </q-item-section>

        <q-item-section class="text-purple">Settings</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'help'"
        @click="link = 'help'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="help" class="text-purple"/>
        </q-item-section>

        <q-item-section class="text-purple">Help</q-item-section>
      </q-item>
    </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
      </q-pull-to-refresh>
  </q-layout>
</template>

<script>
import { mapGetters,mapActions} from 'vuex'
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false,
      link: 'inbox'
    }
  },
  computed: {
  ...mapGetters({
      user: 'userConfig/user'
    }),
  },
  created() {
    var _self = this;
    this.$getItem('music').then(function(value) {
      value.forEach(element => {
        _self.loadmusic(element) 
      });
    });
    this.$firebase.auth().onAuthStateChanged(function(user_auth) {;
        console.log(user_auth)
        if (user_auth) {
          _self.$store.dispatch('userConfig/saveUser', {
                    user_auth
          })
        } else {
          // No user is signed in.
        }
    })
  },
  methods:{
    ...mapActions({
      loadmusic: 'lyrics/saveLyric',
    }),
    refresh(done){
      window.location.reload()
      done();
    }
  }
}
</script>
<style lang="sass">
.my-menu-link
  color: white
  background: $red-4
</style>
