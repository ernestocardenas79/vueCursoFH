
import {shallowMount} from '@vue/test-utils';
import Counter from '@/components/Counter';

describe('Counter Component',()=>{

    let wrapper = shallowMount(Counter);

    beforeEach(()=>{
        wrapper = shallowMount(Counter)
    })

    test('h2 debe de tener el valor por defecto "Counter"',()=>{

        expect(wrapper.find('h2').exists()).toBeTruthy();
        
        const h2Value= wrapper.find('h2').text();

        expect(h2Value).toBe('Counter');

    })

    test('el valor por defecto deben de ser 100 en el <p>',()=>{

        expect(wrapper.find('p').exists()).toBeTruthy();

        const secondPValue= wrapper.find('[data-testid="counter"]').text();

        expect(secondPValue).toBe('100');
    })

    test('debe incrementar en 1 el valor del contador', async ()=>{

        const [increaseBtn, decreaseBtn] = wrapper.findAll('button')

        await increaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')

        const secondPValue= wrapper.find('[data-testid="counter"]').text();

        expect(secondPValue).toBe('99');
    })

    test('debe de establecer el valor por defecto',()=>{

        const start = wrapper.props('start');

        const value = wrapper.find('[data-testid="counter"]').text()

        expect(Number(value)).toBe(start)

    })

    test('debe de mostrar la prop title',()=>{
        const title = 'Hola Mundo'
        const wrapper= shallowMount(Counter,{
            props:{
                title
            }
        });

        expect(wrapper.find('h2').text()).toBe(title)

    })
})