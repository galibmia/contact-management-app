import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function Main() {
  const [token, setToken] = useState(null); // Store the token here

  const fetchToken = async () => {
    // Check if token exists in localStorage
    const existingToken = localStorage.getItem("token");
    if (!existingToken) {
      try {
        const response = await fetch("https://contact-management-app-server.vercel.app/generate-token");
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          setToken(data.token); // Set the token state
        } else {
          console.error("Failed to fetch token");
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    } else {
      setToken(existingToken); // If token exists, set it
    }
  };

  useEffect(() => {
    fetchToken(); // Call fetchToken on initial load
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet context={{ token }} /> {/* Pass the token as context to Outlet */}
    </div>
  );
}
