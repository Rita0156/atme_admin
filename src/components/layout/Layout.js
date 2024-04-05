import React, { useState } from 'react';
import Header from '../header';
import ResponsiveDrawer from '../sidebar';


const Layout1 = ({headerTitle}) => {
  const [selectedItem, setSelectedItem] = useState('Category');

  const handleListItemClick = (text) => {
    setSelectedItem(text);
  };

  return (
    <div>
      <Header headerName={headerTitle?headerTitle:selectedItem} />
      <ResponsiveDrawer onItemClick={handleListItemClick}/>
    </div>
  );
};

export default Layout1;
