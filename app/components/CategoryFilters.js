'use client';

import React from 'react';

function CategoryFilters({ categories }) {
  return (
    <div>
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
  );
}

export default CategoryFilters;
