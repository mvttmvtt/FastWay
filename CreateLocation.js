import newLogo from './newLogo.svg';
import { React, useState, useEffect } from 'react';
import axios from 'axios';

const CreateLocation = () => {
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [chain_id, setChain] = useState('');
  const [chains, setChains] = useState([]);

  const handleCreateLocation = (event, address, street, city, state, zipCode, chain) => {
    event.preventDefault();
    axios.post('http://localhost:9000/createLocation', { address, street, city, state, zipCode, chain_id })
      .catch((err) => alert('Error in Creating location'));
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

  return (
    <div className="container text-center white-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-orange text-light">
            <div className="card-body">
            <h1 style={{ color: 'black' }}>Create Location</h1>
              <form>
                <label className="chain-name-label">
                  Address:
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                  />
                </label>
                <br />
                <label className="chain-name-label">
                  Street:
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="form-control"
                  />
                </label>
                <br />
                <label className="chain-name-label">
                  City:
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="form-control"
                  />
                </label>
                <br />
                <label className="chain-name-label">
                  State:
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="form-control"
                  />
                </label>
                <br />
                <label className="chain-name-label">
                  ZipCode:
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
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
                <p></p>
                <button
                  type="button"
                  onClick={(event) => handleCreateLocation(event, address, street, city, state, zipCode, chain_id)}
                  className="btn btn-primary rounded-pill"
                >
                  Create Location
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

export default CreateLocation;
