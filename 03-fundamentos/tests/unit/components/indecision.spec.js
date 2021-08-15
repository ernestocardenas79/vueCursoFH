
import {shallowMount} from '@vue/test-utils'
import Indecision from '@/components/Indecision';


describe('Indecision Component',()=>{
    let wrapper
    let clgSpy
    global.fetch= jest.fn(()=> Promise.resolve({
        json: ()=> Promise.resolve({
            answer:'yes',
            forced:'false',
            image:'https://yesno.wtf/assets/yes/2.gift'
        })
    }));

    beforeEach(()=>{
        wrapper= shallowMount(Indecision)

        clgSpy= jest.spyOn(console, 'log')

        jest.clearAllMocks()
    })

    test('debe de hacer match con el snapshot',()=>{
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('escribir el input no debe de disparar nada (console.log)',async()=>{
        const getAnswreSpy = jest.spyOn(wrapper.vm,'getAnswer')
        const input= wrapper.find('input')
        await input.setValue('Hola Mundo')

        expect(clgSpy).toHaveBeenCalled()
        expect(getAnswreSpy).not.toHaveBeenCalled();

    })
    test('escribir el simbolo de "?" debe de disparar el getAnswer',async()=>{
        const getAnswreSpy = jest.spyOn(wrapper.vm,'getAnswer')

        const input= wrapper.find('input')
        await input.setValue('Hola Mundo?')

        expect(clgSpy).toHaveBeenCalledTimes(1)
        expect(getAnswreSpy).toHaveBeenCalled();
    })

    test('pruebas en getAnswer',async()=>{
        
        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')

        expect(img).toBeTruthy();
        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gift')
        expect(wrapper.vm.answer).toBe('Si!')

    })

    test('pruebas en getAnswer - Fallo en el API',async()=>{
        
        fetch.mockImplementationOnce(()=>Promise.reject('API is down'))

        await wrapper.vm.getAnswer()
        const img = wrapper.find('img')
        
        expect(img.exists()).toBeFalsy();
        expect(wrapper.vm.answer).toBe('No se pudo cargar del API');

    })
})