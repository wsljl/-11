/**
 * Created by Administrator on 2016/9/20.
 */
var uname = $.cookie('username')
$(".dropdown-toggle span:nth-child(2)").html(uname)
if(uname){
    $(".dropdown-menu li:last-child").click(function(){
        $.get('/user/tuichu',function(res){

            if(res.code=='success'){
                location.href='login.html'
            }
        })
    })
}
    $.get('/index',function(res){
        console.log(res)
var datas=res.question
        console.log(datas)
        var divs=''
        for(var i=datas.length-1;i>=0;i--){
            //datas[i]--------每个文件内容，文件的名称，按时间取名
            var times = datas[i].time

            var filename = new Date(times).getTime()
            //console.log(filename)
            divs+='<div class="main" question='+filename+'>'
            divs+='<div class="main-left">'
            divs+="<img src= 'uploads/"+datas[i].username +".jpg'>"

            console.log(datas[i].username )
            divs+='</div>'
            divs+='<div class="main-right">'
            divs+="<h4>"+datas[i].username+"</h4>"
            divs+="<p>"+datas[i].text+"</p>"
            divs+="<p>"+datas[i].time+"</p>"
            divs+='</div>'
            divs+='</div>'



        }
        $('.question').html(divs)
        $(".main-right").click(function(){
            //console.log('1111')
            //设置某个cookie的值，获取当前点击文件的文件名称
            $.cookie('questions',$(this).attr('question'))
            location.href='answer.html'

        })
        $(".main-left").click(function(){
            location.href='user.html'
        })
    })
$.get('/indexone',function(res){
    //console.log(res)
    //var ress = '['+res.substr(0,res.length-1)+']'
    //console.log(ress)
    var txt = JSON.parse(res)
    var message =txt.answer
    console.log(message[0])
    var divss=''
    for(var i=message.length-1;i>=0;i--){
        //$('section .main-right p')[0].innerHTML+=message[i].text+'<br>'
        //$('section .main-right h4')[0].innerHTML+=message[i].username+'<br>'
        //$('section .main-right p')[1].innerHTML+=message[i].time+'<br>'
        var times = message[i].time

        var filename = new Date(times).getTime()
        //console.log(filename)
        divss+='<div class="main" answer='+filename+'>'
        divss+='<div class="main-left">'
        divss+="<img src= 'uploads/"+message[i].username +".jpg'>"

        console.log(message[i].username )
        divss+='</div>'
        divss+='<div class="main-right">'
        divss+="<h4>"+message[i].username+"</h4>"
        divss+="<p>"+message[i].text+"</p>"
        divss+="<p>"+message[i].time+"</p>"
        divss+='</div>'
        divss+='</div>'
    }
    $('.answer').html(divss)

})
 //$('form').submit(function(ev){
 //    ev.preventDefault()
 //    var data = $('form').serialize()
 //    $.post('/answer',data,function(res){
 //        console.log(data)
 //
 //        var txt = JSON.parse(data)
 //        console.log(txt)
 //        //for(var i=;)
 //    })
 //})
//function formDatatime(){
//
//}
