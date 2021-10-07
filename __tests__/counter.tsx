import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { createCounter } from "@app/shared/factories/createCounter";
import { Provider, useStore, useEvent } from "effector-react/scope";
import { root, fork } from "@app/effector-root";

const {
  $count,
  api: { inc },
} = createCounter();

const Counter = () => {
  const count = useStore($count);
  const increment = useEvent(inc);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button data-testid="btn" onClick={() => increment()}>
        Inc
      </button>
    </div>
  );
};

describe("Init test", () => {
  it("test counter", async () => {
    const scope = fork(root, {
      values: [[$count, 10]],
    });

    render(
      <Provider value={scope}>
        <Counter />
      </Provider>
    );

    user.click(screen.getByRole("button"));

    expect(screen.getByRole("heading")).toHaveTextContent(/Count: 11/);
  });
});
