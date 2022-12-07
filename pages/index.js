import Head from 'next/head';
import Layout from '../components/Layout';
export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Dashboard homepage' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <h1 className='text-3xl'>This is the home page</h1>
      </Layout>
    </>
  );
}
