import React, { useState, useEffect } from 'react';
import { getItems, addItem, deleteItem, updateItem } from './api/api';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [editItem, setEditItem] = useState(null); // Store item being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getItems();
    setItems(data);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!name || !location) return alert('Please fill out both fields');

    try {
      await addItem({ name, location });
      setName('');
      setLocation('');
      fetchData();
    } catch (error) {
      alert('Failed to add item.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems(items.filter(item => item.id !== id)); // Remove from state
    } catch (error) {
      alert('Failed to delete item.');
    }
  };

  const handleEditClick = (item) => {
    setEditItem(item); // Set the selected item for editing
    setIsModalOpen(true); // Open the modal
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    if (!editItem.name || !editItem.location) return alert("Please fill out all fields");

    try {
      await updateItem(editItem.id, { name: editItem.name, location: editItem.location });
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      alert("Failed to update item.");
    }
  };

  return (
    <div className="App">
      <h1>Supabase Item Manager</h1>

      {/* Add Item Form */}
      <form onSubmit={handleAddItem}>
        <input 
          type="text" 
          placeholder="Item Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Location" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
        />
        <button type="submit">Add Item</button>
      </form>

      {/* Items List */}
      <h2>Items List:</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.location}
            <button onClick={() => handleEditClick(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Update Item Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Item</h2>
            <form onSubmit={handleUpdateItem}>
              <input 
                type="text" 
                value={editItem.name} 
                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
              />
              <input 
                type="text" 
                value={editItem.location} 
                onChange={(e) => setEditItem({ ...editItem, location: e.target.value })}
              />
              <button type="submit">Update</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;