import { shallowMount } from "@vue/test-utils";
import Login from "@/modules/auth/views/Login";

import createVuexStore from "../../../mock-data/mock-store";
import Swal from "sweetalert2";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("pruebas en login compornent", () => {
  const store = createVuexStore({
    user: null,
    status: "not-authenticated",
    idToken: null,
    refreshToken: null,
  });

  store.dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("debe de hacer match con el snapshot", () => {
    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("credenciales incorrectas, disapara el error de Swal", async () => {
    store.dispatch.mockReturnValueOnce({
      ok: false,
      message: "Login Invalido",
    });

    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find("form").trigger("submit");

    expect(store.dispatch).toHaveBeenLastCalledWith("auth/signinUser", {
      email: "",
      password: "",
    });
    expect(Swal.fire).toHaveBeenCalledWith("Error", "Login Invalido", "error");
  });

  test("credenciales correctas, debe de redirigir a la ruta no-entry", async () => {
    store.dispatch.mockReturnValueOnce({
      ok: true,
    });

    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
      },
    });

    const [txtEmail, txtPassword] = wrapper.findAll("input");
    await txtEmail.setValue("ernesto@cardenas.com");
    await txtPassword.setValue("123456");

    await wrapper.find("form").trigger("submit");

    expect(store.dispatch).toHaveBeenCalledWith("auth/signinUser", {
      email: "ernesto@cardenas.com",
      password: "123456",
    });

    expect(wrapper.router.push).toHaveBeenCalledWith({ name: "no-entry" });
  });
});
