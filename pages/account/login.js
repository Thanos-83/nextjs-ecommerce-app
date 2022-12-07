import Layout from '../../components/Layout';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(password);
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

  return (
    <Layout>
      <h1 className='text-2xl text-center mt-12'>Login Page Frontend</h1>
      <form
        onSubmit={handleSubmit}
        className=' mt-6 w-[90%] max-w-xl mx-auto bg-slate-100 p-10'>
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
    </Layout>
  );
}

export default Login;
