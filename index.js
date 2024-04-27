const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/user.routes.js');
const { connection } = require('./database.js');
const { noteRouter } = require('./routes/note.routes.js');
require('dotenv').config()
let PORT = process.env.PORT;

const app = express()

app.use(cors())
app.use(express.json())  //everything would be converted in to json format...

app.use("/user", userRouter)
app.use("/note", noteRouter)


 
 app.get("/" , (req,res) =>{
    res.send({
        message: "api is working"
    })
 })

app.listen(PORT , async() =>{
   
    try {
        await connection
        console.log("Database is Connected");
    }  catch (error) {
        console.log(error);
    }

    console.log("Server is running on 3000");
})