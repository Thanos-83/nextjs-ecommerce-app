'use client';

import React from 'react';
import RowContainer from '../components/ui/RowContainer';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';

function Footer() {
  return (
    <div className=' bg-slate-800 text-white'>
      <RowContainer>
        <footer className='py-4 text-gray-600 body-font'>
          <div className='container mx-auto flex items-center sm:flex-row flex-col'>
            {/* <a className='flex title-font font-medium items-center md:justify-start justify-center text-gray-900'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                className='w-10 h-10 text-white p-2 bg-indigo-500 rounded-full'
                viewBox='0 0 24 24'>
                <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
              </svg>
              <span className='ml-3 text-xl'>Tailblocks</span>
            </a> */}
            <p className='text-xl text-gray-500 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4'>
              © 2023 Thanos Smponias
              {/* <a
                href='https://twitter.com/knyttneve'
                className='text-gray-600 ml-1'
                rel='noopener noreferrer'
                target='_blank'>
                @knyttneve
              </a> */}
            </p>
            <span className='inline-flex space-x-6 sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start'>
              <Link
                href='https://www.linkedin.com/in/thanos-smponias-35036610b/'
                className='text-gray-400'
                target='blank'>
                <LinkedInIcon />
              </Link>
              <Link
                href='https://github.com/Thanos-83'
                className='ml-3 text-gray-400'
                target='blank'>
                <GitHubIcon />
              </Link>
            </span>
          </div>
        </footer>
      </RowContainer>
    </div>
  );
}

export default Footer;
