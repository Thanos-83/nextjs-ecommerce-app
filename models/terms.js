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
  price: {
    type: Number,
    required: false,
    default: 0,
  },
  attribute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attributes',
  },
});

const Terms = mongoose.models.Terms || mongoose.model('Terms', termsSchema);

export default Terms;
