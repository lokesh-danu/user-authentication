const router= require('express').Router();
const User =require('../model/User');
const { regValidation , loginValidation }= require('../model/validation');
const bcrypt =require('bcryptjs')
const jwt =require('jsonwebtoken');
router.post('/register', async (req,res) => {
    // console.log('registering');
    const {error,value}=regValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const notunique =await User.findOne({email :req.body.email});
    if(notunique) return res.status(400).send("email already exist");

    const salt =await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password,salt);
    const user =new User({
        name : req.body.name,
        password : hash,
        email : req.body.email
    })
    console.log(user);
    try {
        const saved= await user.save();
        res.send(`User ${user._id} registered succesfully`);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/login', async (req,res) => {
    
    const {error,value}=loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const user =await User.findOne({email :req.body.email});
    if(!user) return res.status(400).send("email not registered");
    
    const checkPass =await bcrypt.compare(req.body.password, user.password);
    if(!checkPass) return res.status(400).send(`incorrect password`);
    
    const token =jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(`Welcome ${user.name}`);
    // res.send(`Welcome ${user.name}`);
})
module.exports=router;