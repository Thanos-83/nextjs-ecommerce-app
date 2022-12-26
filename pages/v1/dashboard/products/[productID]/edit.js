import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import DashboardLayout from '../../../../../dashboard_components/DashboardLayout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import cloudinary from 'cloudinary/lib/cloudinary';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import TabsPanel from '../../../../../dashboard_components/addProductPage/TabsPanel';
import MuiAlert from '@mui/material/Alert';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import DashboardBreadcrumb from '../../../../../dashboard_components/DashboardBreadcrumb';

import { useDispatch, useSelector } from 'react-redux';
import {
  initializeProductData,
  updateFeaturedImage,
  deleteFeaturedImage,
  updateDescription,
  updateShortDescription,
} from '../../../../../features/productData/productDataSlice';
import { Button, Dialog, Snackbar, TextField } from '@mui/material';
import EditName from '../../../../../dashboard_components/editProductPage/EditName';
import EditBrandname from '../../../../../dashboard_components/editProductPage/EditBrandname';
import EditProductVisibility from '../../../../../dashboard_components/editProductPage/EditProductVisibility';
import EditProductCategory from '../../../../../dashboard_components/editProductPage/EditProductCategory';
import EditProductTags from '../../../../../dashboard_components/editProductPage/EditProductTags';
import { Delete } from '@mui/icons-material';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

