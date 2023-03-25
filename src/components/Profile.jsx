import './profile.css'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = ({loggedInUser, setLoggedInUser}) => {
  const [userInfo, setUserInfo] = useState({});
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const [updateUserInfo, setUpdateUserInfo] = useState({});

  // const id = 199;

  // const tableColumns = ['userId', 'userName', 'email', 'userRole', 'password'];

  const getUsers = async () => {
    if (!loggedInUser) {
      alert('Please Login!');
      return ;
    }
    let url = `http://localhost:4000/users/${loggedInUser.userId}`;
    let header = { "Content-Type": "application/json" };
    debugger;
    if (loggedInUser) {
      header['x-access-token'] = loggedInUser.token;
    }
    let res = await axios.get(url, { headers: header });
    console.log('response of profile - ', res);
    // debugger;
    setUserInfo(res.data);
  }

  useEffect(() => {
    (async () => await getUsers())()
  }, [])

  function editProfile(userId) {
    setUpdateUserInfo(userInfo);
    setEditButtonClicked(prev => !prev);
  }

  function handleUserInfoChange(userInfoKey, e) {
    let tempUserInfo = { ...updateUserInfo };
    tempUserInfo[userInfoKey] = e.target.value;
    setUpdateUserInfo(tempUserInfo);
  }

  async function saveProfile(userId) {
    // setIsLoading(true);
    let res;
    let { userName, password, userRole, email } = updateUserInfo;
    let url = `http://localhost:4000/users/${userId}`
    let data = JSON.stringify({
      userName: userName,
      password: password,
      email: email,
      userRole: userRole,
    })

    res = await axios.put(url, data, { headers: { "Content-Type": "application/json" } });

    if (res) {
      console.log(res);
      // setIsLoading(false);
      let tempUsers = {...userInfo};

          tempUsers.userName = updateUserInfo.userName;
          tempUsers.userRole = updateUserInfo.userRole;
          tempUsers.email = updateUserInfo.email;
          tempUsers.password = updateUserInfo.password
      setUserInfo(updateUserInfo);
      setEditButtonClicked(false);
      setUpdateUserInfo({});
    }
  }

  return (
    // <div className={setEditButtonClicked?'background-profile':'profile'}>
    <div className={'profile'}>
      {<div className='edit-profile-window-container'></div>}
      <h2>HELLO </h2>
      {loggedInUser && <table>
        <tbody className='table-body'>
          <th>
            {userInfo && Object.keys(userInfo).map(userInfoKey => (<div>{userInfoKey}</div>))}
          </th>
          <tr className='table-row'>
            {userInfo && Object.keys(userInfo).map(userInfoKey => (<div>{editButtonClicked && userInfoKey != 'userId' ? <input type="text" value={updateUserInfo[userInfoKey]} onChange={(e) => handleUserInfoChange(userInfoKey, e)} /> : userInfo[userInfoKey]}</div>))}
          </tr>
        </tbody>
      </table>}
      {loggedInUser && <div className='action-button-container'>
        <button className='edit-button' onClick={() => editProfile(loggedInUser.userId)} >Edit</button>
        {editButtonClicked && <button className='save-button' onClick={() => saveProfile(loggedInUser.userId)} >Save</button>}
      </div>}
    </div>
  )
}

export default Profile