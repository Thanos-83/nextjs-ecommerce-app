import React from 'react';
import RowContainer from '../../../components/design_components/RowContainer';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Button } from '@mui/material';
function ShopByCategories({ products }) {
  const router = useRouter();
  console.log(router.query);
  const productLink = router.query.shopCategories.join().replaceAll(',', '/');
  const handleAddToCart = (productID) => {
    alert('clicked');
    // document.cookie(`productID = ${productID}`);
  };

  return (
    <Layout>
      <RowContainer>
        <ul className='products_grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 my-8'>
          {products?.map((product) => (
            <li key={product._id} className='shadow p-2'>
              <Link
                href={`/products/${productLink}/${product.name.replaceAll(
                  ' ',
                  '-'
                )}/${product.sku}`}
                passHref
                legacyBehavior>
                <a>
                  <div className='singleProduct_imageContainer relative w-full h-[22rem] rounded overflow-hidden'>
                    <Image
                      src={product.featuredImage}
                      // width='200'
                      // height='200'
                      layout='fill'
                      alt='featured image'
                    />
                  </div>
                  <p className='text-md font-medium my-4'>{product.name}</p>
                </a>
              </Link>
              {product?.attributes.length > 0 ? (
                <Link
                  href={`/products/${productLink}/${product.name.replaceAll(
                    ' ',
                    '-'
                  )}/${product.sku}`}
                  passHref
                  legacyBehavior>
                  {/* <a> */}
                  <Button
                    fullWidth
                    variant='contained'
                    color='secondary'
                    size='small'>
                    Select
                  </Button>
                  {/* </a> */}
                </Link>
              ) : (
                <Button
                  fullWidth
                  variant='contained'
                  color='success'
                  size='small'
                  onClick={() => handleAddToCart(product._id)}>
                  Add to cart
                </Button>
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
