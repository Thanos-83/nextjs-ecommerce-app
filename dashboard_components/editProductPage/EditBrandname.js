import { TextField } from '@mui/material';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBrand } from '../../features/productData/productDataSlice';

function EditBrandname() {
  const brandRef = useRef();
  // console.log(brandRef.current.value);

  const dispatch = useDispatch();
  const productToUpdate = useSelector((state) => state.productData.productData);
  const handleEditBrand = (e) => {
    dispatch(updateBrand(e.target.value));
  };
  return (
    <div className='product_brandname flex flex-col my-4'>
      <label htmlFor='productBrandname'>Brandname</label>
      <TextField
        // inputRef={brandRef}
        fullWidth
        type='text'
        size='small'
        name='productBrandname'
        id='productBrandname'
        value={productToUpdate.brand}
        onChange={handleEditBrand}
        placeholder='Product Brandname'
        inputProps={{ 'aria-label': 'add product brand' }}
      />
    </div>
  );
}

export default EditBrandname;
