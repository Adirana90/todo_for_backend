import { NextFunction, Request, Response } from "express";
import { TodoModel } from "../models/todo-model";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "../database";
import { error } from "console";

export async function getTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const todoId = req.params.todoId;

    if (!todoId) {
      next("Please provide valid todoId");
      return;
    }

    const myTodoModel = new TodoModel();

    const todo = myTodoModel.getTodo(parseInt(todoId as string));

    //   if (!todo) {
    //     res.status(404).json({
    //       messagge: "todo not found",
    //     });
    //     return;
    //   }

    const result = (await getTodoById(parseInt(todoId))) as {
      id: number;
      name: string;
      created_at: Date;
    }[];

    console.log("result", result);

    if (!result.length) {
      res.status(404).json({
        message: "todo not found",
        data: null,
      });
    } else {
      res.json({
        message: "getting todo by id",
        data: result[0],
      });
    }
  } catch (e: any) {
    console.error(e);
    next(e.message);
  }
}

export async function createTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    console.log("body", body);

    const name = body.name;

    const result = await createTodo(name);

    res.status(201).json({
      data: result,
      message: "Todo is created successfully!!",
    });
  } catch (e: any) {
    console.error(e);
    next(e.message);
  }
}

export async function updateTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const todoId = req.params.todoId;
    const body = req.body;
    const name = req.body.name;
    console.log("body:", name);

    const result = await updateTodo(parseInt(todoId), name);

    res.json({
      message: "todo update successfully",
    });
  } catch (e: any) {
    console.error(e);
    next(e.message);
  }
}

export async function deleteTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const todoId = req.params.todoId;
    const result = await deleteTodo(parseInt(todoId));
    res.json({
      message: "id delete successfully",
    });
  } catch (e: any) {
    console.error(e);
    next(e.message);
  }
}

export async function getAllTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getAllTodos();

    res.json({
      data: result,
    });
  } catch (e: any) {
    console.error(e);
    next(e.message);
  }
}
