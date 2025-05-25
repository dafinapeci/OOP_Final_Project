import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Login from './HTML_Folder/login.jsx';
import Signup from './HTML_Folder/signup.jsx';
import MainPage from './HTML_Folder/mainPage.jsx';
import './CSS_Stylesheets/mainPageStyle.css';
import './CSS_Stylesheets/entrance.css';


function Home() {/*Home function where its starts working is here*/
  return (
    <div>
      <Startpage />

    </div>
    
  );
}

function Startpage() {
  const navigate = useNavigate();  

  return (
    <>
      <div className='background-container'>

      </div>

      <div className='sign-inButton'>
        {/* navigate to log in page*/}
        <button onClick={() => navigate("/login")}>Log In</button>
      </div>

      <div className='sign-upButton'>
        {/* navigate to sign up page */}
        <button onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
      <div className='startLabel' >
        <label>Let's Start</label>
      </div>
    </>
  );
}


function App() {//router functions written in here
   return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
  </Router>
    

   );
}

export default App;
