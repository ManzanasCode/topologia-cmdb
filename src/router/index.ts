import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import DemoView  from '../views/DemoView.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: "Demo",
        component: DemoView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router