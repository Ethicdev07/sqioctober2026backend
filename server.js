
const express = require("express");



const app = express();






const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`Our server is runing on port ${port}`);
    
});

app.get("/", (req, res)=>{
    res.status(200).json({
        status: "successful",
        message: "we are up and runing backend codes"
    })
});

app.get("/api/v1", (req, res)=>{
    res.status(200).json({
        status: "success",
        message: 'Welcome October Ecommerce backend'
    })
})
