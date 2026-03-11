import mongoose from "mongoose";

const initializeMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`mongo connection success`);
  } catch (error) {
    console.log(`failed to connect mongo`, error);
  }
};

export default initializeMongo;
