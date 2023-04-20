'use client';

import React from 'react';
import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/navigation';
// import Link from 'next/link';

function Paginate({ pages }) {
  const router = useRouter();
  const handlePagination = (e, value) => {
    console.log('pagination value: ', value);
    if (value === 1) {
      router.push('/shop');
      return;
    }
    router.push(`/shop?page=${value}`);
  };
  return (
    <div>
      <Pagination
        count={pages}
        defaultPage={1}
        showFirstButton={true}
        showLastButton={true}
        variant='outlined'
        shape='rounded'
        onChange={handlePagination}
      />
    </div>
  );
}

export default Paginate;
