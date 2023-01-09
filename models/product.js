import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const tagsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: false,
  },
});

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'User',
      default: '',
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      // required: true,
    },
    type: {
      type: String,
      default: 'simple',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    featuredImage: {
      type: String,
      // required: true,
    },
    imageGallery: [String],
    brand: {
      type: String,
      // required: true,
      default: '',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      default: 'Uncategorized',
      ref: 'Category',
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: false,
      default: 'This is the short description!',
    },
    // tags: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     // required: false,
    //     ref: 'Tags',
    //   },
    // ],
    // tags: [tagsSchema],
    // reviews: [reviewSchema],
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: false,
      default: 0,
    },
    price: {
      type: Number,
      // required: true,
      default: 0.0,
    },
    salesPrice: {
      type: Number,
      default: 0.0,
    },
    // crossSells: {
    //   type: [],
    // },
    // upSells: {
    //   type: [],
    // },
    countInStock: {
      type: Number,
      required: false,
      default: 10,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    attributes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // required: false,
        default: [],
        ref: 'Attributes',
      },
    ],
    variations: [],
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
