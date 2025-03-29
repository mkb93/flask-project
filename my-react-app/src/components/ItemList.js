import React from 'react';

const ItemList = ({ items, handleEditClick, handleDelete}) => {
  return (
    <ul>
      {items.map((item) =>(
        <li key={item.id}>
          <strong>{item.name}</strong> - {item.location}
          <button onClick={()=> handleEditClick(item)}>Edit</button>
          <button onClick={()=> handleDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;