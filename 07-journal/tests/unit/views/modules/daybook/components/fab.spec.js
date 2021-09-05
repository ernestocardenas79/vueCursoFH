import { shallowMount } from "@vue/test-utils";
import Fab from "@/modules/daybook/components/Fab";
describe("pruebas en el fab component", () => {
  test("debe de mostrar el icono por defecto", () => {
    const wrapper = shallowMount(Fab);

    const fabPlus = wrapper.find("i.fa-plus");
    expect(fabPlus).toBeTruthy();
  });

  test("debe de mostrar el icono por argumento: fa-circle", () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: "fa-circle",
      },
    });

    const fabCircle = wrapper.find(".fa-circle");
    expect(fabCircle).toBeTruthy();
  });

  test("debe de emmitir el evento on_click cuando se hace el click", () => {
    const wrapper = shallowMount(Fab);

    wrapper.find("button").trigger("click");

    expect(wrapper.emitted("on:click")).toHaveLength(1);
  });
});
