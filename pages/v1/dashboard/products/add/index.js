import * as React from 'react';
import TextEditor from '../../../../../dashboard_components/TextEditor';
import { useEffect, useState, useRef } from 'react';
import DashboardLayout from '../../../../../dashboard_components/DashboardLayout';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import cloudinary from 'cloudinary/lib/cloudinary';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Autocomplete, Button, Checkbox, TextField } from '@mui/material';
import { listCategories } from '../../../../../utils/listCategories';
import { nestedCategories } from '../../../../../utils/flattenCategoriesList';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProductAttributes from '../../../../../dashboard_components/addProduct/ProductAttributes';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

function AddProduct() {
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { data: session, status } = useSession();
  const [optionsList, setOptionsList] = useState([]);
  const [value, setValue] = React.useState(0);
  const [productAttributes, setProductAttributes] = useState([]);
  const [productAttributesLocal, setProductAttributesLocal] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log(productAttributesLocal);
  const [imageData, setImageData] = useState({
    url: '',
    public_id: '',
  });

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

  console.log('Product Data: ', productData);

  const getProductAttributes = (data) => {
    const dataIDs = data.map((x) => x._id);
    console.log('Data: ', dataIDs);
    // console.log('Data: ', data);
    // setProductAttributesLocal(dataIDs);
    setProductData({ ...productData, attributes: dataIDs });
  };
  useEffect(() => {
    axios
      .get('/api/dashboard/categories')
      .then((res) => {
        // console.log('Use effect categories: ', res);
        const flattenList = nestedCategories(res.data);
        // console.log('flatten List: ', flattenList);
        const list = listCategories(flattenList);
        // console.log('List: ', list);
        setOptionsList(list);
        // setCategories(res.data);
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

  // console.log(productAttributes);

  const handleUploadFeaturedImage = async (e) => {
    e.preventDefault();
    const formImageInput = document.getElementById('productForm');
    const fileInput = Array.from(formImageInput).find(
      ({ name }) => name === 'featuredImage'
    );

    const formData = new FormData();
    // console.log('form: ', fileInput.files);
    for (let file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'next_demo_ecommerce');
    const { data } = await axios.post(
      'https://api.cloudinary.com/v1_1/do1gpf9sv/image/upload',
      formData
    );
    setImageData({
      url: data.url,
      public_id: data.public_id,
    });
    setProductData({ ...productData, featuredImage: data.secure_url });

    // console.log(data);
  };

  const deleteImage = async (e) => {
    e.preventDefault();
    // console.log('Public ID', imageData.public_id);

    // =========Destroy image on the backend========
    axios
      .post('/api/cloudinary', { public_id: imageData.public_id })
      .then((res) => {
        // console.log(res);
        setImageData({ url: '', public_id: '' });
        setProductData({ ...productData, featuredImage: '' });
        inputRef.current.value = null;
      })
      .catch((err) => {
        console.log(err);
      });

    // ========Destroy image on the frontend==========
    // cloudinary.v2.uploader
    //   .destroy(imageData.public_id, function (error, result) {
    //     console.log(result, error);
    //   })
    //   .then((resp) => {
    //     console.log(resp);
    //     setImageData({ url: '', public_id: '' });
    //     setProductData({ ...productData, featuredImage: '' });
    //   })
    //   .catch((_err) =>
    //     console.log('Something went wrong, please try again later.')
    //   );
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    console.log('Product Data Attrs: ', productData.attributes);
    const product = {
      name: productData.name,
      featuredImage: productData.featuredImage,
      description: productData.description,
      shortDescription: productData.shortDescription,
      sku: productData.sku,
      brand: productData.brand,
      price: productData.price,
      category: productData.category,
      user: session.user.id,
      attributes: productData.attributes,
    };
    setIsLoading(true);
    axios
      .post('/api/dashboard/products/', product)
      .then((res) => {
        // console.log(res);
        setIsLoading(false);
        setOpenSnackbar(true);
        localStorage.removeItem('attributes');
        productData.textEditor = '';
        productData.user = '';
        productData.sku = '';
        productData.name = '';
        productData.featuredImage = '';
        productData.brand = '';
        productData.category = '';
        productData.description = '';
        productData.shortDescription = '';
        productData.price = 0.0;
        productData.attributes = [];
      })
      .catch((err) => {
        // setError({
        //   ...error,
        //   isError: true,
        //   message: err.response.data.errorMsg,
        // });
        // console.log(err);
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
          sx={{ width: '100%' }}>
          Product Added Successfuly!
        </Alert>
      </Snackbar>
      <h1>Product Information</h1>
      <form action='' id='productForm' onSubmit={handleAddProduct}>
        <TextEditor handleText={handleEditorText} />
        <div className='product_name flex flex-col my-4'>
          <label className='text-xl mb-2' htmlFor='productName'>
            Product Name
          </label>
          <input
            type='text'
            name='productName'
            value={productData.name}
            placeholder='Product Name'
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
          />
        </div>
        <div className='product_price flex flex-col my-4'>
          <label className='text-xl mb-2' htmlFor='productPrice'>
            Product Price
          </label>
          <input
            type='number'
            name='productPrice'
            value={productData.price}
            placeholder='Product Price'
            onChange={(e) =>
              setProductData({
                ...productData,
                price: parseFloat(e.target.value),
              })
            }
          />
        </div>
        <div className='product_brand flex flex-col my-4'>
          <label className='text-xl mb-2' htmlFor='productBrandname'>
            Brandname
          </label>
          <input
            type='text'
            name='productBrandname'
            value={productData.brand}
            placeholder='Product Brandname'
            onChange={(e) =>
              setProductData({ ...productData, brand: e.target.value })
            }
          />
        </div>
        <div className='product_sku flex flex-col my-4'>
          <label className='text-xl mb-2' htmlFor='productSku'>
            Product SKU
          </label>
          <input
            type='text'
            name='productSku'
            value={productData.sku}
            placeholder='Product SKU'
            onChange={(e) =>
              setProductData({ ...productData, sku: e.target.value })
            }
          />
        </div>

        <div className='product_data flex my-8'>
          <Tabs
            orientation='vertical'
            variant='scrollable'
            className='productAttributes_tabs'
            value={value}
            onChange={handleChange}
            aria-label='Product data'
            sx={{ borderRight: 1, borderColor: 'divider' }}>
            <Tab
              icon={<SendIcon />}
              iconPosition='start'
              label='General'
              {...a11yProps(0)}
            />
            <Tab
              icon={<SendIcon />}
              iconPosition='start'
              label='Shipping'
              {...a11yProps(1)}
            />
            <Tab
              icon={<SendIcon />}
              iconPosition='start'
              label='Linked Products'
              {...a11yProps(2)}
            />
            <Tab
              icon={<SendIcon />}
              iconPosition='start'
              label='Attributes'
              {...a11yProps(3)}
            />
          </Tabs>
          <TabPanel
            value={value}
            index={0}
            className='flex-1 bg-white'></TabPanel>
          <TabPanel value={value} index={1} className='flex-1 bg-white'>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2} className='flex-1 bg-white'>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3} className='flex-1 bg-white '>
            <ProductAttributes
              getProductAttributes={getProductAttributes}
              productAttributes={productAttributes}
              initialAttributes={productData.attributes}
            />
          </TabPanel>
        </div>
        <div className='product_description'>
          <label className='text-xl text-black mb-2'>
            Product Full Description
          </label>
          {/* <TextEditor /> */}
          <textarea
            className='w-full p-4'
            value={productData.description}
            name='description'
            id=''
            rows='10'
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
          />
        </div>
        <div className='product_shortDescription'>
          <label className='text-2xl text-black mb-2'>
            Product Short Description
          </label>
          {/* <TextEditor /> */}
          <textarea
            className='w-full p-4'
            value={productData.shortDescription}
            name='shortDescription'
            id=''
            rows='2'
            onChange={(e) =>
              setProductData({
                ...productData,
                shortDescription: e.target.value,
              })
            }
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
            // key={name}
            options={optionsList || []}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option?.name}
            renderOption={(props, option, { selected, inputValue }) => {
              return (
                <li {...props} className='cursor-pointer' key={option._id}>
                  <Checkbox checked={selected} sx={{ ml: 2 * option.depth }} />
                  {option.name}
                </li>
              );
            }}
            onChange={(event, value) => {
              setProductData({ ...productData, category: value?._id });
              // console.log(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id='parent category'
                name='parent category'
                label='Parent Category'
                size='small'
                placeholder='Choose parent category'
                value={productData.category}
              />
            )}
          />
        </div>
        <div className='featured_image'>
          <label className='text-xl mb-2' htmlFor='featuredImage'>
            Featured Image
          </label>
          <input
            ref={inputRef}
            type='file'
            name='featuredImage'
            multiple
            id='featuredImage'
            // hidden={true}
            placeholder='Featured Image'
            // value={featuredImage}
          />
          <div className='uploadImage_btn my-4'>
            <button
              type='button'
              className='py-2 bg-indigo-700 rounded-md w-full max-w-[50%] text-white'
              onClick={handleUploadFeaturedImage}>
              Upload featured image
            </button>
          </div>
          {productData.featuredImage !== '' && (
            <div>
              <div className='featuredImgWrapper'>
                <Image
                  className='block'
                  src={productData.featuredImage}
                  alt='featured_image'
                  width={250}
                  height={250}
                  // layout='fill'
                />
              </div>
              <button onClick={deleteImage} className=''>
                Delete
              </button>
            </div>
          )}
        </div>
        <LoadingButton
          onClick={handleAddProduct}
          endIcon={<SendIcon />}
          loading={isLoading}
          loadingPosition='end'
          variant='filled'
          className='w-1/2 py-2 bg-indigo-600 text-white hover:bg-indigo-500 mt-12'>
          Add Product
        </LoadingButton>
      </form>
    </DashboardLayout>
  );
}

export default AddProduct;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && <div className='p-4 h-full'>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
