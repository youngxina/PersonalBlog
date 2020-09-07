var dbUtile = require("./DBUtil");


function addComment(blogId, parent,parentName, userName, email, comment, ctime, utime, success){
    var insertSql = "insert into comments(blog_id,parent,parent_name,user_name,email,comment,ctime,utime) values(?,?,?,?,?,?,?,?)";
    var params = [blogId, parent,parentName, userName, email, comment, ctime, utime];

    var connection = dbUtile.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(error, result){
        if(error == null){
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

function queryCommentsByBlogId(blogId,success){
    var querySql = "select * from comments where blog_id=?";
    var params = [blogId];

    var connection = dbUtile.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, result){
        if(error == null){
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

function queryCommentsCountByBlogId(blogId,success){
    var querySql = "select count(1) as count from comments where blog_id=?";
    var params = [blogId];

    var connection = dbUtile.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, result){
        if(error == null){
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

function queryNewComments(size,success){
    var querySql = "select * from comments order by id desc limit ?";
    var params = [size];

    var connection = dbUtile.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, result){
        if(error == null){
            success(result);
        }else {
            console.log(error);
        }
    });
    connection.end();
}

module.exports.addComment = addComment;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryCommentsCountByBlogId = queryCommentsCountByBlogId;
module.exports.queryNewComments = queryNewComments;