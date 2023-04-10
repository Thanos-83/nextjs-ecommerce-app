import Product from '../../../../../models/product';
import Category from '../../../../../models/category';
import connectdb from '../../../../../database/connectDB';

connectdb();

export default async function productActionsById(req, res) {
  const {
    method,
    query: { categoryName },
  } = req;

  switch (method) {
    // @desc    Fetch product of cetrain category
    // @route   GET /api/products/category/categoryId
    // @access  Public
    case 'GET':
      try {
        // console.log(categoryName);

        const categoryProducts = await Category.find({
          slug: categoryName,
        }).populate({
          path: 'products',
          // select: 'name',
          model: Product,
        });

        if (!categoryProducts) {
          throw new Error('Products NOT found!');
        }
        console.log('category products: ', categoryProducts);
        res.status(200).json({
          // test: session.views,
          msg: 'Products found...',
          categoryProducts: categoryProducts[0].products,
        });
      } catch (error) {
        res.status(400).json({ errorMsg: error.message });
      }
      break;
    default:
      res.status(200).json({ msg: 'OOPS...! Something went wrong!' });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
