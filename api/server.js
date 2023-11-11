const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// dotenv configuration 
require("dotenv").config();
const port = process.env.PORT;
const mongodbURI = process.env.MONGODB_URI;

const productRouter = require("./router/ProductRouter");


app.use(cors());


app.use((req, res, next) => {
    console.log(`${req.method} request received for ${req.url}`);
    next();
  });
  
app.use(express.json());
app.use(productRouter);

mongoose
  .connect(
    mongodbURI
  )
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(port, () =>
      console.log(`istening on port ${port}!`)
    );
  })
  .catch((err) => console.log(err));
