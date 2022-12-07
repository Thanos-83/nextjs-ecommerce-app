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
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

const Attributes =
  mongoose.models.Attributes || mongoose.model('Attributes', attributesSchema);

export default Attributes;
