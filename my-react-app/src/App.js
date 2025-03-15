import React, { useState, useEffect } from 'react';
import { getItems, addItem } from './api/api'
import logo from './logo.svg';
import './App.css';

function App() {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [location, setLocation] = useState('');

  useEffect(()=> {
    const fetchData = async () => {
      const data = await getItems();
      setItems(data);
    };
    fetchData();
  
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location)
      return alert('Please fill out both fields');
    
    try {
      const newItem = { name, location};
      await addItem(newItem);
      setItems([...items, newItem]);
      setName('');
      setLocation('');
    } catch (error) {
      alert('Failed to add item. check console for details.');
    }
    
    
  };

  return (
    <div className='App'>
      <h1>Supabase Item manager</h1>
      <form onSubmit={(handleSubmit)}>
        <input type='text' placeholder='Item Name' value={name} onChange={(e)=> setName(e.target.value)}/>
        <input type='text' placeholder='Location' value={location} onChange={(e)=> setLocation(e.target.value)}/>
        <button type="submit">Add Item</button>
      </form>

      <h2>Items List:</h2>
      <ul>
        {items.map((item, index)=>(
          <li key={index}>{item.name} - {item.location} </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
