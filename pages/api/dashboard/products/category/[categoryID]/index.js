import Product from '../../../../../../models/product';
import connectdb from '../../../../../../database/connectDB';

export default async function productActionsById(req, res) {
  connectdb();

  const {
    method,
    query: { categoryID },
  } = req;

  switch (method) {
    // @desc    Fetch products of specific category
    // @route   GET /api/dashboard/products/category/categoryID
    // @access  Private
    case 'GET':
      try {
        console.log(categoryID);

        const product = await Product.find({
          category: { $in: categoryID },
        }).populate('category');
        //   .populate('attributes')
        //   .populate('tags');
        // console.log(product);
        // console.log(product.attributes[0]?.terms);
        if (!product) {
          throw new Error('Product NOT found!');
        }

        res.status(200).json({ product });
      } catch (error) {
        res.status(400).json({ errorMsg: error.message });
      }
      break;
    default:
      res.status(200).json({ msg: 'OOPS...! Something went wrong!' });
  }
}
