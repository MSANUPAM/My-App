import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './usersTable.css';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

const UsersTable = ({loggedInUser, setLoggedInUser}) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editableUserIds, setEditableUserIds] = useState([]);
    const [updateUser, setUpdateUser] = useState({});

    const getUsers = async () => {
        debugger;
        console.log('loggedInUserFromUsersTable - ', loggedInUser);
        let url = 'http://localhost:4000/users';
        let header = { "Content-Type": "application/json"};
        if (loggedInUser) {
            header['x-access-token'] = loggedInUser.token;
        }
        let res = await axios.get(url, { headers: header });
        setUsers(res.data.users);
    }

    useEffect(() => {
        (async () => await getUsers())()
    }, [])

    const tableColumns = ['userId', 'userName', 'email', 'userRole', 'password'];

    function editRow(userId) {
        if (editableUserIds.includes(userId)) {
            setEditableUserIds(prev => prev.filter(id => id != userId));
            setUpdateUser({});
            return;
        }
        if (editableUserIds.length>0) {
            setEditableUserIds([userId]);
            setEditableUserIds(prev => [...prev, userId]);
            let userBeingUpdated = users.find(user=>user.userId==userId);
            setUpdateUser(userBeingUpdated)
            return;
        }

        setEditableUserIds(prev => [...prev, userId]);
        let userBeingUpdated = users.find(user=>user.userId==userId);
        setUpdateUser(userBeingUpdated)
    }

    async function deleteRow(userId) {
        console.log('deleteRow - ', userId);
        setIsLoading(true);
        let res;
        let url = `http://localhost:4000/users/${userId}`
        

        res = await axios.delete(url, {headers: {"Content-Type":"application/json"}});
        if(res){
            setIsLoading(false);
            let tempUsers = [...users];
            tempUsers = tempUsers.filter(user=>user.userId!=userId);
            setUsers(tempUsers);
        }

    }

    async function saveUser(userId) {
        console.log('saveUser-', userId);
        setIsLoading(true);
        let res;
        let {userName, password, userRole, email} = updateUser;
        let url = `http://localhost:4000/users/${userId}`
        let data = JSON.stringify({
            userName: userName,
            password: password,
            email: email,
            userRole: userRole,
        })

        res = await axios.put(url, data, {headers: {"Content-Type":"application/json"}});

        if (res) {
            console.log(res);
            setEditableUserIds(prev => prev.filter(id => id != userId));
            setIsLoading(false);
            let tempUsers = [...users];
            tempUsers.forEach(user=>{
                if (user.userId==userId) {
                    user.userName = updateUser.userName;
                    user.userRole = updateUser.userRole;
                    user.email = updateUser.email;
                    user.password = updateUser.password
                }
            });
            setUpdateUser({});
        }
    }

    function renderSaveButton(userId) {
        return (
            <div><button onClick={()=>saveUser(userId)}>Save</button></div>
        )
    }

    function renderActionButtons(userId) {
        return (<><AiFillEdit className='edit-button' onClick={() => editRow(userId)} /><AiFillDelete className='delete-button' onClick={() => deleteRow(userId)} />{editableUserIds.includes(userId) && renderSaveButton(userId)}</>)
    }

    function updateCorrespondingValuesOfUser(e, colName) {
        let tempData = {...updateUser};
        tempData[colName] = e.target.value;
        setUpdateUser(tempData);
    }

    function renderLoading(userId) {
        return 'Loading...'
    }

    function renderTableRow(col, user) {
       
        if (editableUserIds.includes(user.userId) && col!='userId' && !isLoading) {
            return <input type="text" value={updateUser[col]} contentEditable={true} onChange={(e) => updateCorrespondingValuesOfUser(e, col) } />
        } else if (isLoading) {
            return renderLoading(user.userId);
        } else {
            return user[col];
        }
    }

    return (
        <div className='users-table'>
            {loggedInUser && loggedInUser.userRole=='Admin' && <table>
                <thead>
                    <tr>
                        {tableColumns.map((col, index) => <th key={index}>{col.toUpperCase()}</th>)}
                        {<th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => (
                        <><tr key={user.userId}>
                            {tableColumns.map((col, index) => (
                                <td>{renderTableRow(col,user)}</td>
                            ))}
                            
                            {<td>{renderActionButtons(user.userId)}</td>}
                        </tr></>
                    ))}
                    {!users && <div>Loading...</div>}
                </tbody>
            </table>}
            {loggedInUser && !loggedInUser.userRole=='Admin' && <div>
                <p>You are unauthorized to view !</p>
                </div>}

        </div>
    )
}

export default UsersTable