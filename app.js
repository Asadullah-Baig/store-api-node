require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleare = require("./middleware/error-handler");

//middlleware
app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1><a href="/api/v1/products">Products route</a>`);
});

app.use("/api/v1/products", productsRouter);

//Products route

app.use(notFoundMiddleware);
app.use(errorMiddleare);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connect DB
    await connectDB(process.env.MONGO_URI);
    console.log("DB Connected!");
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
