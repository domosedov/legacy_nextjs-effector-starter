import { useEffect } from "react";
import type { FC } from "react";
import { useRouter } from "next/router";
import { useEvent } from "effector-react";
import * as model from "./model";

export const AppProvider: FC = ({ children }) => {
  const router = useRouter();
  const mounted = useEvent(model.mounted);

  useEffect(() => {
    console.log("App mounted");

    mounted(router);

    const log = (evt: any, config: any) => console.log({ evt, config });

    router.events.on("beforeHistoryChange", log);
    router.events.on("beforeHistoryChange", log);
    router.events.on("hashChangeComplete", log);
    router.events.on("hashChangeStart", log);
    router.events.on("routeChangeComplete", log);
    router.events.on("routeChangeStart", log);
    router.events.on("routeChangeError", log);

    return () => {
      router.events.off("beforeHistoryChange", log);
      router.events.off("hashChangeComplete", log);
      router.events.off("hashChangeStart", log);
      router.events.off("routeChangeComplete", log);
      router.events.off("routeChangeStart", log);
      router.events.off("routeChangeError", log);
    };
  }, [router, mounted]);

  return <>{children}</>;
};
