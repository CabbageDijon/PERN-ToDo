import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("Goodbye World!");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});

// req = request , res = response
