import axios from "axios";
import React, { useState } from "react";
import './signin.css'
import {redirect} from 'react-router-dom';


export default function SignIn({loggedInUser, setLoggedInUser}) {
  const [userName, setUserName] = useState('');
  const [password, setParssword] = useState('');

  async function loginUser(e) {
    e.preventDefault();
    if (userName && password) {
      let res;
      let url = 'http://localhost:4000/signin'
      let data = JSON.stringify({
        userName: userName,
        password: password,
      })
      try {
        res = await axios.post(url, data, { headers: { "Content-Type": "application/json" } });
        if (res.status==200) {
          console.log(res);
          debugger;
          let currentUser = res.data.response.user
          currentUser.token = res.data.response.token;
          setLoggedInUser(currentUser);
          setUserName('');
          setParssword('');
          return redirect('/Profile');
        } else {
          setUserName('');
          setParssword('');
          alert('Unauthorized!');
        }
      } catch(e) {
        alert(e);
      }
    }
  }

  return (
    <>
      <form className="frm">
        <h2>SIGN IN</h2>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required value={userName} onChange={(e)=>setUserName(e.target.value)} />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required value={password} onChange={(e)=>setParssword(e.target.value)} />
        </div>
        <div className="button-container">
          <input type="submit" onClick={(e)=>loginUser(e)} />
        </div>
      </form>
    </>
  )
}