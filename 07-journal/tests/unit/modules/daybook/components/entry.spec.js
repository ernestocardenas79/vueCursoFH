import { shallowMount } from "@vue/test-utils";
import Entry from "@/modules/daybook/components/Entry";
import { journalState } from "../../../mock-data/test-journal-state";

describe("Pruebas en Entry Component", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  test("compoenente Entry debe de hacer match con el snapshot", () => {
    const wrapper = shallowMount(Entry, {
      props: {
        entry: journalState.entries[0],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de redireccionar al hacer click en el entry-controller", () => {
    const wrapper = shallowMount(Entry, {
      props: {
        entry: journalState.entries[0],
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });

    wrapper.find(".entry-container").trigger("click");

    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "entry",
      params: {
        id: journalState.entries[0].id,
      },
    });
  });

  test("pruebas en las propiedades computadas", () => {
    const wrapper = shallowMount(Entry, {
      props: {
        entry: journalState.entries[0],
      },
    });

    expect(wrapper.vm.day).toBe(1);
    expect(wrapper.vm.month).toBe("Septiembre");
    expect(wrapper.vm.yearDay).toBe("2021, Miércoles");
  });
});
