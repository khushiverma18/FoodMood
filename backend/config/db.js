import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Food", {
        });
        console.log("MongoDB connected successfully");
      } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
      }
}