import VueRouter from 'vue-router'
import Blank from '@/views/Blank'
import Home from '@/views/Home'
import Hardcoded from '@/views/Hardcoded'

const routes =
[
    { path: '/blank', component: Blank, name: 'Blank' },
    { path: '/', component: Home, name: 'Home' },
    { path: '/hardcoded/:collection/:book/:chapter', component: Hardcoded, name: 'Hardcoded' },
    { path: '/hardcoded', component: Hardcoded, name: 'HardcodedIndex' },
]

const router = new VueRouter
({
    routes,
    mode: 'history'
})


const originalPush = router.push
router.push = function push(location, onResolve, onReject)
{
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject)
    }
 
    return originalPush.call(this, location).catch((err) => {
        if (VueRouter.isNavigationFailure(err)) {
            return err
        }
   
        return Promise.reject(err)
    })
}

export default router