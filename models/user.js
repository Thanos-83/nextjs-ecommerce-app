import mongoose from 'mongoose';
// import { sessionSchema } from './session';
// import { accountSchema } from './account';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    emailVerified: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      required: true,
      default: 'customer',
    },
    image: {
      type: String,
      default: '',
    },
    // accounts: [accountSchema],
    // sessions: [sessionSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
