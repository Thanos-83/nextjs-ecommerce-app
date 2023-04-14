import connectdb from '../database/connectDB';
import Category from '../models/category';
import Product from '../models/product';

export default async function getCategories() {
  connectdb();
  const categories = await Category.find({}).populate({
    path: 'products',
    select: '_id name sku',
    model: Product,
  });

  return categories;
}
