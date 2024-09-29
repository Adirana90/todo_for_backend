type TTodoStatus = "not_started" | "in_progress" | "done";

export type TTodo = {
  id: number;
  name: string;
  status: TTodoStatus;
};

const todos: TTodo[] = [
  {
    id: 1,
    name: "Reading about mvc pattern",
    status: "in_progress",
  },
];

export class TodoModel {
  constructor() {
    console.log("todo constructor is called");
  }

  getTodo(todoId: number) {
    const todo = todos.find((todo) => todo.id === todoId);
    return todo;
  }

  createTodo(name: string, status: TTodoStatus) {
    const newTodo: TTodo = {
      id: todos.length + 1,
      name,
      status,
    };
    todos.push(newTodo);

    return newTodo;
  }
}
