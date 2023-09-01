const express=require('express')
const app=express()
const mongoose=require('mongoose')
const Customer=require('./models/Model')

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello!')
})

app.get('/get',async(req,res)=>{
    try {
        const cust=await Customer.find({});
        res.status(200).json(cust);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.get('/get/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const cust=await Customer.findById(id);
        res.status(200).json(cust);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.post('/post',async(req,res)=>{
    try{
        const cust=await Customer.create(req.body)
        res.status(200).json(cust);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

app.put('/put/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const cust=await Customer.findByIdAndUpdate(id,req.body);
        if(!cust){
            return res.status(404).json({message:`Cannot find Customer with ID ${id}`})
        }
        const updatedCust=await Customer.findById(id);
        res.status(200).json(cust);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const cust=await Customer.findByIdAndDelete(id,req.body);
        if(!cust){
            return res.status(404).json({message:`Cannot find Customer with ID ${id}`})
        }
        const deletedCust=await Customer.findById(id);
        res.status(200).json(cust);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


mongoose.set("strictQuery",false)

mongoose
.connect('mongodb+srv://malavikasp6:HwFaufrq.Mq2B_3@cluster0.jlqcb47.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected to MongoDB')
    app.listen(3000,()=>{
        console.log('Running on Port 3000')
    })
}).catch((error)=>{
    console.log('Error connecting to MongoDB',+error)
})

