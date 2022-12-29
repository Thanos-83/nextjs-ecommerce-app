import connectdb from '../../../../database/connectDB';
import Category from '../../../../models/category';
import Product from '../../../../models/product';

connectdb();
export default async function categoriesActions(req, res) {
  const { method } = req;

  switch (method) {
    // @desc    Get All Category
    // @route   GET /api/dashboard/categories
    // @access  Private
    case 'GET':
      try {
        const categories = await Category.find().populate({
          path: 'products',
          // select: '_id name',
          model: Product,
        });
        // console.log(categories);
        res.status(200).json(categories);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    // @desc    Create New Category
    // @route   PUT /api/dashboard/categories
    // @access  Private
    case 'POST':
      try {
        const { name, slug, description, parent } = req.body;
        console.log('Parent typeof: ', typeof parent);
        let newCategory = {};
        if (parent) {
          newCategory = { name, slug, description, parent };
        } else {
          newCategory = { name, slug, description };
        }
        const createdCategory = await Category.create(newCategory);

        res.status(200).json({ msg: 'Category created', createdCategory });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    // @desc    Delete Category
    // @route   DELETE /api/dashboard/categories
    // @access  Private
    case 'DELETE':
      try {
        const { categoryID } = req.body;

        console.log(typeof categoryID);
        if (typeof categoryID === 'string') {
          // console.log('iam here string');
          const deletedCategory = await Category.findByIdAndDelete(categoryID);

          if (!deletedCategory) {
            throw new Error('Category NOT found');
          }
          console.log(deletedCategory);
          res.status(200).json({ msg: 'Category deleted', deletedCategory });
        }

        if (typeof categoryID === 'object') {
          // console.log('iam here object');
          const deletedCategories = await Category.deleteMany({
            _id: { $in: categoryID },
          });

          if (!deletedCategories) {
            throw new Error('Category/ies NOT found');
          }
          console.log(deletedCategories);
          res
            .status(200)
            .json({ msg: 'Categories deleted', deletedCategories });
        }
      } catch (error) {
        res
          .status(401)
          .json({ msg: 'Error deleting category', errorMsg: error.message });
      }
      break;
    default:
      res.status(400).json({ error: 'Something went wrong' });
  }
}
