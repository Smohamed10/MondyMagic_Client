import React, { useState, useEffect } from 'react';
import Trips from '../../components/Trips';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown'; // Import Dropdown component
import '../../Assets/css/spinner.css';
import sphinx from "../../Images/sphinx.jpg";
const Home = () => {  

  const [trips, setTrips] = useState({
    loading: true,
    results: [],
    err: null,
    reload: "0"
  });

  const [filteredTrips, setFilteredTrips] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("All"); // State for the selected dropdown option

  useEffect(() => {
    setTrips(prevState => ({ ...prevState, loading: true }));
    axios.get("https://mondy-magic-server.onrender.com/gettrip", {
      params: {
        category: selectedOption // Pass selected option as query parameter
      }
    })
    .then(resp => {
      setTrips(prevState => ({ ...prevState, results: resp.data, loading: false, err: null }));
      console.log(resp)
    })
    .catch(() => {
      setTrips(prevState => ({ ...prevState, loading: false, results: [], err: null }));
    });

  }, [trips.reload, selectedOption]); // Add selectedOption to the dependency array

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

        <div className="container">
        <img src={sphinx} alt="Sphinx" className="img-fluid mb-3" />
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 text-center">
              <h2 className="font-weight-light text-black">Our Destinations</h2>
              <p className="color-black-opacity-5">Choose Your Next Destination</p>
              <Form>
                <Form.Group className="mb-3 d-flex" controlId="search">
                  <Form.Control type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Your Next Trip" />
                </Form.Group>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {selectedOption}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSelectedOption("All")}>All</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedOption("Full Day")}>Full Day</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedOption("Half Day")}>Half Day</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedOption("Night tours")}>Night tours</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedOption("Packages")}>Packages</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedOption("Special Offers")}>Special Offers</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedOption("VIP")}>VIP</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form>
            </div>
          </div>

          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip) => (
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
            ))
          ) : (
            <Alert variant='danger'>
              No Trips Available, Try Again Later
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
