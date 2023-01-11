import { createApp } from 'vue'

//router file 
import router from "@/router"
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' 

//import './style.css'
import App from './App.vue'  
// Import our custom CSS
import './styles.scss'

/* import specific icons */  
import {faBullseye, faEnvelope, faHandshake, faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faInstagramSquare, faMailchimp, faWhatsappSquare} from '@fortawesome/free-brands-svg-icons'

 
library.add(faWhatsappSquare,faEnvelope,faInstagramSquare,faMailchimp,faHandshake,faBullseye,faHeartCircleCheck) 
createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app');