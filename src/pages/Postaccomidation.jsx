import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero"; // Ensure the path to Hero is correct
import Navbar from "../components/Anavbar";
import Auth from "../components/Auth";
import Account from "../components/Postaccomidation"
import apiClient,{  apiEndpoints } from "../components/Apis"; // Ensure your API client is set up

const Home = () => {


  return (
    <Auth>
      <Navbar />
      <Account />
    </Auth>
  );
};

export default Home;
