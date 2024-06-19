import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import newLogo from './newLogo.svg';
import './aesthetic.css';

const Home = () => {
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser');
    const [chains, setChains] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:9000/getChains')
            .then(function (response) {
                setChains(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleSignOut = (event) => {
        event.preventDefault();
        localStorage.clear();
        navigate("/Home");
    };

    return (
        <div className="container text-center">
            {loggedInUser ? (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-white rounded">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/">Home Page</Link>
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/AddChain">Add Chain</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/CreateLocation">Create Location</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/CreateMenuItem">Create Menu Item</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/CreateFoodType">Create Food type</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/UpdateMenuItem">Update Menu Item</Link>
                                    </li>
                                </ul>
                                <button onClick={handleSignOut} className="sign-out-btn">Sign Out</button>
                            </div>
                        </div>
                    </nav>
                    <img src={newLogo} className="App-logo" alt="logo" />
                    <div style={{ backgroundColor: 'black', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
                        <h1 style={{ color: 'white' }}>Welcome to Admin View</h1>
                    </div>
                </div>
            ) : (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-white rounded">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/">Home Page</Link>
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    {loading ? (
                                        <li className="nav-item">Loading...</li>
                                    ) : (
                                        chains.map(chain => (
                                            <li className="nav-item" key={chain._id}>
                                                <Link className="nav-link" to={`/chain/${chain._id}`}>{chain.chain_name}</Link>
                                            </li>
                                        ))
                                    )}
                                </ul>
                                <Link to="/Login" className="btn btn-light">Log In</Link>
                            </div>
                        </div>
                    </nav>
                    <img src={newLogo} className="App-logo" alt="logo" />
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card bg-dark text-light">
                                <div className="card-body">
                                    <h1 className="card-title text-center">Welcome to Fastway</h1>
                                    <h4 className="card-title text-center">Fastway is your one stop spot for information about many of the world's favorite fast food chains.</h4>
                                    <h5 className="card-title text-center">*Right now we are in the process of adding more chains, so please be patient</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
