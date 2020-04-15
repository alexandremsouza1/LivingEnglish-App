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
              icon="img:statics/google.png"
            />
          </q-card-actions>
          <q-card-section class="fixed-bottom">
            <div class="row q-mt-sm">
              <div>
                Can We Help?

              </div>
              <div class="col-md-6 col-sm-6 col-6 text-left text-teal-4">
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
    }
  }


}
</script>


