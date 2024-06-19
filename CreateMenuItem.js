import newLogo from './newLogo.svg';
import { React, useState, useEffect } from 'react';
import axios from 'axios';

const CreateMenuItem = () => {
  const [foodName, setName] = useState('');
  const [foodCost, setCost] = useState('');
  const [calories, setCalories] = useState('');
  const [description, setDescription] = useState('');
  const [foodType_id, setFoodType] = useState('');
  const [foodTypes, setFoodTypes] = useState([]);
  const [chain_id, setChain] = useState('');
  const [chains, setChains] = useState([]);

  const handleCreateMenuItem = (event, foodName, foodCost, calories, description, chain_id, foodType_id) => {
    event.preventDefault();
    axios.post('http://localhost:9000/createMenuItem', { foodName, foodCost, calories, description, chain_id, foodType_id })
      .catch((err) => alert('Error in Creating Menu Item'));
  };

  useEffect(() => {
    axios.get('http://localhost:9000/getChains')
      .then(function (response) {
        setChains(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:9000/getFoodType')
      .then(function (response) {
        setFoodTypes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="container text-center white-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-orange text-light">
            <div className="card-body">
            <h1 style={{ color: 'black' }}>Create Menu Item</h1>
              <form>
                <label className="chain-name-label">
                  Food Name:
                  <input
                    type="text"
                    value={foodName}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                  />
                </label>
                <br />
                <label className="chain-name-label">
                  Food Cost:
                  <input
                    type="text"
                    value={foodCost}
                    onChange={(e) => setCost(e.target.value)}
                    className="form-control"
                  />
                </label>
                <br />
                <label className="chain-name-label">
                  Calories:
                  <input
                    type="text"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="form-control"
                  />
                </label>
                <br />
                <label className="chain-name-label">
                  Description:
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                  />
                </label>
                <br />
                <label className="chain-name-label">
                  Chain:
                  <select onChange={(e) => setChain(e.target.value)} value={chain_id} className="form-control">
                    <option value="">Select Chain</option>
                    {chains.map((chain, index) => (
                      <option key={index} value={chain._id}>
                        {chain.chain_name}
                      </option>
                    ))}
                  </select>
                </label>
                <br />
                <label className="chain-name-label">
                  Food Type:
                  <select onChange={(e) => setFoodType(e.target.value)} value={foodType_id} className="form-control">
                    <option value="">Select Food Type</option>
                    {foodTypes.map((foodType, index) => (
                      <option key={index} value={foodType._id}>
                        {foodType.foodType}
                      </option>
                    ))}
                  </select>
                </label>
                <br />
                <p></p>
                <button
                  type="button"
                  onClick={(event) => handleCreateMenuItem(event, foodName, foodCost, calories, description, chain_id, foodType_id)}
                  className="btn btn-primary rounded-pill"
                >
                  Create Menu Item
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 logo-container">
          <img src={newLogo} className="App-logo" alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default CreateMenuItem;
