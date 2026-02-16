import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/registrations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) fetchRegisteredEvents();
  }, [user, token]);

  const upcoming = events.filter((e) => new Date(e.date) > new Date());
  const past = events.filter((e) => new Date(e.date) < new Date());

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Upcoming Events</h3>
      {upcoming.map((e) => (
        <div key={e._id}>
          <p>{e.name}</p>
          <p>{new Date(e.date).toLocaleString()}</p>
        </div>
      ))}
      <h3>Past Events</h3>
      {past.map((e) => (
        <div key={e._id}>
          <p>{e.name}</p>
          <p>{new Date(e.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
