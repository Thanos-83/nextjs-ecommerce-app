import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Delete, DragIndicator, ExpandMore } from '@mui/icons-material';
import ProductAttribute from './ProductAttribute';

function ProductAttributes({ getProductAttributes, initialAttributes }) {
  const [displayAttributes, setDisplayAttributes] = useState([]);
  const [addAttribute, setAddAttribute] = useState('');
  const [attributeValues, setAttributeValues] = useState([]);
  const [productAttributes, setProductAttributes] = useState([]);

  // console.log('Attr values', attributeValues);
  // console.log('initial attributes: ', initialAttributes);
  // console.log('Display attributes: ', displayAttributes);

  useEffect(() => {
    axios
      .get('/api/dashboard/products/attributes')
      .then((res) => {
        // console.log('Use effect attributes: ', res.data);
        setProductAttributes(res.data.attributes);
      })
      .catch((error) => console.log(error));

    setDisplayAttributes(initialAttributes);
  }, [initialAttributes]);

  // console.log('Product attrs component: ', productAttributes);

  const handleAddAttribute = () => {
    console.log('Add attribute: ', addAttribute);
    if (addAttribute) {
      const attr = productAttributes.find(
        (attrib) => attrib._id === addAttribute._id
      );
      // console.log(attr);
      setDisplayAttributes([...displayAttributes, attr]);
      setAddAttribute('');

      // console.log(displayAttributes);
    } else {
      alert('Please select an attribute!');
    }
  };
  // console.log(displayAttributes);
  const handleSaveAttributes = () => {
    getProductAttributes(displayAttributes);
  };

  const deleteLocalAttribute = (e, id) => {
    console.log(id);
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const updateLocalAttributes = displayAttributes.filter(
      (attr) => attr._id !== id
    );
    console.log(updateLocalAttributes);
    setDisplayAttributes(updateLocalAttributes);
  };

  //   console.log(displayAttributes);
  return (
    <div className='product_attributes'>
      <div className='product_attributesAdd'>
        <Autocomplete
          disableCloseOnSelect
          className='w-1/2 max-w-xs'
          id='attribute-select'
          autoHighlight
          size='small'
          options={productAttributes || []}
          getOptionLabel={(option) => option?.name || ''}
          renderOption={(props, option, { selected, inputValue }) => {
            return (
              <li {...props} className='cursor-pointer' key={option._id}>
                <Checkbox checked={selected} />
                {option.name}
              </li>
            );
          }}
          onChange={(event, value) => {
            console.log('onChange value: ', value);
            if (value) {
              setAddAttribute(value);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              id='product attribute'
              name='product attribute'
              // label='Product Attribute'
              size='small'
              placeholder='Choose product attribute(s)'
            />
          )}
        />
        <Button
          variant='outlined'
          color='success'
          type='button'
          // size='small'
          onClick={handleAddAttribute}>
          Add Attribute
        </Button>
      </div>
      <div className='productAttributes_list space-y-4 my-4'>
        <ul className='space-y-4 my-4'>
          {displayAttributes.length !== 0 &&
            displayAttributes.map((attribute) => (
              <ProductAttribute
                key={attribute._id}
                deleteLocalAttribute={deleteLocalAttribute}
                attribute={attribute}
                displayAttributes={displayAttributes}
              />
            ))}
        </ul>
      </div>
      <Button
        variant='outlined'
        className='mt-auto'
        size='small'
        onClick={handleSaveAttributes}>
        Save Attributes
      </Button>
    </div>
  );
}

export default ProductAttributes;
