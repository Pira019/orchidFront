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
 }, 

 {
    path : prefix+'tutoriels/ajouter', name: 'ManagerAddTutoriel', component:() => import('@/views/ManagerViews/Tutorials/AddTutorial.vue'),
    meta:{
        title: 'Ajouter des tutoriels',
        metaTags: [
            {
                name:'description',
                content : 'Ajouter tutoriels'
            }
        ]
    },
 }, 
  // End routes tutorials
] 
export default routes;