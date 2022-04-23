import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

// App config
const app = express()

// middlewares
app.use(express.json())
app.use(Cors())

// Db config
mongoose.connect(process.env.MONGO_URL,{
    // userNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("db connected successfully")
}).catch((err=>{
    console.log(err)
}))

// API endpoints
app.get('/', (req,res)=>{
    res.status(200)
    res.send("Hello world")
})
app.post('/tinder/cards', (req,res)=>{
    const dbCard = req.body

    Cards.create(dbCard,(err, data)=>{
        if(err){
            // 500 - internal server err
            res.status(500).send(err)
        } else{
            res.status(201).send(data)
        }
    })
} )
app.get('/tinder/cards', (req,res)=>{
    Cards.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        } else{
            res.status(200).send(data)
        }
})
})

// listener
app.listen(process.env.PORT, () => console.log(`listening on port: ${process.env.PORT}`));

// const express = require('express');
// const cors = require('cors')
// const mongoose = require('mongoose')
// const dotenv = require("dotenv")
// // const routesUrl = require('./routes')

// const app = express()

// dotenv.config()

// app.use(express.json())
// app.use(cors())

// mongoose.connect(process.env.MONGO_URL,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(()=>{
//     console.log("DB connection successfull");
// })
// .catch((err)=>{
//     console.log(err.message);
// } )

// app.post('/cards',(req,res)=>{
//     req.body
//     res.send("Done")
// })
// app.get('/cards',(req,res)=>{
//     res.send("hello")
// })


// const server = app.listen(process.env.PORT,()=>{
//     console.log(`Server listening on port ${process.env.PORT}`)
// })
