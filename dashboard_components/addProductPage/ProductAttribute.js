import React, { useState } from 'react';
import { Delete, DragIndicator, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionSummary,
  Autocomplete,
  Checkbox,
  TextField,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { removeAttribute } from '../../features/productData/productDataSlice';

function ProductAttribute({ attribute }) {
  const [updateAttributeTerms, setUpdateAttributeTerms] = useState(null);
  const dispatch = useDispatch();
  const deleteAttribute = (event, id) => {
    event.stopPropagation();
    alert(id);
    dispatch(removeAttribute(id));
  };

  return (
    <li key={attribute._id}>
      <Accordion key={attribute._id}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          className='bg-gray-500 flex items-center'>
          <p>{attribute.name}</p>
          <DragIndicator
            className='productAttributes_drag '
            onClick={(event) => event.stopPropagation()}
          />
          <Delete
            className='mr-4 w-5 h-5'
            onClick={(event) => deleteAttribute(event, attribute._id)}
          />
        </AccordionSummary>
        <div className='attribute_data flex items-start gap-4 p-4'>
          <div className='attribute_name'>
            <p className='mb-4'>Attribute Name</p>
            <h3>{attribute.name}</h3>
          </div>
          <div className='attribute_values flex-1 ml-8'>
            <p className='mb-4'>Value(s)</p>
            <Autocomplete
              multiple
              disableCloseOnSelect
              className='w-full'
              id='attribute-values'
              placeholder='Choose value(s)'
              autoHighlight
              size='small'
              // defaultValue={attributeValues}
              options={attribute.terms || []}
              isOptionEqualToValue={
                (option, value) => option.slug === value.slug
                // console.log(value)
              }
              getOptionLabel={(option) => option?.slug}
              renderOption={(props, option, { selected, inputValue }) => {
                // console.log(option);
                return (
                  <li {...props} className='cursor-pointer' key={option._id}>
                    <Checkbox checked={selected} />
                    {option.slug}
                  </li>
                );
              }}
              onChange={(event, value) => {
                console.log(value, attribute._id);
                if (value.length > 0) {
                  updateAttributeTerms(value, attribute._id);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id='product attribute'
                  name='product attribute'
                  size='small'
                  placeholder='Choose attribute values'
                />
              )}
            />
          </div>
        </div>
      </Accordion>
    </li>
  );
}

export default ProductAttribute;
