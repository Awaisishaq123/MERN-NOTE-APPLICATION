// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Host aur database dono show karenge
    console.log(`✅ MongoDB Connected to database: ${conn.connection.name}`);
    console.log(`🌐 MongoDB Host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
