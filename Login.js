import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event, username, password) => {
        event.preventDefault();
        axios.get('http://localhost:9000/getUser', { params: { username: username, password: password } })
            .then((res) => {
                if (res.data) {
                    alert('Login Successful');
                    localStorage.clear();
                    const userdata = `${res.data._id}`;
                    localStorage.setItem('loggedInUser', userdata);
                    navigate("/Home");
                } else {
                    alert('Wrong Credentials');
                }
            })
            .catch((err) => alert('Error in Login'));
    };

    return (
        <div className="container text-center white-container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card bg-dark text-light">
                        <div className="card-body">
                            <h2 className="card-title text-center">Login</h2>
                            <p></p>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">User ID:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
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
                                    onClick={(event) => handleLogin(event, username, password)}
                                >
                                    Login
                                </button>
                            </form>
                            <p className="text-center mt-3">
                                Don't have an account? <Link to="/signup">Signup</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
