'use client';
import Image from 'next/image';

import React from 'react';

function Product({ product }) {
  //   console.log(product);
  return (
    <div>
      <div className=''>
        <Image
          src={product.featuredImage}
          width={1000}
          height={500}
          alt={product.name}
          className='object-cover'
        />
      </div>
      {product.name}
    </div>
  );
}

export default Product;
