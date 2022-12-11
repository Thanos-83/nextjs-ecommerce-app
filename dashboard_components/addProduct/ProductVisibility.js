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

function ProductVisibility() {
  return (
    <div className='addProduct_formWrapper addProduct_visibilityInfo mb-8'>
      <h1>Product Visibility</h1>
      <FormControl>
        {/* <FormLabel id='demo-radio-buttons-group-label'>Visibility</FormLabel> */}
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
        <h1>Is Product Featured</h1>
        <Checkbox />
      </div>
    </div>
  );
}

export default ProductVisibility;
