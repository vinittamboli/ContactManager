const authorizeRole = (...allowedRoles) => {
    
    return (req, res, next) => {

        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json( { message : "Access Denied : Insufficient permission" });
        }

        next();
    };
};

export {authorizeRole};