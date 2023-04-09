import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css'
import companyLogo  from '../component/download.jpeg'

import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";


const User = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    setIsLoading(true);
    const response = await axios.get("https://randomuser.me/api");
    const userData = response.data.results[0];
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsLoading(false);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoading(false);
    } else {
      fetchUser();
    }
  }, []);

  const handleRefresh = () => {
    localStorage.removeItem("user");
    fetchUser();
  };

  if (isLoading) {
    return (
      <Spinner
        animation="border"
        style={{ top: "50%", position: "absolute" }}
      />
    );;
  }

  return (
    <div>
      <Card
        style={{
          width: "35rem",
          position: "absolute",
          left: "28%",
          top: "25% ",
          border: "1px solid",
        }}
      >
        <Card.Img variant="top" src={companyLogo} className="cmlg" />
        <Card.Body>
          <Card.Title>
            <h1>{`${user.name.first} ${user.name.last}`}</h1>
          </Card.Title>
          <Card.Text>{user.email}</Card.Text>
          <Button variant="primary" onClick={handleRefresh}>
            Refresh
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default User;
