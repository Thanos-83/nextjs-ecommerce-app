import React from 'react';
import Link from 'next/link';
import { Delete, Edit, SubdirectoryArrowRight } from '@mui/icons-material';

function RowCategory({ row, handleClickOpen }) {
  // console.log('Row: ', row);
  return (
    <li
      // {...row.getRowProps()}
      className='category_row'>
      <div {...row?.cells[0].getCellProps()} className='table_checkbox'>
        {row?.cells[0].render('Cell')}
      </div>
      <div {...row?.cells[1].getCellProps()} className='categoryRow_title'>
        <Link
          href={`/v1/dashboard/products/categories/${row?.cells[6].value}/edit`}>
          <a
            className={`my-2 ${
              row?.cells[4].value === 1
                ? 'ml-4'
                : row?.cells[4].value === 2
                ? 'ml-8'
                : row?.cells[4].value === 3
                ? 'ml-12'
                : row?.cells[4].value === 4
                ? 'ml-16'
                : row?.cells[4].value === 5
                ? 'ml-20'
                : row?.cells[4].value === 6
                ? 'ml-24'
                : 'ml-0'
            }`}>
            {row?.cells[4].value !== 0 && (
              <SubdirectoryArrowRight className='w-4 h-4 text-indigo-300' />
            )}
            {row?.cells[1].value}
          </a>
        </Link>
      </div>
      <div className='table_checkbox text-left'>
        {row?.cells[2].render('Cell')}
      </div>
      <div {...row?.cells[3].getCellProps()} className='text-center'>
        {row?.cells[3].value.length}
      </div>
      <div {...row?.cells[4].getCellProps()} className='text-center'>
        {row?.cells[4].value}
      </div>
      <div {...row?.cells[5].getCellProps()} className='text-center'>
        <Edit />
        <Delete
          className='cursor-pointer'
          onClick={() => handleClickOpen(row?.cells[6].value)}
        />
      </div>
      {/* {row.cells.map((cell) => {
                      console.log('Cell: ', cell.value);
                      return (
                        <td
                          key={cell}
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })} */}
    </li>
  );
}

export default RowCategory;
