import React from 'react';
import axios from 'axios';
import RowContainer from '../../../components/ui/RowContainer';
import Image from 'next/image';
import Link from 'next/link';
import Currency from 'react-currency-formatter';

async function fetchProducts(categoryName) {
  const response = await fetch(
    `http://localhost:3000/api/categories/${categoryName}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    { next: { revalidate: 20 } }
  );

  try {
    console.log('parse response: ', response);
    const categoryProducts = await response.json();
    console.log('response data of category products...? ', categoryProducts);
    return categoryProducts;
  } catch (error) {
    console.log('Error happened here!');
    console.error(error);
    return error.message;
  }
}

export default async function CategoryProducts({ params }) {
  console.log('params: ', params);

  const products = await fetchProducts(params.categoryName);
  console.log('category products response from the API: ', products);
  return (
    <RowContainer>
      <div className='my-12'>
        <h2 className='text-lg font-semibold mb-6'>Products</h2>
        <div>
          <ul className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
            {products.length === 0 ? (
              <h1>No Products</h1>
            ) : (
              products?.map((product) => (
                <li key={product._id}>
                  <Link
                    href={`/products/${
                      params.categoryName
                    }/${product.name.replace(/\s/g, '-')}-${product.sku}`}
                    className='group'>
                    <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7  h-[400px]'>
                      <Image
                        src={product.featuredImage}
                        alt={product.name}
                        width={800}
                        height={800}
                        className='h-full w-full object-center group-hover:opacity-75 object-contain'
                      />
                    </div>
                    <h3 className='mt-4 text-md font-serif text-gray-700'>
                      {product.name}
                    </h3>
                    <p className='mt-1 text-lg font-semibold text-gray-900'>
                      <Currency quantity={product.price} currency='EUR' />
                    </p>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </RowContainer>
  );
}

// export async function generateStaticParams(options) {
//   // console.log('generate static params category products: ', options);
//   const response = await fetch(
//     'http://127.0.0.1:3000/api/dashboard/categories',
//     { method: 'GET' }
//   );

//   const categories = await response.json();
//   // console.log('categories in generate static params: ', categories);
//   return categories.map((category) => ({
//     categoryName: category.slug.toString(),
//   }));
// }
