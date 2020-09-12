var mysql = require("mysql");

function createConnection(){
    var connection = mysql.createConnection({
        host: "218.244.151.123",
        port: "3306",
        user: "root",
        password: "qq001970A..",
        database: "my_blog"
    });
    return connection;
}

module.exports.createConnection = createConnection;