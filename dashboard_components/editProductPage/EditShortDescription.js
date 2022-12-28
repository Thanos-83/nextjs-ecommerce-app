import { TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateShortDescription } from '../../features/productData/productDataSlice';
function EditShortDescription() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productData.productData);
  return (
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
        onChange={(e) => dispatch(updateShortDescription(e.target.value))}
        inputProps={{
          'aria-label': 'add product short description',
        }}
      />
    </div>
  );
}

export default EditShortDescription;
