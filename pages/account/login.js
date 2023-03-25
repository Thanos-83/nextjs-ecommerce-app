import Layout from '../../components/Layout';
import { useState } from 'react';
import { useSession, getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button, Divider } from '@mui/material';

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data, status } = useSession();
  console.log('Session: ', data, status);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(password);
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/',
    });
    // const result = await signIn('email', { email });
    console.log(result);
    if (result.ok) {
      router.push(result.url);
    }
    console.log('here login...');
    console.log(result.error);
  };

  const handleGoogleLogin = async () => {
    signIn('google', { callbackUrl: process.env.NEXT_PUBLIC_URL });
  };

  // const handleGithubLogin = async () => {
  //   signIn('github', { callbackUrl: process.env.NEXT_PUBLIC_URL });
  // };

  return (
    <Layout>
      <h1 className='text-2xl text-center mt-12'>Login Page</h1>
      <div className='mt-6 w-[90%] max-w-xl mx-auto bg-slate-100 p-10'>
        <form onSubmit={handleSubmit} className=' mt-6 mx-auto bg-slate-100'>
          <div className='mb-6 flex flex-col justify-start'>
            <label htmlFor='email'>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              name='email'
              placeholder='email'
              value={email}
              className='py-4 px-2 mt-4 bg-transparent border border-indigo-300 focus:border-indigo-900 rounded-md  outline-none'
            />
            <small>Email Validation</small>
          </div>
          <div className='mb-6 flex flex-col justify-start'>
            <label htmlFor='password'>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              name='email'
              placeholder='password'
              value={password}
              className='py-4 px-2 mt-4 bg-transparent border border-indigo-300 focus:border-indigo-900 rounded-md outline-none'
            />
            <small>Password Validation</small>
          </div>
          <button
            type='submit'
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'>
            Submit
          </button>
        </form>

        <Divider className='my-6' />
        <div className=' flex flex-col items-center justify-center space-y-4'>
          <Button
            variant='outlined'
            fullWidth
            type='button'
            onClick={handleGoogleLogin}>
            Sing In with Google
          </Button>
          {/* <button type='button' onClick={handleGithubLogin}>
          Sing In with Github
        </button> */}
        </div>
      </div>
    </Layout>
  );
}

export default Login;
