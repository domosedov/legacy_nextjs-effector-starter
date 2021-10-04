import { createDomain as domain } from "effector";

export * from "effector";
const rootDomain = domain("root");
const { createDomain, createEffect, createEvent, createStore } = rootDomain;
export {
  createDomain,
  createEffect,
  createEvent,
  createStore,
  rootDomain as root,
};
