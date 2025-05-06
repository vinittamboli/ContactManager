import mongoose from "mongoose"
import {User} from "../models/userModel.js"
import bcrypt, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';


// @description Get all users
// Route get /api/users/
//Access private
const getUsers = async(req, res)=> {
    
    const user = await User.find()
    res.status(201).json(user)}


// @description create new user
// Route post /api/users/register
//Access private
const registerUser = async(req, res)=> {
    
    const {username,email,password, role} = req.body;

    if(!username || !email || !password){
        res.status(400);
        throw new Error("All of Fields are Mandatory");
    }

    const checkDuplicateUser = await User.findOne({email});
    console.log(checkDuplicateUser)


    if (checkDuplicateUser){
        res.status(400);
        throw new Error("Duplicate email address");
    }

    //Hash Password

    const hashedPassword = bcrypt.hashSync(password,10);
    console.log(hashedPassword);

    const userCreated = await User.create({username, email, password:hashedPassword, role : role || 'user'});

    res.status(201).json(`User Created : ${userCreated}`)
}

// @description Login
// Route post /api/users/login
//Access private
const login = async(req, res)=> {
    console.log("In Login function")
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("All the Fields are Mandatory");
    }

    const user = await User.findOne({email});

    if (! user){
        res.status(400);
        throw new Error("Invalid email Address");
    }

    console.log("Found email in DB")

    if(user && (await bcrypt.compare(password, user.password))){

        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
                role: user.role
            }
        }, 
        process.env.ACCESS_SECRET,
        {   expiresIn: "15m" }
    )
        
        res.status(200).json({accessToken});
    }else{
        res.status(401)
        throw new Error("Invalid Credentials")
    }
}

// @description Get current users
// Route get /api/users/currentuser
//Access private
const currentUser = async(req, res)=> {

    res.status(200).json(req.user)
    
}


const deleteUser = async(req, res) => {
    console.log("In delete function")
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({Message: "Deleted"})
}

export {getUsers,registerUser,login,currentUser,deleteUser};


