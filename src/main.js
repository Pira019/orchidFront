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
import {faAnglesLeft, faAnglesRight, faBars, faBriefcase, faBullseye, faCalendar, faCircleCheck, faCircleDollarToSlot, faCircleInfo, faEllipsisVertical, faEnvelope, faEye, faEyeSlash, faFolderPlus, faGear, faGlobe, faHandshake, faHeartCircleCheck, faList, faMagnifyingGlass, faPen, faPenToSquare, faPersonChalkboard, faPlus, faSchool, faSignal, faSignature, faSpinner, faTrash, faTriangleExclamation,faUser,faUsers, faVideo } from '@fortawesome/free-solid-svg-icons'
import { faInstagramSquare, faMailchimp, faWhatsappSquare} from '@fortawesome/free-brands-svg-icons'
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons'

 
library.add(faAnglesRight,faAnglesLeft,faSignal,faPenToSquare,faFolderPlus,faCalendar,faCircleDollarToSlot,faBriefcase,faEllipsisVertical,faVideo,faSignature,faCircleInfo,faGear,faMagnifyingGlass,faSpinner,faSchool,faList,faGlobe,faWhatsappSquare,faEnvelope,faInstagramSquare,faPlus,faMailchimp,faHandshake,faBullseye,faHeartCircleCheck,faCircleCheck,faEye,faEyeSlash,faTriangleExclamation,faBars,faFolderOpen,faPersonChalkboard,faTrash,faPen,faUsers,faUser) 
createApp(App).use(router).use(store).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
