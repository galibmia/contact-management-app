import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function Main() {
  const [token, setToken] = useState(null);

  // Function to fetch and store a new token
  const fetchNewToken = async () => {
    try {
      const response = await fetch("https://contact-management-app-server.vercel.app/generate-token");
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store the new token
        setToken(data.token); // Update the state
      } else {
        console.error("Failed to fetch new token");
      }
    } catch (error) {
      console.error("Error fetching new token:", error);
    }
  };

  // Function to check and manage token
  const fetchToken = async () => {
    const existingToken = localStorage.getItem("token");
    if (!existingToken) {
      // If no token exists, fetch a new one
      await fetchNewToken();
    } else {
      // Verify if the existing token is valid
      try {
        const response = await fetch("https://contact-management-app-server.vercel.app/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${existingToken}`,
          },
        });

        if (response.ok) {
          setToken(existingToken); // Token is valid, set it in state
        } else {
          // Token might be expired or invalid, fetch a new one
          console.warn("Existing token is invalid or expired, fetching a new token.");
          localStorage.removeItem("token"); // Remove the expired token
          await fetchNewToken(); // Fetch and store a new token
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        // If there's an error in verification, remove the token and fetch a new one
        localStorage.removeItem("token");
        await fetchNewToken();
      }
    }
  };


  useEffect(() => {
    fetchToken(); // Fetch token on initial load
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet context={{ token }} /> {/* Pass the token as context to Outlet */}
    </div>
  );
}
