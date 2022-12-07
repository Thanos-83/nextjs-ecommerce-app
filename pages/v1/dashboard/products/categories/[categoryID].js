import React from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../../../../dashboard_components/DashboardLayout';
import Link from 'next/link';
function SingleCategory() {
  const router = useRouter();
  console.log(router);
  return (
    <DashboardLayout>
      <div>SingleCategory Id : {router.query.categoryID}</div>

      <Link href={`/v1/dashboard/products/categories/`}>
        <a>Back to categories</a>
      </Link>
    </DashboardLayout>
  );
}

export default SingleCategory;
