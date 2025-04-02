import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const connString = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected to MongoDB: ${connString.connection.host}`);
    }catch(err){
        console.log("Error on connection: ", err.message)
        process.exit(1);
    }
}