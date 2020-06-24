import React from 'react';
import InventoryListItem from './InventoryListItem.js';

const InventoryList = (props) => {

  let inventoryItems = "No items in inventory"

  if(props.inventory){
    inventoryItems = props.inventory.map((item, index) => {
      return <InventoryListItem name={item.name} key={index}/>
    })
  }

  return (
    <div className="container">
      <h2>Inventory</h2>
      <ul className="inventory-list">
        { inventoryItems }
      </ul>
    </div>

  )
};

export default InventoryList;
