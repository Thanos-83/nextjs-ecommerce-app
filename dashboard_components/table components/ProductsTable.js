import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import {
  useTable,
  usePagination,
  useRowSelect,
  useGlobalFilter,
} from 'react-table';
import { productColumns } from './productColumns';
import { TableCheckbox } from './TableCheckbox';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  MenuItem,
  Select,
  Skeleton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WarningIcon from '@mui/icons-material/Warning';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ProductsTableRow from '../productsListPage/ProductsTableRow';

function ProductsTable({
  deleteSingleProduct,
  deleteManyProducts,
  productDeleted,
}) {
  const [open, setOpen] = useState(false);
  const [productID, setProductID] = useState(null);
  const [dialogInfo, setDialogInfo] = useState({ num: 0 });
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tableRows, setTableRows] = useState(10);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/dashboard/products`)
      .then((res) => {
        // console.log('Use effect products: ', res.data);
        setProducts(res.data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [productDeleted]);

  const handleFetchCategoryProducts = (categoryID) => {
    alert(categoryID);

    setIsLoading(true);
    axios
      .get(`/api/dashboard/products/category/${categoryID}`)
      .then((res) => {
        console.log('Use effect products: ', res.data.product);
        setProducts(res.data.product);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleClickOpen = (id) => {
    setProductID(id);
    if (typeof id === 'string') {
      setDialogInfo({ num: 1 });
    } else {
      setDialogInfo({ num: id.length });
    }
    console.log(id);

    setOpen(true);
  };

  const handleClose = () => {
    setProductID(null);
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    if (typeof id === 'string') {
      deleteSingleProduct(productID);
    } else {
      deleteManyProducts(productID);
    }
    setProductID(null);
    setOpen(false);
  };

  const handleRows = (event) => {
    // console.log(event.target.value);
    setPageSize(event.target.value);

    setTableRows(event.target.value);
  };
  // console.log(optionsList);
  const tableColumns = useMemo(() => productColumns, []);
  // const tableData = useMemo(() => optionsList, [optionsList]);
  const tableData = useMemo(() => products, [products]);
  const tableInstance = useTable(
    { columns: tableColumns, data: tableData },
    useGlobalFilter,
    usePagination,
    useRowSelect,

    (hooks) => {
      hooks.visibleColumns.push((productColumns) => {
        return [
          {
            id: 'selection',
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <TableCheckbox {...getToggleAllPageRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <TableCheckbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...productColumns,
        ];
      });
    }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    selectedFlatRows,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const selectedRows = selectedFlatRows.map((flatRow) => flatRow.original._id);
  // console.log('Array of selected rows: ', selectedRows);

  return (
    <>
      <Dialog
        open={open}
        className='deleteDialog'
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title' className='deleteDialog_title'>
          <WarningIcon className='text-red' /> <span> Warning! </span>
        </DialogTitle>
        <DialogContent className='deleteDialog_content'>
          <DialogContentText id='alert-dialog-description'>
            You are going to delete <span className=''>{dialogInfo.num}</span>{' '}
            product(s). By clicing the agree button the product(s) will be
            deleted permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      {isLoading ? (
        <>
          <Skeleton className='mb-2' variant='text' width='100%' height={40} />
          <Skeleton className='mb-2' variant='text' width='100%' height={40} />
          <Skeleton className='mb-2' variant='text' width='100%' height={40} />
          <Skeleton className='mb-2' variant='text' width='100%' height={40} />
        </>
      ) : products?.length === 0 ? (
        <h1>There NO products yet!! Please add some...</h1>
      ) : (
        <div className='productsTable'>
          <div {...getTableProps()} className='w-full '>
            <div className='products_info'>
              <p>
                All Products: <span>{products?.length}</span>
              </p>
              <input
                className='productTable_search-input rounded-md border w-1/2 p-2'
                type='text'
                name='searchProducts'
                placeholder='Search products...'
              />
              {selectedRows?.length > 0 && (
                <Button
                  className='deleteBtn'
                  size='small'
                  variant='outlined'
                  color='primary'
                  onClick={() => handleClickOpen(selectedRows)}>
                  Delete Selected Products
                </Button>
              )}
            </div>
            <div className='productsTable_wrapper'>
              {/* <Divider /> */}
              {headerGroups.map((headerGroup) => (
                <div
                  className='productsTable_head'
                  key={headerGroup.id}
                  {...headerGroup.getHeaderGroupProps()}>
                  {/* {console.log('Header Group: ', headerGroup.headers)} */}

                  <div
                    className='productsTable_head-checkbox text-start '
                    {...headerGroup.headers[0].getHeaderProps()}
                    key={headerGroup.headers.id}>
                    {headerGroup.headers[0].render('Header')}
                  </div>
                  {/* <div
              className='productsTable_head-image text-start '
              {...headerGroup.headers[1].getHeaderProps()}
              key={headerGroup.headers.id}>
              {headerGroup.headers[1].render('Header')}
            </div> */}
                  <div
                    className='productsTable_head-name text-start '
                    {...headerGroup.headers[2].getHeaderProps()}
                    key={headerGroup.headers.id}>
                    {headerGroup.headers[2].render('Header')}
                  </div>
                  <div
                    className='productsTable_head-brand text-start '
                    {...headerGroup.headers[3].getHeaderProps()}
                    key={headerGroup.headers.id}>
                    {headerGroup.headers[3].render('Header')}
                  </div>
                  <div
                    className='productsTable_head-price text-start '
                    {...headerGroup.headers[4].getHeaderProps()}
                    key={headerGroup.headers.id}>
                    {headerGroup.headers[4].render('Header')}
                  </div>
                  <div
                    className='productsTable_head-category text-start '
                    {...headerGroup.headers[5].getHeaderProps()}
                    key={headerGroup.headers.id}>
                    {headerGroup.headers[5].render('Header')}
                  </div>
                  <div
                    className='productsTable_head-stock text-start '
                    {...headerGroup.headers[6].getHeaderProps()}
                    key={headerGroup.headers.id}>
                    {headerGroup.headers[6].render('Header')}
                  </div>
                  <div
                    className='productsTable_head-stock text-start '
                    {...headerGroup.headers[9].getHeaderProps()}
                    key={headerGroup.headers.id}>
                    {headerGroup.headers[9].render('Header')}
                  </div>
                  {/* {headerGroup.headers.map((column) => (
              <div
                className=' text-center '
                {...column.getHeaderProps()}
                key={column.name}>
                {column.render('Header')}
              </div>
            ))} */}
                </div>
              ))}
              {/* <Divider /> */}
              <ul {...getTableBodyProps()} className='productsTable_body'>
                {page?.map((row) => (
                  // console.log('Products Row: ', row);
                  <ProductsTableRow
                    key={row.id}
                    row={row}
                    prepareRow={prepareRow}
                    handleFetchCategoryProducts={handleFetchCategoryProducts}
                    handleClickOpen={handleClickOpen}
                  />
                ))}
              </ul>
            </div>
          </div>
          <Divider className='categoriesTable_divider' />
          <div className='productsTable_footer '>
            <div className='productsTable_footer-buttons'>
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                <FirstPageIcon />
              </button>
              <button
                type='button'
                onClick={() => previousPage()}
                disabled={!canPreviousPage}>
                Previous
              </button>
              <button
                type='button'
                onClick={() => nextPage()}
                disabled={!canNextPage}>
                Next
              </button>
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}>
                <LastPageIcon />
              </button>
            </div>
            <div className='productsTable_footer-pages'>
              <div className='productsTable_footer-pageNumber'>
                Showing Page <span> {state.pageIndex + 1}</span> of{' '}
                {pageOptions.length}
              </div>
              <Divider orientation='vertical' variant='middle' flexItem />
              <div className='productsTable_footer-pageRows'>
                <span className=''>Rows per page</span>
                <Select
                  labelId='select-table-rows'
                  id='select-rows'
                  value={tableRows}
                  // label='Rows'
                  size='small'
                  className='w-[7rem]'
                  onChange={handleRows}>
                  <MenuItem value={10}>Default</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsTable;
