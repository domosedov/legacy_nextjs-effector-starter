import type { NextRouter } from "next/router";
import { createGate } from "effector-react";
import { createEvent, createStore, root } from "@app/shared/domain";
import type { Nullable } from "@app/shared/types";

export const mounted = createEvent<NextRouter>();

export const $router = createStore<Nullable<NextRouter>>(null);

$router.on(mounted, (_, router) => router);

$router.watch((router) => console.log({ router }));

export const appGate = createGate({
  name: "AppGate",
  domain: root,
});
