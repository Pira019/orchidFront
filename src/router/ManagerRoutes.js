let prefix = '/manager/'

let routes = [
    {
        path: prefix, name: 'managerHome', component: () => import('@/views/ManagerViews/Home.vue'),
        beforeEnter: guardMyroute,
        meta: {
            title: 'Administration',
            metaTags: [
                {
                    name: 'description',
                    content: 'Bienvenue sur la page d\'administration d\'Orchid Campus. Gérez facilement votre site et accédez à tous les outils nécessaires'
                }
            ]
        }
    },

    // routes country steps
    {
        path: prefix + 'etape', name: 'ManagerTutoHome', component: () => import('@/views/ManagerViews/Tutorials/Index.vue'), 
        beforeEnter: guardMyroute,
        meta: {
            title: 'Tutoriels',
            metaTags: [
                {
                    name: 'description',
                    content: 'Bienvenue sur la page d\'administration d\'Orchid Campus. Gérez facilement votre site et accédez à tous les outils nécessaires'
                }
            ]
        },
        // countries
        children: [{
            path: 'pays', name: 'ManagerCountries', component: () => import('@/views/ManagerViews/Tutorials/Countries/HomeCountrySteps.vue'), 
            beforeEnter: guardMyroute,
            mata: {
                title: 'Liste des pays'
            }
        },
        {
            path: 'pays/:id', name: 'ManagerCountrySteps', component: () => import('@/views/ManagerViews/Tutorials/Countries/CountryStepsList.vue'), 
            meta: {
                title: 'Liste des étapes d\'un pays'
            }
        }

        ]
    },

    {
        path: prefix + 'etapes/ajouter', name: 'ManagerAddTutoriel', component: () => import('@/views/ManagerViews/Tutorials/AddTutoriel/AddTutorial.vue'), 
        meta: {
            title: 'Ajouter des tutoriels',
            metaTags: [
                {
                    name: 'description',
                    content: 'Ajouter tutoriels'
                }
            ]
        },

        children: [
            {
                path: 'pays', name: 'ManagerAddTutorielCountry', component: () => import('@/views/ManagerViews/Tutorials/AddTutoriel/CountryForm.vue'), 
                beforeEnter: guardMyroute,
                meta: {
                    title: 'Ajouter des tutoriels pays',
                    metaTags: [
                        {
                            name: 'description',
                            content: 'Ajouter des tutoriels pays'
                        }
                    ]
                },
            },
            {
                path: 'procedure', name: 'ManagerAddTutorielSteps', component: () => import('@/views/ManagerViews/Tutorials/AddTutoriel/CountrySteps.vue'), 
                meta: {
                    title: 'Etapes générales',
                    metaTags: [
                        {
                            name: 'description',
                            content: 'Etapes générales à suivre'
                        }
                    ]
                },
            }
        ]
    },
    // Endroutes tutorials

      // routes user management
    {
        path: prefix+"ajouter-utilisateur", name: 'managerAddUser', component: () => import('@/views/ManagerViews/PersistUser.vue'), 
        meta: {
            title: 'Ajouter un gestionnaire Administration',
            metaTags: [
                {
                    name: 'description',
                    content: 'Ajouter un utilisateur'
                }
            ]
        }
    },
    {
        path: prefix+"login", name: 'managerLogin', component: () => import('@/views/ManagerViews/Login.vue'), 
        meta: {
            title: 'Connecter vous - Administration',
            metaTags: [
                {
                    name: 'description',
                    content: 'Connecter'
                }
            ]
        }
    },

    {
        path: prefix+"403", name:'manager403', component: () => import('@/views/ManagerViews/403.vue'), 
        beforeEnter: guardMyroute,
        meta: {
            title: '403 - Accès Interdit',
            metaTags: [
                {
                    name: 'description',
                    content: '403 - Accès Interdit'
                }
            ]
        }
    },

     // routes tutorials
     {
        path: prefix + 'tutoriel/pays', name: 'ManagerTutoCountry', 
        beforeEnter: guardMyroute, 
        redirect: { name: 'ManagerTutoCountries' },
       // steps
        children: [{
            path: '', name: 'ManagerTutoCountries', component: () => import('@/views/ManagerViews/Tutorials/Countries/CoutryList.vue'), 
            beforeEnter: guardMyroute,
            meta: {
                title: 'Liste de pays avec des étapes'
            }
        },

        {
            //id = id pays
            path: ':id', name: 'ManagerTutoCountrySteps', component: () => import('@/views/ManagerViews/Tutorials/Countries/StepsCountryTutos.vue'), 
            beforeEnter: guardMyroute,
            meta: {
                title: 'Liste étapes'
            }
        },

        ], 
    },

       

     // end routes tutorials
]

function guardMyroute(to, from, next)
{
 var isAuthenticated= false; 

if(localStorage.getItemauthUserToken !==null && localStorage.authUserToken !== undefined){
    next(); 
}
 else{
    next({name:'managerLogin'}); // go to '/login';
 }

 
}

export default routes;