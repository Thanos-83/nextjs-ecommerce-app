import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@mui/material';

function ProductInventory() {
  const productData = useSelector((state) => state.productData.productData);

  const handleSKU = (e) => {
    // setProductData({ ...productData, sku: e.target.value });
  };

  return (
    <div className='flex items-center'>
      <label htmlFor='product sku'>Product SKU</label>
      <TextField
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
