import type { NextRouter } from "next/router";
import {
  createEvent,
  createStore,
  createEffect,
  sample,
  guard,
  restore,
} from "@app/effector-root";
import type { Nullable } from "@app/shared/types";

export const mounted = createEvent<NextRouter>();

export const $router = createStore<Nullable<NextRouter>>(null, {
  serialize: "ignore",
});

$router.on(mounted, (_, router) => router);

const sleep3s = () => new Promise((resolve) => setTimeout(resolve, 1000));

// test

const $isReady = createStore(false);

type User = {
  id: number;
  name: string;
};

export const $user = createStore<Nullable<User>>(null);

export const getUserFx = createEffect<void, User>(async () => {
  await sleep3s();
  return { id: 1, name: "Domosed" };
});

$user.on(getUserFx.doneData, (_, user) => user);

sample({
  clock: mounted,
  target: getUserFx,
});

type Todo = {
  id: number;
  title: string;
};

export const dashboardMounted = createEvent();

export const $todos = createStore<Todo[]>([]);

export const fetchTodosFx = createEffect<void, Todo[]>(async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=3"
  );
  const todos = await res.json();
  return todos;
});

$todos.on(fetchTodosFx.doneData, (_, todos) => todos);

guard({
  clock: dashboardMounted,
  source: $user,
  filter: (user) => user !== null,
  target: fetchTodosFx,
});

export const fetchTodoByIdFx = createEffect<Todo["id"], Todo>(async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  const todo = await res.json();
  return todo;
});

export const $todo = restore(fetchTodoByIdFx.doneData, null);
