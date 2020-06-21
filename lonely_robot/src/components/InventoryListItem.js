import React from 'react';

const InventoryListItem = (props) => {
  if(!props.name) return null;

  return(
    <li className="inventory-item">
      <img src={`assets/images/items/${props.name}.png`} alt=""/>
      <p>{ props.name }</p>
    </li>
  )
}

export default InventoryListItem;
