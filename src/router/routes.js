
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'lyrics', component: () => import('pages/lyrics.vue') }
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
