import useAuth from "@/modules/auth/composables/useAuth";

const mockStore = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: {
    "auth/currentState": "authenticated",
    "auth/username": "ernesto",
  },
};

jest.mock("vuex", () => ({
  useStore: () => mockStore,
}));

describe("Pruebas en useAuth", () => {
  beforeEach(() => jest.clearAllMocks());
  test("CreateUser exitoso", async () => {
    const { createUser } = useAuth();

    const newUser = { name: "Ernesto", email: "ernesto@cardenas.com" };
    mockStore.dispatch.mockReturnValue({ ok: true });

    const resp = await createUser(newUser);

    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", {
      email: "ernesto@cardenas.com",
      name: "Ernesto",
    });

    expect(resp).toEqual({ ok: true });
  });

  test("createUser fallido por que el usuario ya existe", async () => {
    const { createUser } = useAuth();

    const newUser = { name: "Ernesto", email: "ernesto@cardenas.com" };
    mockStore.dispatch.mockReturnValue({ ok: false, message: "EMAIL_EXISTS" });

    const resp = await createUser(newUser);

    expect(resp).toEqual({ ok: false, message: "EMAIL_EXISTS" });
  });

  test("login existoso", async () => {
    const { loginUser } = useAuth();

    const user = { email: "ernesto@cardenas.com", password: 123456 };
    mockStore.dispatch.mockReturnValue({ ok: true });

    const resp = await loginUser(user);

    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/signinUser", {
      email: "ernesto@cardenas.com",
      password: 123456,
    });

    expect(resp).toEqual({ ok: true });
  });

  test("login fallido", async () => {
    const { loginUser } = useAuth();

    const user = { email: "ernesto@cardenas.com", password: 123456 };
    mockStore.dispatch.mockReturnValue({
      ok: false,
      message: "INVALID ACCOUNT",
    });

    const resp = await loginUser(user);

    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/signinUser", {
      email: "ernesto@cardenas.com",
      password: 123456,
    });

    expect(resp).toEqual({ ok: false, message: "INVALID ACCOUNT" });
  });

  test("Checkstatus", async () => {
    const { checkAuthStatus } = useAuth();

    mockStore.dispatch.mockReturnValue({
      ok: true,
    });

    const resp = await checkAuthStatus();

    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/checkAuthentication");

    expect(resp).toEqual({ ok: true });
  });

  test("logout", () => {
    const { logout } = useAuth();

    logout();
    expect(mockStore.commit).toHaveBeenCalledWith("auth/logout");
    expect(mockStore.commit).toHaveBeenCalledWith("journal/clearEntries");
  });

  test("authSatatus y username", () => {
    const { authStatue, username } = useAuth();

    expect(authStatue.value).toBe("authenticated");
    expect(username.value).toBe("ernesto");
  });
});
