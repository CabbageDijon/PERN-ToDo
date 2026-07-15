import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("Goodbye World!");
});

//  req is the request sent to the server, and res is response. So when we go to home we get the response res.send()

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
