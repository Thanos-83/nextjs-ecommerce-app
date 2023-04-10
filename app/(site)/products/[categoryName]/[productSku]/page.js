import React from 'react';
import RowContainer from '../../../../components/ui/RowContainer';

async function getSingleProduct(sku) {
  const response = await fetch(
    `http://localhost:3000/api/dashboard/${sku}`,
    { method: 'GET' }
    // { next: { revalidate: 20 } }
  );

  const singleProduct = await response.json();
  console.log('singleProduct: ', singleProduct);
  return singleProduct.categoryProducts;
}

async function SingleProduct({ params }) {
  const { categoryName, productSku } = params;

  console.log('single product params: ', productSku.split('-')[1]);

  const singleProduct = await getSingleProduct(productSku.split('-')[1]);

  console.log('single product: ', singleProduct);

  const url = params.productSku.split('-');
  const skuIndex = url.length;
  // console.log('sku url: ', skuIndex);
  return (
    <RowContainer>
      <p>Product SKU: {url[skuIndex - 1]}</p>
    </RowContainer>
  );
}

export default SingleProduct;

// export async function generateStaticParams(options) {
//   console.log('generate static params: ', options);
//   const response = await fetch(
//     `http://127.0.0.1:3000/api/products/categoryName/${options.params.categoryName}`
//   );
//   console.log('products in generate static params: ', response);

//   const products = await response.json();
//   return products.map((product) => ({
//     categoryName: params.categoryName,
//     productSku: product.sku,
//   }));
// }
