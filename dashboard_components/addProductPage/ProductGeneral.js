import { TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ProductGeneralInfo() {
  const [priceValue, setPriceValue] = useState(0);
  const productData = useSelector((state) => state.productData.productData);
  const handleProductPrice = (e) => {
    // setProductData({
    //   ...productData,
    //   price: parseFloat(e.target.value),
    // });
    console.log(typeof productData.price);
  };
  return (
    <div className='flex items-center space-x-4'>
      <label htmlFor='product price'>Product Price</label>
      <TextField
        value={productData.price}
        id='product price'
        size='small'
        type='number'
        placeholder='regurlar price'
        onChange={handleProductPrice}
      />
    </div>
  );
}

export default ProductGeneralInfo;
