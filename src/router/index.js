  
import {createRouter,createWebHistory} from "vue-router" 

//routes list
const routes = [
    {path : '/', name: 'home', component:() => import('@/views/CustomerViews/Home/Home.vue'),},

    {path : '/faq', name: 'faq', component:() => import('@/views/CustomerViews/Faq.vue'),
        meta:{
            title: 'Faq',
            metaTags: [
                {
                    name:'description faq',
                    content : 'test'
                }
            ]
        }
     },
    {path : '/contact', name: 'contact', component:() => import('@/views/CustomerViews/Contact.vue'),
     meta : {
        title : 'Contact'
     },
    },     
    {
      path : '/login', name: 'login', component:() => import('@/views/CustomerViews/Login/Login.vue'),
      meta:
      {
        title: 'Login',
        metaTags: [
            {
                name:'Login',
                content : 'Login'
            }
        ]
    }
    },
    {
      path:'/register', name:'register', component:()=> import('@/views/CustomerViews/register/Register.vue'),
      meta:{
        title:'Créez votre compte',
        metaTags:[{
          name:'Description inscription',
          content:'Content'
        }]
      }
    },

    {
      path:'/mot-de-passe-oublie', name:'forgot-password', component:()=> import('@/views/ForgorPassword/ForgetPassword.vue'),
      meta:{
        title:'Récupération de mot de passe oublié',
        metaTags:[{
          name:'description',
          content:'Besoin d\'aide pour récupérer votre mot de passe oublié sur Orchid Campus ? Suivez nos étapes simples pour réinitialiser votre mot de passe et accéder à votre compte'
        }]
      }
    },

    {
      path:'/modifier-mot-de-passe/', name:'update-password', component:()=> import('@/views/CustomerViews/UpdatePassword/UpdatePassword.vue'),
      meta:{
        title:'Modifier le mot de passe',
        metaTags:[{
          name:'description',
          content:'Modifier facilement votre mot de passe sur notre site. Suivez nos instructions pour protéger votre compte en toute sécurité.'
        }]
      }
    },


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


// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
    // `/nested`'s will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  
    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags); 
  
    // If a route with a title was found, set the document (page) title to that value.
    if(nearestWithTitle) {
      document.title = nearestWithTitle.meta.title+ " - "+import.meta.env.VITE_APP_NAME;
    }else{
        document.title =import.meta.env.VITE_APP_NAME 
    }   
    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
  
    // Skip rendering meta tags if there are none.
    if(!nearestWithMeta) return next();
  
    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
      const tag = document.createElement('meta');
  
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
  
      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '');
  
      return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));
  
    next();
  }); 

export default router