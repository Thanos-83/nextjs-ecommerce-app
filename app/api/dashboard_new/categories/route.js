import { NextResponse } from 'next/server';

import connectdb from '../../../../database/connectDB';
import Category from '../../../../models/category';
import Product from '../../../../models/product';

// @desc    Get All Categories
// @route   GET /api/dashboard/categories
// @access  Private
export async function GET() {
  connectdb();
  try {
    const categories = await Category.find({}).populate({
      path: 'products',
      // select: '_id name',
      model: Product,
    });
    console.log('categories from API: ', categories);
    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

// @desc    Create New Category
// @route   PUT /api/dashboard/categories
// @access  Private
export async function POST(req) {
  connectdb();

  try {
    const { name, slug, description, parent } = await req.json();
    console.log('Parent typeof: ', typeof parent);
    console.log('category slug: ', slug);

    const categories = await Category.find({});

    const categoryExists = categories.find(
      (category) => category.slug === slug
    );
    console.log('category exists: ', categoryExists);

    if (categoryExists) {
      throw new Error('Category Exists!');
    }

    let newCategory = {};
    if (parent) {
      newCategory = { name, slug, description, parent };
    } else {
      newCategory = { name, slug, description };
    }
    const createdCategory = await Category.create(newCategory);

    return NextResponse.json({ msg: 'Category created', createdCategory });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

// @desc    Delete Category
// @route   DELETE /api/dashboard/categories
// @access  Private
export async function DELETE(req) {
  connectdb();

  try {
    const { categoryID } = await req.json();

    console.log(typeof categoryID);
    if (typeof categoryID === 'string') {
      // console.log('iam here string');
      const deletedCategory = await Category.findByIdAndDelete(categoryID);

      if (!deletedCategory) {
        throw new Error('Category NOT found');
      }
      console.log(deletedCategory);
      return NextResponse.json({ msg: 'Category deleted', deletedCategory });
    }

    if (typeof categoryID === 'object') {
      // console.log('iam here object');
      const deletedCategories = await Category.deleteMany({
        _id: { $in: categoryID },
      });

      if (!deletedCategories) {
        throw new Error('Category/ies NOT found');
      }
      console.log(deletedCategories);
      return NextResponse.json({
        msg: 'Categories deleted',
        deletedCategories,
      });
    }
  } catch (error) {
    return NextResponse.json({
      msg: 'Error deleting category',
      errorMsg: error.message,
    });
  }
}
