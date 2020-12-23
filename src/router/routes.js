
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name:'login', path: 'login', component: () => import('pages/Login.vue') },
      { name:'settings', path: 'settings', component: () => import('pages/Settings.vue') },
      { name: 'music', path: 'lyrics', component: () => import('pages/Musics.vue') },
      { name: 'lyrics', path: 'paste', component: () => import('pages/lyrics.vue') , props: true },
      { name: 'finish', path: 'finish/:id', component: () => import('pages/FinishScreen.vue') }
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
