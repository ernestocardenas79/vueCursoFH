<template>
    <h2>Pokemon Page #{{id}}</h2>
    <div v-if="pokemon">
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
    </div>
</template>
<script>

export default {
    props:{
        id:{
            type:Number,
            required:true
        }
    },
    data(){
        return{
            pokemon:null
        }
    },
    created(){
        // const {id}=this.$route.params

        // this.id=id
        this.getPokemon()
    },
    methods:{
        async getPokemon(){
            try{

                const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`).then(r=> r.json())
            console.log(pokemon)
            this.pokemon =pokemon
            }catch(erro){
                this.$router.push('/')
            }
        }
    },
    watch:{
        id(){
            this.getPokemon()
        }
    }
}
</script>
