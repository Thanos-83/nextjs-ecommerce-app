import React, { useState } from 'react';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductType } from '../../features/productData/productDataSlice';
function EditProductType() {
  const dispatch = useDispatch();
  const productToUpdate = useSelector((state) => state.productData.productData);

  const handleProductType = (event) => {
    dispatch(updateProductType(event.target.value));
  };

  return (
    <div className='productType flex items-center my-8'>
      <InputLabel htmlFor='select-type' id='select-product-type'>
        Select Product Type :
      </InputLabel>
      <Select
        labelId='select-product-type'
        id='select-type'
        value={productToUpdate?.type}
        // label='Age'
        size='small'
        onChange={handleProductType}>
        <MenuItem value={'Simple'}>Simple</MenuItem>
        <MenuItem value={'Variable'}>Variable</MenuItem>
        <MenuItem value={'Downloadable'}>Downloadable</MenuItem>
      </Select>
    </div>
  );
}

export default EditProductType;
