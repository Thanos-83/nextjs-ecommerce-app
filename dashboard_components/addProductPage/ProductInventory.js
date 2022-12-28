import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import { updateSku } from '../../features/productData/productDataSlice';
function ProductInventory() {
  const productData = useSelector((state) => state.productData.productData);
  const dispatch = useDispatch();
  const skuRef = useRef();
  const handleSKU = (e) => {
    // console.log(skuRef.current.value);
    // setProductData({ ...productData, sku: e.target.value });
    dispatch(updateSku(e.target.value));
  };

  return (
    <div className='flex items-center'>
      <label htmlFor='product sku'>Product SKU</label>
      <TextField
        inputRef={skuRef}
        value={productData.sku}
        id='product sku'
        placeholder='Product SKU'
        variant='outlined'
        size='small'
        fullWidth
        onChange={handleSKU}
      />
    </div>
  );
}

export default ProductInventory;
