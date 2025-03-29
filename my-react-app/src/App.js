import React, { useState, useEffect } from "react";
import { getItems, addItem, deleteItem, updateItem } from "./api/api";
import Sidebar from "./components/SideBar";
import Search from "./components/Search";
import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";
import EditModal from "./components/EditModal";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const presetLocations = [
    "karims room", "giulianas room", "adams room",
    "living room", "toilet", "kitchen",
    "hallway", "cage", "basement"
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getItems();
    setItems(data);
    setFilteredItems(data.slice(-5)); // Show last 5 items by default
    setLocations([...new Set(data.map((item) => item.location))]);
  };

  const handleSearch = (term) => {
    if (term === "") {
      setFilteredItems(items.slice(-5));
    } else {
      setFilteredItems(
        items.filter(
          (item) =>
            item.name.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term)
        )
      );
    }
  };

  const handleEditClick = (item) => {
    setEditItem(item); // Set the selected item for editing
    setIsModalOpen(true); // Open the modal
  };

  const handleAddItem = async (name, location) => {
    if (!name || !location) return alert("Please fill out both fields");

    try {
      await addItem({ name, location });
      fetchData();
    } catch (error) {
      alert("Failed to add item.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      fetchData();
    } catch (error) {
      alert("Failed to delete item.");
    }
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    console.log("Edit button clicked for item:", editItem);
    if (!editItem.name || !editItem.location) return alert("Please fill out all fields");
  
    try {
      await updateItem(editItem.id, { 
        name: editItem.name, 
        location: editItem.location, 
        description: editItem.description 
      });
      setIsModalOpen(false);
      fetchData(); // Refresh the list
    } catch (error) {
      alert("Failed to update item.");
    }
  };

  const handleFilterByLocation = (location) => {
    if (location === "All") {
      setFilteredItems(items.slice(-5));
      setSelectedLocation(null);
    } else {
      setFilteredItems(items.filter((item) => item.location === location));
      setSelectedLocation(location);
    }
  };

  return (
    <div className="App">
      <h1>Supabase Item Manager</h1>

      {/* Search Bar & Add Button */}
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
      <AddItemForm presetLocations={presetLocations} handleAddItem={handleAddItem} />

      <div className="container">
        <Sidebar locations={locations} selectedLocation={selectedLocation} handleFilterByLocation={handleFilterByLocation} />
        <div className="content">
          <h2>Items List:</h2>
          <ItemList items={filteredItems} handleEditClick={handleEditClick} handleDelete={handleDelete} />
        </div>
      </div>

      {isModalOpen && editItem && <EditModal editItem={editItem} setEditItem={setEditItem} handleUpdateItem={handleUpdateItem} setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}

export default App;
