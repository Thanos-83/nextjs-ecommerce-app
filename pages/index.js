import Head from 'next/head';
import { useEffect, useState } from 'react';
import RowContainer from '../components/design_components/RowContainer';
import Layout from '../components/Layout';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { AddNode, DisplayLeafs, SearchNode } from '../utils/test';
export default function Home() {
  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_URL}/api/dashboard/categories`)
      .then((response) => setProductCategories(response.data))
      .catch((error) =>
        console.log('Error fetching product categories: ', error)
      );
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
          <button onClick={() => DisplayLeafs('Computers & Electronics')}>
            click
          </button>
          <h1 className='text-3xl my-8'>This is the home page</h1>
          <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {productCategories?.map((category) => (
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

// export async function getServerSideProps() {
//   // AddNode();
//   // const x = SearchNode('Computers & Electronics');
//   // console.log(x);
//   const categories = await axios.get(
//     `${process.env.NEXT_PUBLIC_URL}/api/dashboard/categories`
//   );
//   // console.log('Categories: ', categories.data);
//   return {
//     props: {
//       categories: categories.data,
//     },
//   };
// }
