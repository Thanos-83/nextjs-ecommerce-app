import React from 'react';
import RowContainer from '../../../components/design_components/RowContainer';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
function ShopByCategories({ products }) {
  const router = useRouter();
  console.log(router.query);
  const productLink = router.query.shopCategories.join().replaceAll(',', '/');
  // console.log(productLink);
  // console.log('Products: ', products);
  return (
    <Layout>
      <RowContainer>
        <ul>
          {products?.map((product) => (
            <li key={product._id}>
              <div className='singleProduct_imageContainer'>
                <Image
                  src={product.featuredImage}
                  width='200'
                  height='200'
                  alt='featured image'
                />
              </div>
              <p>
                <Link
                  href={`/products/${productLink}/${product.name.replaceAll(
                    ' ',
                    '-'
                  )}/${product.sku}`}>
                  {product.name}
                </Link>
              </p>
              {product?.attributes.length > 0 ? (
                <Link href={'#'}>
                  <a> Select </a>
                </Link>
              ) : (
                <button>Add to cart </button>
              )}
            </li>
          ))}
        </ul>
      </RowContainer>
    </Layout>
  );
}

export default ShopByCategories;

export async function getServerSideProps(context) {
  // const router = useRouter();
  // console.log('getSSP: ', context.query.shopCategories[0]);

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/products/categoryName/${context.query.shopCategories[0]}`
  );

  const products = response.data.categoryProducts;
  // console.log('Server response: ', response.data.categoryProducts);

  return {
    props: {
      products,
    },
  };
}
