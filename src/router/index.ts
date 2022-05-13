import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import DemoView  from '../views/DemoView.vue'
import Topologia  from '../views/Topologia.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: "Demo",
        component: DemoView
    },
    {
        path: '/topologia/:cmdb',
        name: "Topologia",
        component: Topologia
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router