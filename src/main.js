import { createApp } from 'vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


//import './style.css'
import App from './App.vue' 
import "bootstrap/dist/css/bootstrap.css"

// Import our custom CSS
import './styles.scss'

/* import specific icons */  
import {faBullseye, faEnvelope, faHandshake, faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faInstagramSquare, faMailchimp, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons'

 
library.add(faWhatsappSquare,faEnvelope,faInstagramSquare,faMailchimp,faHandshake,faBullseye,faHeartCircleCheck) 
createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app');