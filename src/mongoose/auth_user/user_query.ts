import { UserModel } from "./user_schema";

export async function createUser(input: {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}) {
  await UserModel.create({
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    username: input.username,
    password: input.password,
  });
}

export async function getUserByUsername(username: string) {
  const user = await UserModel.findOne({
    username,
  });
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await UserModel.findOne({
    email,
  });
  return user;
}
