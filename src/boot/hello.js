import hello from 'hellojs'

export default ({ Vue }) => {
  hello.init({
    google: '756092625219-7tdmelf5olujuuuahr8tvhmsrbsjheqd.apps.googleusercontent.com'
  })
  Vue.prototype.$hello = hello
}