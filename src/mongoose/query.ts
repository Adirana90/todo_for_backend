import { TodoModel } from "./schema";

export async function createTodoMongoDb(name: string, description: string) {
  const result = await TodoModel.create({
    name,
    description,
  });
  console.log("created todo:", result);

  return result;
}

export async function getAllTodoMongoDb() {
  const result = await TodoModel.find();
  console.log("created todo:", result);
  return result;
}

export async function getTodoByIdMongoDb(_id: string) {
  const result = await TodoModel.findById({ _id });
  console.log("created todo:", result);
  return result;
}

export async function deleteTodoMongoDb(_id: string) {
  const result = await TodoModel.findByIdAndDelete({ _id });
  console.log("delete todo:", result);
  return result;
}

export async function updateTodoMongoDb(
  _id: string,
  name: string,
  description: string,
  status: string
) {
  const result = await TodoModel.findByIdAndUpdate(_id, {
    $set: {
      name,
      description,
      status,
    },
  });
  console.log("delete todo:", result);
  return result;
}
