import React from 'react';
import Link from 'next/link';
import LoginBtn from './LoginBtn';
import RowContainer from '../components/ui/RowContainer';
function Header() {
  return (
    <div className='bg-slate-100'>
      <RowContainer>
        <header className='flex items-center justify-between  mx-auto py-4'>
          <div>
            <Link href='/' className='test'>
              Logo
            </Link>
          </div>
          <div className='space-x-6'>
            <Link
              href='/'
              className='text-base font-medium text-gray-500 hover:text-gray-900'>
              Home
            </Link>
            <Link
              href='/shop'
              className='text-base font-medium text-gray-500 hover:text-gray-900'>
              Shop
            </Link>
            <Link
              href='/v1/dashboard'
              className='text-base font-medium text-gray-500 hover:text-gray-900'>
              Dashboard (old)
            </Link>
            <Link
              href='/dashboard'
              className='text-base font-medium text-gray-500 hover:text-gray-900'>
              Dashboard (new)
            </Link>
          </div>
          <div>
            <LoginBtn />
          </div>
        </header>
      </RowContainer>
    </div>
  );
}

export default Header;
