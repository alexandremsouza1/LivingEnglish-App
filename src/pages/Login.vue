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
              @click="loginSocial('google','http://localhost:8080/')"
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
                  @click="$router.push('/register')"
                >
                  Register New Account
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      email:'',
      password: ''
    }

  },
  methods:{
    login() {
      return false
    },
    loginSocial(provider,redirect) {
        var _self = this
        const hello = this.$hello(provider);
        hello.login({
            scope: 'email',
            force: true,
            redirect_uri: redirect
        }).then(() => {
            console.log(hello)
            const authRes = hello.getAuthResponse()
            console.log('authGoogle => authRes', authRes)
            hello.api('me').then(json => {
                  var {given_name,email,thumbnail} = json
                 _self.$store.dispatch('user_config/saveUser', {
                    user: {
                      'name':given_name,
                      'email':email,
                      'picture':thumbnail,
                      'token':authRes.access_token,
                      'level':0
                      }
                })
                _self.$router.push('/')
          })
        })
    }
  }


}
</script>


