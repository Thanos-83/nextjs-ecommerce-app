import { useState, useEffect, Fragment, useMemo } from 'react';
import axios from 'axios';
// import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, Transition } from '@headlessui/react';
import MuiDialog from '@mui/material/Dialog';

import DashboardLayout from '../../../../../dashboard_components/DashboardLayout';
import {
  Alert,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Snackbar,
} from '@mui/material';
import Link from 'next/link';
import CategoriesTable from '../../../../../dashboard_components/table components/CategoriesTable';

import { listCategories } from '../../../../../utils/listCategories';
import { nestedCategories } from '../../../../../utils/flattenCategoriesList';
import DashboardBreadcrumb from '../../../../../dashboard_components/DashboardBreadcrumb';
import { useRouter } from 'next/router';

function ProductCategories() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [responseError, setResponseError] = useState('');
  const [categories, setCategories] = useState([]);
  const [optionsList, setOptionsList] = useState([]);
  const [refetchData, setRefetchData] = useState(false);

  // console.log('Options List: ', optionsList);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/dashboard/categories`)
      .then((res) => {
        console.log('Use effect categories: ', res.data);
        const flattenList = nestedCategories(res.data);
        console.log('flatten List: ', flattenList);
        const list = listCategories(flattenList);
        console.log('List: ', list);

        setOptionsList(list);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [refetchData]);

  console.log('Options List: ', optionsList);

  const handleDeleteSingleCategory = (id) => {
    // alert(`category with id:${id} will be deleted...`);
    setIsLoading(true);
    axios
      .delete('/api/dashboard/categories', { data: { categoryID: id } })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setOpenSnackbar(true);
        setRefetchData(!refetchData);
      })
      .catch((error) => {
        setResponseError(error.response.data.errorMsg);
        setOpenAlert(true);
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleDeleteManyCategories = (rowIDs) => {
    // alert(`category with id:${id} deleted...`);
    console.log(rowIDs);

    setIsLoading(true);
    axios
      .delete('/api/dashboard/categories', { data: { categoryID: rowIDs } })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setOpenSnackbar(true);
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
          Category Deleted Successfuly!
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
      <DashboardBreadcrumb path={router.route} />
      <div className='product_categories bg-white p-8 rounded-md max-w-5xl'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-3xl font-semibold'>
            List of products Categories ({optionsList.length})
          </h1>
          <Link href='/v1/dashboard/products/categories/add'>
            <Button
              className='w-[100%] max-w-[12rem] py-2 bg-blue-600'
              variant='contained'
              size='small'
              startIcon={<AddIcon />}>
              Create New
            </Button>
          </Link>
        </div>
        <div className='categoriesTable'>
          {isLoading ? (
            <>
              <Skeleton
                className='mb-2'
                variant='text'
                width='100%'
                height={40}
              />
              <Skeleton
                className='mb-2'
                variant='text'
                width='100%'
                height={40}
              />
              <Skeleton
                className='mb-2'
                variant='text'
                width='100%'
                height={40}
              />
              <Skeleton
                className='mb-2'
                variant='text'
                width='100%'
                height={40}
              />
            </>
          ) : optionsList?.length === 0 ? (
            <h1>No categories</h1>
          ) : (
            <CategoriesTable
              optionsList={optionsList}
              deleteSingleCategory={handleDeleteSingleCategory}
              deleteManyCategories={handleDeleteManyCategories}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ProductCategories;
