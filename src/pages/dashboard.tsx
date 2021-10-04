import { useEffect } from "react";
import type { GetServerSideProps } from "next";
import { root, fork, allSettled, serialize } from "effector-root";
import type { NextPage } from "next";
import { useStore, useEvent } from "effector-react";
import { appModel } from "../application";

// export const getServerSideProps: GetServerSideProps = async () => {
//   const scope = fork(root);

//   await allSettled(appModel.getUserFx, { scope });

//   if (scope.getState(appModel.$user) !== null) {
//     await allSettled(appModel.fetchTodosFx, { scope });
//   }

//   return {
//     props: {
//       initialState: serialize(scope),
//     },
//   };
// };

export function Page() {
  const todos = useStore(appModel.$todos);
  const router = useStore(appModel.$router);
  const mounted = useEvent(appModel.dashboardMounted);

  useEffect(() => {
    console.log("call");

    mounted();
  }, [mounted]);
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
      <button onClick={() => router?.push("/")}>Redirect</button>
    </div>
  );
}

export const Dashboard: NextPage = () => {
  const user = useStore(appModel.$user);

  if (!user) return <div>Not auth</div>;

  return <Page />;
};

export default Dashboard;
