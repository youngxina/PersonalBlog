var blogDetail = new Vue({
    el: "#blog_detail",
    data: {
        title:"",
        content: "",
        ctime: "",
        tags: "",
        views: ""
    },
    computed: {

    },
    created: function () {
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if (searchUrlParams == "") {
            return;
        }

        var bid = -10;

        for (var i = 0; i < searchUrlParams.length; i++) {
            console.log(searchUrlParams[0].split("="));
            if (searchUrlParams[i].split("=")[0] == "bid") {
                try {
                    bid = parseInt(searchUrlParams[i].split("=")[1]);

                } catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method: "get",
            url: "/queryBlogById?bid=" + bid,

        }).then(function (resp) {
           var result = resp.data[0];
            blogDetail.title = result.title;
            blogDetail.content = result.content;
            blogDetail.ctime = result.ctime;
            blogDetail.tags = result.tags;
            blogDetail.views = result.views;

        }).catch(function (error) {
            console.log("请求失败" + error);
        })
    }

});

var sendComment = new Vue({
    el: "#send_comment",
    data: {
        vcode:"",
        rightCode: ""
    },
    computed: {
        sendComment: function () {
            return function () {
                var code = document.getElementById("comment_code").value;
                if (code != sendComment.rightCode) {
                    document.getElementById("comment_code").value = "";
                    alert("验证码有误");
                    this.changeCode();
                    return;
                }
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                if (searchUrlParams == "") {
                    return;
                }

                var bid = -10;

                for (var i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split("=")[0] == "bid") {
                        try {
                            bid = parseInt(searchUrlParams[i].split("=")[1]);

                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
                var reply = document.getElementById("comment_reply").value;
                var replyName = document.getElementById("comment_reply_name").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;

                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content+ "&parentName=" + replyName
                }).then(function (resp) {
                    alert("评论成功!");
                    document.getElementById("comment_name").value = "";
                    document.getElementById("comment_email").value = "";
                    document.getElementById("comment_content").value = "";
                    document.getElementById("comment_code").value = ""
                    this.changeCode();
                }).catch(function (error) {
                    console.log("请求失败!" + error);
                })
            }
        },
        changeCode: function () {
            return function () {
                axios({
                    method:"get",
                    url:"/queryRandomCode"
                }).then(function(resp){
                    sendComment.vcode = resp.data.data;
                    sendComment.rightCode = resp.data.text;
                }).catch(function(error){
                    console.log("请求失败"+error)
                });
            };
        }
    },
    created: function(){
        this.changeCode();
    }
});

var blogComments = new Vue({
    el:"#blog_comments",
    data:{
        total: 0,
        comments: [

        ]
    },
    computed:{
        reply: function(){
            return function(commentId, userName){
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#send_comment";
            }
        }
    },
    created: function(){
        var bid = getBid();
        axios({
            method: "get",
            url: "/queryCommentsByBlogId?bid="+bid
        }).then(function(resp){

            blogComments.comments = resp.data;
            for(var i = 0;i<blogComments.comments.length;i++) {
                if(blogComments.comments[i].parent > -1) {
                    blogComments.comments[i].options = "回复@" + blogComments.comments[i].parent_name;
                }
            }
        }).catch(function(error){
            console.log("queryCommentsByBlogId请求错误"+error);
        });
        axios({
            method: "get",
            url: "/queryCommentsCountByBlogId?bid="+bid
        }).then(function (resp){
            blogComments.total = resp.data[0].count;
        }).catch(function(error){

        })
    }
});

function getBid(){
    var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
    if (searchUrlParams == "") {
        return;
    }
    var bid = -10;

    for (var i = 0; i < searchUrlParams.length; i++) {
        if (searchUrlParams[i].split("=")[0] == "bid") {
            try {
                bid = parseInt(searchUrlParams[i].split("=")[1]);

            } catch (e) {
                console.log(e);
            }
        }
    }
    return bid;
}