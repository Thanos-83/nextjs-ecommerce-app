import React from 'react';
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateIsFeatured } from '../../features/productData/productDataSlice';

function EditProductVisibility() {
  const dispatch = useDispatch();
  const updateProduct = useSelector((state) => state.productData.productData);
  const handleFeaturedProduct = (e) => {
    console.log(e.target.checked);
    dispatch(updateIsFeatured(e.target.checked));
  };

  return (
    <div className='addProduct_formWrapper addProduct_visibilityInfo mb-8'>
      <h1>Product Visibility</h1>
      <FormControl>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          defaultValue='female'
          name='radio-buttons-group'>
          <FormControlLabel
            value='published'
            control={<Radio />}
            label='Published'
          />
          <FormControlLabel
            value='Scheduled'
            control={<Radio />}
            label='Scheduled'
          />
          <FormControlLabel value='hidden' control={<Radio />} label='Hidden' />
        </RadioGroup>
      </FormControl>
      <Divider />
      <div className='addProduct_featured'>
        <h1>Is Product Featured ?</h1>
        <Checkbox
          value={updateProduct.isFeatured}
          checked={updateProduct.isFeatured}
          onChange={handleFeaturedProduct}
        />
        {updateProduct.isFeatured && <span>Yes!</span>}
      </div>
    </div>
  );
}

export default EditProductVisibility;
