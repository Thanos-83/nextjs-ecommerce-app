import { Divider, Tab, Tabs, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ProductAttributes from './ProductAttributes';
import SendIcon from '@mui/icons-material/Send';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import TableViewIcon from '@mui/icons-material/TableView';
import ConstructionIcon from '@mui/icons-material/Construction';

function TabsPanel({
  initialAttributes,
  saveAttributesToState,
  setProductData,
  productData,
}) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {}, []);

  const getProductAttributes = (data) => {
    // const dataIDs = data.map((x) => x._id);
    console.log('Data Attributes: ', data);
    saveAttributesToState(data);
  };
  return (
    <>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        className='productAttributes_tabs'
        value={value}
        onChange={handleChange}
        aria-label='Product data'
        sx={{ borderRight: 1, borderColor: 'divider' }}>
        <Tab
          icon={<ConstructionIcon />}
          iconPosition='start'
          label='General'
          {...a11yProps(0)}
        />
        <Tab
          icon={<InventoryIcon />}
          iconPosition='start'
          label='Inventory'
          {...a11yProps(1)}
        />
        <Tab
          icon={<LocalShippingIcon />}
          iconPosition='start'
          label='Shipping'
          {...a11yProps(2)}
        />
        <Tab
          icon={<InsertLinkIcon />}
          iconPosition='start'
          label='Linked Products'
          {...a11yProps(3)}
        />
        <Tab
          icon={<TableViewIcon />}
          iconPosition='start'
          label='Attributes'
          {...a11yProps(4)}
        />
      </Tabs>
      <TabPanel value={value} index={0} className='flex-1 bg-white'>
        <div className='product_priceInfo'>
          <div className='product_price'>
            <label className='' htmlFor='productPrice'>
              Regular Price
            </label>
            <input
              type='number'
              id='productPrice'
              name='productPrice'
              value={productData.price}
              placeholder='Product Price'
              // step='0.00'
              onChange={(e) =>
                setProductData({
                  ...productData,
                  price: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className='product_salesPrice'>
            <label className='' htmlFor='productSalesPrice'>
              Product Sales Price
            </label>
            <input
              type='number'
              id='productSalesPrice'
              name='productSalesPrice'
              value={productData.price}
              placeholder='Product Price'
              // step='0.01'
              onChange={(e) =>
                setProductData({
                  ...productData,
                  price: parseFloat(e.target.value),
                  // price: e.target.value,
                })
              }
            />
          </div>
        </div>
        <Divider />
        <div className='product_taxInfo'>
          <div className='product_taxStatus'>
            <label className='' htmlFor='productTaxStatus'>
              Tax Status
            </label>
            <input
              type='text'
              id='productTaxStatus'
              name='productTaxStatus'
              // value={productData.price}
              placeholder='Tax Status'
            />
          </div>
          <div className='product_taxClass'>
            <label className='' htmlFor='productTaxClass'>
              Product Tax Class
            </label>
            <input
              type='text'
              id='productTaxClass'
              name='productTaxClass'
              placeholder='Tax Class'
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} className='flex-1 bg-white'>
        <div className='product_sku'>
          <label htmlFor='productSku'>Product SKU</label>
          <TextField
            type='text'
            size='small'
            fullWidth
            name='productSku'
            id='productSku'
            value={productData.sku}
            placeholder='Product SKU'
            onChange={(e) =>
              setProductData({ ...productData, sku: e.target.value })
            }
          />
        </div>{' '}
      </TabPanel>
      <TabPanel value={value} index={2} className='flex-1 bg-white'>
        Item three
      </TabPanel>
      <TabPanel value={value} index={3} className='flex-1 bg-white'>
        Item four
      </TabPanel>
      <TabPanel value={value} index={4} className='flex-1 bg-white '>
        <ProductAttributes
          getProductAttributes={getProductAttributes}
          // productAttributes={productAttributes}
          initialAttributes={initialAttributes}
        />
      </TabPanel>
    </>
  );
}

export default TabsPanel;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && <div className='px-4'>{children}</div>}
    </div>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
