import React, { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "https://bellcorp-event-management-a.onrender.com/api/events"
        );
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    try {
      await axios.post(
        `https://bellcorp-event-management-a.onrender.com/api/events/register/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Registered Successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Events</h2>
      {events.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <button onClick={() => handleRegister(event._id)}>Register</button>
        </div>
      ))}
    </div>
  );
};

export default Events;
