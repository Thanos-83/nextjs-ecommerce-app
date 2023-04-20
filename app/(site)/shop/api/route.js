import { NextResponse } from 'next/server';
import Product from '../../../../models/product';
import connectdb from '../../../../database/connectDB';
import Categories from '../../../../models/category';
import Attributes from '../../../../models/attributes';
import Terms from '../../../../models/terms';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export async function GET(req) {
  // const { searchParams } = new URL(req.url);
  const searchParams = req.nextUrl.searchParams;

  // const page = searchParams.get('page');
  console.log('searchParams in route file: ', searchParams);
  connectdb();
  const productsPerPage = 1;
  try {
    const numberOfProducts = await Product.countDocuments();
    const products = await Product.find()
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
      .skip(2)
      .sort({ createdAt: 'desc' })
      .limit(productsPerPage);
    // .exec();

    console.log('fetch all products: ', products.length);
    if (!products) {
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
