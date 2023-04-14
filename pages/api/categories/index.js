import connectdb from '../../../database/connectDB';
import Category from '../../../models/category';
import Product from '../../../models/product';

export default async function categoriesActions(req, res) {
  connectdb();

  const { method } = req;

  switch (method) {
    // @desc    Get All Categories
    // @route   GET /api/categories
    // @access  Public
    case 'GET':
      try {
        const categories = await Category.find({}).populate({
          path: 'products',
          select: '_id name',
          model: Product,
        });
        console.log('fetching categories from API folder: ', categories);
        res.status(200).json({ categories: categories });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    default:
      res.status(400).json({ error: 'Something went wrong' });
  }
}
