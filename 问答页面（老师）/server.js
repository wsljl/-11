var express = require('express')
var bodyparser = require('body-parser')
var multer=require('multer')
var fs=require('fs')
var cookieparser=require('cookie-parser')
var storage = multer.diskStorage({
    destination:'wwwroot/uploads',
    filename:function(req,file,cb){
        var username = req.cookies.username
        cb(null,username+'.jpg')
    }
})
var uploads = multer({storage})
var app = express()
var form = multer()

app.use(express.static('wwwroot'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(cookieparser())


//注册
app.post('/user/zhuce',function(req,res){
    console.log(req.body)
    req.body.ip=req.ip
    req.body.date=new Date()
    function send(code,message){
        res.status(200).json({code,message})
    }
    var filename = 'user/'+req.body.username+'.txt'
    console.log(filename)
    function savefile(){
        fs.exists(filename,function(ex){
            if(ex){
                send('zhuce','该用户已注册')
            }else{
                fs.appendFile(filename,JSON.stringify(req.body),function(err){
                    if(err){
                        send('file error','用户注册失败')
                    }else{
                        send('success','恭喜!注册成功，请登录...')
                    }
                })
            }
        })
    }
    fs.exists('user',function(ex){
        if(!ex){
            fs.mkdirSync('user')
            savefile()
        }else{
            savefile()
        }
    })
})

//登录
app.post('/user/login',function(req,res){

    function send(code,message){
        res.status(200).json({code,message})
    }
    var filename = 'user/'+req.body.username+'.txt'
    fs.exists(filename,function(ex){
        if(!ex){
            send('none','该用户不存在,请注册')
        }else{
            fs.readFile(filename,function(err,data){
                if(err){
                    send('fail','系统错误2')
                }else{
                    var user = JSON.parse(data)
                    if(user.password==req.body.password){
                        res.cookie('username',req.body.username)
                        send('success','登录成功')
                    }else{
                        send('file error','密码错误，请重试')
                    }

                }
            })
        }
    })
})

//退出请求
app.get('/user/tuichu',function(req,res){
    res.clearCookie('username')

    res.status(200).json({'code':'success'})
})



//提问页面
app.post('/ask',function(req,res){
    var username = req.cookies.username

    //req.body.ip=req.ip
    //req.body.date = new Date()
console.log(req.body)
   // 把当前提问的内容保存在某个文件中，文件名以当前时间取名，便于查询及后期的回答
   // 设置时间+ip
    var time=new Date()
    req.body.username = username
    req.body.ip=req.ip
    req.body.time=time
   // 封装返回服务器信息的方法
    function send(code,message){
        res.status(200).json({code,message})
    }
    function savefile(){
    //    设置文件名--以当前时间取名
        var filename = 'data/'+time.getTime()+'.txt'
        fs.appendFile(filename,JSON.stringify(req.body) ,function (err) {
            if(err){
                send('fail','失败')
            }else{
                send('success','成功')
            }
        })
    }
   // 判断文件夹是否存在？
    fs.exists('data',function(ex){
        if(!ex){
            fs.mkdirSync('data')
            savefile()
        }else{
            savefile()
        }
    })
})

//首页获取提问内容
app.get('/index',function(req,res){
    function send(code,message,question){
        //code:是否读取成功，message：是否成功相对应的信息，question：读到的文件内容数据
        res.status(200).json({code,message,question})
    }
    function reads(i,files,question,cb){
        var filePath = 'data/'+files[i]
        if(i<files.length){
            fs.readFile(filePath,function(err,data){
                if(err){
                    send('error','失败')
                }else{
                    question.push(JSON.parse(data))
                }
                reads(++i,files,question,cb)
            })
        }else{
            cb()
        }

    }
//    判断文件夹是否存在
    fs.exists('data',function(ex){
        if(!ex){
            send('err','错误',null)
        }else{
            fs.readdir('data',function(err,files){
                if(err){
                    send('error','文件错误')
                }else{
                    var files = files
                    console.log(files)
                    var question=[]
                    reads(0,files,question,function(){
                        send('success','获取数据成功',question)
                    })
                }
            })
        }
    })
})

//回答数据处理
app.post('/answer',function(req,res){
//    回答内容保存在哪----问题的文件内，如何与回答的问题联系起来
//    获取文件名称，通过浏览器段设定的cookie
    var aname = req.cookies.username
    console.log(aname)
    var filename = 'data/'+req.cookies.questions+'.txt'
    req.body.ip=req.ip
    req.body.time = new Date()
    req.body.username=aname
    fs.readFile(filename,function(err,data){
        if(err){
            res.send('保存失败')
        }else{
            var datas = JSON.parse(data)
        //    datas:{}
            if(!datas.answer){
                datas.answer=[]

            }
            datas.answer.push(req.body)
            fs.writeFile(filename,JSON.stringify(datas),function(err){
                if(err){
                    res.send('保存数据失败')

                }else{
                    res.send('回答提交成功')

                }
            })
        }
    })

})
app.get('/indexone',function(req,res){
    fs.exists('data',function(ex){
        if(ex){
            var filename = 'data/'+req.cookies.questions+'.txt'

            fs.readFile(filename,function(err,data){
                console.log(data)
                if(data){
                    res.send(data)
                }else{
                    res.send('获取数据失败')
                }
            })
        }
    })
})
//上传请求
app.post('/user/photo',uploads.single('photo'),function(req,res){
    res.send('上传成功')
})

app.listen(4000,function(){
    console.log('测试成功')
})
