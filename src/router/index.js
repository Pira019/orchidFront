import FaqVue from "@/views/CustomerViews/Faq.vue";
import HomeVue from "@/views/CustomerViews/Home/Home.vue";
import {createRouter,createWebHistory} from "vue-router" 

//routes list
const routes = [
    {path : '/', name: 'home', component: HomeVue }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router