import mongoose from "mongoose";

mongoose.connection.on("connected", () => {
  console.log("Database Connected");
});

const connectDb = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI not found in .env");
    }

    await mongoose.connect(`${process.env.MONGODB_URI}/greencart`);
  } catch (err) {
    console.error("DB Error:", err.message);
    process.exit(1);
  }
};

export default connectDb;
