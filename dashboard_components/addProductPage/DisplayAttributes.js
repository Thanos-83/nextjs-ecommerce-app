import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductAttribute from './ProductAttribute';
import { removeAttribute } from '../../features/productData/productDataSlice';

function DisplayAttributes() {
  const addedAttributes = useSelector(
    (state) => state.productData.productData.attributes
  );
  const dispatch = useDispatch();
  console.log('Attributes in Display Attrs: ', addedAttributes);

  return (
    <div>
      <ul className='space-y-4'>
        {addedAttributes.length > 0 &&
          addedAttributes.map((attribute) => (
            <ProductAttribute key={attribute._id} attribute={attribute} />
          ))}
      </ul>
    </div>
  );
}

export default DisplayAttributes;
