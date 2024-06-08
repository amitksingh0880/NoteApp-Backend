const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticator } = require('../middlewares/authenticator.middlewares');
const { NoteModel } = require('../models/notes.models');


const noteRouter = express.Router();
noteRouter.use(authenticator);

noteRouter.get("/",async (req,res) =>{
    let token = req.headers.authorization
    jwt.verify(token,"Notewebapp", async (err, decode) =>{
     
        try{
            let data = await NoteModel.find({
                user:decode.userId
            })
            res.send({
                data:data,
                message:"Success",
                status:1
            })
        } catch (error) {
            res.send({
                message:error.message,
                status:0
            })
        }
    })

})

noteRouter.post("/create", async (req,res) =>{
      
     try{
          let note = new NoteModel(req.body)
          await note.save()
          res.send({
            message:"note created",
            status: 1
          })
     } catch (error) {
        res.send({
            message:error.message,
            status: 0
          })

     }
})

noteRouter.patch("/", async (req,res) =>{
    let {id} = req.headers
    try {
        await NoteModel.findByIdAndUpdate({_id:id},req.body)
        res.send({
            message: "Note Created",
            status: 1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
        
    }
})

noteRouter.delete("/",async (req,res) =>{
    let {id} = req.headers
    try {
        await NoteModel.findByIdAndDelete({_id : id})
        res.send({
            message: "Note Deleted",
            status: 1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
        
    }
})

module.exports = {
    noteRouter,
};