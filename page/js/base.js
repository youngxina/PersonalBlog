var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags:[]
    },
    computed:{
        randomColor: function(){
            return function(){
                var red = Math.random() * 255 +50;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return "rgb("+red+","+green+","+blue+")"
            }
        },
        randomSize: function(){
            return function(){
                var size = (Math.random() * 20 + 8) + "px";
                return size;
            }
        }
    },
    created: function(){
        axios({
            method: "get",
            url: "/queryRandomTags"
        }).then(function (resp) {
           var result = [];
            for (var i = 0; i < resp.data.length; i++) {
                result.push({text:resp.data[i].tag, link:"/?tag=" + resp.data[i].tag});
            }
            randomTags.tags = result;
        }).catch(function (error) {
            console.log("请求错误"+error);
        });
    }
});


var newHot = new Vue({
    el:"#new_hot",
    data:{
        titleList:[]
    },
    computed: {

    },
    created: function(){
        axios({
            method: "get",
            url:"/queryHotBlog"
        }).then(function(resp){
            var result = [];
            for (var i = 0; i < resp.data.length; i++) {
                var temp = {};
                temp.title = resp.data[i].title;
                temp.link = "/blog_detail.html?bid="+resp.data[i].id;
                result.push(temp);
            }
            newHot.titleList = result;
        }).catch(function(error){
            console.log(error);
        })
    }
})

var newComments = new Vue({
    el:"#new_comments",
    data:{
        commentList: []
    },
    computed: {

    },
    created: function(){

        axios({
            method:"get",
            url: "/queryNewComments"
        }).then(function(resp){

            var result = [];
            for (var i = 0; i < resp.data.length; i++) {
                var temp = {};
                temp.name = resp.data[i].user_name;
                temp.date = resp.data[i].ctime;
                temp.comment = resp.data[i].comment;
                result.push(temp);
            }
            newComments.commentList = result;
        }).catch(function(error){
            console.log(error);
        })
    }
})