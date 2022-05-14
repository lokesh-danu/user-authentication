const express=require('express');
const app=express();
const mongoose = require ('mongoose');
const dotenv=require('dotenv');
const authRoute =require ('./routes/auth');

dotenv.config();
mongoose.connect(
    process.env.DB
    ,{useNewUrlParser:true},()=>{
    console.log('Db-connection');
})

app.use(express.json());
app.use('/api/user',authRoute);


const PORT =3000;
app.listen(PORT,()=>{
    console.log(`server running at port-${PORT}`);
})