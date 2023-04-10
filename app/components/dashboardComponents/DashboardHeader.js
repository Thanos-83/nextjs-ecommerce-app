'use client';

import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Search from './Search';

function DashboardHeader() {
  return (
    <div className='p-4 bg-slate-200 flex items-center justify-between'>
      <MenuIcon className='cursor-pointer h-10 w-10 text-orange-900' />
      <Search />
      <div className='space-x-3'>
        <NotificationsNoneIcon className='cursor-pointer h-10 w-10 text-orange-900' />
        <AccountCircleIcon className='cursor-pointer h-10 w-10 text-orange-900' />
      </div>
    </div>
  );
}

export default DashboardHeader;
