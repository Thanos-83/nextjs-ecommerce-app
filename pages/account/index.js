import { useSession, getSession } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth/next';
import Layout from '../../components/Layout';
import { authOptions } from '../api/auth/[...nextauth]';

function Account() {
  const { data: session, status } = useSession();
  console.log(session, status);

  return (
    <Layout>
      <h1 className='text-3xl'>Account Page</h1>
      <h1>Protected Page</h1>
      <p>
        You can view this page because you are signed in. where is the
        footer...?
      </p>
    </Layout>
  );
}

export default Account;

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  console.log(`Insdie getSSP session: ${session?.user?.id}`);

  //========   Alternative protection ==============
  //   const session = await getSession(context);
  //   console.log(`Get session: ${session}`);
  //   console.log(!session);
  //================================================
  if (!session) {
    return {
      redirect: {
        destination: `/account/login?callbackUrl=${process.env.URL}`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
