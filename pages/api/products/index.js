import connectdb from '../../../database/connectDB';
import Product from '../../../models/product';
import Categories from '../../../models/category';

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
        const {
          user,
          name,
          featuredImage,
          brand,
          category,
          description,
          price,
          countInStock,
          sku,
        } = req.body;
        const isProductUnique = await Product.find({ sku });

        if (isProductUnique.length !== 0) {
          throw new Error('Product already exists!');
        }
        const newProduct = {
          user,
          name,
          featuredImage,
          brand,
          category,
          description,
          price,
          countInStock,
          sku,
        };
        // console.log(newProduct);

        const productCreated = await Product.create(newProduct);
        res.status(200).json({ msg: 'response', product: productCreated });
      } catch (error) {
        res.status(400).json({ msg: 'Error', errorMsg: error.message });
      }
      break;
    default:
      res.status(400).json({ msg: 'Error', errorMsg: 'Internal Server Error' });
      break;
  }
}
