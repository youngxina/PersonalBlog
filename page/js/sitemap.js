var blogList = new Vue({
    el: "#blog_list",
    data: {
        blogList:[]
    },
    computed: {

    },
    created: function(){
        axios({
            method:"get",
            url: "/queryAllBlog"
        }).then(function(resp){
            for (i = 0; i < resp.data.length; i++) {
                resp.data[i].link = "/blog_detail.html?bid=" + resp.data[i].id;

            }
            blogList.blogList = resp.data;
        }).catch(function(error){
            console.log("请求错误!"+error);
        })
    }
})