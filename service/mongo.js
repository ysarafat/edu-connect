import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const connection = await mongoose.connect(
      String(process.env.MONGODB_CONNECTION_STRING)
    );

    return connection;
  } catch (error) {
    console.error(error);
  }
}
