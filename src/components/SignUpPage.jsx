// import React, { useEffect, useState } from "react";
import React, { useState } from "react";
import './signup.css';
import axios from 'axios';


export default function SignUp() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  // const [submitClicked, setSubmitClicked] = useState(false);
  const [userId, setUserId] = useState(null);

  let userInfoList = ['USERNAME', 'PASSWORD', 'EMAIL', 'ROLE',];

  async function submitSignupForm(e) {
    e.preventDefault();
    console.log('FORM-', { username: username, email: email, password: password, role: role });

    // setSubmitClicked(true);
    let res;
    let url = 'http://localhost:4000/signup'
    let data = JSON.stringify({
      username: username,
      password: password,
      email: email,
      userrole: role,
    })

    res = await axios.post(url, data, {headers: {"Content-Type":"application/json"}});

    if (res) {
      console.log(res);
      // setSubmitClicked(false);

      setUsername('');
      setEmail('');
      setPassword('');
      setRole('');
      setUserId(res.userId)

    }
    console.log('userId- ', userId);
  }

  function updateRespectiveState(userInfo, e) {
    switch (userInfo) {
      case 'USERNAME':
        setUsername(e.target.value);
        // console.log('username - ', username);
        break;
      case 'PASSWORD':
        setPassword(e.target.value);
        // console.log('password - ', password);
        break;
      case 'EMAIL':
        setEmail(e.target.value);
        // console.log('email - ', email);
        break;
      case 'ROLE':
        setRole(e.target.value);
        // console.log('role - ', role);
        break;
      default:
        break;
    }
  }

  function getValue(userInfo) {
    switch (userInfo) {
      case 'USERNAME':
        return username;
      case 'PASSWORD':
        return password;
      case 'EMAIL':
        return email;
      case 'ROLE':
        return role;
      default:
        break;
    }
  }

  // useEffect(() => {

  //   if (submitClicked) {
  //     (async ()=>await submitSignupForm())();
  //   }

  // }, [submitClicked])

  return (
    <>
      <form action="post" className="user-info">
        <h2>SIGN UP</h2>
        {userInfoList.map((userInfo, index) => (
          <div className="individual-user-info" key={index}>
            <label>{userInfo} </label>
            <input type="text" name={userInfo} onChange={(e) => updateRespectiveState(userInfo, e)} value={getValue(userInfo)} />
          </div>
        ))}
        <div className="btnContainer">
          <button className="btn" onClick={(e) => submitSignupForm(e)}>SignUP</button>
        </div>
      </form>
    </>
  )
}