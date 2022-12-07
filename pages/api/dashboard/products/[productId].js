import Product from '../../../../models/product';
import connectdb from '../../../../database/connectDB';

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
        const product = await Product.findById(productId)
          .populate('attributes')
          .populate('tags');
        // console.log(product.attributes[0]?.terms);
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
        const productToUpdate = await Product.findById(productId)
          .populate('attributes')
          .populate('tags');
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

        if (!productToUpdate) {
          throw new Error('Product NOT found!');
        }
        // console.log(tags);
        // console.log(productToUpdate);

        productToUpdate.name = name;
        productToUpdate.brand = brand;
        productToUpdate.category = category;
        productToUpdate.description = description;
        productToUpdate.price = price;
        productToUpdate.countInStock = countInStock;
        productToUpdate.featuredImage = featuredImage;
        productToUpdate.user = user;
        productToUpdate.sku = sku;
        productToUpdate.user = user;
        productToUpdate.name = name;
        productToUpdate.sku = sku;
        productToUpdate.type = type;
        productToUpdate.isFeatured = isFeatured;
        productToUpdate.featuredImage = featuredImage;
        productToUpdate.imageGallery = imageGallery;
        productToUpdate.brand = brand;
        productToUpdate.category = category;
        productToUpdate.description = description;
        productToUpdate.shortDescription = shortDescription;
        tags.map((tag, index) => {
          productToUpdate.tags.map((productTag) => {
            if (tag._id === productTag._id.valueOf()) {
              tags.splice(index, 1);
            }
          });
        });
        productToUpdate.tags = [...productToUpdate.tags, ...tags];
        productToUpdate.reviews = reviews;
        productToUpdate.rating = rating;
        productToUpdate.numReviews = numReviews;
        productToUpdate.price = price;
        productToUpdate.salesPrice = salesPrice;
        productToUpdate.crosSells = crosSells;
        productToUpdate.upSells = upSells;
        productToUpdate.countInStock = countInStock;
        productToUpdate.inStock = inStock;
        attributes.map((tag, index) => {
          productToUpdate.attributes.map((productTag) => {
            if (tag._id === productTag._id.valueOf()) {
              attributes.splice(index, 1);
            }
          });
        });
        productToUpdate.attributes = [
          ...productToUpdate.attributes,
          ...attributes,
        ];

        // console.log(productToUpdate.tags);

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
