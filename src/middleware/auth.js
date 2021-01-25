import Vue from 'vue'

export default function auth({ next, router }) {
    console.log('auth')
    var user = this.$firebase.auth().currentUser;
    if (!user) {
      return router.push({ name: 'login' });
    }
  
    return next();
  }