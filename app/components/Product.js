'use client';
import Image from 'next/image';
import React from 'react';
import Currency from 'react-currency-formatter';
import Link from 'next/link';

function Product({ product }) {
  //   console.log(product);
  return (
    <div className=''>
      <Link href='#' className='group'>
        <div className='aspect-square w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7  h-[400px]'>
          <Image
            src={product.featuredImage}
            alt={product.name}
            width={800}
            height={800}
            className='h-full w-full aspect-square object-center group-hover:opacity-75 object-contain'
          />
        </div>
        <h3 className='mt-4 text-lg font-semibold text-gray-700'>
          {product.name}
        </h3>
        <p className='mt-1 text-lg font-semibold text-gray-900'>
          <Currency quantity={product.price} currency='EUR' />
        </p>
      </Link>
      <div className='mt-4'>
        <button className='text-center bg-indigo-500 text-slate-50 font-semibold w-full py-2 hover:bg-indigo-600'>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Product;
