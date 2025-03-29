import React, { useState, useEffect } from 'react';
import { getItems, addItem, deleteItem, updateItem } from './api/api';
import './App.css';
import './modal.css';

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] =useState('')
  const [location, setLocation] = useState('');
  const [editItem, setEditItem] = useState(null); // Store item being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getItems();
    setItems(data);
    setFilteredItems(data)

    const uniqueLocations = [...new Set(data.map(item => item.location))];
    setLocations(uniqueLocations);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!name || (!selectedLocation && !location)) return alert('Please fill out both fields');

    try {
      await addItem({ name, location: selectedLocation ||location });
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
      fetchData()
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
      await updateItem(editItem.id, { name: editItem.name, location: editItem.location, description: editItem.description });
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      alert("Failed to update item.");
    }
  };

  const handleFilterByLocation = (location) => {
    if (location === 'All') {
      setFilteredItems(items);
      setSelectedLocation(null);
    } else {
      setFilteredItems(items.filter((item)=> item.location === location));
      setSelectedLocation(location)
    }
  };

  return (
    <div className="App">
      <h1>Supabase Item Manager</h1>

      {/* Sidebar for Filtering */}
      <div className="container">
        <aside className="sidebar">
          <h2>Filter by Location</h2>
          <ul>
            <li
              className={!selectedLocation ? "active" : ""}
              onClick={() => handleFilterByLocation("All")}
            >
              All Locations
            </li>
            {locations.map((loc) => (
              <li
                key={loc}
                className={selectedLocation === loc ? "active" : ""}
                onClick={() => handleFilterByLocation(loc)}
              >
                {loc}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="content">
          <form onSubmit={handleAddItem}>
            <input type="text" placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <button type="submit">Add Item</button>
          </form>

          <h2>Items List:</h2>
          <ul>
            {filteredItems.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> - {item.location}
                <button onClick={() => handleEditClick(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Update Item Modal */}
      {isModalOpen && editItem && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Item</h2>
            <form onSubmit={handleUpdateItem}>
              <input type="text" value={editItem.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} />
              <input type="text" value={editItem.location} onChange={(e) => setEditItem({ ...editItem, location: e.target.value })} />
              <textarea value={editItem.description} onChange={(e) => setEditItem({ ...editItem, description: e.target.value })} placeholder="Description"></textarea>
              <div className="modal-buttons">
                <button className="save-btn" type="submit">Update</button>
                <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;