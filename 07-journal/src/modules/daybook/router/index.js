export default [
  {
    name: "daybook",
    path: "/daybook",
    component: () =>
      import(
        /*webpacjChunkName daybook*/ "@/modules/daybook/layout/DayBookLayout.vue"
      ),
    children: [
      {
        path: "",
        name: "no-entry",
        component: () =>
          import(
            /*webpackChunkName daybook-no-entry*/ "@/modules/daybook/views/NoEntrySelected.vue"
          ),
      },
      {
        path: ":id",
        name: "entry",
        component: () =>
          import(
            /*webpackChunkName daybook-entry*/ "@/modules/daybook/views/EntryView.vue"
          ),
      },
    ],
  },
];
