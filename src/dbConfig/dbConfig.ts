import mongoose from "mongoose";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


type ConnectionObject = {
  isConnected?: number;
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const connection: ConnectionObject = {};

async function connect(): Promise<void> {


  // Check if we are already connected or currently connecting
  if (connection.isConnected === 1) {
    console.log("Already connected to the database");
    return;
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  try {
    // Attempt to connect to the database
    await mongoose.connect(process.env.MONGO_URI!, {});
  
    connection.isConnected = mongoose.connection.readyState;

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    mongoose.connection.on("error", (err) => {
      console.log("MongoDB connection error: " + err);
      process.exit();
    });

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Something went wrong in connecting to the DB");
    console.log(error);
  
    process.exit(1);
  }
}

export default connect;
