import Head from 'next/head';
import { useEffect, useState } from 'react';
import RowContainer from '../components/design_components/RowContainer';
import Layout from '../components/Layout';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
export default function Home({ categories }) {
  // const [productCategories, setProductCategories] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('/api/dashboard/categories')
  //     .then((res) => setProductCategories(res.data));
  // }, []);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='homepage' content='Eshop homepage' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <RowContainer>
          <h1 className='text-3xl my-8'>This is the home page</h1>
          <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {categories?.map((category) => (
              <li key={category._id} className='relative'>
                <Link
                  href={`/shop/${category.slug}`}
                  passHref={true}
                  legacyBehavior>
                  <a>
                    <Image
                      alt='image gallery'
                      src={'https://via.placeholder.com/300.png'}
                      width={300}
                      height={300}
                      // layout='fill'
                      objectFit='contain'
                    />
                    <p className='text-lg  font-semibold'>{category.name}</p>
                  </a>
                </Link>
                <p>{category.products.length} Products</p>
              </li>
            ))}
          </ul>
        </RowContainer>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const categories = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/dashboard/categories`
  );
  console.log('Categories: ', categories.data);
  return {
    props: {
      categories: categories.data,
    },
  };
}
