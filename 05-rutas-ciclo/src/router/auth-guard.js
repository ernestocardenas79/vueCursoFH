const isAuthenticatedGuard = async (to, from, next)=>{

return new Promise(()=>{
    const random = Math.random()*100

    if(random>50){
        console.log('esta autenticado')
        next()
    }
    else{
        console.log(random, 'bloqueado por el isAuthenticaded Guard')
        next({name:'pokemon-home'})
    }
})

}

export default isAuthenticatedGuard