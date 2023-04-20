import { NextResponse } from 'next/server';
import connectdb from '../../../database/connectDB';
import Category from '../../../models/category';
import Product from '../../../models/product';

// @desc    Fetch all categories
// @route   GET /api/categories_new
// @access  Public
export async function GET() {
  connectdb();
  try {
    const categories = await Category.find({}).populate({
      path: 'products',
      select: '_id name slug',
      model: Product,
    });
    // console.log('fetching categories from API folder: ', categories);
    return NextResponse.json({
      categories: categories,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
