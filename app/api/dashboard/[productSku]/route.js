import { NextResponse } from 'next/server';
import Category from '../../../../models/category';
import Attributes from '../../../../models/attributes';
import Product from '../../../../models/product';
import connectdb from '../../../../database/connectDB';

export async function GET(req) {
  const {
    query: { productSKU },
  } = req;
  console.log('server query params: ', req.query);

  // let res = NextResponse.next();
  // @desc    Fetch single products using SKU
  // @route   GET /api/dashboard/[Sku]
  // @access  Private
  try {
    // console.log('Product SKU: ', productSKU);
    const product = await Product.findOne({ sku: productSKU })
      .populate({
        path: 'category',
        model: Category,
      })
      .populate({
        path: 'attributes',
        model: Attributes,
        populate: {
          path: 'terms',
          model: Terms,
        },
      });

    // console.log('Server Product: ', product);

    if (!product) {
      throw new Error('Product NOT found!');
    }

    return NextResponse.json({ msg: 'Single Product Found', product });
  } catch (error) {
    return NextResponse.json({ errorMsg: error.message });
  }
}
