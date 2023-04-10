import React from 'react';
import Link from 'next/link';
import LoginBtn from './LoginBtn';
import RowContainer from '../components/ui/RowContainer';
function Header() {
  return (
    <div className='bg-slate-100'>
      <RowContainer>
        <header className='flex items-center space-x-6 mx-auto py-4'>
          <Link
            href='/'
            className='text-base font-medium text-gray-500 hover:text-gray-900'>
            Home
          </Link>
          <Link
            href='/v1/dashboard'
            className='text-base font-medium text-gray-500 hover:text-gray-900'>
            Dashboard
          </Link>
          <Link
            href='/dashboard'
            className='text-base font-medium text-gray-500 hover:text-gray-900'>
            New Dashboard
          </Link>
          <LoginBtn />
        </header>
      </RowContainer>
    </div>
  );
}

export default Header;
