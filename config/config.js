require("dotenv").config();

const { DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, DB_NAME } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOSTNAME,
    dialect: "mysql",
    port: 3306, // ✅ opsional, tapi bagus ditambahkan eksplisit
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOSTNAME,
    dialect: "mysql",
    port: 3306,
  },
};
