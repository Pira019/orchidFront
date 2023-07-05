let prefix = '/manager/'

let routes = [
    {
    path : prefix, name: 'managerHome', component:() => import('@/views/ManagerViews/Home.vue'),
    meta:{
        title: 'Administration',
        metaTags: [
            {
                name:'description',
                content : 'Bienvenue sur la page d\'administration d\'Orchid Campus. Gérez facilement votre site et accédez à tous les outils nécessaires'
            }
        ]
    }
 },

 // routes tutorials
 {
    path : prefix+'tutoriels', name: 'ManagerTutoHome', component:() => import('@/views/ManagerViews/Tutorials/Index.vue'),
    meta:{
        title: 'Tutoriels',
        metaTags: [
            {
                name:'description',
                content : 'Bienvenue sur la page d\'administration d\'Orchid Campus. Gérez facilement votre site et accédez à tous les outils nécessaires'
            }
        ]
    },
    // countries
    children:[{
        path:'countries', name:'ManagerCountries', component:()=> import('@/views/ManagerViews/Tutorials/Countries/Home.vue'),
        mata:{
            title:'Liste des pays'
        }
    }]
 }, 

 {
    path : prefix+'tutoriels/ajouter', name: 'ManagerAddTutoriel', component:() => import('@/views/ManagerViews/Tutorials/AddTutoriel/AddTutorial.vue'),
    meta:{
        title: 'Ajouter des tutoriels',
        metaTags: [
            {
                name:'description',
                content : 'Ajouter tutoriels'
            }
        ]
    },

    children:[
        {
            path : 'pays', name: 'ManagerAddTutorielCountry', component:() => import('@/views/ManagerViews/Tutorials/AddTutoriel/CountryForm.vue'),
            meta:{
                title: 'Ajouter des tutoriels pays',
                metaTags: [
                    {
                        name:'description',
                        content : 'Ajouter tutoriels'
                    }
                ]
            },
        },
        {
            path : 'procedure', name: 'ManagerAddTutorielSteps', component:() => import('@/views/ManagerViews/Tutorials/AddTutoriel/CountrySteps.vue'),
            meta:{
                title: 'Etapes générales',
                metaTags: [
                    {
                        name:'description',
                        content : 'Ajouter tutoriels'
                    }
                ]
            },
        }
    ]
 }, 
  // Endroutes tutorials
] 
export default routes;