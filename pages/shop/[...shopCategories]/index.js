import React, { useState, useEffect } from 'react';
import RowContainer from '../../../components/design_components/RowContainer';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../features/basketItems/cartItemsSlice';
import { useSession } from 'next-auth/react';
// import cookies from 'js-cookie'; //can read cookie when it is not httpOnly
import { getSession } from '../../../utils/get-session';
function ShopByCategories() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [categoryProducts, setCategoryProducts] = useState([]);
  const [productLink, setProductLink] = useState([]);
  const { data: session, status } = useSession();
  console.log('Session: ', session, 'Status: ', status);

  console.log('router: ', router);
  // const productLink = router?.query?.shopCategories.join('/');
  // .replaceAll(',', '/');
  const handleAddToCart = (productData) => {
    // console.log(productData);
    dispatch(addToCart(productData));
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_URL}/api/products/categoryName/${router.query.shopCategories[0]}`
      )
      .then((response) => {
        setCategoryProducts(response.data.categoryProducts);

        setProductLink(router?.query?.shopCategories.join('/'));
      })
      .catch((error) =>
        console.log('Error fetching category products: ', error)
      );
  }, []);

  return (
    <Layout>
      <RowContainer>
        <ul className='products_grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 my-8'>
          {categoryProducts?.map((product) => (
            <li key={product._id} className='shadow flex flex-col p-2'>
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
              <div className='mt-auto'>
                {product?.type === 'Variable' ? (
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
                    onClick={() =>
                      handleAddToCart({
                        productID: product._id,
                        image: product.featuredImage,
                        quantity: 1,
                        title: product.name,
                        price: product.price,
                        productType: product.type,
                        customer: session ? session.user.id : null,
                      })
                    }>
                    Add to cart
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </RowContainer>
    </Layout>
  );
}

export default ShopByCategories;

// export async function getServerSideProps(context) {
//   // const response = await axios.get(
//   //   `${process.env.NEXT_PUBLIC_URL}/api/products/categoryName/${context.query.shopCategories[0]}`
//   // );

//   // const products = response.data.categoryProducts;
//   // // console.log('Server response: ', response.data.categoryProducts);

//   return {
//     props: {
//       products,
//     },
//   };
// }
