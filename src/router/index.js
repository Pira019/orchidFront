  
import {createRouter,createWebHistory} from "vue-router" 

//routes list
const routes = [
    {path : '/', name: 'home', component:() => import('@/views/CustomerViews/Home/Home.vue') },
    {path : '/faq', name: 'faq', component:() => import('@/views/CustomerViews/Faq.vue') },
    {path : '/contact', name: 'contact', component:() => import('@/views/CustomerViews/Contact.vue')},

{
    path:'/:pathMatch(.*)*',
    component :() => import("@/views/NotFound.vue")
}

]


const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass:'active-link',
})

export default router