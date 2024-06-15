const mongoose = require('mongoose');

// connect to mongoDB
const myURI = process.env.MONGO_URI;
const connectDB = async () => {
  const est = await mongoose.connect(myURI);
  console.log(`MongoDB connected: ${est.connection.host}`);
};
connectDB();

// define userSchema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  id: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});

// define user model
const User = mongoose.model('User', userSchema);

// export user model
module.exports = User;
