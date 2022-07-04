import VueRouter from 'vue-router'
import Blank from '@/views/Blank'
import Home from '@/views/Home'
import Hardcoded from '@/views/Hardcoded'

const routes =
[
    { path: '/blank', component: Blank, name: 'Blank' },
    { path: '/', component: Home, name: 'Home' },
    { path: '/hardcoded', component: Hardcoded, name: 'Hardcoded' },
]

const router = new VueRouter
({
    routes,
    mode: 'history'
})

export default router