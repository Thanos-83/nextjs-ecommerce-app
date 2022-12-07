import Layout from '../../components/Layout';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function Register() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
    };
    const response = await axios.post('/api/user', user);
    console.log(response);
    if (response.statusText !== 'OK') {
      return response.errorMsg;
    }

    setName('');
    setEmail('');
    setPassword('');
    setRepeatPassword('');

    router.push('/account/login');
  };

  return (
    <Layout>
      <h1 className='text-2xl text-center mt-12'>Register Page</h1>
      <form
        onSubmit={handleSubmit}
        className=' mt-6 w-[90%] max-w-xl mx-auto bg-slate-100 p-10'>
        <div className='mb-6 flex flex-col justify-start'>
          <label htmlFor='email'>Username</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type='text'
            name='name'
            placeholder='name'
            value={name}
            className='py-4 px-2 mt-4 bg-transparent border border-indigo-300 focus:border-indigo-900 rounded-md  outline-none'
          />
          <small>Username Validation</small>
        </div>
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
            name='password'
            placeholder='password'
            value={password}
            className='py-4 px-2 mt-4 bg-transparent border border-indigo-300 focus:border-indigo-900 rounded-md outline-none'
          />
          <small>Password Validation</small>
        </div>
        <div className='mb-6 flex flex-col justify-start'>
          <label htmlFor='password'>Repeat Password</label>
          <input
            onChange={(e) => setRepeatPassword(e.target.value)}
            type='password'
            name='repeatPassword'
            placeholder='password'
            value={repeatPassword}
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

export default Register;
