import VueRouter from 'vue-router'
import Blank from '@/views/Blank'
import Home from '@/views/Home'

const routes =
[
    { path: '/blank', component: Blank, name: 'Blank' },
    { path: '/', component: Home, name: 'Home' },
]

const router = new VueRouter
({
    routes,
    mode: 'history'
})

export default router