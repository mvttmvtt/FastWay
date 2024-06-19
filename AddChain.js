import newLogo from './newLogo.svg';
import { React, useState } from 'react';
import axios from 'axios';

const AddChain = () => {
  const [chain_name, setChainName] = useState('');

  const handleCreateChain = (event, chain_name) => {
    event.preventDefault();
    axios
      .post('http://localhost:9000/createChain', { chain_name })
      .catch((err) => alert('Error in Adding Chain'));
  };

  return (
    <div className="container text-center white-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-orange text-light">
            <div className="card-body">
              <h1 style={{ color: 'black' }}>Add Chain</h1>
              <form>
                <label className="chain-name-label">
                  Chain Name:
                  <input
                    type="text"
                    value={chain_name}
                    onChange={(e) => setChainName(e.target.value)}
                    className="form-control" 
                  />
                </label>
                <br />
                <p></p>
                <button
                  type="button"
                  onClick={(event) => handleCreateChain(event, chain_name)}
                  className="btn btn-primary rounded-pill" 
                >
                  Add Chain
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

export default AddChain;
