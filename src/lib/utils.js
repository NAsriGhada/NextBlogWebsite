const mongoose = require("mongoose");

const connection = {};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) {
      console.log("using existing connection");
      return;
    }
    console.log("Attempting to connect to MongoDB...");

    const db = await mongoose.connect(process.env.MONGODB);
    // console.log("Successfully connected to MongoDB:", db, db.connection.host);

    connection.isConnected = db.connections[0].readyState;
    // console.log("Connected to MongoDB:", connection.isConnected);
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw new Error("Error connecting to database");
  }
};
