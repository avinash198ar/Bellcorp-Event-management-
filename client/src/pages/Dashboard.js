import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await axios.get(
          "https://bellcorp-event-management-a.onrender.com/api/users/registrations",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRegistrations(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRegistrations();
  }, []);

  return (
    <div>
      <h2>My Registrations</h2>
      {registrations.map((event) => (
        <div key={event._id}>{event.title}</div>
      ))}
    </div>
  );
};

export default Dashboard;
