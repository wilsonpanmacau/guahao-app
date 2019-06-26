

var express = require("express");

var app = express();
var hostname = "0.0.0.0";
var port = 1901;

var http = require("http");

var server = http.createServer(app);


app.use(express.json());   // req.body 来 获取 POST 请求 提交的 formData 数据 
app.use(express.urlencoded({ extended: false }));

// 处理跨域方法   CORS 处理方式 
app.all('*',function(req,res,next){
    // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    next();
});


var {setError,aesEncrypt ,keys} = require("./util");


var session = require("express-session");

// 设置 session 中间件  在路由中间件之前 
app.use(session({
  secret:"keyboard cat",
  name:"appTest",
  cookie:{maxAge:60*60*1000},
  resave:false,
  saveUninitialized:true
}));


var {login} = require("./util/index");
app.use(login);

var {checkIsLogin} = require("./util/index");



app.get("/",(req,res)=>{
    res.send("这是 我所有的项目接口 服务器 地址")
})

app.get("/index",(req,res)=>{
    res.json({
        code:200,
        msg:"获取数据成功"  + req.query.id,
        type:1
    })
})


var  vue = require("./vue");
var  react = require("./react");
app.use("/react",react);
app.use("/vue",vue);
// app.use(checkIsLogin);


server.listen(
    port,hostname,()=>{
        console.log(`my server is running at https://${hostname}:${port}`)
    }
)