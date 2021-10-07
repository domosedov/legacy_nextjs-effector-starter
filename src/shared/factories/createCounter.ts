import { createStore, createApi } from "@app/effector-root";

export const createCounter = () => {
  const $count = createStore(0);

  const api = createApi($count, {
    inc: (c) => c + 1,
    dec: (c) => c - 1,
  });

  return { $count, api };
};
