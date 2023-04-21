// import React from 'react';
// import axios from 'axios';
import RowContainer from '../components/ui/RowContainer';
import Link from 'next/link';
import Image from 'next/image';
// import connetdb from '../../database/connectDB';
// import Product from '../../models/product';
// import Category from '../../models/category';
import getCategories from '../../lib/getCategories';

export const revalidate = 60;

export const metadata = {
  title: 'Home page',
  description: 'Home page of the ecoomerce-app',
};

export default async function Home() {
  const categories = await getCategories();
  // console.log('Categories in app folder: ', categories);
  return (
    <RowContainer>
      <div className='my-12 '>
        <h2 className='text-2xl font-bold text-gray-900'>Shop by Category</h2>
        <div className='mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 lg:gap-y-4'>
          {categories?.map((category) => (
            <div key={category._id}>
              <div className='group relative'>
                <div className='relative w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75'>
                  <Image
                    src='https://via.placeholder.com/600x400'
                    alt={category.slug}
                    width={400}
                    height={500}
                    className='h-full w-full object-cover object-center'
                  />
                </div>
                <div className='p-4 mt-1'>
                  <h3 className='text-lg font-semibold text-gray-500'>
                    <Link href={`/products/${category.slug}`}>
                      <span className='absolute inset-0' />
                      {category.name}
                    </Link>
                  </h3>
                  <p className='text-base font-semibold text-gray-500 '>
                    Number of Products {category.products.length}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RowContainer>
  );
}
