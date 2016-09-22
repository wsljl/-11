/**
 * Created by Administrator on 2016/9/20.
 */
$(function(){
    $("form").submit(function(ev){
        ev.preventDefault()
        var data = $("form").serialize()
        $.post('/user/login',data,function(res){
            console.log(res)
            //alert('11111')
            $(".modal-body").html(res.message)

            if(res.code=='success'){
                $(".btn-primary").click(function(){
                    location.href='index1.html'
                })

            }else{
                $(".btn-primary").html('返回')
                $(".btn-primary").click(function(){
                    location.href='login.html'
                })
            }
        })
    })
})