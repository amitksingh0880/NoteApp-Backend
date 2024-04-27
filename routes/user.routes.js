const express = require('express');
const { UserModel } = require('../models/users.models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { NoteModel } = require('../models/notes.models.js');
const userRouter = express.Router();

userRouter.get("/",(req,res) =>{

    res.send("Working fine")

})

userRouter.post("/register",(req,res) => {
    
    const {name , email , password} = req.body;
    bcrypt.hash(password, 5, async function(err, hash) {
          
        if(err) return res.send( {
            message: "Something went Wrong",
            status: 0
        });
        try {
            let user = new UserModel({name,email,password:hash});
            await user.save();

            res.send({
                message: "User Created",
                status: 1
            })
        } catch (error) {
            res.send({
                message: error.message,
                status:0
            })
        }

    });
})

userRouter.post("/login", async (req,res) =>{
    const {email , password} = req.body;
    let option = {
        expiresIn:"3m"
    }
    try {
        let data = await UserModel.find({email}); 
        if(data.length > 0)
        {
          let token =  jwt.sign({ userId: data[0]._id},"Notewebapp",option);
            bcrypt.compare(password, data[0].password, async function(err, result) {
                   if(err) return res.send({
                     message: "Something went wrong:"+err,
                     status : 0
                   })
                    if(result) {
                        res.send({
                            message: "User loggedIn Successfully",
                            token: token,
                            status: 1
                        })
                    }
                     else {
                        res.send({
                            message: "Invalid Password",
                            status: 0
                        })
                     }
            });
        }
        else{
            res.send({
                message:"User does not exist",
                status: 0
            })
        }
    }
    catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
    
   
})

module.exports = {
    userRouter,
}