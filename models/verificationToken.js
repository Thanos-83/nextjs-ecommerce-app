import mongoose from 'mongoose';

const verificationTokenSchema = new mongoose.Schema(
  {
    identifier: {
      type: String,
      //   required: true,
      unique: true,
    },
    token: {
      type: String,
      //   required: true,
      unique: true,
    },
    expires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const VerificationToken =
  mongoose.models.VerificationToken ||
  mongoose.model('VerificationToken', verificationTokenSchema);

export default VerificationToken;
