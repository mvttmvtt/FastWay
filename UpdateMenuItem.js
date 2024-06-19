import React, { useState, useEffect } from 'react';
import axios from 'axios';
import newLogo from './newLogo.svg';

const UpdateMenuItem = () => {
  const [chains, setChains] = useState([]);
  const [selectedChainId, setSelectedChainId] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [itemData, setItemData] = useState({
    foodName: '',
    foodCost: '',
    description: '',
    calories: '',
    foodType_id: '',
    chain_id: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:9000/getChains')
      .then(response => {
        setChains(response.data);
      })
      .catch(error => console.error('Error fetching chains:', error));
  }, []);

  useEffect(() => {
    if (selectedChainId) {
      axios.get(`http://localhost:9000/getMenuItems/${selectedChainId}`)
        .then(response => {
          setMenuItems(response.data);
        })
        .catch(error => console.error('Error fetching menu items:', error));
    }
  }, [selectedChainId]);

  const handleChainChange = (e) => {
    setSelectedChainId(e.target.value);
  };

  const handleItemChange = (e) => {
    setSelectedItemId(e.target.value);
    const selectedItem = menuItems.find(item => item._id === e.target.value);
    setItemData({
      foodName: selectedItem.foodName,
      foodCost: selectedItem.foodCost,
      description: selectedItem.description,
      calories: selectedItem.calories,
      foodType_id: selectedItem.foodType_id,
      chain_id: selectedItem.chain_id
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:9000/updateMenuItem/${selectedItemId}`, itemData);
      if (response.status === 200) {
        setMessage('Menu item updated successfully.');
      } else {
        setMessage('Failed to update the menu item.');
      }
    } catch (error) {
      setMessage('Error: Could not update the menu item.');
    }
  };

  return (
    <div className="container text-center white-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-orange text-light">
            <div className="card-body">
              <h1 style={{ color: 'black' }}>Update Menu Item</h1>
              <form onSubmit={handleSubmit}>
                <label className="chain-name-label">
                  Select Chain:
                  <select onChange={handleChainChange} value={selectedChainId} className="form-control">
                    <option value="">Select Chain</option>
                    {chains.map(chain => (
                      <option key={chain._id} value={chain._id}>
                        {chain.chain_name}
                      </option>
                    ))}
                  </select>
                </label>
                <br />
                <label className="chain-name-label">
                  Select Menu Item:
                  <select onChange={handleItemChange} value={selectedItemId} className="form-control">
                    <option value="">Select Menu Item</option>
                    {menuItems.map(item => (
                      <option key={item._id} value={item._id}>
                        {item.foodName}
                      </option>
                    ))}
                  </select>
                </label>
                <br />
                <p></p>
                {/* <label className="chain-name-label">
                  Food Name:
                  <input
                    type="text"
                    name="foodName"
                    value={itemData.foodName}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </label>
                <br />
                <label className="chain-name-label">
                  Food Cost:
                  <input
                    type="text"
                    name="foodCost"
                    value={itemData.foodCost}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </label>
                <br />
                <label className="chain-name-label">
                  Calories:
                  <input
                    type="text"
                    name="calories"
                    value={itemData.calories}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </label>
                <br />
                <label className="chain-name-label">
                  Description:
                  <textarea
                    name="description"
                    value={itemData.description}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </label>
                <br /> */}
                <button 
                    type="submit" 
                    className="btn btn-primary rounded-pill"
                >
                    Update
                </button>
              </form>
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <img src={newLogo} className="App-logo" alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default UpdateMenuItem;
