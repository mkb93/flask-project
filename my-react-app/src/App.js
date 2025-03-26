import React, { useState, useEffect } from 'react';
import { getItems, addItem, deleteItem } from './api/api';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getItems();
      setItems(data);
    };
    fetchData();
  }, []); // Only runs on mount

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!name || !location) return alert('Please fill out both fields');

    try {
      await addItem({ name, location });
      setName('');
      setLocation('');
      const updatedItems = await getItems(); // Refresh data
      setItems(updatedItems);
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

  return (
    <div className="App">
      <h1>Supabase Item Manager</h1>
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

      <h2>Items List:</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.location}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
