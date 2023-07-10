import React, { useState, useEffect } from 'react'
import './Home.css'
import Banner from './components/Banner'

const Popup = ({ details, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Details</h2>
        <p><span className='deatilshead'>Capsule ID: </span> {details.capsule_id}</p>
        <p><span className='deatilshead'>Status: </span> {details.status}</p>
        <p><span className='deatilshead'>Original Launch: </span> {details.original_launch}</p>
        <p><span className='deatilshead'>Landings: </span> {details.landings}</p>
        <p><span className='deatilshead'>Type: </span> {details.type}</p>
        <p><span className='deatilshead'>Details: </span> {details.details}</p>
        {details.missions && details.missions.length > 0 && (
          <div>
            <h3>Missions:</h3>
            <ul>
              {details.missions.map((mission) => (
                <li key={mission.name}>
                  <span className="deatilshead">Name:  </span> {mission.name}, Flight: {mission.flight}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button className="close-button" onClick={onClose}>
        x
      </button>
    </div>
  );
};


const Home = () => {

  const [status, setStatus] = useState('');
  const [originalLaunch, setOriginalLaunch] = useState('');
  const [type, setType] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;


  useEffect(() => {
    fetch('https://api.spacexdata.com/v3/capsules')
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const handleViewDetails = (details) => {
    setSelectedItem(details);
  };
  const handleClosePopup = () => {
    setSelectedItem(null);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleOriginalLaunchChange = (e) => {
    setOriginalLaunch(e.target.value);
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handleClearFilters = () => {
    setStatus('');
    setOriginalLaunch('');
    setType('');
    const apiUrl = 'https://api.spacexdata.com/v3/capsules';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = 'https://api.spacexdata.com/v3/capsules';
    const queryParams = [];
    if (status) {
      queryParams.push(`status=${status}`);
    }
    if (originalLaunch) {
      queryParams.push(`original_launch=${originalLaunch}`);
    }
    if (type) {
      queryParams.push(`type=${type}`);
    }
    const queryString = queryParams.join('&');
    const urlWithFilters = `${apiUrl}?${queryString}`;
    fetch(urlWithFilters)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSearchResults(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  return (
    <div className='home-container'>
      {selectedItem && (
        <div className="popupdiv">
          <Popup details={selectedItem} onClose={handleClosePopup} />
        </div>
      )}
      <Banner />
      <div className="searchcontainer">
        <form onSubmit={handleSubmit} className='filterform'>
          <label>
            Status:
            <select value={status} onChange={handleStatusChange}>
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="retired">Retired</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>

          <label>
            Original Launch:
            <input
              type="text"
              value={originalLaunch}
              placeholder='Date and Time'
              onChange={handleOriginalLaunchChange}
            />
          </label>

          <label>
            Type:
            <select value={type} onChange={handleTypeChange}>
              <option value="">All</option>
              <option value="Dragon 1.0">Dragon 1.0</option>
              <option value="Dragon 1.1">Dragon 1.1</option>
              <option value="Dragon 2.0">Dragon 2.0</option>
            </select>
          </label>
          <div className="buttons">
            <button type="submit" className='button'>Filter</button>
            <button type="button" className='button' onClick={handleClearFilters}>Clear</button>
          </div>
        </form>
      </div>
      <div className="data">
        {currentItems.length === 0 ? (
          <p>Sorry, there are no items.</p>
        ) : (
          currentItems.map((result) => (
            <div key={result.capsule_serial} className='item'>
              <p><span className='deatilshead'>Capsule ID:</span> {result.capsule_id}</p>
              <p><span className='deatilshead'>Type:</span> {result.type}</p>
              <p><span className='deatilshead'>Details:</span> {result.details}</p>
              <button className='button' onClick={() => handleViewDetails(result)}>View Details</button>
            </div>
          ))
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Home