import * as React from 'react';
import TextEditor from '../../../../../dashboard_components/TextEditor';
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
import TabsPanel from '../../../../../dashboard_components/addProduct/TabsPanel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Button, Dialog, TextField } from '@mui/material';
import { listCategories } from '../../../../../utils/listCategories';
import { nestedCategories } from '../../../../../utils/flattenCategoriesList';
import DashboardBreadcrumb from '../../../../../dashboard_components/DashboardBreadcrumb';
import ProductVisibility from '../../../../../dashboard_components/addProduct/ProductVisibility';
import ProductTags from '../../../../../dashboard_components/addProduct/ProductTags';
import ProductCategroy from '../../../../../dashboard_components/addProduct/ProductCategroy';
import { CloudUpload } from '@mui/icons-material';
import Delete from '@mui/icons-material/Delete';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

function EditProduct() {
  const router = useRouter();

  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { data: session, status } = useSession();
  const [optionsList, setOptionsList] = useState([]);
  const [productAttributes, setProductAttributes] = useState([]);
  const [imageGallery, setImageGallery] = useState([]);

  console.log(imageGallery);
  const [imageData, setImageData] = useState({
    url: '',
    public_id: '',
  });
  const [nextCursor, setNextCursor] = useState(null);
  // const [activeFolder, setActiveFolder] = useState('next_demo_ecommerce/*');
  const [totalImages, setTotalImages] = useState(0);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditorText = (text) => {
    setProductData({ ...productData, textEditor: text });
  };
  const [productData, setProductData] = useState({
    textEditor: '',
    user: '',
    sku: '',
    name: '',
    // type: '',
    isFeatured: false,
    featuredImage: '',
    // imageGallery,
    brand: '',
    category: '',
    description: '',
    shortDescription: '',
    // tags,
    // reviews,
    // rating,
    // numReviews,
    price: 0.0,
    // salesPrice,
    // crossSells,
    // upSells,
    // countInStock,
    // inStock,
    attributes: [],
  });

  useEffect(() => {
    axios
      .get(`/api/dashboard/products/${router.query.productID}`)
      .then((res) => {
        console.log('Edit product: ', res);

        setProductData((prev) => ({
          ...prev,
          description: res.data.product.description,
          name: res.data.product.name,
          brand: res.data.product.brand,
          price: res.data.product.price,
          shortDescription: res.data.product.shortDescription,
          sku: res.data.product.sku,
          attributes: res.data.product.attributes,
          category: res.data.product.category.name,
          featuredImage: res.data.product.featuredImage,
          isFeatured: res.data.product.isFeatured,
        }));
      })
      .catch((error) => console.log(error));
  }, [router.query.productID]);

  // useEffect(() => {
  //   axios
  //     .get('/api/cloudinary', {
  //       params: {
  //         nextCursor: nextCursor,
  //         activeFolder: 'next_demo_ecommerce/*',
  //       },
  //     })
  //     .then((res) => {
  //       setImageGallery(res.data.data.resources);
  //       setTotalImages(res.data.data.total_count);

  //       if (res.data.data.next_cursor) {
  //         setNextCursor(res.data.data.next_cursor);
  //       }
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsLoading(false);
  //     });
  // });

  useEffect(() => {
    axios
      .get('/api/dashboard/categories')
      .then((res) => {
        const flattenList = nestedCategories(res.data);
        const list = listCategories(flattenList);
        setOptionsList(list);
      })
      .catch((error) => console.log(error));

    axios
      .get('/api/dashboard/products/attributes')
      .then((res) => {
        // console.log('Use effect attributes: ', res.data);
        setProductAttributes(res.data.attributes);
      })
      .catch((error) => console.log(error));

    if (session) {
      productData.user = session.user.id;
    }
  }, [session, productData, productData.category, productData.attributes]);

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

  const handleUploadFeaturedImage = async (e) => {
    e.preventDefault();
    const formImageInput = document.getElementById('productForm');
    const fileInput = Array.from(formImageInput).find(
      ({ name }) => name === 'featuredImage'
    );

    console.log('File input: ', fileInput.files);

    const formData = new FormData();
    // console.log('form: ', fileInput.files);
    for (let file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'next_demo_ecommerce');
    // setIsLoading(true);
    const { data } = await axios.post(
      'https://api.cloudinary.com/v1_1/do1gpf9sv/image/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    setImageData({
      url: data.url,
      public_id: data.public_id,
    });
    setProductData({ ...productData, featuredImage: data.secure_url });
    // setIsLoading(false);

    console.log(data);
  };

  const deleteImage = async (e) => {
    setProductData({ ...productData, featuredImage: '' });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const product = {
      name: productData.name,
      featuredImage: productData.featuredImage,
      isFeatured: productData.isFeatured,
      description: productData.description,
      shortDescription: productData.shortDescription,
      sku: productData.sku,
      brand: productData.brand,
      price: productData.price,
      category: productData.category,
      user: session.user.id,
      attributes: productData.attributes,
    };
    console.log('Product to update: ', product);
    setIsLoading(true);
    axios
      .put(`/api/dashboard/products/${router.query.productID}`, product)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setOpenSnackbar(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const setProductDataAttributes = (attr) => {
    setProductData({ ...productData, attributes: attr });
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
                onClick={() =>
                  setProductData({
                    ...productData,
                    featuredImage: image.secure_url,
                  })
                }>
                <div className='relative'>
                  <Image
                    src={image.secure_url}
                    width='740'
                    height='740'
                    // layout='fill'
                    objectFit='contain'
                    alt='image gallery'
                  />
                </div>
              </li>
            ))}
          </ul>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
          />

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
              loading={isLoading}
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
                  <div className='product_name flex flex-col my-4'>
                    <label htmlFor='productName'>Name</label>
                    <TextField
                      fullWidth
                      type='text'
                      size='small'
                      name='productName'
                      id='productName'
                      value={productData.name}
                      placeholder='Product Name'
                      onChange={(e) =>
                        setProductData({ ...productData, name: e.target.value })
                      }
                      inputProps={{ 'aria-label': 'add product name' }}
                    />
                  </div>

                  <div className='product_brandname flex flex-col my-4'>
                    <label htmlFor='productBrandname'>Brandname</label>
                    <TextField
                      fullWidth
                      type='text'
                      size='small'
                      name='productBrandname'
                      id='productBrandname'
                      value={productData.brand}
                      placeholder='Product Brandname'
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          brand: e.target.value,
                        })
                      }
                      inputProps={{ 'aria-label': 'add product brand' }}
                    />
                  </div>
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
                      value={productData.name.replace(/\s/g, '-').toLowerCase()}
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
                <TextEditor handleText={handleEditorText} />
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
                    value={productData.description}
                    name='productFullDescription'
                    id='productFullDescription'
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        description: e.target.value,
                      })
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
                    value={productData.shortDescription}
                    name='shortDescription'
                    id='productDescription'
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        shortDescription: e.target.value,
                      })
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
                  <TabsPanel
                    initialAttributes={productData.attributes}
                    saveAttributesToState={setProductDataAttributes}
                    setProductData={setProductData}
                    productData={productData}
                  />
                </div>
              </div>
            </div>
            <div className='addProduct_form-right'>
              <ProductVisibility
                productData={productData}
                setProductData={setProductData}
              />
              <ProductCategroy
                productData={productData}
                setProductData={setProductData}
                categoryOptionsList={optionsList}
                defaultCategory={productData.category}
              />
              <ProductTags
                productData={productData}
                setProductData={setProductData}
                tagOptionsList={optionsList}
              />
              <div className='featured_image addProduct_formWrapper'>
                <h1>Featured Image</h1>
                <div className='featured_imageWrapper'>
                  <div className='featured_imageUpload'>
                    <CloudUpload />
                    <label htmlFor='featuredImage'>
                      Upload Image
                      <span>(click here...)</span>
                    </label>
                    <Button onClick={handleClickOpen}>
                      Set featured image
                    </Button>
                    <input
                      ref={inputRef}
                      type='file'
                      name='featuredImage'
                      multiple
                      id='featuredImage'
                      hidden={true}
                      placeholder='Featured Image'
                      onChange={handleUploadFeaturedImage}
                      // value={featuredImage}
                    />
                  </div>
                  <div className='featured_imageDisplay'>
                    <div className='featuredImgWrapper'>
                      {productData.featuredImage !== '' && (
                        <>
                          <Image
                            className='block'
                            src={productData.featuredImage}
                            alt='featured_image'
                            // width={250}
                            // height={250}
                            layout='fill'
                            objectFit='contain'
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
