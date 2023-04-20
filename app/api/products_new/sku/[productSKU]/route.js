import { NextResponse } from 'next/server';
import Product from '../../../../../models/product';
import connectdb from '../../../../../database/connectDB';
import Categories from '../../../../../models/category';
import Attributes from '../../../../../models/attributes';
import Terms from '../../../../../models/terms';

connectdb();
// @desc    Fetch single product by SKU
// @route   GET /api/products/sku/:productSKU
// @access  Public
export async function GET(req) {
  const productSKU = req.url.slice(req.url.lastIndexOf('/') + 1);

  try {
    // console.log('Product SKU: ', productSKU);
    const product = await Product.findOne({ sku: productSKU })
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
