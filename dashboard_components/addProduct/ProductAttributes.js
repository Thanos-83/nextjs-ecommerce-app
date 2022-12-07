import * as React from 'react';
import { useEffect, useState } from 'react';

import { Autocomplete, Button, Checkbox, TextField } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Delete, DragIndicator, ExpandMore } from '@mui/icons-material';

function ProductAttributes({
  productAttributes,
  getProductAttributes,
  initialAttributes,
}) {
  const [displayAttributes, setDisplayAttributes] = useState(initialAttributes);
  const [savedAttributes, setSavedAttributes] = useState([]);
  const [addAttribute, setAddAttribute] = useState('');
  const [attributeValues, setAttributeValues] = useState([]);
  // console.log('Attr values', attributeValues);
  console.log('initial attributes: ', initialAttributes);
  const handleAddAttribute = () => {
    // console.log(addAttribute);
    if (addAttribute) {
      const attr = productAttributes.find(
        (attrib) => attrib._id === addAttribute
      );
      // console.log(attr);
      setAddAttribute('');

      setDisplayAttributes([...displayAttributes, attr]);
      // console.log(displayAttributes);
    } else {
      alert('Please select an attribute!');
    }
  };
  // console.log(displayAttributes);
  const handleSaveAttributes = () => {
    // console.log(displayAttributes);
    localStorage.setItem('attributes', JSON.stringify(displayAttributes));
    getProductAttributes(JSON.parse(localStorage.getItem('attributes')));
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

    // localStorage.setItem('attributes', JSON.stringify(updateLocalAttributes));
    // alert(`delete attribute with id: ${id} `);
  };

  useEffect(() => {
    const localAttributes = JSON.parse(localStorage.getItem('attributes'));
    if (localAttributes) {
      setDisplayAttributes(localAttributes);
      //   console.log(localAttributes);
      //   console.log(displayAttributes);
    }
  }, []);
  //   console.log(displayAttributes);
  return (
    <div className='product_attributes'>
      <div className='flex items-center gap-8'>
        <Autocomplete
          // multiple
          disableCloseOnSelect
          className='w-1/2 max-w-xs'
          id='attribute-select'
          placeholder='Choose an attribute'
          autoHighlight
          size='small'
          options={productAttributes || []}
          getOptionDisabled={(option) =>
            // (option = true)
            {
              // console.log('Disable display attrs: ', displayAttributes);
              // console.log(option);
              const x = displayAttributes.some(
                (attr) => attr.name === option.name
              );
              // console.log(`Option ${option.name} = ${x}`);
              return x;
            }
          }
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option?.name}
          renderOption={(props, option, { selected, inputValue }) => {
            return (
              <li {...props} className='cursor-pointer' key={option._id}>
                <Checkbox checked={selected} sx={{ ml: 2 * option.depth }} />
                {option.name}
              </li>
            );
          }}
          onChange={(event, value) => {
            // console.log(value);
            if (value) {
              setAddAttribute(value._id);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              id='product attribute'
              name='product attribute'
              label='Product Attribute'
              size='small'
              placeholder='Choose product attribute(s)'
              value={addAttribute}
            />
          )}
        />
        <button type='button' onClick={handleAddAttribute}>
          Add Attribute
        </button>
      </div>
      <div className='productAttributes_list space-y-4 my-4'>
        <ul className='space-y-4 my-4'>
          {displayAttributes.length !== 0 &&
            displayAttributes.map((attribute) => {
              return (
                <li key={attribute._id}>
                  <Accordion key={attribute._id}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls='panel1a-content'
                      id='panel1a-header'
                      className='bg-gray-500 flex items-center'>
                      <p>{attribute.name}</p>
                      <DragIndicator className='productAttributes_drag ' />
                      <Delete
                        className='mr-4 w-5 h-5'
                        onClick={(e) => deleteLocalAttribute(e, attribute._id)}
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
                          defaultValue={attributeValues}
                          options={attribute.terms || []}
                          isOptionEqualToValue={(option, value) =>
                            // console.log(value);
                            option.slug === value.slug
                          }
                          getOptionLabel={(option) => option?.slug}
                          renderOption={(
                            props,
                            option,
                            { selected, inputValue }
                          ) => {
                            return (
                              <li
                                {...props}
                                className='cursor-pointer'
                                key={option._id}>
                                <Checkbox checked={selected} />
                                {option.slug}
                              </li>
                            );
                          }}
                          onChange={(event, value) => {
                            console.log(value);

                            if (value.length > 0) {
                              setAttributeValues(value);
                              //   attribute.terms = value;
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              id='product attribute'
                              name='product attribute'
                              label='Product Attribute'
                              size='small'
                              placeholder='Choose product attribute'
                              value={addAttribute}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </Accordion>
                </li>
              );
            })}
        </ul>
      </div>
      <Button
        variant='outlined'
        className='mt-auto'
        onClick={handleSaveAttributes}>
        Save Attributes
      </Button>
    </div>
  );
}

export default ProductAttributes;
