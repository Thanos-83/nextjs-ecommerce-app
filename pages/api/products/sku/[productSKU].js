import Product from '../../../../models/product';
import connectdb from '../../../../database/connectDB';
import Categories from '../../../../models/category';
import Attributes from '../../../../models/attributes';
import Terms from '../../../../models/terms';

connectdb();

export default async function productActionsById(req, res) {
  const {
    method,
    query: { productSKU },
  } = req;
  console.log('server query params: ', req.query);
  switch (method) {
    // @desc    Fetch single product by SKU
    // @route   GET /api/products/sku/:productSKU
    // @access  Public
    case 'GET':
      try {
        // console.log('Product SKU: ', productSKU);
        const product = await Product.findOne({ sku: productSKU })
          .populate({
            path: 'category',
            model: Categories,
          })
          .populate({
            path: 'attributes',
            model: Attributes,
            populate: {
              path: 'terms',
              model: Terms,
            },
          });

        // console.log('Server Product: ', product);

        if (!product) {
          throw new Error('Product NOT found!');
        }

        res.status(200).json({ msg: 'Single Product Found', product });
      } catch (error) {
        res.status(400).json({ errorMsg: error.message });
      }
  }
}
