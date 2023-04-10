import { TextField } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

function EditSlug() {
  const productData = useSelector((state) => state.productData.productData);
  //   const dispatch = useDispatch();

  return (
    <div className='product_slug flex flex-col my-4'>
      <label htmlFor='productSlug'>Slug</label>
      <div className='productInput_slug'>
        <span>https://example.com/products/</span>
        <TextField
          fullWidth
          type='text'
          size='small'
          id='productSlug'
          name='productSlug'
          value={productData.name
            .replace(/\s/g, '-')
            .replace(/[()\\\/]/g, '-')
            .replace(/--/g, '-')
            .toLowerCase()}
          placeholder='Product Slug'
          InputProps={{
            readOnly: true,
            'aria-label': 'product slug',
          }}
        />
      </div>
      <p className='slug_helperText'>
        Unique human-readable product identifier. It is filled automatically
      </p>
    </div>
  );
}

export default EditSlug;
