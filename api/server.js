const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");


const getRoutes = require("./router/getRoutes");
const postRoutes = require("./router/postRoutes");
const putRoutes = require("./router/putRoutes");
const deleteRoutes = require("./router/deleteRoutes");

const port = 3000;

app.use(cors());





app.use((req, res, next) => {
    console.log(`${req.method} request received for ${req.url}`);
    next();
  });
  
app.use(express.json());
app.use(getRoutes);
app.use(postRoutes);
app.use(putRoutes);
app.use(deleteRoutes);

mongoose
  .connect(
    "mongodb+srv://root:Admin123@nodeapi.m1aqxmf.mongodb.net/Node-Api?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch((err) => console.log(err));
