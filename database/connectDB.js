import mongoose from 'mongoose';

const connection = {};
const connectdb = async () => {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.isConnected = db.connections[0].readyState;
  console.log(`MongoDB connected: ${connection.isConnected} `);
};

export default connectdb;
