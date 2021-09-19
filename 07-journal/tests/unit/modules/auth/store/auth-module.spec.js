import axios from "axios";
import createVuexStore from "../../../mock-data/mock-store";

describe("preubas en el auth modules", () => {
  test("estado inicial", () => {
    const store = createVuexStore({
      status: "authenticating",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("authenticating");
    expect(user).toBeFalsy();
    expect(idToken).toBeFalsy();
    expect(refreshToken).toBeFalsy();
  });

  test("Mutation: loginuser", () => {
    const store = createVuexStore({
      status: "authenticating",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const payload = {
      user: { name: "Ernesto", email: "ernesto@cardenas.com" },
      idToken: "ABC-123",
      refreshToken: "XYZ-123",
    };

    store.commit("auth/loginUser", payload);

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("authenticated");
    expect(user).toEqual({ name: "Ernesto", email: "ernesto@cardenas.com" });
    expect(idToken).toBe("ABC-123");
    expect(refreshToken).toBe("XYZ-123");
  });

  test("Mutation: logout", () => {
    const store = createVuexStore({
      status: "authenticated",
      user: { name: "Ernesto", email: "ernesto@cardenas.com" },
      idToken: "XYZ-123",
      refreshToken: "XYZ-123",
    });

    store.commit("auth/logout");

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("not-authenticated");
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
    expect(localStorage.getItem("idToken")).toBeFalsy();
    expect(localStorage.getItem("refreshToken")).toBeFalsy();
  });

  test("Getters: currentState y username", () => {
    const store = createVuexStore({
      status: "authenticated",
      user: { name: "Ernesto", email: "ernesto@cardenas.com" },
      idToken: "XYZ-123",
      refreshToken: "XYZ-123",
    });

    store.getters["auth/username"];
    expect(store.getters["auth/currentState"]).toBe("authenticated");
    expect(store.getters["auth/username"]).toBe("Ernesto");
  });

  test("actions: Crear usuario - Error el usuario ya existe", async () => {
    const store = createVuexStore({
      status: "no-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const newUser = {
      name: "TestScheduler",
      email: "test2@test.com",
      password: 123456,
    };

    const resp = await store.dispatch("auth/createUser", newUser);
    expect(resp).toEqual({ ok: false, message: "EMAIL_EXISTS" });

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("no-authenticated");
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
  });

  test("actions: Crear usuario - signinUser", async () => {
    const store = createVuexStore({
      status: "no-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const newUser = {
      name: "Test2",
      email: "test2@test.com",
      password: 123456,
    };

    await store.dispatch("auth/signinUser", newUser);
    const { idToken } = store.state.auth;

    await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyCehLFAkjv2Y-s-nCGdGgQXg0htrSyH4SQ`,
      { idToken }
    );

    const resp = await store.dispatch("auth/createUser", newUser);

    const { status, user, idToken: authToken, refreshToken } = store.state.auth;

    expect(status).toBe("authenticated");
    expect(resp).toMatchObject({ ok: true });
    expect(user).toMatchObject({
      name: "Test2",
      email: "test2@test.com",
    });
    expect(typeof authToken).toBe("string");
    expect(typeof refreshToken).toBe("string");
  });

  test("Actions: authenticacion positiva", async () => {
    const store = createVuexStore({
      status: "no-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const newUser = {
      name: "Test2",
      email: "test2@test.com",
      password: 123456,
    };

    await store.dispatch("auth/signinUser", newUser);
    const { idToken } = store.state.auth;
    store.commit("auth/logout");

    localStorage.setItem("idToken", idToken);

    const checkResp = await store.dispatch("auth/checkAuthentication");
    const { status, user, idToken: authToken } = store.state.auth;

    expect(checkResp).toMatchObject({ ok: true });

    expect(status).toBe("authenticated");
    expect(user).toMatchObject({
      name: "Test2",
      email: "test2@test.com",
    });
    expect(typeof authToken).toBe("string");
  });

  test("Actions: authenticacion fallida", async () => {
    const store = createVuexStore({
      status: "no-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    localStorage.removeItem("idToken");

    const checkResp = await store.dispatch("auth/checkAuthentication");

    expect(checkResp).toEqual({ ok: false, message: "No hya token" });
    expect(store.state.auth.status).toBe("not-authenticated");

    localStorage.setItem("idToken", "ABC-123");
    const checkRespInvToken = await store.dispatch("auth/checkAuthentication");
    expect(checkRespInvToken).toEqual({
      ok: false,
      message: "INVALID_ID_TOKEN",
    });
    expect(store.state.auth.status).toBe("not-authenticated");
  });
});
