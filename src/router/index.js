  
import {createRouter,createWebHistory} from "vue-router" 
import managerRoutes from '@/router/ManagerRoutes'
//routes list
const routes_ = [
    {path : '/', name: 'home', component:() => import('@/views/CustomerViews/Home/Home.vue'),},

    {path : '/faq', name: 'faq', component:() => import('@/views/CustomerViews/Faq.vue'),
        meta:{
            title: 'Foire aux questions (FAQ)',
            metaTags: [
                {
                    name:'description',
                    content : 'Bienvenue sur la page FAQ de Orchid Campus ! Nous avons rassemblé ici quelques questions fréquemment posées par nos utilisateurs pour vous aider à mieux comprendre notre site de tutoriels payants pour étudier à l\'étranger.'
                }
            ]
        }
     },
    {path : '/contact', name: 'contact', component:() => import('@/views/CustomerViews/Contact.vue'),
     meta : {
        title : 'Contactez-nous',
        metaTags: [
          {
              name:'description',
              content : 'Contactez-nous pour toute question, commentaire ou demande de renseignements. Remplissez notre formulaire de contact et nous vous répondrons dans les plus brefs délais.'
          }
      ]
     },
    },     
    {
      path : '/login', name: 'login', component:() => import('@/views/CustomerViews/Login/Login.vue'),
      meta:
      {
        title: 'Connexion',
        metaTags: [
            {
                name:'description',
                content : 'Connectez-vous à votre compte ORCHID-CAMPUS pour accéder à nos tutoriels et préparez-vous à étudier à l\'étranger. Apprenez les meilleures pratiques pour maximiser vos chances de réussite dans un nouvel environnement d\'apprentissage.'
            }
        ]
    }
    },
    {
      path:'/creer-compte', name:'register', component:()=> import('@/views/CustomerViews/register/Register.vue'),
      meta:{
        title:'Créer votre compte',
        metaTags:[{
          name:'description',
          content:'Créez un compte gratuit sur notre plateforme de tutoriels pour étudier à l\'étranger. Apprenez à effectuer vos démarches autonomes grâce à nos ressources complètes et personnalisées. Débutez votre aventure internationale dès aujourd\'hui !'
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
      path:'/qui-sommes-nous/', name:'about-us', component:()=> import('@/views/CustomerViews/AboutUs.vue'),
      meta:{
        title:'À propos d\'Orchid Campus - Votre guide pour étudier à l\'étranger',
        metaTags:[{
          name:'description',
          content:'Découvrez qui nous sommes et comment Orchid Campus peut vous aider à réaliser votre rêve d\'étudier à l\'étranger. Obtenez des conseils, des ressources et des tutoriels pour une expérience d\'apprentissage internationale enrichissante'
        }]
      }
    },


  {
      path:'/:pathMatch(.*)*',
      component :() => import("@/views/NotFound.vue")
  }

]

const baseRoutes=[];
const routes = baseRoutes.concat(routes_,managerRoutes);

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass:'active',
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