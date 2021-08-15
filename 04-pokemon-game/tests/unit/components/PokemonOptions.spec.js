import {shallowMount, shallwMount} from '@vue/test-utils'
import PokemonOptions from '@/components/PokemonOptions'
import { pokemons } from '../mocks/pokemons.mock'
describe('PokemonOptions',()=>{
    let wrapper

    beforeEach(()=>{
        wrapper= shallowMount(PokemonOptions,{
            props:{
                pokemons
            }
        })
    })
    test('debe de hacer match con el SnapOptions',()=>{

          expect(wrapper.html()).toMatchSnapshot()
    })

    test('debe de mostrar las 4 opciones correctamete',()=>{
        const liTags = wrapper.findAll('li')

        expect(liTags.length).toEqual(4)
        
        liTags.forEach((li,i)=>{
            expect(li.text()).toEqual(pokemons[i].name)
        })
    })

    test('debe de emitir "selection" con sus respectivos parametros al hacer click',()=>{
        const [li1,li2,li3,li4] = wrapper.findAll('li')

        li1.trigger('click')
        li2.trigger('click')
        li3.trigger('click')
        li4.trigger('click')
        
        expect(wrapper.emitted('selection').length).toBe(4)
        expect(wrapper.emitted('selection')[0]).toEqual([5])
        expect(wrapper.emitted('selection')[1]).toEqual([10])
        expect(wrapper.emitted('selection')[2]).toEqual([15])
        expect(wrapper.emitted('selection')[3]).toEqual([20])
    })
})