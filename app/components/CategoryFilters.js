'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
function CategoryFilters({ categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryFilter = (category) => {
    // console.log('pagination value: ', category);
    // if (searchParams.has('page')) {
    //   // let pageNumber = searchParams.get('page');
    //   router.push(`/shop?category=${category}`);
    //   return;
    // }
    router.push(`/shop?category=${category}`);
  };
  return (
    <div>
      <p className='text-lg font-semibold border-b py-2 mb-2'>Pategories</p>
      <ul className='space-y-2'>
        {categories?.categories.map((category) => (
          <li key={category._id}>
            <button
              className='w-full text-left'
              onClick={() => handleCategoryFilter(category.slug)}>
              {category.name}{' '}
              <span className=''>({category?.products.length})</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryFilters;
