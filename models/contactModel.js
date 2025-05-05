import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {   
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true

        },

        name: {
            required : true,
            type: String,
        },

        email: {
            required : true,
            type: String
        },
        mobile: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Contact = mongoose.model("Contact",contactSchema);

