import connectdb from '../database/connectDB';
import Category from '../models/category';
import Product from '../models/product';
import Categories from '../models/category';
import Attributes from '../models/attributes';
import Terms from '../models/terms';

export async function fetchProductsByCategory(categoryName) {
  connectdb();

  try {
    // console.log('Category Name: ', categoryName);

    const categoryProducts = await Category.findOne({
      slug: categoryName,
    }).populate({
      path: 'products',
      // select: 'name',
      model: Product,
    });

    if (!categoryProducts) {
      throw new Error('Products NOT found!');
    }
    // console.log('category products: ', categoryProducts);
    return {
      // test: session.views,
      msg: 'Products found...',
      categoryProducts: categoryProducts.products,
    };
  } catch (error) {
    return { errorMsg: error.message };
  }
}

export async function fetchSingleProduct(productSKU) {
  connectdb();

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

    return { msg: 'Single Product Found', product };
  } catch (error) {
    return { errorMsg: error.message };
  }
}

export async function fetchAllProducts() {
  connectdb();
  try {
    const products = await Product.find({})
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

    console.log('fetch all products: ', products);
    if (!products) {
      throw new Error('No Products Found!');
    }
    // return NextResponse.json({ msg: 'Products Found', products });
    return { msg: 'Products Found', products };
  } catch (error) {
    return { errorMsg: error.message };
    // return NextResponse.json({ errorMsg: error.message });
  }
}
