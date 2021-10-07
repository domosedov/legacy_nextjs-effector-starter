import { render, screen, waitFor } from "@testing-library/react";
import { root, fork } from "@app/effector-root";
import { Provider } from "effector-react/scope";
import { Todos, fetchTodosFx } from "@app/todos";

describe("Todos", () => {
  it("render todo list", async () => {
    const scope = fork(root, {
      handlers: [[fetchTodosFx, () => [{ id: 1, title: "todo 1" }]]],
    });

    render(
      <Provider value={scope}>
        <Todos />
      </Provider>
    );

    const listItem = screen.getByRole("listitem");

    expect(listItem).toHaveTextContent(/todo 1/);
  });
});
