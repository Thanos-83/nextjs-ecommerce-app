import React, { useEffect, useState } from 'react';
import { Autocomplete, Checkbox, TextField } from '@mui/material';
import { nestedCategories } from '../../utils/flattenCategoriesList';
import { listCategories } from '../../utils/listCategories';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../../features/productData/productDataSlice';

function EditProductCategory() {
  const dispatch = useDispatch();
  const updateProduct = useSelector((state) => state.productData.productData);
  const [value, setValue] = useState('');

  const [optionsList, setOptionsList] = useState([]);
  useEffect(() => {
    axios
      .get('/api/dashboard/categories')
      .then((res) => {
        console.log('iam here...');
        const flattenList = nestedCategories(res.data);
        const list = listCategories(flattenList);
        setOptionsList(list);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className='product_category addProduct_formWrapper'>
      <h1>Parent Category</h1>
      <Autocomplete
        disableCloseOnSelect
        id='category-select'
        placeholder='Choose a category'
        autoHighlight
        size='small'
        value={value || null}
        defaultValue={updateProduct.category}
        options={optionsList || []}
        isOptionEqualToValue={(option, value) => option?.name === value?.name}
        getOptionLabel={(option) => (option?.name ? option.name : '')}
        renderOption={(props, option, { selected, inputValue }) => {
          return (
            <li {...props} className='cursor-pointer' key={option._id}>
              <Checkbox checked={selected} sx={{ ml: 2 * option.depth }} />
              {option.name}
            </li>
          );
        }}
        onChange={(event, value) => {
          setValue(value);
          dispatch(updateCategory(value?._id));
          console.log(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            id='parent category'
            name='parent category'
            size='small'
            placeholder='Choose parent category'
          />
        )}
      />
    </div>
  );
}

export default EditProductCategory;
