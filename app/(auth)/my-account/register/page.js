import React from 'react';
import Link from 'next/link';
function Register() {
  return (
    <div>
      <h1>No Resister functionality has been implemented yet!!</h1>
      <div className='flex mt-4'>
        <p>Return to login page: </p>
        <Link href='/my-account/login' className='ml-4 underline text-sky-700'>
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
