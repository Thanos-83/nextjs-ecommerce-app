import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import DashboardLayout from '../../../../../dashboard_components/DashboardLayout';

function EditProduct() {
  const router = useRouter();
  // console.log(router);
  return (
    <DashboardLayout>
      <div>Edit Product with ID: {router.query.productID} </div>
      <Button
        variant='contained'
        color='success'
        onClick={() => router.push('/v1/dashboard/products/')}>
        Back to products
      </Button>
    </DashboardLayout>
  );
}

export default EditProduct;
