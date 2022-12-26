import { TextField } from '@mui/material';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateName } from '../../features/productData/productDataSlice';
function EditName() {
  const nameRef = useRef();

  //  const { data: session, status } = useSession();
  //  const router = useRouter();
  const dispatch = useDispatch();
  // dispatch(initializeProductData(product));
  const productToUpdate = useSelector((state) => state.productData.productData);
  //   console.log(nameRef.current.value);
  const handleEditName = (e) => {
    console.log(nameRef.current.value);

    dispatch(updateName(e.target.value));
    console.log(productToUpdate.name);
  };
  return (
    <div className='product_name flex flex-col my-4'>
      <label htmlFor='productName'>Name</label>
      <TextField
        inputRef={nameRef}
        fullWidth
        type='text'
        size='small'
        name='productName'
        id='productName'
        value={productToUpdate.name}
        placeholder='Product Name'
        onChange={handleEditName}
        inputProps={{ 'aria-label': 'add product name' }}
      />
    </div>
  );
}

export default EditName;
