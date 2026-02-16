import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios.get(`http://localhost:5000/api/events/${id}`);
      setEvent(res.data);
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    if (!user) return navigate("/login");
    try {
      await axios.post(
        `http://localhost:5000/api/events/register/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Registered successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>Organizer: {event.organizer}</p>
      <p>Location: {event.location}</p>
      <p>Date: {new Date(event.date).toLocaleString()}</p>
      {user ? (
        <button onClick={handleRegister}>Register</button>
      ) : (
        <button onClick={() => navigate("/login")}>Login to Register</button>
      )}
    </div>
  );
};

export default EventDetails;
