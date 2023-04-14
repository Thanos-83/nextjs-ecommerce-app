import * as React from 'react';
// import TextEditor from '../../../../../dashboard_components/TextEditor';
import { useEffect, useState, useRef } from 'react';
import DashboardLayout from '../../../../../dashboard_components/DashboardLayout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import cloudinary from 'cloudinary/lib/cloudinary';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TabsPanel from '../../../../../dashboard_components/addProductPage/TabsPanel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {
  Button,
  Dialog,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import DashboardBreadcrumb from '../../../../../dashboard_components/DashboardBreadcrumb';
import EditProductVisibility from '../../../../../dashboard_components/editProductPage/EditProductVisibility';
import EditProductTags from '../../../../../dashboard_components/editProductPage/EditProductTags';
import EditProductCategroy from '../../../../../dashboard_components/editProductPage/EditProductCategory';

import { initializeProductData } from '../../../../../features/productData/productDataSlice';
import EditName from '../../../../../dashboard_components/editProductPage/EditName';
import EditBrandname from '../../../../../dashboard_components/editProductPage/EditBrandname';
import { useDispatch, useSelector } from 'react-redux';
import { Delete } from '@mui/icons-material';
import EditDescription from '../../../../../dashboard_components/editProductPage/EditDescription';
import EditShortDescription from '../../../../../dashboard_components/editProductPage/EditShortDescription';
import EditSlug from '../../../../../dashboard_components/editProductPage/EditSlug';
import EditFeaturedImage from '../../../../../dashboard_components/editProductPage/EditFeaturedImage';
import {
  updateFeaturedImage,
  updateImageGallery,
} from '../../../../../features/productData/productDataSlice';
import ImageGallery from '../../../../../dashboard_components/addProductPage/ImageGallery';
import EditProductType from '../../../../../dashboard_components/editProductPage/EditProductType';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//   api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
// });

function AddProduct() {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  });
  const productData = useSelector((state) => state.productData.productData);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { data: session, status } = useSession();
  const [imageGallery, setImageGallery] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [totalImages, setTotalImages] = useState(0);
  const [activeImage, setActiveImage] = useState('');
  const [imageGalleryIndex, setImageGalleryIndex] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        console.log(res);

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
        // console.log(res.data);
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
    dispatch(initializeProductData());
  }, [dispatch]);

  const handleUpdateImage = (event, image) => {
    // console.log(event.target);
    setActiveImage(image.asset_id);
    dispatch(updateFeaturedImage(image.secure_url));
  };

  const handleUpdateImageGallery = (imageIndex, image) => {
    alert('clicked...');
    dispatch(updateImageGallery({ index: imageIndex, src: image.secure_url }));
    setImageGalleryIndex(null);
  };

  const deleteImage = async (e) => {
    setActiveImage(null);
    // dispatch(deleteFeaturedImage());
  };

  console.log('session inside the add product page: ', session);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    console.log(productData);
    const product = {
      name: productData.name,
      slug: productData.name
        .replace(/\s/g, '-')
        .replace(/[()\\\/]/g, '-')
        .replace(/--/g, '-')
        .toLowerCase(),
      type: productData.type,
      featuredImage: productData.featuredImage,
      imageGallery: productData.imageGallery,
      description: productData.description,
      shortDescription: productData.shortDescription,
      sku: productData.sku,
      brand: productData.brand,
      price: productData.price.toFixed(2),
      category: productData.category,
      user: session.user.id,
      attributes: productData.attributes,
      isFeatured: productData.isFeatured,
    };
    console.log('Product: ', product);
    setIsLoading(true);
    axios
      .post('/api/dashboard/products/', product)
      .then((res) => {
        // console.log(res);
        setIsLoading(false);
        setOpenSnackbar(true);
        productData.textEditor = '';
        productData.user = '';
        productData.sku = '';
        productData.name = '';
        productData.slug = '';
        productData.type = '';
        productData.featuredImage = '';
        productData.imageGallery = Array.apply('', Array(6));
        productData.isFeatured = false;
        productData.brand = '';
        productData.category = '';
        productData.description = '';
        productData.shortDescription = '';
        productData.price = 0.0;
        productData.attributes = [];
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const uploadImage = (num) => {
    alert(num);
    setImageGalleryIndex(num);
    handleClickOpen();
  };
  // console.log(imageGalleryIndex);
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
          sx={{ width: '100%' }}>
          Product Added Successfuly!
        </Alert>
      </Snackbar>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <div className='mediaLibrary_container'>
          <ul className='mediaLibrary_image'>
            {imageGallery?.map((image) => (
              <li
                key={image.asset_id}
                className={activeImage === image.asset_id && 'activeImage'}
                onClick={
                  imageGalleryIndex === null
                    ? (event) => handleUpdateImage(event, image)
                    : () => handleUpdateImageGallery(imageGalleryIndex, image)
                }>
                <div className='relative'>
                  <Image
                    src={image.secure_url}
                    width='740'
                    height='740'
                    // layout='fill'
                    // objectFit='contain'
                    alt='image gallery'
                    className='object-contain'
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
          <Button onClick={handleLoadMore}>Load More</Button>
        </div>
      </Dialog>
      <div className='addProduct_wrapper'>
        <DashboardBreadcrumb path={router.pathname} />

        <form className='addProduct_form mb-24' id='productForm'>
          <div className='addProduct_form-header'>
            <h1 className='text-3xl font-semibold'>Add Product</h1>
            <LoadingButton
              onClick={handleAddProduct}
              endIcon={<SendIcon />}
              loading={isLoading}
              // size='small'
              loadingPosition='end'
              variant='contained'
              className='w-1/2 max-w-[12rem] mt-0 ml-auto'>
              Save Product
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
                <EditSlug />
                <EditDescription />
                <EditShortDescription />
              </div>
              <div className='addProduct_data addProduct_formWrapper'>
                <h1>Product Data</h1>
                <EditProductType />
                <Divider />
                <div className='product_data flex my-8'>
                  <TabsPanel />
                </div>
              </div>
              <ImageGallery uploadImage={uploadImage} />
            </div>
            <div className='addProduct_form-right'>
              <EditProductVisibility />
              <EditProductCategroy />
              <EditProductTags />
              <div className='featured_image addProduct_formWrapper'>
                <h1>Featured Image</h1>
                <div className='featured_imageWrapper'>
                  <div>
                    <Button onClick={handleClickOpen}>
                      Set featured image
                    </Button>
                  </div>
                  <EditFeaturedImage />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default AddProduct;
