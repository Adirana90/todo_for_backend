import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import {
  createTodoController,
  deleteTodoController,
  getAllTodoController,
  getTodoController,
  updateTodoController,
} from "./controllers/todo-controller";
import { createDBConnection } from "./mongoose/db";
import {
  loginController,
  logoutController,
  meController,
  signupController,
} from "./controllers/auth_controller";
import { checkAuth } from "./middlewares/check_auth";
import cors from "cors";

const PORT = 4000;

createDBConnection()
  .then((db) => {
    console.log("connected to db");
  })
  .catch((e) => {
    console.error("failed to connect:", e);
  });

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"], // ACCESS-CONTROL-ALLOW-ORIGIN:http://localhost:5173
    credentials: true, // Access-Control-Allow-Credentials: allow
  })
);

app.use(express.json());
app.use(cookieParser());

// Authentication feature
// Sign Up flow
app.post("/auth/signup", signupController);

//login flow
app.post("/auth/login", loginController);

// me route
app.get("/auth/me", checkAuth, meController);

// logout route
app.post("/auth/logout", checkAuth, logoutController);

app.get("/get-todo/:todoId", getTodoController);
app.post("/create-todo", createTodoController);
app.put("/update-todo/:todoId", updateTodoController);
app.delete("/delete-todo/:todoId", deleteTodoController);
app.get("/get-all-todos", getAllTodoController);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    message: "something went wrong on the server",
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
