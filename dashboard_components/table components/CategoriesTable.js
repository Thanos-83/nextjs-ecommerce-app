import { Delete, Edit } from '@mui/icons-material';
import React, { useMemo } from 'react';
import Link from 'next/link';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

import {
  useTable,
  usePagination,
  useRowSelect,
  useGlobalFilter,
} from 'react-table';
import { columns } from './columns';
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
} from '@mui/material';
import RowCategory from '../categoriesPage/RowCategory';

function CategoriesTable({
  optionsList,
  deleteSingleCategory,
  deleteManyCategories,
}) {
  const [open, setOpen] = React.useState(false);
  const [categoryID, setCategoryID] = React.useState('');

  const handleClickOpen = (id) => {
    setCategoryID(id);
    // alert(id);

    setOpen(true);
  };

  const handleClose = () => {
    setCategoryID('');
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    // alert(categoryID);
    deleteSingleCategory(categoryID);
    setCategoryID('');
    setOpen(false);
  };
  const [tableRows, setTableRows] = React.useState(10);

  const handleRows = (event) => {
    console.log(event.target.value);
    setPageSize(event.target.value);

    setTableRows(event.target.value);
  };
  // console.log(optionsList);
  const tableColumns = useMemo(() => columns, []);
  const tableData = useMemo(() => optionsList, [optionsList]);
  const tableInstance = useTable(
    { columns: tableColumns, data: tableData },
    useGlobalFilter,
    usePagination,
    useRowSelect,

    (hooks) => {
      hooks.visibleColumns.push((columns) => {
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
          ...columns,
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
  console.log('Array of selected rows: ', selectedRows);

  // console.log('State: ', state);
  // console.log('Page Options: ', pageOptions);
  // console.log('Page Count: ', pageCount);
  // console.log('Page Size: ', setPageSize);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        className='deleteBtn'
        size='small'
        variant='outlined'
        color='primary'
        onClick={() => deleteManyCategories(selectedRows)}>
        Delete
      </Button>
      <Divider className='categoriesTable_divider' />
      <div {...getTableProps()} className='w-full '>
        {headerGroups.map((headerGroup) => (
          <div
            className='categoriesTable_head'
            key={headerGroup.id}
            {...headerGroup.getHeaderGroupProps()}>
            {console.log('Header Group: ', headerGroup.headers)}

            {headerGroup.headers.map((column) => (
              <div
                className=' text-center'
                {...column.getHeaderProps()}
                key={column.name}>
                {/* {console.log('Header Column: ', column)} */}
                {column.render('Header')}
              </div>
            ))}
          </div>
        ))}
        <ul {...getTableBodyProps()} className='table_body'>
          {page?.map((row) => {
            // console.log('Row: ', row);
            prepareRow(row);
            return (
              <RowCategory
                key={row.id}
                row={row}
                handleClickOpen={handleClickOpen}
              />
            );
          })}
        </ul>
      </div>
      <Divider className='categoriesTable_divider' />
      <div className='space-x-4'>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
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
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <span>
          <span className='mr-2'>Rows per page</span>
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
        </span>
        <span>
          Page {state.pageIndex + 1} of {pageOptions.length}
        </span>
      </div>
    </>
  );
}

export default CategoriesTable;
