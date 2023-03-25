require('dotenv').config();

module.exports = {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    dbUsername : process.env.DB_USERNAME,
    dbPassword : process.env.DB_PASSWORD,
    dbHost : process.env.DB_HOST,
    dbTablename : process.env.DB_TABLE_NAME,
    dbDbname : process.env.DB_DATABASE_NAME,
}


// columnName = USERID, NAME, PASSWORD, EMAIL, ROLE