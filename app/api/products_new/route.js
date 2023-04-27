import { NextResponse } from 'next/server';
import Product from '../../../models/product';
import connectdb from '../../../database/connectDB';
import Categories from '../../../models/category';
import Attributes from '../../../models/attributes';
import Terms from '../../../models/terms';

export const dynamic = 'force-dynamic';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export async function GET(req) {
  // const { searchParams } = new URL(req.url);
  // const searchParams = req.nextUrl.pathname;
  const searchParams = req.nextUrl.searchParams;
  const pageNumber = searchParams.get('page');
  const category = searchParams.get('category');
  console.log('searchParams in route file. PAGE: ', pageNumber);
  console.log('searchParams in route file. CATEGORY: ', category);
  connectdb();
  const productsPerPage = 2;
  try {
    let numberOfProducts;
    let products = [];

    if (category === 'undefined') {
      console.log('there is NO CATEGORY!!!!!');
      numberOfProducts = await Product.countDocuments();
      products = await Product.find()
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
        })
        .limit(productsPerPage)
        .sort({ createdAt: 'desc' })
        .skip(productsPerPage * (pageNumber - 1))
        .exec();
    } else {
      // numberOfProducts = await Product.countDocuments();
      const singleCategory = await Categories.findOne({ slug: category });

      console.log('Single CATEGORY: ', singleCategory);
      numberOfProducts = singleCategory.products.length;

      if (numberOfProducts > 0) {
        products = await Product.find({ category: singleCategory._id })
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
          })
          .limit(productsPerPage)
          .sort({ createdAt: 'desc' })
          .skip(productsPerPage * (pageNumber - 1))
          .exec();

        console.log('single category products: ', products.length);
      } else {
        throw new Error('No Products Found!');
      }
    }

    // console.log('products in route page, PRODUCTS: ', products.length);
    if (products.length === 0) {
      throw new Error('No Products Found!');
    }
    return NextResponse.json({
      msg: 'Products Found',
      products,
      pages: Math.ceil(numberOfProducts / productsPerPage),
    });
  } catch (error) {
    return NextResponse.json({ errorMsg: error.message });
  }
}
