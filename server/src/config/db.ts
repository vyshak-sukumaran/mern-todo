import * as dotenv from 'dotenv'
dotenv.config()
import mongoose, { MongooseError } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

const connectDB = () => {
  return mongoose.connect(MONGODB_URL, (err : MongooseError) => {
    if (!err) {
      console.log("MongoDb connected..");
    } else {
      console.log("MongoDB connection failed", err);
    }
  });
};

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection failed............."));

export default connectDB;
