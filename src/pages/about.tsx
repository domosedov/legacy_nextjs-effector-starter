import type { NextPage } from "next";
import { useStore } from "effector-react";
import { appModel } from "../application";

export const About: NextPage = () => {
  const router = useStore(appModel.$router);
  return (
    <div>
      <h1>About</h1>
      <button onClick={() => router?.push("/")}>Redirect</button>
    </div>
  );
};

export default About;
