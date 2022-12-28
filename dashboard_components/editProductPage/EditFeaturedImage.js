import React from 'react';
import Image from 'next/image';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

function EditFeaturedImage() {
  const productData = useSelector((state) => state.productData.productData);
  const dispatch = useDispatch();

  return (
    <div className='featured_imageDisplay'>
      <div className='featuredImgWrapper'>
        {productData.featuredImage !== '' && (
          <>
            <Image
              className='block'
              src={productData.featuredImage}
              alt='featured_image'
              objectFit='contain'
              layout='fill'
            />
            <button
              type='button'
              aria-label='delete featured image'
              // onClick={deleteImage}
              className=''>
              <Delete />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EditFeaturedImage;
