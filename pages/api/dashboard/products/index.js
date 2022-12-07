import connectdb from '../../../../database/connectDB';
import Product from '../../../../models/product';
import Categories from '../../../../models/category';
import Attributes from '../../../../models/attributes';
import Terms from '../../../../models/terms';

connectdb();

export default async function productActions(req, res) {
  const { method } = req;

  switch (method) {
    // @desc    Fetch all products from the DB
    // @route   GET /api/dashboard/products
    // @access  Private
    case 'GET':
      try {
        const products = await Product.find().populate({
          path: 'category',
          select: 'name',
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
    // @route   POST /api/dashboard/products
    // @access  Private
    case 'POST':
      try {
        // console.log(req.body);
        const {
          user,
          name,
          sku,
          type,
          isFeatured,
          featuredImage,
          imageGallery,
          brand,
          category,
          description,
          shortDescription,
          tags,
          reviews,
          rating,
          numReviews,
          price,
          salesPrice,
          crosSells,
          upSells,
          countInStock,
          inStock,
          attributes,
        } = req.body;
        // console.log('Product Attributes: ', attributes);
        const singleCategory = await Categories.findById(category);

        const isProductUnique = await Product.find({ sku });
        // console.log(isProductUnique);
        if (isProductUnique.length !== 0) {
          throw new Error('Product already exists!');
        }
        const newProduct = {
          user,
          name,
          sku,
          type,
          isFeatured,
          featuredImage,
          imageGallery,
          brand,
          category,
          description,
          shortDescription,
          tags,
          reviews,
          rating,
          numReviews,
          price,
          salesPrice,
          crosSells,
          upSells,
          countInStock,
          inStock,
          attributes,
        };

        const productCreated = await Product.create(newProduct);
        singleCategory.products = [
          ...singleCategory.products,
          productCreated._id,
        ];

        singleCategory.save();

        res.status(200).json({ msg: 'response', product: productCreated });
      } catch (error) {
        res.status(400).json({ msg: 'Error', errorMsg: error.message });
      }
      break;
    // @desc    Delete product
    // @route   DELETE /api/dashboard/products
    // @access  Private
    case 'DELETE':
      try {
        const { productID } = req.body;

        console.log('Product ID type: ', typeof productID);
        if (typeof productID === 'string') {
          // console.log('iam here string');
          const deletedProduct = await Product.findByIdAndDelete(productID);

          if (!deletedProduct) {
            throw new Error('Product NOT found');
          }
          console.log(deletedProduct);
          res.status(200).json({ msg: 'Product deleted', deletedProduct });
        }

        if (typeof productID === 'object') {
          // console.log('iam here object');
          const deletedProducts = await Product.deleteMany({
            _id: { $in: productID },
          });

          if (!deletedProducts) {
            throw new Error('Product/s NOT found');
          }
          console.log(deletedProducts);
          res.status(200).json({ msg: 'Products deleted', deletedProducts });
        }
      } catch (error) {
        res
          .status(401)
          .json({ msg: 'Error deleting product', errorMsg: error.message });
      }
      break;
    default:
      res.status(400).json({ msg: 'Error', errorMsg: 'Internal Server Error' });
      break;
  }
}
