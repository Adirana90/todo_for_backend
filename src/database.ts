import mysql from "mysql2/promise";

// create connection
async function getMysqlConnection() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "todo_db",
    password: "password",
    // port: 3307,
  });
  return conn;
}

// getting all data from database;
export async function getAllTodos() {
  try {
    const conn = await getMysqlConnection();

    const result = await conn.query("SELECT * FROM todos");
    console.log("get all todo:", result[0]);

    return result[0];
  } catch (e) {
    console.error("something went werong:", e);
  }
}
// creating todo table
async function createTodosTable() {
  const conn = await getMysqlConnection();

  await conn.query(
    `
        CREATE TABLE IF NOT EXISTS todos (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255),
            created_at DATETIME DEFAULT(NOW())
            );
            `
  );
}

// creating data and inserting it on databse;
export async function createTodo(name: string) {
  try {
    const conn = await getMysqlConnection();

    const result = await conn.query(
      `INSERT INTO todos (name) VALUES ('${name}');`
    );
    console.log("creating todo:", result[0]);

    return result[0];
  } catch (e) {
    console.error("something went wrong:", e);
  }
}

// deleting data from database;
export async function deleteTodo(id: number) {
  try {
    const conn = await getMysqlConnection();

    const result = await conn.query(`DELETE FROM todos WHERE id = ${id}`);
    console.log("creating todo:", result[0]);

    return result[0];
  } catch (e) {
    console.error("something went wrong:", e);
  }
}

// update data form database;
export async function updateTodo(id: number, name: string) {
  try {
    const conn = await getMysqlConnection();

    const result = await conn.query(
      `UPDATE todos SET name = '${name}' WHERE id = ${id};`
    );

    return result[0];
  } catch (e) {
    console.error("something went wrong:", e);
  }
}

// getting todo by id
export async function getTodoById(todoId: number) {
  try {
    const conn = await getMysqlConnection();

    const result = await conn.query(`SELECT * FROM todos WHERE id=${todoId}`);

    return result[0];
  } catch (e) {
    console.error("error:", e);
  }
}
