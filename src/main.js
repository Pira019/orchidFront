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
import {faBars, faBullseye, faCircleCheck, faEnvelope, faEye, faEyeSlash, faGlobe, faHandshake, faHeartCircleCheck, faList, faPen, faPersonChalkboard, faPlus, faSpinner, faTrash, faTriangleExclamation,faUsers } from '@fortawesome/free-solid-svg-icons'
import { faInstagramSquare, faMailchimp, faWhatsappSquare} from '@fortawesome/free-brands-svg-icons'
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons'

 
library.add(faSpinner,faList,faGlobe,faWhatsappSquare,faEnvelope,faInstagramSquare,faPlus,faMailchimp,faHandshake,faBullseye,faHeartCircleCheck,faCircleCheck,faEye,faEyeSlash,faTriangleExclamation,faBars,faFolderOpen,faPersonChalkboard,faTrash,faPen,faUsers) 
createApp(App).use(router).use(store).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
