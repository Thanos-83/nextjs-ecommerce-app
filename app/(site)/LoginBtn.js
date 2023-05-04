'use client';

import React from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';

import { signIn, signOut, useSession } from 'next-auth/react';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Link from 'next/link';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';

// import { useRouter } from 'next/router';

function LoginBtn() {
  //   const router = useRouter();
  const { data: session, status } = useSession();
  // console.log(data, status);
  // let session = data ? true : false;
  console.log('session data: ', session);
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
        {/* {!session && (
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
            <Avatar src={session.user.image} alt={session.user.name} />
            <button
              type='button'
              className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 border border-indigo-600 px-4 py-2 rounded-md'
              onClick={() => handleSignOut()}>
              Sign Out
            </button>
          </div>
        )} */}
        {session ? (
          <Menu as='div' className='relative z-[999] bg-slate-100'>
            <Menu.Button>
              {session?.user?.image ? (
                <div className='relative h-10 w-10'>
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    className='inline-block rounded-full'
                    fill
                  />
                </div>
              ) : (
                <span className='inline-block h-8 w-8 overflow-hidden rounded-full bg-stone-100'>
                  <svg
                    className='h-full w-full text-stone-300'
                    fill='currentColor'
                    viewBox='0 0 24 24'>
                    <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                  </svg>
                </span>
              )}
            </Menu.Button>
            <Transition
              enter='transition duration-150 ease-out'
              enterFrom='transform scale-95 opacity-0'
              enterTo='transform scale-100 opacity-100'
              leave='transition duration-150 ease-out'
              leaveFrom='transform scale-100 opacity-100'
              leaveTo='transform scale-95 opacity-0'>
              <Menu.Items className='bg-slate-50 dark:text-react absolute right-0 mt-1 flex w-96 origin-top-right flex-col rounded-xl py-6 text-white shadow-lg focus:outline-none dark:bg-white'>
                <div className='mb-4 flex gap-4 px-6 text-sm '>
                  {session?.user?.image ? (
                    <div className='relative h-10 w-10'>
                      <Image
                        src={session.user.image}
                        alt={session.user.name}
                        className='inline-block rounded-full'
                        fill
                      />
                    </div>
                  ) : (
                    <span className='inline-block h-8 w-8 overflow-hidden rounded-full bg-stone-100'>
                      <svg
                        className='h-full w-full text-stone-300'
                        fill='currentColor'
                        viewBox='0 0 24 24'>
                        <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                      </svg>
                    </span>
                  )}
                  <div>
                    <p className='font-medium text-stone-600'>
                      {session.user.name || 'User name'}
                    </p>
                    <p className='text-stone-400'>{session.user.email}</p>
                  </div>
                </div>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href='/my-account/profile'
                      className={`
                        ${
                          (active && 'bg-stone-700/50 dark:bg-stone-200',
                          'inline-flex items-center gap-6 px-[34px] py-2 text-sm text-stone-400 dark:text-stone-500')
                        }`}>
                      <ManageAccountsIcon className='h-5 w-5 text-stone-400' />
                      <span>Manage Account</span>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`
                       ${
                         (active && 'bg-stone-700/50 dark:bg-stone-200',
                         'inline-flex items-center gap-6 px-[34px] py-2 text-sm text-stone-400 dark:text-stone-500')
                       }`}
                      onClick={() => signOut()}>
                      <LogoutIcon className='h-5 w-5 text-stone-400' />
                      <span>Sign Out</span>
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <button
            className='rounded-md border border-stone-300 px-3 py-1 text-sm dark:border-stone-600'
            onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

export default LoginBtn;
