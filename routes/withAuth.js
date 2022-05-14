const jwt =require ('jsonwebtoken');

function auth (req,res,next){
    const token =req.header('auth-token');
    if(!token) return res.staus(401).send(`log in again to continue`);
    
    try {
        const authenticated =jwt.verify(token,process.env.TOKEN_SECRET);
        req.user=authenticated;
    } catch (error) {
        res.status(400).send('invalid token');
    }
}