import { TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateName } from '../../features/productData/productDataSlice';
function EditName() {
  const dispatch = useDispatch();
  const productToUpdate = useSelector((state) => state.productData.productData);
  const handleEditName = (e) => {
    dispatch(updateName(e.target.value));
    console.log(productToUpdate.name);
  };
  return (
    <div className='product_name flex flex-col my-4'>
      <label htmlFor='productName'>Name</label>
      <TextField
        fullWidth
        type='text'
        size='small'
        name='productName'
        id='productName'
        value={productToUpdate.name}
        placeholder='Product Name'
        onChange={handleEditName}
        inputProps={{ 'aria-label': 'add product name' }}
      />
    </div>
  );
}

export default EditName;
