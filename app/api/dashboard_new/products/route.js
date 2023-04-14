import { NextResponse } from 'next/server';
import connectdb from '../../../../database/connectDB';
import Product from '../../../../models/product';
import Category from '../../../../models/category';
import Attributes from '../../../../models/attributes';
import Terms from '../../../../models/terms';

// @desc    Fetch all products from the DB
// @route   GET /api/dashboard/products
// @access  Private
export async function GET() {
  connectdb();

  try {
    // console.log('iam fetching products...');

    const products = await Product.find().populate({
      path: 'category',
      select: 'name',
      model: Category,
    });
    // console.log('iam fetching products...');
    // console.log(products);
    if (products.length === 0) {
      throw new Error('There are NO products');
    }
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ msg: 'Error', errorMsg: error.message });
  }
}

// @desc    Add product to the DB
// @route   POST /api/dashboard/products
// @access  Private
export async function POST(req) {
  connectdb();

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
      slug,
      attributes,
    } = await req.json();
    // console.log('Product Attributes: ', attributes);
    // console.log('Product Gallery: ', imageGallery);
    const singleCategory = await Category.findById(category);

    const isProductUnique = await Product.find({ sku });
    // console.log(isProductUnique);
    if (isProductUnique.length !== 0) {
      throw new Error('Product already exists!');
    }
    const newProduct = {
      user,
      name,
      slug,
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
    singleCategory.products = [...singleCategory.products, productCreated._id];

    singleCategory.save();

    return NextResponse.json({ msg: 'response', product: productCreated });
  } catch (error) {
    return NextResponse.json({ msg: 'Error', errorMsg: error.message });
  }
}

// @desc    Delete product
// @route   DELETE /api/dashboard/products
// @access  Private
export async function DELETE(req) {
  connectdb();

  try {
    const { productID } = await req.json();

    console.log('Product ID type: ', typeof productID);
    if (typeof productID === 'string') {
      // console.log('iam here string');
      const singleProduct = await Product.findById(productID);
      const singleCategory = await Category.findById(singleProduct.category);

      console.log('single category from delete: ', singleCategory.products[0]);
      const singleCategoryProducts = singleCategory.products.filter(
        (product) => product.valueOf() !== productID
      );

      singleCategory.products = singleCategoryProducts;
      console.log('single category updated from delete: ', singleCategory);

      singleCategory.save();

      const deletedProduct = await Product.findByIdAndDelete(productID);

      if (!deletedProduct) {
        throw new Error('Product NOT found');
      }
      console.log(deletedProduct);
      return NextResponse.json({ msg: 'Product deleted', deletedProduct });
    }

    if (typeof productID === 'object') {
      // console.log('iam here object');
      const deletedProducts = await Product.deleteMany({
        _id: { $in: productID },
      });

      if (!deletedProducts) {
        throw new Error('Product/s NOT found');
      }
      // console.log(deletedProducts);
      return NextResponse.json({ msg: 'Products deleted', deletedProducts });
    }
  } catch (error) {
    res
      .status(401)
      .json({ msg: 'Error deleting product', errorMsg: error.message });
  }
}
