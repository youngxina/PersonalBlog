var TagsDao = require("../dao/TagsDao");
var TagBlogMappingDao = require("../dao/TagBlogMappingDao");
var BlogDao = require("../dao/BlogDao")
var respUtil = require("../util/RespUtil");
var url = require("url");
var path = new Map();

function queryRandomTags (request, response){
    TagsDao.queryRandomTags(function(result){
        result.sort(function(){
           return Math.random() > 0.5 ? true : false;
        });


        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/queryRandomTags",queryRandomTags);

function queryByTag (request, response){
    var params = url.parse(request.url, true).query;
    TagsDao.queryTag(params.tag, function(result){
        // console.log(result);
        if(result == null || result == ""){
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", result));
            response.end();
        }else{
            console.log("aaaa");
            TagBlogMappingDao.queryByTag(result[0].id ,parseInt(params.page),parseInt(params.pageSize),function(result){
                console.log("bbbbb");
                var blogList = [];
                for (var i = 0; i < result.length; i++) {
                    console.log("cccc");

                    BlogDao.queryBlogById(result[i].blog_id, function(result){
                       console.log("dddd");
                    });
                }
                while(true){
                    if(blogList.length == result.length){
                        break;
                    }
                }
                console.log("blogList"+blogList);
                // response.writeHead(200);
                // response.write(respUtil.writeResult("success", "查询成功", result));
                // response.end();
            })
        }
    })

}

path.set("/queryByTag",queryByTag);

function queryByTagCount (request, response){
    TagsDao.queryRandomTags(function(result){
        result.sort(function(){
            return Math.random() > 0.5 ? true : false;
        });


        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/queryByTagCount",queryByTagCount);




module.exports.path = path;