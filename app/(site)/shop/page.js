import RowContainer from '../../components/ui/RowContainer';
import Product from '../../components/Product';
import Paginate from '../../components/Paginate';
import CategoryFilters from '../../components/CategoryFilters';
// import { fetchAllProducts } from '../../../lib/fetchProducts';
export const metadata = {
  title: 'shop page',
  desrcitpion: 'products page',
};

async function fetchAllProducts(page = 1) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/products_new?page=${page}`,
    // `${process.env.NEXT_PUBLIC_URL}/shop/api`,
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
  console.log('params in shop page: ', searchParams);
  if (searchParams === {}) {
    var [products, categories] = await Promise.all(
      fetchAllProducts(),
      fetchAllCategories()
    );
  } else {
    // var products = await fetchAllProducts(searchParams.page);
    var [products, categories] = await Promise.all(
      fetchAllProducts(searchParams.page),
      fetchAllCategories()
    );
  }
  // const categories = await fetchAllCategories();
  console.log('Categories in Shop page: ', categories);
  // console.log('Products in Shop page: ', products.products.length);
  return (
    <RowContainer>
      <div className='flex gap-8 mt-12'>
        <div className='w-[25%]'>
          <h1>Filters</h1>
          {/* <CategoryFilters categories={categories} /> */}
          <p className='text-lg font-semibold border-b py-2 mb-2'>Pategories</p>
          <ul className='space-y-2'>
            {categories?.categories.map((category) => (
              <li key={category._id}>
                <button>
                  {category.name} <span>({category?.products.length})</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className='w-[75%]'>
          <h1 className='mb-8'>Products grid</h1>
          <div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {products.products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
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
