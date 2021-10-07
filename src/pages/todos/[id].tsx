import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { fork, root, serialize, allSettled } from "@app/effector-root";
import { useStore } from "effector-react";
import { appModel } from "@app/root";
import Link from "next/link";

export const SingleTodo: NextPage = () => {
  const todo = useStore(appModel.$todo);
  return (
    <div>
      <h1>Todo</h1>
      <Link href="/todos">
        <a>All Todos</a>
      </Link>
      <pre>{JSON.stringify(todo, null, 2)}</pre>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const scope = fork(root);

  await allSettled(appModel.fetchTodosFx, { scope });

  const todos = scope.getState(appModel.$todos);

  const paths = todos.map(({ id }) => ({ params: { id: String(id) } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const scope = fork(root);

  await allSettled(appModel.fetchTodoByIdFx, { scope, params: Number(id) });

  const initialState = serialize(scope);

  return {
    props: {
      initialState,
    },
  };
};

export default SingleTodo;