function EditProduct({ product }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const updateProduct = useSelector((state) => state.productData.productData);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [imageGallery, setImageGallery] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [totalImages, setTotalImages] = useState(0);
  const [activeImage, setActiveImage] = useState(updateProduct.featuredImage);
  // const [activeImage, setActiveImage] = useState(null);

  // console.log('iam here 1: ', updateProduct);
  // console.log(activeImage);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteImage = async (e) => {
    setActiveImage(null);
    dispatch(deleteFeaturedImage());
  };

  const handleLoadMore = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .get('/api/cloudinary', {
        params: {
          nextCursor: nextCursor,
          activeFolder: 'next_demo_ecommerce/*',
        },
      })
      .then((res) => {
        console.log('Images: ', res);
        setImageGallery([...imageGallery, ...res.data.data.resources]);

        if (res.data.data.next_cursor) {
          setNextCursor(res.data.data.next_cursor);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get('/api/cloudinary', {
        params: {
          nextCursor: nextCursor,
          activeFolder: 'next_demo_ecommerce/*',
        },
      })
      .then((res) => {
        console.log('Images useEffect: ', res.data);
        setImageGallery(res.data.data.resources);
        setTotalImages(res.data.data.total_count);

        if (res.data.data.next_cursor) {
          setNextCursor(res.data.data.next_cursor);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    dispatch(initializeProductData(product));
  }, [dispatch, product]);
  // console.log('Edit Page Use Selector: ', updateProduct);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    axios
      .put(`/api/dashboard/products/${router.query.productID}`, {
        product: updateProduct,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));

    setOpenSnackbar(true);
  };

  const handleUpdateImage = (event, image) => {
    // console.log(image);
    setActiveImage(image.asset_id);
    // event.currentTarget.classList.toggle('activeImage');

    dispatch(updateFeaturedImage(image.secure_url));
  };

  return (
    <DashboardLayout>
      {/* {console.log('iam here 2')} */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity='success'
          sx={{ width: '100%' }}>
          Product Updated Successfuly!
        </Alert>
      </Snackbar>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <div className='mediaLibrary_container'>
          <ul className='mediaLibrary_image'>
            {imageGallery?.map((image) => (
              <li
                key={image.asset_id}
                className={activeImage === image.asset_id && 'activeImage'}
                onClick={(event) => handleUpdateImage(event, image)}>
                <div className='relative'>
                  <Image
                    src={image.secure_url}
                    width='740'
                    height='740'
                    // layout='fill'
                    objectFit='contain'
                    alt='image gallery'
                  />
                  <input
                    type='checkbox'
                    // defaultChecked={
                    //   activeImage === image.asset_id ? true : false
                    // }
                    readOnly
                    checked={activeImage === image.asset_id ? true : false}
                  />
                </div>
              </li>
            ))}
          </ul>

          <Button onClick={handleClose}>Close</Button>
          {imageGallery.length > 0 && (
            <>
              <p>
                {imageGallery.length} available out of {totalImages} products
              </p>
              <LoadingButton
                variant='outlined'
                disabled={totalImages === imageGallery.length}
                loading={isLoading}
                loadingPosition='end'
                endIcon={<FileDownloadIcon />}
                onClick={handleLoadMore}>
                {totalImages === imageGallery.length
                  ? 'No More Images'
                  : 'Load More Images'}
              </LoadingButton>
            </>
          )}
          {/* <Button onClick={handleLoadMore}>Load More</Button> */}
        </div>
      </Dialog>
      <div className='addProduct_wrapper'>
        <DashboardBreadcrumb path={router.pathname} />

        <form action='POST' className='addProduct_form mb-24' id='productForm'>
          <div className='addProduct_form-header'>
            <h1 className='text-3xl font-semibold'>Edit Product</h1>
            <LoadingButton
              onClick={handleUpdateProduct}
              endIcon={<SendIcon />}
              // loading={isLoading}
              loadingPosition='end'
              variant='contained'
              className='w-1/2 max-w-[12rem] mt-0 ml-auto'>
              Update Product
            </LoadingButton>
          </div>
          <div className='addProduct_form-body'>
            <div className='addProduct_form-left'>
              <div className='addProduct_info addProduct_formWrapper'>
                <h1>Basic Info</h1>
                <div className='product_nameInfo'>
                  <EditName />
                  <EditBrandname />
                </div>
                <div className='product_slug flex flex-col my-4'>
                  <label htmlFor='productSlug'>Slug</label>
                  <div className='productInput_slug'>
                    <span>https://example.com/products/</span>
                    <TextField
                      fullWidth
                      type='text'
                      size='small'
                      id='productSlug'
                      name='productSlug'
                      value={updateProduct.name
                        ?.replace(/\s/g, '-')
                        .toLowerCase()}
                      placeholder='Product Slug'
                      InputProps={{
                        readOnly: true,
                        'aria-label': 'product slug',
                      }}
                    />
                  </div>
                  <p className='slug_helperText'>
                    Unique human-readable product identifier. It is filled
                    automatically
                  </p>
                </div>
                {/* <TextEditor handleText={handleEditorText} /> */}
                <div className='product_description'>
                  <label htmlFor='productFullDescription'>
                    Full Description
                  </label>
                  <TextField
                    multiline
                    rows={8}
                    // maxRows={10}
                    fullWidth
                    placeholder='Add product complete description'
                    value={updateProduct.description}
                    name='productFullDescription'
                    id='productFullDescription'
                    onChange={(e) =>
                      dispatch(updateDescription(e.target.value))
                    }
                    inputProps={{
                      'aria-label': 'add product full description',
                    }}
                  />
                </div>
                <div className='product_shortDescription'>
                  <label htmlFor='productDescription'>Short Description</label>
                  <TextField
                    multiline
                    rows={5}
                    // maxRows={10}
                    fullWidth
                    placeholder='Add product short description'
                    value={updateProduct.shortDescription}
                    name='shortDescription'
                    id='productDescription'
                    onChange={(e) =>
                      dispatch(updateShortDescription(e.target.value))
                    }
                    inputProps={{
                      'aria-label': 'add product short description',
                    }}
                  />
                </div>
              </div>
              <div className='addProduct_data addProduct_formWrapper'>
                <h1>Product Data</h1>
                <div className='product_data flex my-8'>
                  <TabsPanel />
                </div>
              </div>
            </div>
            <div className='addProduct_form-right'>
              <EditProductVisibility />
              <EditProductCategory />
              <EditProductTags />
              <div className='featured_image addProduct_formWrapper'>
                <h1>Featured Image</h1>
                <div className='featured_imageWrapper'>
                  <div>
                    <Button onClick={handleClickOpen}>
                      Set featured image
                    </Button>
                  </div>
                  <div className='featured_imageDisplay'>
                    <div className='featuredImgWrapper'>
                      {updateProduct.featuredImage !== '' && (
                        <>
                          <Image
                            className='block'
                            src={updateProduct?.featuredImage}
                            alt='featured_image'
                            // width={250}
                            // height={250}
                            objectFit='contain'
                            layout='fill'
                          />
                          <button
                            type='button'
                            aria-label='delete featured image'
                            onClick={deleteImage}
                            className=''>
                            <Delete />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default EditProduct;

export async function getServerSideProps(context) {
  console.log(context.query.productID);

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/dashboard/products/${context.query.productID}`
  );

  // console.log(response);
  const product = response.data.product;

  return {
    props: { product },
  };
}
