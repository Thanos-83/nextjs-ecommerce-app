import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Autocomplete, Button, Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisplayAttributes from './DisplayAttributes';
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
import { useSelector, useDispatch } from 'react-redux';
import { updateProductAttribute } from '../../features/productData/productDataSlice';

function ProductAttributes() {
  const addedAttributes = useSelector(
    (state) => state.productData.productData.attributes
    // (state) => state.productAttributes.attributes
  );
  const dispatch = useDispatch();
  console.log('iam here 2', addedAttributes);
  const [value, setValue] = useState('');
  const [productAttributesOptions, setProductAttributesOptions] = useState([]);

  useEffect(() => {
    axios
      .get('/api/dashboard/products/attributes')
      .then((res) => {
        console.log('Attributes: ', res);
        setProductAttributesOptions(res.data.attributes);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAddAttribute = () => {
    if (value !== '') {
      if (!addedAttributes?.find((attr) => attr._id === value._id)) {
        // dispatch(addAttribute(value));
        dispatch(updateProductAttribute(value));
      } else {
        alert('attribute exists');
      }
    } else {
      alert('please select attribute');
    }
  };

  return (
    <div className='product_attributes'>
      <div className='product_attributesAdd'>
        <Autocomplete
          id='product attributes'
          options={productAttributesOptions}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => {
            if (newValue) {
              setValue(newValue);
            } else {
              setValue('');
            }
          }}
          sx={{ width: 300 }}
          size='small'
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={selected}
              />
              {option.name}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} placeholder='Select product attribute' />
          )}
        />
        <Button size='small' variant='outlined' onClick={handleAddAttribute}>
          Save Attribute
        </Button>
      </div>
      <div className='mt-4'>
        <DisplayAttributes />
      </div>
    </div>
  );
}

export default ProductAttributes;
