//import express
const express=require('express')

//import cors

const cors=require('cors')
//import logic
const logic=require('./services/logic')
//create server
const server=express()

//connections

server.use(cors({
    origin:'http://localhost:3000'
}))

server.use(express.json());

server.listen(8000,()=>{
    console.log('listening on port 8000');
})

//api call to get allgarbage details

server.get('/allgarbages',(req,res)=>{
    logic.allGarbages().then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
        
    )
})
//api call to add lgarbage details

server.post('/addgarbages',(req,res)=>{
    logic.addGarbages(req.body.id,req.body.garbage,req.body.cteam,req.body.quantity,req.body.status).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
        
    )
})

server.post('/editgarbages',(req,res)=>{
    logic.editGarbages(req.body.id,req.body.garbage,req.body.cteam,req.body.quantity,req.body.status).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
        
    )
})
server.delete('/deletegarbages/:id',(req,res)=>{
    logic.deleteGarbages(req.params.id).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
        
    )
})

//api call to get getgarbage details

server.get('/getgarbage/:id',(req,res)=>{
    console.log(req.params.id);
    logic.getGarbage(req.params.id).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
        
    )
})