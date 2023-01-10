import React from 'react';
import Image from 'next/image';
import { Delete, UploadFile } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
// import { initializeProductData } from '../../features/productData/productDataSlice';

function ImageGallery({ uploadImage }) {
  const productData = useSelector((state) => state.productData.productData);
  const dispatch = useDispatch();
  console.log(productData);

  return (
    <div className='addProduct_imageGallery addProduct_formWrapper'>
      <h1>
        Image Gallery
        <span className='text-red-500 text-sm ml-4'>
          Delete Not working yet
        </span>
      </h1>

      <div>
        <div className='imageGalleryWrapper'>
          {productData?.imageGallery.map((image, index) => (
            <div key={index}>
              {productData?.imageGallery[index] && (
                <Image
                  className='block'
                  src={image}
                  alt='slider image'
                  objectFit='contain'
                  layout='fill'
                />
              )}
              <div>
                <button
                  type='button'
                  aria-label='upload image'
                  className='mr-4'
                  onClick={() => uploadImage(index + 1)}>
                  <UploadFile />
                </button>
                <button
                  type='button'
                  aria-label='upload image'
                  // onClick={deleteImage}
                  className=''>
                  <Delete />
                </button>
              </div>
            </div>
          ))}
          {/* <div>
            {productData?.imageGallery[0] && (
              <Image
                className='block'
                src={productData?.imageGallery[0]}
                alt='featured_image'
                objectFit='contain'
                layout='fill'
              />
            )}
            <div>
              <button
                type='button'
                aria-label='upload image'
                className='mr-4'
                onClick={() => uploadImage(1)}>
                <UploadFile />
              </button>
              <button
                type='button'
                aria-label='upload image'
                // onClick={deleteImage}
                className=''>
                <Delete />
              </button>
            </div>
          </div>
          <div>
            {productData?.imageGallery[1] && (
              <Image
                className='block'
                src={productData?.imageGallery[1]}
                alt='featured_image'
                objectFit='contain'
                layout='fill'
              />
            )}
            <div>
              <button
                type='button'
                aria-label='upload image'
                className='mr-4'
                onClick={() => uploadImage(2)}>
                <UploadFile />
              </button>
              <button
                type='button'
                aria-label='upload image'
                // onClick={deleteImage}
                className=''>
                <Delete />
              </button>
            </div>
          </div>
          <div>
            {productData?.imageGallery[2] && (
              <Image
                className='block'
                src={productData?.imageGallery[2]}
                alt='featured_image'
                objectFit='contain'
                layout='fill'
              />
            )}
            <div>
              <button
                type='button'
                aria-label='upload image'
                className='mr-4'
                onClick={() => uploadImage(3)}>
                <UploadFile />
              </button>
              <button
                type='button'
                aria-label='upload image'
                // onClick={deleteImage}
                className=''>
                <Delete />
              </button>
            </div>
          </div>
          <div>
            {productData?.imageGallery[3] && (
              <Image
                className='block'
                src={productData?.imageGallery[3]}
                alt='featured_image'
                objectFit='contain'
                layout='fill'
              />
            )}
            <div>
              <button
                type='button'
                aria-label='upload image'
                className='mr-4'
                onClick={() => uploadImage(4)}>
                <UploadFile />
              </button>
              <button
                type='button'
                aria-label='upload image'
                // onClick={deleteImage}
                className=''>
                <Delete />
              </button>
            </div>
          </div>
          <div>
            {productData?.imageGallery[4] && (
              <Image
                className='block'
                src={productData?.imageGallery[4]}
                alt='featured_image'
                objectFit='contain'
                layout='fill'
              />
            )}
            <div>
              <button
                type='button'
                aria-label='upload image'
                className='mr-4'
                onClick={() => uploadImage(5)}>
                <UploadFile />
              </button>
              <button
                type='button'
                aria-label='upload image'
                // onClick={deleteImage}
                className=''>
                <Delete />
              </button>
            </div>
          </div>
          <div>
            {productData?.imageGallery[5] && (
              <Image
                className='block'
                src={productData?.imageGallery[5]}
                alt='featured_image'
                objectFit='contain'
                layout='fill'
              />
            )}
            <div>
              <button
                type='button'
                aria-label='upload image'
                className='mr-4'
                onClick={() => uploadImage(6)}>
                <UploadFile />
              </button>
              <button
                type='button'
                aria-label='upload image'
                // onClick={deleteImage}
                className=''>
                <Delete />
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ImageGallery;
