import RowContainer from '../../components/ui/RowContainer';
import Product from '../../components/Product';
import Paginate from '../../components/Paginate';
import CategoryFilters from '../../components/CategoryFilters';
// import { fetchAllProducts } from '../../../lib/fetchProducts';
export const metadata = {
  title: 'shop page',
  desrcitpion: 'products page',
};

async function fetchAllProducts(page = 1, category = undefined) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/products_new?page=${page}&category=${category}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    }
  );

  const products = await response.json();

  return products;
}

async function fetchAllCategories() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/categories_new`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    }
  );

  const categories = await response.json();

  return categories;
}

export default async function Shop({ searchParams }) {
  console.log(
    'params in shop page: ',
    searchParams.page,
    searchParams.category
  );
  if (searchParams === {}) {
    var productsData = fetchAllProducts();
  } else {
    var productsData = fetchAllProducts(
      searchParams.page,
      searchParams.category
    );
  }
  const categoriesData = fetchAllCategories();

  var [products, categories] = await Promise.all([
    productsData,
    categoriesData,
  ]);
  // console.log('products in shop page: ', products);
  return (
    <RowContainer>
      <div className='flex gap-8 mt-12'>
        <div className='w-[25%]'>
          <h1>Filters</h1>
          <CategoryFilters categories={categories} />
          {/* <p className='text-lg font-semibold border-b py-2 mb-2'>Pategories</p>
          <ul className='space-y-2'>
            {categories.categories.map((category) => (
              <li key={category._id}>
                <button>
                  {category.name} <span>({category?.products.length})</span>
                </button>
              </li>
            ))}
          </ul> */}
        </div>
        <div className='w-[75%] h-full self-stretch'>
          <h1 className='mb-8'>Products grid</h1>
          <div className='flex flex-col justify-between items-end'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4'>
              {products.errorMsg ? (
                <h1>No Products Found!</h1>
              ) : (
                products.products.map((product) => (
                  <Product key={product._id} product={product} />
                ))
              )}
            </div>
            <div className='mt-8 flex justify-end'>
              <Paginate pages={products.pages} />
            </div>
          </div>
        </div>
      </div>
    </RowContainer>
  );
}
