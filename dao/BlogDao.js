var dbUtile = require("./DBUtil");

function insertBlog(title, content, tags, views, ctime, utime, success) {
    var insertSql = "insert into blog (title,content,tags,views,ctime,utime) values (?,?,?,?,?,?) ";
    var params = [title, content, tags, views, ctime, ctime];

    var connection = dbUtile.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if(error == null) {
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

function queryBlogByPage(page,pageSize,success) {
    var insertSql = "select * from blog order by id desc limit ?,? ";
    var params = [page * pageSize, pageSize];

    var connection = dbUtile.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if(error == null) {
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

function queryBlogCount(success) {
    var querySql = "select count(1) as count from blog";
    var params = [];

    var connection = dbUtile.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null) {
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

function queryBlogById(id,success) {
    var querySql = "select * from blog where id = ?";
    var params = [id];

    var connection = dbUtile.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null) {
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

function queryRandomTags(success) {
    var querySql = "select * from blog";
    var params = [];

    var connection = dbUtile.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null) {
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

function addViews(id ,success) {
    var updateSql = "update blog set views = views+1 where id = ?";
    var params = [id];

    var connection = dbUtile.createConnection();
    connection.connect();
    connection.query(updateSql, params, function (error, result) {
        if(error == null) {
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

function queryHotBlog(size ,success) {
    var querySql = "select * from blog order by views desc limit ?";
    var params = [size];

    var connection = dbUtile.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null) {
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}


module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryRandomTags = queryRandomTags;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;