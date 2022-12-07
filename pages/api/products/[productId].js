import Product from '../../../models/product';
import connectdb from '../../../database/connectDB';

connectdb();

export default async function productActionsById(req, res) {
  const {
    method,
    query: { productId },
  } = req;

  switch (method) {
    // @desc    Fetch single product from the DB
    // @route   GET /api/products/productId
    // @access  Public
    case 'GET':
      try {
        const product = await Product.findById(productId).populate(
          'attributes'
        );

        if (!product) {
          throw new Error('Product NOT found!');
        }

        res.status(200).json({ product });
      } catch (error) {
        res.status(400).json({ errorMsg: error.message });
      }
      break;
    // @desc    Update single product
    // @route   PUT /api/products/productId
    // @access  Public
    case 'PUT':
      try {
        const productToUpdate = await Product.findById(productId);
        const {
          name,
          brand,
          category,
          description,
          price,
          countInStock,
          featuredImage,
          user,
          sku,
        } = req.body;

        if (!productToUpdate) {
          throw new Error('Product NOT found!');
        }

        productToUpdate.name = name;
        productToUpdate.brand = brand;
        productToUpdate.category = category;
        productToUpdate.description = description;
        productToUpdate.price = price;
        productToUpdate.countInStock = countInStock;
        productToUpdate.featuredImage = featuredImage;
        productToUpdate.user = user;
        productToUpdate.sku = sku;

        const updatedProduct = await productToUpdate.save();

        res
          .status(200)
          .json({ msg: 'Product updated', product: updatedProduct });
      } catch (error) {
        res.status(400).json({ errorMsg: error.message });
      }
      break;
    case 'DELETE':
      try {
        const deletedProduct = await Product.findByIdAndRemove(productId);

        if (!deletedProduct) {
          throw new Error('Product NOT found!');
        }

        res.status(200).json({ msg: 'Product deleted succesfully!' });
      } catch (error) {
        res.status(200).json({ msg: 'Error', errorMsg: error.message });
      }
      break;
    default:
      res.status(200).json({ msg: 'OOPS...! Something went wrong!' });
  }
}
