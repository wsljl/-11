/**
 * Created by Administrator on 2016/9/20.
 */
$(function(){
    $("form").submit(function(ev){
        ev.preventDefault()
        var pass = $(":password").map(function(){
            return $(this).val()
        })
        if(pass[0]==pass[1]){
            console.log('两次密码一致，可以提交内容')
            var data = $("form").serialize()
            $.post('/user/zhuce',data,function(res){
                console.log(res)
                $(".modal-body").html(res.message)
                if(res.code=='success'){
                    $(".btn-primary").html('登录')
                    $(".btn-primary").click(function(){
                        location.href='login.html'
                    })
                }else{
                    $(".btn-primary").html('返回')
                    $(".btn-primary").click(function(){
                        location.href='zhuce.html'
                    })
                }
            })
        }else{
            $(".modal-body").html('两次密码不一致，请重新输入')
            $(".btn-primary").html('返回')
            $(".btn-primary").click(function(){
                location.href='zhuce.html'
            })
        }

    })
})