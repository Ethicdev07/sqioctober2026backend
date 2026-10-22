const express = require("express");
const cors = require("cors");
const morgan = require('morgan');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(cors());

app.use(morgan("dev"));


app.get("/api/v1", (req, res)=>{
    res.status(200).json({
        status: "Successful",
        message: "Welcome to october backend class!"
    })
});




module.exports = app;
