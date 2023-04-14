import { NextResponse } from 'next/server';
import Product from '../../../../../models/product';
import connectdb from '../../../../../database/connectDB';

connectdb();

// @desc    Fetch products of cetrain category
// @route   GET /api/products/category/categoryId
// @access  Public
export async function GET(req) {
  const categoryId = req.url.slice(req.url.lastIndexOf('/') + 1);

  try {
    // console.log(categoryId);
    const categoryProducts = await Product.find({ category: categoryId });

    if (!categoryProducts) {
      throw new Error('Products NOT found!');
    }

    return NextResponse.json({ categoryProducts, categoryId });
  } catch (error) {
    return NextResponse.json({ errorMsg: error.message });
  }
}
