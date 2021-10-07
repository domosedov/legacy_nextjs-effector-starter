import "../styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Link from "next/link";
import type { Scope } from "effector";
import { Provider } from "effector-react/scope";
import { root, fork, serialize } from "@app/effector-root";
import { AppProvider } from "@app/root";

let clientScope: Scope;

const Application: NextPage<AppProps> = ({ Component, pageProps }) => {
  const scope = fork(root, {
    values: {
      ...(clientScope ? serialize(clientScope) : {}),
      ...pageProps.initialState,
    },
  });

  if (typeof window !== "undefined") clientScope = scope;

  return (
    <Provider value={scope}>
      <AppProvider>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
          <Link href="/todos">
            <a>Todos</a>
          </Link>
        </nav>
        <Component {...pageProps} />
      </AppProvider>
    </Provider>
  );
};

export default Application;
