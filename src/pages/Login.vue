<template>
  <div class="flex justify-center full-height full-width">
<div class="column">
      <div class="row">
        <q-card
        >
          <q-card-section class="text-center">
            <q-img
              src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg"
              style="height: 100px; max-width: 100px;"
            />
            <h4 class="text-h5 text-center">{{ $t("Welcome To Learning Language") }}</h4>
            <q-form class="q-gutter-md login">
              <q-input
                square
                clearable
                v-model="email"
                type="email"
                :label="$t('Email')"
                outlined
              />
              <q-input
                square
                clearable
                v-model="password"
                type="password"
                :label="$t('Password')"
                outlined
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="light-green-7 q-my-xs"
              size="md"
              class="full-width"
              :label="$t('Login')"
              @click="login"
              outline
            />
            <q-btn
              unelevated
              color="red-7 q-my-xs"
              size="md"
              class="full-width"
              :label="$t('Login with Google')"
              outline
              @click="loginSocial()"
              icon="img:statics/google.png"
            />
          </q-card-actions>
          <q-card-section class="fixed-bottom">
            <div class="row q-mt-sm">
              <div>
                Can We Help?

              </div>
              <div class="fixed-bottom-right q-mr-lg text-teal-4">
                <div
                  class="teal"
                  @click="register()"
                >
                  Register New Account
                </div>
                  <div
                  class="teal"
                  @click="logout()"
                >
                  Logout
                </div>
                <div
                  class="q-mt-sm"
                  @click="$router.push('/register')"
                >
                  Forgot My Password
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
          <q-dialog v-model="alert.visible" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar :icon="alert.icon" color="primary" text-color="white" />
                <span class="q-ml-sm">{{alert.msg}}</span>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      email:'',
      password: '',
      alert: {
        visible:false,
        icon:'',
        msg:''
      }
    }

  },
  methods:{
    login(){
      var _self = this;
      this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function(response){
        _self.$router.push('/');
      }).catch(function(error) {
        // Handle Errors here.
        _self.alert.visible = true;
        _self.alert.icon = 'warning';
        _self.alert.msg = error.message;
        //_self.msg = 'Your password are wrong or user not registred. Try again!';
        //window.alert(error.message);
        // ...
      });
    },
    register() {
      this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function(response){
        _self.$router.push('/');
      }).catch(function(error) {
        _self.alert.visible = true;
        _self.alert.icon = 'error';
        _self.alert.msg = error.message;
        })
    },
    loginSocial() {
      var _self = this;
      const googleAuthProvider = this.$firebase.auth.GoogleAuthProvider;
      this.$firebase.auth().signInWithRedirect(new googleAuthProvider).then(function() {
        return _self.$firebase.auth().getRedirectResult();
      }).then(function({additionalUserInfo,credential}) {
       _self.$store.dispatch('userConfig/saveUser', {
                user: {
                  'name':additionalUserInfo.profile.given_name,
                  'email':additionalUserInfo.profile.email,
                  'picture':additionalUserInfo.profile.picture,
                  'token':credential.access_token,
                  'level':0
                  }
            })
        _self.$router.push('/');
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert('Login error!! error:' + errorMessage );
      });
    },
    logout(){
      var _self = this;
      this.$firebase.auth().signOut().then(() => {
        // Sign-out successful.
          _self.$store.dispatch('userConfig/removeUser')
      }).catch((error) => {
        // An error happened.
        console.log(error)
      });
    }
  }


}
</script>


