import {createRouter, createWebHashHistory} from 'vue-router'
import isAuthenticatedGuard from './auth-guard'

const routes =[
    { 
        path:'/', 
        redirect:'/pokemon'
    },
    {
        path:'/pokemon',
        name:'pokemon',
        component: ()=> import(/* webpackChunkName: "PokemonLayout" */ '@/modules/pokemon/layouts/PokemonLayout'),
        children:[
            { 
                name:'pokemon-home',
                path:'home', 
                component: ()=>import(/* webpackChunkName: "ListPage" */'@/modules/pokemon/pages/ListPage')
            },
            { 
                name:'pokemon-about',
                path:'about', 
                component:()=> import(/* webpackChunkName: "AboutPage" */'@/modules/pokemon/pages/AboutPage')
            },
            { 
                path:'pokemonid/:id', 
                name:'pokemon-id',
                component: ()=>import(/* webpackChunkName: "PokemonPage" */'@/modules/pokemon/pages/PokemonPage'),
                props:(route)=> {
                    const id = Number(route.params.id)
                    return  isNaN(id)?{id:1}:{id}
                }
            },
            {
                path:'',
                redirect:{name:'pokemon-about'}
            }
        ]
    },
    {
        path:'/dbz',
        name:'dbz',
        beforeEnter:[isAuthenticatedGuard],
        component: ()=>import(/* webpackChunkName: "DragonBallLayout" */ '@/modules/dbz/layouts/DragonBallLayout.vue'),
        children:[
            {
                path:'characters',
                name:'dbz-characters',
                component: ()=>import(/*webpackChunkName: dbz-Characters */ '@/modules/dbz/pages/Characters')
            },
            {
                path:'about',
                name:'dbz-about',
                component: ()=>import(/*webpackChunkName: dbz-About */ '@/modules/dbz/pages/About')
            },
            {
                path:'',
                redirect:{name:'dbz-characters'}
            }
        ]
    },
    { 
        path:'/:pathMatch(.*)*', 
        component: ()=>import(/* webpackChunkName: "NoPageFound" */'@/modules/shared/pages/NoPageFound')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// Global Guard - Sincrono
// router.beforeEach((to,from,next)=>{
//     const random = Math.random()*100

//     if (random>50){
//         console.log('autenticado')
//         next()
//     }
//     else{
//         console.log(random, 'bloqueado por el beforeEach Guard')
//         next({name:'pokemon-home'})
//     }
// })



// const canAccess =()=>{
//     return new Promise(resolve=>{
//         const random = Math.random()*100

//         if (random>50){
//             console.log('autenticado - canAccess')
//             resolve(true)
//         }
//         else{
//             console.log(random, 'bloqueado por el beforeEach Guard - canAccess')
//             resolve(false)
//         }   
//     })
// } 


// router.beforeEach(async (to, from, next)=>{
//     const authoriza = await canAccess()
//     authoriza?next():next({name:'pokemon-home'})
// })

export default router