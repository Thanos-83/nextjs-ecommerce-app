import React from 'react';
import RowContainer from '../../../../components/ui/RowContainer';
import { fetchSingleProduct } from '../../../../../lib/fetchProducts';
import getCategories from '../../../../../lib/getCategories';
import { notFound } from 'next/navigation';
export const revalidate = 60;

async function SingleProduct({ params }) {
  const { categoryName, productSku } = params;

  const singleProduct = await fetchSingleProduct(
    productSku.split('-')[productSku.split('-').length - 1]
  );
  // console.log('single product: ', singleProduct);
  if (singleProduct.errorMsg) {
    notFound();
  }

  return (
    <RowContainer>
      <p>Product SKU: {singleProduct.product.sku}</p>
      <p>Product Name: {singleProduct.product.name}</p>
    </RowContainer>
  );
}

export default SingleProduct;

export async function generateStaticParams() {
  let params = [];
  const categories = await getCategories();
  categories.forEach((category) =>
    category.products.forEach((product) =>
      params.push({ categoryName: category.slug, productSku: product.sku })
    )
  );

  // console.log('params: ', params);
  return params;
}
