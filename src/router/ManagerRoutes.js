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

    // routes tutorials
    {
        path: prefix + 'tutoriels', name: 'ManagerTutoHome', component: () => import('@/views/ManagerViews/Tutorials/Index.vue'),
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
            path: 'countries', name: 'ManagerCountries', component: () => import('@/views/ManagerViews/Tutorials/Countries/Home.vue'),
            mata: {
                title: 'Liste des pays'
            }
        },
        {
            path: 'country/steps/:id', name: 'ManagerCountrySteps', component: () => import('@/views/ManagerViews/Tutorials/Countries/CountryStepsList.vue'),
            beforeEnter: guardMyroute,
            meta: {
                title: 'Liste des pays'
            }
        }

        ]
    },

    {
        path: prefix + 'tutoriels/ajouter', name: 'ManagerAddTutoriel', component: () => import('@/views/ManagerViews/Tutorials/AddTutoriel/AddTutorial.vue'),
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
                meta: {
                    title: 'Ajouter des tutoriels pays',
                    metaTags: [
                        {
                            name: 'description',
                            content: 'Ajouter tutoriels'
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
                            content: 'Ajouter tutoriels'
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
]

function guardMyroute(to, from, next)
{
 var isAuthenticated= false; 

if(localStorage.authUserToken)
  isAuthenticated = true;
 else
  isAuthenticated= false;

 if(isAuthenticated) 
 {
  next(); // allow to enter route
 } 
 else
 {
  next({name:'managerLogin'}); // go to '/login';
 }
}

export default routes;