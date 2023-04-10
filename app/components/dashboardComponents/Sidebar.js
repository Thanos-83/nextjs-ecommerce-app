'use client';

import React from 'react';
import Link from 'next/link';
function Sidebar() {
  return (
    <div className='w-[15%] bg-slate-100 p-4'>
      <ul className='space-y-4'>
        <li>
          <Link href='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <Link href='/dashboard/products'>Products</Link>
        </li>
        <li>
          <Link href='/'>Home</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
