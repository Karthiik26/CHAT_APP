const mongoose = require("mongoose");

async function Mongo() {
  // console.log('MONGODB_URL:', process.env.MONGODB_URL);

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    const db = mongoose.connection;

    db.on("error", (error) => {
      console.error("Mongo Connection Error - " + error);
    });

    db.once("open", () => {
      console.log("MongoDB Connected Successfully");
    });

    db.on("disconnected", () => {
      console.log("MongoDB Disconnected");
    });

    process.on("SIGINT", async () => {
      try {
        await db.close();
        console.log("MongoDB connection closed through app termination");
        process.exit(0);
      } catch (error) {
        console.error("Error during MongoDB disconnection", error);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
}

module.exports = Mongo;