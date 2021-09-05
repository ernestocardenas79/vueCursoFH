import { shallowMount } from "@vue/test-utils";
import About from "@/views/About.vue";

describe("Pruebas en el About View", () => {
  test("debe de renderizar el compoennete correctamente", () => {
    const wrapper = shallowMount(About);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
