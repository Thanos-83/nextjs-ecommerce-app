import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  items: [
    {
      itemTitle: {
        type: String,
      },
      itemsImage: {
        type: String,
      },
      itemQuantity: {
        type: Number,
      },
      itemPrice: {
        type: Number,
      },
    },
  ],
  // customer: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   // required: true,
  //   ref: 'User',
  //   // default: '',
  // },
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;
