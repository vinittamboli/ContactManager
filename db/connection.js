import mongoose from "mongoose";

const connectDb = async ()=>{

    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/userTable`)
        console.log(`DB connected ${conn.connection.host}`)

    }

    catch (error) {
        console.log("MongoDB Connection Error :", error)
        process.exit(1);
    }
}

export default connectDb