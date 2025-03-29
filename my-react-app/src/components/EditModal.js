import React from 'react'

const EditModal = ({editItem,setEditItem,handleUpdateItem, setIsModalOpen}) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Edit Item</h2>
        <form onSubmit={handleUpdateItem}>
          <input
            type='text'
            value={editItem.name}
            onChange={(e)=>setEditItem({...editItem,name: e.target.value})}
            />
          <input
            type='text'
            value={editItem.location}
            onChange={(e)=>setEditItem({...editItem,location: e.target.value})}
            />
          <textarea
            value={editItem.description}
            onChange={(e)=> setEditItem((prevItem)=>({...prevItem, description: e.target.value}))}
            placeholder='description'
            />
          <div className='modal-buttons'>
            <button className='save-btn' type='submit'>Update</button>
            <button className='cancel-btn' onClick={()=>setIsModalOpen(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal