import { TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDescription } from '../../features/productData/productDataSlice';

function EditDescription() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productData.productData);
  return (
    <div className='product_description'>
      <label htmlFor='productFullDescription'>Full Description</label>
      <TextField
        multiline
        rows={8}
        fullWidth
        placeholder='Add product complete description'
        value={productData.description}
        name='productFullDescription'
        id='productFullDescription'
        onChange={(e) => dispatch(updateDescription(e.target.value))}
        inputProps={{
          'aria-label': 'add product full description',
        }}
      />
    </div>
  );
}

export default EditDescription;
