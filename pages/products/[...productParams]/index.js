import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import RowContainer from '../../../components/design_components/RowContainer';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../features/basketItems/cartItemsSlice';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs, Zoom } from 'swiper';

function SingleProduct() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const [singleProduct, setSingleProduct] = useState(null);
  const productSku = router.query.productParams?.slice(-1)[0];
  // console.log(productSku);

  useEffect(() => {
    axios
      .get(`/api/products/sku/${productSku}`)
      .then(
        (res) => setSingleProduct(res.data.product)
        // console.log(res.data.product)
      )
      .catch((error) => console.log(error));
  }, [productSku]);
  console.log(singleProduct);

  const handleAddToCart = (productData) => {
    dispatch(addToCart(productData));
  };

  return (
    <Layout>
      <RowContainer>
        <p className='my-8'>Breadcrumb goes here....</p>
      </RowContainer>
      <RowContainer>
        <div className='singleProductTop'>
          <div className='singleProductTop_left'>
            {singleProduct?.imageGallery.length > 0 ? (
              <div className='sliderContainer border-2'>
                <Swiper
                  zoom={true}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  modules={[FreeMode, Navigation, Thumbs, Zoom]}
                  className='slider_wrapper'>
                  {singleProduct?.imageGallery.map((image, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        alt='image gallery'
                        src={
                          image !== null
                            ? image
                            : 'https://via.placeholder.com/500.png'
                        }
                        width={700}
                        height={700}
                        objectFit='contain'
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className='thumbsContainer'>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    loop={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className='mySwiper'>
                    {singleProduct?.imageGallery.map((img, index) => (
                      <SwiperSlide key={index}>
                        <div className='thumbs_wrapper border'>
                          <Image
                            alt='image gallery'
                            src={
                              img !== null
                                ? img
                                : 'https://via.placeholder.com/140.png'
                            }
                            width={140}
                            height={140}
                            objectFit='contain'
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            ) : (
              <div className='singleProduct_featuredImage'>
                <Image
                  alt='image gallery'
                  src={singleProduct?.featuredImage}
                  width={600}
                  height={600}
                />
              </div>
            )}
          </div>
          <div className='singleProductTop_right'>
            <h1 className='heading1'>{singleProduct?.name}</h1>
            {singleProduct?.attributes.map((attribute) => (
              <>
                <h1 className='text-lg' key={attribute._id}>
                  {attribute.name}
                </h1>
                {attribute?.terms.map((term) => (
                  <span key={term._id}>{term?.name}</span>
                ))}
              </>
            ))}

            <p>{singleProduct?.price} Euro</p>
            <div className='simgleProduct_addToCart flex items-center'>
              <div className='singleProduct_quantity flex items-center space-x-4 mr-8'>
                <button
                  onClick={() => setProductQuantity((pre) => pre - 1)}
                  type='button'
                  disabled={productQuantity < 1 ? true : false}
                  className={`singleProduct_increment border p-1  rounded-sm bg-slate-200 ${
                    productQuantity < 1
                      ? 'bg-slate-200 cursor-not-allowed'
                      : 'bg-violet-400 text-white'
                  }`}>
                  <RemoveIcon />
                </button>
                <p className='font-semibold w-3'>{productQuantity}</p>
                <button
                  onClick={() => setProductQuantity((pre) => pre + 1)}
                  type='button'
                  className='singleProduct_decrement border p-1 rounded-sm bg-violet-400 text-white'>
                  <AddIcon />
                </button>
              </div>
              <Button
                color='secondary'
                variant='contained'
                disabled={productQuantity < 1 ? true : false}
                onClick={() =>
                  handleAddToCart({
                    productID: singleProduct._id,
                    image: singleProduct.featuredImage,
                    quantity: productQuantity,
                    title: singleProduct.name,
                    price: singleProduct.price,
                    productType: singleProduct.type,
                  })
                }>
                Add to cart
              </Button>
            </div>
          </div>
        </div>
        <div className='singleProductBottom'>
          <div className='singleProduct_description'>
            <p>{singleProduct?.description}</p>
          </div>
        </div>
      </RowContainer>
    </Layout>
  );
}

export default SingleProduct;
