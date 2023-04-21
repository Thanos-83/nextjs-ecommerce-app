import Reac, { useState, useEffect } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { Alert, Button, Skeleton, Snackbar } from '@mui/material';
import Link from 'next/link';
import ProductsTable from '../../../../dashboard_components/table components/ProductsTable';

import DashboardLayout from '../../../../dashboard_components/DashboardLayout';
function Products() {
  // const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [responseError, setResponseError] = useState('');
  const [productDeleted, setProductDeleted] = useState(false);

  const handleDeleteSingleProduct = (id) => {
    alert(`product with id:${id} will be deleted...`);
    setIsLoading(true);
    axios
      .delete('/api/dashboard/products', { data: { productID: id } })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setOpenSnackbar(true);
        setProductDeleted(true);
      })
      .catch((error) => {
        setResponseError(error.response.data.errorMsg);
        setOpenAlert(true);
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleDeleteManyProducts = (rowIDs) => {
    // alert(`category with id:${id} deleted...`);
    console.log(rowIDs);

    setIsLoading(true);
    axios
      .delete('/api/dashboard/products', { data: { productID: rowIDs } })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setOpenSnackbar(true);
        setProductDeleted(true);
      })
      .catch((error) => {
        setResponseError(error.response.data.errorMsg);
        setOpenAlert(true);
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <DashboardLayout>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}>
          Product Deleted Successfuly!
        </Alert>
      </Snackbar>

      {openAlert && (
        <Alert
          onClose={() => setOpenAlert(false)}
          severity='error'
          sx={{ width: '100%' }}>
          {responseError}
        </Alert>
      )}
      <div className='products_list'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-3xl font-semibold'>Products</h1>
          <Link href='/v1/dashboard/products/add'>
            <Button
              className='w-[100%] max-w-[12rem] py-2 bg-blue-600'
              variant='contained'
              startIcon={<AddIcon />}>
              Create New
            </Button>
          </Link>
        </div>
        <ProductsTable
          deleteSingleProduct={handleDeleteSingleProduct}
          deleteManyProducts={handleDeleteManyProducts}
          productDeleted={productDeleted}
        />
      </div>
    </DashboardLayout>
  );
}

export default Products;
