import connectdb from '../../../database/connectDB';
import Product from '../../../models/product';
import Categories from '../../../models/category';
import Cart from '../../../models/cart';
import { getCookie } from 'cookies-next';
import { unstable_getServerSession } from 'next-auth/next';
connectdb();

export default async function userActions(req, res) {
  const { method } = req;

  switch (method) {
    // @desc    Fetch products from the DB
    // @route   GET /api/products
    // @access  Public
    case 'GET':
      try {
        const products = await Product.find().populate({
          path: 'category',
          select: 'name slug',
          model: Categories,
        });
        // console.log(products);
        if (products.length === 0) {
          throw new Error('There are NO products');
        }
        res.status(200).json({ products });
      } catch (error) {
        res.status(401).json({ msg: 'Error', errorMsg: error.message });
      }
      break;
    // @desc    Add product to the DB
    // @route   POST /api/products
    // @access  Private
    case 'POST':
      try {
        const { cartItem, customer } = req.body;
        const gestCookie = getCookie('gest-user', { req, res });
        console.log('GET cookie: ', gestCookie);
        console.log('cart item: ', cartItem);
        console.log('customer: ', customer);
        console.log('cookies: ', req.cookies);
        // const cartProduct = await Cart.create(cartItem);
        // console.log(itemAdded)
        res.status(200).json({ msg: 'response', cartProduct: '' });
      } catch (error) {
        res.status(400).json({ msg: 'Error', errorMsg: error.message });
      }
      break;
    default:
      res.status(400).json({ msg: 'Error', errorMsg: 'Internal Server Error' });
      break;
  }
}
