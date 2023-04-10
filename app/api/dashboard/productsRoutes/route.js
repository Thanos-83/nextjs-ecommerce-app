import { NextResponse } from 'next/server';
import Category from '../../../../models/category';
import Product from '../../../../models/product';
import connectdb from '../../../../database/connectDB';

export async function GET(req) {
  // let res = NextResponse.next();
  // @desc    Fetch all products from the DB
  // @route   GET /api/dashboard/products
  // @access  Private
  try {
    console.log('iam fetching products 1...');
    connectdb();

    const products = await Product.find().populate({
      path: 'category',
      select: 'name',
      model: Category,
    });
    console.log('iam fetching products 2...');
    // console.log('products: ', products);
    if (products.length === 0) {
      throw new Error('There are NO products');
    }
    // NextResponse.json(products);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ msg: 'Error', errorMsg: error.message });
  }
}
