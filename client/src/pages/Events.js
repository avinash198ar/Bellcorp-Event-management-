import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Events = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events", {
        params: { search, category, location }
      });
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [search, category, location]);

  const handleRegister = async (eventId) => {
    if (!user) return navigate("/login");

    try {
      await axios.post(
        `http://localhost:5000/api/events/register/${eventId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Registered successfully!");
      fetchEvents();
    } catch (err) {
      alert(err.response.data.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Events</h2>

      <div>
        <input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
        <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <button onClick={fetchEvents}>Search</button>
      </div>

      <div>
        {events.map(event => (
          <div key={event._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{event.name}</h3>
            <p>{event.organizer} | {event.location} | {new Date(event.date).toLocaleString()}</p>
            <p>{event.description}</p>
            <p>Available Seats: {event.capacity - (event.registeredCount || 0)}</p>
            <button
              disabled={(event.capacity - (event.registeredCount || 0)) <= 0}
              onClick={() => handleRegister(event._id)}
            >
              { (event.capacity - (event.registeredCount || 0)) <= 0 ? "Sold Out" : "Register" }
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
