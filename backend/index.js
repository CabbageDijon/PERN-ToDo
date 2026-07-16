import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todos.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);

//app.get("/", (req, res) => {
// res.send("Hello World!");
// });

// app.get("/about", (req, res) => {
//  res.send("Goodbye World!");
// });

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});

// req = request from client , res = response from server
