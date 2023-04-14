import React from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../../../../../dashboard_components/DashboardLayout';
import Link from 'next/link';
function SingleCategory() {
  const router = useRouter();
  console.log(router);
  return (
    <DashboardLayout>
      <div>Edit Single Category with ID : {router.query.categoryID}</div>

      <Link href={`/v1/dashboard/products/categories/`}>
        Back to categories
      </Link>
    </DashboardLayout>
  );
}

export default SingleCategory;
