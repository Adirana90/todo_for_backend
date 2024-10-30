import { NextFunction, Request, Response } from "express";
import { TodoModel } from "../models/todo-model";
import {
  createTodo,
  createTodoWithPool,
  deleteTodo,
  deleteTodoWithPool,
  getAllTodos,
  getAllTodoWithPoll,
  getTodoById,
  getTodoByIdWithPool,
  updateTodo,
  updateTodoWithPool,
} from "../database";
import { error } from "console";
import {
  createTodoMongoDb,
  deleteTodoMongoDb,
  getAllTodoMongoDb,
  getTodoByIdMongoDb,
  updateTodoMongoDb,
} from "../mongoose/query";

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

    // const myTodoModel = new TodoModel();

    // const todo = myTodoModel.getTodo(parseInt(todoId as string));

    //   if (!todo) {
    //     res.status(404).json({
    //       messagge: "todo not found",
    //     });
    //     return;
    //   }

    const result = await getTodoByIdMongoDb(todoId);

    console.log("result", result);

    if (!result) {
      res.status(404).json({
        message: "todo not found",
        data: null,
      });
    } else {
      res.json({
        message: "getting todo by id",
        data: result,
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

    // console.log("body", body);

    const name = body.name;
    const description = body.description;
    // mysql database
    // const result = await createTodoWithPool(name);

    // mongodb database
    const result = await createTodoMongoDb(name, description);
    console.log("result:", result);

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
    const description = req.body.description;
    const status = req.body.status;
    // console.log("body:", name);

    const result = await updateTodoMongoDb(todoId, name, description, status);

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
    const result = await deleteTodoMongoDb(todoId);
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
    const result = await getAllTodoMongoDb();

    res.json({
      data: result,
    });
  } catch (e: any) {
    console.error(e);
    next(e.message);
  }
}
