import Head from 'next/head';
import { useEffect, useState } from 'react';
import RowContainer from '../components/design_components/RowContainer';
import Layout from '../components/Layout';
import axios from 'axios';
import Link from 'next/link';
export default function Home({ categories }) {
  const [productCategories, setProductCategories] = useState([]);
  useEffect(() => {
    axios
      .get('/api/dashboard/categories')
      .then((res) => setProductCategories(res.data));
  }, []);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='homepage' content='Eshop homepage' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <RowContainer>
          <h1 className='text-3xl'>This is the home page</h1>
          <ul>
            {categories?.map((category) => (
              <li key={category._id}>
                <Link href={`/shop/${category.slug}`}>{category.name}</Link>
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
  // console.log('Categories: ', categories.data.categories);
  return {
    props: {
      categories: categories.data.categories,
    },
  };
}
