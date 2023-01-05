import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import RowContainer from '../../../components/design_components/RowContainer';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
function SingleProduct() {
  const router = useRouter();
  const [singleProduct, setSingleProduct] = useState(null);
  const productSku = router.query.productParams?.slice(-1)[0];
  // console.log(productSku);

  useEffect(() => {
    axios
      .get(`/api/products/sku/${productSku}`)
      .then((res) => setSingleProduct(res.data.product))
      .catch((error) => console.log(error));
  }, [productSku]);
  console.log(singleProduct);
  return (
    <Layout>
      <RowContainer>
        <div>
          <div className='relative w-72 h-96'>
            <Image
              src={singleProduct?.featuredImage}
              alt={singleProduct?.name}
              layout='fill'
            />
          </div>
          <p>{singleProduct?.name}</p>
        </div>
      </RowContainer>
    </Layout>
  );
}

export default SingleProduct;
