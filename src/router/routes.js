
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name:'login', path: 'login', component: () => import('pages/Login.vue') },
      { name: 'lyrics', path: 'lyrics', component: () => import('pages/lyrics.vue') }
      //{ path: 'lyrics', component: () => import('pages/lyrics.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
