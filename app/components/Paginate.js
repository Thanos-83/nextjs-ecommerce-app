'use client';

import React from 'react';
import Pagination from '@mui/material/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';

function Paginate({ pages }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handlePagination = (e, value) => {
    console.log('pagination value: ', value);
    if (searchParams.has('category') && value === 1) {
      router.push(`/shop?category=${searchParams.get('category')}`);
      return;
    }

    if (searchParams.has('category') && value !== 1) {
      router.push(
        `/shop?category=${searchParams.get('category')}&page=${value}`
      );
      return;
    }

    if (!searchParams.has('category') && value === 1) {
      router.push(`/shop`);
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
