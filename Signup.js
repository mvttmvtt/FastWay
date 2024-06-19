import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [f_name, setFirstName] = useState('');
    const [l_name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = (event, f_name, l_name, username, password) => {
        event.preventDefault();

        if (f_name.trim() === '' || l_name.trim() === '' || username.trim() === '' || password.trim() === '') {
          alert('Please fill in all fields.');
          return;
        }

        axios.post('http://localhost:9000/createUser', { f_name, l_name, username, password })
            .then((res) => {
              alert('Signup Successful');
              navigate("/login");
            })
            .catch((err) => alert('Error in Signing Up'));
    };

    return (
        <div className="container text-center white-container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card bg-dark text-light">
                        <div className="card-body">
                            <h2 className="card-title text-center">Signup</h2>
                            <p></p>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        value={f_name}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        value={l_name}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="userId" className="form-label">User ID:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="userId"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary rounded-pill"
                                    onClick={(event) => handleSignUp(event, f_name, l_name, username, password)}
                                >
                                    Signup
                                </button>
                            </form>
                            <p className="text-center mt-3">
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
