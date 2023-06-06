let prefix = '/manager/'

let routes = [
    {
    path : prefix, name: 'managerHome', component:() => import('@/views/ManagerViews/Home.vue'),
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
] 
export default routes;