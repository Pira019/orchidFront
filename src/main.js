import { createApp } from 'vue'

//create store for vuejs
import store from '@/store/index'

//router file 
import router from "@/router"
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core' 
library.autoAddCss = false

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' 

//import './style.css'
import App from './App.vue'  
// Import our custom CSS
import './styles.scss'

/* import specific icons */  
import {faBullseye, faCircleCheck, faEnvelope, faEye, faEyeSlash, faHandshake, faHeartCircleCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faInstagramSquare, faMailchimp, faWhatsappSquare} from '@fortawesome/free-brands-svg-icons'

 
library.add(faWhatsappSquare,faEnvelope,faInstagramSquare,faMailchimp,faHandshake,faBullseye,faHeartCircleCheck,faCircleCheck,faEye,faEyeSlash,faTriangleExclamation) 
createApp(App).use(router).use(store).component('font-awesome-icon', FontAwesomeIcon).mount('#app');