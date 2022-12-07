import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // default: [],
      ref: 'Product',
    },
  ],
  slug: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    default: null,
    ref: 'Category',
  },
  description: {
    type: String,
    default: '',
    required: false,
  },
  categoryThumbnail: {
    type: String,
    default: '',
  },
});

const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
