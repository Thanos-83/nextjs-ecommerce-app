import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { signIn } from 'next-auth/react';

import RowContainer from '../../../components/design_components/RowContainer';
export default function Login() {
  const router = useRouter();
  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/',
    });
    console.log(result);

    if (result.ok) {
      router.push(result.url);
    }
  };

  return (
    <RowContainer>
      <div className='my-8'>
        <Link href='/v1/dashboard'>
          <a className='text-base font-medium text-gray-500 hover:text-gray-900'>
            Dashboard
          </a>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email: <input type='text' ref={emailInput} />
          </label>
        </div>
        <div>
          <label>
            Password: <input type='password' ref={passwordInput} />
          </label>
        </div>
        <div>
          <button type='submit'>Sign in</button>
        </div>
      </form>
    </RowContainer>
  );
}
