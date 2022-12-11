import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../../../dashboard_components/DashboardLayout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { Button, Checkbox, Divider, TextField } from '@mui/material';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import { nestedCategories } from '../../../../../utils/flattenCategoriesList';
import { listCategories } from '../../../../../utils/listCategories';
import DashboardBreadcrumb from '../../../../../dashboard_components/DashboardBreadcrumb';
import { useRouter } from 'next/router';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function AddCategory() {
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [responseError, setResponseError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorSlug, setErrorSlug] = useState(false);
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState();
  const [parentCategory, setParentCategory] = useState(null);
  const [optionsList, setOptionsList] = useState([]);

  // console.log(categories);
  console.log(parentCategory);
  useEffect(() => {
    axios
      .get('/api/dashboard/categories')
      .then((res) => {
        console.log('Use effect categories: ', res);
        const flattenList = nestedCategories(res.data);
        console.log('flatten List: ', flattenList);
        const list = listCategories(flattenList);
        console.log('List: ', list);
        setOptionsList(list);
      })
      .catch((error) => console.log(error));
    console.log('iam here...');
  }, [parentCategory, openSnackbar]);

  const handleInput = (e) => {
    if (e.target.name === 'category name') {
      setName(e.target.value);
      setErrorName(false);
    }

    if (e.target.name === 'category slug') {
      setSlug(e.target.value);
      setErrorSlug(false);
    }

    if (e.target.name === 'category description') {
      setDescription(e.target.value);
      //   setErrorSlug(false);
    }
  };

  const handleSubmitCategory = (e) => {
    e.preventDefault();
    if (name === '' && slug === '') {
      setErrorName(true);
      setErrorSlug(true);
      return;
    }
    if (name === '') {
      setErrorName(true);
      return;
    }
    if (slug === '') {
      setErrorSlug(true);
      return;
    } else {
      setIsLoading(true);
      axios
        .post('/api/dashboard/categories/', {
          name,
          slug,
          description,
          parent: parentCategory,
        })
        .then((res) => {
          // console.log('Response: ', parentCategory);

          setIsLoading(false);
          setOpenSnackbar(true);
          setName('');
          setSlug('');
          setDescription('');
          setParentCategory(null);
          // console.log('Response: ', parentCategory);

          console.log(res.data);
        })
        .catch((err) => {
          setParentCategory(null);
          // console.log('Error: ', parentCategory);

          setResponseError(err.response.data.error);
          setOpenAlert(true);
          console.log(err);
          setIsLoading(false);
        });
    }
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
          Category Added Successfuly!
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
      <div className='productCategories'>
        <DashboardBreadcrumb path={router.route} />
        <div className='productCategories_wrapper bg-white p-8 rounded-md max-w-5xl'>
          <div className='flex items-center justify-between mb-8'>
            <h1 className='text-3xl font-semibold'>Add New Category</h1>
            <Link href='/v1/dashboard/products/categories'>
              <Button
                className='w-[80%] lg:w-[35%] max-w-xs py-2'
                variant='outlined'
                startIcon={<ArrowBackIcon />}>
                Back to categories
              </Button>
            </Link>
          </div>
          <p className='my-8 text-gray-500 leading-relaxed text-lg'>
            Product categories for your store can be managed here. To change the
            order of categories on the front-end you can drag and drop to sort
            them. To see more categories listed click the screen options link at
            the top-right of this page.
          </p>
          <form action=''>
            <div className='form_group mb-6'>
              <label htmlFor='attributeName' className='text-md'>
                Category Name
              </label>
              <p className='mb-4 text-violet-400 text-sm'>
                The name is how it appears on your site.
              </p>
              <TextField
                error={errorName && name === ''}
                id='category name'
                name='category name'
                label='Name'
                size='small'
                value={name}
                //   onChange={(e) => setName(e.target.value)}
                onChange={handleInput}
                className='text-indigo-600 w-full'
              />
              {/* <input
              type='text'
              name='attributeName'
              value={name}
              onChange={(e) => setName(e.target.value)}
            /> */}
            </div>
            <div className='form_group mb-6'>
              <label htmlFor='attributeName' className='text-lg'>
                Category Slug
              </label>
              <p className='mb-4 text-violet-400 text-sm'>
                The “slug” is the URL-friendly version of the name. It is
                usually all lowercase and contains only letters, numbers, and
                hyphens.
              </p>
              <TextField
                error={errorSlug && slug === ''}
                id='category slug'
                name='category slug'
                label='Slug'
                size='small'
                value={slug}
                onChange={handleInput}
                className='text-indigo-600 w-full'
              />
            </div>

            <div className=' mb-6'>
              <label className='text-md block mb-4'>Parent Category</label>
              <Autocomplete
                // multiple
                disableCloseOnSelect
                id='category-select'
                placeholder='Choose a category'
                autoHighlight
                key={name}
                options={optionsList || []}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                getOptionLabel={(option) => option?.name}
                renderOption={(props, option, { selected, inputValue }) => {
                  return (
                    <li {...props} className='cursor-pointer' key={option._id}>
                      <Checkbox
                        checked={selected}
                        sx={{ ml: 2 * option.depth }}
                      />
                      {option.name}
                    </li>
                  );
                }}
                onChange={(event, value) => {
                  setParentCategory(value?._id);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={errorSlug && slug === ''}
                    id='parent category'
                    name='parent category'
                    label='Parent Category'
                    size='small'
                    placeholder='Choose parent category'
                    value={parentCategory}
                  />
                )}
              />
            </div>

            <div className='form_group mb-6'>
              <label htmlFor='attributeName' className='text-md'>
                Category Short Description
              </label>
              <p className='mb-4 text-violet-400 text-sm'>
                The description is not prominent by default.
              </p>
              <TextField
                multiline
                minRows={3}
                maxRows={5}
                size='small'
                id='category description'
                name='category description'
                label='Short Description'
                value={description}
                onChange={handleInput}
                className='text-indigo-600 w-full'
              />
            </div>
            <div className='form_group mb-6'>
              <label htmlFor='categoryImage'>
                Category Thumbnail{' '}
                <span className='text-red-700 font-bold'>
                  (NOT working yet! )
                </span>
              </label>
              <input type='file' name='categoryImage' />
            </div>
            <Divider className='my-8'>CENTER</Divider>

            <div className='category_submitBtn flex justify-end mt-8'>
              <LoadingButton
                onClick={handleSubmitCategory}
                endIcon={<SendIcon />}
                loading={isLoading}
                loadingPosition='end'
                variant='outlined'
                className='w-full max-w-[20rem] py-2 '>
                Add New Category
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddCategory;
