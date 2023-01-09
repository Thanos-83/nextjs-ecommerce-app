import Product from '../../../../models/product';
import connectdb from '../../../../database/connectDB';
import Attributes from '../../../../models/attributes';
import Category from '../../../../models/category';
connectdb();

export default async function productActionsById(req, res) {
  const {
    method,
    query: { productId },
  } = req;

  switch (method) {
    // @desc    Fetch single product from the DB
    // @route   GET /api/dashboard/products
    // @access  Public
    case 'GET':
      try {
        // console.log(productId);
        const product = await Product.findById(productId)
          .populate({
            path: 'attributes',
            select: 'name',
            model: Attributes,
          })
          .populate({
            path: 'category',
            select: 'name',
            model: Category,
          });
        // .populate('tags');
        // console.log(product);
        if (!product) {
          throw new Error('Product NOT found!');
        }

        res.status(200).json({ product });
      } catch (error) {
        res.status(400).json({ errorMsg: error.message });
      }
      break;
    // @desc    Update single product
    // @route   PUT /api/dashboard/products/productId
    // @access  Private
    case 'PUT':
      try {
        const productToUpdate = await Product.findById(productId).populate(
          'attributes'
        );
        const {
          user,
          name,
          sku,
          // type,
          isFeatured,
          featuredImage,
          imageGallery,
          brand,
          category,
          description,
          shortDescription,
          // tags,
          // reviews,
          // rating,
          // numReviews,
          price,
          // salesPrice,
          // crosSells,
          // upSells,
          // countInStock,
          // inStock,
          attributes,
        } = req.body.product;
        console.log('category 1: ', productToUpdate.category._id.valueOf());
        console.log('category 2: ', category);
        console.log(productToUpdate.category._id.valueOf() !== category);
        if (productToUpdate.category._id.valueOf() !== category) {
          const findCategory = await Category.findById(
            productToUpdate.category._id.valueOf()
          );
          console.log('Cat products: ', findCategory.products);
          const newCategoryProducts = findCategory.products.filter(
            (product) => product.valueOf() !== productId
          );
          findCategory.products = newCategoryProducts;
          findCategory.save();
          const singleCategory = await Category.findById(category);
          singleCategory.products = [...singleCategory.products, productId];

          singleCategory.save();
        }

        if (!productToUpdate) {
          throw new Error('Product NOT found!');
        }

        productToUpdate.name = name;
        productToUpdate.brand = brand;
        productToUpdate.category = category;
        productToUpdate.description = description;
        productToUpdate.shortDescription = shortDescription;
        productToUpdate.price = price;
        productToUpdate.featuredImage = featuredImage;
        productToUpdate.imageGallery = imageGallery;
        productToUpdate.user = user;
        productToUpdate.sku = sku;
        productToUpdate.isFeatured = isFeatured;
        productToUpdate.attributes = attributes;

        const updatedProduct = await productToUpdate.save();

        res
          .status(200)
          .json({ msg: 'Product updated', product: updatedProduct });
      } catch (error) {
        res.status(400).json({ errorMsg: error.message });
      }
      break;
    // @desc    Delete single product
    // @route   DELETE /api/dashboard/products/productId
    // @access  Private
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
