// 'use client';
import axios from 'axios';

import React from 'react';

async function fetchProducts() {
  const response = await fetch(
    'http://localhost:3000/api/dashboard/productsRoutes',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    // { cache: 'no-store' }
    // { next: { revalidate: 60 } }
  );
  // console.log('products response: ', response);

  const products = await response.json();
  // console.log('products: ', products);
  return products;
}

async function Products() {
  //   useEffect(() => {
  //     // axios
  //     //   .get('/api/dashboard/productsRoutes')
  //     //   .then((res) => console.log('products: ', res))
  //     //   .catch((error) => console.log(error));

  //     fetch('http://localhost:3000/api/dashboard/productsRoutes', {
  //       method: 'GET',
  //     })
  //       .then((res) => res.json())
  //       .then((products) => console.log(products))
  //       .catch((error) => console.log(error.message));
  //   }, []);
  const products = await fetchProducts();
  console.log('products from api folder: ', products);
  return <div>Products</div>;
}

export default Products;
