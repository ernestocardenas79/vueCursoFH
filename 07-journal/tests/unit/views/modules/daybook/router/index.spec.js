import daybookRouter from "@/modules/daybook/router";

describe("pruebas en el reouter module del Daybook", () => {
  test("el router debe de tener esta configuracion", async () => {
    expect(daybookRouter).toMatchObject({
      name: "daybook",
      path: "/daybook",
      component: expect.any(Function),
      children: [
        {
          path: "",
          name: "no-entry",
          component: expect.any(Function),
        },
        {
          path: ":id",
          name: "entry",
          component: expect.any(Function),
          props: expect.any(Function),
        },
      ],
    });

    const promiseRoutes = [];
    daybookRouter.children.forEach((child) =>
      promiseRoutes.push(child.component())
    );

    const routes = (await Promise.all(promiseRoutes)).map(
      (r) => r.default.name
    );

    expect(routes).toContain("EntryView");
    expect(routes).toContain("NoEntrySelected");
  });

  test("debe de retornar el id de la ruta", () => {
    const route = {
      params: {
        id: "ABC-123",
      },
    };

    const entryRoute = daybookRouter.children.find(
      (route) => route.name === "entry"
    );
    expect(entryRoute.props(route)).toEqual({ id: "ABC-123" });
  });
});
