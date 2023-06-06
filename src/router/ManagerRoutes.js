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
] 
export default routes;