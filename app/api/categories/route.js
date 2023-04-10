import { NextResponse } from 'next/server';
import Category from '../../../models/category';
import Product from '../../../models/product';
import connectdb from '../../../database/connectDB';

export async function GET(req) {
  connectdb();

  // @desc    Get All Categories
  // @route   GET /api/dashboard/categories
  // @access  Private
  try {
    console.log('iam fetching categories...');
    const categories = await Category.find().populate({
      path: 'products',
      select: '_id name',
      model: Product,
    });
    console.log('categories from API server: ', categories);
    return NextResponse.json(categories);
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}
