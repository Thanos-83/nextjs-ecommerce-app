import mongoose from 'mongoose';

const termsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
});

const attributesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
  terms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Terms',
    },
  ],
});

const TestAttributes =
  mongoose.models.TestAttributes ||
  mongoose.model('TestAttributes', attributesSchema);

export default TestAttributes;
