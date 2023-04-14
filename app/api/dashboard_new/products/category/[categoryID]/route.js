import { NextResponse } from 'next/server';
import Product from '../../../../../../models/product';
import connectdb from '../../../../../../database/connectDB';

// @desc    Fetch products of specific category
// @route   GET /api/dashboard/products/category/[categoryID]
// @access  Private
export async function GET(req) {
  connectdb();

  const categoryID = req.url.slice(req.url.lastIndexOf('/') + 1);

  try {
    console.log(categoryID);

    const product = await Product.find({
      category: { $in: categoryID },
    }).populate('category');
    //   .populate('attributes')
    //   .populate('tags');
    // console.log(product);
    // console.log(product.attributes[0]?.terms);
    if (!product) {
      throw new Error('Product NOT found!');
    }

    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ errorMsg: error.message });
  }
}
