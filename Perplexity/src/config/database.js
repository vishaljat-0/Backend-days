import mongoose from "mongoose";

const dbConnect = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  
  console.log("databse is connected successfuly")

};

export default dbConnect