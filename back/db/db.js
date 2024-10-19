import { default as mongoose } from "mongoose";


function connectDB() {
    mongoose.connect(
        process.env.ATLAS_URI, 
    ).then(() => {console.log("Connect to MongoDB")}).catch((err) => console.log(`MongoDB connection error: ${err}`))

}

export default connectDB