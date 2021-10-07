import type { FC } from "react";
import { useEffect } from "react";
import { useStore, useEvent } from "effector-react";
import { createEffect, restore } from "@app/effector-root";

type Todo = {
  id: number;
  title: string;
};

export const fetchTodosFx = createEffect<void, Todo[]>(async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=3"
  );
  const todos = await res.json();
  return todos;
});

export const $todos = restore(fetchTodosFx.doneData, []);

export const Todos: FC = () => {
  const getTodos = useEvent(fetchTodosFx);
  const todos = useStore($todos);
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div>
      <h1>Todos</h1>
      <ul data-testid="todo-list">
        {todos.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </div>
  );
};
