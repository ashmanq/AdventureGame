import React from 'react';

const InventoryListItem = (props) => {
  if(!props.name) return null;

  return(
    <li className="inventory-item">{ props.name }</li>
  )
}

export default InventoryListItem;
