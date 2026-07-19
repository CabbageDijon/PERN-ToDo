import { Router } from "express";
import pool from "../db.js";

const router = Router();

//Create a new todo
router.post("/", async (req, res) => {
  try {
    const { description, completed } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description, completed) VALUES ($1, $2) RETURNING *",
      [description, completed || false],
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get all todos
router.get("/", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Update a todo
// the "/:id" uses a : to show it is a variable since each note has a unique ID. E.g xyz.com/todos/5 or xyz.com/todos/69

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, completed } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3 RETURNING *",
      [description, completed, id],
    );
    if (updateTodo.rows.length === 0) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    res.json(updateTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Delete a todo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
