import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Delete, Edit } from '@mui/icons-material';

function ProductsTableRow({
  row,
  prepareRow,
  handleFetchCategoryProducts,
  handleClickOpen,
}) {
  prepareRow(row);
  return (
    <li key={row.id} className='productsData_row flex justify-between'>
      <span>{row?.cells[0].render('Cell')}</span>
      <div className='productsData_product flex items-center'>
        <div className='productData_img'>
          <Link
            href={`/v1/dashboard/products/${row?.cells[7].value}/edit`}
            passHref={true}>
            <a>
              {row?.cells[1].value !== '' ? (
                <Image
                  src={`${row?.cells[1].value}`}
                  layout='fill'
                  alt='product image'
                  objectFit='contain'
                />
              ) : (
                <Image
                  src='https://picsum.photos/50'
                  layout='fill'
                  alt='product image'
                />
              )}
            </a>
          </Link>
        </div>
        <div className='productData_info'>
          <Link
            passHref={true}
            href={`/v1/dashboard/products/${row?.cells[7].value}/edit`}>
            <a>{row?.cells[2].value}</a>
          </Link>
          <p className='productData_sku'>
            <span>SKU:</span> {row?.cells[8].value}
          </p>
        </div>
      </div>
      <div className='productData_brand'>
        <p>{row?.cells[3].value}</p>
      </div>
      <div className='productData_price'>
        <p>{row?.cells[4].value} $</p>
      </div>
      <div className='productData_category'>
        <button
          type='button'
          onClick={() => handleFetchCategoryProducts(row?.cells[5].value._id)}>
          {row?.cells[5].value.name}
        </button>
      </div>
      <div className='productData_stock productData_lowStock'>
        <span>{row?.cells[6].value} in stock</span>
      </div>
      <div className='productData_actions'>
        {/* <button type='button'>
          <MoreVertIcon />
        </button> */}
        <Link
          passHref={true}
          href={`/v1/dashboard/products/${row?.cells[7].value}/edit`}>
          <a>
            <Edit />
          </a>
        </Link>
        <Delete
          className='cursor-pointer'
          onClick={() => handleClickOpen(row?.cells[7].value)}
        />
      </div>
    </li>
  );
}

export default ProductsTableRow;
