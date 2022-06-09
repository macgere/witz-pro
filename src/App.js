import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainView } from './MainView';
import LoginPage from './LoginPage';
import Registration from './Registration';


function App() {
  const [currentlyLoggedInUser, setCurrentlyLoggedInUser] = useState('')
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginPage setCurrentlyLoggedInUser={setCurrentlyLoggedInUser} />}
          />
          <Route path="/home" element={<MainView />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
