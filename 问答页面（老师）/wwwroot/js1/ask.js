/**
 * Created by Administrator on 2016/9/20.
 */
var uname = $.cookie('username')
$(".dropdown-toggle span:nth-child(2)").html(uname)
//$(function(){
if(uname){
    $(".dropdown-menu li:last-child").click(function(){
        $.get('/user/tuichu',function(res){
            if(res.code=='success'){
                location.href='login.html'
            }
        })
    })
}

    $("form").submit(function(ev){
        ev.preventDefault()
        var data = $("form").serialize()
        $.post('/ask',data,function(res){
            console.log(res)
        })
    })
//})