'use client';

import React from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  ArrowPathIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';

// import { useRouter } from 'next/router';

function LoginBtn() {
  //   const router = useRouter();
  const { data, status } = useSession();
  // console.log(data, status);
  let session = data ? true : false;
  console.log('session data: ', data);
  console.log('session status: ', status);
  const handleSignOut = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: '/',
    });
    // console.log(data);
    // router.push(data.url);
  };

  return (
    <div>
      <div className='items-center justify-end md:flex md:flex-1'>
        {!session && (
          <button
            type='button'
            className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 border border-indigo-600 px-4 py-2 rounded-md'
            onClick={() => signIn()}>
            Sign in
          </button>
        )}
        {!session && (
          <Link
            href='/my-account/register'
            className='ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'>
            Sign up
          </Link>
        )}
        {session && (
          <div className='flex items-center gap-4'>
            <Avatar src={data.user.image} alt={data.user.name} />
            <button
              type='button'
              className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 border border-indigo-600 px-4 py-2 rounded-md'
              onClick={() => handleSignOut()}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginBtn;
