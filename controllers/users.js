
module.exports = {
    getUsers: function (connect, callback) {
        let userList;
        connect.query('SELECT * FROM newcustomer', function (err, results) {
            if (err) throw err;
            userList = results.map(user => {
                return {
                    userId: user['USERID'],
                    userName: user['NAME'],
                    userRole: user['ROLE'],
                    email: user['EMAIL'],
                    password: user['PASSWORD']
                }
            });
            callback(err, userList);
        });
    },

    updateUser: function (connect, callback, user) {
        let query=`UPDATE newcustomer set EMAIL='${user.email}', NAME='${user.userName}', PASSWORD='${user.password}', ROLE='${user.userRole}' WHERE USERID=${user.userId}`;
        connect.query(query, function (err, results) {
            return callback(err, user);
        });
    },

    deleteUser: function (connect, callback, userId) {
        let query =`DELETE from newcustomer WHERE USERID=${userId}`;
        connect.query(query,function(err,result){
            return callback(err, null);
        });
    
    }
}