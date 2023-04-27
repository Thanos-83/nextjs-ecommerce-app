import { NextResponse } from 'next/server';
import Product from '../../../../../models/product';
import Category from '../../../../../models/category';
import connectdb from '../../../../../database/connectDB';

connectdb();

// @desc    Fetch product of cetrain category
// @route   GET /api/products/category/categoryId
// @access  Public
export async function GET(req) {
  const categoryName = req.url.slice(req.url.lastIndexOf('/') + 1);

  try {
    const categoryProducts = await Category.findOne({
      slug: categoryName,
    }).populate({
      path: 'products',
      // select: 'name',
      model: Product,
    });
    // console.log('category products: ', categoryProducts);

    if (!categoryProducts) {
      throw new Error('Products NOT found!');
    }
    return NextResponse.json({
      // test: session.views,
      msg: 'Products found...',
      categoryProducts: categoryProducts.products,
    });
  } catch (error) {
    return NextResponse.json({ errorMsg: error.message });
  }
}
