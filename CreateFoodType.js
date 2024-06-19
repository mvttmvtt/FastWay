import newLogo from './newLogo.svg';
import { React, useState } from 'react';
import axios from 'axios';

const CreateFoodType = () => {
  const [foodType, setFoodType] = useState('');

  const handleCreateFoodType = (event, foodType) => {
    event.preventDefault();
    axios.post('http://localhost:9000/createFoodType', { foodType })
      .catch((err) => alert('Error in Creating Food Type'));
  };

  return (
    <div className="container text-center white-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-orange text-light">
            <div className="card-body">
              <h1 style={{ color: 'black' }}>Create Food Type</h1>
              <form>
                <label className="chain-name-label">
                  Food Type:
                  <input
                    type="text"
                    value={foodType}
                    onChange={(e) => setFoodType(e.target.value)}
                    className="form-control"
                  />
                </label>
                <br />
                <p></p>
                <button
                  type="button"
                  onClick={(event) => handleCreateFoodType(event, foodType)}
                  className="btn btn-primary rounded-pill"
                >
                  Create Food Type
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

export default CreateFoodType;
