import Product from '../../../../models/product';
import connectdb from '../../../../database/connectDB';

connectdb();

export default async function productActionsById(req, res) {
  const {
    method,
    query: { categoryId },
  } = req;

  switch (method) {
    // @desc    Fetch product of cetrain category
    // @route   GET /api/products/category/categoryId
    // @access  Public
    case 'GET':
      try {
        console.log(categoryId);
        const categoryProducts = await Product.find({ category: categoryId });

        if (!categoryProducts) {
          throw new Error('Products NOT found!');
        }

        res.status(200).json({ categoryProducts });
      } catch (error) {
        res.status(400).json({ errorMsg: error.message });
      }
      break;
    default:
      res.status(200).json({ msg: 'OOPS...! Something went wrong!' });
  }
}
