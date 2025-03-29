import React, { useState } from 'react'

const AddItemForm = ({ presetLocations, handleAddItem}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <button onClick={()=> setShowForm(!showForm)}>Add Item</button>

      {showForm && (
        <form onSubmit={(e)=>{
          e.preventDefault();
          handleAddItem(name, location);
          setName('');
          setLocation('');
          setShowForm(false);
        }}>
          <input
            type='text'
            placeholder='Item Name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">Select a Location</option>
            {presetLocations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
            <button type='submit'></button>
        </form>
      )}
    </div>
  );
};

export default AddItemForm;