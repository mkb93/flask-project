import React from 'react'

const Sidebar = ({locations, selectedLocation, handleFilterByLocation}) => {
  return (
    <aside className='sidebar'>
      <h2>Filter By Location</h2>
      <ul>
        <li
          className={!selectedLocation ? "active": ''}
          onClick={()=>handleFilterByLocation('All')}
          >
            All Locations
        </li>
        {locations.map((loc)=>(
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
  );
};

export default Sidebar;
