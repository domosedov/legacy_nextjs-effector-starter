import type { NextPage, GetStaticProps } from "next";
import { root, fork, allSettled, serialize } from "@app/effector-root";
import { appModel } from "@app/root";
import { useList } from "effector-react";
import Link from "next/link";

export const Todos: NextPage = () => {
  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {useList(appModel.$todos, {
          fn: ({ title, id }) => (
            <li>
              <Link href={`/todos/${id}`}>
                <a>{title}</a>
              </Link>
            </li>
          ),
          getKey: ({ id }) => id,
        })}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const scope = fork(root);

  await allSettled(appModel.fetchTodosFx, { scope });

  const initialState = serialize(scope);

  return {
    props: { initialState },
  };
};

export default Todos;
