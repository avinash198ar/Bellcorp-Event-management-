import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `https://bellcorp-event-management-a.onrender.com/api/events/${id}`
        );
        setEvent(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      await axios.post(
        `https://bellcorp-event-management-a.onrender.com/api/events/register/${id}`,
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
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default EventDetails;
