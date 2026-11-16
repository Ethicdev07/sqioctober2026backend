const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const erroHandler = require("./middleware/error")

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

app.use("/api/v1/auth", authRoute);

app.use("/api/v1/users", userRoute)


//error handler
app.use(erroHandler)

module.exports = app;
