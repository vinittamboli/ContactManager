import expressAsyncHandler from "express-async-handler";
import JsonWebToken from "jsonwebtoken";

const validateToken = expressAsyncHandler(async(req, res, next) => {

    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        
        token = authHeader.split(" ")[1];
        
        JsonWebToken.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
        
        if(err){
        
            res.status(401);
        
            throw new Error("User is not Authorised")
        }

        req.user = decoded.user;

        next();

     });   

     
    }
    if(! token){

        res.status(400)
        throw new Error("User is not Authorised or Token is missing/incorrect")
     }

    
})

export default validateToken;