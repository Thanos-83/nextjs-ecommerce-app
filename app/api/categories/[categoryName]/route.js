import { NextResponse } from 'next/server';

import Product from '../../../../models/product';
import Category from '../../../../models/category';
import connectdb from '../../../../database/connectDB';

// export async function GET(req) {
//   const x = new URL(req.url);
//   // const categoryName = searchParams.get('categoryName');
//   // const {
//   //   query: { categoryName },
//   // } = req;
//   console.log('pathname: ', x.pathname.split('/'));
//   // console.log('category : ', categoryName);

//   console.log('category name: ', x.pathname.split('/')[3]);

//   return NextResponse.json({ message: 'You hit the api', request: 'fsdfsdf' });
// }

export async function GET(req) {
  const url = new URL(req.url);
  const pathArray = url.pathname.split('/');
  const categoryName = pathArray[pathArray.length - 1];
  connectdb();
  // const { searchParams } = new URL(req.url);
  // console.log('search params in server GET method: ', searchParams);
  // const categoryName = searchParams.get('categoryName');
  // const {
  //   query: { categoryName },
  // } = req;

  // @desc    Fetch products of cetrain category
  // @route   GET /api/categories/[categoryName]
  // @access  Public
  try {
    console.log('category name: ', categoryName);

    const categoryProducts = await Category.findOne({
      slug: categoryName,
    }).populate({
      path: 'products',
      // select: 'name',
      model: Product,
    });
    console.log('category products: ', categoryProducts);

    if (!categoryProducts) {
      throw new Error('Products NOT found!');
    }
    return NextResponse.json(categoryProducts.products);
  } catch (error) {
    return NextResponse.json(error);
  }
}
