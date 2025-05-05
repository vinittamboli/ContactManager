import constants from "../constants.js";

const constant = constants;
const errorHandler = (err,req,res,next) => {
    
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log(statusCode);
   
    switch (statusCode){
        case constant.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed error", 
                message: err.message, 
                stackTrace: err.stack
            })          
        break;
        case constant.UNAUTHORISED:
            res.json({
                title: "UNAUTHORISED error", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case constant.FORBIDDEN:
            res.json({
                title: "FORBIDDEN error", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;

        case constant.NOT_FOUND:
            res.json({
                title: "Not found error", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        
        default:
            console.log("No errors");
            break;

        

    }



}

export default errorHandler;
