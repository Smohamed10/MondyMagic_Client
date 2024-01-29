import React, { useState, useEffect } from 'react';
import Trips from '../../components/Trips';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import '../../Assets/css/spinner.css';
  
const Home = () => {  

  const [trips, setTrips] = useState({
    loading: true,
    results: [],
    err: null,
    reload: "0"
  });


  const [filteredTrips, setFilteredTrips] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTrips(prevState => ({ ...prevState, loading: true }));
    axios.get("http://localhost:4040/gettrip/gettrip/")
      .then(resp => {
        setTrips(prevState => ({ ...prevState, results: resp.data, loading: false, err: null }));
      })
      .catch(() => {
        setTrips(prevState => ({ ...prevState, loading: false, err: 'Something Went Wrong' }));
      });

  }, [trips.reload]); // Add Auth to the dependency array

  useEffect(() => {
    // Filter trips based on the search input
    const filteredResults = trips.results.filter(trip => trip.name.toLowerCase().includes(search.toLowerCase()));
    setFilteredTrips(filteredResults);
  }, [search, trips.results]);

  return (
    <div className="site-wrap">
      <div className="site-section">
        {trips.loading === true && (
          <div className="loading-spinner-overlay">
            <div className="loading-spinner-container">
              <div className="loading-spinner">&#9765;</div>
              <span>Loading...</span>
            </div>
          </div>
        )}

        {trips.loading === false && trips.err === null && (
          <div className="container">
            <div className="row justify-content-center mb-5">
              <div className="col-md-7 text-center">
                <h2 className="font-weight-light text-black">Our Destinations</h2>
                <p className="color-black-opacity-5">Choose Your Next Destination</p>
                <Form>
                  <Form.Group className="mb-3 d-flex" controlId="search">
                    <Form.Control type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Your Next Trip" />
                  </Form.Group>
                </Form>
              </div>
            </div>

            {filteredTrips.map((trip) => (
              <div className="row" key={trip.id}>
                <Trips
                  id={trip.id}
                  name={trip.name}
                  description={trip.description}
                  date={trip.date}
                  time={trip.time}
                  salary={trip.salary}
                  master_image={trip.master_image}
                />
              </div>
            ))}
          </div>
        )}
        {
          trips.loading === false && trips.err != null && (
            <Alert variant='danger'>
              No Trips Available, Try Again Later
            </Alert>
          )
        }
      </div>
    </div>
  );
};

export default Home;
