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
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model("User",userSchema);

