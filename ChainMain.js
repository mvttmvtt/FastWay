import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ChainMain = () => {
    const { chain_id } = useParams();
    const [items, setItems] = useState([]);
    const [chainName, setName] = useState('');
    const [chains, setChains] = useState([]);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    const sortedItems = [...items].sort((a, b) => {
        if (a.foodType_details.foodType < b.foodType_details.foodType) return -1;
        if (a.foodType_details.foodType > b.foodType_details.foodType) return 1;
        return 0;
    });

    useEffect(() => {
        axios.get('http://localhost:9000/getChainName', { params: { chain_id: chain_id } }).then((res) => setName(res.data))
    }, [chain_id])

    useEffect(() => {
        axios.get('http://localhost:9000/getChainMenu', { params: { chain_id: chain_id } }).then((res) => setItems(res.data))
    }, [chain_id])

    useEffect(() => {
        axios.get('http://localhost:9000/getChainLocations', { params: { chain_id: chain_id } }).then((res) => setLocations(res.data))
    }, [chain_id])

    useEffect(() => {
        axios.get('http://localhost:9000/getChains')
            .then(function (response) {
                setChains(response.data)
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            })
    }, []);

    return (
        <div className="container">
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
            <h1>{chainName}</h1>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'row' }}>
                    {sortedItems.map((item, index) => (
                        index === 0 || item.foodType_details.foodType !== sortedItems[index - 1].foodType_details.foodType ? (
                            <li key={item.foodType_details.foodType} style={{ marginRight: '10px' }}>
                                <button onClick={() => window.location=`#${item.foodType_details.foodType}`} className="btn btn-primary">{item.foodType_details.foodType}</button>
                            </li>
                        ) : null
                    ))}
                    <li style={{ marginLeft: '0px' }}>
                        <button onClick={() => window.location='#locations'} className="btn btn-primary">Locations</button>
                    </li>
                </ul>
            </div>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black' }}>Name</th>
                        <th style={{ border: '1px solid black' }}>Cost</th>
                        <th style={{ border: '1px solid black' }}>Calories</th>
                        <th style={{ border: '1px solid black' }}>Description</th>
                        <th style={{ border: '1px solid black' }}>Food Type</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedItems.map(item => (
                        <tr key={item.id} id={item.foodType_details.foodType}>
                            <td style={{ border: '1px solid black' }}>{item.name}</td>
                            <td style={{ border: '1px solid black' }}>${item.cost}</td>
                            <td style={{ border: '1px solid black' }}>{item.calories}</td>
                            <td style={{ border: '1px solid black' }}>{item.description}</td>
                            <td style={{ border: '1px solid black' }}>{item.foodType_details.foodType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div id="locations">
                <h2 style={{ marginTop: '20px' }}>Locations:</h2>
                <ul>
                    {locations.map(location => (
                        <li key={location.id}>{location.address} {location.street} {location.city}, {location.state}, {location.zipCode}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ChainMain;
