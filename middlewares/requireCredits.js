module.exports = (req,res,next) =>{
    if(req.user.credits < 5){
        return res.status(403).send({error : "you don't have enough credits"});
        
    }

    next();
}