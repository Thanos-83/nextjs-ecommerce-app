import React from 'react';
import GoogleLoginButton from '../../../components/GoogleSignInButton';
function Login() {
  return (
    <div>
      <form action=''>
        <div className='flex flex-col items-start space-y-4'>
          <label htmlFor='email' id='email'>
            Sign In with email{' '}
            <span className='text-red-500 ml-2'>( Not working yet )</span>
          </label>
          <input
            type='text'
            name='email'
            placeholder='email'
            className='w-full p-3 rounded border border-stone-300 bg-white'
          />
        </div>
        <button
          className='mt-2 w-full text-center p-3 rounded border border-stone-300 bg-white text-stone-800'
          type='submit'>
          Continue with email
        </button>
      </form>
      <div className='mx-auto my-10 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <GoogleLoginButton />
    </div>
  );
}

export default Login;
