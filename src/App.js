import React, { useState } from "react";
import{Routes, Route, Link} from "react-router-dom"; 
import Home from "./components/HomePage";
import SignUp from "./components/SignUpPage";
import SignIn from "./components/SignInPage";
import UsersTable from "./components/UsersTable";
import './App.css';
import Profile from './components/Profile';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <>
    <nav>
      <div className="Top">
           <Link  class="header" to="/Home">HOME </Link>
          
        <Link class="header" to="/Profile">PROFILE </Link>
        
        <Link class="header" to="/users">USERS </Link>
        
        <Link class="header" to="/SignUp">SIGNUP </Link>
         
        <Link  class="header" to="/SignIn">SIGNIN </Link>
       </div>
    </nav> 
    <Routes>
  <Route path ="/SignIn" element={<SignIn loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} /> 
  <Route path ="/SignUp" element={<SignUp loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
  <Route path ="/Home" element={<Home loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
  <Route path ="/Profile" element={<Profile loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
  <Route path ="/users" element={<UsersTable loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
  </Routes>  
    </>
  )
}

export default App;