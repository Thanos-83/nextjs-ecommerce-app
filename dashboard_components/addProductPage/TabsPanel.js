import { Divider, Tab, Tabs, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ProductAttributes from './ProductAttributes';
import SendIcon from '@mui/icons-material/Send';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import TableViewIcon from '@mui/icons-material/TableView';
import ConstructionIcon from '@mui/icons-material/Construction';
import ProductGeneral from './ProductGeneral';
import ProductInventory from './ProductInventory';

function TabsPanel() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <div>
          <ProductGeneral />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} className='flex-1 bg-white'>
        <div className='product_sku'>
          <ProductInventory />
        </div>
      </TabPanel>
      <TabPanel value={value} index={2} className='flex-1 bg-white'>
        Item three
      </TabPanel>
      <TabPanel value={value} index={3} className='flex-1 bg-white'>
        Item four
      </TabPanel>
      <TabPanel value={value} index={4} className='flex-1 bg-white '>
        <ProductAttributes />
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
