import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            required : true,
            type: String,
        },

        email: {
            required : true,
            type: String
        },
        password: {
            type: String,
            required: true
        },
        role:{
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model("User",userSchema);

