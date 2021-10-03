import { createDomain as originalCreateDomain } from "effector";

const rootDomain = originalCreateDomain("root");
const createDomain = rootDomain.createDomain;
const createEffect = rootDomain.createEffect;
const createEvent = rootDomain.createEvent;
const createStore = rootDomain.createStore;

export * from "effector";
export {
  createDomain,
  createEffect,
  createEvent,
  createStore,
  rootDomain as root,
};
