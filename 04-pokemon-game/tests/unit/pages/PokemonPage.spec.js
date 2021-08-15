import {mount, shallowMount} from '@vue/test-utils'
import PokemonPage  from '@/pages/PokemonPage'
import {pokemons} from '../mocks/pokemons.mock'
import { exp } from 'prelude-ls'
import { doesNotMatch } from 'assert'


describe('PokemonPage',()=>{

    test('debe de hacer el match con el snapshot',()=>{
        const wrapper =shallowMount(PokemonPage)
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('debe de llamar el mixPokemonArr al montar',()=>{
        const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods,'mixPokemonArray')
        const wrapper =shallowMount(PokemonPage)

        expect(mixPokemonArraySpy).toHaveBeenCalled()
    })

    test('debe de hacer el match con el snapshot cuando cargan los pokemons',()=>{
        const wrapper =shallowMount(PokemonPage,{
            data(){
                return{
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer:false,
                    message:''
                }
            }
        })

        expect(wrapper.html()).toMatchSnapshot()

    })

    test('debe de mostrar los componentes de pokemos picture y pokemons options',()=>{

        const wrapper =shallowMount(PokemonPage,{
            data(){
                return{
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer:false,
                    message:''
                }
            }
        })

        const pokemonPicture = wrapper.find('pokemon-picture-stub')
        const pokemonOptions = wrapper.find('pokemon-options-stub')

        expect(pokemonPicture.exists()).toBe(true)
        expect(pokemonOptions.exists()).toBe(true)
        expect(pokemonPicture.attributes('pokemonid')).toBe('5')
        expect(pokemonOptions.attributes('pokemons')).toBeTruthy()

    })

    test('pruebas de checkAnswer', async()=>{
        const wrapper2 =shallowMount(PokemonPage,{
            data(){
                return{
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer:false,
                    message:''
                }
            }
        })

        await wrapper2.vm.checkAnswer(5)

        expect(wrapper2.find('h2').exists()).toBeTruthy()
        expect(wrapper2.vm.showPokemon).toBe(true)
        expect(wrapper2.find('h2').text()).toBe(`Correcto, ${pokemons[0].name}`)

        await wrapper2.vm.checkAnswer(10)

        expect(wrapper2.vm.message).toBe(`Ooops, era ${pokemons[0].name}`)
    })
})