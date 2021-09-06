import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";
import Swal from "sweetalert2";

import journal from "@/modules/daybook/store/journal";
import { journalState } from "../../../mock-data/test-journal-state";

import EntryView from "@/modules/daybook/views/EntryView";

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));

describe("pruebas en el entry view", () => {
  const store = createVuexStore(journalState);
  store.dispatch = jest.fn();

  const mockRouter = {
    push: jest.fn(),
  };

  let wrapper;
  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryView, {
      props: {
        id: "-MiXSiM01vwlIFWNWuuX",
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  test("debe de sacar al usuario porque el id no existe", () => {
    const wrapper = shallowMount(EntryView, {
      props: {
        id: "Este Id no existe en el store",
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });

    expect(mockRouter.push).toHaveBeenLastCalledWith({ name: "no-entry" });
  });

  test("debe de mostrar la entrada correctamente", () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  test("debe de borrar la entrada y salida", (done) => {
    Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }));
    wrapper.find(".btn-danger").trigger("click");

    expect(Swal.fire).toHaveBeenCalledWith({
      title: "¿Está seguro?",
      text: "Una vez borrado, no se puede recuperar",
      showDenyButton: true,
      confirmButtonText: "Si, estoy seguro",
    });

    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        "journal/deleteEntry",
        "-MiXSiM01vwlIFWNWuuX"
      );
      expect(mockRouter.push).toHaveBeenCalled();
      done();
    }, 1);
  });
});
